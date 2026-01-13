import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Float, MeshTransmissionMaterial } from '@react-three/drei';

interface HeroSectionProps {
  scrollY: number;
}

// Luxury 3D elements - soft, ethereal shapes
const LuxuryBackground: React.FC = () => {
  return (
    <>
      <ambientLight intensity={0.8} color="#FFF8F0" />
      <directionalLight position={[10, 10, 5]} intensity={0.6} color="#FFF5E6" />
      <pointLight position={[-5, 5, 5]} intensity={0.4} color="#C9A962" />

      {/* Floating glass spheres */}
      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.8}>
        <mesh position={[-3, 1.5, -2]}>
          <sphereGeometry args={[1, 64, 64]} />
          <MeshTransmissionMaterial
            backside
            samples={16}
            resolution={256}
            transmission={0.95}
            roughness={0.05}
            thickness={0.5}
            ior={1.5}
            chromaticAberration={0.02}
            color="#F5F3EF"
          />
        </mesh>
      </Float>

      <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.6}>
        <mesh position={[3.5, -0.5, -3]}>
          <sphereGeometry args={[0.7, 64, 64]} />
          <MeshTransmissionMaterial
            backside
            samples={16}
            resolution={256}
            transmission={0.9}
            roughness={0.1}
            thickness={0.3}
            ior={1.4}
            color="#E8DCC4"
          />
        </mesh>
      </Float>

      {/* Gold accent ring */}
      <Float speed={2} rotationIntensity={0.4} floatIntensity={0.5}>
        <mesh position={[0, 2, -4]} rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[1.2, 0.02, 32, 100]} />
          <meshStandardMaterial color="#C9A962" metalness={0.9} roughness={0.1} />
        </mesh>
      </Float>

      {/* Subtle gold accent sphere */}
      <Float speed={1.8} rotationIntensity={0.3} floatIntensity={0.7}>
        <mesh position={[-2, -1.5, -2.5]}>
          <sphereGeometry args={[0.4, 32, 32]} />
          <meshStandardMaterial color="#D4C5A0" metalness={0.7} roughness={0.2} />
        </mesh>
      </Float>

      {/* Small floating particles */}
      {[...Array(8)].map((_, i) => (
        <Float key={i} speed={1 + i * 0.2} rotationIntensity={0.1} floatIntensity={0.4 + i * 0.1}>
          <mesh position={[
            (Math.random() - 0.5) * 8,
            (Math.random() - 0.5) * 4,
            -2 - Math.random() * 3
          ]}>
            <sphereGeometry args={[0.05 + Math.random() * 0.08, 16, 16]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? "#C9A962" : "#E8DCC4"}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
        </Float>
      ))}

      <Environment preset="apartment" />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.3} />
    </>
  );
};

const HeroSection: React.FC<HeroSectionProps> = ({ scrollY }) => {
  const opacity = Math.max(0, 1 - scrollY / 500);
  const scale = Math.max(0.95, 1 - scrollY / 3000);
  const translateY = scrollY * 0.2;

  return (
    <div className="relative w-full h-full bg-gradient-to-b from-cream-100 via-cream-200 to-cream-300 noise-overlay">
      {/* 3D Background */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
          <Suspense fallback={null}>
            <LuxuryBackground />
          </Suspense>
        </Canvas>
      </div>

      {/* Soft gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-cream-100/40 via-transparent to-gold-100/30 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-cream-200 to-transparent pointer-events-none" />

      {/* Decorative lines */}
      <div className="absolute top-1/4 left-8 w-px h-32 bg-gradient-to-b from-transparent via-gold-400/30 to-transparent" />
      <div className="absolute top-1/3 right-8 w-px h-40 bg-gradient-to-b from-transparent via-gold-400/20 to-transparent" />

      {/* Content */}
      <motion.div
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
        style={{
          opacity,
          transform: `scale(${scale}) translateY(${translateY}px)`
        }}
      >
        {/* Subtle top badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-5 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-gold-200/50 shadow-soft">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-charcoal-500">
              Premium Smart Living
            </span>
          </span>
        </motion.div>

        {/* Main headline - elegant serif */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-light text-charcoal-700 mb-6 leading-[1.1] tracking-tight"
        >
          <span className="block">당신의 공간에</span>
          <span className="block mt-2">
            <span className="text-gold-gradient font-medium italic">품격</span>
            <span className="text-charcoal-400">을 더하다</span>
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-lg md:text-xl text-charcoal-400 max-w-xl mb-12 font-light leading-relaxed"
        >
          섬세한 음성 하나로 완성되는 럭셔리 라이프스타일.
          <br />
          <span className="text-charcoal-500">Google Nest</span>와 함께하는 프리미엄 스마트홈.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link
            to="/products"
            className="group px-10 py-4 bg-charcoal-700 text-cream-100 rounded-full font-medium tracking-wide hover:bg-charcoal-600 transition-luxury shadow-luxury-lg hover:shadow-luxury relative overflow-hidden"
          >
            <span className="relative z-10">컬렉션 보기</span>
            <div className="absolute inset-0 bg-gradient-to-r from-gold-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </Link>
          <a
            href="#demo"
            className="px-10 py-4 bg-white/60 backdrop-blur-sm text-charcoal-600 rounded-full font-medium tracking-wide border border-gold-200/50 hover:bg-white/80 hover:border-gold-300 transition-luxury"
          >
            체험하기
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
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            className="flex flex-col items-center gap-3"
          >
            <span className="text-[10px] tracking-[0.3em] uppercase text-charcoal-300 font-medium">Scroll</span>
            <div className="w-px h-12 bg-gradient-to-b from-gold-400/60 to-transparent" />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
