import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import events from '../../data/orbitEvents.js'
import './JourneySection.css'

const BRIDE_IMAGE = 'https://res.cloudinary.com/dwie7kkgv/image/upload/v1782735827/pic_3_c6xk5y.jpg'

// Radii as fractions of the container's half-size (min of width/2 and height/2).
const RING_FRACTIONS = [0.28, 0.42, 0.56, 0.70]
const RING_DURATIONS = [20, 26, 32, 38]
// On larger screens push rings further out (up to 52% of the half-size)
const MOBILE_BREAKPOINT = 768

function useContainerSize(ref) {
    const [size, setSize] = useState({ w: 0, h: 0 })
    useEffect(() => {
        if (!ref.current) return

        const measure = () => {
            if (!ref.current) return
            const rect = ref.current.getBoundingClientRect()
            if (rect.width && rect.height) setSize({ w: rect.width, h: rect.height })
        }

        measure()
        // Catch late layout shifts (fonts/images loading, navbar height settling)
        const t1 = setTimeout(measure, 100)
        const t2 = setTimeout(measure, 400)
        const t3 = setTimeout(measure, 900)
        window.addEventListener('load', measure)

        const ro = new ResizeObserver(([entry]) => {
            const { width, height } = entry.contentRect
            setSize({ w: width, h: height })
        })
        ro.observe(ref.current)

        return () => {
            ro.disconnect()
            clearTimeout(t1)
            clearTimeout(t2)
            clearTimeout(t3)
            window.removeEventListener('load', measure)
        }
    }, [ref])
    return size
}

export default function JourneySection() {
    const [active, setActive] = useState(null)
    const containerRef = useRef(null)
    const navigate = useNavigate()
    const { w: rawW, h: rawH } = useContainerSize(containerRef)
    // Don't fall back to fake dimensions — wait for a real measurement so
    // rings/avatars never render against the wrong size and then jump.
    const measured = rawW > 0 && rawH > 0
    const w = rawW || 600
    const h = rawH || 600

    // On mobile keep rings tight; on laptop/desktop keep it compact too — whole thing must fit one screen
    const isMobile = w < MOBILE_BREAKPOINT
    const radiusCap = isMobile ? 0.14 : 0.16
    // Avatar diameter + label height + small gap (this is how far the rendered element
    // extends beyond its own center point — must be reserved so nothing clips at the edge)
    const avatarFootprint = (isMobile ? 22 : 32) + 14 /* label */ + 8 /* gap */
    const avatarReserve = avatarFootprint / 2 + (isMobile ? 6 : 8)
    const maxR = Math.min(w, h) * radiusCap - avatarReserve

    // Bride photo's own radius (matches the CSS clamp below) + its glow ring
    const centerPhotoRadius = Math.min(35, Math.max(23, Math.min(w, h) * 0.04))
    const centerClearance = centerPhotoRadius + 7 /* glow */ + avatarFootprint / 2 + 4

    const ringConfig = []
    let prevRadius = 0
    RING_FRACTIONS.forEach((frac, i) => {
        const raw = Math.round(maxR * frac / RING_FRACTIONS[RING_FRACTIONS.length - 1])
        let radius = Math.max(raw, centerClearance)
        if (radius - prevRadius < avatarFootprint) radius = prevRadius + avatarFootprint
        prevRadius = radius
        ringConfig.push({
            radius,
            duration: RING_DURATIONS[i],
            // Fixed angle per ring slot (not tied to event order) so each ring's avatar
            // always sits 90° apart from its neighbors and never drifts into another ring's space
            startAngle: i * 90,
        })
    })

    const goToGalleryCategory = (category) => {
        setActive(null)
        navigate(`/gallery?category=${encodeURIComponent(category)}`)
    }

    return (
        <div className="journey-orbit" ref={containerRef}>
            {/* starfield */}
            <div className="journey-orbit__stars" aria-hidden="true" />

            {/* decorative rings */}
            {measured && events.map((evt, i) => {
                // Reverse mapping: first event (Tilak) → outermost ring, last (Wedding) → innermost
                const ring = ringConfig[ringConfig.length - 1 - (i % ringConfig.length)]
                return (
                    <div
                        key={`ring-${evt.id}`}
                        className="journey-orbit__ring"
                        style={{ width: ring.radius * 2, height: ring.radius * 2 }}
                        aria-hidden="true"
                    />
                )
            })}

            {/* center bride photo */}
            <div className="journey-orbit__center">
                <div className="journey-orbit__center-glow" />
                <button
                    className="journey-orbit__center-circle"
                    onClick={() => setActive({ id: 'bride', name: 'Bride', image: BRIDE_IMAGE })}
                    aria-label="View Bride photo"
                >
                    <img src={BRIDE_IMAGE} alt="Bride" />
                </button>
            </div>

            {/* orbiting avatars */}
            {measured && events.map((evt, i) => {
                // Same reversed mapping as the decorative rings, so each avatar sits on its matching ring
                const ring = ringConfig[ringConfig.length - 1 - (i % ringConfig.length)]
                return (
                    <div
                        key={evt.id}
                        className="journey-orbit__path"
                        style={{
                            width: ring.radius * 2,
                            height: ring.radius * 2,
                            animationDuration: `${ring.duration}s`,
                            '--start-angle': `${ring.startAngle}deg`,
                        }}
                    >
                        <div
                            className="journey-orbit__slot"
                            style={{ transform: `translateX(${ring.radius}px)` }}
                        >
                            <div
                                className="journey-orbit__counter"
                                style={{
                                    animationDuration: `${ring.duration}s`,
                                    '--start-angle': `${ring.startAngle}deg`,
                                }}
                            >
                                <button
                                    className="journey-orbit__avatar"
                                    onClick={() => setActive(evt)}
                                    aria-label={`View ${evt.name}`}
                                >
                                    <img
                                        src={evt.image}
                                        alt={evt.name}
                                        loading="lazy"
                                        style={evt.objectPosition ? { objectPosition: evt.objectPosition } : undefined}
                                    />
                                </button>
                                <span className="journey-orbit__label">{evt.name}</span>
                            </div>
                        </div>
                    </div>
                )
            })}

            {/* corner quote */}
            <div className="journey-orbit__quote">
                <p>Two souls became one universe, <br />may your orbit always lead home to each other.</p>
                <span>— With all our love and blessings</span>
            </div>

            <AnimatePresence>
                {active && (
                    <motion.div
                        className="journey-modal"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setActive(null)}
                    >
                        <motion.div
                            className="journey-modal__content"
                            initial={{ opacity: 0, scale: 0.88, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.88, y: 20 }}
                            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button className="journey-modal__close" onClick={() => setActive(null)} aria-label="Close">
                                <FiX />
                            </button>
                            <img
                                src={active.image}
                                alt={active.name}
                                className="journey-modal__image"
                                style={active.objectPosition ? { objectPosition: active.objectPosition } : undefined}
                            />
                            <h3 className="journey-modal__name">{active.name}</h3>

                            {active.category && (
                                <button
                                    className="journey-modal__explore-btn"
                                    onClick={() => goToGalleryCategory(active.category)}
                                >
                                    Explore More
                                </button>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}