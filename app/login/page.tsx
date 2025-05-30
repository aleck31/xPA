'use client';

import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle } from "lucide-react";
import { SignInForm } from '@/components/login/SignInForm';
import { SignUpForm } from '@/components/login/SignUpForm';

export default function Login() {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  
  // Check for redirect path
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const redirectPath = urlParams.get('redirect');
    if (redirectPath) {
      sessionStorage.setItem('redirectPath', redirectPath);
    }
  }, []);
  
  const handleSuccess = (message: string) => {
    setSuccess(message);
    setError('');
  };
  
  const handleError = (message: string) => {
    setError(message);
    setSuccess('');
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-gray-50">
      <div className="flex w-full max-w-4xl rounded-lg overflow-hidden shadow-xl border border-gray-200">
        <Card className="p-0 w-full md:w-1/2 md:rounded-r-none border-0 shadow-none">
          <Tabs defaultValue="signin" className="mb-4">
            <TabsList className="grid w-full grid-cols-2 rounded-lg overflow-hidden mb-0 p-0 h-auto">
              <TabsTrigger 
                value="signin" 
                className="rounded-none data-[state=active]:bg-gray-900 data-[state=active]:text-white data-[state=inactive]:bg-gray-100 data-[state=inactive]:text-gray-600 py-3 px-4 text-sm font-medium"
              >
                Sign In
              </TabsTrigger>
              <TabsTrigger 
                value="signup" 
                className="rounded-none data-[state=active]:bg-gray-900 data-[state=active]:text-white data-[state=inactive]:bg-gray-100 data-[state=inactive]:text-gray-600 py-3 px-4 text-sm font-medium"
              >
                Create Account
              </TabsTrigger>
            </TabsList>
            
            <div className="p-8">
              {success && (
                <div className="mb-4 p-3 rounded-md bg-green-50 border border-green-200 flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-green-800">{success}</p>
                </div>
              )}
              
              {/* Use a min-height to ensure consistent tab heights */}
              <div className="min-h-[320px]">
                <TabsContent value="signin">
                  <SignInForm 
                    email={email}
                    setEmail={setEmail}
                    onSuccess={handleSuccess}
                    onError={handleError}
                  />
                </TabsContent>
                
                <TabsContent value="signup">
                  <SignUpForm 
                    email={email}
                    setEmail={setEmail}
                    onSuccess={handleSuccess}
                    onError={handleError}
                  />
                </TabsContent>
              </div>
              
              <div className="mt-8 text-center text-sm text-muted-foreground">
                <p>© {new Date().getFullYear()} xPA - eXtra Personal Assistant</p>
              </div>
            </div>
          </Tabs>
        </Card>
        <div className="hidden md:flex md:w-1/2 bg-gray-100 items-center justify-center p-8">
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md">
              <div className="text-white font-bold text-3xl">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">xPA Assistant</h2>
            <p className="text-gray-600">Your intelligent personal assistant designed to simplify and organize your daily life.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
