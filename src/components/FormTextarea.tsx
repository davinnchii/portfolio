'use client';

interface FormTextareaProps {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onFocus: () => void;
  onBlur: () => void;
  placeholder: string;
  label: string;
  isActive: boolean;
  error?: string;
  rows?: number;
}

export default function FormTextarea({
  id,
  name,
  value,
  onChange,
  onFocus,
  onBlur,
  placeholder,
  label,
  isActive,
  error,
  rows = 5,
}: FormTextareaProps) {
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
          <textarea
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            rows={rows}
            className={`w-full px-4 py-3 sm:py-4 bg-zinc-50 dark:bg-zinc-900/50 border-2 rounded-xl text-zinc-900 dark:text-zinc-100 focus:outline-none focus:bg-white dark:focus:bg-zinc-900 transition-all duration-300 resize-none shadow-sm hover:shadow-md focus:placeholder:opacity-0 body-text ${
              error
                ? 'border-red-500 dark:border-red-400 focus:border-red-500 dark:focus:border-red-400'
                : 'border-zinc-200 dark:border-zinc-800 focus:border-indigo-500 dark:focus:border-indigo-400'
            }`}
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

