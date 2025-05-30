'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ResetPasswordRedirect() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace('/login/reset-password');
  }, [router]);
  
  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-gray-50">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-2">Redirecting...</h2>
        <p className="text-gray-600">Please wait while we redirect you to the password reset page.</p>
      </div>
    </div>
  );
}
