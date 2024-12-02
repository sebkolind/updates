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

import { Command } from "commander";
import {
  runAddQueue,
  runClearQueue,
  runListQueue,
  runRemoveQueue,
} from "./commands/queue/index.ts";
import { run } from "./run.ts";
import { getVersion } from "./utils.ts";

const program = new Command();

program
  .name("@sebkolind/updates")
  .version(getVersion())
  .description(
    "A minimalistic CLI tool for generating a Markdown list of updates based on task IDs.",
  )
  .argument("[ids...]", "Task IDs")
  .option("-p, --provider <provider>", "Provider name")
  .option("-f, --file <file>", "File path to write to")
  .option("-y, --yes", "Confirm all defaults on tasks", false)
  .option("-q, --queue", "Generate from queue", false)
  .action((args) => run(program, args));

/**
 * Queue commands.
 */
program
  .command("queue <ids...>")
  .description("Queue tasks for later.")
  .action(runAddQueue)
  .addCommand(
    program.command("clear")
      .alias("cl")
      .description("Clear the queue.")
      .action(runClearQueue),
  )
  .addCommand(
    program.command("list")
      .alias("ls")
      .description("List tasks in the queue.")
      .action(runListQueue),
  )
  .addCommand(
    program.command("remove <ids...>")
      .alias("rm")
      .description("Remove tasks from the queue.")
      .action(runRemoveQueue),
  );

program.parse();
