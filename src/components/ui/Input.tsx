import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`
          w-full px-4 py-3 border-2 rounded-xl shadow-sm transition-all duration-300
          focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500
          bg-white/80 backdrop-blur-sm dark:bg-gray-800 dark:border-gray-600 dark:text-white
          ${error 
            ? 'border-red-400 focus:ring-red-500/20 focus:border-red-500' 
            : 'border-gray-200 hover:border-gray-300 dark:border-gray-600'
          }
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{helperText}</p>
      )}
    </div>
  );
};