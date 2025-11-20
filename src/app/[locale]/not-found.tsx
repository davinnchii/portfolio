import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';

export default async function NotFound() {
  const t = await getTranslations('notFound');

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md w-full">
        <h1 className="h1 text-text-primary mb-4">404</h1>
        <p className="body-text text-text-secondary mb-8">{t('message')}</p>
        <Link
          href="/"
          className="inline-block relative group overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-hover opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative flex items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-accent-primary text-text-inverse font-semibold rounded-xl transition-all duration-300 shadow-lg hover:bg-accent-hover hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] body-text">
            {t('backToHome')}
          </div>
        </Link>
      </div>
    </div>
  );
}

