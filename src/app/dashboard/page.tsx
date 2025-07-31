'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
      } else {
        setUser(user);
      }
    };
    getUser();
  }, [router]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="p-6 bg-white shadow-md rounded">
        <h1 className="text-2xl font-bold">Welcome, {user.email}</h1>
        <button
          onClick={handleSignOut}
          className="mt-4 p-2 bg-red-500 text-white rounded"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}