import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import PhotoFrame from './PhotoFrame'
import { getFrameSize } from '../../services/cloudinary'

const WALL_SLOTS = [
  // Back wall — 3 frames
  { position: [-3.8, 2.2, -4.92], rotation: [0, 0, 0],             maxWidth: 2.2 },
  { position: [0,    2.2, -4.92], rotation: [0, 0, 0],             maxWidth: 2.4 },
  { position: [3.8,  2.2, -4.92], rotation: [0, 0, 0],             maxWidth: 2.2 },
  // Left wall — 2 frames
  { position: [-6.92, 2.2, -1.8], rotation: [0, Math.PI / 2, 0],  maxWidth: 2.0 },
  { position: [-6.92, 2.2,  1.8], rotation: [0, Math.PI / 2, 0],  maxWidth: 2.0 },
  // Right wall — 2 frames
  { position: [6.92,  2.2, -1.8], rotation: [0, -Math.PI / 2, 0], maxWidth: 2.0 },
  { position: [6.92,  2.2,  1.8], rotation: [0, -Math.PI / 2, 0], maxWidth: 2.0 },
  // Front wall — 1
  { position: [0, 2.2, 4.92],     rotation: [0, Math.PI, 0],       maxWidth: 2.2 },
]

// Wooden floor plank pattern using instanced geometry
function WoodFloor() {
  return (
    <group>
      {/* Main floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[14, 10]} />
        <meshStandardMaterial
          color="#c4956a"
          roughness={0.85}
          metalness={0.0}
        />
      </mesh>
      {/* Floor planks overlay for detail */}
      {Array.from({ length: 12 }).map((_, i) => (
        <mesh
          key={i}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[-6.5 + i * 1.18, 0.001, 0]}
          receiveShadow
        >
          <planeGeometry args={[1.1, 10]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? '#b8845c' : '#c9a070'}
            roughness={0.9}
            metalness={0}
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}
      {/* Baseboard along walls */}
      <mesh position={[0, 0.08, -4.98]}>
        <boxGeometry args={[14, 0.16, 0.06]} />
        <meshStandardMaterial color="#8b6343" roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.08, 4.98]}>
        <boxGeometry args={[14, 0.16, 0.06]} />
        <meshStandardMaterial color="#8b6343" roughness={0.7} />
      </mesh>
      <mesh rotation={[0, Math.PI / 2, 0]} position={[-6.98, 0.08, 0]}>
        <boxGeometry args={[10, 0.16, 0.06]} />
        <meshStandardMaterial color="#8b6343" roughness={0.7} />
      </mesh>
      <mesh rotation={[0, Math.PI / 2, 0]} position={[6.98, 0.08, 0]}>
        <boxGeometry args={[10, 0.16, 0.06]} />
        <meshStandardMaterial color="#8b6343" roughness={0.7} />
      </mesh>
    </group>
  )
}

function Walls() {
  return (
    <group>
      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 4.5, 0]}>
        <planeGeometry args={[14, 10]} />
        <meshStandardMaterial color="#f5f0e8" roughness={1} />
      </mesh>
      {/* Back wall */}
      <mesh position={[0, 2.25, -5]}>
        <planeGeometry args={[14, 4.5]} />
        <meshStandardMaterial color="#f2ede4" roughness={0.9} />
      </mesh>
      {/* Front wall */}
      <mesh rotation={[0, Math.PI, 0]} position={[0, 2.25, 5]}>
        <planeGeometry args={[14, 4.5]} />
        <meshStandardMaterial color="#f2ede4" roughness={0.9} />
      </mesh>
      {/* Left wall */}
      <mesh rotation={[0, Math.PI / 2, 0]} position={[-7, 2.25, 0]}>
        <planeGeometry args={[10, 4.5]} />
        <meshStandardMaterial color="#ede8df" roughness={0.9} />
      </mesh>
      {/* Right wall */}
      <mesh rotation={[0, -Math.PI / 2, 0]} position={[7, 2.25, 0]}>
        <planeGeometry args={[10, 4.5]} />
        <meshStandardMaterial color="#ede8df" roughness={0.9} />
      </mesh>
      {/* Wall dado rail */}
      <mesh position={[0, 1.0, -4.97]}>
        <boxGeometry args={[14, 0.06, 0.04]} />
        <meshStandardMaterial color="#d4c8b5" roughness={0.5} metalness={0.1} />
      </mesh>
      <mesh position={[0, 1.0, 4.97]}>
        <boxGeometry args={[14, 0.06, 0.04]} />
        <meshStandardMaterial color="#d4c8b5" roughness={0.5} metalness={0.1} />
      </mesh>
    </group>
  )
}

