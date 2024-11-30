import { createProvider } from "../provider.ts";
import { jiraFetcher } from "./fetcher.ts";

const jiraProvider = createProvider({
  name: "jira",
  fetcher: jiraFetcher,
});

export { jiraProvider };
