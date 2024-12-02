import { FILE_PATH } from "./constants.ts";

/**
 * Read the queue from the file.
 */
async function readQueue(): Promise<string[]> {
  try {
    await Deno.lstat(FILE_PATH);

    const content = await Deno.readTextFile(FILE_PATH);
    const tasks = parseJSON(content);

    return tasks ?? [];
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      return [];
    }

    throw error;
  }
}

function parseJSON(content: string): string[] {
  try {
    return JSON.parse(content);
  } catch (_) {
    throw new SyntaxError("Invalid JSON content.");
  }
}

export { readQueue };
