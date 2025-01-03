import enquirer from "enquirer";

import type { Prompts } from "./types/prompt.ts";
import type { Task } from "./types/task.ts";

/**
 * Prompts the user for task information.
 */
async function prompts(task: Task): Promise<Prompts> {
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
      initial: task.message,
    },
  ]);

  return answers;
}

export { prompts };
