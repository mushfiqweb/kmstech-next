import type { Metadata } from "next";
import { Geist, Geist_Mono, Atkinson_Hyperlegible } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const atkinson = Atkinson_Hyperlegible({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-atkinson",
});

export const metadata: Metadata = {
  // Basic Metadata
  title: "KMS Tech",
  description: "Secure, reliable & optimized IT solutions",
  applicationName: "KMS Tech",
  authors: [{ name: "KMS Tech Team", url: "https://kmstech.co" }],
  generator: "Next.js",
  keywords: ["IT solutions", "software development", "consultancy", "web development"],
  referrer: "origin-when-cross-origin",
  creator: "KMS Tech",
  publisher: "KMS Tech",

  // Robots
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Icons
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.ico",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/apple-touch-icon-precomposed.ico",
    },
  },

  // Manifest
  manifest: "/site.webmanifest",

  // Open Graph
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kmstech.co",
    title: "KMS Tech",
    description: "Secure, reliable & optimized IT solutions",
    siteName: "KMS Tech",
    images: [
      {
        url: "/og-image.jpg", // Must be an absolute URL
        width: 1200,
        height: 630,
        alt: "KMS Tech",
      },
    ],
  },

  // Twitter
  twitter: {
    card: "summary_large_image",
    title: "KMS Tech",
    description: "Secure, reliable & optimized IT solutions",
    siteId: "",
    creator: "@kmstech",
    creatorId: "",
    images: ["/twitter-image.jpg"], // Must be an absolute URL
  },

  // Verification
  verification: {
    google: "",
    yandex: "",
    yahoo: "",
    other: {
      me: ["my-email", "my-link"],
    },
  },

  // Apple Web App
  appleWebApp: {
    capable: true,
    title: "KMS Tech",
    statusBarStyle: "black-translucent",
  },

  // Format Detection
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  // Alternates
  alternates: {
    canonical: "https://kmstech.co",
    languages: {
      "en-US": "https://kmstech.co/en-US",
    },
  },

  // App Links
  appLinks: {
    ios: {
      url: "https://kmstech.co/ios",
      app_store_id: "app_store_id",
    },
    android: {
      package: "com.kmstech.app",
      app_name: "KMS Tech",
    },
    web: {
      url: "https://kmstech.co/web",
      should_fallback: true,
    },
  },

  // Category
  category: "technology",
  
  // Base URL for metadata
  metadataBase: new URL("https://kmstech.co"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${atkinson.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
