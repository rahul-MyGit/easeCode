import { GithubRepoLoader } from '@langchain/community/document_loaders/web/github';
import { Document } from 'langchain/document';
import { generateEmbeddingFromGeminie, summarizeCode } from './gemine';
import { db } from '@/server/db';

export const githubRepoLoader = async (githubUrl: string, githubToken?: string) => {
    const loader = new GithubRepoLoader(githubUrl, {
        accessToken: githubToken || '',
        branch: 'main',
        ignoreFiles: [
            'node_modules',
            'yarn.lock',
            'pnpm-lock.yaml',
            'bun.lockb',
            'dist',
            'build',
            'public',
            'package-lock.json',

        ],
        recursive: true,
        unknown: 'warn',
        maxConcurrency: 5,
    });

    const docs = await loader.load();
    return docs;
}


// console.log( await githubRepoLoader('https://github.com/rahul-MyGit/subdomain'));
/* OUTPUT 
 Document {
    pageContent: "import ActionButton from '../common/ActionButton';\n\nexport default function Contact({ content, actions }: { \n    content: any;\n    actions?: { label: string; type: 'link' | 'modal' | 'scroll'; target: string; }[];\n}) {\n    return (\n        <div id=\"contact\" className=\"py-16 px-4\">\n            <div className=\"max-w-3xl mx-auto text-center\">\n                <h2 className=\"text-3xl font-bold mb-8\">Contact Us</h2>\n                <div className=\"space-y-4 mb-8\">\n                    <p>{content.address}</p>\n
        <p>{content.phone}</p>\n                    <p>{content.email}</p>\n                </div>\n                {actions && (\n                    <div className=\"flex justify-center gap-4\">\n                        {actions.map((action, index) => (\n                            <ActionButton\n
            key={index}\n                                {...action}\n
                  />\n                        ))}\n                    </div>\n                )}\n            </div>\n        </div>\n    );\n} ",
    metadata: {
      source: "src/components/sections/Contact.tsx",
      repository: "https://github.com/rahul-MyGit/subdomain",
      branch: "main",
    },
    id: undefined,
  }
*/


export const indexGithubRepo = async (projectId: string, githubUrl: string, githubToken?: string) => {
    const docs = await githubRepoLoader(githubUrl, githubToken);

    const allEmbeddings = await generateEmbeddings(docs);

    await Promise.allSettled(allEmbeddings.map(async (embedding, index) => {
        if(!embedding) return;

        const sourceCodeEmbedding = await db.sourceCodeEmbedding.create({
            data: {
                summary: embedding.summary,
                sourcecode: embedding.sourcecode,
                fileName: embedding.fileName,
                projectId,
            }
        });

        await db.$executeRaw`
        UPDATE "SourceCodeEmbedding"
        SET "summaryEmbedding" = ${embedding.embedding}::vector
        WHERE id = ${sourceCodeEmbedding.id}
        `
    }))
    
}


const generateEmbeddings = async (docs: Document[]) => {
    return await Promise.all(docs.map(async doc => {
        const summary = await summarizeCode(doc)
        const embedding = await generateEmbeddingFromGeminie(summary)
        return {
            summary,
            embedding,
            sourcecode: JSON.parse(JSON.stringify(doc.pageContent)),
            fileName: doc.metadata.source
        }
    }))
}
