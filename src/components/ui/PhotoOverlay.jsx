import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect } from 'react'

export default function PhotoOverlay({ image, onClose, onPrev, onNext, hasPrev, hasNext }) {
  useEffect(() => {
    if (!image) return
    const onKey = e => {
      if (e.key === 'Escape')     onClose()
      if (e.key === 'ArrowLeft'  && hasPrev) onPrev()
      if (e.key === 'ArrowRight' && hasNext) onNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [image, onClose, onPrev, onNext, hasPrev, hasNext])

  return (
    <AnimatePresence>
      {image && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="overlay-root"
          onClick={onClose}
        >
          {/* Close */}
          <button className="overlay-close" onClick={onClose}>
            <X size={20} />
          </button>

          {/* Prev */}
          {hasPrev && (
            <button
              className="overlay-nav overlay-nav-left"
              onClick={e => { e.stopPropagation(); onPrev() }}
            >
              <ChevronLeft size={24} />
            </button>
          )}

          {/* Next */}
          {hasNext && (
            <button
              className="overlay-nav overlay-nav-right"
              onClick={e => { e.stopPropagation(); onNext() }}
            >
              <ChevronRight size={24} />
            </button>
          )}

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="overlay-content"
            onClick={e => e.stopPropagation()}
          >
            <img
              src={image.fullUrl || image.url}
              alt={image.title}
              className="overlay-img"
            />
            <div className="overlay-caption">
              <span className="overlay-title">{image.title}</span>
              {image.tags?.length > 0 && (
                <span className="overlay-tags">{image.tags.join(' · ')}</span>
              )}
            </div>
          </motion.div>

          <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;1,300&family=Inter:wght@300&display=swap');

            .overlay-root {
              position: fixed;
              inset: 0;
              z-index: 200;
              background: rgba(10,8,6,0.95);
              backdrop-filter: blur(12px);
              display: flex;
              align-items: center;
              justify-content: center;
              font-family: 'Inter', sans-serif;
            }

            .overlay-close {
              position: absolute;
              top: 28px; right: 32px;
              background: none;
              border: none;
              color: #3d3028;
              cursor: pointer;
              padding: 8px;
              transition: color 0.3s;
            }
            .overlay-close:hover { color: #c9a96e; }

            .overlay-nav {
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
              background: none;
              border: none;
              color: #3d3028;
              cursor: pointer;
              padding: 16px;
              transition: color 0.3s;
            }
            .overlay-nav:hover { color: #c9a96e; }
            .overlay-nav-left  { left: 24px; }
            .overlay-nav-right { right: 24px; }

            .overlay-content {
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 20px;
              max-width: min(90vw, 1100px);
              padding: 0 80px;
            }

            .overlay-img {
              max-height: 80vh;
              max-width: 100%;
              object-fit: contain;
              display: block;
            }

            .overlay-caption {
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 6px;
            }

            .overlay-title {
              font-family: 'Cormorant Garamond', serif;
              font-size: 20px;
              font-weight: 300;
              letter-spacing: 0.12em;
              color: #8a7a68;
            }

            .overlay-tags {
              font-size: 10px;
              letter-spacing: 0.2em;
              text-transform: uppercase;
              color: #3d3028;
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  )
}