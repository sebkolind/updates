import { jiraProvider } from "./jira/provider.ts";
import { linearProvider } from "./linear/provider.ts";
import { githubProvider } from "./github/provider.ts";
import { Provider, type ProviderConfig } from "./types/provider.ts";

/**
 * Create a provider.
 * All providers must implement the `ProviderConfig` interface.
 */
function createProvider({ name, fetcher }: ProviderConfig) {
  return { name, fetcher };
}

type GetProviderParams = {
  name: Provider;
};

/**
 * Get a provider by name.
 */
function getProvider({ name }: GetProviderParams) {
  switch (name) {
    case Provider.Jira:
      return jiraProvider;
    case Provider.Linear:
      return linearProvider;
    case Provider.GitHub:
      return githubProvider;
    default:
      throw new Error(`Unsupported provider: ${name}`);
  }
}

export { createProvider, getProvider };
