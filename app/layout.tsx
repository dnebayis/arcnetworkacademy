import type { Metadata } from 'next'
import { Inter, Source_Sans_3 } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'

const inter = Inter({ subsets: ['latin'] })
const sourceSans = Source_Sans_3({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-source-sans'
})

export const metadata: Metadata = {
  title: 'Arc Network Academy',
  description: 'Master Arc Network through interactive tutorials, modules, and quizzes. Earn certificates and become an Arc Network expert.',
  keywords: 'Arc Network, blockchain, tutorial, quiz, certificate, stablecoin, DeFi, Circle',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons+Round"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.className} ${sourceSans.variable}`}>
        {/* Background decorative orbs */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="floating-orb w-72 h-72 top-10 -left-36 opacity-20"></div>
          <div className="floating-orb w-96 h-96 top-1/2 -right-48 opacity-15" style={{animationDelay: '2s'}}></div>
          <div className="floating-orb w-64 h-64 bottom-10 left-1/3 opacity-18" style={{animationDelay: '4s'}}></div>
        </div>
        
        <Navigation />
        
        {/* Main content with proper spacing */}
        <main className="main-content">
          {children}
        </main>
      </body>
    </html>
  )
}