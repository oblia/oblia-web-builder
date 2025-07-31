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
  const [businessName, setBusinessName] = useState('');
  const [buildingNumber, setBuildingNumber] = useState('');
  const [streetName, setStreetName] = useState('');
  const [townCity, setTownCity] = useState('');
  const [county, setCounty] = useState('');
  const [postCode, setPostCode] = useState('');
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
          setBusinessName(profileData.business_name || '');
          setBuildingNumber(profileData.building_number || '');
          setStreetName(profileData.street_name || '');
          setTownCity(profileData.town_city || '');
          setCounty(profileData.county || '');
          setPostCode(profileData.post_code || '');
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
      business_name: businessName,
      building_number: buildingNumber,
      street_name: streetName,
      town_city: townCity,
      county,
      post_code: postCode,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'user_id' });
    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setMessage('Profile saved successfully!');
      setShowForm(false);
      setEditForm(false); // Close edit form after saving
      setProfile({ name, business_name: businessName, building_number: buildingNumber, street_name: streetName, town_city: townCity, county, post_code: postCode });
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
                <p><strong>Business Name:</strong> {profile.business_name || 'Not set'}</p>
                <p><strong>Building Number:</strong> {profile.building_number || 'Not set'}</p>
                <p><strong>Street Name:</strong> {profile.street_name || 'Not set'}</p>
                <p><strong>Town/City:</strong> {profile.town_city || 'Not set'}</p>
                <p><strong>County:</strong> {profile.county || 'Not set'}</p>
                <p><strong>Post Code:</strong> {profile.post_code || 'Not set'}</p>
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
              className="p-2 border rounded w-full text-sm"
              required
            />
            <input
              type="text"
              placeholder="Business Name"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="p-2 border rounded w-full text-sm"
              required
            />
            <input
              type="text"
              placeholder="Building Number"
              value={buildingNumber}
              onChange={(e) => setBuildingNumber(e.target.value)}
              className="p-2 border rounded w-full text-sm"
              required
            />
            <input
              type="text"
              placeholder="Street Name"
              value={streetName}
              onChange={(e) => setStreetName(e.target.value)}
              className="p-2 border rounded w-full text-sm"
              required
            />
            <input
              type="text"
              placeholder="Town/City"
              value={townCity}
              onChange={(e) => setTownCity(e.target.value)}
              className="p-2 border rounded w-full text-sm"
              required
            />
            <input
              type="text"
              placeholder="County"
              value={county}
              onChange={(e) => setCounty(e.target.value)}
              className="p-2 border rounded w-full text-sm"
              required
            />
            <input
              type="text"
              placeholder="Post Code"
              value={postCode}
              onChange={(e) => setPostCode(e.target.value)}
              className="p-2 border rounded w-full text-sm"
              required
            />
            <button type="submit" className="btn btn-primary w-full">
              Save Profile
            </button>
            {message && <p className="text-green-500 text-sm">{message}</p>}
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
                placeholder="Business Name"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="p-2 border rounded w-full text-sm"
                required
              />
              <input
                type="text"
                placeholder="Building Number"
                value={buildingNumber}
                onChange={(e) => setBuildingNumber(e.target.value)}
                className="p-2 border rounded w-full text-sm"
                required
              />
              <input
                type="text"
                placeholder="Street Name"
                value={streetName}
                onChange={(e) => setStreetName(e.target.value)}
                className="p-2 border rounded w-full text-sm"
                required
              />
              <input
                type="text"
                placeholder="Town/City"
                value={townCity}
                onChange={(e) => setTownCity(e.target.value)}
                className="p-2 border rounded w-full text-sm"
                required
              />
              <input
                type="text"
                placeholder="County"
                value={county}
                onChange={(e) => setCounty(e.target.value)}
                className="p-2 border rounded w-full text-sm"
                required
              />
              <input
                type="text"
                placeholder="Post Code"
                value={postCode}
                onChange={(e) => setPostCode(e.target.value)}
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