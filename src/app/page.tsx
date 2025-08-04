'use client';

import { getBranding } from '@/lib/branding';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

const branding = getBranding();

export default function HomePage() {
  return (
    <div className="flex flex-col items-center text-center justify-center p-6 md:p-16 bg-white dark:bg-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl"
      >
        <Image
          src={branding.logo}
          alt={branding.name}
          width={100}
          height={100}
          className="mb-4 mx-auto"
        />
        <h1 className="text-4xl font-bold mb-4" style={{ color: branding.primaryColor }}>
          Welcome to {branding.name}
        </h1>
        <p className="text-lg mb-6" style={{ color: branding.textColor }}>
          {branding.description}
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/api-docs"
            className="px-6 py-3 rounded-lg font-semibold text-white"
            style={{ backgroundColor: branding.accentColor }}
          >
            View API Docs
          </Link>
          <Link
            href="/tutorial"
            className="px-6 py-3 rounded-lg font-semibold text-white"
            style={{ backgroundColor: branding.accentColor }}
          >
              Start with Tutorials
          </Link>
          <Link
            href="/blog"
            className="px-6 py-3 rounded-lg font-semibold text-white"
            style={{ backgroundColor: branding.accentColor }}
          >
              Visit the Blog
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
