import type { Metadata } from 'next';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'Ranganathan Sadhula | Full Stack Developer & AI Engineer',
  description:
    'Interactive 3D portfolio of Ranganathan Sadhula — Full Stack Developer and AI/ML Engineer at Sweet Design Hub, Vijayawada.',
  keywords: ['Full Stack Developer', 'AI Engineer', 'ML Engineer', 'React', 'Next.js', 'Python'],
  authors: [{ name: 'Ranganathan Sadhula' }],
  openGraph: {
    title: 'Ranganathan Sadhula | 3D Portfolio',
    description: 'An immersive 3D portfolio experience',
    type: 'website',
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
