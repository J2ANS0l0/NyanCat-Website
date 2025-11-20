import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';
import { Matrix4, Quaternion, Vector3 } from 'three';
import { updatePlaneAxis, cameraView } from './controls';

const x = new Vector3(1, 0, 0);
const y = new Vector3(0, 1, 0);
const z = new Vector3(0, 0, 1);
export const planePosition = new Vector3(0, 3, 7);
export { x as planeX, y as planeY, z as planeZ };

const delayedRotMatrix = new Matrix4();
const delayedQuaternion = new Quaternion();

export function Airplane(props) {
  // Usamos un modelo 3D público de pato como placeholder
  const { nodes, materials, scene } = useGLTF('/models/nyan_cat.glb');
  const groupRef = useRef();

  useFrame(({ camera }) => {
    updatePlaneAxis(x, y, z, planePosition, camera);

    const rotMatrix = new Matrix4().makeBasis(x, y, z);

    const matrix = new Matrix4()
    .multiply(new Matrix4().makeTranslation(planePosition.x, planePosition.y, planePosition.z))
    .multiply(rotMatrix);

    groupRef.current.matrixAutoUpdate = false;
    groupRef.current.matrix.copy(matrix);
    groupRef.current.matrixWorldNeedsUpdate = true;

    var quaternionA = new Quaternion().copy(delayedQuaternion);
    var quaternionB = new Quaternion();
    quaternionB.setFromRotationMatrix(rotMatrix);

    var interpolationFactor = 0.175;
    var interpolatedQuaternion = new Quaternion().copy(quaternionA);
    interpolatedQuaternion.slerp(quaternionB, interpolationFactor);
    delayedQuaternion.copy(interpolatedQuaternion);

    delayedRotMatrix.identity();
    delayedRotMatrix.makeRotationFromQuaternion(delayedQuaternion);

    let cameraMatrix;
    
    if (cameraView === 0) {
      cameraMatrix = new Matrix4()
        .multiply(new Matrix4().makeTranslation(planePosition.x, planePosition.y, planePosition.z))
        .multiply(delayedRotMatrix)
        .multiply(new Matrix4().makeRotationX(-0.2))
        .multiply(
          new Matrix4().makeTranslation(0, 0.015, 0.3)
        );
    } else {
      const sideOffset = new Vector3().copy(x).multiplyScalar(0.9);
      const sidePosition = new Vector3().copy(planePosition)
        .add(sideOffset)
        .add(new Vector3(0, 0.2, 0));
      
      const direction = new Vector3().subVectors(planePosition, sidePosition).normalize();
      const right = new Vector3().crossVectors(direction, y).normalize();
      const up = new Vector3().crossVectors(right, direction).normalize();
      const forward = new Vector3().copy(direction).negate();
      
      const sideRotMatrix = new Matrix4().makeBasis(right, up, forward);
      
      cameraMatrix = new Matrix4()
        .multiply(new Matrix4().makeTranslation(sidePosition.x, sidePosition.y, sidePosition.z))
        .multiply(sideRotMatrix);
    }

    camera.matrixAutoUpdate = false;
    camera.matrix.copy(cameraMatrix);
    camera.matrixWorldNeedsUpdate = true;

    if (groupRef.current) {
      const scaleValue = cameraView === 1 ? 0.11 : 0.03;
      groupRef.current.scale.set(scaleValue, scaleValue, scaleValue);
    }
  });

  return (
    <>
      <group ref={groupRef}>
        <primitive object={scene} {...props} dispose={null} scale={0.03} />
      </group>
    </>
  )
}

useGLTF.preload('/models/nyan_cat.glb');