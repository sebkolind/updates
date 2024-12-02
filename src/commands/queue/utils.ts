import { FILE_PATH } from "./constants.ts";

/**
 * Read the queue from the file.
 */
async function readQueue(): Promise<string[]> {
  const content = await Deno.readTextFile(FILE_PATH);

  return content ? JSON.parse(content) : [];
}

export { readQueue };
