'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSetup, setShowSetup] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || 'Login failed');
        setLoading(false);
        return;
      }

      router.push('/chat');
    } catch (err) {
      setError('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  const handleInitialize = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/init', {
        method: 'POST',
      });

      if (response.ok) {
        const data = await response.json();
        setError('');
        setShowSetup(false);
        setUsername('ashu');
        setPassword('ashu123');
      } else {
        const data = await response.json();
        setError(data.error || 'Initialization failed');
      }
    } catch (err) {
      setError('Failed to initialize. Make sure MONGODB_URI is set in Vercel Vars.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 flex items-center justify-center p-4">
      {/* Background hearts decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 text-pink-200 text-6xl opacity-20">♡</div>
        <div className="absolute bottom-20 right-20 text-rose-200 text-7xl opacity-20">♡</div>
        <div className="absolute top-1/2 right-10 text-pink-100 text-5xl opacity-15">♡</div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo/Title */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-serif text-rose-600 mb-2">♡</h1>
          <h2 className="text-3xl font-serif font-bold text-gray-800 mb-2">Ashu & Chiku</h2>
          <p className="text-gray-500 font-light italic">Just for us</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 backdrop-blur-sm border border-pink-100">
          <h3 className="text-2xl font-serif font-bold text-gray-800 mb-2 text-center">Welcome</h3>
          <p className="text-gray-500 text-center mb-8 text-sm">Enter your details to continue</p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
              <Input
                type="text"
                placeholder="ashu or chiku"
                value={username}
                onChange={(e) => setUsername(e.target.value.toLowerCase())}
                className="w-full border-pink-200 focus:border-rose-500 focus:ring-rose-200"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-pink-200 focus:border-rose-500 focus:ring-rose-200"
                disabled={loading}
              />
            </div>

            {error && (
              <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-lg text-sm">
                <p className="font-semibold mb-2">Setup Required:</p>
                {error.includes('MONGODB_URI') ? (
                  <div className="text-xs space-y-2">
                    <p>1. Go to <a href="https://www.mongodb.com/cloud/atlas" target="_blank" rel="noopener noreferrer" className="underline font-semibold">MongoDB Atlas</a></p>
                    <p>2. Create a FREE cluster</p>
                    <p>3. Get your connection string</p>
                    <p>4. Click settings (⚙️) top right → Vars</p>
                    <p>5. Add MONGODB_URI variable</p>
                    <p>6. Refresh this page</p>
                  </div>
                ) : (
                  <p>{error}</p>
                )}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-semibold py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              {loading ? 'Logging in...' : 'Enter Our Chat'}
            </Button>
          </form>

          <p className="text-center text-gray-500 text-xs mt-6">
            First time? Click "Setup Database" below to initialize.
          </p>

          <div className="mt-4 border-t border-pink-100 pt-4">
            <button
              onClick={() => setShowSetup(!showSetup)}
              className="text-xs text-rose-600 hover:text-rose-700 underline w-full text-center"
            >
              {showSetup ? 'Hide Setup' : 'Need to Setup Database?'}
            </button>
          </div>

          {showSetup && (
            <div className="mt-4 bg-pink-50 border border-pink-200 rounded-lg p-4 space-y-3 text-xs">
              <div>
                <p className="font-semibold text-gray-700 mb-2">SETUP STEPS:</p>
                <ol className="space-y-2 text-gray-600">
                  <li>1. Go to <a href="https://www.mongodb.com/cloud/atlas" target="_blank" rel="noopener noreferrer" className="text-rose-600 underline">MongoDB Atlas</a></li>
                  <li>2. Create FREE cluster</li>
                  <li>3. Copy connection string (mongodb+srv://...)</li>
                  <li>4. Click settings ⚙️ (top right) → Vars</li>
                  <li>5. Add: MONGODB_URI = [your string]</li>
                  <li>6. Refresh page</li>
                  <li>7. Click button below</li>
                </ol>
              </div>
              <Button
                onClick={handleInitialize}
                disabled={loading}
                className="w-full bg-rose-500 hover:bg-rose-600 text-white text-xs py-2"
              >
                {loading ? 'Initializing...' : 'Initialize Database'}
              </Button>
              <p className="text-gray-500 text-xs italic">
                This creates Ashu and Chiku users with default passwords
              </p>
            </div>
          )}
        </div>

        {/* Footer decoration */}
        <div className="mt-8 text-center">
          <p className="text-rose-400 text-sm font-light">Made with ♡ for two friends</p>
        </div>
      </div>
    </div>
  );
}
