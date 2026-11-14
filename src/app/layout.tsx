import {TooltipProvider} from "@/components/ui/tooltip";
import {JetBrains_Mono, Plus_Jakarta_Sans} from "next/font/google";
import {getLocale} from "next-intl/server";
import {ThemeProvider} from "@/components/theme-provider";
import "./globals.css";

const jakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
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
