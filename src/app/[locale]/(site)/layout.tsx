"use client";

import { ThemeProvider } from "next-themes";
import ToasterContext from "../../api/contex/ToasetContex";
import { useEffect, useState } from "react";
import PreLoader from "@/components/common/PreLoader";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ScrollToTop from "@/components/scrollToTop";
import "../../../styles/index.css";
import "../../../styles/prism-vsc-dark-plus.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <>
      {loading ? (
        <PreLoader />
      ) : (
        <ThemeProvider
          attribute="class"
          enableSystem={false}
          defaultTheme="light"
        >
          <ToasterContext />
          <Header />
          {children}
          <Footer />
          <ScrollToTop />
        </ThemeProvider>
      )}
    </>
  );
}
