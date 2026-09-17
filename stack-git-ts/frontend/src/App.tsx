import { useState, useEffect } from "react";
import { 
  fetchPopularRepos,
  fetchRecentRepos,
  fetchStarSummaryRepos,
  fetchTop5StarsRepos,
  fetchAlphabeticallyRepos
 } from "./api/backend";

import type { GithubRepo } from "./api/backend";
import StarSummary from "./components/StarSummary";
import PopularRepos from "./components/PopularRepos";
import RecentRepos from "./components/RecentRepos";
import Top5MoreStars from "./components/Top5MoreStars";
import AlphabeticalRepos from "./components/AlphabeticalRepos";

function App() {
  const [popularRepos, setPopularRepos] = useState<GithubRepo[]>([]);
  const [recentRepos, setRecentRepos] = useState<GithubRepo[]>([]);
  const [totalStars, setStarSummaryRepos] = useState<number>(0);
  const [top5Repos, setTop5Repos] = useState<GithubRepo[]>([]);
  const [alphabeticalRepos, setAlphabeticalRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      fetchPopularRepos(),
      fetchRecentRepos(),
      fetchStarSummaryRepos(),
      fetchTop5StarsRepos(),
      fetchAlphabeticallyRepos()
    ])
      .then(([popular, recent, starSummary, top5, alphabetical]) =>{
        setPopularRepos(popular);
        setRecentRepos(recent);
        setStarSummaryRepos(starSummary);
        setTop5Repos(top5);
        setAlphabeticalRepos(alphabetical);
        setLoading(false);
      })
      .catch(error =>{
        setError(error);
        setLoading(false);
      })
  }, []);

  if (loading) return <p>Cargando repositorios...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Stack Builders — GitHub Stats</h1>
      <StarSummary totalStars={totalStars} />
      <PopularRepos repos={popularRepos} />
      <RecentRepos repos={recentRepos} />
      <Top5MoreStars repos={top5Repos} />
      <AlphabeticalRepos repos={alphabeticalRepos} />
    </div>
  );
}

export default App;