import { type Schema } from '@aws-amplify/data-schema';

export type AmplifySchema = Schema<{
  generateAIResponse: {
    input: {
      prompt: string;
      modelId?: string;
      maxTokens?: number;
      temperature?: number;
      system?: string;
      stream?: boolean;
    };
    output: {
      completion: any;
      metadata: {
        model: string;
        timestamp: string;
      };
    };
  };
  streamAIResponse: {
    input: {
      prompt: string;
      modelId?: string;
      maxTokens?: number;
      temperature?: number;
    };
    output: {
      content: string;
      done: boolean;
    };
  };
}>; 