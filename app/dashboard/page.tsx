'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const getUserAndProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) router.push('/login');
      else {
        setUser(user);
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();
        setProfile(profileData || null);
        if (!profileData) setShowForm(true); // Show form if no profile
      }
    };
    getUserAndProfile();
  }, [router]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('profiles').upsert({
      user_id: user.id,
      name,
      address,
      phone_number: phoneNumber,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'user_id' });
    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setMessage('Profile saved successfully!');
      setShowForm(false);
      setProfile({ name, address, phone_number: phoneNumber });
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (!user) return <div className="text-gray-600">Loading...</div>;

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="card text-center">
        <h1 className="text-2xl font-bold mb-4 text-gray-900">Welcome, {user.email}</h1>
        {profile ? (
          <div className="mb-4">
            <p>Name: {profile.name || 'Not set'}</p>
            <p>Address: {profile.address || 'Not set'}</p>
            <p>Phone: {profile.phone_number || 'Not set'}</p>
          </div>
        ) : showForm ? (
          <form onSubmit={handleSaveProfile} className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-2 border rounded w-full"
              required
            />
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="p-2 border rounded w-full"
              required
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="p-2 border rounded w-full"
              required
            />
            <button type="submit" className="btn btn-primary w-full">
              Save Profile
            </button>
            {message && <p className="text-green-500">{message}</p>}
          </form>
        ) : null}
        <button onClick={handleSignOut} className="btn btn-secondary mt-4">
          Sign Out
        </button>
      </div>
    </div>
  );
}