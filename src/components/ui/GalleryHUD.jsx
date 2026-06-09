import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function GalleryHUD() {
  const [locked, setLocked] = useState(false)
  const [showHint, setShowHint] = useState(true)

  useEffect(() => {
    const onChange = () => {
      const isLocked = !!document.pointerLockElement
      setLocked(isLocked)
      if (isLocked) setShowHint(false)
    }
    document.addEventListener('pointerlockchange', onChange)
    return () => document.removeEventListener('pointerlockchange', onChange)
  }, [])

  return (
    <div className="hud-root">

      {/* Click to enter */}
      <AnimatePresence>
        {showHint && !locked && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="hud-enter"
          >
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="hud-enter-box"
            >
              <p className="hud-enter-title">Click to enter</p>
              <div className="hud-divider" />
              <div className="hud-controls">
                <span className="hud-key">W A S D</span>
                <span className="hud-key-label">Move</span>
                <span className="hud-key">Mouse</span>
                <span className="hud-key-label">Look</span>
                <span className="hud-key">Click frame</span>
                <span className="hud-key-label">View photo</span>
                <span className="hud-key">ESC</span>
                <span className="hud-key-label">Exit</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Crosshair when locked */}
      {locked && (
        <div className="hud-crosshair">
          <div className="crosshair-dot" />
        </div>
      )}

      {/* ESC reminder */}
      <AnimatePresence>
        {locked && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="hud-esc"
          >
            Press ESC to exit
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300&family=Inter:wght@300;400&display=swap');

        .hud-root {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 10;
          font-family: 'Inter', sans-serif;
        }

        .hud-enter {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(10,8,6,0.45);
          backdrop-filter: blur(2px);
        }

        .hud-enter-box {
          border: 1px solid rgba(201,169,110,0.25);
          padding: 36px 48px;
          text-align: center;
          background: rgba(10,8,6,0.7);
        }

        .hud-enter-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 28px;
          font-weight: 300;
          letter-spacing: 0.15em;
          color: #f0ebe3;
          margin-bottom: 20px;
        }

        .hud-divider {
          width: 40px;
          height: 1px;
          background: rgba(201,169,110,0.3);
          margin: 0 auto 20px;
        }

        .hud-controls {
          display: grid;
          grid-template-columns: auto auto;
          gap: 8px 20px;
          align-items: center;
          justify-content: center;
        }

        .hud-key {
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #c9a96e;
          text-align: right;
        }

        .hud-key-label {
          font-size: 10px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #3d3028;
          text-align: left;
        }

        .hud-crosshair {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .crosshair-dot {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: rgba(201,169,110,0.5);
        }

        .hud-esc {
          position: absolute;
          bottom: 80px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 10px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #3d3028;
          white-space: nowrap;
        }
      `}</style>
    </div>
  )
}