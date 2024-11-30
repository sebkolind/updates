import type { Task } from "./task.ts";

enum Provider {
  Jira = "jira",
  Linear = "linear",
}

type ProviderConfig = {
  fetcher: (taskIds: string[]) => Promise<Task[]>;
  name: string;
};

export { Provider };
export type { ProviderConfig };
