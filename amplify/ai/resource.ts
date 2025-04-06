import { defineAI } from '@aws-amplify/backend';

/**
 * Define and configure your AI resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/ai/
 */
export const ai = defineAI({
  /**
   * Configure Amazon Bedrock
   * @see https://docs.amplify.aws/gen2/build-a-backend/ai/bedrock/
   */
  bedrock: {
    // Enable Claude model for natural language processing
    claude: {
      // Use Claude 3 Sonnet for a balance of performance and cost
      modelId: 'anthropic.claude-3-5-sonnet-20241022-v2:0',
    },
    // Enable Nova model for text generation
    nova: {
      modelId: 'us.amazon.nova-pro-v1:0',
    },
    // Enable Titan model for embeddings
    titan: {
      modelId: 'amazon.titan-embed-text-v2:0',
    },
  },
  // Configure AI features
  features: {
    // Enable text generation for AI assistant
    textGeneration: {
      // Configure text generation foundation models
      foundationModels: [
        {
          provider: 'bedrock',
          modelId: 'us.anthropic.claude-3-7-sonnet-20250219-v1:0',
          name: 'Claude 3.7 Sonnet'
        },
        {
          provider: 'bedrock',
          modelId: 'anthropic.claude-3-5-sonnet-20241022-v2:0',
          name: 'Claude 3.5 Sonnet'
        },
        {
          provider: 'bedrock',
          modelId: 'us.amazon.nova-pro-v1:0',
          name: 'Nova Pro'
        }
      ],
      // Configure text generation parameters
      configuration: {
        temperature: 0.7,
        maxTokens: 1000,
      },
    },
    // Enable image generation for UI elements
    imageGeneration: {
      // Configure image generation foundation models
      foundationModels: [
        {
          provider: 'bedrock',
          modelId: 'amazon.nova-canvas-v1:0',
          name: 'Nova Canvas'
        },
        {
          provider: 'bedrock',
          modelId: 'stability.sd3-5-large-v1:0',
          name: 'Stable Diffusion 3.5 Large'
        }
      ],
    },
    // Enable RAG (Retrieval Augmented Generation) for knowledge base
    rag: {
      // Configure knowledge base
      knowledgeBase: {
        name: 'xPA-KnowledgeBase',
        // Configure embeddings model
        embeddingsModel: {
          provider: 'bedrock',
          modelId: 'amazon.titan-embed-text-v2:0',
          name: 'Titan Text Embeddings V2'
        },
        // Configure vector store
        vectorStore: {
          name: 'xPA-VectorStore',
        },
      },
    },
  },
});
