import type { Metadata } from 'next'
import { Manrope, Unbounded } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AgeGate from '@/components/AgeGate'
import { CartProvider } from '@/lib/cart'
import { site } from '@/lib/site'

const display = Unbounded({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-display',
})

const body = Manrope({
  subsets: ['latin'],
  variable: '--font-body',
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    siteName: site.name,
    type: 'website',
    locale: 'en_US',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <CartProvider>
          <AgeGate />
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-bud focus:px-4 focus:py-2 focus:text-ink"
          >
            Skip to content
          </a>
          <Header />
          <main id="main" className="min-h-screen pt-16">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}
