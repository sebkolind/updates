import { load } from "@std/dotenv";

import type { JiraIssue } from "./types.ts";
import type { Task } from "../types/task.ts";

const env = await load();

const jiraSiteUrl = env.JIRA_SITE_URL;
const jiraUrl = env.JIRA_API_URL;
const apiToken = env.JIRA_API_TOKEN;
const email = "sebastian.sorensen@public.com";

async function fetchJiraIssue(ticketId: string): Promise<JiraIssue> {
  const response = await fetch(
    `${jiraUrl}/issue/${ticketId}`,
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
      url: `${jiraSiteUrl}/browse/${id}`,
      // TODO This is very specific to the Jira instance we're using, and should maybe be generic.
      // ? Maybe allow some sort of extension of a provider to allow for custom logic?
      message: issue.fields.customfield_10040 ? "Ready for QA" : undefined,
    };
  }));
}

export { jiraFetcher };
