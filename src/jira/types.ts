type JiraIssue = {
  id: string;
  fields: {
    summary: string; // The title of the issue
    description: string; // The description of the issue
    customfield_10040?: string; // Custom field for QA status
    // Add other fields as needed
  };
};

export type { JiraIssue };
