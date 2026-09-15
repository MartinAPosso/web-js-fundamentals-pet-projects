function getReposWithMoreThanFiveStars(repos){
    if(!repos) return [];

    return repos.filter(repo => repo.stargazers_count > 5);
}

function getLastFiveUpdatedRepos(repos){
    if(!repos) return [];
    
    const reposCopy = [...repos];

    const sortedRepos = reposCopy.sort((a,b) => new Date(b.updated_at) - new Date(a.updated_at));

    return sortedRepos.slice(0,5);
}

function sumAllStarsRepos(repos){
    if(!repos) return 0;

    return repos.reduce((total, repo) => total + repo.stargazers_count, 0)

}

module.exports = { 
    getReposWithMoreThanFiveStars,
    getLastFiveUpdatedRepos,
    sumAllStarsRepos
};