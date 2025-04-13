import { defineFunction } from '@aws-amplify/backend';

// Define the Lambda function using defineFunction
export const aiProcessor = defineFunction({
  // The path to the entry file is relative to the function directory
  entry: './handler.ts',
});
