import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter"
});

const sora = Sora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sora"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://midshasumresearch.com"),
  alternates: { canonical: "/" },
  title: {
    default: "MidShaSum Research | Beyond the Known. By Design.",
    template: "%s | MidShaSum Research"
  },
  description:
    "An independent research and technology institution exploring quantitative research, financial technology and intelligent systems.",
  applicationName: "MidShaSum Research",
  creator: "MidShaSum Research",
  publisher: "MidShaSum Research",
  category: "Research and Technology",
  icons: {
    icon: [{ url: "/brand/favicon.png", type: "image/png", sizes: "64x64" }],
    apple: [{ url: "/brand/apple-icon.png", type: "image/png", sizes: "180x180" }]
  },
  openGraph: {
    type: "website",
    siteName: "MidShaSum Research",
    url: "https://midshasumresearch.com/",
    title: "MidShaSum Research — Beyond the Known. By Design.",
    description:
      "An independent research and technology institution exploring quantitative research, financial technology and intelligent systems.",
    images: [{
      url: "/brand/og-image.png",
      width: 1200,
      height: 630,
      alt: "MidShaSum Research — Beyond the Known. By Design."
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "MidShaSum Research — Beyond the Known. By Design.",
    description:
      "An independent research and technology institution exploring quantitative research, financial technology and intelligent systems.",
    images: ["/brand/og-image.png"]
  },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${sora.variable}`}>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "MidShaSum Research",
              url: "https://midshasumresearch.com/",
              description:
                "An independent research and technology institution exploring quantitative research, financial technology and intelligent systems."
            })
          }}
        />
      </body>
    </html>
  );
}
