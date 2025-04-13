import { createServerRunner } from '@aws-amplify/adapter-nextjs';
import amplifyOutputs from '../amplify_outputs.json';

export const { runWithAmplifyServerContext } = createServerRunner({
  config: amplifyOutputs
});
