import type { Command } from "commander";
import { validateProvider } from "./validation.ts";
import { getProvider } from "./provider.ts";
import { prompts } from "./prompt.ts";
import { generateList } from "./utils.ts";
import { writeFile } from "./file.ts";
import { readQueue } from "./commands/queue/utils.ts";
import { load } from "./config.ts";

async function run(program: Command, ids: string[]) {
  const config = await load();
  const opts = program.opts();

  const queueTasks = await readQueue();
  const getTask = (id: string) => queueTasks.find((t) => t.id === id);

  const taskIds = opts.queue ? queueTasks.map((t) => t.id) : ids;
  if (opts.queue) {
    console.log("Generating from queue...");

    if (taskIds.length === 0) {
      console.log("Queue is empty.");
      Deno.exit(0);
    }
  }

  if (taskIds.length === 0) {
    console.log(
      "Please, provide a list of IDs. For example: JSR-123 JSR-321",
      "\n\nYou can also add tasks to the queue using the `queue` command, and run again with the `-q` flag.",
      "\n\nCheck `updates queue --help` for more information.",
    );
    Deno.exit(1);
  }

  try {
    const p = opts.provider ?? config.provider;
    const name = validateProvider(p);
    const provider = getProvider({ name });
    const tasks = await provider.fetcher(taskIds);

    for (const task of tasks) {
      const queueTask = getTask(task.identifier);
      const { title, message } = opts.yes
        ? task
        : await prompts(task, { message: queueTask?.message });

      task.title = title;
      task.message = message;
    }

    const list = generateList({ tasks });

    if (opts.file != null) {
      const path = opts.file;
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

export { run };
