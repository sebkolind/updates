import { createProvider } from "../provider.ts";
import { Provider } from "../types/provider.ts";
import { githubFetcher } from "./fetcher.ts";

const githubProvider = createProvider({
  name: Provider.GitHub,
  fetcher: githubFetcher,
});

export { githubProvider };
