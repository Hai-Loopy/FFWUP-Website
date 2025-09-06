import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "./providers"

// Force dynamic generation
export const dynamic = 'force-dynamic'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "FFWUP Website",
  description: "FFWUP Website with Authentication",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {/* Simple Login Header */}
          <div style={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '80px',
            backgroundColor: 'red',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 20px',
            zIndex: 9999,
            fontSize: '16px'
          }}>
            <div>FFWUP WEBSITE - LOGIN BUTTONS:</div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <Link 
                href="/login" 
                style={{
                  backgroundColor: 'blue',
                  color: 'white',
                  padding: '8px 16px',
                  textDecoration: 'none',
                  borderRadius: '4px'
                }}
              >
                LOGIN
              </Link>
              <Link 
                href="/register"
                style={{
                  backgroundColor: 'green',
                  color: 'white',
                  padding: '8px 16px',
                  textDecoration: 'none',
                  borderRadius: '4px'
                }}
              >
                REGISTER
              </Link>
            </div>
          </div>
          {children}
        </Providers>
      </body>
    </html>
  )
}
