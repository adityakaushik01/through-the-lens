import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const MOVE_SPEED = 0.06
const LOOK_SENSITIVITY = 0.002

// Room bounds — keep player inside
const BOUNDS = {
  x: { min: -6.2, max: 6.2 },
  z: { min: -4.2, max: 4.2 },
}

export function useGalleryControls(enabled = true) {
  const { camera, gl } = useThree()

  const keys = useRef({})
  const yaw = useRef(0)       // left/right look
  const pitch = useRef(0)     // up/down look
  const locked = useRef(false)

  // Keyboard listeners
  useEffect(() => {
    if (!enabled) return
    const down = e => { keys.current[e.code] = true }
    const up   = e => { keys.current[e.code] = false }
    window.addEventListener('keydown', down)
    window.addEventListener('keyup', up)
    return () => {
      window.removeEventListener('keydown', down)
      window.removeEventListener('keyup', up)
    }
  }, [enabled])

  // Pointer lock — click canvas to enter
  useEffect(() => {
    if (!enabled) return
    const canvas = gl.domElement

    const requestLock = () => canvas.requestPointerLock()
    const onLockChange = () => {
      locked.current = document.pointerLockElement === canvas
    }
    const onMouseMove = e => {
      if (!locked.current) return
      yaw.current   -= e.movementX * LOOK_SENSITIVITY
      pitch.current -= e.movementY * LOOK_SENSITIVITY
      pitch.current  = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, pitch.current))
    }

    canvas.addEventListener('click', requestLock)
    document.addEventListener('pointerlockchange', onLockChange)
    document.addEventListener('mousemove', onMouseMove)

    return () => {
      canvas.removeEventListener('click', requestLock)
      document.removeEventListener('pointerlockchange', onLockChange)
      document.removeEventListener('mousemove', onMouseMove)
    }
  }, [enabled, gl])

  // Per-frame movement
  useFrame(() => {
    if (!enabled) return

    // Apply look rotation
    const euler = new THREE.Euler(pitch.current, yaw.current, 0, 'YXZ')
    camera.quaternion.setFromEuler(euler)

    // Movement direction based on yaw only (no up/down drift)
    const forward = new THREE.Vector3(-Math.sin(yaw.current), 0, -Math.cos(yaw.current))
    const right   = new THREE.Vector3(Math.cos(yaw.current), 0, -Math.sin(yaw.current))

    const k = keys.current
    if (k['KeyW'] || k['ArrowUp'])    camera.position.addScaledVector(forward, MOVE_SPEED)
    if (k['KeyS'] || k['ArrowDown'])  camera.position.addScaledVector(forward, -MOVE_SPEED)
    if (k['KeyA'] || k['ArrowLeft'])  camera.position.addScaledVector(right, -MOVE_SPEED)
    if (k['KeyD'] || k['ArrowRight']) camera.position.addScaledVector(right, MOVE_SPEED)

    // Clamp to room bounds
    camera.position.x = Math.max(BOUNDS.x.min, Math.min(BOUNDS.x.max, camera.position.x))
    camera.position.z = Math.max(BOUNDS.z.min, Math.min(BOUNDS.z.max, camera.position.z))
    camera.position.y = 1.7 // fixed eye height
  })
}