import React from 'react';

export default function Input({ label, id, type = "text", value, onChange, placeholder = "", required = false, className = "" }) {
  return (
    <div className={`flex flex-col space-y-2 ${className}`}>
      {label && (
        <label htmlFor={id} className="text-xs font-semibold text-[#6b7499] font-mono tracking-wider uppercase">
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-lg border border-[#131840] bg-[#07091a] px-4 py-3 text-sm text-white placeholder-[#6b7499] focus:border-[#00c896] focus:ring-1 focus:ring-[#00c896] focus:outline-none transition-all duration-200"
      />
    </div>
  );
}
