import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input: React.FC<InputProps> = ({ className = "", ...props }) => {
  return (
    <input
      className={`p-2 border border-gray-300 rounded ${className}`}
      {...props}
    />
  );
};

export default Input;