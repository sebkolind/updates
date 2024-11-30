import { ensureDir } from "@std/fs/ensure-dir";

type WriteFileParams = {
  path: string;
  list: string;
};

/**
 * Writes a list of tasks to a file.
 */
async function writeFile({ path, list }: WriteFileParams) {
  try {
    const dir = path.substring(0, path.lastIndexOf("/"));

    await ensureDir(dir);
    await Deno.writeTextFile(path, list);

    console.log(`Updates written to ${path}.`);
  } catch (error) {
    console.error(`Error writing file ${path}:`, error);
  }
}

export { writeFile };
