import { FILE_PATH } from "./constants.ts";
import { readQueue } from "./utils.ts";

/**
 * List tasks in the queue.
 *
 * @returns {Promise<void>} Promise that resolves when the operation is complete.
 */
async function runListQueue(): Promise<void> {
  try {
    await Deno.lstat(FILE_PATH);

    const tasks = await readQueue();

    if (tasks.length === 0) {
      console.log("Queue is empty.");
      return;
    }

    console.log(tasks.join(", "));
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      console.log("Queue is empty.");
      return;
    }

    console.error("Failed to list queue:", error);
  }
}

export { runListQueue };
