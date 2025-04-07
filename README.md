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

- **Frontend**: Next.js 15 (React) with Tailwind CSS
- **Backend**: AWS Amplify Gen 2 (serverless architecture)
- **AI/ML**: Amazon Bedrock, Rekognition, Textract
- **Authentication**: Setup with Amazon Cognito for secure user authentication
- **API**: Ready-to-use GraphQL endpoint with AWS AppSync
- **Database**: Real-time database powered by Amazon DynamoDB
- **Storage**: Amazon S3

## Project Structure

```
xPA/
├── amplify/             # AWS Amplify configuration
│   ├── auth/
│   ├── data/
│   ├── storage/
│   ├── ai/
│   └── backend.ts
├── app/                # Next.js components and pages
│   ├── components/     # Reusable UI components
│   │   └── layout/     # Layout components
│   │       └── DashboardLayout.tsx  # Main dashboard layout
│   ├── dashboard/      # Dashboard pages
│   │   └── page.tsx    # Main dashboard page
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Landing page
├── docs/                    # Project documentation
└── package.json         # Project dependencies
```

## Getting Started

### Prerequisites

- Node.js (v20 or later)
- npm or yarn
- AWS Account
- AWS CLI configured with appropriate permissions
- Amplify CLI installed globally

### Installation

[TBD]

## Documentation

- [Feature Plan](docs/xPA_Feature_Plan.md): Detailed plan of features for the initial and future versions
- [System Architecture](docs/System_Architecture.md): Overview of the system architecture and component interactions

## Roadmap

### Phase 1 (Current)
- Core platform setup
- Home finance management features
- Schedule management features
- Basic AI assistant capabilities

### Phase 2
- Mobile application (Android)
- Family sharing features
- Additional modules (document management, goal tracking, etc.)

## License

This project is licensed under the GPLv3 License - see the LICENSE file for details.
