import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
// Temporarily disable Amplify configuration for local testing
// import { Amplify } from 'aws-amplify';
// import config from '@/amplify/backend';

// Configure Amplify
// Amplify.configure(config, {
//   ssr: true // Enable server-side rendering
// });

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'xPA - eXtra Personal Assistant',
  description: 'Your intelligent personal assistant for finance and schedule management',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          {children}
        </div>
      </body>
    </html>
  );
}
