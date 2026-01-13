import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlacedProduct, Background, PlannerProduct } from '../../types';
import { PLANNER_PRODUCTS, DEFAULT_BACKGROUNDS, CANVAS_CONFIG } from '../../constants';
import PlannerCanvas from './PlannerCanvas';
import ProductDock from './ProductDock';
import BackgroundSelector from './BackgroundSelector';
import PlacedProductsList from './PlacedProductsList';
import PlannerActions from './PlannerActions';

export default function RoomPlanner() {
  const [background, setBackground] = useState<Background | null>(null);
  const [placedProducts, setPlacedProducts] = useState<PlacedProduct[]>([]);
  const [selectedInstance, setSelectedInstance] = useState<string | null>(null);
  const [showBackgroundSelector, setShowBackgroundSelector] = useState(false);
  const [showPlacedList, setShowPlacedList] = useState(false);

  const addProductToCanvas = useCallback((productId: string, x?: number, y?: number) => {
    const product = PLANNER_PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const newPlacedProduct: PlacedProduct = {
      instanceId: `${productId}-${Date.now()}`,
      productId,
      x: x ?? (CANVAS_CONFIG.width / 2 - product.width / 2),
      y: y ?? (CANVAS_CONFIG.height / 2 - product.height / 2),
      scale: 1,
      zIndex: placedProducts.length + 1
    };

    setPlacedProducts(prev => [...prev, newPlacedProduct]);
  }, [placedProducts.length]);

  const updateProductPosition = useCallback((instanceId: string, x: number, y: number) => {
    setPlacedProducts(prev =>
      prev.map(p => p.instanceId === instanceId ? { ...p, x, y } : p)
    );
  }, []);

  const updateProductScale = useCallback((instanceId: string, delta: number) => {
    setPlacedProducts(prev =>
      prev.map(p => {
        if (p.instanceId !== instanceId) return p;
        const newScale = Math.max(
          CANVAS_CONFIG.minScale,
          Math.min(CANVAS_CONFIG.maxScale, p.scale + delta)
        );
        return { ...p, scale: newScale };
      })
    );
  }, []);

  const bringToFront = useCallback((instanceId: string) => {
    setPlacedProducts(prev => {
      const maxZ = Math.max(...prev.map(p => p.zIndex));
      return prev.map(p =>
        p.instanceId === instanceId ? { ...p, zIndex: maxZ + 1 } : p
      );
    });
  }, []);

  const sendToBack = useCallback((instanceId: string) => {
    setPlacedProducts(prev => {
      const minZ = Math.min(...prev.map(p => p.zIndex));
      return prev.map(p =>
        p.instanceId === instanceId ? { ...p, zIndex: minZ - 1 } : p
      );
    });
  }, []);

  const removeProduct = useCallback((instanceId: string) => {
    setPlacedProducts(prev => prev.filter(p => p.instanceId !== instanceId));
    if (selectedInstance === instanceId) {
      setSelectedInstance(null);
    }
  }, [selectedInstance]);

  const clearAllProducts = useCallback(() => {
    setPlacedProducts([]);
    setSelectedInstance(null);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const productId = e.dataTransfer.getData('productId');
    if (!productId) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const product = PLANNER_PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const x = e.clientX - rect.left - (product.width / 2);
    const y = e.clientY - rect.top - (product.height / 2);

    addProductToCanvas(productId, Math.max(0, x), Math.max(0, y));
  }, [addProductToCanvas]);

  const getQuoteData = useCallback(() => {
    const productCounts = placedProducts.reduce((acc, placed) => {
      acc[placed.productId] = (acc[placed.productId] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const items = Object.entries(productCounts).map(([productId, count]) => {
      const product = PLANNER_PRODUCTS.find(p => p.id === productId);
      return {
        productId,
        name: product?.nameKo || '',
        quantity: count,
        unitPrice: product?.price || 0,
        totalPrice: (product?.price || 0) * count
      };
    });

    return {
      items,
      grandTotal: items.reduce((sum, item) => sum + item.totalPrice, 0)
    };
  }, [placedProducts]);

  return (
    <div className="min-h-screen bg-cream-100 py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-charcoal-600 mb-4">
            나만의 스마트홈 배치해보기
          </h1>
          <p className="text-charcoal-600/70 text-lg max-w-2xl mx-auto">
            제품을 드래그하여 원하는 위치에 배치하고, 나만의 스마트홈을 디자인해보세요
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-[1fr,300px] gap-6">
          {/* Left Column - Canvas & Product Dock */}
          <div className="space-y-6">
            {/* Canvas Area */}
            <PlannerCanvas
              background={background}
              placedProducts={placedProducts}
              selectedInstance={selectedInstance}
              onSelectInstance={setSelectedInstance}
              onUpdatePosition={updateProductPosition}
              onUpdateScale={updateProductScale}
              onRemoveProduct={removeProduct}
              onBringToFront={bringToFront}
              onSendToBack={sendToBack}
              onDrop={handleDrop}
              onOpenBackgroundSelector={() => setShowBackgroundSelector(true)}
            />

            {/* Product Dock */}
            <ProductDock
              products={PLANNER_PRODUCTS}
              onAddProduct={addProductToCanvas}
            />
          </div>

          {/* Right Column - Placed Products & Actions */}
          <div className="space-y-6">
            {/* Mobile Toggle for Placed Products */}
            <button
              onClick={() => setShowPlacedList(!showPlacedList)}
              className="lg:hidden w-full py-3 px-4 bg-white rounded-xl shadow-soft flex items-center justify-between"
            >
              <span className="font-medium text-charcoal-600">
                배치된 제품 ({placedProducts.length}개)
              </span>
              <svg
                className={`w-5 h-5 text-charcoal-600 transition-transform ${showPlacedList ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Placed Products List */}
            <div className={`${showPlacedList ? 'block' : 'hidden'} lg:block`}>
              <PlacedProductsList
                placedProducts={placedProducts}
                products={PLANNER_PRODUCTS}
                onRemoveProduct={removeProduct}
                onClearAll={clearAllProducts}
              />
            </div>

            {/* Actions */}
            <PlannerActions
              placedProducts={placedProducts}
              products={PLANNER_PRODUCTS}
              onClearAll={clearAllProducts}
              getQuoteData={getQuoteData}
            />
          </div>
        </div>
      </div>

      {/* Background Selector Modal */}
      <AnimatePresence>
        {showBackgroundSelector && (
          <BackgroundSelector
            backgrounds={DEFAULT_BACKGROUNDS}
            currentBackground={background}
            onSelectBackground={(bg) => {
              setBackground(bg);
              setShowBackgroundSelector(false);
            }}
            onClose={() => setShowBackgroundSelector(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
