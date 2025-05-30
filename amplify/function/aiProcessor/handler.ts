import { BedrockRuntimeClient, InvokeModelCommand } from '@aws-sdk/client-bedrock-runtime';

export async function handler(event: any) {
  const client = new BedrockRuntimeClient({ 
    region: process.env.AWS_REGION || 'us-east-1',
    endpoint: process.env.BEDROCK_ENDPOINT,
  });
  
  const modelId = event.modelId || process.env.BEDROCK_MODEL_ID;
  const modelParams = getModelParameters(modelId, event);
  
  const command = new InvokeModelCommand({
    modelId,
    contentType: 'application/json',
    body: JSON.stringify(modelParams),
  });
  
  try {
    const response = await client.send(command);
    return {
      completion: JSON.parse(new TextDecoder().decode(response.body)),
      metadata: {
        model: modelId,
        timestamp: new Date().toISOString(),
      },
    };
  } catch (error) {
    console.error('Error invoking Bedrock model:', error);
    throw error;
  }
}

function getModelParameters(modelId: string, event: any) {
  switch (modelId) {
    case 'anthropic.claude-3-sonnet-20240229-v1:0':
    case 'anthropic.claude-3-opus-20240229-v1:0':
    case 'anthropic.claude-3-haiku-20240307-v1:0':
      return {
        messages: [
          {
            role: 'user',
            content: event.prompt,
          },
        ],
        max_tokens: event.maxTokens || 1000,
        temperature: event.temperature || 0.7,
        system: event.system || 'You are a helpful assistant.',
        stream: event.stream || false,
      };
    case 'anthropic.claude-v2:1':
    case 'anthropic.claude-v2':
      return {
        prompt: `\n\nHuman: ${event.prompt}\n\nAssistant:`,
        max_tokens_to_sample: event.maxTokens || 1000,
        temperature: event.temperature || 0.7,
        stream: event.stream || false,
      };
    case 'mistral.mistral-large':
    case 'mistral.mistral-large-2':
      return {
        prompt: event.prompt,
        max_tokens: event.maxTokens || 1000,
        temperature: event.temperature || 0.7,
        stream: event.stream || false,
      };
    default:
      return {
        prompt: event.prompt,
        max_tokens: event.maxTokens || 1000,
        temperature: event.temperature || 0.7,
        stream: event.stream || false,
      };
  }
}
