interface GithubRepo {
  name: string;
  stargazers_count: number;
  updated_at: string;
  html_url: string;
}

interface Top5MoreStarsProps {
  repos: GithubRepo[];
}

function Top5MoreStars({ repos }: Top5MoreStarsProps) {
  return (
    <section>
      <h2>Top 5 repos con más estrellas</h2>
      <ol>
        {repos.map((repo) => (
          <li key={repo.name}>
            <a href={repo.html_url} target="_blank" rel="noreferrer">
              {repo.name}
            </a>
            {" — ⭐ "}
            {repo.stargazers_count}
          </li>
        ))}
      </ol>
    </section>
  );
}

export default Top5MoreStars;