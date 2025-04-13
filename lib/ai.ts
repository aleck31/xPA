import { generateClient } from 'aws-amplify/api';
import { type Schema } from '../amplify/data/resource';
import { GraphQLResult } from '@aws-amplify/api';

const client = generateClient<Schema>();

interface AIResponseData {
  generateAIResponse: {
    completion: string;
    metadata: unknown;
  };
}

export async function generateAIResponse(prompt: string, options?: {
  modelId?: string;
  maxTokens?: number;
  temperature?: number;
  system?: string;
}) {
  try {
    const response = await client.graphql({
      query: `
        mutation GenerateAIResponse($input: GenerateAIResponseInput!) {
          generateAIResponse(input: $input) {
            completion
            metadata
          }
        }
      `,
      variables: {
        input: {
          prompt,
          ...options,
        },
      },
    }) as GraphQLResult<AIResponseData>;

    if (!response.data) {
      throw new Error('No data returned from AI response');
    }

    return response.data.generateAIResponse;
  } catch (error) {
    console.error('Error generating AI response:', error);
    throw error;
  }
}

export function subscribeToAIResponse(
  prompt: string,
  onData: (data: { content: string; done: boolean }) => void,
  options?: {
    modelId?: string;
    maxTokens?: number;
    temperature?: number;
  }
) {
  const subscription = client.subscriptions.onAIResponse({
    prompt,
    ...options,
  }).subscribe({
    next: (data) => {
      onData(data);
    },
    error: (error: Error) => {
      console.error('Subscription error:', error);
    },
  });

  return subscription;
} 