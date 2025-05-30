'use client';

import { ReactNode, useEffect } from 'react';
import { Amplify } from 'aws-amplify';
import amplifyOutputs from '../../amplify_outputs.json';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  useEffect(() => {
    // Configure Amplify globally with the outputs
    try {
      console.log('Configuring Amplify globally');
      Amplify.configure(amplifyOutputs, {
        ssr: true
      });
      console.log('Amplify configured successfully');
    } catch (error) {
      console.error('Error configuring Amplify:', error);
    }
  }, []);

  return <>{children}</>;
}
