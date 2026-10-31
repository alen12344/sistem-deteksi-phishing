import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  icon,
  className = "",
  id,
  ...props
}) => {
  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {icon && (
          <div className="absolute left-3.5 text-slate-400 pointer-events-none flex items-center">
            {icon}
          </div>
        )}
        <input
          id={id}
          className={`w-full bg-slate-900/90 border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all text-sm ${
            icon ? "pl-11" : "pl-4"
          } pr-4 py-3 ${error ? "border-red-500 focus:border-red-500 focus:ring-red-500/30" : ""} ${className}`}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-red-400 mt-0.5">{error}</p>}
    </div>
  );
};
