'use client';

import { useState, useEffect } from 'react';
import SignIn from '@/src/components/SignIn';
import ChatBot from '@/src/components/ChatBot';
import Header from '@/src/components/Header';
import { clearTokens, getStoredUser, isAuthenticated as checkAuth, type User } from '@/src/lib/api';

export default function Page() {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing authentication on mount
  useEffect(() => {
    const checkAuthentication = () => {
      if (checkAuth()) {
        const storedUser = getStoredUser();
        if (storedUser) {
          setUser(storedUser);
          setAuthenticated(true);
        }
      }
      setIsLoading(false);
    };

    checkAuthentication();
  }, []);

  const handleSignIn = (userData: User) => {
    setUser(userData);
    setAuthenticated(true);
  };

  const handleLogout = () => {
    clearTokens();
    setAuthenticated(false);
    setUser(null);
  };

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!authenticated) {
    return <SignIn onSignIn={handleSignIn} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header
        userName={user?.email.split('@')[0] || 'User'}
        userEmail={user?.email || ''}
        onLogout={handleLogout}
      />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="h-[calc(100vh-8rem)]">
          <ChatBot userName={user?.email.split('@')[0]} />
        </div>
      </main>
    </div>
  );
}

