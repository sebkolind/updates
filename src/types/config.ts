type Config = {
  providers: {
    linear: {
      api: API;
    };
    jira: {
      email: string;
      siteUrl: string;
      api: API;
    };
  };
};

type API = {
  key: string;
};

export type { Config };