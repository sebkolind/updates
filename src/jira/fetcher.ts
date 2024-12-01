import { load } from "../config.ts";

import type { JiraIssue } from "./types.ts";
import type { Task } from "../types/task.ts";

const config = await load();

const siteUrl = config.providers.jira.siteUrl;
const apiUrl = `${siteUrl}/rest/api/3`;
const apiToken = config.providers.jira.api.key;
const email = config.providers.jira.email;

async function fetchJiraIssue(ticketId: string): Promise<JiraIssue> {
  const response = await fetch(
    `${apiUrl}/issue/${ticketId}`,
    {
      headers: {
        "Authorization": `Basic ${btoa(`${email}:${apiToken}`)}`,
        "Accept": "application/json",
      },
    },
  );

  if (response.ok) {
    return await response.json() as JiraIssue;
  } else {
    throw new Error(`Failed to fetch issue: ${response.status}`);
  }
}

async function jiraFetcher(taskIds: string[]): Promise<Task[]> {
  return await Promise.all(taskIds.map(async (id) => {
    const issue = await fetchJiraIssue(id);

    return {
      id: issue.id,
      identifier: id,
      title: issue.fields.summary,
      url: `${siteUrl}/browse/${id}`,
      message: issue.fields.status.name ?? "Unknown",
    };
  }));
}

export { jiraFetcher };
