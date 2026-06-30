import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX, FiSun, FiMoon, FiMusic, FiVolume2 } from 'react-icons/fi'
import { useTheme } from '../../context/ThemeContext.jsx'
import './Navbar.css'

const links = [
  { to: '/', label: 'Home' },
  { to: '/celebrations', label: 'Celebrations' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/videos', label: 'Videos' },
  { to: '/orbit', label: 'Orbit' },
]

export default function Navbar({ musicOn, onToggleMusic }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  const transparent = isHome && !scrolled

  return (
    <motion.header
      className={`navbar ${scrolled ? 'navbar--scrolled' : ''} ${!isHome ? 'navbar--page' : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Decorative top border */}
      <motion.div
        className="navbar__top-border"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      />

      <div className="container navbar__inner">
        {/* Logo */}
        <NavLink to="/" className="navbar__logo" onClick={() => setOpen(false)}>
          <motion.span
            className="navbar__logo-mono"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            A
          </motion.span>
          <motion.span
            className="navbar__logo-amp"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            &amp;
          </motion.span>
          <motion.span
            className="navbar__logo-mono"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            M
          </motion.span>
        </NavLink>

        {/* Desktop links */}
        <nav className="navbar__links navbar__links--desktop" aria-label="Primary">
          {links.map((l, i) => (
            <motion.div
              key={l.to}
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
            >
              <NavLink
                to={l.to}
                className={({ isActive }) =>
                  'navbar__link' + (isActive ? ' navbar__link--active' : '')
                }
              >
                {l.label}
              </NavLink>
            </motion.div>
          ))}
        </nav>

        {/* Actions */}
        <motion.div
          className="navbar__actions"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <button
            className="navbar__icon-btn"
            onClick={onToggleMusic}
            aria-label="Toggle background music"
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={musicOn ? 'vol' : 'music'}
                initial={{ scale: 0, rotate: -30 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 30 }}
                transition={{ duration: 0.25 }}
              >
                {musicOn ? <FiVolume2 /> : <FiMusic />}
              </motion.span>
            </AnimatePresence>
          </button>

          <button
            className="navbar__icon-btn"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={theme}
                initial={{ scale: 0, rotate: -60 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 60 }}
                transition={{ duration: 0.3 }}
              >
                {theme === 'light' ? <FiMoon /> : <FiSun />}
              </motion.span>
            </AnimatePresence>
          </button>

          <button
            className="navbar__hamburger"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={open ? 'close' : 'open'}
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 90 }}
                transition={{ duration: 0.25 }}
              >
                {open ? <FiX /> : <FiMenu />}
              </motion.span>
            </AnimatePresence>
          </button>
        </motion.div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="navbar__mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="navbar__mobile-inner">
              {/* Decorative divider */}
              <motion.div
                className="navbar__mobile-divider"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              />

              {links.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: 0.06 * i, duration: 0.35 }}
                >
                  <NavLink
                    to={l.to}
                    className={({ isActive }) =>
                      'navbar__mobile-link' + (isActive ? ' navbar__link--active' : '')
                    }
                    onClick={() => setOpen(false)}
                  >
                    <span className="navbar__mobile-link-text">{l.label}</span>
                    <span className="navbar__mobile-link-dot" />
                  </NavLink>
                </motion.div>
              ))}

              {/* Bottom ornament */}
              <motion.div
                className="navbar__mobile-ornament"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
              >
                ✦ A &amp; M ✦
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}