import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const PREVIEW_IMAGES = [
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
  'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=600&q=80',
  'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=600&q=80',
]

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0 },
}

export default function Home() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0])
  const heroY       = useTransform(scrollYProgress, [0, 0.25], [0, -60])

  return (
    <div ref={containerRef} className="home-root">

      {/* ── Navbar ── */}
      <nav className="nav">
        <span className="nav-logo">AK</span>
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/exhibition" className="nav-link">Gallery</Link>
          <a href="#about" className="nav-link">About</a>
        </div>
      </nav>

      {/* ── Hero ── */}
      <motion.section
        className="hero"
        style={{ opacity: heroOpacity, y: heroY }}
      >
        <motion.div
          className="hero-eyebrow"
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Visual Stories by Aditya Kumar
        </motion.div>

        <motion.h1
          className="hero-title"
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ duration: 1, delay: 0.3 }}
        >
          <span className="title-solid">THROUGH</span>
          <br />
          <span className="title-outline">THE LENS</span>
        </motion.h1>

        <motion.p
          className="hero-sub"
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.9, delay: 0.6 }}
        >
          Portraits. Landscapes. Streets. Wildlife.<br />
          Every frame, a moment held still.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <Link to="/exhibition" className="cta-btn">
            <span>Enter Gallery</span>
            <ArrowRight size={16} className="cta-icon" />
          </Link>
        </motion.div>

        <motion.div
          className="hero-scroll-hint"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <span className="scroll-line" />
          <span>Scroll</span>
        </motion.div>
      </motion.section>

      {/* ── Preview Strip ── */}
      <section className="preview-section">
        <motion.div
          className="preview-label"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          Selected Works
        </motion.div>

        <div className="preview-grid">
          {PREVIEW_IMAGES.map((url, i) => (
            <motion.div
              key={i}
              className="preview-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
            >
              <img src={url} alt="" className="preview-img" />
              <div className="preview-overlay" />
            </motion.div>
          ))}
        </div>

        <motion.div
          className="preview-cta"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Link to="/exhibition" className="text-link">
            View all photographs <ArrowRight size={14} className="inline-arrow" />
          </Link>
        </motion.div>
      </section>

      {/* ── About Strip ── */}
      <section className="about-section" id="about">
        <motion.div
          className="about-inner"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <div className="about-left">
            <span className="about-eyebrow">The Photographer</span>
            <h2 className="about-name">Aditya Kumar</h2>
          </div>
          <div className="about-right">
            <p className="about-text">
              Based in India, I chase light across cities, forests, and faces.
              My work sits at the intersection of documentary honesty and
              cinematic mood — images that feel both immediate and timeless.
            </p>
            <p className="about-text about-text-muted">
              Available for portrait sessions, editorial projects, and travel assignments.
            </p>
          </div>
        </motion.div>
      </section>

      {/* ── Footer ── */}
      <footer className="footer">
        <span className="footer-logo">AK</span>
        <span className="footer-copy">© 2026 Aditya Kumar. All rights reserved.</span>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=Inter:wght@300;400;500&display=swap');

        .home-root {
          background: #0a0806;
          color: #f0ebe3;
          font-family: 'Inter', sans-serif;
          min-height: 100vh;
          overflow-x: hidden;
        }

        /* Navbar */
        .nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 24px 48px;
          background: linear-gradient(to bottom, rgba(10,8,6,0.9), transparent);
        }
        .nav-logo {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px;
          font-weight: 600;
          letter-spacing: 0.2em;
          color: #c9a96e;
        }
        .nav-links {
          display: flex;
          gap: 36px;
        }
        .nav-link {
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #8a7a68;
          text-decoration: none;
          transition: color 0.3s;
        }
        .nav-link:hover { color: #f0ebe3; }

        /* Hero */
        .hero {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 0 48px;
          position: relative;
        }
        .hero-eyebrow {
          font-size: 11px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #c9a96e;
          margin-bottom: 28px;
        }
        .hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(72px, 12vw, 160px);
          font-weight: 300;
          line-height: 0.92;
          letter-spacing: -0.01em;
          margin-bottom: 36px;
        }
        .title-solid {
          color: #f0ebe3;
        }
        .title-outline {
          -webkit-text-stroke: 1px #c9a96e;
          color: transparent;
        }
        .hero-sub {
          font-size: 15px;
          font-weight: 300;
          color: #6b5a45;
          line-height: 1.8;
          letter-spacing: 0.04em;
          margin-bottom: 48px;
          max-width: 340px;
        }

        /* CTA Button */
        .cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 16px 36px;
          border: 1px solid #c9a96e;
          color: #c9a96e;
          text-decoration: none;
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          position: relative;
          overflow: hidden;
          transition: color 0.4s;
        }
        .cta-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #c9a96e;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .cta-btn:hover::before { transform: scaleX(1); }
        .cta-btn:hover { color: #0a0806; }
        .cta-btn span, .cta-icon { position: relative; z-index: 1; }

        /* Scroll hint */
        .hero-scroll-hint {
          position: absolute;
          bottom: 40px;
          left: 48px;
          display: flex;
          align-items: center;
          gap: 16px;
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #3d3028;
        }
        .scroll-line {
          display: block;
          width: 40px;
          height: 1px;
          background: #3d3028;
        }

        /* Preview section */
        .preview-section {
          padding: 120px 48px;
        }
        .preview-label {
          font-size: 10px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #c9a96e;
          margin-bottom: 48px;
        }
        .preview-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr;
          gap: 2px;
          margin-bottom: 40px;
        }
        .preview-card {
          position: relative;
          overflow: hidden;
          aspect-ratio: 3/4;
          cursor: pointer;
        }
        .preview-card:first-child {
          aspect-ratio: 2/3;
          grid-row: span 1;
        }
        .preview-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: grayscale(20%) brightness(0.75);
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), filter 0.5s;
        }
        .preview-card:hover .preview-img {
          transform: scale(1.06);
          filter: grayscale(0%) brightness(0.9);
        }
        .preview-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(10,8,6,0.5) 0%, transparent 60%);
        }
        .preview-cta {
          text-align: right;
        }
        .text-link {
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #6b5a45;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: color 0.3s;
        }
        .text-link:hover { color: #c9a96e; }
        .inline-arrow { display: inline; }

        /* About */
        .about-section {
          padding: 100px 48px;
          border-top: 1px solid #1a1410;
        }
        .about-inner {
          display: grid;
          grid-template-columns: 1fr 1.6fr;
          gap: 80px;
          align-items: start;
          max-width: 900px;
        }
        .about-eyebrow {
          font-size: 10px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #c9a96e;
          display: block;
          margin-bottom: 16px;
        }
        .about-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 48px;
          font-weight: 300;
          color: #f0ebe3;
          line-height: 1.1;
        }
        .about-text {
          font-size: 15px;
          font-weight: 300;
          color: #8a7a68;
          line-height: 1.9;
          margin-bottom: 20px;
        }
        .about-text-muted { color: #4a3d32; }

        /* Footer */
        .footer {
          padding: 40px 48px;
          border-top: 1px solid #1a1410;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .footer-logo {
          font-family: 'Cormorant Garamond', serif;
          font-size: 18px;
          font-weight: 600;
          letter-spacing: 0.2em;
          color: #3d3028;
        }
        .footer-copy {
          font-size: 11px;
          letter-spacing: 0.1em;
          color: #3d3028;
        }

        @media (max-width: 768px) {
          .nav { padding: 20px 24px; }
          .nav-links { gap: 20px; }
          .hero { padding: 0 24px; }
          .preview-section { padding: 80px 24px; }
          .preview-grid { grid-template-columns: 1fr; }
          .about-section { padding: 80px 24px; }
          .about-inner { grid-template-columns: 1fr; gap: 40px; }
          .footer { padding: 32px 24px; flex-direction: column; gap: 12px; text-align: center; }
          .hero-scroll-hint { left: 24px; }
        }
      `}</style>
    </div>
  )
}