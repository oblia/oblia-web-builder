import './globals.css';
import Navbar from 'app/components/Navbar';

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
        <Navbar />
        {children}
      </body>
    </html>
  );
}