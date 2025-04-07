'use client';

import { ReactNode, useEffect } from 'react';
import { Amplify } from 'aws-amplify';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  useEffect(() => {
    // Configure Amplify only on the client side with a minimal configuration
    // This avoids importing the backend directly, which causes issues with Node.js modules
    Amplify.configure({
      // Basic configuration for development
      Auth: {
        Cognito: {
          userPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID || 'ap-southeast-1_placeholder',
          userPoolClientId: process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID || 'placeholder-client-id',
          identityPoolId: process.env.NEXT_PUBLIC_IDENTITY_POOL_ID || 'ap-southeast-1:placeholder-identity-pool-id',
        }
      },
      API: {
        GraphQL: {
          endpoint: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:20002/graphql',
          region: process.env.NEXT_PUBLIC_AWS_REGION || 'ap-southeast-1',
          defaultAuthMode: 'apiKey',
          apiKey: process.env.NEXT_PUBLIC_API_KEY || 'placeholder-api-key'
        }
      },
      Storage: {
        S3: {
          bucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET || 'xpa-storage',
          region: process.env.NEXT_PUBLIC_AWS_REGION || 'ap-southeast-1',
        }
      }
    }, {
      ssr: true
    });
  }, []);

  return <>{children}</>;
}
