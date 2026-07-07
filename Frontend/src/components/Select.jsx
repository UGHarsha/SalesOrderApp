import React from 'react';

const Select = ({ label, value, onChange, options, className = '', placeholder = '-- Select --' }) => {
    return (
        <div className={`grid grid-cols-[120px_1fr] items-center gap-2 ${className}`}>
            {label && <label className="text-gray-900 font-normal">{label}</label>}
            <select
                value={value}
                onChange={onChange}
                className="w-full border border-primary p-1 bg-white outline-none focus:ring-1 focus:ring-primary"
            >
                <option value="">{placeholder}</option>
                {options.map((opt, index) => (
                    <option key={index} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Select;
