import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { QuoteFormData } from '../../types';

interface EstimatorFormProps {
  onSubmit: (data: QuoteFormData) => void;
  onClose: () => void;
  isSubmitting: boolean;
  totalPrice: number;
}

const EstimatorForm: React.FC<EstimatorFormProps> = ({
  onSubmit,
  onClose,
  isSubmitting,
  totalPrice
}) => {
  const [formData, setFormData] = useState<QuoteFormData>({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [errors, setErrors] = useState<Partial<QuoteFormData>>({});

  const validate = (): boolean => {
    const newErrors: Partial<QuoteFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = '이름을 입력해주세요';
    }

    if (!formData.email.trim()) {
      newErrors.email = '이메일을 입력해주세요';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '올바른 이메일 형식을 입력해주세요';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = '연락처를 입력해주세요';
    } else if (!/^[0-9-]+$/.test(formData.phone)) {
      newErrors.phone = '올바른 연락처를 입력해주세요';
    }

    if (!formData.address.trim()) {
      newErrors.address = '주소를 입력해주세요';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof QuoteFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-charcoal-700/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="bg-cream-100 rounded-[2rem] p-8 md:p-10 max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-luxury-lg border border-cream-300"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <span className="text-xs tracking-[0.2em] uppercase text-gold-500 font-medium">Request Quote</span>
            <h3 className="text-2xl font-display font-light text-charcoal-700 mt-1">견적서 요청</h3>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-cream-200 hover:bg-cream-300 flex items-center justify-center transition-colors"
          >
            <svg className="w-5 h-5 text-charcoal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Price Summary */}
        <div className="bg-gradient-to-br from-cream-200 to-gold-50/50 rounded-2xl p-5 mb-8 border border-gold-200/50">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-xs tracking-wider uppercase text-charcoal-400">예상 견적</span>
              <span className="block text-xs text-charcoal-300 mt-0.5">VAT 별도</span>
            </div>
            <span className="text-3xl font-display font-light text-charcoal-700">₩{totalPrice.toLocaleString()}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-xs tracking-wider uppercase text-charcoal-400 mb-2">
              이름 <span className="text-gold-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="홍길동"
              className={`w-full px-5 py-4 rounded-xl bg-white border ${
                errors.name ? 'border-red-300' : 'border-cream-300'
              } focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-200 transition-all text-charcoal-600 placeholder:text-charcoal-300`}
            />
            {errors.name && <p className="text-red-400 text-xs mt-2">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs tracking-wider uppercase text-charcoal-400 mb-2">
              이메일 <span className="text-gold-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@email.com"
              className={`w-full px-5 py-4 rounded-xl bg-white border ${
                errors.email ? 'border-red-300' : 'border-cream-300'
              } focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-200 transition-all text-charcoal-600 placeholder:text-charcoal-300`}
            />
            {errors.email && <p className="text-red-400 text-xs mt-2">{errors.email}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-xs tracking-wider uppercase text-charcoal-400 mb-2">
              연락처 <span className="text-gold-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="010-1234-5678"
              className={`w-full px-5 py-4 rounded-xl bg-white border ${
                errors.phone ? 'border-red-300' : 'border-cream-300'
              } focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-200 transition-all text-charcoal-600 placeholder:text-charcoal-300`}
            />
            {errors.phone && <p className="text-red-400 text-xs mt-2">{errors.phone}</p>}
          </div>

          {/* Address */}
          <div>
            <label className="block text-xs tracking-wider uppercase text-charcoal-400 mb-2">
              설치 예정 주소 <span className="text-gold-500">*</span>
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="설치 예정 주소를 입력해주세요"
              rows={3}
              className={`w-full px-5 py-4 rounded-xl bg-white border ${
                errors.address ? 'border-red-300' : 'border-cream-300'
              } focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-200 transition-all resize-none text-charcoal-600 placeholder:text-charcoal-300`}
            />
            {errors.address && <p className="text-red-400 text-xs mt-2">{errors.address}</p>}
          </div>

          <p className="text-xs text-charcoal-400 font-light leading-relaxed">
            입력하신 정보로 견적서와 상담 안내를 보내드립니다.
            개인정보는 견적 상담 목적으로만 사용됩니다.
          </p>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-charcoal-700 text-cream-100 rounded-xl font-medium hover:bg-charcoal-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-luxury group relative overflow-hidden"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>발송 중...</span>
              </>
            ) : (
              <>
                <span className="relative z-10">견적서 이메일로 받기</span>
                <svg className="w-4 h-4 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-r from-gold-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </>
            )}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default EstimatorForm;
