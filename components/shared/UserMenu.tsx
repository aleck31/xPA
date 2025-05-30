"use client"

import {
  Bell,
  MoreVerticalIcon ,
  LogOut,
  User,
  Settings,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useUser } from '@/hooks/use-user';
import { useState } from 'react';

export function UserMenu() {
  const router = useRouter();
  const { user, loading } = useUser();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  
  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await signOut();
      router.push('/login');
    } catch (error) {
      console.error('Error signing out:', error);
      setIsLoggingOut(false);
    }
  };

  // Default info displayed before loading actual user info
  const defaultUser = {
    name: "Loading...",
    email: "",
    avatar: "/images/avatar.png"
  };

  const displayUser = user || defaultUser;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-2 px-2"
        >
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage src={displayUser.avatar} alt={displayUser.name} />
            <AvatarFallback className="rounded-lg">
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                displayUser.name.substring(0, 2).toUpperCase()
              )}
            </AvatarFallback>
          </Avatar>
          <MoreVerticalIcon className="ml-auto size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56"
        align="end"
        sideOffset={8}
      >
        <DropdownMenuLabel>
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={displayUser.avatar} alt={displayUser.name} />
              <AvatarFallback>
                {displayUser.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 text-left text-sm space-y-1">
              <div className="truncate font-medium">{displayUser.name || 'N/A'}</div>
              {displayUser.email && (
                <div className="truncate text-xs text-muted-foreground">{displayUser.email}</div>
              )}
            </div>
          </div>          
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => router.push('/profile')}>
            <User className="mr-2 h-4 w-4" />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push('/preferences')}>
            <Settings className="mr-2 h-4 w-4" />
            Preferences
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={handleLogout} 
          className="focus:text-red-500"
          disabled={isLoggingOut}
        >
          {isLoggingOut ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <LogOut className="mr-2 h-4 w-4" />
          )}
          {isLoggingOut ? "Logging out..." : "Logout"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
