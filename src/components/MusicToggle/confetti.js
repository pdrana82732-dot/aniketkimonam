import confetti from 'canvas-confetti'

// Gold + ivory + champagne confetti burst, on-brand with the wedding palette.
export function fireConfetti() {
  const colors = ['#D4AF37', '#FFFFF0', '#F7E7CE']

  confetti({
    particleCount: 120,
    spread: 80,
    startVelocity: 38,
    origin: { y: 0.6 },
    colors,
  })

  setTimeout(() => {
    confetti({
      particleCount: 60,
      angle: 60,
      spread: 60,
      origin: { x: 0, y: 0.7 },
      colors,
    })
    confetti({
      particleCount: 60,
      angle: 120,
      spread: 60,
      origin: { x: 1, y: 0.7 },
      colors,
    })
  }, 250)
}
