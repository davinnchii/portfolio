'use client';

import { useState, FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { FaUser, FaEnvelope, FaPaperPlane, FaSpinner } from 'react-icons/fa';
import Toast, { type ToastType } from './Toast';
import FormInput from './FormInput';
import FormTextarea from './FormTextarea';

export default function ContactForm() {
  const t = useTranslations('contact');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const tValidation = (key: string) => t(`validation.${key}`);

  const validateName = (name: string): string | undefined => {
    if (!name.trim()) {
      return tValidation('nameRequired');
    }
    if (name.trim().length < 2) {
      return tValidation('nameMinLength');
    }
    return undefined;
  };

  const validateEmail = (email: string): string | undefined => {
    if (!email.trim()) {
      return tValidation('emailRequired');
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return tValidation('emailInvalid');
    }
    return undefined;
  };

  const validateMessage = (message: string): string | undefined => {
    if (!message.trim()) {
      return tValidation('messageRequired');
    }
    if (message.trim().length < 10) {
      return tValidation('messageMinLength');
    }
    return undefined;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleBlur = (fieldName: string) => {
    setFocusedField(null);
    
    let error: string | undefined;
    switch (fieldName) {
      case 'name':
        error = validateName(formData.name);
        break;
      case 'email':
        error = validateEmail(formData.email);
        break;
      case 'message':
        error = validateMessage(formData.message);
        break;
    }

    setErrors((prev) => ({
      ...prev,
      [fieldName]: error,
    }));
  };

  const hasErrors = () => {
    return Object.values(errors).some((error) => error !== undefined);
  };

  const isFormValid = () => {
    return (
      formData.name.trim().length >= 2 &&
      formData.email.trim() &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim()) &&
      formData.message.trim().length >= 10
    );
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate all fields on submit
    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.email);
    const messageError = validateMessage(formData.message);

    const newErrors = {
      name: nameError,
      email: emailError,
      message: messageError,
    };

    setErrors(newErrors);

    // Don't submit if there are errors
    if (nameError || emailError || messageError) {
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission (replace with actual API call)
    try {
      // TODO: Replace with actual API endpoint
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setToast({ message: t('success'), type: 'success' });
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
    } catch (error) {
      setToast({ message: t('error'), type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormInput
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          onFocus={() => setFocusedField('name')}
          onBlur={() => handleBlur('name')}
          placeholder={t('namePlaceholder')}
          label={t('name')}
          icon={FaUser}
          isActive={focusedField === 'name' || !!formData.name}
          error={errors.name}
        />

        <FormInput
          id="email"
          name="email"
          type="text"
          value={formData.email}
          onChange={handleChange}
          onFocus={() => setFocusedField('email')}
          onBlur={() => handleBlur('email')}
          placeholder={t('emailPlaceholder')}
          label={t('email')}
          icon={FaEnvelope}
          isActive={focusedField === 'email' || !!formData.email}
          error={errors.email}
        />

        <FormTextarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          onFocus={() => setFocusedField('message')}
          onBlur={() => handleBlur('message')}
          placeholder={t('messagePlaceholder')}
          label={t('message')}
          isActive={focusedField === 'message' || !!formData.message}
          error={errors.message}
          rows={5}
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || hasErrors() || !isFormValid()}
          className="relative w-full group overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed disabled:grayscale"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 disabled:group-hover:opacity-0"></div>
          <div className="relative flex items-center justify-center gap-3 px-8 py-4 bg-indigo-500 dark:bg-indigo-400 text-white dark:text-[#0a0a0a] font-semibold rounded-xl transition-all duration-300 shadow-lg hover:bg-indigo-600 dark:hover:bg-indigo-300 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] disabled:hover:bg-indigo-500 disabled:dark:hover:bg-indigo-400 disabled:hover:shadow-lg disabled:hover:scale-100 disabled:active:scale-100">
            {isSubmitting ? (
              <>
                <FaSpinner className="w-5 h-5 animate-spin" />
                <span>{t('sending')}</span>
              </>
            ) : (
              <>
                <FaPaperPlane className="w-5 h-5" />
                <span>{t('send')}</span>
              </>
            )}
          </div>
        </button>
      </form>

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
}

