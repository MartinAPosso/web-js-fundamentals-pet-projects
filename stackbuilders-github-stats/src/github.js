async function fetchOrgRepos(orgName) {
    const url = `https://api.github.com/orgs/${orgName}/repos`;
    const response = await fetch(url);

    if(!response.ok) throw new Error(`Something went wrong: ${response.status}`);

    const data = await response.json();

    return data;
}

module.exports = { fetchOrgRepos };

if (require.main === module) {
  fetchOrgRepos("stackbuilders").then(data => {
    console.log(JSON.stringify(data, null, 2));
  });
}