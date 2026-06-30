import React from 'react'
import { FiInstagram, FiFacebook, FiYoutube, FiMail } from 'react-icons/fi'
import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p className="footer__quote">
          &ldquo;May your bond grow deeper with every passing year,<br />
          and may your home always be filled with laughter and light.&rdquo;
        </p>

        <div className="footer__monogram">A&nbsp;&amp;&nbsp;M</div>

        <p className="footer__copy">
          &copy; {year} Aniket &amp; Monam &mdash; A Journey of Love. Crafted with love.
        </p>
      </div>
    </footer>
  )
}
