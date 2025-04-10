import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { pollCommits } from "@/lib/github";
import { indexGithubRepo } from "@/lib/githubRepLoader";

export const projectRouter = createTRPCRouter({
    createProject: protectedProcedure.input(
        z.object({
            name: z.string(),
            githubUrl: z.string(),
            githubToken: z.string().optional(),
        })
    ).mutation(async ({ctx, input}) => {
       const project = await ctx.db.project.create({
        data: {
            githubUrl: input.githubUrl,
            name: input.name,
            userToProject: {
                create: {
                    userId: ctx.user.userId!
                }
            }
        }
       });
       
       await indexGithubRepo(project.id, input.githubUrl, input.githubToken);
       await pollCommits(project.id);
       return project;
    }),

    getProjects: protectedProcedure.query(async ({ctx}) => {
        return await ctx.db.project.findMany({
            where: {
                userToProject: {
                    some: {
                        userId: ctx.user.userId!
                    }
                },
                deletedAt: null
            }
        })
    }),

    getCommits: protectedProcedure.input(
        z.object({
            projectId: z.string(),
        })
    ).query(async ({ctx, input}) => {
        pollCommits(input.projectId).then().catch(console.error);
        return await ctx.db.commit.findMany({ where: { projectId: input.projectId } });
    }),

    savedAnswer: protectedProcedure.input(
        z.object({
            question: z.string(),
            answer: z.string(),
            fileReferences: z.any(),
            projectId: z.string(),
        })
    ).mutation(async ({ctx, input}) => {
        return await ctx.db.question.create({
            data: {
                question: input.question,
                answer: input.answer,
                fileReferences: input.fileReferences,
                projectId: input.projectId,
                userId: ctx.user.userId!
            }
        })
    })
})