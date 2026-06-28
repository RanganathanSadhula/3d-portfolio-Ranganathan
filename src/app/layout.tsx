import type { Metadata } from 'next';
// @ts-ignore: global CSS import has no type declarations
import '../styles/globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://ranganathan-3d-portfolio.netlify.app'),
  title: 'Ranganathan Sadhula | AI/ML Engineer & Full Stack Developer',
  description:
    'Interactive 3D portfolio of Ranganathan Sadhula — AI/ML Engineer and Full Stack Developer at AAVIL Inc, Vijayawada.',
  keywords: ['AI Engineer', 'ML Engineer', 'Full Stack Developer', 'React', 'Next.js', 'Python', 'AAVIL Inc'],
  authors: [{ name: 'Ranganathan Sadhula' }],
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: '/favicon-512.png',
  },
  openGraph: {
    title: 'Ranganathan Sadhula | AI/ML Engineer & Full Stack Developer',
    description: 'An immersive 3D portfolio experience — walk through my virtual house, explore projects, and discover my work in AI/ML and full-stack development.',
    type: 'website',
    url: 'https://ranganathan-3d-portfolio.netlify.app',
    siteName: 'Ranganathan Sadhula Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ranganathan Sadhula | AI/ML Engineer & Full Stack Developer',
    description: 'An immersive 3D portfolio experience',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-[#050A14] text-white overflow-hidden">{children}</body>
    </html>
  );
}
