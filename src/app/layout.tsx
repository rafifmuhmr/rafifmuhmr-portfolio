import type {Metadata} from "next";
import {site, isPreview} from "@/config/site";
import {TooltipProvider} from "@/components/ui/tooltip";
import {JetBrains_Mono, Plus_Jakarta_Sans} from "next/font/google";
import {getLocale} from "next-intl/server";
import {ThemeProvider} from "@/components/theme-provider";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  applicationName: site.name,
  title: {default: `${site.owner} — ${site.role}`, template: `%s | ${site.name}`},
  authors: [{name: site.owner, url: site.url}],
  creator: site.owner,
  icons: {icon: [{url: "/icon.png", type: "image/png", sizes: "48x48"}], apple: [{url: "/apple-icon.png", sizes: "180x180"}]},
  verification: {google: process.env.GOOGLE_SITE_VERIFICATION || undefined},
  ...(isPreview ? {robots: {index: false, follow: false}} : {}),
};

const jakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  preload: false,
  subsets: ["latin"],
  display: "swap",
});

export default async function RootLayout({children}: {children: React.ReactNode}) {
  const locale = await getLocale();
  return (
    <html lang={locale} suppressHydrationWarning className={`${jakartaSans.variable} ${jetbrainsMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <TooltipProvider>{children}</TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
