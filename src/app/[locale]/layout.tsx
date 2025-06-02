import localFont from "next/font/local"
import "../../styles/index.css";
import "../../styles/prism-vsc-dark-plus.css";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Locale, NextIntlClientProvider } from "next-intl";
import { routing } from '@/i18n/routing';
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ReactNode } from "react";

const myFont = localFont({
  src: [
    { path: '../../fonts/GeckoLunch.ttf', weight: '400', style: 'normal' },
  ],
  variable: '--font-groovy',
  display: 'swap',
})

type Props = {
  children: ReactNode;
  params: Promise<{ locale: Locale }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(props: Omit<Props, 'children'>) {
  const { locale } = await props.params;

  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: "Time for Music",
    description: t('description'),
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode,
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale);

  return (
    <html lang={locale} suppressHydrationWarning={true} className={`!scroll-smooth ${myFont.variable}`}>
      <SpeedInsights />
      <body>
        <NextIntlClientProvider>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
