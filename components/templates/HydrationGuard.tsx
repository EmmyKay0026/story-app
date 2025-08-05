"use client";

import { useEffect, useState } from "react";

export const HydrationGuard = ({ children }: { children: React.ReactNode }) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    //Todo: Show a loading spinner or Logo while hydrating
    return null;
  }

  return <>{children}</>;
};
