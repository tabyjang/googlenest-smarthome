import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import EstimatorForm from './EstimatorForm';
import { QuoteFormData, QuoteOptions } from '../../types';
import { ESTIMATOR_PRICING } from '../../constants';

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

      if (response.ok) {
        setSubmitSuccess(true);
        setShowForm(false);
      } else {
        throw new Error('Failed to send quote');
      }
    } catch (error) {
      console.error('Error sending quote:', error);
      alert('견적서 발송에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          나만의 스마트홈 견적
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-xl text-gray-600"
        >
          원하는 옵션을 선택하고 맞춤 견적을 받아보세요
        </motion.p>
      </div>

      <AnimatePresence mode="wait">
        {submitSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-green-50 border border-green-200 rounded-3xl p-12 text-center"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-green-800 mb-4">견적서가 발송되었습니다!</h3>
            <p className="text-green-700 mb-6">
              입력하신 이메일로 견적서를 보내드렸습니다.<br />
              빠른 시일 내에 전문 상담사가 연락드리겠습니다.
            </p>
            <button
              onClick={() => setSubmitSuccess(false)}
              className="px-8 py-3 bg-green-600 text-white rounded-full font-bold hover:bg-green-700 transition-colors"
            >
              새 견적 받기
            </button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-gray-100"
          >
            <div className="p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Left: Options */}
                <div className="space-y-8">
                  {/* Room Count */}
                  <div>
                    <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">
                      방 개수
                    </label>
                    <div className="flex items-center gap-6">
                      <button
                        onClick={() => setRooms(Math.max(1, rooms - 1))}
                        className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors text-xl"
                      >
                        −
                      </button>
                      <span className="text-3xl font-bold w-12 text-center">{rooms}</span>
                      <button
                        onClick={() => setRooms(Math.min(10, rooms + 1))}
                        className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors text-xl"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Options */}
                  <div>
                    <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">
                      원하는 기능
                    </label>
                    <div className="space-y-4">
                      {Object.entries(optionPrices).map(([key, value]) => (
                        <label
                          key={key}
                          className="flex items-center justify-between p-4 rounded-2xl border border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
                        >
                          <div>
                            <span className="font-medium text-gray-700">{value.name}</span>
                            <span className="text-sm text-gray-400 ml-2">
                              +₩{value.price.toLocaleString()}
                            </span>
                          </div>
                          <input
                            type="checkbox"
                            checked={options[key as keyof QuoteOptions]}
                            onChange={() => setOptions(prev => ({ ...prev, [key]: !prev[key as keyof QuoteOptions] }))}
                            className="w-6 h-6 rounded-lg text-blue-600 focus:ring-blue-500 border-gray-300"
                          />
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: Summary */}
                <div className="bg-gray-50 rounded-[2rem] p-8 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold mb-6 text-gray-400">예상 견적</h3>
                    <ul className="space-y-4">
                      {breakdown.map((item, idx) => (
                        <li key={idx} className="flex justify-between text-sm">
                          <span className="text-gray-600">{item.item}</span>
                          <span className="font-medium">₩{item.price.toLocaleString()}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-8 border-t border-gray-200 mt-8">
                    <div className="flex justify-between items-end mb-6">
                      <span className="text-sm font-bold text-gray-400 uppercase">총 예상 금액</span>
                      <span className="text-4xl font-bold text-gray-900">
                        ₩{totalPrice.toLocaleString()}
                      </span>
                    </div>
                    <button
                      onClick={() => setShowForm(true)}
                      className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-100"
                    >
                      견적서 받기
                    </button>
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
