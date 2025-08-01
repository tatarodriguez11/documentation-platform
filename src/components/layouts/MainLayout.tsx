// components/layouts/MainLayout.tsx
'use client';

import { ReactNode } from 'react';
import { Header } from '../ui/Header';
import { Footer } from '../ui/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { type Branding } from '@/lib/branding';

type Props = {
  children: ReactNode;
  branding: Branding;
};

export default function MainLayout({ children, branding }: Props) {
  return (
    <>
      <Header branding={branding} />
      <AnimatePresence mode="wait">
        <motion.main
          key={typeof window !== 'undefined' ? location.pathname : 'static'}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -24 }}
          transition={{ duration: 0.3 }}
          className="min-h-[calc(100vh-160px)] p-4"
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <Footer branding={branding} />
    </>
  );
}
