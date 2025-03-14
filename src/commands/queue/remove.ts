import { ensureFile } from "@std/fs/ensure-file";
import { FILE_PATH } from "./constants.ts";
import { readQueue } from "./utils.ts";

/**
 * Remove tasks from the queue.
 * Skips tasks that do not exist in the queue.
 *
 * @param {string[]} ids The list of task IDs to remove.
 * @returns {Promise<void>} Promise that resolves when the operation is complete.
 */
async function runRemoveQueue(ids: string[]): Promise<void> {
  try {
    await ensureFile(FILE_PATH);

    let tasks = await readQueue();

    const removed: string[] = [];
    ids.forEach((id) => {
      if (tasks.find((task) => task.id === id)) {
        tasks = tasks.filter((task) => task.id !== id);
        removed.push(id);
      } else {
        console.log(`Task ${id} does not exist in queue. Skipping.`);
      }
    });

    if (removed.length === 0) {
      console.log("All tasks not found in queue. Nothing to remove.");
      return;
    }

    await Deno.writeTextFile(
      FILE_PATH,
      JSON.stringify(tasks, null, 2),
    );

    console.log(`Tasks removed from queue: ${removed.join(", ")}`);
  } catch (error) {
    console.error("Failed to remove tasks from queue:", error);
  }
}

export { runRemoveQueue };
