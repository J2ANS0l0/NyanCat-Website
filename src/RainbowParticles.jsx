import React, { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { planePosition, planeZ, planeX, planeY } from './Airplane'
import { Color, Vector3, Float32BufferAttribute } from 'three'

// Partículas con estela arcoíris suave en bucle
export function RainbowParticles() {
  const INITIAL_CAPACITY = 500

  const capacityRef = useRef(INITIAL_CAPACITY)
  const countRef = useRef(0)
  const positionsRef = useRef(new Float32Array(INITIAL_CAPACITY * 3))
  const colorsRef = useRef(new Float32Array(INITIAL_CAPACITY * 3))
  const hueRef = useRef(0)

  const ensureCapacity = (required, geometry) => {
    if (required <= capacityRef.current) return
    let newCapacity = capacityRef.current
    while (newCapacity < required) newCapacity *= 2

    const newPositions = new Float32Array(newCapacity * 3)
    newPositions.set(positionsRef.current)
    positionsRef.current = newPositions

    const newColors = new Float32Array(newCapacity * 3)
    newColors.set(colorsRef.current)
    colorsRef.current = newColors

    capacityRef.current = newCapacity

    if (geometry) {
      geometry.setAttribute(
        'position',
        new Float32BufferAttribute(positionsRef.current, 3)
      )
      geometry.setAttribute(
        'color',
        new Float32BufferAttribute(colorsRef.current, 3)
      )
    }
  }

  const pointsRef = useRef()
  const tmpPlaneZ = useRef(new Vector3())
  const tmpPlaneX = useRef(new Vector3())
  const tmpPlaneY = useRef(new Vector3())

  const MODEL_WIDTH = 0.26
  const MODEL_HEIGHT = 0.18

  useFrame(() => {
    if (!pointsRef.current) return
    const geometry = pointsRef.current.geometry

    tmpPlaneZ.current.copy(planeZ).normalize()
    tmpPlaneX.current.copy(planeX).normalize()
    tmpPlaneY.current.copy(planeY).normalize()

    for (let i = 0; i < countRef.current; i++) {
      const ix = i * 3
      positionsRef.current[ix + 0] += tmpPlaneZ.current.x * 0.01
      positionsRef.current[ix + 1] += tmpPlaneZ.current.y * 0.01
      positionsRef.current[ix + 2] += tmpPlaneZ.current.z * 0.01
    }

    const SPAWN_PER_FRAME = 12
    for (let s = 0; s < SPAWN_PER_FRAME; s++) {
      ensureCapacity(countRef.current + 1, geometry)

      const i = countRef.current
      countRef.current++
      const ix = i * 3

      const base = new Vector3().copy(planePosition).add(
        new Vector3().copy(planeZ).multiplyScalar(0.18)
      )

      const offsetX = (Math.random() - 0.5) * MODEL_WIDTH
      // Dividir en 6 franjas horizontales fijas
      const bandIndex = Math.floor(Math.random() * 6)
      const bandHeight = MODEL_HEIGHT / 6
      const offsetY = (bandIndex - 2.5) * bandHeight
      const offset = new Vector3()
        .addScaledVector(tmpPlaneX.current, offsetX)
        .addScaledVector(tmpPlaneY.current, offsetY)

      const spawnPos = base.add(offset)

      positionsRef.current[ix + 0] = spawnPos.x
      positionsRef.current[ix + 1] = spawnPos.y
      positionsRef.current[ix + 2] = spawnPos.z

      const bandColors = [
        new Color('#ff0000'),
        new Color('#ff7f00'),
        new Color('#ffff00'),
        new Color('#00ff00'),
        new Color('#0000ff'),
        new Color('#8b00ff')
      ]
      const color = bandColors[bandIndex]

      colorsRef.current[ix + 0] = color.r
      colorsRef.current[ix + 1] = color.g
      colorsRef.current[ix + 2] = color.b
    }

    geometry.setDrawRange(0, countRef.current)

    const posAttr = geometry.getAttribute('position')
    posAttr.array = positionsRef.current
    posAttr.count = capacityRef.current
    posAttr.needsUpdate = true

    const colorAttr = geometry.getAttribute('color')
    colorAttr.array = colorsRef.current
    colorAttr.count = capacityRef.current
    colorAttr.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={capacityRef.current}
          array={positionsRef.current}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={capacityRef.current}
          array={colorsRef.current}
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
