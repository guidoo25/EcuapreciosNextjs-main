import Navbar from '@/components/Navbar'
import './globals.css'
import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import { Provider } from 'react-redux'
import store from '@/lib/actions/store'
import { MenuBar } from '@/components/menubar'

const inter = Inter({ subsets: ['latin'] })
const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'], 
  weight: ['300', '400', '500', '600', '700']
 })

export const metadata: Metadata = {
  title: 'Todos los precios del Ecuador en un sitio',
  description: 'Seguidor de precios para que puedas ahorrar tu dinero.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

    <html lang="en">
      <body className={inter.className}>
        <main className="max-w-10xl mx-auto">
          <MenuBar />
          {children}
        </main>
      </body>
    </html>
  )
}
