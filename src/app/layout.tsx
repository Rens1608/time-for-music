import localFont from "next/font/local"
import "../styles/index.css";
import "../styles/prism-vsc-dark-plus.css";
import { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata: Metadata = {
  title: 'Time for Music',
  description: 'Create your own music game in seconds!',
}
const myFont = localFont({
  src: '../fonts/GeckoLunch.ttf',
  display: 'swap',
  variable: '--font-groovy',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning={true} className="!scroll-smooth" lang="en">
      <SpeedInsights />
      <body className={`${myFont.variable}`}>{children}</body>
    </html>
  )
}
