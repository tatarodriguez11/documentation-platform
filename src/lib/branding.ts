export type Branding = {
  name: string;
  logo: string;
  primaryColor: string;
  accentColor?: string;
  backgroundColor?: string;
  textColor?: string;
  description: string;
  codeBlockTheme?: 'github' | 'dracula';
};

export const brands: Record<string, Branding> = {
  default: {
    name: 'Pets Platform',
    logo: '/logo-default.png',
    primaryColor: '#1E3A8A',
    accentColor: '#3B82F6',
    backgroundColor: '#F9FAFB',
    textColor: '#111827',
    description: 'The best platform for documentation.',
    codeBlockTheme: 'github',
  },
  solar: {
    name: 'SolarPets',
    logo: '/logo-solartech.png',
    primaryColor: '#B45309',
    accentColor: '#FBBF24',
    backgroundColor: '#FDFCF8',
    textColor: '#1F2937',
    description: 'Documentation platform for solar pets.',
    codeBlockTheme: 'github',
  },
  fintech: {
    name: 'FinPets',
    logo: '/logo-fintech.webp',
    primaryColor: '#14B8A6',
    accentColor: '#2DD4BF',
    backgroundColor: '#F0FDFA',
    textColor: '#0F766E',
    description: 'APIs and docs for pets.',
    codeBlockTheme: 'dracula',
  },
};

export const getBranding = (): Branding => {
  const brand = process.env.NEXT_PUBLIC_BRAND || 'default';
  const branding = brands[brand];

  if (!branding) {
    throw new Error(
      `Unknown brand: ${brand}. Available brands: ${Object.keys(brands).join(', ')}`
    );
  }

  return branding;
};

export const getPrismTheme = () => getBranding().codeBlockTheme;
