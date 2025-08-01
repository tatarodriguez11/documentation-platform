'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { type Branding } from '@/lib/branding';

const navItems = [
  { name: 'Tutorial', href: '/tutorial' },
  { name: 'API Docs', href: '/api-docs' },
  { name: 'Blog', href: '/blog' },
];

export const Header = ({ branding }: { branding: Branding }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full border-b border-gray-200 fixed z-50">
      <div
        className="flex items-center justify-between px-4 py-3 md:px-8"
        style={{ backgroundColor: branding.primaryColor }}
      >
        <Link
          href="/"
          className="flex items-center gap-2 text-white font-semibold text-lg"
        >
          <img
            src={branding.logo}
            alt={`${branding.name} logo`}
            className="h-8 w-auto"
          />
          {branding.name}
        </Link>

        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <nav className="hidden md:flex gap-6 text-white text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:underline underline-offset-4"
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.nav
            className="md:hidden px-4 pb-4 bg-white shadow"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <ul className="flex flex-col gap-2 overflow-hidden">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block text-gray-800 py-2 border-b border-gray-100"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};
