import { assertEquals } from "@std/assert/equals";
import { writeFile } from "./file.ts";
import { assertSpyCall, spy } from "@std/testing/mock";

Deno.test("writeFile", async () => {
  const consoleSpy = spy(console, "log");

  const path = "/tmp/test.md";
  const list = `* Task 1 ([T1](http://example.com/T1))
* Task 2 ([T2](http://example.com/T2))
    * This is a message`;

  await writeFile({ path, list });

  assertSpyCall(consoleSpy, 0, { args: [`Updates written to ${path}.`] });

  const file = await Deno.readTextFile(path);
  assertEquals(file, list);

  await Deno.remove(path);
});
