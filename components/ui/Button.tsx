import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  className = '',
  ...props 
}) => {
  // Updated styles for Premium Black/Gold aesthetic
  const baseStyles = "inline-flex items-center justify-center rounded-full font-bold uppercase tracking-wide transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black";
  
  const variants = {
    // Solid Gold, Black Text
    primary: "bg-brand-gold hover:bg-white text-black hover:text-black focus:ring-brand-gold shadow-[0_0_15px_rgba(255,193,7,0.3)] hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]",
    // Dark Grey, White Text
    secondary: "bg-brand-charcoal hover:bg-brand-gold text-white hover:text-black border border-white/10 hover:border-brand-gold",
    // Transparent, White Border
    outline: "border-2 border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-black",
    // Red
    danger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-600"
  };

  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base"
  };

  const widthStyle = fullWidth ? "w-full" : "";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};