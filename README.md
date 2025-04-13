# xPA - eXtra Personal Assistant

xPA is a comprehensive personal assistant designed to help with daily management tasks, focusing initially on finance management and schedule management. The system is cloud-based with a web interface and leverages GenAI capabilities to enhance user experience.

## Overview

xPA aims to be an intelligent personal assistant that helps users manage their daily lives more efficiently. By leveraging AI capabilities, xPA provides a natural and intuitive interface for managing finances, schedules, and more.

## Key Features

- **Finance Management**: Budget creation, expense tracking, income recording, and financial analysis
- **Schedule Management**: Event creation, reminders, and calendar views
- **AI-Powered Assistant**: Natural language processing for commands and queries
- **Multi-platform Access**: Web interface with responsive design for desktop and mobile browsers

## Technology Stack

- **Frontend**: Next.js 15 (React 19) 
- **UI**: Tailwind CSS v4 & shadcn/ui components with Lucide Icons
- **Backend**: AWS Amplify Gen 2 (serverless architecture)
- **Authentication**: Amazon Cognito with OIDC, SAML, and custom authentication flows
- **API**: GraphQL with AWS AppSync
- **Database**: Amazon DynamoDB with real-time capabilities
- **Storage**: Amazon S3 with fine-grained access control
- **AI/ML**: 
  - Amazon Bedrock (Claude, Nova, Llama)
  - Amazon Rekognition
  - Amazon Textract
- **Deployment**: AWS Amplify Hosting with CI/CD

## Project Structure

```
xPA/
├── amplify/      # AWS Amplify configuration
│   ├── auth/       # Authentication resources
│   │   └── resource.ts
│   ├── data/       # Data resources
│   │   ├── resource.ts
│   │   └── schema.ts
│   ├── storage/    # Storage resources
│   │   └── resource.ts
│   ├── function/   # Lambda functions
│   │   └── aiProcessor/  # AI processing function
│   └── backend.ts  # Backend configuration
├── app/          # Next.js App Router
│   ├── page.tsx       # Landing page
│   ├── layout.tsx     # Root layout
│   ├── login/         # Login routes
│   │   └── reset-password/
│   ├── dashboard/     # Dashboard routes
│   │   └── settings/
│   ├── assistant/     # AI assistant
│   ├── finance/
│   ├── schedule/
│   └── api/           # API routes
├── components/        # Reusable components
│   ├── ui/       # Shadcn/UI components
│   ├── login/        # Login components
│   ├── finance/      # Finance components
│   ├── schedule/     # Schedule components
│   ├── assistant/    # AI assistant components
│   └── shared/      # Shared components
├── lib/          # Utility functions
│   ├── auth.ts     # Authentication utilities
│   ├── api.ts      # API utilities
│   └── ai.ts       # AI utilities
├── types/          # TypeScript type definitions
│   └── amplify.d.ts    # Amplify type definitions
├── styles/         # Global styles
│   ├── app.css
│   └── globals.css
├── public/         # Static assets
├── docs/           # Project documentation
├── package.json      # Project dependencies
├── next.config.js    # Next.js configuration
├── tailwind.config.js  # Tailwind CSS configuration
└── tsconfig.json     # TypeScript configuration
```

## Getting Started

### Prerequisites

- Node.js (v22 or later)
- npm or yarn
- AWS Account
- AWS CLI configured with appropriate permissions
- Amplify CLI installed globally

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/xPA.git
cd xPA
```

2. Install dependencies:
```bash
npm install
```

3. Initialize shadcn/ui components (if not already initialized):
```bash
# Initialize shadcn/ui
npx shadcn@latest init

# Add required components
npx shadcn@latest add button card dialog form input select tabs
```

4. Configure environment variables:
Create a `.env.local` file in the project root:
```
# Authentication Configuration
XPA_USER_POOL_ID=your-user-pool-id
XPA_USER_POOL_CLIENT_ID=your-user-pool-client-id
XPA_IDENTITY_POOL_ID=your-identity-pool-id

# API Configuration
NEXT_PUBLIC_GRAPHQL_ENDPOINT=your-graphql-endpoint
NEXT_PUBLIC_AWS_REGION=your-region

# AI Configuration
XPA_BEDROCK_ENDPOINT=your-bedrock-endpoint
XPA_BEDROCK_MODEL_ID=your-model-id

# Storage Configuration
XPA_S3_BUCKET=your-s3-bucket
```

4. Start the development server:
```bash
npm run dev
```

### Deployment

#### Development (Sandbox)

1. Start the Amplify sandbox:
```bash
npx ampx sandbox  --identifier my-sandbox
```

2. Deploy to sandbox environment:
```bash
npx dotenvx run --env-file=.env.local -- ampx sandbox
```

#### Production

1. Configure production environment variables in AWS Amplify Console

2. Deploy to production:
```bash
npx ampx deploy --env-name prod
```

## Documentation

- [Feature Plan](docs/xPA_Feature_Plan.md): Detailed plan of features for the initial and future versions
- [System Architecture](docs/System_Architecture.md): Overview of the system architecture and component interactions
- [Amplify Gen2 + Next.js Guide](docs/amplify_gen2_nextjs_guide.md): Comprehensive guide for Amplify Gen2 and Next.js integration

## Roadmap

### Phase 1 (Current)
- Core platform setup with Amplify Gen2
- Home finance management features
- Schedule management features
- AI assistant with Claude 3 and Nova models
- Real-time data synchronization

### Phase 2
- Mobile application (Android)
- Family sharing features
- Advanced AI capabilities with custom models
- Document management and OCR
- Goal tracking and analytics

## License

This project is licensed under the GPLv3 License - see the LICENSE file for details.
