import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

export function Button({ onClick, children, className = "", ...props }: ButtonProps) {
  return (
    <button onClick={onClick} className={`p-2 text-white rounded ${className}`} {...props}>
      {children}
    </button>
  );
}
