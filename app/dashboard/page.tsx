'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Section from 'app/components/Section';

export const dynamic = 'force-dynamic';

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editForm, setEditForm] = useState(false); // State for edit form
  const [message, setMessage] = useState<string | null>(null);
  const [openSection, setOpenSection] = useState<string | null>(null); // State to track open section
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
        if (!profileData) setShowForm(true);
        else {
          setName(profileData.name || '');
          setAddress(profileData.address || '');
          setPhoneNumber(profileData.phone_number || '');
        }
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
      setEditForm(false); // Close edit form after saving
      setProfile({ name, address, phone_number: phoneNumber });
    }
  };

  const handleEditProfile = () => {
    setEditForm(true);
  };

  const handleSectionToggle = (title: string) => {
    setOpenSection(openSection === title ? null : title); // Toggle or close if same section
  };

  if (!user) return <div className="text-gray-600">Loading...</div>;

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="bg-gray-200 shadow-lg p-6 min-w-fit">
        {profile ? (
          <>
            <Section
              title="Profile"
              isOpen={openSection === 'Profile'}
              onToggle={handleSectionToggle}
            >
              <div>
                <p><strong>Name:</strong> {profile.name || 'Not set'}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Address:</strong> {profile.address || 'Not set'}</p>
                <p><strong>Phone:</strong> {profile.phone_number || 'Not set'}</p>
                <button
                  onClick={handleEditProfile}
                  className="mt-2 btn btn-primary w-full"
                >
                  Edit
                </button>
              </div>
            </Section>
            <Section
              title="Projects"
              isOpen={openSection === 'Projects'}
              onToggle={handleSectionToggle}
            >
              <ul className="list-disc pl-5">
                <li>Project 1</li>
                <li>Project 2</li>
                <li>Project 3</li>
              </ul>
            </Section>
          </>
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
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {editForm && profile && (
          <div className="max-w-md mx-auto bg-white p-4 rounded shadow-lg">
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="p-2 border rounded w-full text-sm"
                required
              />
              <input
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="p-2 border rounded w-full text-sm"
                required
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="p-2 border rounded w-full text-sm"
                required
              />
              <button type="submit" className="btn btn-primary w-full">
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setEditForm(false)}
                className="mt-2 btn btn-secondary w-full"
              >
                Cancel
              </button>
              {message && <p className="text-green-500 text-sm">{message}</p>}
            </form>
          </div>
        )}
      </main>
    </div>
  );
}