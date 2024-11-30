type JiraIssue = {
  id: string;
  fields: {
    summary: string; // The title of the issue
    description: string; // The description of the issue
    status: {
      name: string; // The status of the issue
    };
  };
};

export type { JiraIssue };
