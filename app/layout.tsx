import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/context/UserContext";
import { ThemeProvider } from "next-themes";
import { SITE_URL } from "@/constants/constant";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Storybook App",
    template: "%s | Storybook App",
  },
  description: "StoryApp is a platform where users can read engaging stories online.",
  robots: {
    index: true,
    follow: true,
  },
  keywords: ["stories", "read online", "short stories", "novels"],
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "StoryApp - Read Stories Online",
    description:
      "StoryApp is a platform where users can read and enjoy stories online.",
    siteName: "StoryApp",
  },
  twitter: {
    card: "summary_large_image",
    title: "StoryApp",
    description: "Read stories online with StoryApp",
  },
};

// export const metadata: Metadata = {
//   title: "Storybook App",
//   description: "A beautiful storybook web application with modern theming",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={` ${inter.variable}`}>
      <body className="font-sans antialiased">
        {/* <UserProvider> */}
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="theme-transition ">{children}</div>
        </ThemeProvider>
        {/* </UserProvider> */}
      </body>
    </html>
  );
}
