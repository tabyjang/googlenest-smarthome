import React, { Suspense } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PRODUCTS } from '../constants';
import Canvas3D from '../components/three/Canvas3D';

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const product = PRODUCTS.find(p => p.id === productId);

  if (!product) {
    return (
      <div className="pt-24 min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-white">제품을 찾을 수 없습니다</h1>
          <Link to="/products" className="text-blue-400 hover:underline">
            제품 목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Link to="/" className="hover:text-blue-400">홈</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-blue-400">제품</Link>
          <span>/</span>
          <span className="text-gray-300">{product.name}</span>
        </div>
      </div>

      {/* Product Hero */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* 3D Model Viewer */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="aspect-square bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl overflow-hidden border border-gray-700/50"
          >
            <Suspense fallback={
              <div className="w-full h-full flex items-center justify-center">
                <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full" />
              </div>
            }>
              <Canvas3D productId={product.id} />
            </Suspense>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col justify-center"
          >
            <span className="text-blue-400 font-medium uppercase tracking-widest text-sm mb-4">
              {product.category === 'hub' ? '스마트 디스플레이' :
               product.category === 'audio' ? '스마트 스피커' :
               product.category === 'security' ? '보안 카메라' : '온도 조절'}
            </span>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">{product.name}</h1>

            <p className="text-xl text-gray-400 mb-8 leading-relaxed">
              {product.fullDescription}
            </p>

            <div className="text-3xl font-bold mb-8 text-white">
              ₩{product.price.toLocaleString()}
            </div>

            <div className="flex gap-4">
              <a
                href={product.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/30"
              >
                Google Store에서 보기
              </a>
              <Link
                to="/#estimator"
                className="px-8 py-4 border-2 border-gray-600 text-gray-300 rounded-full font-bold hover:border-blue-500 hover:text-blue-400 transition-all"
              >
                견적 문의
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-white">주요 기능</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {product.features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50"
              >
                <div className="w-12 h-12 bg-blue-600/20 rounded-full flex items-center justify-center mb-4">
                  <span className="text-blue-400 font-bold">{idx + 1}</span>
                </div>
                <p className="text-lg font-medium text-gray-200">{feature}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Specs */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-white">제품 사양</h2>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl overflow-hidden border border-gray-700/50">
            {Object.entries(product.specs).map(([key, value], idx) => (
              <div
                key={key}
                className={`flex justify-between p-6 ${idx !== 0 ? 'border-t border-gray-700/50' : ''}`}
              >
                <span className="font-medium text-gray-400">{key}</span>
                <span className="font-medium text-gray-200">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-br from-blue-600 to-blue-800 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">스마트홈 구축, 지금 시작하세요</h2>
          <p className="text-xl text-blue-100 mb-8">
            전문 상담을 통해 맞춤형 스마트홈 솔루션을 제안받으세요
          </p>
          <Link
            to="/#estimator"
            className="inline-block px-10 py-4 bg-white text-blue-600 rounded-full font-bold hover:shadow-xl transition-all"
          >
            무료 견적 받기
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ProductDetailPage;
