import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { SITE_URL } from "@/constants/constant";

// const inter = Inter({
//   subsets: ["latin"],
//   display: "swap",
//   variable: "--font-inter",
//   preload: true,
// });

export const metadata: Metadata = {
  title: {
    default: "Fans corner",
    template: "%s | Fans corner",
  },

  description:
    "Fans corner is a platform where users can read engaging stories online.",
  robots: {
    index: true,
    follow: true,
  },
  keywords: ["stories", "read online", "short stories", "novels"],
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Fans corner - Read Stories Online",
    description:
      "Fans corner is a platform where users can read and enjoy stories online.",
    siteName: "Fans corner",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fans corner",
    description: "Read stories online with Fans corner",
  },
};
metadata.icons = {
  icon: "/globe.svg",
  shortcut: "/globe.svg",
  apple: "/globe.svg",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ${inter.variable}
  return (
    <html lang="en" suppressHydrationWarning className={` `}>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="theme-transition ">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
