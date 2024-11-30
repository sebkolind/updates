import { createProvider } from "../provider.ts";
import { linearFetcher } from "./fetcher.ts";

const linearProvider = createProvider({
  name: "Linear",
  fetcher: linearFetcher,
});

export { linearProvider };
