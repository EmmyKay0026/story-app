import { Navigation } from "@/components/templates/NavigationMenu";
// import { ThemeProvider } from "next-themes";
import React, { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    // <html lang="en">
    //   <body>
    // <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    <main className="theme-transition ">
      <Navigation>{children}</Navigation>
    </main>
    // </ThemeProvider>
    //   </body>
    // </html>
  );
};

export default Layout;
