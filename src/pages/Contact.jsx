import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMail, FiPhone, FiMapPin, FiDownload, FiSend } from 'react-icons/fi'
import { fireConfetti } from '../components/MusicToggle/confetti.js'
import './Page.css'
import './Contact.css'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setSent(true)
    fireConfetti()
    setForm({ name: '', email: '', message: '' })
    setTimeout(() => setSent(false), 4000)
  }

  const pageUrl = typeof window !== 'undefined' ? window.location.href : 'https://aniketandmonam.com'
  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&color=121212&bgcolor=FFFFF0&data=${encodeURIComponent(pageUrl)}`

  return (
    <div className="page">
      <header className="page__header container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p className="eyebrow">Stay Connected</p>
          <h1 className="section-title">Contact Us</h1>
          <p className="section-sub" style={{ margin: '18px auto 0' }}>
            Send your wishes, ask a question, or grab the invitation and QR code to share with loved ones.
          </p>
        </motion.div>
      </header>

      <section className="section" style={{ paddingTop: 20 }}>
        <div className="container contact-grid">
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="contact-info__title">Get In Touch</h2>
            <div className="contact-info__row">
              <FiMail />
              <span>hello@aniketandmonam.com</span>
            </div>
            <div className="contact-info__row">
              <FiPhone />
              <span>+91 98765 43210</span>
            </div>
            <div className="contact-info__row">
              <FiMapPin />
              <span>Heritage Courtyard, New Delhi</span>
            </div>

            <a href="/wedding-invitation.pdf" download className="btn btn-filled contact-info__download">
              <FiDownload /> Download Invitation
            </a>

            <div className="contact-info__qr">
              <img src={qrSrc} alt="QR code to share this website" loading="lazy" />
              <p>Scan to share our memories with family &amp; friends</p>
            </div>
          </motion.div>

          <motion.form
            className="contact-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <label className="contact-form__label">
              Your Name
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Jane Doe"
                required
              />
            </label>
            <label className="contact-form__label">
              Your Email
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="jane@example.com"
                required
              />
            </label>
            <label className="contact-form__label">
              Message
              <textarea
                name="message"
                rows={5}
                value={form.message}
                onChange={handleChange}
                placeholder="Send your love and wishes..."
                required
              />
            </label>
            <button type="submit" className="btn btn-filled contact-form__submit">
              <FiSend /> {sent ? 'Sent With Love!' : 'Send Wishes'}
            </button>
          </motion.form>
        </div>
      </section>
    </div>
  )
}
