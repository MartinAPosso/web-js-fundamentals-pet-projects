import { getReposWithMoreThanFiveStars, getLastFiveUpdatedRepos, sumAllStarsRepos, get5RepositoriesWithMoreStars, listAllRepositoriesAlphabetically} from "./logic";
import fixture from "../fixtures/sample-output.json";
import { GithubRepo } from "./github";

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
        const oneRepo = [{name: "test-repo", stargazers_count: 34, updated_at: "2025-11-27T17:14:07Z", html_url:""}]
        const result = sumAllStarsRepos(oneRepo);

        expect(result).toBe(34);
    })
});



describe("get5RepositoriesWithMoreStars", () => {
    test("Returns a maximum of 5 elements", () => {
    const result = get5RepositoriesWithMoreStars(fixture);
    expect(result.length).toBeLessThanOrEqual(5);
  });

  test("Returns the repos sorted from highest to lowest number of stars", () => {
    const result = get5RepositoriesWithMoreStars(fixture);

    for (let i = 0; i < result.length - 1; i++) {
      expect(result[i].stargazers_count).toBeGreaterThanOrEqual(
        result[i + 1].stargazers_count
      );
    }
  });

  test("Returns exactly the 5 repos with the most stars in the fixture", () => {
    const manualTop5 = [...fixture]
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 5)
      .map((r) => r.name);

    const result = get5RepositoriesWithMoreStars(fixture).map((r) => r.name);

    expect(result).toEqual(manualTop5);
  });

  test("Returns all repos if there are fewer than 5", () => {
    const pocosRepos: GithubRepo[] = fixture.slice(0, 3);
    const result = get5RepositoriesWithMoreStars(pocosRepos);
    expect(result).toHaveLength(3);
  });

  test("Returns an empty array if it receives an empty array", () => {
    const result = get5RepositoriesWithMoreStars([]);
    expect(result).toEqual([]);
  });

  test("Does not modify the original array", () => {
    const originalLength = fixture.length;
    get5RepositoriesWithMoreStars(fixture);
    expect(fixture).toHaveLength(originalLength);
  });

});

describe("listAllRepositoriesAlphabetically", () => {

    test("None of the repos in the results begin with ‘h’ (uppercase or lowercase)", () => {
    const result = listAllRepositoriesAlphabetically(fixture);

    result.forEach((repo) => {
      expect(repo.name.toLowerCase().startsWith("h")).toBe(false);
    });
  });

  test("The repos are listed alphabetically", () => {
    const result = listAllRepositoriesAlphabetically(fixture);

    for (let i = 0; i < result.length - 1; i++) {
      const comparison = result[i].name.localeCompare(result[i + 1].name);
      expect(comparison).toBeLessThanOrEqual(0);
    }
  });

  test("Correctly excludes a manually created repo that starts with 'h'", () => {
    const repos: GithubRepo[] = [
      { name: "hola-mundo", stargazers_count: 1, updated_at: "2024-01-01T00:00:00Z", html_url:""},
      { name: "Hello-world", stargazers_count: 2, updated_at: "2024-01-01T00:00:00Z", html_url:""},
      { name: "zeta", stargazers_count: 3, updated_at: "2024-01-01T00:00:00Z", html_url:""},
    ];

    const result = listAllRepositoriesAlphabetically(repos).map((r) => r.name);

    expect(result).toEqual(["zeta"]);
  });

  test("Returns an empty array if all repos start with 'h'", () => {
    const repos: GithubRepo[] = [
      { name: "hola", stargazers_count: 1, updated_at: "2024-01-01T00:00:00Z", html_url:""},
      { name: "Hello", stargazers_count: 2, updated_at: "2024-01-01T00:00:00Z", html_url:""}
    ];

    expect(listAllRepositoriesAlphabetically(repos)).toEqual([]);
  });

  test("Returns an empty array if it receives an empty array", () => {
    expect(listAllRepositoriesAlphabetically([])).toEqual([]);
  });

  test("Does not modify the original array", () => {
    const originalLength = fixture.length;
    listAllRepositoriesAlphabetically(fixture);
    expect(fixture).toHaveLength(originalLength);
  });
});

