import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, Calendar, DollarSign, Settings } from "lucide-react";

interface DashboardCardProps {
  title: string;
  description: string;
  type: 'finance' | 'schedule' | 'settings' | 'analytics';
  value?: string | number;
  action?: () => void;
  actionLabel?: string;
}

export function DashboardCard({ 
  title, 
  description, 
  type, 
  value, 
  action, 
  actionLabel = 'View Details' 
}: DashboardCardProps) {
  // Select icon based on card type
  const getIcon = () => {
    switch (type) {
      case 'finance':
        return <DollarSign className="h-5 w-5" />;
      case 'schedule':
        return <Calendar className="h-5 w-5" />;
      case 'settings':
        return <Settings className="h-5 w-5" />;
      case 'analytics':
        return <BarChart3 className="h-5 w-5" />;
      default:
        return null;
    }
  };

  return (
    <Card className="w-full shadow-xs">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-2">
          {getIcon()}
          <CardTitle className="text-lg font-medium">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        {value && (
          <div className="text-2xl font-bold mb-2">{value}</div>
        )}
        <CardDescription>{description}</CardDescription>
      </CardContent>
      {action && (
        <CardFooter>
          <Button onClick={action} variant="outline" size="sm" className="w-full">
            {actionLabel}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
