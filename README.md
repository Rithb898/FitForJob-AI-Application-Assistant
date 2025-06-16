# FitForJob - AI Application Assistant

FitForJob is an intelligent AI-powered job application assistant that helps job seekers create personalized, professional application materials. By analyzing your resume and job descriptions, it generates tailored cover letters, interview responses, LinkedIn messages, and more - all designed to maximize your chances of landing your dream job.

## 🚀 Features

### Core Functionality

- **Smart Resume Parsing**: Upload PDF resumes and extract structured data using AI
- **Intelligent Content Generation**: Create personalized application materials based on job requirements
- **Multi-Format Outputs**: Generate various types of application content:
  - Professional cover letters (300-400 words)
  - Company interest statements
  - "Why you're a good fit" explanations
  - Value proposition descriptions
  - LinkedIn outreach messages
  - Quick application form answers
  - Interview preparation questions (5-7 tailored questions)

### User Experience

- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Progress**: Live status updates during resume parsing and content generation
- **Content Management**: View, copy, edit, and regenerate any generated content
- **History Tracking**: Save and manage all your application responses
- **User Authentication**: Secure account management with Clerk
- **Dark Theme**: Modern, eye-friendly dark interface

### Advanced Features

- **Fallback AI Models**: Automatic failover between primary and backup AI models
- **Content Regeneration**: Regenerate specific sections without starting over
- **Form Validation**: Comprehensive input validation with helpful error messages
- **Analytics Integration**: Usage tracking with PostHog for insights
- **Optimized Performance**: Fast loading with Turbopack and optimized animations

## 🛠 Technology Stack

### Frontend

- **Framework**: Next.js 15 with App Router
- **Build Tool**: Turbopack for fast development
- **Styling**: Tailwind CSS 4 with custom configuration
- **UI Components**: ShadCN UI (New York style) with Radix UI primitives
- **Icons**: Lucide React icon library
- **Animations**: Motion library for smooth transitions
- **Forms**: React Hook Form with Zod schema validation
- **File Upload**: React Dropzone for drag-and-drop functionality
- **Notifications**: React Hot Toast and Sonner for user feedback

### Backend & AI

- **Runtime**: Node.js with Next.js API routes
- **AI Provider**: Groq with LLama 3.3 (70B) and LLama 3.1 (8B) models
- **AI SDK**: Vercel AI SDK for structured content generation
- **PDF Processing**: pdf-parse for resume text extraction
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Clerk for user management and protected routes

### Development & Deployment

- **Language**: TypeScript for type safety
- **Linting**: ESLint with Next.js configuration
- **Code Formatting**: Prettier for consistent code style
- **Package Manager**: PNPM for efficient dependency management
- **Analytics**: PostHog for user behavior tracking
- **Deployment**: Optimized for Vercel deployment

## 📦 Installation

### Prerequisites

- Node.js 18+
- PNPM (recommended) or npm/yarn
- MongoDB database (local or cloud)
- Groq API account
- Clerk account for authentication
- PostHog account for analytics (optional)

### Setup Instructions

1. **Clone the repository**

   ```bash
   git clone https://github.com/YourUsername/job-interview-ai.git
   cd job-interview-ai
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   # or
   npm install
   # or
   yarn install
   ```

3. **Environment Configuration**

   Create a `.env.local` file in the root directory with the following variables:

   ```env
   # Clerk Authentication (Required)
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_publishable_key
   CLERK_SECRET_KEY=sk_test_your_clerk_secret_key
   CLERK_WEBHOOK_SECRET=whsec_your_clerk_webhook_secret

   # MongoDB Database (Required)
   NEXT_PUBLIC_MONGODB_URL=mongodb://localhost:27017/fitforjob
   # or for MongoDB Atlas:
   # NEXT_PUBLIC_MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/fitforjob

   # Groq AI API (Required)
   GROQ_API_KEY=gsk_your_groq_api_key

   # AI Model Configuration (Optional - defaults provided)
   PRIMARY_MODEL=llama-3.3-70b-versatile
   FALLBACK_MODEL=llama-3.1-8b-instant

   # PostHog Analytics (Optional)
   NEXT_PUBLIC_POSTHOG_KEY=phc_your_posthog_key
   NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
   ```

4. **Database Setup**

   Ensure your MongoDB instance is running. The application will automatically create the necessary collections and indexes.

