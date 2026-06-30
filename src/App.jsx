import React, { Suspense, useEffect, useState, useRef } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar/Navbar.jsx'
import Footer from './components/Footer/Footer.jsx'
import Loader from './components/Loader/Loader.jsx'
import BackToTop, { ScrollRestoration } from './components/ScrollToTop/ScrollToTop.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import routes from './routes/routes.js'

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {routes.map(({ path, element: Element }) => (
          <Route
            key={path}
            path={path}
            element={
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <Element />
              </motion.div>
            }
          />
        ))}

        {/* Backward-compatible redirects for old URLs — render instantly, no fade wrapper */}
        <Route path="/" element={<Navigate to="/celebrations" replace />} />
        <Route path="/journey" element={<Navigate to="/orbit" replace />} />

        <Route
          path="*"
          element={
            <div style={{ padding: '200px 24px', textAlign: 'center' }}>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.4rem' }}>Page Not Found</h1>
              <p style={{ color: 'var(--text-soft)', marginTop: 12 }}>
                The memory you're looking for doesn't exist here.
              </p>
            </div>
          }
        />
      </Routes>
    </AnimatePresence>
  )
}

const ANIM_SELECTOR =
  '.fade-up, .fade-down, .fade-left, .fade-right, .fade-in, .zoom-in, .flip-up, .card-animate, .img-reveal, .line-grow, .gold-line, .section-title, .eyebrow, .section-sub'

function ScrollAnimationObserver() {
  const location = useLocation()

  useEffect(() => {
    let observer

    const applyInView = () => {
      document.querySelectorAll(ANIM_SELECTOR).forEach((el) => {
        const rect = el.getBoundingClientRect()
        const inViewport = rect.top < window.innerHeight && rect.bottom > 0
        if (inViewport) {
          el.classList.add('in-view')
        }
      })
    }

    const setupObserver = () => {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('in-view')
              observer.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
      )

      document.querySelectorAll(ANIM_SELECTOR).forEach((el) => {
        if (!el.classList.contains('in-view')) {
          observer.observe(el)
        }
      })
    }

    // Strip all in-view immediately on route change
    document.querySelectorAll(ANIM_SELECTOR).forEach((el) => {
      el.classList.remove('in-view')
    })

    // Wait for Framer Motion exit animation (450ms) + render buffer, then apply
    const timer1 = setTimeout(() => {
      applyInView()
      setupObserver()
    }, 500)

    // Safety net after full layout settle
    const timer2 = setTimeout(applyInView, 700)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      if (observer) observer.disconnect()
    }
  }, [location.pathname])

  return null
}

export default function App() {
  const [loading, setLoading] = useState(true)
  const [musicOn, setMusicOn] = useState(false)
  const audioRef = useRef(null)
  const location = useLocation()
  // Journey/Orbit page is a single-screen orbit experience — no footer needed there
  const hideFooter = location.pathname === '/orbit'

  useEffect(() => {
    if (!audioRef.current) return
    if (musicOn) {
      audioRef.current.play().catch(() => { })
    } else {
      audioRef.current.pause()
    }
  }, [musicOn])

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2400)
    return () => clearTimeout(timer)
  }, [])

  return (
    <ThemeProvider>
      <audio ref={audioRef} src="/music/song.mp3" loop />

      <Loader visible={loading} />
      <ScrollRestoration />
      <Navbar musicOn={musicOn} onToggleMusic={() => setMusicOn((m) => !m)} />
      <main>
        <Suspense fallback={<div style={{ minHeight: '60vh' }} />}>
          <ScrollAnimationObserver />
          <AnimatedRoutes />
        </Suspense>
      </main>
      {!hideFooter && <Footer />}
      <BackToTop />
    </ThemeProvider>
  )
}