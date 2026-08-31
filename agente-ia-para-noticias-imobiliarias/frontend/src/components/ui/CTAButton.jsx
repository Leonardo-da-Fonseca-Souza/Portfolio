import React from 'react';

export default function CTAButton({ children, onClick, type = "button", disabled = false, className = "" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-3 font-display text-sm font-semibold rounded-lg bg-[#00c896] text-[#07091a] hover:bg-[#00d492] hover:shadow-[0_0_15px_rgba(0,200,150,0.4)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 ${className}`}
    >
      {children}
    </button>
  );
}
