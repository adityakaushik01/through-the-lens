import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import Room from './Room'
import { useGalleryControls } from '../../hooks/useGalleryControls'

function Controls() {
  useGalleryControls(true)
  return null
}

export default function GalleryScene({ images = [], onFrameClick }) {
  return (
    <Canvas
      camera={{ position: [0, 1.7, 4], fov: 75 }}
      gl={{ antialias: true, toneMapping: 4, toneMappingExposure: 1.2 }}
    >
      <color attach="background" args={['#0d0d0d']} />
      <Controls />
      <Suspense fallback={null}>
        <Room images={images} onFrameClick={onFrameClick} />
      </Suspense>
    </Canvas>
  )
}