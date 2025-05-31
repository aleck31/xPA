'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { confirmSignUp, resendSignUpCode, signIn } from 'aws-amplify/auth';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, CheckCircle, ArrowLeft } from "lucide-react";

export default function VerifyEmail() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && resendDisabled) {
      setResendDisabled(false);
    }
  }, [countdown, resendDisabled]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setIsLoading(true);

    try {
      await confirmSignUp({
        username: email,
        confirmationCode: code
      });
      
      setSuccess(true);
      
      // Redirect to home page after successful verification
      // With autoSignIn enabled in the signup process, the user will be automatically signed in
      setTimeout(() => {
        router.push('/');
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

  const handleResendCode = async () => {
    setError('');
    setIsLoading(true);
    setResendDisabled(true);
    setCountdown(60); // Disable resend for 60 seconds

    try {
      await resendSignUpCode({ username: email });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      if (err instanceof Error) {
        switch (err.name) {
          case 'LimitExceededException':
            setError('Too many attempts. Please try again later');
            break;
          default:
            setError(`An error occurred: ${err.message}`);
        }
      } else {
        setError('An unexpected error occurred');
      }
      setResendDisabled(false);
      setCountdown(0);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-gradient-to-b from-blue-50 to-white">
      <div className="w-full max-w-md">
        <Card className="p-8 shadow-lg border-t-4 border-primary">
          <div className="flex justify-center mb-6">
            <img src="/images/xpa-logo.svg" alt="xPA Logo" className="h-16 w-16" />
          </div>
          
          <h2 className="text-2xl font-semibold text-center mb-2">Verify Your Email</h2>
          <p className="text-center text-sm text-muted-foreground mb-6">
            {email ? (
              <>We sent a verification code to <span className="font-medium">{email}</span>.</>
            ) : (
              <>Please enter the verification code sent to your email.</>
            )}
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
                {success ? 'Email verified successfully! Signing you in and redirecting to the app...' : 'Verification code sent successfully!'}
              </p>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleVerify}>
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

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 transition-colors"
              disabled={isLoading || success}
            >
              {isLoading ? "Verifying..." : "Verify Email"}
            </Button>
            
            <div className="flex justify-between items-center mt-4">
              <Button
                type="button"
                variant="outline"
                className="flex items-center justify-center"
                onClick={() => router.push('/auth')}
                disabled={isLoading || success}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Sign In
              </Button>
              
              <Button
                type="button"
                variant="ghost"
                className="text-sm text-primary hover:text-primary/80"
                onClick={handleResendCode}
                disabled={isLoading || resendDisabled || success}
              >
                {resendDisabled ? `Resend code (${countdown}s)` : "Resend code"}
              </Button>
            </div>
          </form>
          
          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} xPA - eXtra Personal Assistant</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
