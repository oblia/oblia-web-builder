'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export const dynamic = 'force-dynamic';

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

  if (!user) return <div className="text-gray-600">Loading...</div>;

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="card text-center">
        <h1 className="text-2xl font-bold mb-4 text-gray-900">Welcome, {user.email}</h1>
        <button
          onClick={handleSignOut}
          className="btn btn-secondary mt-4"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}