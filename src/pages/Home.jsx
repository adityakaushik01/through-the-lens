import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'

const BG_IMAGES = [
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1800&q=90',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1800&q=90',
  'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=1800&q=90',
  'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1800&q=90',
]

const PREVIEW = [
  { url: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=700&q=85', label: 'Wildlife' },
  { url: 'https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=700&q=85', label: 'Landscape' },
  { url: 'https://images.unsplash.com/photo-1510784722466-f2aa240c0088?w=700&q=85', label: 'Portraits' },
  { url: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=700&q=85', label: 'Travel' },
]

export default function Home() {
  const [bgIndex, setBgIndex] = useState(0)
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef })
  const heroScale   = useTransform(scrollYProgress, [0, 1], [1, 1.12])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const textY       = useTransform(scrollYProgress, [0, 0.5], [0, -80])

  // Auto-cycle hero background
  useEffect(() => {
  BG_IMAGES.forEach((src) => {
    const img = new Image()
    img.src = src
  })

  const t = setInterval(() => {
    setBgIndex((i) => (i + 1) % BG_IMAGES.length)
  }, 5000)

  return () => clearInterval(t)
}, [])

  return (
    <div style={styles.root}>

      {/* ── Navbar ── */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={styles.nav}
      >
        <div style={styles.navLogo}>
          <span style={styles.navLogoText}>AK</span>
          <span style={styles.navLogoSub}>Photography</span>
        </div>
        <div style={styles.navLinks}>
          {['Home', 'Gallery', 'About'].map((item, i) => (
            <motion.div key={item} whileHover={{ y: -1 }} transition={{ duration: 0.2 }}>
              {item === 'Gallery'
                ? <Link to="/exhibition" style={styles.navLink}>{item}</Link>
                : <a href={item === 'About' ? '#about' : '/'} style={styles.navLink}>{item}</a>
              }
            </motion.div>
          ))}
          <Link to="/exhibition">
            <motion.button
              whileHover={{ scale: 1.03, backgroundColor: '#2d5a27' }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
              style={styles.navCta}
            >
              Enter Gallery
            </motion.button>
          </Link>
        </div>
      </motion.nav>

      {/* ── Hero ── */}
      <section ref={heroRef} style={styles.hero}>
        {/* Background layers */}
        <div style={styles.heroBg}>
  {BG_IMAGES.map((src, index) => (
    <motion.img
      key={src}
      src={src}
      animate={{
        opacity: index === bgIndex ? 1 : 0,
        scale: index === bgIndex ? 1.05 : 1,
      }}
      transition={{
        opacity: { duration: 1.5 },
        scale: { duration: 5 },
      }}
      style={{
        ...styles.heroBgImg,
        position: 'absolute',
      }}
    />
  ))}

  <div style={styles.heroOverlay} />
</div>

        {/* Hero content */}
        <motion.div style={{ ...styles.heroContent, y: textY, opacity: heroOpacity }}>
          <motion.span
            initial={{ opacity: 0, letterSpacing: '0.5em' }}
            animate={{ opacity: 1, letterSpacing: '0.25em' }}
            transition={{ duration: 1.2, delay: 0.5 }}
            style={styles.heroEyebrow}
          >
            Aditya Kaushik · Visual Stories
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={styles.heroTitle}
          >
            Where Nature<br />
            <span style={styles.heroTitleAccent}>Speaks in Frames</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.0 }}
            style={styles.heroSub}
          >
            200+ photographs from across India.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            style={styles.heroCtas}
          >
            <Link to="/exhibition" style={{ textDecoration: 'none' }}>
              <motion.button
                whileHover={{ scale: 1.04, backgroundColor: '#3a7a32' }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.25 }}
                style={styles.primaryBtn}
              >
                Enter 3D Gallery
                <ArrowRight size={16} />
              </motion.button>
            </Link>
            <motion.a
              href="#work"
              whileHover={{ color: '#ffffff' }}
              transition={{ duration: 0.2 }}
              style={styles.secondaryBtn}
            >
              View Work
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
          style={styles.scrollCue}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          >
            <ChevronDown size={22} color="rgba(255,255,255,0.4)" />
          </motion.div>
        </motion.div>

        {/* Slide counter */}
        <div style={styles.slideCounter}>
          {BG_IMAGES.map((_, i) => (
            <motion.div
              key={i}
              animate={{ scaleX: i === bgIndex ? 1 : 0.3, opacity: i === bgIndex ? 1 : 0.3 }}
              transition={{ duration: 0.4 }}
              style={styles.slideDot}
            />
          ))}
        </div>
      </section>

      {/* ── Stats bar ── */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        style={styles.statsBar}
      >
        {[
          { num: '200+', label: 'Photographs' },
          { num: '5+', label: 'Years of Shooting' },
          { num: '∞', label: 'Moments Captured' },
          { num: '3D', label: 'Virtual Gallery' },
        ].map((s, i) => (
          <div key={i} style={styles.statItem}>
            <span style={styles.statNum}>{s.num}</span>
            <span style={styles.statLabel}>{s.label}</span>
          </div>
        ))}
      </motion.section>

      {/* ── Work Grid ── */}
      <section id="work" style={styles.workSection}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={styles.sectionHeader}
        >
          <span style={styles.sectionEyebrow}>Selected Work</span>
          <h2 style={styles.sectionTitle}>Stories Through the Lens</h2>
        </motion.div>

        <div style={styles.workGrid}>
          {PREVIEW.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.12 }}
              whileHover="hover"
              style={{
                ...styles.workCard,
                gridColumn: i === 0 ? 'span 2' : 'span 1',
                gridRow: i === 0 ? 'span 2' : 'span 1',
              }}
            >
              <motion.img
                src={item.url}
                alt={item.label}
                variants={{ hover: { scale: 1.07 } }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                style={styles.workImg}
              />
              <motion.div
                variants={{ hover: { opacity: 1 } }}
                initial={{ opacity: 0 }}
                style={styles.workCardOverlay}
              >
                <span style={styles.workCardLabel}>{item.label}</span>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={styles.workCta}
        >
          <Link to="/exhibition" style={{ textDecoration: 'none' }}>
            <motion.button
              whileHover={{ scale: 1.03, gap: '16px' }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
              style={styles.outlineBtn}
            >
              Explore Full Gallery <ArrowRight size={15} />
            </motion.button>
          </Link>
        </motion.div>
      </section>

      {/* ── About ── */}
      <section id="about" style={styles.aboutSection}>
        <div style={styles.aboutInner}>
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            style={styles.aboutLeft}
          >
            <span style={styles.sectionEyebrow}>The Photographer</span>
            <h2 style={styles.aboutName}>Aditya<br />Kaushik</h2>
            <div style={styles.aboutDivider} />
            <p style={styles.aboutText}>
              Based in India, I find extraordinary moments in ordinary nature.
              From the misty mountains of the Himalayas to the bustling streets
              of Delhi — every frame tells a story that words cannot.
            </p>
            <p style={styles.aboutTextMuted}>
              Available for portrait sessions, editorial, and travel assignments.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15 }}
            style={styles.aboutRight}
          >
            <img
              src="https://res.cloudinary.com/dk6p6ryoo/image/upload/v1781027909/PSX_20230930_214104_copy_azavdq.jpg"
              alt="Aditya Kaushik"
              style={styles.aboutImg}
            />
            <div style={styles.aboutImgAccent} />
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={styles.footer}>
        <span style={styles.footerLogo}>Aditya Kaushik Photography</span>
        <span style={styles.footerCopy}>© 2026 Aditya Kaushik. All rights reserved.</span>
        <Link to="/exhibition" style={styles.footerLink}>Enter Gallery →</Link>
      </footer>
    </div>
  )
}

