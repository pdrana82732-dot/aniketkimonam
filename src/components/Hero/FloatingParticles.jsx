import React, { useEffect, useRef } from 'react'

export default function FloatingParticles() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationId
    let particles = []

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    function resize() {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    function init() {
      const count = window.innerWidth < 768 ? 22 : 45
      particles = Array.from({ length: count }, (_, i) => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2.2 + 0.5,
        speed: Math.random() * 0.45 + 0.12,
        drift: (Math.random() - 0.5) * 0.35,
        opacity: Math.random() * 0.55 + 0.15,
        type: i % 7 === 0 ? 'heart' : i % 9 === 0 ? 'ring' : 'dot',
        pulse: Math.random() * Math.PI * 2,
      }))
    }

    function drawHeart(x, y, size, opacity) {
      ctx.save()
      ctx.globalAlpha = opacity
      ctx.fillStyle = `rgba(212, 175, 55, ${opacity})`
      ctx.beginPath()
      ctx.moveTo(x, y + size * 0.3)
      ctx.bezierCurveTo(x, y, x - size, y, x - size, y + size * 0.4)
      ctx.bezierCurveTo(x - size, y + size * 0.9, x, y + size * 1.3, x, y + size * 1.5)
      ctx.bezierCurveTo(x, y + size * 1.3, x + size, y + size * 0.9, x + size, y + size * 0.4)
      ctx.bezierCurveTo(x + size, y, x, y, x, y + size * 0.3)
      ctx.fill()
      ctx.restore()
    }

    function drawRing(x, y, r, opacity) {
      ctx.beginPath()
      ctx.arc(x, y, r * 2, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(212, 175, 55, ${opacity * 0.6})`
      ctx.lineWidth = 0.8
      ctx.stroke()
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        p.y -= p.speed
        p.x += p.drift
        p.pulse += 0.02
        const pulsedOpacity = p.opacity * (0.75 + 0.25 * Math.sin(p.pulse))

        if (p.y < -20) {
          p.y = canvas.height + 20
          p.x = Math.random() * canvas.width
        }

        if (p.type === 'heart') {
          drawHeart(p.x, p.y, p.r * 1.8, pulsedOpacity * 0.7)
        } else if (p.type === 'ring') {
          drawRing(p.x, p.y, p.r, pulsedOpacity)
        } else {
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(212, 175, 55, ${pulsedOpacity})`
          ctx.fill()
        }
      })
      animationId = requestAnimationFrame(animate)
    }

    resize()
    init()
    animate()

    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="hero__particles" aria-hidden="true" />
}