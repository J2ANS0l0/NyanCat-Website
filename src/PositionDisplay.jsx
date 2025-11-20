import { useState, useEffect } from 'react'
import { planePosition } from './Airplane'

export function PositionDisplay() {
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 })

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition({
        x: planePosition.x.toFixed(2),
        y: planePosition.y.toFixed(2),
        z: planePosition.z.toFixed(2)
      })
    }, 16) // Actualizar aproximadamente 60 veces por segundo

    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{
      position: 'absolute',
      top: '20px',
      left: '20px',
      color: '#ffffff',
      fontFamily: 'monospace',
      fontSize: '18px',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      padding: '10px 15px',
      borderRadius: '5px',
      zIndex: 1000,
      pointerEvents: 'none'
    }}>
      <div>X: {position.x}</div>
      <div>Y: {position.y}</div>
      <div>Z: {position.z}</div>
    </div>
  )
}

