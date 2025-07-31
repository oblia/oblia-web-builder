'use client';

export default function AppTest() {
  console.log('App test page rendered at:', new Date().toISOString());
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="p-6 bg-white shadow-md rounded text-center">
        <h1 className="text-2xl font-bold">App Test Page</h1>
        <p>This is a test to check routing to /app.</p>
        <a href="/" className="p-2 bg-blue-500 text-white rounded">Back to Home</a>
      </div>
    </div>
  );
}