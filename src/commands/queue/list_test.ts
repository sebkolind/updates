import { assertEquals } from "@std/assert";
import { spy } from "@std/testing/mock";
import { ensureFile } from "@std/fs/ensure-file";
import { runListQueue } from "./list.ts";
import { FILE_PATH } from "./constants.ts";

Deno.test("lists tasks in the queue", async () => {
  const consoleSpy = spy(console, "log");

  await ensureFile(FILE_PATH);
  await Deno.writeTextFile(FILE_PATH, JSON.stringify(["TASK-1", "TASK-2"]));

  await runListQueue();

  assertEquals(consoleSpy.calls[0].args, ["TASK-1, TASK-2"]);

  consoleSpy.restore();
  await Deno.remove(FILE_PATH);
});

Deno.test("handles empty queue", async () => {
  const consoleSpy = spy(console, "log");

  await ensureFile(FILE_PATH);
  await Deno.writeTextFile(FILE_PATH, JSON.stringify([]));

  await runListQueue();

  assertEquals(consoleSpy.calls[0].args, ["Queue is empty."]);

  consoleSpy.restore();
  await Deno.remove(FILE_PATH);
});

Deno.test("handles missing queue file", async () => {
  const consoleSpy = spy(console, "log");

  await runListQueue();

  assertEquals(consoleSpy.calls[0].args, ["Queue is empty."]);

  consoleSpy.restore();
});
