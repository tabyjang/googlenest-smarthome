import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Float } from '@react-three/drei';

interface Canvas3DProps {
  productId: string;
}

const ProductModel: React.FC<{ productId: string }> = ({ productId }) => {
  // Placeholder 3D representations for each product
  // In production, replace with actual GLTF models using useGLTF
  const getProductGeometry = () => {
    switch (productId) {
      case 'nest-hub':
        return (
          <group>
            {/* Screen */}
            <mesh position={[0, 0.3, 0]}>
              <boxGeometry args={[2.5, 1.8, 0.1]} />
              <meshStandardMaterial color="#333333" />
            </mesh>
            {/* Screen Display */}
            <mesh position={[0, 0.3, 0.06]}>
              <boxGeometry args={[2.3, 1.6, 0.01]} />
              <meshStandardMaterial color="#4285F4" emissive="#4285F4" emissiveIntensity={0.3} />
            </mesh>
            {/* Base */}
            <mesh position={[0, -0.6, 0.3]}>
              <boxGeometry args={[2, 0.8, 1.2]} />
              <meshStandardMaterial color="#f5f5f5" />
            </mesh>
          </group>
        );
      case 'nest-audio':
        return (
          <group>
            {/* Body */}
            <mesh>
              <cylinderGeometry args={[0.8, 0.9, 2.2, 32]} />
              <meshStandardMaterial color="#202124" />
            </mesh>
            {/* Fabric texture indicator */}
            <mesh position={[0, 0, 0.01]}>
              <cylinderGeometry args={[0.81, 0.91, 1.8, 32]} />
              <meshStandardMaterial color="#3c4043" />
            </mesh>
            {/* Top LED area */}
            <mesh position={[0, 1.0, 0]}>
              <cylinderGeometry args={[0.75, 0.8, 0.2, 32]} />
              <meshStandardMaterial color="#333333" />
            </mesh>
          </group>
        );
      case 'nest-cam':
        return (
          <group>
            {/* Camera body */}
            <mesh>
              <sphereGeometry args={[0.8, 32, 32]} />
              <meshStandardMaterial color="#ffffff" />
            </mesh>
            {/* Lens */}
            <mesh position={[0, 0, 0.7]}>
              <circleGeometry args={[0.4, 32]} />
              <meshStandardMaterial color="#333333" />
            </mesh>
            {/* Lens ring */}
            <mesh position={[0, 0, 0.65]}>
              <ringGeometry args={[0.35, 0.45, 32]} />
              <meshStandardMaterial color="#4285F4" />
            </mesh>
            {/* Base */}
            <mesh position={[0, -1.2, 0]}>
              <cylinderGeometry args={[0.5, 0.6, 0.3, 32]} />
              <meshStandardMaterial color="#ffffff" />
            </mesh>
          </group>
        );
      case 'nest-thermostat':
        return (
          <group>
            {/* Outer ring */}
            <mesh>
              <torusGeometry args={[1.2, 0.15, 16, 100]} />
              <meshStandardMaterial color="#e8e8e8" metalness={0.5} roughness={0.3} />
            </mesh>
            {/* Display face */}
            <mesh>
              <circleGeometry args={[1.1, 64]} />
              <meshStandardMaterial color="#1a1a1a" />
            </mesh>
            {/* Temperature arc */}
            <mesh position={[0, 0, 0.01]}>
              <ringGeometry args={[0.7, 0.9, 64, 1, 0, Math.PI * 1.5]} />
              <meshStandardMaterial color="#EA4335" emissive="#EA4335" emissiveIntensity={0.5} />
            </mesh>
            {/* Center display */}
            <mesh position={[0, 0, 0.02]}>
              <circleGeometry args={[0.5, 64]} />
              <meshStandardMaterial color="#333333" />
            </mesh>
          </group>
        );
      default:
        return (
          <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#4285F4" />
          </mesh>
        );
    }
  };

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
      {getProductGeometry()}
    </Float>
  );
};

const Canvas3D: React.FC<Canvas3DProps> = ({ productId }) => {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      style={{ width: '100%', height: '100%' }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.6} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.3} />

        <ProductModel productId={productId} />

        <ContactShadows
          position={[0, -1.5, 0]}
          opacity={0.4}
          scale={5}
          blur={2}
          far={4}
        />

        <Environment preset="apartment" />
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={3}
          maxDistance={8}
          autoRotate
          autoRotateSpeed={2}
        />
      </Suspense>
    </Canvas>
  );
};

export default Canvas3D;
