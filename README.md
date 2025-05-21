# xPA - eXtra Personal Assistant

xPA is a comprehensive personal assistant designed to help with daily management tasks, focusing initially on finance management and  schedule management. The system is cloud-based with a web interface and leverages GenAI capabilities to enhance user experience.

## Overview

xPA aims to be an intelligent personal assistant that helps users manage their daily lives more efficiently. By leveraging AI capabilities, xPA provides a natural and intuitive interface for managing finances, schedules, and more.

## Current Key Features (Phase 1)

- **User Authentication & Management**: Registration, login, and profile management
- **Finance Management (FinancialBrain)**: Budget creation, expense tracking, income recording, and financial analysis
- **GenAI-Powered Assistant (Myners)**: Natural language processing for commands and queries
- **Multi-platform Access**: Web interface with responsive design for desktop and mobile browsers

## Planned Features (Phase 2 & 3)

- **Data Management**: Import/export functionality, backup and restore options
- **Schedule Management (TimeGuardian)**: Event creation, reminders, and calendar views
- **Cross-functional Integration**: Financial events to calendar, expense forecasting
- **Document Management**: Store and organize important documents
- **Goal Tracking**: Set financial and personal goals with progress tracking
- **Family Sharing**: Shared budgets and expenses with permission management
- **Mobile Application**: Native Android app with offline functionality

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
│   ├── main/     # Main routes
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

3. Configure environment variables:
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

### Deployment

#### Development (Sandbox)

1. Start the Amplify sandbox (Back-end):
```bash
npx ampx sandbox  --identifier my-sandbox

# Deploy to sandbox environment
npx dotenvx run --env-file=.env.local -- ampx sandbox
```

2. Start the development server (Front-end):
```bash
npm run dev
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
- Foundation & Core Features (Application Framework, Interface, Authentication)
- Finance Management (FinancialBrain) - Income/Expense Tracking, Budget Management, Financial Dashboard
- GenAI-Powered Assistant (Myners) - Real-Time Interaction, AI Agent Capabilities, Personalization

### Phase 2
- Schedule Management (TimeGuardian) - Event Management, Task Management, Calendar View, Reminder System
- Cross-functional Integration - Financial events to calendar, expense forecasting
- Additional Modules - Document Management, Goal Tracking

### Phase 3
- Family Sharing - Shared budgets, permission management
- Mobile Application (Android) - Push notifications, offline functionality, camera integration

## License

This project is licensed under the GPLv3 License - see the LICENSE file for details.
