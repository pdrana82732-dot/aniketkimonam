import React from 'react'
import { motion } from 'framer-motion'
import './Timeline.css'

const moments = [
  {
    year: '2018',
    title: 'First Hello',
    text: 'A chance meeting at a college fest turned into hours of conversation that neither of them wanted to end.',
  },
  {
    year: '2019',
    title: 'Best Friends',
    text: 'Late-night calls, shared playlists and a friendship that quietly became something neither could name yet.',
  },
  {
    year: '2021',
    title: 'First "I Love You"',
    text: 'On a rainy evening by the lake, three words changed everything — and they have never looked back since.',
  },
  {
    year: '2024',
    title: 'The Proposal',
    text: 'Under fairy lights and family cheers, Aniket got down on one knee — and Monam said yes before he even finished asking.',
  },
  {
    year: '2025',
    title: 'Forever Begins',
    text: 'Surrounded by everyone they love, Aniket and Monam begin the next chapter of their journey — together.',
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
}

export default function Timeline() {
  return (
    <div className="timeline">
      <div className="timeline__line" aria-hidden="true" />
      {moments.map((m, i) => (
        <motion.div
          className={`timeline__item ${i % 2 === 0 ? 'timeline__item--left' : 'timeline__item--right'}`}
          key={m.year}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={cardVariants}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="timeline__dot" />
          <div className="timeline__card">
            <span className="timeline__year">{m.year}</span>
            <h3 className="timeline__title">{m.title}</h3>
            <p className="timeline__text">{m.text}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
