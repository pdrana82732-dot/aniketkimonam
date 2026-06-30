import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Loader.css'

export default function Loader({ visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="loader-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
        >
          <motion.div
            className="loader-monogram"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <span>A</span>
            <motion.span
              className="loader-amp"
              initial={{ rotate: -10, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              &
            </motion.span>
            <span>M</span>
          </motion.div>
          <motion.div
            className="loader-bar"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.6, ease: 'easeInOut' }}
          />
          <motion.p
            className="loader-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            A Journey of Love
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
