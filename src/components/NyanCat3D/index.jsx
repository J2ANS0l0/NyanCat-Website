import React, { useRef, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { EffectComposer } from "@react-three/postprocessing";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";
import { Airplane, planePosition, planeX, planeY, planeZ } from "./Airplane";
import { MotionBlur } from "./MotionBlur";
import { Stars } from "./Stars";
import { RainbowParticles } from "./RainbowParticles";
import { PositionDisplay } from "./PositionDisplay";

// Componente de luz direccional
function DirectionalLightWithTracking() {
  const lightRef = useRef();

  useFrame(() => {
    if (lightRef.current) {
      const lightOffset = new Vector3()
        .addScaledVector(planeX, 10)
        .addScaledVector(planeY, 5)
        .addScaledVector(planeZ, 4);
      
      lightRef.current.position.copy(planePosition).add(lightOffset);
      
      if (lightRef.current.target) {
        lightRef.current.target.position.copy(planePosition);
        lightRef.current.target.updateMatrixWorld();
      }
    }
  });

  return (
    <directionalLight
      ref={lightRef}
      color={"#f3d29a"}
      intensity={2}
      position={[10, 5, 4]}
    />
  );
}

// Componente principal de la escena 3D
function NyanCatScene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 10, 10]} />
      <Stars />
      <RainbowParticles />
      <Airplane />
      <DirectionalLightWithTracking />
      <EffectComposer>
        <MotionBlur />
      </EffectComposer>
    </>
  );
}

// Componente contenedor principal
export function NyanCat3D({ height = "600px", className = "" }) {
  return (
    <div 
      className={`relative w-full ${className}`}
      style={{ height }}
    >
      <Canvas 
        shadows
        gl={{ 
          clearColor: "#000011",
          alpha: false
        }}
        style={{ width: '100%', height: '100%' }}
      >
        <color attach="background" args={["#000011"]} />
        <Suspense fallback={null}>
          <NyanCatScene />
        </Suspense>
      </Canvas>
      <PositionDisplay />
    </div>
  );
}

export default NyanCat3D;