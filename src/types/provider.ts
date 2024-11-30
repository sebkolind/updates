import type { Task } from "./task.ts";

enum Provider {
  Jira = "jira",
  Linear = "linear",
}

type ProviderConfig = {
  name: Provider;
  fetcher: (taskIds: string[]) => Promise<Task[]>;
};

export { Provider };
export type { ProviderConfig };
