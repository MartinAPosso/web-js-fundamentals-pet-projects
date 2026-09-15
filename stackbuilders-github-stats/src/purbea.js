// const { getLastFiveUpdatedRepos } = require("./logic");

// const fixture = require("../fixture/temporal-output.json");

// const result = getLastFiveUpdatedRepos(fixture);

// console.log(result.map(repo => ({name: repo.name, updated: repo.updated_at})));
// console.log("Cantidad: ", result.length)

const { getReposWithMoreThanFiveStars, sumAllStarsRepos } = require('./logic');
const fixture = require('../fixture/temporal-output.json');
const result = getReposWithMoreThanFiveStars([]);
console.log(result.map(r => ({ name: r.name, stars: r.stargazers_count })));

console.log(sumAllStarsRepos(fixture));

