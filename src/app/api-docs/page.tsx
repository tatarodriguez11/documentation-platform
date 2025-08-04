'use client';

import { brands } from '@/lib/branding';
import { RedocStandalone } from 'redoc';

export default function ApiDocsPage() {
  const brandKey = process.env.NEXT_PUBLIC_BRAND || 'default';
  const brand = brands[brandKey] ?? brands.default;

  return (
    <main
      className="min-h-screen p-4 w-full flex items-center justify-center"
      style={{ backgroundColor: brand.backgroundColor }}
    >
      <RedocStandalone
        specUrl="/openapi.yaml"
        options={{
          scrollYOffset: 60,
          theme: {
            colors: {
              primary: {
                main: brand.primaryColor,
              },
              success: {
                main: brand.accentColor || brand.primaryColor,
              },
              text: {
                primary: brand.textColor,
              },
            },
            typography: {
              fontSize: '16px',
              lineHeight: '1.6',
            },
          },
        }}
      />
    </main>
  );
}
