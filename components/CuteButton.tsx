import React from 'react';
import { ButtonVariant } from '../types';

interface CuteButtonProps {
  label: string | React.ReactNode;
  onClick: () => void;
  variant?: ButtonVariant;
  className?: string;
  disabled?: boolean;
}

const CuteButton: React.FC<CuteButtonProps> = ({ 
  label, 
  onClick, 
  variant = ButtonVariant.DEFAULT,
  className = '',
  disabled = false
}) => {
  
  const getVariantClasses = (v: ButtonVariant) => {
    switch (v) {
      case ButtonVariant.ACTION:
        // Clear, Del keys (Red/Pinkish)
        return 'bg-red-300 hover:bg-red-400 text-white shadow-[0px_4px_0px_0px_#f87171] active:shadow-none active:translate-y-[4px]';
      case ButtonVariant.OPERATOR:
        // Operators (Purple/Lavender)
        return 'bg-violet-300 hover:bg-violet-400 text-white shadow-[0px_4px_0px_0px_#a78bfa] active:shadow-none active:translate-y-[4px]';
      case ButtonVariant.EQUALS:
        // Equals (Green/Mint)
        return 'bg-emerald-300 hover:bg-emerald-400 text-white shadow-[0px_4px_0px_0px_#34d399] active:shadow-none active:translate-y-[4px]';
      case ButtonVariant.SPECIAL:
         // AI / Magic (Yellow/Gold)
         return 'bg-amber-300 hover:bg-amber-400 text-amber-900 shadow-[0px_4px_0px_0px_#fbbf24] active:shadow-none active:translate-y-[4px]';
      case ButtonVariant.DEFAULT:
      default:
        // Numbers (White/Cream)
        return 'bg-white hover:bg-pink-50 text-gray-600 shadow-[0px_4px_0px_0px_#e5e7eb] active:shadow-none active:translate-y-[4px]';
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        relative
        w-full
        aspect-square
        rounded-2xl
        font-fredoka
        text-2xl
        font-bold
        transition-all
        duration-100
        flex items-center justify-center
        disabled:opacity-50 disabled:cursor-not-allowed
        ${getVariantClasses(variant)}
        ${className}
      `}
      style={{ fontFamily: "'Fredoka', sans-serif" }}
    >
      {label}
    </button>
  );
};

export { CuteButton };