import { FILE_PATH } from "./constants.ts";
import { readQueue } from "./utils.ts";

type Options = {
  pretty?: boolean;
};

/**
 * List tasks in the queue.
 *
 * @returns {Promise<void>} Promise that resolves when the operation is complete.
 */
async function runListQueue(options?: Options): Promise<void> {
  try {
    await Deno.lstat(FILE_PATH);

    const tasks = await readQueue();

    if (tasks.length === 0) {
      console.log("Queue is empty.");
      return;
    }

    if (options?.pretty) {
      tasks.forEach((task, index) => {
        console.log(task.id);
        if (task.message) {
          console.log(task.message);
        }
        if (index !== tasks.length - 1) {
          console.log("---");
        }
      });
    } else {
      console.log(tasks.map((task) => task.id).join(", "));
    }
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      console.log("Queue is empty.");
      return;
    }

    console.error("Failed to list queue:", error);
  }
}

export { runListQueue };
