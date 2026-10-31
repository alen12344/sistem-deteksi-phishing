import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "danger" | "outline" | "ghost" | "cyber";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  className = "",
  disabled,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer";

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-7 py-3.5 text-base font-semibold",
  };

  const variantStyles = {
    primary: "bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold shadow-lg shadow-emerald-500/20 active:scale-[0.98]",
    cyber: "bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:opacity-95 text-slate-950 font-bold shadow-lg shadow-cyan-500/25 active:scale-[0.98]",
    danger: "bg-red-500 hover:bg-red-400 text-white font-semibold shadow-lg shadow-red-500/20 active:scale-[0.98]",
    outline: "border border-slate-700 hover:border-emerald-500/60 bg-slate-900/60 hover:bg-slate-800 text-slate-200",
    ghost: "bg-transparent hover:bg-slate-800/80 text-slate-300 hover:text-white",
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
          </svg>
          <span>Memindai...</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
};
