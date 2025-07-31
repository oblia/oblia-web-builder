'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      setError(error.message);
    } else {
      router.push('/login');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form onSubmit={handleSignUp} className="flex flex-col gap-4 p-6 bg-white shadow-md rounded">
        <h1 className="text-2xl font-bold">Sign Up</h1>
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">
          Sign Up
        </button>
        <p>
          Already have an account?{' '}
          <a href="/login" className="text-blue-500">
            Log In
          </a>
        </p>
      </form>
    </div>
  );
}