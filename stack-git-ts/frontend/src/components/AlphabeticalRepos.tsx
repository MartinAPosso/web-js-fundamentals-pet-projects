interface GithubRepo {
  name: string;
  stargazers_count: number;
  updated_at: string;
  html_url: string;
}

interface AlphabeticalReposProps {
  repos: GithubRepo[];
}

function AlphabeticalRepos({ repos }: AlphabeticalReposProps) {
  return (
    <section>
      <h2>Repos en orden alfabético (sin los que empiezan con "h")</h2>
      <p>Total: {repos.length}</p>
      <ul>
        {repos.map((repo) => (
          <li key={repo.name}>{repo.name}</li>
        ))}
      </ul>
    </section>
  );
}

export default AlphabeticalRepos;