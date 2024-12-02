import { join } from "@std/path/join";

const FILE_PATH = join(
  Deno.env.get("HOME") ?? ".",
  ".config",
  "sebkolind",
  "updates",
  "queue.json",
);

export { FILE_PATH };
