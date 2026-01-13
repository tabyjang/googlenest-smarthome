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
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-3xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold">견적서 받기</h3>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="bg-blue-50 rounded-2xl p-4 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-blue-600 font-medium">예상 견적 금액</span>
            <span className="text-2xl font-bold text-blue-700">₩{totalPrice.toLocaleString()}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              이름 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="홍길동"
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.name ? 'border-red-500' : 'border-gray-200'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              이메일 <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@email.com"
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.email ? 'border-red-500' : 'border-gray-200'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              연락처 <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="010-1234-5678"
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.phone ? 'border-red-500' : 'border-gray-200'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              주소 <span className="text-red-500">*</span>
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="설치 예정 주소를 입력해주세요"
              rows={3}
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.address ? 'border-red-500' : 'border-gray-200'
              } focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none`}
            />
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
          </div>

          <p className="text-sm text-gray-500">
            입력하신 정보로 견적서와 상담 안내를 보내드립니다.
          </p>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                발송 중...
              </>
            ) : (
              '견적서 이메일로 받기'
            )}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default EstimatorForm;
