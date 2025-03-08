# Azure OpenAI Chatbot

A Next.js chatbot application powered by Azure OpenAI's GPT-4o model.

## Features

- Real-time streaming chat interface
- Azure OpenAI integration
- Responsive design
- Modern UI with Tailwind CSS and Radix UI components

## Local Development

### Prerequisites

- Node.js (latest LTS version recommended)
- npm, yarn, or pnpm package manager
- Azure OpenAI API key and endpoint

### Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```

3. Create a `.env.local` file in the root directory with your Azure OpenAI credentials:
   ```
   AZURE_OPENAI_API_KEY=your-api-key
   AZURE_OPENAI_ENDPOINT=your-endpoint
   AZURE_OPENAI_DEPLOYMENT=your-deployment-name
   AZURE_OPENAI_API_VERSION=2025-01-01-preview
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deploying to Vercel

### Step 1: Push to GitHub

Make sure your code is pushed to a GitHub repository.

### Step 2: Connect to Vercel

1. Sign up or log in to [Vercel](https://vercel.com)
2. Click "Add New" > "Project"
3. Import your GitHub repository
4. Configure the project:
   - Framework Preset: Next.js
   - Root Directory: ./

### Step 3: Environment Variables

Add the following environment variables in the Vercel project settings:

- `AZURE_OPENAI_API_KEY`: Your Azure OpenAI API key
- `AZURE_OPENAI_ENDPOINT`: Your Azure OpenAI endpoint URL
- `AZURE_OPENAI_DEPLOYMENT`: Your Azure OpenAI deployment name (e.g., "gpt-4o")
- `AZURE_OPENAI_API_VERSION`: The API version (e.g., "2025-01-01-preview")

### Step 4: Deploy

Click "Deploy" and wait for the build to complete.

## Security Considerations

- Never commit your `.env.local` file to version control
- Use environment variables for all sensitive information
- Vercel automatically encrypts your environment variables
- Consider implementing rate limiting for production use

## License

MIT 