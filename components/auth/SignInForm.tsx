'use client';

import { useState, useEffect } from 'react';
import { signIn } from 'aws-amplify/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertCircle, Eye, EyeOff } from "lucide-react";

interface SignInFormProps {
  email: string;
  setEmail: (email: string) => void;
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
}

export function SignInForm({ email, setEmail, onSuccess, onError }: SignInFormProps) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  
  // Load remembered email on component mount
  useEffect(() => {
    const rememberedEmail = localStorage.getItem('xpa_remembered_email');
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, [setEmail]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await signIn({ username: email, password });
      
      // Handle "Remember me" functionality
      if (rememberMe) {
        // Store email in localStorage
        localStorage.setItem('xpa_remembered_email', email);
      } else {
        // Clear remembered email if "Remember me" is unchecked
        localStorage.removeItem('xpa_remembered_email');
      }
      
      onSuccess('Login successful! Redirecting...');
      setTimeout(() => {
        router.push('/');
      }, 1000);
    } catch (err) {
      if (err instanceof Error) {
        switch (err.name) {
          case 'UserNotFoundException':
            setError('No account found with this email address');
            break;
          case 'NotAuthorizedException':
            setError('Incorrect email or password');
            break;
          case 'UserNotConfirmedException':
            setError('Please verify your email before signing in');
            // Redirect to verification page after a short delay
            setTimeout(() => {
              router.push(`/auth/verify-email?email=${encodeURIComponent(email)}`);
            }, 2000);
            break;
          default:
            setError(`Login failed: ${err.message}`);
        }
      } else {
        setError('An unexpected error occurred');
      }
      onError(error || 'An error occurred during sign in');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSignIn} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium">Email</Label>
        <Input 
          id="email" 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="user@myners.net"
          className="focus:ring-2 focus:ring-primary/20"
          required 
        />
      </div>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label htmlFor="password" className="text-sm font-medium">Password</Label>
          <Link 
            href="./auth/reset-password" 
            className="text-xs text-primary hover:text-primary/80 hover:underline"
          >
            Forgot password?
          </Link>
        </div>
        <div className="relative">
          <Input 
            id="password" 
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="focus:ring-2 focus:ring-primary/20 pr-10"
            required 
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
      </div>
      
      <div className="flex items-center space-x-2 my-4">
        <Checkbox 
          id="remember" 
          checked={rememberMe}
          onCheckedChange={(checked) => setRememberMe(checked === true)}
        />
        <Label 
          htmlFor="remember" 
          className="text-sm text-gray-600 cursor-pointer"
          onClick={() => setRememberMe(!rememberMe)}
        >
          Remember me
        </Label>
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-primary hover:bg-primary/90 transition-colors" 
        disabled={loading}
      >
        {loading ? "Signing in..." : "Sign In"}
      </Button>
      
      {error && (
        <div className="mt-3 p-3 rounded-md bg-red-50 border border-red-200 flex items-start">
          <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}
    </form>
  );
}
