'use client';

import { useState, useEffect } from 'react';
import { fetchUserAttributes, updateUserAttributes } from 'aws-amplify/auth';
import { getCurrentUserInfo } from '@/lib/auth';

interface UserPrefs {
  email: string;
  given_name: string;
  family_name?: string;
  display_name?: string;
  user_id?: string;
  picture?: string;
}

export default function PrefsPage() {
  const [prefs, setPrefs] = useState<UserPrefs | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updateError, setUpdateError] = useState('');
  const [formData, setFormData] = useState<UserPrefs>({
    email: '',
    given_name: '',
    family_name: '',
    display_name: '',
    user_id: '',
    picture: '',
  });

  useEffect(() => {
    async function loadUserPrefs() {
      try {
        const userAttributes = await fetchUserAttributes();
        const userInfo = await getCurrentUserInfo();
        
        setPrefs({
          email: userAttributes.email || '',
          given_name: userAttributes.given_name || '',
          family_name: userAttributes.family_name || '',
          user_id: userAttributes.user_id || userInfo?.username || '',
          picture: userAttributes.picture || '',
        });
        
        setFormData({
          email: userAttributes.email || '',
          given_name: userAttributes.given_name || '',
          family_name: userAttributes.family_name || '',
          user_id: userAttributes.user_id || userInfo?.username || '',
          picture: userAttributes.picture || '',
        });
      } catch (error) {
        console.error('Error loading user prefs:', error);
      } finally {
        setLoading(false);
      }
    }

    loadUserPrefs();
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

  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading prefs...</p>
      </div>
    );
  }

  return (
    <>This User Preferences Page</>
  );
}
