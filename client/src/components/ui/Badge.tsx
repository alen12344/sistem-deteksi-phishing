import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "safe" | "danger" | "warning" | "info" | "neutral";
  pulse?: boolean;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "neutral",
  pulse = false,
  className = "",
}) => {
  const variantStyles = {
    safe: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    danger: "bg-red-500/15 text-red-400 border-red-500/40",
    warning: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    info: "bg-cyan-500/15 text-cyan-400 border-cyan-500/30",
    neutral: "bg-slate-800 text-slate-300 border-slate-700",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border ${
        variantStyles[variant]
      } ${pulse && variant === "danger" ? "animate-pulse-danger" : ""} ${
        pulse && variant === "safe" ? "animate-pulse-safe" : ""
      } ${className}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          variant === "safe"
            ? "bg-emerald-400 shadow-[0_0_8px_#10B981]"
            : variant === "danger"
            ? "bg-red-400 shadow-[0_0_8px_#EF4444]"
            : variant === "warning"
            ? "bg-amber-400"
            : variant === "info"
            ? "bg-cyan-400"
            : "bg-slate-400"
        }`}
      />
      {children}
    </span>
  );
};
