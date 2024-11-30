import enquirer from "npm:enquirer@2.3.6";

import type { Prompts } from "./types/prompt.ts";
import type { Task } from "./types/task.ts";

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
