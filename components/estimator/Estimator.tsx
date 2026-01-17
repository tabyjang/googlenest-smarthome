import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import EstimatorForm from './EstimatorForm';
import { QuoteFormData, QuoteOptions } from '../../types';
import { ESTIMATOR_PRICING } from '../../constants';
import LoadingSpinner from '../LoadingSpinner';

const Estimator: React.FC = () => {
  const [rooms, setRooms] = useState(2);
  const [options, setOptions] = useState<QuoteOptions>({
    lighting: true,
    heating: false,
    voice: true,
    security: false
  });
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { basePrice, roomMultiplier, options: optionPrices } = ESTIMATOR_PRICING;

  const totalPrice = basePrice + (rooms * roomMultiplier) +
    (options.lighting ? optionPrices.lighting.price : 0) +
    (options.heating ? optionPrices.heating.price : 0) +
    (options.voice ? optionPrices.voice.price : 0) +
    (options.security ? optionPrices.security.price : 0);

  const breakdown = [
    { item: '기본 시스템 구축', price: basePrice },
    { item: `구역별 구성 (${rooms}개)`, price: rooms * roomMultiplier },
    ...(options.lighting ? [{ item: optionPrices.lighting.name, price: optionPrices.lighting.price }] : []),
    ...(options.heating ? [{ item: optionPrices.heating.name, price: optionPrices.heating.price }] : []),
    ...(options.voice ? [{ item: optionPrices.voice.name, price: optionPrices.voice.price }] : []),
    ...(options.security ? [{ item: optionPrices.security.name, price: optionPrices.security.price }] : []),
  ];

  const handleSubmit = async (formData: QuoteFormData) => {
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/send-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: formData,
          rooms,
          options,
          totalPrice,
          breakdown
        })
      });

      if (!response.ok) {
        throw new Error(`서버 오류: ${response.status}`);
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || '견적 전송에 실패했습니다');
      }

      setSubmitSuccess(true);
      setShowForm(false);
    } catch (e) {
      console.error('Quote submission error:', e);
      setError('견적 요청 전송 중 오류가 발생했습니다. 네트워크 연결을 확인하고 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const optionIcons: Record<string, React.ReactNode> = {
    lighting: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    heating: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
      </svg>
    ),
    voice: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
      </svg>
    ),
    security: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-16">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block text-xs tracking-[0.3em] uppercase text-gold-500 font-medium mb-4"
        >
          Personalized Quote
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-charcoal-700 mb-6"
        >
          맞춤 <span className="italic text-gold-gradient">견적</span> 받기
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-lg text-charcoal-400 font-light"
        >
          원하는 옵션을 선택하고 프리미엄 스마트홈의 견적을 확인하세요
        </motion.p>
      </div>

      <AnimatePresence mode="wait">
        {submitSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-cream-100 border border-gold-200 rounded-[2rem] p-12 text-center"
          >
            <div className="w-20 h-20 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <svg className="w-10 h-10 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-display text-charcoal-700 mb-4">견적서가 발송되었습니다</h3>
            <p className="text-charcoal-400 mb-8 font-light leading-relaxed">
              입력하신 이메일로 견적서를 보내드렸습니다.<br />
              전문 컨설턴트가 곧 연락드리겠습니다.
            </p>
            <button
              onClick={() => setSubmitSuccess(false)}
              className="px-8 py-3 bg-charcoal-700 text-cream-100 rounded-full font-medium hover:bg-charcoal-600 transition-colors shadow-luxury"
            >
              새 견적 받기
            </button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-[2.5rem] shadow-soft-lg overflow-hidden border border-cream-300"
          >
            <div className="p-8 md:p-12">
              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl"
                >
                  <div className="flex items-start justify-between">
                    <p className="text-red-600 text-sm flex-1">{error}</p>
                    <button
                      onClick={() => setError(null)}
                      className="ml-4 px-4 py-2 text-sm text-red-600 hover:text-red-700 font-medium border border-red-300 rounded-lg hover:bg-red-100 transition-colors"
                    >
                      다시 시도
                    </button>
                  </div>
                </motion.div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Left: Options */}
                <div className="space-y-10">
                  {/* Room Count */}
                  <div>
                    <label className="block text-xs tracking-[0.2em] uppercase text-gold-500 font-medium mb-6">
                      공간 개수
                    </label>
                    <div className="flex items-center gap-8">
                      <button
                        onClick={() => setRooms(Math.max(1, rooms - 1))}
                        className="w-14 h-14 rounded-full border border-cream-300 flex items-center justify-center hover:bg-cream-100 hover:border-gold-300 transition-all text-charcoal-500"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 12H4" />
                        </svg>
                      </button>
                      <div className="flex flex-col items-center">
                        <span className="text-5xl font-display font-light text-charcoal-700">{rooms}</span>
                        <span className="text-xs tracking-wider uppercase text-charcoal-300 mt-1">Rooms</span>
                      </div>
                      <button
                        onClick={() => setRooms(Math.min(10, rooms + 1))}
                        className="w-14 h-14 rounded-full border border-cream-300 flex items-center justify-center hover:bg-cream-100 hover:border-gold-300 transition-all text-charcoal-500"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Options */}
                  <div>
                    <label className="block text-xs tracking-[0.2em] uppercase text-gold-500 font-medium mb-6">
                      스마트 기능 선택
                    </label>
                    <div className="space-y-3">
                      {Object.entries(optionPrices).map(([key, value]) => (
                        <label
                          key={key}
                          className={`flex items-center justify-between p-5 rounded-2xl border cursor-pointer transition-all duration-300 ${
                            options[key as keyof QuoteOptions]
                              ? 'bg-cream-50 border-gold-300 shadow-luxury'
                              : 'bg-white border-cream-200 hover:border-cream-400'
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                              options[key as keyof QuoteOptions]
                                ? 'bg-gold-100 text-gold-600'
                                : 'bg-cream-100 text-charcoal-400'
                            }`}>
                              {optionIcons[key]}
                            </div>
                            <div>
                              <span className={`font-medium ${
                                options[key as keyof QuoteOptions] ? 'text-charcoal-700' : 'text-charcoal-500'
                              }`}>
                                {value.name}
                              </span>
                              <span className="block text-xs text-charcoal-300 mt-0.5">
                                +₩{value.price.toLocaleString()}
                              </span>
                            </div>
                          </div>
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                            options[key as keyof QuoteOptions]
                              ? 'border-gold-400 bg-gold-400'
                              : 'border-cream-300'
                          }`}>
                            {options[key as keyof QuoteOptions] && (
                              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                          <input
                            type="checkbox"
                            checked={options[key as keyof QuoteOptions]}
                            onChange={() => setOptions(prev => ({ ...prev, [key]: !prev[key as keyof QuoteOptions] }))}
                            className="sr-only"
                          />
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: Summary */}
                <div className="bg-gradient-to-br from-cream-100 to-cream-200/50 rounded-[2rem] p-8 flex flex-col justify-between border border-cream-300">
                  <div>
                    <div className="flex items-center gap-2 mb-8">
                      <div className="w-2 h-2 rounded-full bg-gold-400" />
                      <h3 className="text-xs tracking-[0.2em] uppercase text-charcoal-400 font-medium">예상 견적</h3>
                    </div>
                    <ul className="space-y-4">
                      {breakdown.map((item, idx) => (
                        <li key={idx} className="flex justify-between items-center">
                          <span className="text-charcoal-500 font-light">{item.item}</span>
                          <span className="font-medium text-charcoal-600">₩{item.price.toLocaleString()}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-8 border-t border-cream-400 mt-8">
                    <div className="flex justify-between items-end mb-8">
                      <div>
                        <span className="text-xs tracking-wider uppercase text-charcoal-300">Total Amount</span>
                        <span className="block text-xs text-charcoal-400 mt-1">VAT 별도</span>
                      </div>
                      <div className="text-right">
                        <span className="text-4xl font-display font-light text-charcoal-700">
                          ₩{totalPrice.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowForm(true)}
                      className="w-full py-4 bg-charcoal-700 text-cream-100 rounded-2xl font-medium hover:bg-charcoal-600 transition-all shadow-luxury-lg group relative overflow-hidden"
                    >
                      <span className="relative z-10">견적서 받기</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-gold-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </button>
                    <p className="text-center text-xs text-charcoal-300 mt-4">
                      상담 후 최종 금액이 확정됩니다
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Modal */}
            <AnimatePresence>
              {showForm && (
                <EstimatorForm
                  onSubmit={handleSubmit}
                  onClose={() => setShowForm(false)}
                  isSubmitting={isSubmitting}
                  totalPrice={totalPrice}
                />
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Estimator;
