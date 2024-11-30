import { assertEquals } from "@std/assert/equals";
import { generateList } from "./utils.ts";

Deno.test("generating a list", () => {
  const tasks = [
    {
      id: "1",
      title: "Task 1",
      identifier: "T1",
      url: "http://example.com/T1",
    },
    {
      id: "2",
      title: "Task 2",
      identifier: "T2",
      url: "http://example.com/T2",
      message: "This is a message",
    },
  ];

  const list = generateList({ tasks });

  const expected = `* Task 1 ([T1](http://example.com/T1))
* Task 2 ([T2](http://example.com/T2))
    * This is a message`;

  assertEquals(list, expected);
});