5. **Start the development server**

   ```bash
   pnpm dev
   # or
   npm run dev
   # or
   yarn dev
   ```

6. **Access the application**

   Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
pnpm build
pnpm start
```

## 🔄 How It Works

### User Flow

1. **Authentication**: Users sign in through Clerk authentication system
2. **Resume Upload**: Upload a PDF resume which gets parsed using pdf-parse library
3. **AI Processing**: Resume text is structured using Groq's LLama 3.1 model into JSON format
4. **Job Details**: Users enter job title, company, tech stack, job description, and optional company details
5. **Content Generation**: The system uses Groq's LLama 3.3 model to generate personalized application materials
6. **Review & Edit**: Users can view, copy, and regenerate specific sections as needed
7. **Save & Manage**: All responses are saved to MongoDB and accessible through the history page

### Technical Flow

1. **PDF Processing**: `/api/parse-resume` extracts and structures resume data
2. **Content Generation**: `/api/generate` creates tailored application materials
3. **Content Regeneration**: `/api/regenerate` allows updating specific sections
4. **Data Persistence**: Responses saved to both local storage and MongoDB
5. **Fallback System**: Automatic failover between AI models for reliability

## 📁 Project Structure

```
job-interview-ai/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication routes
│   │   ├── sign-in/[[...sign-in]]/
│   │   └── sign-up/[[...sign-up]]/
│   ├── api/                      # API endpoints
│   │   ├── generate/             # Main content generation
│   │   ├── parse-resume/         # Resume parsing
│   │   ├── regenerate/           # Content regeneration
│   │   └── webhooks/             # Clerk webhooks
│   ├── create/                   # Job application form
│   ├── history/                  # Response history
│   ├── response/[id]/            # Individual response view
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   ├── loading.tsx               # Loading UI
│   └── page.tsx                  # Landing page
├── components/                   # React components
│   ├── ui/                       # ShadCN UI components
│   ├── JobForm.tsx               # Main application form
│   ├── Navbar.tsx                # Navigation component
│   ├── PostHogProvider.tsx       # Analytics provider
│   ├── ResponseSection.tsx       # Response display
│   └── ResumeUploader.tsx        # File upload component
├── hooks/                        # Custom React hooks
│   ├── useAppState.ts            # Application state management
│   ├── useJobFormSubmit.ts       # Form submission logic
│   └── useResumeManager.ts       # Resume handling
├── lib/                          # Utility libraries
│   ├── actions/                  # Server actions
│   ├── models/                   # MongoDB models
│   ├── store/                    # State management
│   ├── db.ts                     # Database connection
│   ├── prompt.ts                 # AI prompts
│   ├── schema.ts                 # Zod schemas
│   ├── storage.ts                # Local storage utilities
│   ├── types.ts                  # TypeScript types
│   └── utils.ts                  # Helper functions
├── sections/                     # Landing page sections
│   ├── FeatureHighlight.tsx
│   ├── FeatureSection.tsx
│   ├── FinalCTASection.tsx
│   └── HeroSection.tsx
├── public/                       # Static assets
│   ├── favicon.png
│   ├── fitforjob-og.png
│   └── logo.png
├── components.json               # ShadCN configuration
├── middleware.ts                 # Route protection
├── next.config.ts                # Next.js configuration
├── package.json                  # Dependencies
├── tailwind.config.js            # Tailwind configuration
└── tsconfig.json                 # TypeScript configuration
```

## 🚀 Usage Instructions

### Getting Started

1. **Sign Up/Sign In**: Create an account or sign in using Clerk authentication
2. **Navigate to Create**: Click "Get Started Now" or go to `/create`
3. **Upload Resume**: Drag and drop or click to upload your PDF resume
4. **Fill Job Details**: Enter job title, company, tech stack, and job description
5. **Generate Content**: Click "Generate AI Responses" to create personalized materials
6. **Review Results**: View generated content in organized tabs
7. **Copy & Use**: Copy any section to use in your applications
8. **Regenerate**: Click regenerate on any section to get alternative versions
9. **Save History**: All responses are automatically saved to your history

### Tips for Best Results

- **Detailed Job Descriptions**: Provide complete job descriptions for better targeting
- **Accurate Tech Stack**: List relevant technologies and skills
- **Company Research**: Add company details for more personalized responses
- **Resume Quality**: Ensure your PDF resume is well-formatted and complete

## 🔌 API Documentation

### POST `/api/parse-resume`

Extracts and structures resume data from uploaded PDF files.

**Request:**

- Method: `POST`
- Content-Type: `multipart/form-data`
- Body: `resume` (File) - PDF file up to 10MB

**Response:**

```json
{
  "fullName": "John Doe",
  "contactInformation": {
    "email": "john@example.com",
    "phone": "+1234567890",
    "linkedin": "linkedin.com/in/johndoe",
    "portfolioUrl": "johndoe.dev"
  },
  "summary": "Experienced software engineer...",
  "education": [...],
  "workExperience": [...],
  "skills": {
    "technicalSkills": ["JavaScript", "React", "Node.js"],
    "softSkills": ["Leadership", "Communication"]
  },
  "projects": [...],
  "certifications": [...],
  "languages": [...],
  "achievements": [...]
}
```

### POST `/api/generate`

Generates personalized job application materials based on resume and job details.

**Request:**

- Method: `POST`
- Content-Type: `multipart/form-data`
- Body:
  - `jobTitle` (string) - Position title
  - `company` (string) - Company name
  - `techStack` (string) - Required technologies
  - `description` (string) - Job description
  - `companyDetails` (string, optional) - Additional company info
  - `parsedResume` (string) - JSON string of parsed resume

**Response:**

```json
{
  "applicationMaterials": {
    "interestInCompany": "I'm excited about...",
    "coverLetter": "Dear Hiring Manager...",
    "whyFit": "My experience in...",
    "valueAdd": "I would bring...",
    "linkedinSummary": "Experienced developer...",
    "shortAnswer": "I'm interested because..."
  },
  "interviewPrep": {
    "questions": [
      "Tell me about your experience with React",
      "How do you handle challenging deadlines?",
      "..."
    ]
  }
}
```

### POST `/api/regenerate`

Regenerates a specific section of application materials.

**Request:**

- Method: `POST`
- Content-Type: `application/json`
- Body:

```json
{
  "field": "coverLetter",
  "data": {
    "jobTitle": "Software Engineer",
    "company": "Tech Corp"
  },
  "parsedResume": "..."
}
```

**Response:**

```json
{
  "field": "coverLetter",
  "output": "Dear Hiring Manager, I am writing to express..."
}
```

## 🛠 Development

### Development Setup

```bash
# Install dependencies
pnpm install

