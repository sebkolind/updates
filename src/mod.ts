/**
 * @module
 *
 * A CLI tool for generating a Markdown list of updates based on task IDs,
 * fetched from a provider. The updates can be written to a file or printed to
 * the console. Originally built for generating standup updates.
 *
 * @example
 * ```ts
 * deno install -gA -n updates jsr:@sebkolind/updates
 * updates -p linear -f ~/updates.md JSR-123
 * ```
 */

import { parseArgs } from "@std/cli/parse-args";

import { generateList } from "./utils.ts";
import { getProvider } from "./provider.ts";
import { Provider } from "./types/provider.ts";
import { writeFile } from "./file.ts";
import { validateProvider } from "./validation.ts";
import { prompts } from "./prompt.ts";

async function main() {
  const args = parseArgs(Deno.args, {
    boolean: ["yes"],
    string: ["provider", "file"],

    default: {
      yes: false,
      file: null,
      provider: Provider.Jira,
    },

    alias: {
      yes: ["y"],
      file: ["f"],
      provider: ["p"],
    },
  });

  const taskIds = String(args._[0]).split(",") ?? [];
  if (taskIds.length === 0) {
    console.log("Please provide a comma-separated list of IDs.");
    Deno.exit(1);
  }

  try {
    const providerName = validateProvider(args.provider);
    const provider = getProvider({ name: providerName });
    const tasks = await provider.fetcher(taskIds);

    for (const task of tasks) {
      const { title, message } = args.yes ? task : await prompts(task);
      task.title = title;
      task.message = message;
    }

    const list = generateList({ tasks });

    if (args.file != null) {
      const path = args.file;
      await writeFile({ path, list });
    } else {
      console.log(list);
    }
  } catch (error) {
    console.error(error);
    Deno.exit(1);
  } finally {
    // Reset the cursor
    console.log("\x1b[?25h");
    Deno.exit(0);
  }
}

if (import.meta.main) {
  main();
}
