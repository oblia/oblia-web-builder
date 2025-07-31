import Link from 'next/link';
import './globals.css';

export const metadata = {
  title: 'My Static Site',
  description: 'A static site with Next.js and Supabase',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <nav className="bg-gray-800 p-4 text-white">
          <div className="container mx-auto flex justify-between">
            <Link href="/" className="text-xl font-bold">Home</Link>
            <div className="space-x-4">
              <Link href="/signup">Sign Up</Link>
              <Link href="/login">Log In</Link>
            </div>
          </div>
        </nav>
        <main className="container mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}