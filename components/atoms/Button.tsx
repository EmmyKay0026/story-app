import React from 'react'

interface ButtonProps {
  label : string;
  onClick: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ( { label, onClick, className } ) => {
  return (
    <button
      onClick={onClick}
      className={`bg-gradient-to-r from-[#085f33] via-[#3aa13e] to-[#45B649] shadow-lg cursor-pointer text-[#FFFFE0] rounded-[12px] ${className || ''}`}
    >
      {label}
    </button>
  )
}

export default Button
