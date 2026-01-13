import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toPng } from 'html-to-image';
import { PlacedProduct, PlannerProduct } from '../../types';
import { useNavigate } from 'react-router-dom';

interface QuoteItem {
  productId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

interface QuoteData {
  items: QuoteItem[];
  grandTotal: number;
}

interface PlannerActionsProps {
  placedProducts: PlacedProduct[];
  products: PlannerProduct[];
  onClearAll: () => void;
  getQuoteData: () => QuoteData;
}

export default function PlannerActions({
  placedProducts,
  products,
  onClearAll,
  getQuoteData
}: PlannerActionsProps) {
  const navigate = useNavigate();
  const [isExporting, setIsExporting] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [showQuoteModal, setShowQuoteModal] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR').format(price);
  };

  const handleSaveImage = useCallback(async () => {
    const canvas = document.getElementById('planner-canvas');
    if (!canvas) return;

    setIsExporting(true);
    try {
      const dataUrl = await toPng(canvas, {
        quality: 0.95,
        pixelRatio: 2
      });

      // Create download link
      const link = document.createElement('a');
      link.download = `my-smart-home-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Failed to export image:', error);
      alert('이미지 저장에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsExporting(false);
    }
  }, []);

  const handleClearAll = () => {
    onClearAll();
    setShowClearConfirm(false);
  };

  const handleRequestQuote = () => {
    if (placedProducts.length === 0) {
      alert('먼저 제품을 배치해주세요.');
      return;
    }
    setShowQuoteModal(true);
  };

  const quoteData = getQuoteData();

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-2xl shadow-soft-lg p-4"
      >
        <div className="space-y-3">
          {/* Save Image Button */}
          <button
            onClick={handleSaveImage}
            disabled={isExporting || placedProducts.length === 0}
            className="w-full py-3 px-4 bg-cream-100 hover:bg-cream-200 disabled:bg-cream-50 disabled:text-charcoal-600/40 text-charcoal-600 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors"
          >
            {isExporting ? (
              <>
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                저장 중...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                이미지로 저장
              </>
            )}
          </button>

          {/* Request Quote Button */}
          <button
            onClick={handleRequestQuote}
            disabled={placedProducts.length === 0}
            className="w-full py-3 px-4 bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-500 hover:to-gold-600 disabled:from-cream-200 disabled:to-cream-300 disabled:text-charcoal-600/40 text-white rounded-xl font-medium flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg disabled:shadow-none"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            견적 요청하기
          </button>

          {/* Clear Button */}
          <button
            onClick={() => setShowClearConfirm(true)}
            disabled={placedProducts.length === 0}
            className="w-full py-2 text-red-400 hover:text-red-500 disabled:text-charcoal-600/30 text-sm transition-colors"
          >
            모든 배치 초기화
          </button>
        </div>
      </motion.div>

      {/* Clear Confirm Modal */}
      <AnimatePresence>
        {showClearConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-charcoal-700/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
            onClick={() => setShowClearConfirm(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-medium text-charcoal-600 mb-2">
                모든 배치를 초기화할까요?
              </h3>
              <p className="text-sm text-charcoal-600/60 mb-6">
                배치된 모든 제품이 삭제됩니다. 이 작업은 되돌릴 수 없습니다.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowClearConfirm(false)}
                  className="flex-1 py-2.5 px-4 bg-cream-100 hover:bg-cream-200 text-charcoal-600 rounded-xl font-medium transition-colors"
                >
                  취소
                </button>
                <button
                  onClick={handleClearAll}
                  className="flex-1 py-2.5 px-4 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition-colors"
                >
                  초기화
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quote Modal */}
      <AnimatePresence>
        {showQuoteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-charcoal-700/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
            onClick={() => setShowQuoteModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="px-6 py-4 bg-cream-50 border-b border-cream-200">
                <h3 className="font-display text-xl text-charcoal-600">견적 요약</h3>
              </div>

              {/* Quote Items */}
              <div className="p-6 max-h-64 overflow-y-auto">
                {quoteData.items.map((item) => (
                  <div key={item.productId} className="flex items-center justify-between py-2 border-b border-cream-100 last:border-b-0">
                    <div>
                      <p className="text-sm font-medium text-charcoal-600">{item.name}</p>
                      <p className="text-xs text-charcoal-600/60">
                        ₩{formatPrice(item.unitPrice)} × {item.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-charcoal-600">
                      ₩{formatPrice(item.totalPrice)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="px-6 py-4 bg-cream-50 border-t border-cream-200">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-medium text-charcoal-600">총 예상 금액</span>
                  <span className="text-2xl font-bold text-gold-500">
                    ₩{formatPrice(quoteData.grandTotal)}
                  </span>
                </div>
                <p className="text-xs text-charcoal-600/50 mb-4">
                  * 설치비 및 기타 부가 서비스는 별도 상담을 통해 안내드립니다.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowQuoteModal(false)}
                    className="flex-1 py-3 px-4 bg-cream-200 hover:bg-cream-300 text-charcoal-600 rounded-xl font-medium transition-colors"
                  >
                    닫기
                  </button>
                  <button
                    onClick={() => {
                      setShowQuoteModal(false);
                      // Navigate to estimator with prefilled data
                      navigate('/#estimator');
                    }}
                    className="flex-1 py-3 px-4 bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-500 hover:to-gold-600 text-white rounded-xl font-medium transition-all shadow-md"
                  >
                    상담 신청
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
