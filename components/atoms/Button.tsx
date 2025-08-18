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
      className={`cursor-pointer text-[#FFFFFF] rounded-[12px] bg-primary hover:bg-primary py-4 px-10 text-lg glow ${className || ''}`}
    >
      {label}
    </button>
  )
}

export default Button
