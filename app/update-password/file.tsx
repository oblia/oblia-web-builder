'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function UpdatePassword() {
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('access_token');
    const type = urlParams.get('type');
    if (!token || type !== 'recovery') {
      setMessage('Invalid or missing reset token.');
    }
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setMessage('Password updated successfully. Redirecting to login...');
      setTimeout(() => router.push('/login'), 2000);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form onSubmit={handleUpdate} className="flex flex-col gap-4 p-6 bg-white shadow-md rounded">
        <h1 className="text-2xl font-bold">Update Password</h1>
        {message && <p className={message.includes('Error') ? 'text-red-500' : 'text-blue-500'}>{message}</p>}
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">
          Update Password
        </button>
        <a href="/login" className="text-blue-500">Back to Log In</a>
      </form>
    </div>
  );
}