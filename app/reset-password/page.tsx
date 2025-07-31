'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/update-password`,
    });
    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setMessage('Check your email for a password reset link.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form onSubmit={handleReset} className="flex flex-col gap-4 p-6 bg-white shadow-md rounded">
        <h1 className="text-2xl font-bold">Reset Password</h1>
        {message && <p className="text-blue-500">{message}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">
          Send Reset Link
        </button>
        <a href="/login" className="text-blue-500">Back to Log In</a>
      </form>
    </div>
  );
}