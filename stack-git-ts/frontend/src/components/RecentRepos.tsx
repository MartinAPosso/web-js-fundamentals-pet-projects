interface GithubRepo {
  name: string;
  stargazers_count: number;
  updated_at: string;
  html_url: string;
}

interface RecentReposProps {
  repos: GithubRepo[];
}

function RecentRepos({ repos }: RecentReposProps) {
  return (
    <section>
      <h2>Últimos 5 repos actualizados</h2>
      <ul>
        {repos.map((repo) => (
          <li key={repo.name}>
            <a href={repo.html_url} target="_blank" rel="noreferrer">
              {repo.name}
            </a>
            {" — actualizado el "}
            {new Date(repo.updated_at).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default RecentRepos;