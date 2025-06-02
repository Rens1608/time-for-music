export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning={true} className="!scroll-smooth" lang="en">
      <body>{children}</body>
    </html>
  )
}
