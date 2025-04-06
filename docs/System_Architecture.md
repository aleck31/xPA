# xPA System Architecture

## Overview

This document outlines the system architecture for the xPA (eXtra Personal Assistant) application, which will be built using AWS Amplify Gen 2 and Next.js. The architecture is designed to be scalable, extensible, and to leverage AWS services for a robust cloud-native application.

## Technology Stack

### Frontend
- **Framework**: Next.js (React)
- **UI Library**: Tailwind CSS with custom components
- **State Management**: React Context API + SWR for data fetching
- **Authentication**: AWS Amplify Authentication (Cognito)
- **Hosting**: AWS Amplify Hosting

### Backend
- **API**: AWS AppSync (GraphQL) + API Gateway (REST)
- **Compute**: AWS Lambda (serverless functions)
- **Database**:
  - Amazon DynamoDB for document-based data (transactions, events)
  - Amazon Aurora Serverless (optional) for complex relational queries
- **Storage**: Amazon S3 for file storage (receipts, documents)
- **AI/ML Services**:
  - Amazon Bedrock for LLM capabilities(User interaction, multimodal, agentic)
  - Amazon Rekognition for image analysis
  - Amazon Textract for text extraction from receipts
- **Notifications**: Amazon SNS/SES for email and push notifications
- **Event Processing**: AWS EventBridge for event-driven architecture

### DevOps
- **CI/CD**: AWS Amplify CI/CD pipeline
- **Monitoring**: AWS CloudWatch
- **Logging**: AWS CloudWatch Logs
- **Infrastructure as Code**: AWS CDK (via Amplify Gen 2)

## System Components

### 1. Authentication & User Management
- Leverages AWS Cognito for user authentication and management
- Supports email/password, social login, and MFA
- User profiles stored in DynamoDB

### 2. Finance Management Module
- **Data Model**:
  - Budgets
  - Transactions (expenses and income)
  - Categories
  - Recurring transactions
- **Key Components**:
  - Budget management service
  - Transaction processing service
  - Receipt processing service (with AI integration)
  - Financial analysis service

### 3. Schedule Management Module
- **Data Model**:
  - Events
  - Reminders
  - Calendar settings
- **Key Components**:
  - Event management service
  - Reminder service
  - Calendar view service

### 4. AI Assistant
- **Components**:
  - Natural language processing service (using Amazon Bedrock)
  - Intent recognition service
  - Context management service
  - Response generation service
- **Integration Points**:
  - Finance management module
  - Schedule management module
  - User profile data

### 5. File Storage & Processing
- Uses Amazon S3 for file storage
- Image processing pipeline for receipts:
  1. Upload to S3
  2. Trigger Lambda function
  3. Process with Rekognition/Textract
  4. Extract relevant data
  5. Store structured data in DynamoDB

## Architecture Diagram

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  Web Client     │     │  Mobile Browser │     │  Android App    │
│  (Next.js)      │     │                 │     │  (Future)       │
│                 │     │                 │     │                 │
└────────┬────────┘     └────────┬────────┘     └────────┬────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                        ┌────────▼────────┐
                        │                 │
                        │  AWS Amplify    │
                        │  Hosting        │
                        │                 │
                        └────────┬────────┘
                                 │
         ┌───────────────────────┼───────────────────────┐
         │                       │                       │
┌────────▼────────┐     ┌────────▼────────┐     ┌────────▼────────┐
│                 │     │                 │     │                 │
│  AppSync        │     │  API Gateway    │     │  Cognito        │
│  (GraphQL API)  │     │  (REST API)     │     │  (Auth)         │
│                 │     │                 │     │                 │
└────────┬────────┘     └────────┬────────┘     └────────┬────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                        ┌────────▼────────┐
                        │                 │
                        │  Lambda         │
                        │  Functions      │
                        │                 │
                        └────────┬────────┘
                                 │
         ┌───────────────────────┼───────────────────────┐
         │                       │                       │
┌────────▼────────┐     ┌────────▼────────┐     ┌────────▼────────┐
│                 │     │                 │     │                 │
│  DynamoDB       │     │  S3 Storage     │     │  EventBridge    │
│                 │     │                 │     │                 │
└────────┬────────┘     └────────┬────────┘     └────────┬────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                        ┌────────▼────────┐
                        │                 │
                        │  AI Services    │
                        │  (Bedrock,      │
                        │   Rekognition,  │
                        │   Textract)     │
                        │                 │
                        └─────────────────┘
```

## Data Flow

### 1. User Authentication Flow
1. User registers/logs in through the web interface
2. Amplify Authentication (Cognito) handles the authentication process
3. JWT tokens are issued and stored in the client
4. Subsequent API requests include the JWT for authorization

### 2. Expense Recording Flow
1. User inputs expense details (manual entry or natural language)
2. If using natural language, the input is processed by the AI Assistant
3. Structured data is sent to the GraphQL API
4. Lambda function processes the request and stores the data in DynamoDB
5. If a receipt image is uploaded:
   - Image is stored in S3
   - Lambda function is triggered to process the image
   - Rekognition/Textract extracts text and data
   - Extracted data is stored in DynamoDB and linked to the expense record

### 3. Event Creation Flow
1. User creates an event (manual entry or natural language)
2. If using natural language, the input is processed by the AI Assistant
3. Structured data is sent to the GraphQL API
4. Lambda function processes the request and stores the event in DynamoDB
5. If reminders are set, entries are created in the reminder service
6. At the scheduled time, EventBridge triggers the notification process

### 4. AI Assistant Interaction Flow
1. User inputs a natural language query or command
2. Input is sent to the AI Assistant service
3. Amazon Bedrock processes the input and determines the intent
4. Based on the intent, the appropriate service is called
5. The response is generated and returned to the user

## Extensibility

The architecture is designed to be extensible, allowing for the addition of new features and modules in the future:

1. **Microservices Architecture**: Each functional area is implemented as a separate service, allowing for independent development and deployment.

2. **Event-Driven Design**: Using EventBridge for event-driven communication between services enables loose coupling and easier integration of new components.

3. **GraphQL API**: The GraphQL API provides a flexible interface that can evolve over time without breaking existing clients.

4. **Serverless Components**: Using serverless technologies allows for easy scaling and cost-effective operation, even as the application grows.

5. **Module-Based Frontend**: The Next.js frontend is organized into modules that correspond to backend services, making it easier to add new features.

## Security Considerations

1. **Authentication & Authorization**: JWT-based authentication with Cognito, with fine-grained access control using AppSync resolvers and API Gateway authorizers.

2. **Data Encryption**: All data is encrypted at rest (using AWS managed keys) and in transit (using HTTPS/TLS).

3. **Secure API Access**: API access is restricted based on user roles and permissions.

4. **Audit Logging**: All sensitive operations are logged for audit purposes.

5. **Input Validation**: All user inputs are validated both on the client and server side.

## Deployment Strategy

1. **Development Environment**: Used for active development and testing.

2. **Staging Environment**: Mirrors production for final testing before release.

3. **Production Environment**: The live environment used by end users.

4. **CI/CD Pipeline**: Automated testing and deployment using AWS Amplify CI/CD pipeline.

5. **Feature Flags**: Implementation of feature flags to enable/disable features in different environments.

## Monitoring and Observability

1. **Logging**: Centralized logging using CloudWatch Logs.

2. **Metrics**: Key performance metrics tracked in CloudWatch.

3. **Alerts**: Automated alerts for critical issues.

4. **Error Tracking**: Comprehensive error tracking and reporting.

5. **Performance Monitoring**: Monitoring of API response times, Lambda execution times, and other performance metrics.
