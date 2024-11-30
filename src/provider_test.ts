import { assertEquals } from "@std/assert/equals";
import { assertThrows } from "@std/assert/throws";

import type { Task } from "./types/task.ts";
import { Provider } from "./types/provider.ts";
import { createProvider, getProvider } from "./provider.ts";

const fakeFetch = async (id: string): Promise<Task> => {
  return await new Promise((resolve) => {
    resolve({
      id,
      identifier: id,
      title: `Task title #${id}`,
      url: `https://example.com/task/${id}`,
      message: `Task message for ${id}`,
    });
  });
};

Deno.test("create a provider", async () => {
  const provider = createProvider({
    name: Provider.Linear,
    fetcher: async (ids: string[]): Promise<Task[]> => {
      return await Promise.all(ids.map(fakeFetch));
    },
  });

  assertEquals(provider.name, "linear");
  assertEquals(typeof provider.fetcher, "function");

  const tasks = await provider.fetcher(["1", "2", "3"]);
  assertEquals(tasks.length, 3);

  for (const task of tasks) {
    assertEquals(task.title, `Task title #${task.id}`);
    assertEquals(task.url, `https://example.com/task/${task.id}`);
    assertEquals(task.message, `Task message for ${task.id}`);
  }
});

Deno.test("get a provider", () => {
  const providers = Object.values(Provider);

  for (const provider of providers) {
    const instance = getProvider({ name: provider });
    assertEquals(instance.name, provider);
    assertEquals(typeof instance.fetcher, "function");
  }
});

Deno.test("get a provider with invalid name", () => {
  assertThrows(
    () => getProvider({ name: "invalid" as Provider }),
    Error,
    "Unsupported provider: invalid",
  );
});
