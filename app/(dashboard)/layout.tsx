import { Navigation } from "@/components/templates/NavigationMenu";
import React, { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <main>
          <Navigation>{children}</Navigation>
        </main>
      </body>
    </html>
  );
};

export default Layout;
