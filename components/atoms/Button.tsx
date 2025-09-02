import React, { ReactNode } from "react";
import Link from "next/link";

interface ButtonProps {
  label: ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  className,
  disabled,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`cursor-pointer text-[#FFFFFF] srounded-[12px] bg-primary hover:text-shaft hover:bg-transparent dark:hover:text-white py-4 px-[15px] text-lg hover:glow   rounded-3xl text-[18px] transition-[background-color] duration-500
         border border-primary
       ${className || ""}`}
    >
      {label}
    </button>
  );
};

export default Button;

export const ButtonNew = () => (
  <Link href="/library">
    <Button label="See more" className="py-[8px] px-[15px]" />
  </Link>
);
