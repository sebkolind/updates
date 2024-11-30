import { createProvider } from "../provider.ts";
import { Provider } from "../types/provider.ts";
import { jiraFetcher } from "./fetcher.ts";

const jiraProvider = createProvider({
  name: Provider.Jira,
  fetcher: jiraFetcher,
});

export { jiraProvider };
