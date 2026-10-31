import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glow?: "none" | "safe" | "danger" | "cyan";
}

export const Card: React.FC<CardProps> = ({
  children,
  glow = "none",
  className = "",
  ...props
}) => {
  const glowClasses = {
    none: "border-slate-800 bg-slate-900/70",
    safe: "border-emerald-500/40 bg-slate-900/80 shadow-lg shadow-emerald-500/10",
    danger: "border-red-500/50 bg-slate-900/80 shadow-lg shadow-red-500/15",
    cyan: "border-cyan-500/30 bg-slate-900/80 shadow-lg shadow-cyan-500/10",
  };

  return (
    <div
      className={`rounded-2xl border backdrop-blur-md p-5 sm:p-6 transition-all duration-300 ${glowClasses[glow]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
