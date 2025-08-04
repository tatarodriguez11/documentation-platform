import './globals.css';
import MainLayout from '@/components/layouts/MainLayout';
import { getBranding } from '@/lib/branding';
import type { Metadata } from 'next';

const branding = getBranding();

export const metadata: Metadata = {
  title: branding.name,
  description: branding.description,
  icons: {
    icon: branding.favicon || '/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" style={{
      '--brand-bg': branding.backgroundColor,
      '--brand-spinner': branding.accentColor ?? branding.primaryColor,
    } as React.CSSProperties}>
      <body>
        <MainLayout branding={branding}>
          {children}
        </MainLayout>
      </body>
    </html>
  );
}
