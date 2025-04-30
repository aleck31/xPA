'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { resetPassword } from 'aws-amplify/auth';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, CheckCircle, ArrowLeft } from "lucide-react";

export default function ResetPassword() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setIsLoading(true);

    try {
      await resetPassword({ username: email });
      setSuccess(true);
      // Redirecting to the verification code confirmation page
      router.push(`/reset-password?email=${encodeURIComponent(email)}`);
    } catch (err) {
      if (err instanceof Error) {
        switch (err.name) {
          case 'UserNotFoundException':
            setError('No account found with this email address');
            break;
          case 'LimitExceededException':
            setError('Too many attempts. Please try again later');
            break;
          default:
            setError(`An error occurred: ${err.message}`);
        }
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-gradient-to-b from-blue-50 to-white">
      <div className="w-full max-w-md">
        <Card className="p-8 shadow-lg border-t-4 border-primary">
          <div className="flex justify-center mb-6">
            <h1 className="text-3xl font-bold text-primary">xPA</h1>
          </div>
          
          <h2 className="text-2xl font-semibold text-center mb-2">Reset Password</h2>
          <p className="text-center text-sm text-muted-foreground mb-6">
            Enter your email address and we'll send you instructions to reset your password.
          </p>
          
          {error && (
            <div className="mb-4 p-3 rounded-md bg-red-50 border border-red-200 flex items-start">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 rounded-md bg-green-50 border border-green-200 flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-green-800">
                Password reset instructions have been sent to your email
              </p>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">Email address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="focus:ring-2 focus:ring-primary/20"
                disabled={isLoading}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 transition-colors"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send Reset Instructions"}
            </Button>
            
            <Button
              type="button"
              variant="outline"
              className="w-full mt-2 flex items-center justify-center"
              onClick={() => router.push('/login')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Sign In
            </Button>
          </form>
          
          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} xPA - eXtra Personal Assistant</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
