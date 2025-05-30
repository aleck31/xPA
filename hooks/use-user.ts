'use client';

import { useState, useEffect } from 'react';
import { fetchUserAttributes, getCurrentUser } from 'aws-amplify/auth';
import { getGravatarUrl } from '@/lib/utils';
import { Amplify } from 'aws-amplify';
import amplifyOutputs from '../amplify_outputs.json';

export interface UserInfo {
  name: string;
  email: string;
  avatar: string;
  userId?: string;
}

// Cache key for storing user info in sessionStorage
const USER_CACHE_KEY = 'xpa_user_info';

export function useUser() {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // First check if we have cached user info to show immediately
    if (typeof window !== 'undefined') {
      const cachedUser = sessionStorage.getItem(USER_CACHE_KEY);
      if (cachedUser) {
        try {
          const parsedUser = JSON.parse(cachedUser);
          setUser(parsedUser);
          setLoading(false); // Remove loading state immediately
        } catch (e) {
          console.error('Error parsing cached user:', e);
        }
      }
    }

    // Then fetch fresh data
    async function fetchUserInfo() {
      try {
        // Configure Amplify
        try {
          Amplify.configure(amplifyOutputs, { ssr: true });
        } catch (configError) {
          console.error('Error configuring Amplify:', configError);
        }
        
        // Get user attributes
        const userAttributes = await fetchUserAttributes();
        
        // Extract user information
        const name = userAttributes.given_name || '';
        const email = userAttributes.email || '';
        const userId = userAttributes.sub;
        
        // Create user info object
        const userInfo: UserInfo = {
          name,
          email,
          avatar: email ? getGravatarUrl(email, 200) : '/images/avatar.png',
          userId
        };
        
        // Update state with user info
        setUser(userInfo);
        
        // Cache user info
        if (typeof window !== 'undefined') {
          sessionStorage.setItem(USER_CACHE_KEY, JSON.stringify(userInfo));
        }
      } catch (err) {
        console.error('Error fetching user info:', err);
        // Only clear user if we don't already have cached data
        if (!user) {
          setUser(null);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchUserInfo();
  }, []);

  return { user, loading, error };
}
