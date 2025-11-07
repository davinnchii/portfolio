'use client';

import { useEffect } from 'react';
import { FaCheckCircle, FaExclamationCircle, FaTimes } from 'react-icons/fa';

export type ToastType = 'success' | 'error';

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
  duration?: number;
}

export default function Toast({ message, type, onClose, duration = 4000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const isSuccess = type === 'success';
  const bgColor = isSuccess
    ? 'bg-green-500 dark:bg-green-600'
    : 'bg-red-500 dark:bg-red-600';
  const iconColor = isSuccess
    ? 'text-green-100'
    : 'text-red-100';

  return (
    <div
      className={`
        fixed top-6 right-4 sm:right-6 z-50
        flex items-center gap-3
        ${bgColor} text-white
        px-4 sm:px-5 py-3 sm:py-4 rounded-lg shadow-2xl
        w-[calc(100%-2rem)] sm:min-w-[300px] sm:max-w-md
        animate-slide-in-right
        backdrop-blur-sm
        border border-white/20
      `}
      role="alert"
    >
      <div className={`flex-shrink-0 ${iconColor}`}>
        {isSuccess ? (
          <FaCheckCircle className="w-5 h-5" />
        ) : (
          <FaExclamationCircle className="w-5 h-5" />
        )}
      </div>
      <p className="flex-1 text-sm font-medium">{message}</p>
      <button
        onClick={onClose}
        className="flex-shrink-0 hover:opacity-70 transition-opacity duration-200"
        aria-label="Close notification"
      >
        <FaTimes className="w-4 h-4" />
      </button>
    </div>
  );
}

