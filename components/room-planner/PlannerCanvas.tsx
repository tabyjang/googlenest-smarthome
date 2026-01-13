import { useRef } from 'react';
import { motion } from 'framer-motion';
import { PlacedProduct, Background, PlannerProduct } from '../../types';
import { PLANNER_PRODUCTS, CANVAS_CONFIG } from '../../constants';
import DraggableProduct from './DraggableProduct';

interface PlannerCanvasProps {
  background: Background | null;
  placedProducts: PlacedProduct[];
  selectedInstance: string | null;
  onSelectInstance: (instanceId: string | null) => void;
  onUpdatePosition: (instanceId: string, x: number, y: number) => void;
  onUpdateScale: (instanceId: string, delta: number) => void;
  onRemoveProduct: (instanceId: string) => void;
  onBringToFront: (instanceId: string) => void;
  onSendToBack: (instanceId: string) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onOpenBackgroundSelector: () => void;
}

export default function PlannerCanvas({
  background,
  placedProducts,
  selectedInstance,
  onSelectInstance,
  onUpdatePosition,
  onUpdateScale,
  onRemoveProduct,
  onBringToFront,
  onSendToBack,
  onDrop,
  onOpenBackgroundSelector
}: PlannerCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onSelectInstance(null);
    }
  };

  const sortedProducts = [...placedProducts].sort((a, b) => a.zIndex - b.zIndex);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="relative"
    >
      <div
        ref={canvasRef}
        id="planner-canvas"
        className="relative w-full aspect-[4/3] bg-white rounded-2xl shadow-luxury-lg overflow-hidden border-2 border-cream-300"
        style={{ maxHeight: '600px' }}
        onDragOver={handleDragOver}
        onDrop={onDrop}
        onClick={handleCanvasClick}
      >
        {/* Background Image or Placeholder */}
        {background ? (
          <img
            src={background.fullImage}
            alt={background.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-cream-200/50">
            <div className="border-2 border-dashed border-cream-400 rounded-2xl p-8 md:p-12 text-center">
              <svg
                className="w-16 h-16 mx-auto mb-4 text-cream-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="text-charcoal-600 font-medium mb-2">
                배경을 선택해주세요
              </p>
              <p className="text-charcoal-600/60 text-sm mb-4">
                기본 배경을 선택하거나<br className="sm:hidden" /> 내 방 사진을 업로드하세요
              </p>
              <button
                onClick={onOpenBackgroundSelector}
                className="px-6 py-2.5 bg-gradient-to-r from-gold-400 to-gold-500 text-white rounded-full font-medium hover:from-gold-500 hover:to-gold-600 transition-all shadow-md hover:shadow-lg"
              >
                배경 선택하기
              </button>
            </div>
          </div>
        )}

        {/* Placed Products */}
        {sortedProducts.map((placed) => {
          const productInfo = PLANNER_PRODUCTS.find(p => p.id === placed.productId);
          if (!productInfo) return null;

          return (
            <DraggableProduct
              key={placed.instanceId}
              placed={placed}
              productInfo={productInfo}
              isSelected={selectedInstance === placed.instanceId}
              onSelect={() => onSelectInstance(placed.instanceId)}
              onUpdatePosition={(x, y) => onUpdatePosition(placed.instanceId, x, y)}
              onUpdateScale={(delta) => onUpdateScale(placed.instanceId, delta)}
              onRemove={() => onRemoveProduct(placed.instanceId)}
              onBringToFront={() => onBringToFront(placed.instanceId)}
              onSendToBack={() => onSendToBack(placed.instanceId)}
              canvasRef={canvasRef}
            />
          );
        })}

        {/* Background Change Button (when background exists) */}
        {background && (
          <button
            onClick={onOpenBackgroundSelector}
            className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-md hover:bg-white transition-colors z-50"
            title="배경 변경"
          >
            <svg className="w-5 h-5 text-charcoal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </button>
        )}

        {/* Product Count Badge */}
        {placedProducts.length > 0 && (
          <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-charcoal-600/80 backdrop-blur-sm text-white text-sm rounded-full z-50">
            {placedProducts.length}개 제품 배치됨
          </div>
        )}
      </div>
    </motion.div>
  );
}
