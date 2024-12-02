import { assertEquals } from "@std/assert";
import { ensureFile } from "@std/fs";
import { spy } from "@std/testing/mock";
import { FILE_PATH } from "./constants.ts";
import { runAddQueue } from "./add.ts";

Deno.test("adds new tasks to the queue", async () => {
  await ensureFile(FILE_PATH);
  await Deno.writeTextFile(FILE_PATH, JSON.stringify([]));

  await runAddQueue(["TASK-1", "TASK-2"]);

  const content = await Deno.readTextFile(FILE_PATH);
  const tasks = JSON.parse(content);

  assertEquals(tasks, ["TASK-1", "TASK-2"]);

  await Deno.remove(FILE_PATH);
});

Deno.test("skips tasks that already exist in the queue", async () => {
  await ensureFile(FILE_PATH);
  await Deno.writeTextFile(FILE_PATH, JSON.stringify(["TASK-1"]));

  await runAddQueue(["TASK-1", "TASK-2"]);

  const content = await Deno.readTextFile(FILE_PATH);
  const tasks = JSON.parse(content);

  assertEquals(tasks, ["TASK-1", "TASK-2"]);

  await Deno.remove(FILE_PATH);
});

Deno.test("handles empty input", async () => {
  await ensureFile(FILE_PATH);
  await Deno.writeTextFile(FILE_PATH, JSON.stringify([]));

  await runAddQueue([]);

  const content = await Deno.readTextFile(FILE_PATH);
  const tasks = JSON.parse(content);

  assertEquals(tasks, []);

  await Deno.remove(FILE_PATH);
});

Deno.test("reports when nothing was added", async () => {
  const consoleSpy = spy(console, "log");

  await ensureFile(FILE_PATH);
  await Deno.writeTextFile(FILE_PATH, JSON.stringify(["TASK-1"]));

  await runAddQueue(["TASK-1"]);

  assertEquals(consoleSpy.calls.length, 2);
  assertEquals(consoleSpy.calls[0].args, [
    "Task TASK-1 already exists in queue. Skipping.",
  ]);
  assertEquals(consoleSpy.calls[1].args, ["Nothing to add."]);

  await Deno.remove(FILE_PATH);
});
