import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function Cube3D() {
  const mountRef = useRef(null);
  const [speed, setSpeed] = useState(0);
  const animationRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Configuración de la escena
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a1a);

    // Estrellas de fondo
    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({ 
      color: 0xffffff, 
      size: 0.1,
      sizeAttenuation: true
    });
    const starsVertices = [];
    for (let i = 0; i < 1000; i++) {
      const x = (Math.random() - 0.5) * 2000;
      const y = (Math.random() - 0.5) * 2000;
      const z = (Math.random() - 0.5) * 2000;
      starsVertices.push(x, y, z);
    }
    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    // Configuración de la cámara
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      2000
    );
    camera.position.set(0, 2, 8);

    // Configuración del renderizador
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: false
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Crear el cubo (nave)
    const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
    const material = new THREE.MeshStandardMaterial({
      color: 0x00d9ff,
      metalness: 0.7,
      roughness: 0.2,
      emissive: 0x003344,
      emissiveIntensity: 0.5,
    });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Agregar bordes al cubo
    const edges = new THREE.EdgesGeometry(geometry);
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x00ffff });
    const wireframe = new THREE.LineSegments(edges, lineMaterial);
    cube.add(wireframe);

    // Iluminación
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1, 100);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0xff00ff, 0.5, 100);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);

    // Variables de control de movimiento
    const keys = {
      ArrowUp: false,
      ArrowDown: false,
      ArrowLeft: false,
      ArrowRight: false,
    };

    const velocity = new THREE.Vector3(0, 0, 0);
    const acceleration = 0.05;
    const maxSpeed = 0.3;
    const friction = 0.98;
    const forwardSpeed = 0.15;

    // Event listeners para las teclas
    const handleKeyDown = (event) => {
      if (event.key in keys) {
        event.preventDefault();
        keys[event.key] = true;
      }
    };

    const handleKeyUp = (event) => {
      if (event.key in keys) {
        event.preventDefault();
        keys[event.key] = false;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    // Manejar redimensionamiento de ventana
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animación
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);

      // Movimiento constante hacia adelante
      cube.position.z -= forwardSpeed;

      // Aplicar aceleración según las teclas presionadas
      if (keys.ArrowUp) {
        velocity.y += acceleration;
      }
      if (keys.ArrowDown) {
        velocity.y -= acceleration;
      }
      if (keys.ArrowLeft) {
        velocity.x -= acceleration;
      }
      if (keys.ArrowRight) {
        velocity.x += acceleration;
      }

      // Limitar velocidad máxima
      const currentSpeed = velocity.length();
      if (currentSpeed > maxSpeed) {
        velocity.normalize().multiplyScalar(maxSpeed);
      }

      // Aplicar fricción
      velocity.multiplyScalar(friction);

      // Actualizar posición del cubo
      cube.position.add(velocity);

      // Rotación automática suave
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      // Inclinación según dirección de movimiento
      cube.rotation.z = -velocity.x * 2;
      cube.rotation.x = velocity.y * 2 + 0.01;

      // Mover la cámara para seguir al cubo
      camera.position.x = cube.position.x;
      camera.position.y = cube.position.y + 3;
      camera.position.z = cube.position.z + 10;

      // La cámara mira hacia adelante del cubo
      camera.lookAt(cube.position.x, cube.position.y, cube.position.z - 5);

      // Mover las estrellas para efecto de profundidad
      stars.position.z = (cube.position.z % 2000) - 1000;

      // Actualizar velocidad para mostrar en UI
      setSpeed(Math.round(currentSpeed * 100));

      renderer.render(scene, camera);
    };

    animate();

    // Limpieza
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('resize', handleResize);
      
      // Limpiar Three.js
      scene.remove(cube);
      scene.remove(stars);
      geometry.dispose();
      material.dispose();
      edges.dispose();
      lineMaterial.dispose();
      starsGeometry.dispose();
      starsMaterial.dispose();
      renderer.dispose();
      
      if (mountRef.current && renderer.domElement && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div style={{ 
      position: 'relative', 
      width: '100vw', 
      height: '100vh', 
      overflow: 'hidden', 
      margin: 0, 
      padding: 0,
      background: '#0a0a1a'
    }}>
      <div ref={mountRef} style={{ 
        width: '100%', 
        height: '100%', 
        position: 'absolute', 
        top: 0, 
        left: 0 
      }} />
      
      <div style={{ 
        position: 'absolute', 
        top: '32px', 
        left: '50%', 
        transform: 'translateX(-50%)', 
        color: 'white', 
        textAlign: 'center',
        zIndex: 10,
        userSelect: 'none'
      }}>
        <h1 style={{ 
          fontSize: '36px', 
          fontWeight: 'bold', 
          margin: '0 0 8px 0', 
          color: '#22d3ee',
          textShadow: '0 0 10px rgba(34, 211, 238, 0.5)'
        }}>
          CONTROL DE NAVE
        </h1>
      </div>

      <div style={{ 
        position: 'absolute', 
        bottom: '32px', 
        left: '32px', 
        color: 'white', 
        backgroundColor: 'rgba(0, 0, 0, 0.8)', 
        padding: '16px', 
        borderRadius: '8px',
        fontFamily: 'Arial, sans-serif',
        zIndex: 10,
        userSelect: 'none',
        border: '1px solid rgba(34, 211, 238, 0.3)'
      }}>
        <h3 style={{ 
          fontWeight: 'bold', 
          marginBottom: '8px', 
          color: '#22d3ee', 
          fontSize: '16px', 
          margin: '0 0 8px 0' 
        }}>
          CONTROLES
        </h3>
        <div style={{ fontSize: '14px' }}>
          <div style={{ marginBottom: '4px' }}>↑ Subir</div>
          <div style={{ marginBottom: '4px' }}>↓ Bajar</div>
          <div style={{ marginBottom: '4px' }}>← Izquierda</div>
          <div style={{ marginBottom: '4px' }}>→ Derecha</div>
        </div>
        <div style={{ fontSize: '12px', opacity: 0.7, marginTop: '8px' }}>
          La nave vuela automáticamente
        </div>
      </div>

      <div style={{ 
        position: 'absolute', 
        bottom: '32px', 
        right: '32px', 
        color: 'white', 
        backgroundColor: 'rgba(0, 0, 0, 0.8)', 
        padding: '16px', 
        borderRadius: '8px',
        fontFamily: 'Arial, sans-serif',
        zIndex: 10,
        userSelect: 'none',
        border: '1px solid rgba(34, 211, 238, 0.3)'
      }}>
        <h3 style={{ 
          fontWeight: 'bold', 
          marginBottom: '8px', 
          color: '#22d3ee', 
          fontSize: '16px', 
          margin: '0 0 8px 0' 
        }}>
          VELOCIDAD
        </h3>
        <div style={{ 
          fontSize: '32px', 
          fontFamily: 'monospace',
          color: '#22d3ee',
          textShadow: '0 0 10px rgba(34, 211, 238, 0.5)'
        }}>
          {speed}
        </div>
        <div style={{ fontSize: '12px', opacity: 0.7 }}>unidades/s</div>
      </div>
    </div>
  );
}