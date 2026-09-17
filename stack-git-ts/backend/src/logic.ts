import { GithubRepo } from "./github";

export  function getReposWithMoreThanFiveStars(repos:GithubRepo[]):GithubRepo[]{
    if(!repos) return [];

    return repos.filter(repo => repo.stargazers_count > 5);
}

export function getLastFiveUpdatedRepos(repos:GithubRepo[]):GithubRepo[]{
    if(!repos) return [];
    
    const reposCopy = [...repos];

    const sortedRepos = reposCopy.sort((a,b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());

    return sortedRepos.slice(0,5);
}

export function sumAllStarsRepos(repos:GithubRepo[]):number{
    if(!repos) return 0;

    return repos.reduce((total, repo) => total + repo.stargazers_count, 0)

}

export function get5RepositoriesWithMoreStars(repos:GithubRepo[]):GithubRepo[]{
    const reposCopy = [...repos];

    const repoSorted = reposCopy.sort((a,b) => b.stargazers_count - a.stargazers_count);

    return repoSorted.slice(0, 5);
}

export function listAllRepositoriesAlphabetically(repos:GithubRepo[]):GithubRepo[]{
    const reposCopy = [...repos];

    const repoSorted = reposCopy.sort((a,b) => a.name.localeCompare(b.name));

    const reposWithoutH = repoSorted.filter(repo => !repo.name.toLowerCase().startsWith('h'));
    
    return reposWithoutH;
}

