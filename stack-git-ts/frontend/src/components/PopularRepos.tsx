interface GithubRepo{
    name: string;
    stargazers_count: number;
    updated_at: string;
    html_url: string;
}

interface PopularReposProps{
    repos: GithubRepo[];
}

function PopularRepos({ repos }:PopularReposProps){
    return(
        <section>
            <h2>Repos con más de 5 estrellas ({repos.length})</h2>
            <ul>
                {repos.map((repo) => (
                    <li key={repo.name}>
                        <a href={repo.html_url} target="_blank" rel="noreferrer">
                            {repo.name}
                        </a>
                        {" — ⭐ "}
                        {repo.stargazers_count}
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default PopularRepos;