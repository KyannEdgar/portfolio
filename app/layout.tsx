import type { Metadata } from "next";
import { Inter, Space_Grotesk, Geist_Mono } from "next/font/google";
import { siteConfig } from "@/config";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroCursorProvider } from "@/components/ui/hero-cursor-context";
import { Preloader } from "@/components/ui/preloader";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} // ${siteConfig.title}`,
    template: `%s // ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Cloud Infrastructure",
    "Zero-Trust Networking",
    "Kubernetes",
    "eBPF",
    "WireGuard",
    "Post-Quantum Cryptography",
    "Linux Systems",
    "Distributed Systems",
  ],
  authors: [{ name: siteConfig.author }],
  creator: siteConfig.author,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kian.infra",
    title: `${siteConfig.name} // ${siteConfig.title}`,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} // ${siteConfig.title}`,
    description: siteConfig.description,
    creator: "@kianabustan",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable} ${geistMono.variable}`}
    >
      <body
        suppressHydrationWarning
        className={`${inter.className} min-h-screen bg-background font-sans text-foreground antialiased selection:bg-foreground selection:text-background transition-colors duration-500 ease-in-out`}
      >
        <ThemeProvider
          attribute="class"
          forcedTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <HeroCursorProvider>
            <Preloader />
            <div className="relative flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </HeroCursorProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
