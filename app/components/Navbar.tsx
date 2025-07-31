"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <nav className="bg-gray-200 shadow-lg p-4">
      <div className="container mx-auto flex items-center">
        <div className="flex-1"></div> {/* Spacer to push sign-out to the right */}
        {user && (
          <button onClick={handleSignOut} className="btn btn-secondary">
            Sign Out
          </button>
        )}
      </div>
    </nav>
  );
}