import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiChevronLeft, FiChevronRight, FiDownload, FiShare2 } from 'react-icons/fi'
import './PhotoModal.css'

export default function PhotoModal({ photo, onClose, onPrev, onNext }) {
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, onPrev, onNext])

  if (!photo) return null

  const handleShare = async () => {
    const shareData = {
      title: photo.caption,
      text: `A Journey of Love — ${photo.caption}`,
      url: window.location.href,
    }
    try {
      if (navigator.share) {
        await navigator.share(shareData)
      } else {
        await navigator.clipboard?.writeText(window.location.href)
      }
    } catch (e) {
      /* user cancelled or share unsupported */
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        className="photo-modal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={photo.caption}
      >
        <motion.div
          className="photo-modal__content"
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.92, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="photo-modal__close" onClick={onClose} aria-label="Close">
            <FiX />
          </button>

          <button className="photo-modal__nav photo-modal__nav--prev" onClick={onPrev} aria-label="Previous photo">
            <FiChevronLeft />
          </button>

          <img src={photo.src} alt={photo.caption} className="photo-modal__image" />

          <button className="photo-modal__nav photo-modal__nav--next" onClick={onNext} aria-label="Next photo">
            <FiChevronRight />
          </button>

          <div className="photo-modal__footer">
            <span className="photo-modal__caption">{photo.caption}</span>
            <div className="photo-modal__actions">
              <a
                href={photo.src}
                download
                className="photo-modal__action-btn"
                aria-label="Download photo"
              >
                <FiDownload />
              </a>
              <button className="photo-modal__action-btn" onClick={handleShare} aria-label="Share photo">
                <FiShare2 />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
