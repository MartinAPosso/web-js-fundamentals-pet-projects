import { fetchOrgRepos } from "./github";
import { getReposWithMoreThanFiveStars, getLastFiveUpdatedRepos, sumAllStarsRepos, get5RepositoriesWithMoreStars, listAllRepositoriesAlphabetically } from "./logic";

async function main():Promise<void> {
    try{
        const repoData = await fetchOrgRepos("stackbuilders");
        const reposWithMoreThan5Stars = getReposWithMoreThanFiveStars(repoData);
        const lastUpdatedRepos = getLastFiveUpdatedRepos(repoData);
        const totalStars = sumAllStarsRepos(repoData);
        const top5ReposWithMoreStars = get5RepositoriesWithMoreStars(repoData);
        const reposAlphabetically = listAllRepositoriesAlphabetically(repoData);

        console.log("=========== REPOS CON MÁS DE 5 ESTRELLAS ===========");
        console.log(reposWithMoreThan5Stars.map(r => ({name: r.name, stars: r.stargazers_count})));
        console.log("\n=========== ULTIMOS 5 REPOS ACTUALIZADOS ===========");
        console.log(lastUpdatedRepos.map(r => ({name: r.name, last_update: r.updated_at})));
        console.log("\n=========== TOTAL DE ESTRELLAS DE TODOS LOS REPOS ===========");
        console.log("Estrellas totales: ", totalStars);
        console.log("\n=========== TOP 5 REPOS CON MÁS ESTRELLAS ===========");
        console.log(top5ReposWithMoreStars.map(r => ({name: r.name, stars: r.stargazers_count})));
        console.log("\n=========== REPOS ORDENADOS ALFABETICAMENTE (ELIMINADOS REPOS QUE EMPIEZAN CON H) ===========");
        console.log(reposAlphabetically.map(r => ({name: r.name})));



    }catch(error){
        console.log(error);
    }
}

main();