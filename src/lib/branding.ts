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
    name: 'PetStore Docs',
    logo: '/logo-default.png',
    primaryColor: '#0F172A',
    accentColor: '#6366F1',
    backgroundColor: '#FFFFFF',
    textColor: '#0F172A', 
    description: 'Official documentation for the Swagger PetStore API. Manage pets, users, and store orders efficiently.',
    codeBlockTheme: 'dracula',
  },
  store: {
    name: 'OrderFlow API',
    logo: '/logo-store.png',
    primaryColor: '#B91C1C',
    accentColor: '#F87171',
    backgroundColor: '#FEF2F2',
    textColor: '#7F1D1D',
    description: 'Backend order processing and inventory management documentation.',
    codeBlockTheme: 'github',
  },
  user: {
    name: 'UserManager Docs',
    logo: '/user-logo.png',
    primaryColor: '#10B981',
    accentColor: '#6EE7B7',
    backgroundColor: '#ECFDF5',
    textColor: '#064E3B',
    description: 'Endpoints related to user creation, authentication, and account management.',
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
