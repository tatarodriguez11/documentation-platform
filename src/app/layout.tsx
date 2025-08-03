import './globals.css';
import MainLayout from '@/components/layouts/MainLayout';
import { getBranding } from '@/lib/branding';
import type { Metadata } from 'next';

const branding = getBranding();

export const metadata: Metadata = {
  title: branding.name,
  description: branding.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <MainLayout branding={branding}>
          {children}
        </MainLayout>
      </body>
    </html>
  );
}
