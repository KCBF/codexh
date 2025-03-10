

## ✨ Features

- **AI-Powered Chat Interface**: Real-time streaming conversations with GPT-4o for language practice
- **Text-to-Speech**: Natural voice output using Azure OpenAI and ElevenLabs TTS
- **English Quiz**: Interactive quizzes to test and improve language skills
- **Personal Notebook**: Save and organize your learning materials
- **Word Explorer**: Detailed word definitions, usage examples, and pronunciation
- **User Authentication**: Secure login and registration via Clerk
- **Responsive Design**: Optimized for desktop and mobile devices
- **Modern UI**: Built with Tailwind CSS, Radix UI, and shadcn/ui components

## 🚀 Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **State Management**: Redux Toolkit, Zustand
- **Styling**: Tailwind CSS, shadcn/ui (Radix UI components)
- **Authentication**: Clerk
- **AI Integration**: Azure OpenAI, ElevenLabs
- **Form Handling**: React Hook Form, Zod validation
- **Markdown Rendering**: React Markdown with syntax highlighting

## 🛠️ Local Development

### Prerequisites

- Node.js (v18 or later)
- npm, yarn, or pnpm package manager
- Azure OpenAI API key and endpoint
- ElevenLabs API key (for enhanced TTS)
- Clerk account (for authentication)

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/codexh.git
   cd codexh
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory with your API credentials:
   ```
   # Azure OpenAI API Configuration
   AZURE_OPENAI_API_KEY=your-azure-openai-api-key
   AZURE_OPENAI_ENDPOINT=your-azure-openai-endpoint
   AZURE_OPENAI_DEPLOYMENT=gpt-4o
   AZURE_OPENAI_API_VERSION=2025-01-01-preview

   # Azure OpenAI Audio Configuration
   AZURE_OPENAI_AUDIO_DEPLOYMENT=gpt-4o-realtime-preview
   AZURE_OPENAI_TTS_MODEL=tts-1-hd

   # ElevenLabs API Configuration (optional)
   ELEVENLABS_API_KEY=your-elevenlabs-api-key

   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
   CLERK_SECRET_KEY=your-clerk-secret-key
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📱 Key Features Explained

### AI Chat Interface
The platform features a sophisticated chat interface that connects to Azure OpenAI's GPT-4o model. Users can have natural conversations to practice language skills, ask questions, and receive instant feedback.

### English Quiz
Interactive quizzes help users test their knowledge and improve their language skills through practical exercises.

### Personal Notebook
Users can save important conversations, vocabulary, and learning materials to their personal notebook for future reference.

### Word Explorer
Detailed information about words including definitions, usage examples, and pronunciation to enhance vocabulary building.

## 🚢 Deployment

### Deploying to Vercel

1. Push your code to a GitHub repository.

2. Connect to Vercel:
   - Sign up or log in to [Vercel](https://vercel.com)
   - Click "Add New" > "Project"
   - Import your GitHub repository
   - Configure the project:
     - Framework Preset: Next.js
     - Root Directory: ./

3. Environment Variables:
   Add all the environment variables from your `.env.local` file to the Vercel project settings.

4. Deploy:
   Click "Deploy" and wait for the build to complete.

## 🔒 Security Considerations

- Never commit your `.env` or `.env.local` files to version control
- Use environment variables for all sensitive information
- Vercel automatically encrypts your environment variables
- Consider implementing rate limiting for production use
- Regularly update dependencies to patch security vulnerabilities

