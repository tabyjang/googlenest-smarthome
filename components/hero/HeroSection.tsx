import React, { Suspense } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Float, Text3D, Center } from '@react-three/drei';

interface HeroSectionProps {
  scrollY: number;
}

const HeroBackground: React.FC = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />

      {/* Floating geometric shapes */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh position={[-3, 2, -2]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#4285F4" />
        </mesh>
      </Float>

      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
        <mesh position={[3, -1, -3]}>
          <sphereGeometry args={[0.8, 32, 32]} />
          <meshStandardMaterial color="#EA4335" />
        </mesh>
      </Float>

      <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.6}>
        <mesh position={[0, 1, -4]}>
          <torusGeometry args={[0.6, 0.2, 16, 32]} />
          <meshStandardMaterial color="#FBBC05" />
        </mesh>
      </Float>

      <Float speed={2.2} rotationIntensity={0.6} floatIntensity={1.2}>
        <mesh position={[-2, -2, -2]}>
          <octahedronGeometry args={[0.7]} />
          <meshStandardMaterial color="#34A853" />
        </mesh>
      </Float>

      <Environment preset="city" />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
    </>
  );
};

const HeroSection: React.FC<HeroSectionProps> = ({ scrollY }) => {
  const opacity = Math.max(0, 1 - scrollY / 400);
  const scale = Math.max(0.9, 1 - scrollY / 2000);
  const translateY = scrollY * 0.3;

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* 3D Background */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
          <Suspense fallback={null}>
            <HeroBackground />
          </Suspense>
        </Canvas>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/70" />

      {/* Content */}
      <motion.div
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
        style={{
          opacity,
          transform: `scale(${scale}) translateY(${translateY}px)`
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-blue-400 font-medium uppercase tracking-widest mb-6"
        >
          Google Nest Experience
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight"
        >
          스마트홈의<br />새로운 기준
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-xl md:text-2xl text-gray-300 max-w-2xl mb-12"
        >
          "오케이 구글" 한마디로 시작되는 편리한 일상.<br />
          조명, 온도, 보안까지 모든 것을 음성으로 제어하세요.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link
            to="/products"
            className="px-10 py-4 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/30"
          >
            제품 살펴보기
          </Link>
          <a
            href="#demo"
            className="px-10 py-4 border-2 border-white/30 text-white rounded-full font-bold hover:bg-white/10 transition-all"
          >
            체험해보기
          </a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
          >
            <div className="w-1.5 h-3 bg-white/50 rounded-full" />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
