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
    name: 'Docs Platform',
    logo: '/logo-default.png',
    primaryColor: '#1E3A8A',
    accentColor: '#3B82F6',
    backgroundColor: '#F9FAFB',
    textColor: '#111827',
    description: 'The best platform for documentation.',
    codeBlockTheme: 'github',
  },
  solar: {
    name: 'SolarTech Docs',
    logo: '/logo-solartech.png',
    primaryColor: '#EAB308',
    accentColor: '#FACC15',
    backgroundColor: '#FFFBEB',
    textColor: '#78350F',
    description: 'Documentation platform for solar engineers.',
    codeBlockTheme: 'github',
  },
  fintech: {
    name: 'FinDocs',
    logo: '/logo-fintech.webp',
    primaryColor: '#14B8A6',
    accentColor: '#2DD4BF',
    backgroundColor: '#F0FDFA',
    textColor: '#0F766E',
    description: 'APIs and docs for financial products.',
    codeBlockTheme: 'dracula',
  },
};

export const getBranding = (): Branding => {
  const brand = process.env.BRAND || 'default';
  const branding = brands[brand];

  if (!branding) {
    throw new Error(
      `Unknown brand: ${brand}. Available brands: ${Object.keys(brands).join(', ')}`
    );
  }

  return branding;
};

export const getPrismTheme = () => getBranding().codeBlockTheme;
