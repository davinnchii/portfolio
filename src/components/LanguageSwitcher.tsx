'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { useState } from 'react';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en', label: 'EN' },
    { code: 'no', label: 'NO' },
  ];

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-3 py-1.5 body-sm font-medium text-text-secondary hover:text-text-primary bg-accent-light border border-border-accent rounded-md hover:border-accent-primary transition-colors duration-200"
        aria-label="Switch language"
      >
        {languages.find(lang => lang.code === locale)?.label || 'EN'}
      </button>
      
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10 cursor-pointer" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-20 bg-bg-card border border-border-primary rounded-md shadow-lg z-20">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => switchLocale(lang.code)}
                className={`w-full text-left px-3 py-2 body-sm transition-colors duration-200 ${
                  locale === lang.code
                    ? 'bg-accent-light text-accent-primary font-medium'
                    : 'text-text-secondary hover:bg-accent-light'
                } ${lang.code === 'en' ? 'rounded-t-md' : 'rounded-b-md'}`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

