// src/presentation/components/common/Button.tsx
// src/presentation/components/common/Button.tsx
import type {ButtonHTMLAttributes} from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
    fullWidth?: boolean;
}

export default function Button({
                                   variant = "primary",
                                   size = "md",
                                   fullWidth = false,
                                   className = "",
                                   children,
                                   ...props
                               }: ButtonProps) {
    const baseStyles = "font-medium rounded-lg transition duration-150 focus:outline-none focus:ring-2";

    const variantStyles = {
        primary: "bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-500",
        secondary: "bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500",
        outline: "border border-gray-300 text-gray-600 hover:bg-gray-50 focus:ring-indigo-500",
        ghost: "text-gray-500 hover:text-indigo-600 hover:bg-indigo-50"
    };

    const sizeStyles = {
        sm: "px-3 py-1 text-sm",
        md: "px-4 py-2 text-sm",
        lg: "px-6 py-3 text-base"
    };

    const widthStyle = fullWidth ? "w-full" : "";

    return (
        <button
            className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}