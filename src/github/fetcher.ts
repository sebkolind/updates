import type { Task } from "../types/task.ts";
import { load } from "../config.ts";
import { Octokit } from "octokit";

const config = await load();
const token = config.providers.github.api.key;

const octokit = new Octokit({ auth: token });

async function fetchGitHubIssue(issueId: number) {
  const [owner, repo] = config.providers.github.repo.split("/");
  const { data } = await octokit.rest.issues.get({
    owner,
    repo,
    issue_number: issueId,
  });

  return data;
}

async function githubFetcher(taskIds: string[]): Promise<Task[]> {
  return await Promise.all(taskIds.map(async (id) => {
    const issue = await fetchGitHubIssue(parseInt(id));

    return {
      id: issue.id.toString(),
      identifier: id,
      title: issue.title,
      url: issue.html_url,
      message: issue.state ?? "Unknown",
    };
  }));
}

export { githubFetcher };
