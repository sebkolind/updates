import { load } from "../config.ts";
import type { Task } from "../types/task.ts";

const config = await load();

const apiUrl = "https://api.github.com";
const token = config.providers.github.api.key;

async function fetchGitHubIssue(issueId: string): Promise<any> {
  const response = await fetch(
    `${apiUrl}/repos/${config.providers.github.repo}/issues/${issueId}`,
    {
      headers: {
        "Authorization": `token ${token}`,
        "Accept": "application/vnd.github.v3+json",
      },
    },
  );

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error(`Failed to fetch issue: ${response.status}`);
  }
}

async function githubFetcher(taskIds: string[]): Promise<Task[]> {
  return await Promise.all(taskIds.map(async (id) => {
    const issue = await fetchGitHubIssue(id);

    return {
      id: issue.id,
      identifier: id,
      title: issue.title,
      url: issue.html_url,
      message: issue.state ?? "Unknown",
    };
  }));
}

export { githubFetcher };
