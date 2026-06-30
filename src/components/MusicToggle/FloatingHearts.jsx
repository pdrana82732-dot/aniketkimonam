import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import { FiHeart } from 'react-icons/fi'
import './FloatingHearts.css'

// A few softly-drifting hearts used as ambient decoration between sections.
export default function FloatingHearts({ count = 6 }) {
  const hearts = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: 5 + Math.random() * 90,
        delay: Math.random() * 5,
        duration: 10 + Math.random() * 8,
        size: 12 + Math.random() * 14,
      })),
    [count]
  )

  return (
    <div className="floating-hearts" aria-hidden="true">
      {hearts.map((h) => (
        <motion.span
          key={h.id}
          className="floating-hearts__item"
          style={{ left: `${h.left}%`, fontSize: h.size }}
          initial={{ y: '110%', opacity: 0 }}
          animate={{ y: '-20%', opacity: [0, 0.5, 0] }}
          transition={{
            duration: h.duration,
            delay: h.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <FiHeart />
        </motion.span>
      ))}
    </div>
  )
}
