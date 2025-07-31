import './globals.css'
import { getBranding } from '@/lib/branding'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const branding = getBranding()

  return (
    <html lang="en">
      <head>
        <title>{branding.name}</title>
        <meta name="description" content={branding.description} />
        <link rel="icon" href={branding.logo} />
      </head>

      <body className="bg-white text-gray-800">
        <header className="p-4 border-b border-gray-200">
          <img src={branding.logo} alt={branding.name} className="h-8" />
        </header>
        <main className="p-6">{children}</main>
      </body>
    </html>
  )
}
