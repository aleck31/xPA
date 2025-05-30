'use client';

import { useState } from 'react';
import { signUp } from 'aws-amplify/auth';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Eye, EyeOff } from "lucide-react";

interface SignUpFormProps {
  email: string;
  setEmail: (email: string) => void;
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
}

export function SignUpForm({ email, setEmail, onSuccess, onError }: SignUpFormProps) {
  const [password, setPassword] = useState('');
  const [givenName, setGivenName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Invalid email format');
      onError('Invalid email format');
      setLoading(false);
      return;
    }
    
    try {
      // Use the same email for both username and email attribute
      const cleanEmail = email.trim().toLowerCase();
      
      await signUp({
        username: cleanEmail,
        password,
        options: {
          userAttributes: { 
            email: cleanEmail,
            given_name: givenName 
          },
          // Enable autoSignIn to automatically sign in after verification
          autoSignIn: true
        }
      });
      
      onSuccess('Account created successfully! Redirecting to verification page...');
      setTimeout(() => {
        router.push(`/verify-email?email=${encodeURIComponent(email)}`);
      }, 1000);
    } catch (err) {
      if (err instanceof Error) {
        switch (err.name) {
          case 'UsernameExistsException':
            setError('An account with this email already exists');
            break;
          case 'InvalidPasswordException':
            setError('Password does not meet requirements');
            break;
          case 'InvalidParameterException':
            setError('Invalid email format');
            break;
          default:
            setError(`Sign up failed: ${err.message}`);
        }
      } else {
        setError('An unexpected error occurred');
      }
      onError(error || 'An error occurred during sign up');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSignUp} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="signup-name" className="text-sm font-medium">Name</Label>
        <Input 
          id="signup-name" 
          type="text" 
          value={givenName}
          onChange={(e) => setGivenName(e.target.value)}
          placeholder="Your name"
          className="focus:ring-2 focus:ring-primary/20"
          required 
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="signup-email" className="text-sm font-medium">Email</Label>
        <Input 
          id="signup-email" 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="user@myners.net"
          className="focus:ring-2 focus:ring-primary/20"
          required 
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="signup-password" className="text-sm font-medium">Password</Label>
        <div className="relative">
          <Input 
            id="signup-password" 
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="focus:ring-2 focus:ring-primary/20 pr-10"
            placeholder="Minimum 8 characters"
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
        <p className="text-xs text-muted-foreground mt-1">
          Password must be at least 8 characters long and include uppercase, lowercase, numbers, and special characters.
        </p>
      </div>
      <Button 
        type="submit" 
        className="w-full bg-primary hover:bg-primary/90 transition-colors" 
        disabled={loading}
      >
        {loading ? "Creating Account..." : "Create Account"}
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
