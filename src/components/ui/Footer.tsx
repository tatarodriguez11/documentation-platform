import { Branding, getBranding } from "@/lib/branding";

export const Footer = ({ branding }: { branding: Branding }) => (
<footer className="text-sm text-gray-500 py-6 border-t mt-12 text-center">
  © {new Date().getFullYear()} {branding.name}. All rights reserved.
</footer>
)
