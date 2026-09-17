export interface GithubRepo{
    name: string;
    stargazers_count: number;
    updated_at: string;
    html_url:string;
}

const BASE_URL = "http://localhost:3000/api/repos";

export async function fetchPopularRepos():Promise<GithubRepo[]> {
    const response = await fetch(`${BASE_URL}/popular`);
    if(!response.ok) throw new Error(`Error: ${response.status}`);
    return response.json();
}

export async function fetchRecentRepos():Promise<GithubRepo[]> {
    const response = await fetch(`${BASE_URL}/recent`);
    if(!response.ok) throw new Error(`Error: ${response.status}`);
    return response.json();
}

export async function fetchStarSummaryRepos():Promise<number> {
    const response = await fetch(`${BASE_URL}/stars-summary`);
    if(!response.ok) throw new Error(`Error: ${response.status}`);
    const data: { total: number } = await response.json();
    return data.total;
}

export async function fetchTop5StarsRepos():Promise<GithubRepo[]> {
    const response = await fetch(`${BASE_URL}/top5`);
    if(!response.ok) throw new Error(`Error: ${response.status}`);
    return response.json();
}

export async function fetchAlphabeticallyRepos():Promise<GithubRepo[]> {
    const response = await fetch(`${BASE_URL}/alphabetical`);
    if(!response.ok) throw new Error(`Error: ${response.status}`);
    return response.json();
}

