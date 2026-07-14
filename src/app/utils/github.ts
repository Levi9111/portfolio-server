import config from '../config';

interface GitHubSearchCommitItem {
  sha: string;
  commit: {
    author: {
      name: string;
      email: string;
      date: string;
    };
    message: string;
  };
  html_url: string;
  repository: {
    full_name: string;
    html_url: string;
  };
}

interface GitHubSearchResponse {
  total_count: number;
  items: GitHubSearchCommitItem[];
}

/**
 * Fetches the latest commits globally across all repositories for a specified author.
 */
export async function fetchGithubCommits(
  author: string = 'Levi9111',
  limit: number = 10
): Promise<GitHubSearchCommitItem[]> {
  const token = config.github_api_token;

  if (!token) {
    throw new Error('GITHUB_API_TOKEN is not configured in environment variables.');
  }

  const url = `https://api.github.com/search/commits?q=author:${author}&sort=author-date&order=desc&per_page=${limit}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/vnd.github.cloak-preview+json',
      'Authorization': `Bearer ${token}`,
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });

  if (!response.ok) {
    throw new Error(`GitHub API returned ${response.status}: ${response.statusText}`);
  }

  const result = (await response.json()) as GitHubSearchResponse;
  return result.items || [];
}

/**
 * Fetches commits from the GitHub repository and logs them to the console.
 */
export async function fetchAndLogGithubCommits(
  author: string = 'Levi9111',
  limit: number = 10
): Promise<void> {
  try {
    console.log(`📡 Fetching latest ${limit} central commits for author: ${author}...`);
    const commits = await fetchGithubCommits(author, limit);

    console.log(`\n================ LATEST ${limit} COMMITS FOR AUTHOR: ${author.toUpperCase()} (CENTRAL FEED) ================`);
    commits.forEach((item, index) => {
      console.log(`${index + 1}. [${item.sha.substring(0, 7)}] in ${item.repository.full_name}`);
      console.log(`   Author: ${item.commit.author.name} on ${new Date(item.commit.author.date).toLocaleString()}`);
      console.log(`   Message: ${item.commit.message.split('\n')[0]}`);
      console.log(`   Commit URL: ${item.html_url}`);
      console.log(`   Repo URL: ${item.repository.html_url}`);
      console.log('--------------------------------------------------------------------------------');
    });
    console.log('================================================================================\n');
  } catch (error: any) {
    console.error('❌ Error fetching GitHub commits:', error.message || error);
  }
}
