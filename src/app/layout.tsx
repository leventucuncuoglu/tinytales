import type { Metadata } from 'next'
import { Comic_Neue } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/navbar'

const comic = Comic_Neue({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-comic',
});

export const metadata: Metadata = {
  title: 'TinyTales - Çocuklar İçin Sesli Hikayeler',
  description: 'Çocuklar için özel olarak hazırlanmış, eğlenceli ve eğitici sesli hikayeler.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" className={comic.variable}>
      <body className={comic.className}>
        <Navbar />
        <main className="pt-20">
          {children}
        </main>
      </body>
    </html>
  )
}
