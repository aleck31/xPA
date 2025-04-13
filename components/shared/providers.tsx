'use client';

import { ReactNode, useEffect } from 'react';
import { Amplify } from 'aws-amplify';
import amplifyOutputs from '../../amplify_outputs.json';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  useEffect(() => {
    // Configure Amplify with the outputs from the sandbox environment
    Amplify.configure(amplifyOutputs, {
      ssr: true
    });
  }, []);

  return <>{children}</>;
}
