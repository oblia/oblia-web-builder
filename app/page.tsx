import Link from 'next/link';

export default function Home() {
  console.log('Home page rendered at:', new Date().toISOString());
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="card text-center">
        <h1 className="text-4xl font-bold mb-6 text-gray-900">Welcome to My Static Site</h1>
        <p className="mb-6 text-lg text-gray-600">Get started by signing up or logging in.</p>
        <div className="flex gap-4 justify-center">
          <Link href="/signup" className="btn btn-primary">
            Sign Up
          </Link>
          <Link href="/login" className="btn btn-secondary">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}