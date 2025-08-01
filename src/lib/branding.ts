export type Branding = {
  name: string;
  logo: string;
  primaryColor: string;
  description: string;
};

export const brands: Record<string, Branding> = {
  default: {
    name: 'Docs Platform',
    logo: '/logo-default.png',
    primaryColor: '#1E3A8A',
    description: 'The best platform for documentation.',
  },
  solar: {
    name: 'SolarTech Docs',
    logo: '/logo-solartech.png',
    primaryColor: '#EAB308',
    description: 'Documentation platform for solar engineers.',
  },
  fintech: {
    name: 'FinDocs',
    logo: '/logo-fintech.webp',
    primaryColor: '#14B8A6',
    description: 'APIs and docs for financial products.',
  },
};

export const getBranding = (): Branding => {
  const brand = process.env.BRAND || 'default';
  if (!brands[brand]) {
    throw new Error(`Unknown brand: ${brand}. Available brands: ${Object.keys(brands).join(', ')}`);
  }
  return brands[brand];
};

