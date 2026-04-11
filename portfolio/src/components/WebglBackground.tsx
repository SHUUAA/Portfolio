import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';

const AnimatedMesh = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.1;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 128, 128]} scale={3}>
      <MeshDistortMaterial 
        color="#e2e8f0" 
        attach="material" 
        distort={0.4} 
        speed={1.2} 
        roughness={0.2} 
        metalness={0.8}
        wireframe={false}
      />
    </Sphere>
  );
};

export const WebglBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} intensity={2} />
        <pointLight position={[-5, -5, -5]} color="#ffffff" intensity={2} />
        <AnimatedMesh />
      </Canvas>
    </div>
  );
};
