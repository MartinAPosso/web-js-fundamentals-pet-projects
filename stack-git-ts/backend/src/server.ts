import express, { Request, Response } from "express";
import cors from "cors";
import { fetchOrgRepos } from "./github";
import {
  getReposWithMoreThanFiveStars,
  getLastFiveUpdatedRepos,
  sumAllStarsRepos,
  get5RepositoriesWithMoreStars,
  listAllRepositoriesAlphabetically,
} from "./logic";

const PORT = 3000;
const ORG_NAME = "stackbuilders"

const app = express();

app.use(cors());

app.get("/api/repos/popular", async(req: Request, res: Response) => {
    try{
        const repos = await fetchOrgRepos(ORG_NAME);
        res.json(getReposWithMoreThanFiveStars(repos));
    }catch(error){
        res.status(500).json({error: "Error al obtener repos de Github"})
    }
});

app.get("/api/repos/recent", async(req: Request, res: Response) => {
    try{
        const repos = await fetchOrgRepos(ORG_NAME);
        res.json(getLastFiveUpdatedRepos(repos));
    }catch(error){
        res.status(500).json({error:"Error al obtener repos de Gitbub"});
    }
});

app.get("/api/repos/stars-summary", async(req: Request, res: Response) => {
    try{
        const repos = await fetchOrgRepos(ORG_NAME);
        res.json({total: sumAllStarsRepos(repos)});
    }catch(error){
        res.status(500).json({error:"Error al obtener repos de Gitbub"});
    }
});

app.get("/api/repos/top5", async(req: Request, res: Response) => {
    try{
        const repos = await fetchOrgRepos(ORG_NAME);
        res.json(get5RepositoriesWithMoreStars(repos));
    }catch(error){
        res.status(500).json({error:"Error al obtener repos de Gitbub"});
    }
});

app.get("/api/repos/alphabetical", async(req: Request, res: Response) => {
    try{
        const repos = await fetchOrgRepos(ORG_NAME);
        res.json(listAllRepositoriesAlphabetically(repos));
    }catch(error){
        res.status(500).json({error:"Error al obtener repos de Gitbub"});
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://127.0.0.1:${PORT}`);
});