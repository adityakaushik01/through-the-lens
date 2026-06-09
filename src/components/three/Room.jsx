import PhotoFrame from './PhotoFrame'
import { getFrameSize } from '../../services/cloudinary'

// Wall position configs — 8 slots around the room
// Each slot has a position, rotation, and max frame width
const WALL_SLOTS = [
  // Back wall — 3 frames
  { position: [-3.8, 2.1, -4.92], rotation: [0, 0, 0],              maxWidth: 2.2 },
  { position: [0,    2.1, -4.92], rotation: [0, 0, 0],              maxWidth: 2.2 },
  { position: [3.8,  2.1, -4.92], rotation: [0, 0, 0],              maxWidth: 2.2 },

  // Left wall — 2 frames
  { position: [-6.92, 2.1, -2],   rotation: [0, Math.PI / 2, 0],   maxWidth: 2.0 },
  { position: [-6.92, 2.1,  1.5], rotation: [0, Math.PI / 2, 0],   maxWidth: 2.0 },

  // Right wall — 2 frames
  { position: [6.92,  2.1, -2],   rotation: [0, -Math.PI / 2, 0],  maxWidth: 2.0 },
  { position: [6.92,  2.1,  1.5], rotation: [0, -Math.PI / 2, 0],  maxWidth: 2.0 },

  // Front wall — 1 frame (behind the viewer, visible when you turn around)
  { position: [0, 2.1, 4.92],     rotation: [0, Math.PI, 0],        maxWidth: 2.2 },
]

export default function Room({ images = [], onFrameClick }) {
  return (
    <group>
      {/* ─── Surfaces ─── */}

      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[14, 10]} />
        <meshStandardMaterial color="#1a1614" roughness={0.95} />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 4, 0]}>
        <planeGeometry args={[14, 10]} />
        <meshStandardMaterial color="#0f0f0f" roughness={1} />
      </mesh>

      <mesh position={[0, 2, -5]}>
        <planeGeometry args={[14, 4]} />
        <meshStandardMaterial color="#1c1917" roughness={0.85} />
      </mesh>

      <mesh rotation={[0, Math.PI, 0]} position={[0, 2, 5]}>
        <planeGeometry args={[14, 4]} />
        <meshStandardMaterial color="#1c1917" roughness={0.85} />
      </mesh>

      <mesh rotation={[0, Math.PI / 2, 0]} position={[-7, 2, 0]}>
        <planeGeometry args={[10, 4]} />
        <meshStandardMaterial color="#1c1917" roughness={0.85} />
      </mesh>

      <mesh rotation={[0, -Math.PI / 2, 0]} position={[7, 2, 0]}>
        <planeGeometry args={[10, 4]} />
        <meshStandardMaterial color="#1c1917" roughness={0.85} />
      </mesh>

      {/* ─── Lighting ─── */}

      <ambientLight intensity={0.12} />

      {/* Back wall spots */}
      <pointLight position={[-3.8, 3.8, -4.5]} intensity={5} color="#ffe8b0" distance={6} decay={2} />
      <pointLight position={[0,    3.8, -4.5]} intensity={5} color="#ffe8b0" distance={6} decay={2} />
      <pointLight position={[3.8,  3.8, -4.5]} intensity={5} color="#ffe8b0" distance={6} decay={2} />

      {/* Side wall spots */}
      <pointLight position={[-6.5, 3.8, -2]}   intensity={4} color="#ffe8b0" distance={5} decay={2} />
      <pointLight position={[-6.5, 3.8,  1.5]} intensity={4} color="#ffe8b0" distance={5} decay={2} />
      <pointLight position={[6.5,  3.8, -2]}   intensity={4} color="#ffe8b0" distance={5} decay={2} />
      <pointLight position={[6.5,  3.8,  1.5]} intensity={4} color="#ffe8b0" distance={5} decay={2} />

      {/* Center ambient fill */}
      <pointLight position={[0, 3.5, 0]} intensity={1.5} color="#fff5e8" distance={12} decay={2} />

      {/* ─── Photo Frames ─── */}

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
            onClick={() => onFrameClick?.(image)}
          />
        )
      })}
    </group>
  )
}