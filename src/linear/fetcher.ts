import type { Task } from "../types/task.ts";

import { type Issue, LinearClient } from "@linear/sdk";
import { load } from "@std/dotenv";

const env = await load();

const apiKey = env.LINEAR_API_KEY;

const client = new LinearClient({ apiKey });

async function fetchLinearIssue(ticketId: string): Promise<Issue> {
  const issue = await client.issue(ticketId);

  if (!issue) {
    throw new Error(`Failed to fetch issue with ID: ${ticketId}`);
  }

  return issue;
}

async function linearFetcher(taskIds: string[]): Promise<Task[]> {
  const tasks = taskIds.map(async (id) => {
    const issue = await fetchLinearIssue(id);
    const state = await issue.state;

    return {
      id: issue.id,
      identifier: id,
      title: issue.title,
      url: issue.url,
      message: state?.name === "Done" ? "Ready for QA" : "Work in Progress",
    };
  });

  return await Promise.all(tasks);
}

export { linearFetcher };
