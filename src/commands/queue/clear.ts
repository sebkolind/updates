import { FILE_PATH } from "./constants.ts";

/**
 * Clear the queue.
 *
 * @returns {Promise<void>} Promise that resolves when the operation is complete.
 */
async function runClearQueue(): Promise<void> {
  try {
    await Deno.lstat(FILE_PATH);
    await Deno.remove(FILE_PATH);

    console.log("Queue cleared.");
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      console.log("Queue is already empty.");
      return;
    }

    console.error("Failed to clear queue:", error);
  }
}

export { runClearQueue };
