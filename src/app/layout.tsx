import NavBar from '@/components/navbar'
import './globals.css'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast';
import Providers from '@/components/provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Next Auth Using Credentials',
  description: 'A demo application of Next Auth Credentials',
}

type iProps = {
  children: React.ReactNode,
  session: any
}

export default function RootLayout({
  children, session
}: iProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Toaster />
          <NavBar />
          {children}
        </Providers>
          
       </body>
    </html>
  )
}
