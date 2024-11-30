import type { Task } from "./types/task.ts";

type GenerateListParams = {
  tasks: Task[];
};

/**
 * Generates a markdown list of tasks.
 */
function generateList({ tasks }: GenerateListParams): string {
  const taskList = tasks.map((task) => {
    let taskItem = `* ${task.title} ([${task.identifier}](${task.url}))`;
    if (task.message) {
      taskItem += `\n    * ${task.message}`;
    }
    return taskItem;
  });

  return taskList.join("\n");
}

export { generateList };
