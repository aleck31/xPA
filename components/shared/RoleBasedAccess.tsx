import React, { ReactNode, useEffect, useState } from 'react';
import { getUserRole, UserRole, hasPermission } from '@/lib/rbac';

interface RoleBasedAccessProps {
  children: ReactNode;
  requiredRole?: UserRole;
  requiredPermission?: string;
  fallback?: ReactNode;
}

/**
 * A component that conditionally renders its children based on the user's role or permissions
 * 
 * @param children - The content to render if the user has the required role or permission
 * @param requiredRole - The role required to view the content
 * @param requiredPermission - The permission required to view the content
 * @param fallback - Content to render if the user doesn't have the required role or permission
 */
export const RoleBasedAccess: React.FC<RoleBasedAccessProps> = ({
  children,
  requiredRole,
  requiredPermission,
  fallback = null,
}) => {
  const [hasAccess, setHasAccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAccess = async () => {
      try {
        setIsLoading(true);
        
        if (requiredPermission) {
          // Check if the user has the required permission
          const permitted = await hasPermission(requiredPermission);
          setHasAccess(permitted);
        } else if (requiredRole) {
          // Check if the user has the required role
          const userRole = await getUserRole();
          
          // Compare roles based on hierarchy
          const roleHierarchy = [UserRole.GUEST, UserRole.FAMILY_MEMBER, UserRole.OWNER];
          const userRoleIndex = roleHierarchy.indexOf(userRole);
          const requiredRoleIndex = roleHierarchy.indexOf(requiredRole);
          
          // User has access if their role is equal to or higher than the required role
          setHasAccess(userRoleIndex >= requiredRoleIndex);
        } else {
          // If no role or permission is required, allow access
          setHasAccess(true);
        }
      } catch (error) {
        console.error('Error checking access:', error);
        setHasAccess(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAccess();
  }, [requiredRole, requiredPermission]);

  // Show nothing while checking permissions
  if (isLoading) {
    return null;
  }

  // Render children if the user has access, otherwise render the fallback
  return hasAccess ? <>{children}</> : <>{fallback}</>;
};

export default RoleBasedAccess;
