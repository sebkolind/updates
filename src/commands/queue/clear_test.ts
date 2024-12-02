import { assertEquals } from "@std/assert";
import { spy } from "@std/testing/mock";
import { runClearQueue } from "./clear.ts";
import { FILE_PATH } from "./constants.ts";
import { ensureFile } from "@std/fs/ensure-file";

Deno.test("clears the queue when file exists", async () => {
  const lstatSpy = spy(Deno, "lstat");
  const removeSpy = spy(Deno, "remove");
  const consoleSpy = spy(console, "log");

  await ensureFile(FILE_PATH);
  await runClearQueue();

  assertEquals(lstatSpy.calls[0].args, [FILE_PATH]);
  assertEquals(removeSpy.calls[0].args, [FILE_PATH]);
  assertEquals(consoleSpy.calls[0].args, ["Queue cleared."]);

  lstatSpy.restore();
  removeSpy.restore();
  consoleSpy.restore();
});

Deno.test("handles when queue is already empty", async () => {
  const lstatSpy = spy(Deno, "lstat");
  const consoleSpy = spy(console, "log");

  await runClearQueue();

  assertEquals(consoleSpy.calls.length, 1);
  assertEquals(consoleSpy.calls[0].args, ["Queue is already empty."]);

  lstatSpy.restore();
  consoleSpy.restore();
});
