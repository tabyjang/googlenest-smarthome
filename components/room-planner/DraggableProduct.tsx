import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import { PlacedProduct, PlannerProduct } from '../../types';
import { CANVAS_CONFIG } from '../../constants';

interface DraggableProductProps {
  placed: PlacedProduct;
  productInfo: PlannerProduct;
  isSelected: boolean;
  onSelect: () => void;
  onUpdatePosition: (x: number, y: number) => void;
  onUpdateScale: (delta: number) => void;
  onRemove: () => void;
  onBringToFront: () => void;
  onSendToBack: () => void;
  canvasRef: React.RefObject<HTMLDivElement>;
}

export default function DraggableProduct({
  placed,
  productInfo,
  isSelected,
  onSelect,
  onUpdatePosition,
  onUpdateScale,
  onRemove,
  onBringToFront,
  onSendToBack,
  canvasRef
}: DraggableProductProps) {
  const nodeRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const scaledWidth = productInfo.width * placed.scale;
  const scaledHeight = productInfo.height * placed.scale;

  const handleDragStart = () => {
    setIsDragging(true);
    onSelect();
  };

  const handleDragStop = (e: DraggableEvent, data: DraggableData) => {
    setIsDragging(false);
    onUpdatePosition(data.x, data.y);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect();
  };

  return (
    <Draggable
      nodeRef={nodeRef}
      position={{ x: placed.x, y: placed.y }}
      onStart={handleDragStart}
      onStop={handleDragStop}
      bounds="parent"
      cancel=".control-btn"
    >
      <div
        ref={nodeRef}
        className={`absolute cursor-grab ${isDragging ? 'cursor-grabbing' : ''}`}
        style={{
          width: scaledWidth,
          height: scaledHeight,
          zIndex: placed.zIndex
        }}
        onClick={handleClick}
      >
        {/* Product Image */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: isDragging ? 0.8 : 1 }}
          exit={{ scale: 0, opacity: 0 }}
          className={`relative w-full h-full transition-all duration-200 ${
            isSelected ? 'ring-2 ring-gold-400 ring-offset-2 rounded-lg' : ''
          }`}
        >
          <img
            src={productInfo.image}
            alt={productInfo.nameKo}
            className="w-full h-full object-contain drop-shadow-lg pointer-events-none"
            draggable={false}
          />

          {/* Product Name Tooltip (on hover) */}
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <span className="px-2 py-1 bg-charcoal-600/90 text-white text-xs rounded whitespace-nowrap">
              {productInfo.nameKo}
            </span>
          </div>
        </motion.div>

        {/* Control Panel */}
        <AnimatePresence>
          {isSelected && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute -top-12 left-1/2 -translate-x-1/2 flex items-center gap-1 p-1.5 bg-white rounded-full shadow-lg z-50"
            >
              {/* Scale Down */}
              <button
                className="control-btn w-7 h-7 flex items-center justify-center rounded-full bg-cream-100 hover:bg-cream-200 text-charcoal-600 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  onUpdateScale(-CANVAS_CONFIG.scaleStep);
                }}
                title="크기 줄이기"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>

              {/* Scale Up */}
              <button
                className="control-btn w-7 h-7 flex items-center justify-center rounded-full bg-cream-100 hover:bg-cream-200 text-charcoal-600 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  onUpdateScale(CANVAS_CONFIG.scaleStep);
                }}
                title="크기 키우기"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>

              <div className="w-px h-5 bg-cream-300 mx-0.5" />

              {/* Bring to Front */}
              <button
                className="control-btn w-7 h-7 flex items-center justify-center rounded-full bg-cream-100 hover:bg-cream-200 text-charcoal-600 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  onBringToFront();
                }}
                title="맨 앞으로"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 11l7-7 7 7M5 19l7-7 7 7" />
                </svg>
              </button>

              {/* Send to Back */}
              <button
                className="control-btn w-7 h-7 flex items-center justify-center rounded-full bg-cream-100 hover:bg-cream-200 text-charcoal-600 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  onSendToBack();
                }}
                title="맨 뒤로"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
                </svg>
              </button>

              <div className="w-px h-5 bg-cream-300 mx-0.5" />

              {/* Delete */}
              <button
                className="control-btn w-7 h-7 flex items-center justify-center rounded-full bg-red-50 hover:bg-red-100 text-red-500 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove();
                }}
                title="삭제"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scale Indicator */}
        <AnimatePresence>
          {isSelected && placed.scale !== 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-charcoal-600/80 text-white text-xs rounded-full"
            >
              {Math.round(placed.scale * 100)}%
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Draggable>
  );
}