# Start development server with Turbopack
pnpm dev

# Run linting
pnpm lint

# Build for production
pnpm build

# Start production server
pnpm start
```

### Code Quality Tools

- **TypeScript**: Full type safety across the application
- **ESLint**: Code quality and consistency enforcement
- **Prettier**: Automatic code formatting
- **Turbopack**: Fast development builds and hot reloading

### Database Schema

The application uses MongoDB with the following collections:

- **responses**: Stores generated application materials
- **users**: User profile information (managed by Clerk)

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. Fork this repository
2. Connect your GitHub account to Vercel
3. Import the project
4. Add environment variables
5. Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FYourUsername%2Fjob-interview-ai)

### Environment Variables for Production

Ensure all required environment variables are set in your deployment platform:

- Clerk authentication keys
- MongoDB connection string
- Groq API key
- PostHog analytics key (optional)

## 🤝 Contributing

We welcome contributions! Here's how to get started:

### Development Process

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes**: Follow the existing code style and patterns
4. **Add tests**: Ensure your changes are tested
5. **Commit changes**: `git commit -m 'Add amazing feature'`
6. **Push to branch**: `git push origin feature/amazing-feature`
7. **Open a Pull Request**: Describe your changes and their benefits

### Code Standards

- Follow TypeScript best practices
- Use existing component patterns
- Maintain responsive design principles
- Add proper error handling
- Include JSDoc comments for complex functions
- Follow the established file structure

### Areas for Contribution

- UI/UX improvements
- Additional AI model integrations
- Performance optimizations
- Test coverage improvements
- Documentation enhancements
- Accessibility improvements

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Vercel AI SDK](https://sdk.vercel.ai/) for AI integration
- [ShadCN UI](https://ui.shadcn.com/) for beautiful components
- [Clerk](https://clerk.com/) for authentication
- [Groq](https://groq.com/) for fast AI inference
- [MongoDB](https://mongodb.com/) for data persistence

---

**Built with ❤️ by [Rith Banerjee](https://github.com/YourUsername)**

For questions or support, please open an issue or contact [your-email@example.com](mailto:your-email@example.com).
