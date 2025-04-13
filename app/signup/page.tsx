'use client';

import { useEffect } from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { useRouter } from 'next/navigation';

export default function Signup() {
  const router = useRouter();

  useEffect(() => {
    // Check for redirect parameter in URL
    const urlParams = new URLSearchParams(window.location.search);
    const redirectPath = urlParams.get('redirect');
    
    // Store redirect path in session storage to use after authentication
    if (redirectPath) {
      sessionStorage.setItem('redirectPath', redirectPath);
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-primary">Create your xPA Account</h1>
          <p className="mt-2 text-gray-600">
            Sign up to start managing your personal tasks and finances
          </p>
        </div>
        
        <Authenticator
          initialState="signUp"
          loginMechanisms={['email']}
          signUpAttributes={['email', 'given_name', 'family_name']}
          socialProviders={[]}
          variation="modal"
          components={{
            Footer: () => (
              <div className="mt-4 text-center text-sm text-gray-600">
                <p>Already have an account? <a href="/login" className="text-primary font-medium hover:underline">Sign in</a></p>
                <p className="mt-2">© {new Date().getFullYear()} xPA - eXtra Personal Assistant</p>
              </div>
            ),
          }}
        />
      </div>
    </div>
  );
}