function Lighting() {
  const flickerRef = useRef()

  return (
    <group>
      {/* Bright ambient — key difference from before */}
      <ambientLight intensity={1.8} color="#fff8f0" />

      {/* Main ceiling lights — bright and even */}
      <pointLight position={[0, 4.2, 0]}    intensity={8}  color="#fff5e8" distance={14} decay={1.5} />
      <pointLight position={[-3.5, 4.2, -2]} intensity={5}  color="#fff5e8" distance={10} decay={1.5} />
      <pointLight position={[3.5,  4.2, -2]} intensity={5}  color="#fff5e8" distance={10} decay={1.5} />
      <pointLight position={[-3.5, 4.2,  2]} intensity={4}  color="#fff5e8" distance={10} decay={1.5} />
      <pointLight position={[3.5,  4.2,  2]} intensity={4}  color="#fff5e8" distance={10} decay={1.5} />

      {/* Dedicated spotlights per back wall frame */}
      <spotLight
        position={[-3.8, 4.3, -3.5]} target-position={[-3.8, 2, -4.9]}
        intensity={12} color="#fff8f0" angle={0.4} penumbra={0.5}
        distance={8} decay={1.5} castShadow
      />
      <spotLight
        position={[0, 4.3, -3.5]} target-position={[0, 2, -4.9]}
        intensity={14} color="#fff8f0" angle={0.4} penumbra={0.5}
        distance={8} decay={1.5} castShadow
      />
      <spotLight
        position={[3.8, 4.3, -3.5]} target-position={[3.8, 2, -4.9]}
        intensity={12} color="#fff8f0" angle={0.4} penumbra={0.5}
        distance={8} decay={1.5} castShadow
      />

      {/* Side wall spotlights */}
      <spotLight
        position={[-5.5, 4.3, -1.8]} target-position={[-6.9, 2, -1.8]}
        intensity={10} color="#fff8f0" angle={0.45} penumbra={0.5}
        distance={7} decay={1.5}
      />
      <spotLight
        position={[-5.5, 4.3,  1.8]} target-position={[-6.9, 2,  1.8]}
        intensity={10} color="#fff8f0" angle={0.45} penumbra={0.5}
        distance={7} decay={1.5}
      />
      <spotLight
        position={[5.5, 4.3, -1.8]} target-position={[6.9, 2, -1.8]}
        intensity={10} color="#fff8f0" angle={0.45} penumbra={0.5}
        distance={7} decay={1.5}
      />
      <spotLight
        position={[5.5, 4.3,  1.8]} target-position={[6.9, 2,  1.8]}
        intensity={10} color="#fff8f0" angle={0.45} penumbra={0.5}
        distance={7} decay={1.5}
      />

      {/* Soft fill from below to eliminate harsh shadows */}
      <pointLight position={[0, 0.5, 0]} intensity={2} color="#f5e8d0" distance={12} decay={2} />
    </group>
  )
}

export default function Room({ images = [], onFrameClick }) {
  return (
    <group>
      <WoodFloor />
      <Walls />
      <Lighting />

      {/* Photo Frames */}
      {WALL_SLOTS.map((slot, index) => {
        const image = images[index]
        if (!image) return null
        const size = getFrameSize(image.aspectRatio, slot.maxWidth)
        return (
          <PhotoFrame
            key={image.id}
            position={slot.position}
            rotation={slot.rotation}
            imageUrl={image.url}
            title={image.title}
            size={size}
            onClick={() => onFrameClick?.(image, index)}
          />
        )
      })}
    </group>
  )
}