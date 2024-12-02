import { join } from "@std/path";
import { parse } from "@std/yaml";

import type { Config } from "./types/config.ts";

/**
 * Read from a configuration file.
 * A config file is expected to be located at `$HOME/.config/sebkolind/updates/config.yml`.
 */
async function load(): Promise<Config> {
  const homeDir = Deno.env.get("HOME");
  if (!homeDir) {
    throw new Error("Could not find home directory.");
  }

  const configPath = join(
    homeDir,
    ".config",
    "sebkolind",
    "updates",
    "config.yml",
  );
  try {
    const config = await Deno.readTextFile(configPath);
    return parse(config) as Config;
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      throw new Error(`Failed to read config file: ${error.message}`);
    }
    throw error;
  }
}

export { load };
