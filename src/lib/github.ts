import { db } from "@/server/db";
import { Octokit } from "octokit";

export const octokit = new Octokit({
    oauth: process.env.GITHUB_ACCESS_TOKEN,
});

const githubUrl = 'https://github.com/docker/genai-stack'

type Response = {
    commitHash: string;
    commitMessage: string;
    commitAuthorAvatar: string;
    commitAuthorName: string;
    commitDate: string;
}

export const getCommitHashes = async (githubUrl: string): Promise<Response[]> => {
    const {data} = await octokit.rest.repos.listCommits({
        owner: 'docker',
        repo: 'genai-stack',
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
    return unProcessCommit;
}

//TODO: Implement this
export const summarizeCommits = async (githubUrl: string, commitHash: string) => {

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

await pollCommits("5dc56f59-57b2-4746-b6f9-114c16a78e5b").then(console.log);