'use client';

import { brands } from '@/lib/branding';
import Image from 'next/image';
import { RedocStandalone } from 'redoc';

export default function ApiDocsPage() {
  const brandKey = process.env.NEXT_PUBLIC_BRAND || 'default';
  const brand = brands[brandKey] ?? brands.default;

  return (
    <main
      className="min-h-screen p-4"
      style={{ backgroundColor: brand.backgroundColor }}
    >
      <div className="flex items-center gap-4 mb-6 pt-10">
        <Image src={brand.logo} alt={`${brand.name} logo`} className="h-10" width={50} height={60}/>
        <h1 className="text-xl font-semibold" style={{ color: brand.textColor }}>
          {brand.name}
        </h1>
      </div>
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
