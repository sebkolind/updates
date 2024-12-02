import { assertEquals } from "@std/assert";
import { spy } from "@std/testing/mock";
import { ensureFile } from "@std/fs/ensure-file";
import { runRemoveQueue } from "./remove.ts";
import { FILE_PATH } from "./constants.ts";

Deno.test("removes tasks from the queue", async () => {
  await ensureFile(FILE_PATH);
  await Deno.writeTextFile(FILE_PATH, JSON.stringify(["TASK-1", "TASK-2"]));

  await runRemoveQueue(["TASK-1"]);

  const content = await Deno.readTextFile(FILE_PATH);
  const tasks = JSON.parse(content);

  assertEquals(tasks, ["TASK-2"]);

  await Deno.remove(FILE_PATH);
});

Deno.test("skips tasks that do not exist in the queue", async () => {
  const consoleSpy = spy(console, "log");

  await ensureFile(FILE_PATH);
  await Deno.writeTextFile(FILE_PATH, JSON.stringify(["TASK-1"]));

  await runRemoveQueue(["TASK-2"]);

  const content = await Deno.readTextFile(FILE_PATH);
  const tasks = JSON.parse(content);

  assertEquals(tasks, ["TASK-1"]);
  assertEquals(consoleSpy.calls[0].args, [
    "Task TASK-2 does not exist in queue. Skipping.",
  ]);

  consoleSpy.restore();
  await Deno.remove(FILE_PATH);
});

Deno.test("reports when nothing was removed", async () => {
  const consoleSpy = spy(console, "log");

  await ensureFile(FILE_PATH);
  await Deno.writeTextFile(FILE_PATH, JSON.stringify(["TASK-1"]));

  await runRemoveQueue(["TASK-2"]);

  assertEquals(consoleSpy.calls[1].args, [
    "All tasks not found in queue. Nothing to remove.",
  ]);

  consoleSpy.restore();
  await Deno.remove(FILE_PATH);
});
