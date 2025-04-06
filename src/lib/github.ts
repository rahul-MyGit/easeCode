import { db } from "@/server/db";
import { Octokit } from "octokit";
import axios from "axios";
import { aiSummariseCommit } from "./gemine";

export const octokit = new Octokit({
    oauth: process.env.GITHUB_ACCESS_TOKEN,
});

// const githubUrl = 'https://github.com/docker/genai-stack'

type Response = {
    commitHash: string;
    commitMessage: string;
    commitAuthorAvatar: string;
    commitAuthorName: string;
    commitDate: string;
}
//https://github.com/owner/repo/commits/main
//githuburl/commmit/hash.diff -> to get the diff
export const getCommitHashes = async (githubUrl: string): Promise<Response[]> => {
    const [owner, repo] = githubUrl.split('/').slice(-2);
    if(!owner || !repo) throw new Error("Invalid Github URL");
    const {data} = await octokit.rest.repos.listCommits({
        owner: owner,
        repo: repo,
    });

    const sortedCommits = data.sort((a:any, b:any) => new Date(b.commit.author.date).getTime() - new Date(a.commit.author.date).getTime()) as any[];

    return sortedCommits.slice(0, 10).map((commit: any) => ({
        commitHash: commit.sha as string,
        commitMessage: commit.commit.message ?? "",
        commitAuthorAvatar: commit?.author?.avatar_url ?? "",
        commitAuthorName: commit.commit?.author?.name ?? "",
        commitDate: commit.commit?.author?.date ?? "",
    }));
}

export const pollCommits = async (projectId: string) => {
    const {project, githubUrl} = await fetchProjectGithubUrl(projectId);
    const commmitHashes = await getCommitHashes(githubUrl);
    const unProcessCommit = await filterUnprocessedCommits(projectId, commmitHashes);
    const summariesResponse = await Promise.allSettled(unProcessCommit.map( (commit) => {
        return summarizeCommits(githubUrl, commit.commitHash)
    }))

    const summaries = summariesResponse.map((summary) => {
        if(summary.status === "fulfilled") {
            return summary.value as string
        }
        return ""
    })

    const commits = await db.commit.createMany({
        data: summaries.map((summary, index) => {
            console.log('processin commit', index)
            return {
                projectId: projectId,
                commitHash: unProcessCommit[index]!.commitHash,
                summary,
                commitMessage: unProcessCommit[index]!.commitMessage,
                commitAuthorName: unProcessCommit[index]!.commitAuthorName,
                commitAuthorAvatar: unProcessCommit[index]!.commitAuthorAvatar,
                commitDate: unProcessCommit[index]!.commitDate,
            }
        })
    })
    
    return commits;
}

export const summarizeCommits = async (githubUrl: string, commitHash: string) => {
    const { data } = await axios.get(`${githubUrl}/commit/${commitHash}.diff`, {
        headers: {
            Accept: 'application/vnd.github.v3.diff',
        }
    })
    return await aiSummariseCommit(data) || ""
}

async function fetchProjectGithubUrl(projectId: string){
    const project = await db.project.findUnique({
        where: {id: projectId},
        select: {
            githubUrl: true,
        }
    });

    if(!project?.githubUrl) throw new Error("Github URL not found");

    return {project, githubUrl: project?.githubUrl}
}


async function filterUnprocessedCommits(projectId: string, commitHashes: Response[]){
    const processedCommits = await db.commit.findMany({
        where: {
            projectId: projectId,
        }
    });

    const unprocessedCommits = commitHashes.filter((commit) => !processedCommits.some((processedCommit) => processedCommit.commitHash === commit.commitHash));

    return unprocessedCommits;
}
