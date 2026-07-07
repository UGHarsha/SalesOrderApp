import React from 'react';

const Input = ({ label, type = 'text', value, onChange, className = '', readOnly = false, min }) => {
    return (
        <div className={`grid grid-cols-[120px_1fr] items-center gap-2 ${className}`}>
            {label && <label className="text-gray-900 font-normal">{label}</label>}
            <input
                type={type}
                value={value}
                onChange={onChange}
                readOnly={readOnly}
                min={min}
                className={`w-full border border-primary p-1 bg-white outline-none focus:ring-1 focus:ring-primary ${readOnly ? 'bg-gray-50 text-gray-500 cursor-not-allowed' : ''}`}
            />
        </div>
    );
};

export default Input;
