import { createProvider } from "../provider.ts";
import { Provider } from "../types/provider.ts";
import { linearFetcher } from "./fetcher.ts";

const linearProvider = createProvider({
  name: Provider.Linear,
  fetcher: linearFetcher,
});

export { linearProvider };
