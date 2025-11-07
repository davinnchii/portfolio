'use client';

import { IconType } from 'react-icons';

interface FormInputProps {
  id: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  onBlur: () => void;
  placeholder: string;
  label: string;
  icon?: IconType;
  isActive: boolean;
  error?: string;
}

export default function FormInput({
  id,
  name,
  type = 'text',
  value,
  onChange,
  onFocus,
  onBlur,
  placeholder,
  label,
  icon: Icon,
  isActive,
  error,
}: FormInputProps) {
  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative pt-6">
        <label
          htmlFor={id}
          className={`absolute left-0 pointer-events-none ${
            isActive
              ? '-top-1 body-sm text-indigo-500 dark:text-indigo-400 font-medium opacity-0 translate-y-2 animate-[fadeInUp_0.3s_ease-out_0.1s_forwards]'
              : 'sr-only'
          }`}
        >
          {label}
        </label>
        <div className="relative">
          {Icon && (
            <Icon
              className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none z-10 transition-colors duration-300 ${
                error
                  ? 'text-red-500 dark:text-red-400'
                  : isActive
                  ? 'text-indigo-500 dark:text-indigo-400'
                  : 'text-zinc-400 dark:text-zinc-500'
              }`}
            />
          )}
          <input
            type={type}
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            className={`w-full pr-4 py-3 sm:py-4 bg-zinc-50 dark:bg-zinc-900/50 border-2 rounded-xl text-zinc-900 dark:text-zinc-100 focus:outline-none focus:bg-white dark:focus:bg-zinc-900 transition-all duration-300 shadow-sm hover:shadow-md focus:placeholder:opacity-0 body-text ${
              error
                ? 'border-red-500 dark:border-red-400 focus:border-red-500 dark:focus:border-red-400'
                : 'border-zinc-200 dark:border-zinc-800 focus:border-indigo-500 dark:focus:border-indigo-400'
            } ${Icon ? 'pl-10 sm:pl-12' : 'pl-4'}`}
            placeholder={placeholder}
          />
        </div>
        {error && (
          <p className="mt-2 body-sm text-red-500 dark:text-red-400 animate-[fadeInUp_0.3s_ease-out]">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}

