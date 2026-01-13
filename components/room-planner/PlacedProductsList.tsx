import { motion, AnimatePresence } from 'framer-motion';
import { PlacedProduct, PlannerProduct } from '../../types';

interface PlacedProductsListProps {
  placedProducts: PlacedProduct[];
  products: PlannerProduct[];
  onRemoveProduct: (instanceId: string) => void;
  onClearAll: () => void;
}

export default function PlacedProductsList({
  placedProducts,
  products,
  onRemoveProduct,
  onClearAll
}: PlacedProductsListProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR').format(price);
  };

  // Group placed products by product ID
  const groupedProducts = placedProducts.reduce((acc, placed) => {
    if (!acc[placed.productId]) {
      acc[placed.productId] = [];
    }
    acc[placed.productId].push(placed);
    return acc;
  }, {} as Record<string, PlacedProduct[]>);

  // Calculate totals
  const productSummary = Object.entries(groupedProducts).map(([productId, instances]) => {
    const productInfo = products.find(p => p.id === productId);
    return {
      productId,
      productInfo,
      count: instances.length,
      totalPrice: (productInfo?.price || 0) * instances.length,
      instances
    };
  });

  const grandTotal = productSummary.reduce((sum, item) => sum + item.totalPrice, 0);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white rounded-2xl shadow-soft-lg overflow-hidden"
    >
      {/* Header */}
      <div className="px-4 py-3 bg-cream-50 border-b border-cream-200 flex items-center justify-between">
        <h3 className="font-medium text-charcoal-600">
          배치된 제품
        </h3>
        {placedProducts.length > 0 && (
          <button
            onClick={onClearAll}
            className="text-xs text-red-500 hover:text-red-600 transition-colors"
          >
            모두 삭제
          </button>
        )}
      </div>

      {/* Product List */}
      <div className="max-h-64 overflow-y-auto">
        <AnimatePresence mode="popLayout">
          {placedProducts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-6 text-center"
            >
              <svg
                className="w-12 h-12 mx-auto text-cream-300 mb-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
              <p className="text-charcoal-600/50 text-sm">
                아직 배치된 제품이 없습니다
              </p>
              <p className="text-charcoal-600/40 text-xs mt-1">
                하단에서 제품을 선택하여 배치해보세요
              </p>
            </motion.div>
          ) : (
            productSummary.map(({ productId, productInfo, count, totalPrice, instances }) => (
              <motion.div
                key={productId}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="px-4 py-3 border-b border-cream-100 last:border-b-0"
              >
                <div className="flex items-center gap-3">
                  {/* Product Image */}
                  <div className="w-12 h-12 flex-shrink-0 bg-cream-50 rounded-lg p-1.5">
                    <img
                      src={productInfo?.image}
                      alt={productInfo?.nameKo}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-charcoal-600 truncate">
                      {productInfo?.nameKo}
                    </p>
                    <p className="text-xs text-charcoal-600/60">
                      ₩{formatPrice(productInfo?.price || 0)} × {count}개
                    </p>
                  </div>

                  {/* Total & Actions */}
                  <div className="text-right">
                    <p className="text-sm font-medium text-gold-500">
                      ₩{formatPrice(totalPrice)}
                    </p>
                    {count === 1 ? (
                      <button
                        onClick={() => onRemoveProduct(instances[0].instanceId)}
                        className="text-xs text-red-400 hover:text-red-500 transition-colors"
                      >
                        삭제
                      </button>
                    ) : (
                      <div className="flex items-center gap-1 mt-0.5">
                        {instances.map((instance, idx) => (
                          <button
                            key={instance.instanceId}
                            onClick={() => onRemoveProduct(instance.instanceId)}
                            className="w-4 h-4 text-[10px] bg-cream-100 hover:bg-red-100 text-charcoal-600 hover:text-red-500 rounded transition-colors"
                            title={`${idx + 1}번째 삭제`}
                          >
                            ×
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Total */}
      {placedProducts.length > 0 && (
        <div className="px-4 py-3 bg-cream-50 border-t border-cream-200">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-charcoal-600">
              총 {placedProducts.length}개 제품
            </span>
            <span className="text-lg font-bold text-gold-500">
              ₩{formatPrice(grandTotal)}
            </span>
          </div>
        </div>
      )}
    </motion.div>
  );
}
