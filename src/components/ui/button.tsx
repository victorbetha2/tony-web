import * as React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = {
    default: "bg-accent text-white hover:bg-accent-hover shadow-[0_0_15px_rgba(2,132,199,0.3)] hover:shadow-[0_0_20px_rgba(2,132,199,0.5)] border border-transparent",
    outline: "border border-muted text-foreground bg-transparent hover:bg-surface hover:text-white",
    ghost: "bg-transparent text-foreground hover:bg-surface hover:text-white",
};

const buttonSizes = {
    default: "px-4 py-2 text-sm",
    sm: "px-3 py-1 text-xs",
    lg: "px-6 py-3 text-base md:text-lg",
    icon: "h-10 w-10 justify-center",
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: keyof typeof buttonVariants;
    size?: keyof typeof buttonSizes;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "default", size = "default", ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center rounded-md font-medium transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background",
                    buttonVariants[variant],
                    buttonSizes[size],
                    className
                )}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button };
