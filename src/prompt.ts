import enquirer from "enquirer";

import type { Prompts } from "./types/prompt.ts";
import type { Task } from "./types/task.ts";

type Options = {
  message?: string;
};

/**
 * Prompts the user for task information.
 */
async function prompts(task: Task, options?: Options): Promise<Prompts> {
  const answers = await enquirer.prompt<Prompts>([
    {
      type: "input",
      name: "title",
      message: "Title: ",
      initial: task.title,
    },
    {
      type: "input",
      name: "message",
      message: "Progress update (optional): ",
      initial: options?.message ?? task.message,
    },
  ]);

  return answers;
}

export { prompts };
