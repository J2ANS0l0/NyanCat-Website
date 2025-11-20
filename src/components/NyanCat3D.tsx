import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';

const NyanCatMesh = () => {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.3;
    }
  });

  return (
    <group
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 1.2 : 1}
    >
      {/* Cat Body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.5, 1, 0.8]} />
        <meshStandardMaterial color="#666666" />
      </mesh>

      {/* Cat Head */}
      <mesh position={[0.9, 0.2, 0]}>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshStandardMaterial color="#666666" />
      </mesh>

      {/* Pop-Tart Body */}
      <mesh position={[0, -0.1, 0]}>
        <boxGeometry args={[1.3, 0.7, 0.6]} />
        <meshStandardMaterial color="#FFB6D9" />
      </mesh>

      {/* Rainbow Trail */}
      {[...Array(6)].map((_, i) => (
        <mesh key={i} position={[-1.5 - i * 0.3, 0, 0]}>
          <boxGeometry args={[0.3, 0.6, 0.4]} />
          <meshStandardMaterial
            color={
              ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#8B00FF'][
                i % 6
              ]
            }
          />
        </mesh>
      ))}

      {/* Eyes */}
      <mesh position={[1.2, 0.3, 0.3]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[1.2, 0.3, -0.3]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* Ears */}
      <mesh position={[1.1, 0.6, 0.3]} rotation={[0, 0, Math.PI / 4]}>
        <coneGeometry args={[0.2, 0.4, 3]} />
        <meshStandardMaterial color="#666666" />
      </mesh>
      <mesh position={[1.1, 0.6, -0.3]} rotation={[0, 0, Math.PI / 4]}>
        <coneGeometry args={[0.2, 0.4, 3]} />
        <meshStandardMaterial color="#666666" />
      </mesh>

      {/* Legs */}
      {[
        [-0.4, -0.7, 0.3],
        [-0.4, -0.7, -0.3],
        [0.4, -0.7, 0.3],
        [0.4, -0.7, -0.3],
      ].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <cylinderGeometry args={[0.1, 0.1, 0.4]} />
          <meshStandardMaterial color="#666666" />
        </mesh>
      ))}

      {/* Tail */}
      <mesh position={[-0.9, 0.1, 0]} rotation={[0, 0, Math.PI / 6]}>
        <cylinderGeometry args={[0.08, 0.15, 0.8]} />
        <meshStandardMaterial color="#666666" />
      </mesh>
    </group>
  );
};

const NyanCat3D = () => {
  return (
    <div className="w-full h-[600px] rounded-xl overflow-hidden border border-border shadow-2xl">
      <Canvas camera={{ position: [5, 2, 5], fov: 50 }}>
        <color attach="background" args={['#001F3F']} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <spotLight
          position={[0, 10, 0]}
          angle={0.3}
          penumbra={1}
          intensity={1}
          castShadow
        />
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />
        <NyanCatMesh />
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          minDistance={3}
          maxDistance={15}
        />
      </Canvas>
    </div>
  );
};

export default NyanCat3D;
