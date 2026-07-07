import React from 'react';

const Button = ({ children, onClick, variant = 'secondary', className = '', type = 'button' }) => {
    const baseStyles = "border border-primary px-4 py-1 font-medium text-xs transition-colors duration-200 flex items-center justify-center gap-1 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-primary";
    
    const variants = {
        primary: "bg-primary text-white hover:bg-primary-hover",
        secondary: "bg-secondary hover:bg-secondary-hover text-primary",
        danger: "border-danger text-danger hover:bg-danger hover:text-white",
        icon: "border-none hover:bg-gray-100 p-1 text-primary rounded-sm"
    };

    return (
        <button
            type={type}
            onClick={onClick}
            className={`${baseStyles} ${variants[variant]} ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;
