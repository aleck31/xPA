import { getCurrentUser } from 'aws-amplify/auth';
import { useState, useEffect } from 'react';

// Define user roles
export enum UserRole {
  OWNER = 'OWNER',
  FAMILY_MEMBER = 'FAMILY_MEMBER',
  GUEST = 'GUEST',
}

// Define permissions for each role
export const rolePermissions = {
  [UserRole.OWNER]: [
    'read:all',
    'write:all',
    'delete:all',
    'manage:family',
    'manage:settings',
  ],
  [UserRole.FAMILY_MEMBER]: [
    'read:all',
    'write:own',
    'delete:own',
    'read:family',
  ],
  [UserRole.GUEST]: [
    'read:shared',
  ],
};

// Get the current user's role
export const getUserRole = async (): Promise<UserRole> => {
  try {
    const currentUser = await getCurrentUser();
    const userAttributes = currentUser.signInDetails?.loginId;
    
    // Check if the user has a custom:role attribute
    // Note: In a real implementation, you would fetch the role from a database or user pool
    // This is a simplified version for demonstration purposes
    if (userAttributes) {
      // For now, we'll default all users to OWNER
      return UserRole.OWNER;
    }
    
    // Default to OWNER if no role is set (for backward compatibility)
    return UserRole.OWNER;
  } catch (error) {
    console.error('Error getting user role:', error);
    // Return GUEST as a fallback for unauthenticated users
    return UserRole.GUEST;
  }
};

// Check if the user has a specific permission
export const hasPermission = async (permission: string): Promise<boolean> => {
  try {
    const role = await getUserRole();
    const permissions = rolePermissions[role] || [];
    
    return permissions.includes(permission);
  } catch (error) {
    console.error('Error checking permission:', error);
    return false;
  }
};

// React hook for checking permissions
export const usePermission = (permission: string): boolean => {
  // This is a simplified version - in a real app, you would use React Query or SWR
  // to handle the async nature of the permission check
  const [hasAccess, setHasAccess] = useState(false);
  
  useEffect(() => {
    const checkPermission = async () => {
      const result = await hasPermission(permission);
      setHasAccess(result);
    };
    
    checkPermission();
  }, [permission]);
  
  return hasAccess;
};
