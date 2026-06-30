import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMaximize } from 'react-icons/fi'
import { useSearchParams } from 'react-router-dom'
import photosData, { categories } from '../../data/photos.js'
import PhotoModal from '../PhotoModal/PhotoModal.jsx'
import './Gallery.css'

const PAGE_SIZE = 8

const categoryLabels = {
  All: 'All',
  Tilak: '💐 Tilak 💐',
  Haldi: '💛 Haldi 💛',
  Puja: '🪔 Puja 🪔',
  Mehendi: '🌿 Mehendi 🌿',
  Wedding: '👰 Wedding 👰',
}

export default function Gallery() {
  const [searchParams, setSearchParams] = useSearchParams()
  const categoryFromUrl = searchParams.get('category')
  const initialCategory = categories.includes(categoryFromUrl) ? categoryFromUrl : 'All'

  const [activeCategory, setActiveCategoryState] = useState(initialCategory)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [modalIndex, setModalIndex] = useState(null)
  const [fullScreen, setFullScreen] = useState(false)
  const sentinelRef = useRef(null)

  // If someone arrives at /gallery?category=Wedding from elsewhere (e.g. the
  // Orbit page's "Explore More" button) after this component is already
  // mounted, sync the active filter to match.
  useEffect(() => {
    const c = searchParams.get('category')
    if (c && categories.includes(c) && c !== activeCategory) {
      setActiveCategoryState(c)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  const setActiveCategory = (c) => {
    setActiveCategoryState(c)
    setSearchParams(c === 'All' ? {} : { category: c }, { replace: true })
  }

  const filtered = useMemo(() => {
    return photosData.filter((p) => activeCategory === 'All' || p.category === activeCategory)
  }, [activeCategory])

  const visible = filtered.slice(0, visibleCount)

  useEffect(() => {
    setVisibleCount(PAGE_SIZE)
  }, [activeCategory])

  useEffect(() => {
    if (!sentinelRef.current) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((c) => Math.min(c + PAGE_SIZE, filtered.length))
        }
      },
      { rootMargin: '200px' }
    )
    observer.observe(sentinelRef.current)
    return () => observer.disconnect()
  }, [filtered.length])

  const openModal = (idx) => setModalIndex(idx)
  const closeModal = useCallback(() => setModalIndex(null), [])
  const prevPhoto = useCallback(
    () => setModalIndex((i) => (i - 1 + visible.length) % visible.length),
    [visible.length]
  )
  const nextPhoto = useCallback(
    () => setModalIndex((i) => (i + 1) % visible.length),
    [visible.length]
  )

  return (
    <div className={`gallery ${fullScreen ? 'gallery--fullscreen' : ''}`}>
      <motion.div
        className="gallery__controls"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Scroll wrapper keeps filters on one line on mobile */}
        <div className="gallery__filters-scroll">
          <div className="gallery__filters">
            {categories.map((c) => (
              <motion.button
                key={c}
                className={`gallery__filter-btn ${activeCategory === c ? 'gallery__filter-btn--active' : ''}`}
                onClick={() => setActiveCategory(c)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.88 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                {categoryLabels[c] || c}
              </motion.button>
            ))}
          </div>
        </div>

        <div className="gallery__right-controls">
          <motion.button
            className="gallery__fullscreen-btn"
            onClick={() => setFullScreen((f) => !f)}
            aria-label="Toggle full-screen gallery mode"
            title="Full-screen gallery mode"
            whileHover={{ rotate: 8, scale: 1.08 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <FiMaximize />
          </motion.button>
        </div>
      </motion.div>

      {filtered.length === 0 ? (
        <motion.p
          className="gallery__empty"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          No photos in this category just yet.
        </motion.p>
      ) : (
        <div className="gallery__masonry">
          <AnimatePresence>
            {visible.map((photo, idx) => (
              <motion.button
                key={photo.id}
                className="gallery__item"
                style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
                initial={{ opacity: 0, y: 24, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.5, delay: (idx % PAGE_SIZE) * 0.05, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => openModal(idx)}
                aria-label={`Open ${photo.category} photo`}
              >
                <img
                  src={photo.src}
                  alt={photo.subtitle ? `${photo.category} – ${photo.subtitle}` : photo.category}
                  loading="lazy"
                  decoding="async"
                  draggable="false"
                  className="gallery__img"
                />

                <div className="gallery__item-overlay">
                  <span className="gallery__item-ritual">{photo.category}</span>
                  {photo.subtitle && (
                    <span className="gallery__item-subtitle">{photo.subtitle}</span>
                  )}
                </div>

                <span className="gallery__item-badge">
                  {photo.subtitle ? photo.subtitle : photo.category}
                </span>

              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      )}

      {visibleCount < filtered.length && <div ref={sentinelRef} className="gallery__sentinel" />}

      {modalIndex !== null && (
        <PhotoModal
          photo={visible[modalIndex]}
          onClose={closeModal}
          onPrev={prevPhoto}
          onNext={nextPhoto}
        />
      )}
    </div>
  )
}