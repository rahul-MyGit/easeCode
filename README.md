# EaseCode - AI-Powered GitHub Repository Code Assistant 

> Intelligent code exploration platform that lets you import any GitHub repository and ask questions to AI, getting precise answers with exact code references and file locations using advanced semantic search.

[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748)](https://www.prisma.io/)
[![tRPC](https://img.shields.io/badge/tRPC-API-2596BE)](https://trpc.io/)

## Overview

**EaseCode** is an innovative AI-powered code intelligence platform designed to revolutionize how developers understand and navigate GitHub repositories. By combining cutting-edge artificial intelligence with semantic search technology, EaseCode enables developers to:

- **Import any GitHub repository** instantly
- **Ask natural language questions** about the codebase
- **Get AI-generated answers** with precise code references
- **View exact file locations** and line numbers
- **Leverage semantic search** for intelligent code discovery

Perfect for developers looking to understand unfamiliar codebases, onboard to new projects faster, or quickly locate specific implementations within large repositories.

## Key Features

### AI-Powered Code Understanding
- **Natural Language Queries**: Ask questions in plain English about any codebase using Vercel AI SDK
- **Context-Aware Responses**: Get intelligent answers powered by Google Gemini AI based on actual repository code
- **Code Snippet Extraction**: Automatically identifies and highlights relevant code blocks
- **LangChain Integration**: Advanced document processing and semantic analysis

### Advanced Semantic Search
- **Intelligent Code Search**: Goes beyond simple text matching
- **Semantic Analysis**: Understands code context and relationships
- **Fast Retrieval**: Quickly finds relevant code across large repositories

### GitHub Repository Integration
- **Seamless Import**: Clone and index any public GitHub repository
- **Repository Analysis**: Automatic codebase indexing and processing
- **Multi-Repository Support**: Manage and search across multiple projects

### Developer-Friendly Interface
- **Clean Dashboard**: Intuitive UI for repository management
- **Code References**: Direct links to source files with line numbers
- **Question History**: Track your queries and answers
- **Commit Log Tracking**: View repository commit history

## AI & Machine Learning Stack

EaseCode leverages cutting-edge AI technologies to provide intelligent code analysis:

- **[Vercel AI SDK](https://sdk.vercel.ai/)** (`ai`, `@ai-sdk/google`) - Unified interface for AI model integration with streaming support
- **[Google Gemini AI](https://ai.google.dev/)** (`@google/generative-ai`) - State-of-the-art language model for code understanding
- **[LangChain](https://www.langchain.com/)** (`@langchain/community`, `@langchain/core`) - Framework for document loading, text splitting, and embeddings
- **Semantic Search Engine** - Custom implementation for intelligent code retrieval

## Tech Stack

Built with modern web technologies for performance and scalability:

- **Frontend**: [Next.js 15](https://nextjs.org/) - React framework with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Type-safe development
- **API Layer**: [tRPC](https://trpc.io/) - End-to-end typesafe APIs
- **Database**: [Prisma ORM](https://www.prisma.io/) - Type-safe database access
- **Authentication**: [Clerk](https://clerk.com/) - User authentication and management
- **AI Integration**: [Vercel AI SDK](https://sdk.vercel.ai/) with Google Gemini - Advanced language model integration
- **AI Tools**: [LangChain](https://www.langchain.com/) - Framework for building AI applications
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) - Accessible component library

## Installation

### Prerequisites

- Node.js 18.x or higher
- Bun package manager (or npm/yarn/pnpm)
- PostgreSQL database
- Clerk account for authentication
- Google Gemini API key for AI-powered features

### Setup Instructions

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/easeCode.git
cd easeCode
```

2. **Install dependencies**
```bash
bun install
```

3. **Configure environment variables**

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/easecode"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Google Gemini AI
GEMINI_API_KEY=your_gemini_api_key

# GitHub Integration
GITHUB_TOKEN=your_github_token

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. **Set up the database**
```bash
bunx prisma generate
bunx prisma db push
```

5. **Start the development server**
```bash
bun run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## Usage

### Import a GitHub Repository

1. Navigate to the **Create** page
2. Enter the GitHub repository URL
3. Click **Import Repository**
4. Wait for the indexing process to complete

### Ask Questions About Your Code

1. Go to the **Dashboard**
2. Select your imported repository
3. Type your question in natural language
   - Example: "How does authentication work?"
   - Example: "Where is the database connection configured?"
4. Receive AI-generated answers with code references

### Explore Code with Semantic Search

- Use the **Q&A** page to perform semantic searches
- View commit history and code references
- Navigate directly to source files

## Project Structure

```
easeCode/
├── src/
│   ├── app/                  # Next.js App Router pages
│   │   ├── (auth)/          # Authentication pages
│   │   ├── (protected)/     # Protected dashboard pages
│   │   └── api/             # API routes
│   ├── components/          # React components
│   │   └── ui/              # shadcn/ui components
│   ├── server/              # Server-side code
│   │   ├── api/             # tRPC routers
│   │   └── db.ts            # Database client
│   ├── lib/                 # Utility functions
│   │   ├── gemine.ts        # AI integration
│   │   ├── github.ts        # GitHub API
│   │   └── githubRepLoader.ts
│   └── hooks/               # Custom React hooks
├── prisma/                  # Database schema
└── public/                  # Static assets
```

## Contributing

Contributions are welcome! Here's how you can help

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Links

- **Documentation**: [Coming Soon]
- **Bug Reports**: [GitHub Issues](https://github.com/yourusername/easeCode/issues)
- **Feature Requests**: [GitHub Discussions](https://github.com/yourusername/easeCode/discussions)

## Acknowledgments

Built with the [T3 Stack](https://create.t3.gg/) - A type-safe, full-stack TypeScript framework.

## Contact

For questions or support, please open an issue on GitHub.

---

**Keywords**: GitHub code assistant, AI-powered code search, semantic code search, repository analysis, code intelligence, developer tools, AI code understanding, GitHub integration, code question answering, source code exploration, Next.js AI app, TypeScript code analysis, automated code documentation, repository import tool, codebase navigation, Vercel AI SDK, Google Gemini AI, LangChain integration, AI code assistant, semantic code analysis, machine learning code search, intelligent repository explorer
