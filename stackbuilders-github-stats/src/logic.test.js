const { getReposWithMoreThanFiveStars, getLastFiveUpdatedRepos, sumAllStarsRepos } = require('./logic');
const fixture = require('../fixture/sample-output.json');

describe("getReposWithMoreThanFiveStars", () => {

    test("Only includes repos with more than five stars", () => {
        const result = getReposWithMoreThanFiveStars(fixture);

        result.forEach(repo => {
            expect(repo.stargazers_count).toBeGreaterThan(5);
        });
    });

    test("Repo with name 'valid_data' and 5 stars expected not to be in the result", () => {
        const result = getReposWithMoreThanFiveStars(fixture);
        const reposNames = result.map(repo => repo.name);

        expect(reposNames).not.toContain("valid_data");
    });

    test("Returns an empty array if the array passed as argument contains no elements", () => {
        const result = getReposWithMoreThanFiveStars([]);
        
        expect(result).toEqual([]);
    });

    test("The original array must not be modified after calling the function", () => {
        const originalLength = fixture.length;
        getReposWithMoreThanFiveStars(fixture);
        expect(fixture).toHaveLength(originalLength);
    });

});


describe("getLastFiveUpdatedRepos", () => {

    test("The returned array must have length 5", () => {
        const result = getLastFiveUpdatedRepos(fixture);

        expect(result).toHaveLength(5);
    })

    test("The values must be in descending order", () => {
        const result = getLastFiveUpdatedRepos(fixture);
        const reposUpdateDate = result.map(repo => new Date(repo.updated_at));

        for(let i = 0; i < result.length - 1; i++){
            expect(reposUpdateDate[i].getTime()).toBeGreaterThanOrEqual(reposUpdateDate[i+1].getTime());
        }
    });

    test("Returns all repos if the array passed as argument has less than 5", () => {
        const lessRepos = fixture.slice(0,3);
        const result = getLastFiveUpdatedRepos(lessRepos);

        expect(result).toHaveLength(3);
    });

    test("Returns an empty array if the array passed as argument contains no elements", () => {
        const result = getLastFiveUpdatedRepos([]);

        expect(result).toEqual([]);
    });

});

describe("sumAllStarsRepos", () => {
    test("Sum of all repos stars must be 306", () => {
        const result = sumAllStarsRepos(fixture);
        expect(result).toBe(306);
    });

    test("Returns 0 if the array passed as argument contains no elements", () => {
        const result = sumAllStarsRepos([]);
        expect(result).toBe(0);
    });

    test("Returns exactly the stars when there is only one repo", () => {
        const oneRepo = [{name: "test-repo", stargazers_count: 34}]
        const result = sumAllStarsRepos(oneRepo);

        expect(result).toBe(34);
    })
})

