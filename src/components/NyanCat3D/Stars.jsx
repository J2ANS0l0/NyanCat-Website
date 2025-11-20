import { useMemo } from 'react'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

export function Stars() {
  const sphere = useMemo(() => {
    const positions = new Float32Array(5000 * 3)
    for (let i = 0; i < 5000; i++) {
      const x = (Math.random() - 0.5) * 2000
      const y = (Math.random() - 0.5) * 2000
      const z = (Math.random() - 0.5) * 2000
      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z
    }
    return positions
  }, [])

  return (
    <Points positions={sphere} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={2}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  )
}