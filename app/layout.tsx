import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://midshasumresearch.com"),
  title: {
    default: "MidShaSum Research | Beyond the Known. By Design.",
    template: "%s | MidShaSum Research"
  },
  description:
    "An independent research and technology institution exploring quantitative research, financial technology and intelligent systems.",
  applicationName: "MidShaSum Research",
  openGraph: {
    type: "website",
    siteName: "MidShaSum Research",
    title: "MidShaSum Research — Beyond the Known. By Design.",
    description:
      "Institutional thinking. Scientific curiosity. Engineering precision."
  },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
