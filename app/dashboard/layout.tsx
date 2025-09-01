import { Navigation } from "@/components/templates/NavigationMenu";
import React, { ReactNode } from "react";
import BookmarksPage from "./bookmark/page";

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
