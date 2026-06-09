import { useTexture } from '@react-three/drei'
import { useState, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function PhotoFrame({ position, rotation, imageUrl, title, size = [2.4, 1.8], onClick }) {
  const [hovered, setHovered] = useState(false)
  const glowRef = useRef()
  const texture = useTexture(imageUrl)

  const [w, h] = size
  const border = 0.07
  const depth  = 0.04

  useFrame(() => {
    if (!glowRef.current) return
    glowRef.current.material.opacity = THREE.MathUtils.lerp(
      glowRef.current.material.opacity,
      hovered ? 0.15 : 0,
      0.08
    )
  })

  return (
    <group
      position={position}
      rotation={rotation}
      onPointerOver={e => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer' }}
      onPointerOut={e => { e.stopPropagation(); setHovered(false); document.body.style.cursor = 'auto' }}
      onClick={e => { e.stopPropagation(); onClick?.() }}
    >
      {/* Backing board */}
      <mesh>
        <boxGeometry args={[w + border * 2, h + border * 2, depth]} />
        <meshStandardMaterial color="#1a1410" roughness={0.8} />
      </mesh>

      {/* Frame moulding — top */}
      <mesh position={[0, h / 2 + border / 2, depth / 2 + 0.001]}>
        <boxGeometry args={[w + border * 2, border, depth * 0.6]} />
        <meshStandardMaterial color="#2e221a" roughness={0.3} metalness={0.4} />
      </mesh>

      {/* Frame moulding — bottom */}
      <mesh position={[0, -(h / 2 + border / 2), depth / 2 + 0.001]}>
        <boxGeometry args={[w + border * 2, border, depth * 0.6]} />
        <meshStandardMaterial color="#2e221a" roughness={0.3} metalness={0.4} />
      </mesh>

      {/* Frame moulding — left */}
      <mesh position={[-(w / 2 + border / 2), 0, depth / 2 + 0.001]}>
        <boxGeometry args={[border, h, depth * 0.6]} />
        <meshStandardMaterial color="#2e221a" roughness={0.3} metalness={0.4} />
      </mesh>

      {/* Frame moulding — right */}
      <mesh position={[w / 2 + border / 2, 0, depth / 2 + 0.001]}>
        <boxGeometry args={[border, h, depth * 0.6]} />
        <meshStandardMaterial color="#2e221a" roughness={0.3} metalness={0.4} />
      </mesh>

      {/* Photo */}
      <mesh position={[0, 0, depth / 2 + 0.002]}>
        <planeGeometry args={[w, h]} />
        <meshStandardMaterial map={texture} toneMapped={false} />
      </mesh>

      {/* Hover glow */}
      <mesh ref={glowRef} position={[0, 0, depth / 2 + 0.003]}>
        <planeGeometry args={[w + 0.3, h + 0.3]} />
        <meshBasicMaterial color="#ffe8a0" transparent opacity={0} />
      </mesh>
    </group>
  )
}