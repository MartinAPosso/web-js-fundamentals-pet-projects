const { fetchOrgRepos } = require('./github');
const { getReposWithMoreThanFiveStars, getLastFiveUpdatedRepos, sumAllStarsRepos } = require('./logic');

async function main() {
    try{
        const repoData = await fetchOrgRepos("stackbuilders");
        const reposWithMoreThan5Stars = getReposWithMoreThanFiveStars(repoData);
        const lastUpdatedRepos = getLastFiveUpdatedRepos(repoData);
        const totalStars = sumAllStarsRepos(repoData);

        console.log("=========== REPOS CON MÁS DE 5 ESTRELLAS ===========");
        console.log(reposWithMoreThan5Stars.map(r => ({name: r.name, stars: r.stargazers_count})));
        console.log("\n=========== ULTIMOS 5 REPOS ACTUALIZADOS ===========");
        console.log(lastUpdatedRepos.map(r => ({name: r.name, last_update: r.updated_at})));
        console.log("\n=========== TOTAL DE ESTRELLAS DE TODOS LOS REPOS ===========");
        console.log("Estrellas totales: ", totalStars);
    }catch(error){
        console.log(error);
    }
    

}

main();