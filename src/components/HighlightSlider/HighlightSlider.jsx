import React, { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './HighlightSlider.css'

const slides = [
    { id: 1, type: 'image', src: 'https://res.cloudinary.com/dwie7kkgv/image/upload/v1782591329/pic_32_egitgk.jpg' },
    { id: 2, type: 'image', src: 'https://res.cloudinary.com/dwie7kkgv/image/upload/v1782589961/pic_29_snqbuq.jpg' },
    { id: 3, type: 'image', src: 'https://res.cloudinary.com/dwie7kkgv/image/upload/v1782589901/pic_28_kzpzka.jpg' },
    { id: 4, type: 'image', src: 'https://res.cloudinary.com/dwie7kkgv/image/upload/v1782590703/pic_31_ow4knh.jpg' },
]

const AUTO_INTERVAL = 4000

export default function HighlightSlider() {
    const [index, setIndex] = useState(0)
    const [direction, setDirection] = useState(1)
    const [paused, setPaused] = useState(false)
    const [progressKey, setProgressKey] = useState(0)
    const timerRef = useRef(null)
    const dragX = useRef(0)

    const goNext = useCallback(() => {
        setDirection(1)
        setIndex((i) => (i + 1) % slides.length)
        setProgressKey((k) => k + 1)
    }, [])

    const goPrev = useCallback(() => {
        setDirection(-1)
        setIndex((i) => (i - 1 + slides.length) % slides.length)
        setProgressKey((k) => k + 1)
    }, [])

    const clearTimer = useCallback(() => {
        if (timerRef.current) {
            clearInterval(timerRef.current)
            timerRef.current = null
        }
    }, [])

    useEffect(() => {
        clearTimer()
        if (paused) return
        timerRef.current = setInterval(goNext, AUTO_INTERVAL)
        return () => clearTimer()
    }, [index, paused, goNext, clearTimer])

    const current = slides[index]

    // Slide + fade + slight scale/blur for a richer transition
    const variants = {
        enter: (dir) => ({
            x: dir > 0 ? '100%' : '-100%',
            opacity: 0,
            scale: 1.08,
        }),
        center: {
            x: 0,
            opacity: 1,
            scale: 1,
        },
        exit: (dir) => ({
            x: dir > 0 ? '-60%' : '60%',
            opacity: 0,
            scale: 0.94,
        }),
    }

    const handleDragEnd = (_, info) => {
        const threshold = 80
        if (info.offset.x < -threshold) goNext()
        else if (info.offset.x > threshold) goPrev()
    }

    return (
        <div className="highlight-slider-wrap">
            <div
                className="highlight-slider"
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
            >
                <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                        key={current.id}
                        className="highlight-slider__slide"
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.2}
                        onDragEnd={handleDragEnd}
                    >
                        {/* Ken Burns slow zoom on the image itself, independent of slide transition */}
                        <motion.img
                            src={current.src}
                            alt={`Slide ${current.id}`}
                            className="highlight-slider__img"
                            initial={{ scale: 1 }}
                            animate={{ scale: 1.12 }}
                            transition={{ duration: AUTO_INTERVAL / 1000 + 0.65, ease: 'linear' }}
                        />
                        {/* Subtle gradient sweep overlay on enter */}
                        <motion.div
                            className="highlight-slider__sheen"
                            initial={{ opacity: 0.5, x: '-100%' }}
                            animate={{ opacity: 0, x: '100%' }}
                            transition={{ duration: 0.9, ease: 'easeOut' }}
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Arrows */}
                <motion.button
                    className="highlight-slider__arrow highlight-slider__arrow--left"
                    onClick={goPrev}
                    aria-label="Previous slide"
                    whileHover={{ scale: 1.12 }}
                    whileTap={{ scale: 0.9 }}
                >
                    ‹
                </motion.button>
                <motion.button
                    className="highlight-slider__arrow highlight-slider__arrow--right"
                    onClick={goNext}
                    aria-label="Next slide"
                    whileHover={{ scale: 1.12 }}
                    whileTap={{ scale: 0.9 }}
                >
                    ›
                </motion.button>

                {/* Dots */}
                <div className="highlight-slider__dots">
                    {slides.map((s, i) => (
                        <button
                            key={s.id}
                            className={`highlight-slider__dot ${i === index ? 'highlight-slider__dot--active' : ''}`}
                            onClick={() => {
                                setDirection(i > index ? 1 : -1)
                                setIndex(i)
                                setProgressKey((k) => k + 1)
                            }}
                            aria-label={`Go to slide ${i + 1}`}
                        >
                            {i === index && !paused && (
                                <motion.span
                                    key={progressKey}
                                    className="highlight-slider__dot-progress"
                                    initial={{ width: '0%' }}
                                    animate={{ width: '100%' }}
                                    transition={{ duration: AUTO_INTERVAL / 1000, ease: 'linear' }}
                                />
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}