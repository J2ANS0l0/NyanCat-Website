import React, { useRef } from "react";
import { PerspectiveCamera } from "@react-three/drei";
import { EffectComposer } from "@react-three/postprocessing";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";
import { Airplane, planePosition, planeX, planeY, planeZ } from "./Airplane";
import { MotionBlur } from "./MotionBlur";
import { Stars } from "./Stars";
import { RainbowParticles } from "./RainbowParticles";

function App() {
  const lightRef = useRef();

  useFrame(() => {
    if (lightRef.current) {
      // Calcular la posición de la luz usando los ejes del avión
      // Esto mantiene la dirección de iluminación constante relativa al avión
      // La luz viene desde arriba (y) y ligeramente desde la derecha (x) y delante (z)
      const lightOffset = new Vector3()
        .addScaledVector(planeX, 10)  // Derecha relativa al avión
        .addScaledVector(planeY, 5)   // Arriba relativa al avión
        .addScaledVector(planeZ, 4);  // Delante relativa al avión
      
      lightRef.current.position.copy(planePosition).add(lightOffset);
      
      // Hacer que la luz apunte hacia el avión
      if (lightRef.current.target) {
        lightRef.current.target.position.copy(planePosition);
        lightRef.current.target.updateMatrixWorld();
      }
    }
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 10, 10]} />

      <Stars />

      <RainbowParticles />

      <Airplane />

      <directionalLight
        ref={lightRef}
        color={"#f3d29a"}
        intensity={2}
        position={[10, 5, 4]}
      />

      <EffectComposer>
        <MotionBlur />
      </EffectComposer>
    </>
  );
}

export default App;
