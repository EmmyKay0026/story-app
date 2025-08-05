import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { HydrationGuard } from "@/components/templates/HydrationGuard";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Storybook App",
  description: "A beautiful storybook web application with modern theming",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className="font-sans antialiased">
        <ThemeProvider>
          <HydrationGuard>
            <div className="theme-transition">{children}</div>
          </HydrationGuard>
        </ThemeProvider>
      </body>
    </html>
  );
}
