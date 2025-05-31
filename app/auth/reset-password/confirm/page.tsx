'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { confirmResetPassword } from 'aws-amplify/auth';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, CheckCircle, ArrowLeft } from "lucide-react";

export default function ConfirmResetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setIsLoading(true);

    // Validate passwords match
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      await confirmResetPassword({
        username: email,
        confirmationCode: code,
        newPassword: newPassword
      });
      
      setSuccess(true);
      
      // Redirect to login page after successful password reset
      setTimeout(() => {
        router.push('/auth');
      }, 2000);
    } catch (err) {
      if (err instanceof Error) {
        switch (err.name) {
          case 'CodeMismatchException':
            setError('Invalid verification code');
            break;
          case 'ExpiredCodeException':
            setError('Verification code has expired');
            break;
          case 'LimitExceededException':
            setError('Too many attempts. Please try again later');
            break;
          case 'InvalidPasswordException':
            setError('Password does not meet requirements');
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
          
          <h2 className="text-2xl font-semibold text-center mb-2">Reset Your Password</h2>
          <p className="text-center text-sm text-muted-foreground mb-6">
            Enter the verification code sent to {email} and your new password.
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
                Password reset successful! Redirecting to login...
              </p>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="code" className="text-sm font-medium">Verification Code</Label>
              <Input
                id="code"
                name="code"
                type="text"
                required
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter verification code"
                className="focus:ring-2 focus:ring-primary/20"
                disabled={isLoading || success}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword" className="text-sm font-medium">New Password</Label>
              <Input
                id="newPassword"
                name="newPassword"
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="focus:ring-2 focus:ring-primary/20"
                disabled={isLoading || success}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="focus:ring-2 focus:ring-primary/20"
                disabled={isLoading || success}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 transition-colors"
              disabled={isLoading || success}
            >
              {isLoading ? "Processing..." : "Reset Password"}
            </Button>
            
            <Button
              type="button"
              variant="outline"
              className="w-full mt-2 flex items-center justify-center"
              onClick={() => router.push('/auth')}
              disabled={isLoading || success}
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
