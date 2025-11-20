import React, { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { planePosition, planeZ, planeX, planeY } from './Airplane'
import { Color, Vector3 } from 'three'

// Partículas de arcoíris que siguen al Nyan Cat (tipo cursor)
export function RainbowParticles() {
  const COUNT = 3000

  // Buffer de posiciones de partículas
  const positions = useMemo(() => new Float32Array(COUNT * 3), [COUNT])
  // Colores por vértice (arcoíris)
  const colors = useMemo(() => {
    const arr = new Float32Array(COUNT * 3)
    for (let i = 0; i < COUNT; i++) {
      const t = i / COUNT
      const color = new Color().setHSL(0.0 + 0.8 * t, 1.0, 0.5) // de rojo a violeta
      arr[i * 3 + 0] = color.r
      arr[i * 3 + 1] = color.g
      arr[i * 3 + 2] = color.b
    }
    return arr
  }, [COUNT])

  const pointsRef = useRef()
  const spawnIndex = useRef(0)
  const tmpPlaneZ = useRef(new Vector3())
  const tmpPlaneX = useRef(new Vector3())
  const tmpPlaneY = useRef(new Vector3())

  const MODEL_WIDTH = 0.26   // aproximado al ancho del Nyan Cat
  const MODEL_HEIGHT = 0.18  // aproximado al alto

  useFrame(() => {
    if (!pointsRef.current) return
    const geometry = pointsRef.current.geometry
    const posAttr = geometry.attributes.position

    // Copia segura del eje Z del modelo
    tmpPlaneZ.current.copy(planeZ).normalize()
    tmpPlaneX.current.copy(planeX).normalize()
    tmpPlaneY.current.copy(planeY).normalize()

    // Mover todas las partículas ligeramente hacia atrás respecto al movimiento del modelo
    for (let i = 0; i < COUNT; i++) {
      const ix = i * 3
      // El modelo avanza en -Z, así que +Z es "detrás"
      positions[ix + 0] += tmpPlaneZ.current.x * 0.01
      positions[ix + 1] += tmpPlaneZ.current.y * 0.01
      positions[ix + 2] += tmpPlaneZ.current.z * 0.01
    }

    // Generar nuevas partículas en la cola del Nyan Cat
    const SPAWN_PER_FRAME = 12
    for (let s = 0; s < SPAWN_PER_FRAME; s++) {
      const i = spawnIndex.current % COUNT
      spawnIndex.current++
      const ix = i * 3

      // Punto base detrás del modelo y centrado
      const base = new Vector3().copy(planePosition).add(
        new Vector3().copy(planeZ).multiplyScalar(0.18)
      )

      // Offset aleatorio dentro del tamaño aproximado del modelo
      const offsetX = (Math.random() - 0.5) * MODEL_WIDTH
      const offsetY = (Math.random() - 0.5) * MODEL_HEIGHT
      const offset = new Vector3()
        .addScaledVector(tmpPlaneX.current, offsetX)
        .addScaledVector(tmpPlaneY.current, offsetY)

      const spawnPos = base.add(offset)

      positions[ix + 0] = spawnPos.x
      positions[ix + 1] = spawnPos.y
      positions[ix + 2] = spawnPos.z
    }

    posAttr.array.set(positions)
    posAttr.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={COUNT}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={COUNT}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.9}
        depthWrite={false}
      />
    </points>
  )
}


