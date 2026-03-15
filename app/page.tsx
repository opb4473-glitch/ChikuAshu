'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import LoginPageNew from '@/components/LoginPageNew';

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/check');
        if (response.ok) {
          setIsAuthenticated(true);
          router.push('/chat');
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block">
            <div className="w-12 h-12 border-4 border-muted rounded-full border-t-primary animate-spin" />
          </div>
          <p className="text-muted-foreground mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  return <LoginPageNew />;
}
