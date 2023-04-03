import React from "react";

type ButtonProps = {
  type?: "submit" | "button";
  children: React.ReactNode;
  onClick?: () => void;
};

const Button = ({ children, type = "submit", onClick }: ButtonProps) => {
  return (
    <button
      type={type}
      className="whs-full whs-font-sans whs-inline-flex whs-appearance-none whs-items-center whs-rounded whs-px-6 whs-py-3 whs-text-sm whs-font-medium whs-drop-shadow-sm whs-transition whs-focus:whs-ring-4 whs-bg-slate-900 whs-text-white hover:whs-bg-slate-800"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
