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
      <div className="absolute inset-0 bg-accent-medium rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative pt-6">
        <label
          htmlFor={id}
          className={`absolute left-0 pointer-events-none ${
            isActive
              ? '-top-1 body-sm text-accent-primary font-medium opacity-0 translate-y-2 animate-[fadeInUp_0.3s_ease-out_0.1s_forwards]'
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
            className={`w-full px-4 py-3 sm:py-4 bg-accent-light border-2 rounded-xl text-text-primary focus:outline-none focus:bg-accent-light transition-all duration-300 resize-none shadow-sm hover:shadow-md focus:placeholder:opacity-0 body-text ${
              error
                ? 'border-red-500 focus:border-red-500'
                : 'border-border-accent focus:border-accent-primary'
            }`}
            placeholder={placeholder}
          />
        </div>
        {error && (
          <p className="mt-2 body-sm text-red-500 animate-[fadeInUp_0.3s_ease-out]">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}

