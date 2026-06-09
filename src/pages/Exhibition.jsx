import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react'
import GalleryScene from '../components/three/GalleryScene'
import GalleryHUD from '../components/ui/GalleryHUD'
import PhotoOverlay from '../components/ui/PhotoOverlay'
import { useGallery } from '../hooks/useGallery'

export default function Exhibition() {
  const {
    images,
    loading,
    error,
    page,
    totalPages,
    totalCount,
    hasNext,
    hasPrev,
    goNext,
    goPrev,
  } = useGallery()

  const [selectedImage, setSelectedImage] = useState(null)
  const [selectedIndex, setSelectedIndex] = useState(null)

  const handleFrameClick = (image, index) => {
    if (document.pointerLockElement) document.exitPointerLock()
    setSelectedImage(image)
    setSelectedIndex(index)
  }

  const handleOverlayPrev = () => {
    const i = Math.max(0, selectedIndex - 1)
    setSelectedIndex(i)
    setSelectedImage(images[i])
  }

  const handleOverlayNext = () => {
    const i = Math.min(images.length - 1, selectedIndex + 1)
    setSelectedIndex(i)
    setSelectedImage(images[i])
  }

  return (
    <div className="exhibition-root">

      {/* Loading screen */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="loading-screen"
          >
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
              className="loading-bar"
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="loading-text"
            >
              Preparing the gallery
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error */}
      {error && (
        <div className="error-screen">
          <p className="error-text">{error}</p>
        </div>
      )}

      {/* Canvas */}
      {!loading && (
        <GalleryScene images={images} onFrameClick={handleFrameClick} />
      )}

      {/* Top bar */}
      <div className="exhibition-topbar">
        <Link to="/" className="back-link">
          <ArrowLeft size={14} />
          <span>Home</span>
        </Link>
        <span className="exhibition-title">Through the Lens</span>
        {!loading && (
          <span className="photo-count">{totalCount} photographs</span>
        )}
      </div>

      {/* HUD */}
      <GalleryHUD />

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="pagination">
          <button onClick={goPrev} disabled={!hasPrev} className="page-btn">
            <ChevronLeft size={14} />
            <span>Prev</span>
          </button>

          <div className="page-dots">
            {Array.from({ length: Math.min(totalPages, 7) }).map((_, i) => (
              <div
                key={i}
                className={`page-dot ${i === page % 7 ? 'page-dot-active' : ''}`}
              />
            ))}
          </div>

          <button onClick={goNext} disabled={!hasNext} className="page-btn">
            <span>Next</span>
            <ChevronRight size={14} />
          </button>
        </div>
      )}

      {/* Photo zoom overlay */}
      <PhotoOverlay
        image={selectedImage}
        onClose={() => setSelectedImage(null)}
        onPrev={handleOverlayPrev}
        onNext={handleOverlayNext}
        hasPrev={selectedIndex > 0}
        hasNext={selectedIndex < images.length - 1}
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=Inter:wght@300;400&display=swap');

        .exhibition-root {
          width: 100vw;
          height: 100vh;
          background: #0a0806;
          position: relative;
          overflow: hidden;
          font-family: 'Inter', sans-serif;
        }

        /* Loading */
        .loading-screen {
          position: absolute;
          inset: 0;
          z-index: 50;
          background: #0a0806;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 32px;
        }
        .loading-bar {
          width: 200px;
          height: 1px;
          background: #c9a96e;
          transform-origin: left;
        }
        .loading-text {
          font-size: 10px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #3d3028;
        }

        /* Error */
        .error-screen {
          position: absolute;
          inset: 0;
          z-index: 50;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .error-text {
          font-size: 13px;
          letter-spacing: 0.1em;
          color: #6b5a45;
        }

        /* Top bar */
        .exhibition-topbar {
          position: absolute;
          top: 0; left: 0; right: 0;
          z-index: 20;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 24px 36px;
          background: linear-gradient(to bottom, rgba(10,8,6,0.85), transparent);
          pointer-events: none;
        }
        .exhibition-topbar > * { pointer-events: all; }

        .back-link {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #6b5a45;
          text-decoration: none;
          transition: color 0.3s;
        }
        .back-link:hover { color: #c9a96e; }

        .exhibition-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 18px;
          font-weight: 300;
          letter-spacing: 0.15em;
          color: #3d3028;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
        }

        .photo-count {
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #3d3028;
        }

        /* Pagination */
        .pagination {
          position: absolute;
          bottom: 32px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 20;
          display: flex;
          align-items: center;
          gap: 24px;
          pointer-events: all;
        }
        .page-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #6b5a45;
          background: none;
          border: none;
          cursor: pointer;
          transition: color 0.3s;
          padding: 8px 0;
        }
        .page-btn:hover:not(:disabled) { color: #c9a96e; }
        .page-btn:disabled { opacity: 0.2; cursor: not-allowed; }

        .page-dots {
          display: flex;
          gap: 6px;
          align-items: center;
        }
        .page-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #3d3028;
          transition: background 0.3s, transform 0.3s;
        }
        .page-dot-active {
          background: #c9a96e;
          transform: scale(1.4);
        }
      `}</style>
    </div>
  )
}