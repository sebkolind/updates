import { ensureFile } from "@std/fs/ensure-file";
import { FILE_PATH } from "./constants.ts";
import { readQueue } from "./utils.ts";

async function runRemoveQueue(ids: string[]) {
  try {
    await ensureFile(FILE_PATH);

    let tasks = await readQueue();

    const removed: string[] = [];
    ids.forEach((id) => {
      if (tasks.includes(id)) {
        tasks = tasks.filter((task) => task !== id);
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
