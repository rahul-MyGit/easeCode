'use server'

import { generateEmbeddingFromGeminie } from '@/lib/gemine';
import { db } from '@/server/db';
import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { streamText } from 'ai'
import { createStreamableValue } from 'ai/rsc'


const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function askQuestion(question: string, projectId: string) {
    const stream = createStreamableValue();

    const queryVector = await generateEmbeddingFromGeminie(question);
    const vectorQuery = `[${queryVector.join(',')}]`;

    const res = await db.$queryRaw`
    SELECT 'fileName', 'sourceCode', 'summary',
    1 - ("summaryEmbedding" <=> ${vectorQuery}::vector) AS similarity
    FROM "SourceCodeEmbedding"
    WHERE 1 - ("summaryEmbedding" <=> ${vectorQuery}::vector) > 0.5
    AND "projectId" = ${projectId}
    ORDER BY similarity DESC
    LIMIT 10
    ` as {fileName: string, sourceCode: string, summary: string }[];

    let context = '';

    for (const docs of res) {
        context += `source: ${docs.fileName}\ncode content: ${docs.sourceCode}\n summary of file: ${docs.summary}\n\n`
    }

    (async () => {
        const {textStream} = await streamText({
            model: google('gemini-1.5-flash'),
            prompt: `
            You are a ai code assistant who answer questions about the codebase. Your target audience is a technical who just joined the project.
            AI assistant is a brand new, powerful, human-like artificial intelligence.
            The traits of AI include expert knowledge , helpfulness, cleaverness, and articulateness.
            AI is a well-behaved and polite and well-mannered individual.
            AI is always friendly, and never uses edgy language, and inspiring and eager to provide vivid and clear response to the user.
            AI has the sum of all the knowlede in their brain, and is able to articulate answer nearly any question about any topic in tech.
            If the questions is asking about the code or a specific file, AI will provide the detailed information answer. Giving step by step instructions on how to fix the problem.
            START CONTEXT BLOCK
            context: ${context}
            END CONTEXT BLOCK

            START QUESTION
            question: ${question}
            END OF QUESTION
            AI assistant will take into account any CONTEXT BLOCK that is provided in a conversation.
            If the context does not provide the answer to question, the AI assistance will say, "I'm sorry, but i don't know about your query"
            AI assistant will not apologize for the previous response, but instead will indicated new ingormation was gained.
            AI assistant will not invent anything that is not drawn directly from the context.
            AI assistant will not hallucinate, if it does not know the answer, it will say so.
            Answer in markdown syntax, with code snippet if needed. Be as detailed as possible when asnwering, make sure there is an reasoning for the answer.

            `
        });

        for await (const delta of textStream){
            stream.update(delta);
        }

        stream.done();
    })();

    return {
        output: stream,
        fileReferences: res
    }
}
