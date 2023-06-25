import React, { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, disabled = false, children, type="button", ...props }, ref) => {
    return <button disabled={disabled}  className={twMerge("bg-green-500 p-3 border border-transparent rounded-full disabled:cursor-not-allowed disabled:opacity-50 text-black font-bold hover:opacity-70 transition", className)} type={type} ref={ref} {...props}>
        {children}
    </button>;
  }
);

Button.displayName = 'Button'
export default Button;
