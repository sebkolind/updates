import { assertEquals, assertRejects } from "@std/assert";
import { readQueue } from "./utils.ts";
import { FILE_PATH } from "./constants.ts";

Deno.test("returns an empty array if the file does not exist", async () => {
  await Deno.remove(FILE_PATH).catch(() => null);
  const result = await readQueue();
  assertEquals(result, []);
});

Deno.test("returns the content of the file as an array", async () => {
  const tasks = ["task1", "task2"];
  await Deno.writeTextFile(FILE_PATH, JSON.stringify(tasks));

  const result = await readQueue();
  assertEquals(result, tasks);

  await Deno.remove(FILE_PATH);
});

Deno.test("throws an error if the file content is invalid", async () => {
  await Deno.writeTextFile(FILE_PATH, "invalid json");
  await assertRejects(async () => await readQueue(), SyntaxError);
  await Deno.remove(FILE_PATH);
});
