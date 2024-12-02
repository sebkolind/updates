import { ensureFile } from "@std/fs/ensure-file";
import { FILE_PATH } from "./constants.ts";
import { readQueue } from "./utils.ts";

/**
 * Add a list of tasks to the queue.
 * Skips tasks that already exist in the queue.
 * TODO Check if the tasks exist in the provider before adding them to the queue.
 */
async function runQueue(ids: string[]) {
  try {
    await ensureFile(FILE_PATH);

    const currentQueue = await readQueue();

    const newTasks = ids.filter((id) => {
      if (currentQueue.includes(id)) {
        console.log(`Task ${id} already exists in queue. Skipping.`);
        return false;
      }
      return true;
    });

    if (newTasks.length === 0) {
      console.log("Nothing to add.");
      return;
    }

    const updatedTasks = [...currentQueue, ...newTasks];

    await Deno.writeTextFile(
      FILE_PATH,
      JSON.stringify(updatedTasks, null, 2),
    );

    console.log(`Tasks added to queue. Total tasks: ${updatedTasks.length}`);
  } catch (error) {
    console.error("Failed to add tasks to queue:", error);
  }
}

export { runQueue };