const styles = {
  root: {
    background: '#0d0f0a',
    color: '#f5f2ec',
    fontFamily: "'Inter', sans-serif",
    minHeight: '100vh',
    overflowX: 'hidden',
  },

  // Nav
  nav: {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '20px 48px',
    background: 'linear-gradient(to bottom, rgba(13,15,10,0.85) 0%, transparent 100%)',
    backdropFilter: 'blur(0px)',
  },
  navLogo: { display: 'flex', flexDirection: 'column', lineHeight: 1 },
  navLogoText: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '26px', fontWeight: 600,
    color: '#a8d5a0', letterSpacing: '0.1em',
  },
  navLogoSub: {
    fontSize: '9px', letterSpacing: '0.3em',
    textTransform: 'uppercase', color: '#5a7a54', marginTop: '2px',
  },
  navLinks: { display: 'flex', alignItems: 'center', gap: '32px' },
  navLink: {
    fontSize: '11px', letterSpacing: '0.15em',
    textTransform: 'uppercase', color: 'rgba(245,242,236,0.6)',
    textDecoration: 'none', transition: 'color 0.3s',
  },
  navCta: {
    background: '#2d5a27', color: '#f5f2ec',
    border: 'none', padding: '10px 22px',
    fontSize: '11px', letterSpacing: '0.12em',
    textTransform: 'uppercase', cursor: 'pointer',
    borderRadius: '2px', transition: 'all 0.3s',
  },

  // Hero
  hero: {
    height: '100vh', position: 'relative',
    display: 'flex', alignItems: 'center',
    overflow: 'hidden',
  },
  heroBg: {
    position: 'absolute', inset: 0, overflow: 'hidden',
  },
  heroBgImg: {
    position: 'absolute', inset: 0,
    width: '100%', height: '100%', objectFit: 'cover',
  },
  heroOverlay: {
    position: 'absolute', inset: 0,
    background: 'linear-gradient(135deg, rgba(13,15,10,0.75) 0%, rgba(13,15,10,0.3) 50%, rgba(13,15,10,0.6) 100%)',
  },
  heroContent: {
    position: 'relative', zIndex: 2,
    padding: '0 8vw',
    maxWidth: '700px',
  },
  heroEyebrow: {
    display: 'block',
    fontSize: '11px', letterSpacing: '0.25em',
    textTransform: 'uppercase',
    color: '#a8d5a0', marginBottom: '24px',
  },
  heroTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 'clamp(52px, 8vw, 110px)',
    fontWeight: 300, lineHeight: 1.0,
    color: '#ffffff', marginBottom: '24px',
    letterSpacing: '-0.01em',
  },
  heroTitleAccent: {
    color: '#a8d5a0',
    fontStyle: 'italic',
  },
  heroSub: {
    fontSize: '15px', fontWeight: 300,
    color: 'rgba(245,242,236,0.6)',
    lineHeight: 1.7, marginBottom: '44px',
    letterSpacing: '0.02em',
  },
  heroCtas: { display: 'flex', gap: '20px', alignItems: 'center' },
  primaryBtn: {
    display: 'flex', alignItems: 'center', gap: '10px',
    background: '#2d5a27', color: '#f5f2ec',
    border: 'none', padding: '16px 32px',
    fontSize: '13px', letterSpacing: '0.08em',
    cursor: 'pointer', borderRadius: '2px',
    fontFamily: "'Inter', sans-serif",
  },
  secondaryBtn: {
    fontSize: '12px', letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: 'rgba(245,242,236,0.5)',
    textDecoration: 'none', transition: 'color 0.3s',
  },
  scrollCue: {
    position: 'absolute', bottom: '36px',
    left: '50%', transform: 'translateX(-50%)',
    zIndex: 2,
  },
  slideCounter: {
    position: 'absolute', bottom: '40px', right: '48px',
    display: 'flex', gap: '8px', alignItems: 'center', zIndex: 2,
  },
  slideDot: {
    height: '2px', width: '28px',
    background: 'rgba(168,213,160,0.8)',
    borderRadius: '2px', transformOrigin: 'left',
  },

  // Stats
  statsBar: {
    display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
    borderTop: '1px solid rgba(255,255,255,0.06)',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
  },
  statItem: {
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    padding: '40px 20px', gap: '8px',
    borderRight: '1px solid rgba(255,255,255,0.06)',
  },
  statNum: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '44px', fontWeight: 300, color: '#a8d5a0',
    lineHeight: 1,
  },
  statLabel: {
    fontSize: '10px', letterSpacing: '0.2em',
    textTransform: 'uppercase', color: '#3d5038',
  },

  // Work
  workSection: { padding: '100px 48px' },
  sectionHeader: { marginBottom: '56px' },
  sectionEyebrow: {
    display: 'block', fontSize: '10px',
    letterSpacing: '0.3em', textTransform: 'uppercase',
    color: '#5a7a54', marginBottom: '12px',
  },
  sectionTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 'clamp(32px, 4vw, 52px)',
    fontWeight: 300, color: '#f5f2ec',
    lineHeight: 1.15, margin: 0,
  },
  workGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridTemplateRows: 'auto',
    gap: '3px',
    marginBottom: '48px',
  },
  workCard: {
    position: 'relative', overflow: 'hidden',
    aspectRatio: '4/3', cursor: 'pointer',
    background: '#1a1f17',
  },
  workImg: {
    width: '100%', height: '100%',
    objectFit: 'cover', display: 'block',
    filter: 'brightness(0.88)',
    transition: 'filter 0.5s',
  },
  workCardOverlay: {
    position: 'absolute', inset: 0,
    background: 'linear-gradient(to top, rgba(13,15,10,0.7) 0%, transparent 60%)',
    display: 'flex', alignItems: 'flex-end',
    padding: '24px',
  },
  workCardLabel: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '22px', fontWeight: 300,
    color: '#f5f2ec', letterSpacing: '0.05em',
  },
  workCta: { textAlign: 'center' },
  outlineBtn: {
    display: 'inline-flex', alignItems: 'center', gap: '10px',
    background: 'transparent',
    border: '1px solid rgba(168,213,160,0.35)',
    color: '#a8d5a0', padding: '14px 32px',
    fontSize: '12px', letterSpacing: '0.1em',
    textTransform: 'uppercase', cursor: 'pointer',
    borderRadius: '2px', fontFamily: "'Inter', sans-serif",
    transition: 'all 0.3s',
  },

  // About
  aboutSection: {
    padding: '100px 48px',
    background: 'linear-gradient(135deg, #0d0f0a 0%, #111a0d 100%)',
    borderTop: '1px solid rgba(255,255,255,0.04)',
  },
  aboutInner: {
    display: 'grid', gridTemplateColumns: '1fr 1fr',
    gap: '80px', alignItems: 'center',
    maxWidth: '1100px', margin: '0 auto',
  },
  aboutLeft: {},
  aboutName: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 'clamp(48px, 6vw, 80px)',
    fontWeight: 300, color: '#f5f2ec',
    lineHeight: 1.0, margin: '16px 0 28px',
  },
  aboutDivider: {
    width: '48px', height: '2px',
    background: '#a8d5a0', marginBottom: '28px',
  },
  aboutText: {
    fontSize: '15px', fontWeight: 300,
    color: 'rgba(245,242,236,0.6)',
    lineHeight: 1.9, marginBottom: '16px',
  },
  aboutTextMuted: {
    fontSize: '13px', fontWeight: 300,
    color: '#3d5038', lineHeight: 1.8,
  },
  aboutRight: { position: 'relative' },
  aboutImg: {
    width: '100%', aspectRatio: '4/5',
    objectFit: 'cover', display: 'block',
    filter: 'brightness(0.85) saturate(1.1)',
  },
  aboutImgAccent: {
    position: 'absolute', top: '16px', left: '16px', right: '-16px', bottom: '-16px',
    border: '1px solid rgba(168,213,160,0.2)',
    zIndex: -1, pointerEvents: 'none',
  },

  // Footer
  footer: {
    padding: '32px 48px',
    borderTop: '1px solid rgba(255,255,255,0.05)',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
  },
  footerLogo: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '16px', color: '#3d5038', letterSpacing: '0.1em',
  },
  footerCopy: { fontSize: '11px', color: '#2a3527', letterSpacing: '0.05em' },
  footerLink: {
    fontSize: '11px', color: '#5a7a54',
    textDecoration: 'none', letterSpacing: '0.1em',
  },
}