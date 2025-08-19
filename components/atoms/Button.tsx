import React from "react";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`cursor-pointer text-[#FFFFFF] srounded-[12px] bg-primary hover:text-shaft hover:bg-transparent dark:hover:text-white py-4 px-[15px] text-lg glow   rounded-3xl text-[18px] transition-[background-color] duration-500
         border border-primary
       ${className || ""}`}
    >
      {label}
    </button>
  );
};

export default Button;
