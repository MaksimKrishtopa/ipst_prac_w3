interface ButtonProps {
    onClick: () => void;
    children: React.ReactNode;
    className?: string;
  }
  
  export function Button({ onClick, children, className }: ButtonProps) {
    return (
      <button onClick={onClick} className={`p-2 text-white rounded ${className}`}>
        {children}
      </button>
    );
  }