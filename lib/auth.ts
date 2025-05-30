import { getCurrentUser, signOut as amplifySignOut } from 'aws-amplify/auth';

// 初始化 Amplify Auth 配置
export const configureAuth = () => {
  // Note: We only use client-accessible environment variables here
  // Server-side environment variables will be used in API routes
  return {
    region: process.env.AWS_REGION,
  };
};

// Get current user info
export const getCurrentUserInfo = async () => {
  try {
    const { username, userId, signInDetails } = await getCurrentUser();
    return {
      username,
      userId,
      signInDetails,
    };
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

// Cache key for storing user info in sessionStorage (must match the one in useUser hook)
const USER_CACHE_KEY = 'xpa_user_info';

// Logout
export const signOut = async () => {
  try {
    // Clear the cached user info from sessionStorage
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(USER_CACHE_KEY);
    }

    await amplifySignOut();
    return true;
  } catch (error) {
    console.error('Error signing out:', error);
    return false;
  }
};
