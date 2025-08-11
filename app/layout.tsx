import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// import { ThemeProvider } from "@/context/ThemeContext";
import NavBar from "@/components/molecules/NavBar";
import { HydrationGuard } from "@/components/templates/HydrationGuard";
import { UserProvider } from "@/context/UserContext";
import { ThemeProvider } from "next-themes";

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
    <html lang="en" suppressHydrationWarning className={` ${inter.variable}`}>
      <body className="font-sans antialiased">
        <UserProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <HydrationGuard>
              <NavBar />
              <div className="theme-transition">{children}</div>
            </HydrationGuard>
          </ThemeProvider>
        </UserProvider>
      </body>
    </html>
  );
}
