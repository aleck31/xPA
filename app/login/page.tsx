'use client';

import { useState, useEffect } from 'react';
import { signIn, signUp } from 'aws-amplify/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, CheckCircle, Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const redirectPath = urlParams.get('redirect');
    if (redirectPath) {
      sessionStorage.setItem('redirectPath', redirectPath);
    }
  }, []);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      await signIn({ username: email, password });
      setSuccess('Login successful! Redirecting...');
      setTimeout(() => {
        router.push('/main');
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
            break;
          default:
            setError(`Login failed: ${err.message}`);
        }
      } else {
        setError('An unexpected error occurred');
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      await signUp({
        username: email,
        password,
        options: {
          userAttributes: { email },
          autoSignIn: true
        }
      });
      setSuccess('Account created successfully! Redirecting...');
      setTimeout(() => {
        router.push('/main');
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
      console.error(err);
    } finally {
      setLoading(false);
    }
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
            
            <TabsContent value="signin">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    className="focus:ring-2 focus:ring-primary/20"
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                    <Link 
                      href="./reset-password" 
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
            </TabsContent>
            
            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="text-sm font-medium">Email</Label>
                  <Input 
                    id="signup-email" 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
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
            </TabsContent>
              <div className="mt-8 text-center text-sm text-muted-foreground">
                <p>© {new Date().getFullYear()} xPA - eXtra Personal Assistant</p>
              </div>
            </div>
          </Tabs>
        </Card>
        <div className="hidden md:flex md:w-1/2 bg-gray-100 items-center justify-center p-8">
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-white flex items-center justify-center shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">xPA Assistant</h2>
            <p className="text-gray-600">Your intelligent personal assistant for managing finances, schedules, and more.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
