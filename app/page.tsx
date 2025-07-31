import Link from 'next/link';

export default function Home() {
  console.log('Home page rendered at:', new Date().toISOString());
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="p-6 bg-white shadow-md rounded text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to My Static Site</h1>
        <p className="mb-4">Get started by signing up or logging in.</p>
        <div className="flex gap-4 justify-center">
          <Link href="/signup" className="p-2 bg-blue-500 text-white rounded">
            Sign Up
          </Link>
          <Link href="/login" className="p-2 bg-green-500 text-white rounded">
            Log In
          </Link>
          <Link href="/app" className="p-2 bg-purple-500 text-white rounded">
            Test App Route
          </Link>
        </div>
      </div>
    </div>
  );
}