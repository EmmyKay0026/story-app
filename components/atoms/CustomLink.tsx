import Link from "next/link";
import { ReactNode } from "react";

const CustomLink = ({
  href,
  children,
  className,
  passHref,
  onClick,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  passHref?: boolean;
  onClick?: () => void;
}) => {
  let refQuery = "";

  if (typeof window !== "undefined") {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");

    if (ref) {
      const separator = href.includes("?") ? "&" : "?";

      refQuery = `${separator}ref=${ref}`;
    }
  }

  return (
    <Link
      className={className}
      onClick={onClick}
      href={`${href}${refQuery}`}
      passHref={passHref}
    >
      {children}
    </Link>
  );
};

export default CustomLink;
