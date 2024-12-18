import { assertEquals } from "@std/assert";
import { assertSpyCall, spy, stub } from "@std/testing/mock";
import { validateProvider } from "./validation.ts";
import { Provider } from "./types/provider.ts";

Deno.test("validateProvider with valid provider", () => {
  const provider = Provider.Linear;
  const result = validateProvider(provider);
  assertEquals(result, Provider.Linear);
});

Deno.test("validateProvider with invalid provider", () => {
  const exitStub = stub(Deno, "exit"); // Prevent process from exiting
  const consoleSpy = spy(console, "error");

  validateProvider("InvalidProvider");

  assertSpyCall(exitStub, 0, { args: [1] });
  assertSpyCall(consoleSpy, 0, {
    args: [
      `Invalid provider "InvalidProvider". Please provide one of: jira, linear, github`,
    ],
  });
});

Deno.test("validateProvider with GitHub provider", () => {
  const provider = Provider.GitHub;
  const result = validateProvider(provider);
  assertEquals(result, Provider.GitHub);
});
