import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Todo App',
  description: 'A simple and elegant todo application built with Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-gray-50">
          {children}
        </div>
      </body>
    </html>
  )
}
