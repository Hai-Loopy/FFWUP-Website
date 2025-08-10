import type { Metadata, Viewport } from "next";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
//import { Analytics } from "@vercel/analytics/react";
//import { SpeedInsights } from "@vercel/speed-insights/next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://ffwup-website.vercel.app/"),
  title: "unification church",
  description:
    "sOMETHING TO PUT HERE",
  keywords: [
    "church",
    "christian",
    "vancouver",
    "richmond",
    "bc",
    "gospel",
    "Bible",
    "worship",
    "Jesus",
    "faith",
    "comuninity",
    "prediction",
    "biblical teaching",
    "church",
    
  ],
  authors: [{ name: "FFWPU - Richmond, BC" }],
  creator: "FFWPU - Richmond, BC",
  publisher: "FFWPU - Richmond, BC",

  robots: {
    index: true,
    follow: true,
    nocache: true,
    "max-video-preview": -1,
    "max-image-preview": "large",
    "max-snippet": -1,
  },

  openGraph: {
    type: "website",
    locale: "en_EN",
    url: "https://ffwup-website.vercel.app/",
    siteName: "FFWPU - Richmond, BC",
    title: "FFWPU - Richmond, BC",

    images: [
      {
        url: "/opengraph.png",
        width: 800,
        height: 600,
        alt: "FFWPU - Richmond, BC",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Casa de Oración - South San DiegoUni",
    description:
      "Únete a nosotros en adoración y alabanza en Casa de Oración en South San Diego mientras celebramos a nuestro Señor y Salvador, Jesucristo, en nuestra comunidad acogedora.",
    images: ["/twitter.png"],
    creator: "@casadeoracionssd",
    site: "@casadeoracionssd",
  },

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any", type: "image/x-icon" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      {
        url: "/android-chrome-512x512.png",
        type: "image/png",
        sizes: "512x512",
      },
      {
        url: "/android-chrome-192x192.png",
        type: "image/png",
        sizes: "192x192",
      },
    ],
    apple: [
      { url: "/apple-touch-icon.png", type: "image/png", sizes: "180x180" },
    ],
  },
  category: "religion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        {/*<Analytics />
        <SpeedInsights/>*/}
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}




