import { ensureFile } from "@std/fs/ensure-file";
import { FILE_PATH } from "./constants.ts";
import { readQueue } from "./utils.ts";

type Options = {
  message?: string;
};

/**
 * Add a list of tasks to the queue.
 * Skips tasks that already exist in the queue.
 *
 * @param {string[]} ids The list of task IDs to add.
 * @returns {Promise<void>} Promise that resolves when the operation is complete.
 */
async function runAddQueue(ids: string[], options?: Options): Promise<void> {
  try {
    await ensureFile(FILE_PATH);

    const currentQueue = await readQueue();

    const newTasks = ids.filter((id) => {
      if (currentQueue.find((task) => task.id === id)) {
        console.log(`Task ${id} already exists in queue. Skipping.`);
        return false;
      }
      return true;
    });

    if (newTasks.length === 0) {
      console.log("Nothing to add.");
      return;
    }

    const updatedTasks = [...currentQueue];
    newTasks.forEach((id) => {
      updatedTasks.push({ id, message: options?.message });
    });

    await Deno.writeTextFile(
      FILE_PATH,
      JSON.stringify(updatedTasks, null, 2),
    );

    console.log(`Tasks added to queue. Total tasks: ${updatedTasks.length}`);
  } catch (error) {
    console.error("Failed to add tasks to queue:", error);
  }
}

export { runAddQueue };
