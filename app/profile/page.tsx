'use client';

import { useState, useEffect } from 'react';
import { fetchUserAttributes, updateUserAttributes } from 'aws-amplify/auth';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getCurrentUserInfo } from '@/lib/auth';

interface UserProfile {
  email: string;
  given_name: string;
  family_name?: string;
  preferred_username?: string;
  picture?: string;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updateError, setUpdateError] = useState('');
  const [formData, setFormData] = useState<UserProfile>({
    email: '',
    given_name: '',
    family_name: '',
    preferred_username: '',
    picture: '',
  });

  useEffect(() => {
    async function loadUserProfile() {
      try {
        const userAttributes = await fetchUserAttributes();
        const userInfo = await getCurrentUserInfo();
        
        setProfile({
          email: userAttributes.email || '',
          given_name: userAttributes.given_name || '',
          family_name: userAttributes.family_name || '',
          preferred_username: userAttributes.preferred_username || userInfo?.username || '',
          picture: userAttributes.picture || '',
        });
        
        setFormData({
          email: userAttributes.email || '',
          given_name: userAttributes.given_name || '',
          family_name: userAttributes.family_name || '',
          preferred_username: userAttributes.preferred_username || userInfo?.username || '',
          picture: userAttributes.picture || '',
        });
      } catch (error) {
        console.error('Error loading user profile:', error);
      } finally {
        setLoading(false);
      }
    }

    loadUserProfile();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);
    setUpdateSuccess(false);
    setUpdateError('');

    try {
      // Email cannot be updated directly through updateUserAttributes
      const attributesToUpdate: Record<string, string> = {};
      
      if (formData.given_name !== profile?.given_name) {
        attributesToUpdate.given_name = formData.given_name;
      }
      
      if (formData.family_name && formData.family_name !== profile?.family_name) {
        attributesToUpdate.family_name = formData.family_name;
      }
      
      if (formData.preferred_username && formData.preferred_username !== profile?.preferred_username) {
        attributesToUpdate.preferred_username = formData.preferred_username;
      }
      
      if (formData.picture && formData.picture !== profile?.picture) {
        attributesToUpdate.picture = formData.picture;
      }

      if (Object.keys(attributesToUpdate).length > 0) {
        await updateUserAttributes({
          userAttributes: attributesToUpdate
        });
        
        setProfile({
          ...profile!,
          ...attributesToUpdate
        });
        
        setUpdateSuccess(true);
      } else {
        setUpdateSuccess(true);
      }
    } catch (error) {
      console.error('Error updating user profile:', error);
      setUpdateError('Failed to update profile. Please try again.');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">User Profile</h1>
      
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>
            View and update your personal information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  value={formData.email}
                  disabled
                  className="bg-gray-50"
                />
                <p className="text-sm text-muted-foreground">
                  Email cannot be changed directly. Please contact support if you need to update your email.
                </p>
              </div>
              
              <div className="grid gap-3">
                <Label htmlFor="given_name">First Name</Label>
                <Input
                  id="given_name"
                  name="given_name"
                  value={formData.given_name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="grid gap-3">
                <Label htmlFor="family_name">Last Name</Label>
                <Input
                  id="family_name"
                  name="family_name"
                  value={formData.family_name || ''}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="grid gap-3">
                <Label htmlFor="preferred_username">Preferred Username</Label>
                <Input
                  id="preferred_username"
                  name="preferred_username"
                  value={formData.preferred_username || ''}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="grid gap-3">
                <Label htmlFor="picture">Profile Picture URL</Label>
                <Input
                  id="picture"
                  name="picture"
                  value={formData.picture || ''}
                  onChange={handleInputChange}
                  placeholder="https://example.com/your-photo.jpg"
                />
              </div>
            </div>
            
            {updateError && (
              <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md">
                {updateError}
              </div>
            )}
            
            {updateSuccess && (
              <div className="mt-4 p-3 bg-green-50 text-green-700 rounded-md">
                Profile updated successfully!
              </div>
            )}
            
            <div className="mt-6 flex justify-end">
              <Button type="submit" disabled={updating}>
                {updating ? 'Updating...' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
