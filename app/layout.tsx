import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"

export const metadata: Metadata = {
  title: "v0 App",
  description: "Created with v0",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/fonts/alibaba-puhuiti.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
        <style>{`
@font-face {
  font-family: 'Alibaba PuHuiTi';
  src: url('/fonts/alibaba-puhuiti.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
  --font-alibaba: 'Alibaba PuHuiTi', sans-serif;
}
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  )
}
