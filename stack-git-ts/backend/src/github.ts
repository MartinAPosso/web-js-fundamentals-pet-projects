export interface GithubRepo{
    name: string;
    stargazers_count: number;
    updated_at: string;
    html_url:string
}

export async function fetchOrgRepos(orgName:string): Promise<GithubRepo[]> {
    const url = `https://api.github.com/orgs/${orgName}/repos`;
    const response = await fetch(url);

    if(!response.ok) throw new Error(`GitHub API error: ${response.status}`);

    const data:GithubRepo[] = await response.json();

    return data;
}