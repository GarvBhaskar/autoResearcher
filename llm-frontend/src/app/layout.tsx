import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '../styles/globals.css';

// Load fonts
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// Metadata for the page
export const metadata: Metadata = {
  title: 'LLM Auto Report Generator',
  description: 'Generate AI-powered research reports with FastAPI + Next.js',
};

// Root layout
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-gray-50">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased text-gray-800`}
      >
        {children}
      </body>
    </html>
  );
}
