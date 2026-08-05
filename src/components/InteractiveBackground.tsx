import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  alpha: number
  color: string
}

const COLORS = ['#FF3399', '#00FF41', '#9945FF', '#3B5FCC']
const PARTICLE_COUNT = 80
const CONNECTION_DIST = 130
const MOUSE_REPEL_DIST = 100
const MOUSE_FORCE = 0.5

export default function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouse = useRef({ x: -9999, y: -9999 })
  const particles = useRef<Particle[]>([])
  const rafId = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })

    // Init particles
    particles.current = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.5 + 0.15,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }))

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    const onMouseLeave = () => {
      mouse.current = { x: -9999, y: -9999 }
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('mouseleave', onMouseLeave, { passive: true })

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const mx = mouse.current.x
      const my = mouse.current.y

      // Update + draw particles
      for (const p of particles.current) {
        // Mouse repulsion
        const dx = p.x - mx
        const dy = p.y - my
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < MOUSE_REPEL_DIST && dist > 0) {
          const force = (MOUSE_REPEL_DIST - dist) / MOUSE_REPEL_DIST
          p.vx += (dx / dist) * force * MOUSE_FORCE
          p.vy += (dy / dist) * force * MOUSE_FORCE
        }

        // Damping
        p.vx *= 0.96
        p.vy *= 0.96

        // Max speed
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        if (speed > 1.8) {
          p.vx = (p.vx / speed) * 1.8
          p.vy = (p.vy / speed) * 1.8
        }

        p.x += p.vx
        p.y += p.vy

        // Wrap edges
        if (p.x < 0) p.x += canvas.width
        if (p.x > canvas.width) p.x -= canvas.width
        if (p.y < 0) p.y += canvas.height
        if (p.y > canvas.height) p.y -= canvas.height

        // Draw dot
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.alpha
        ctx.fill()
      }

      // Draw connections
      ctx.globalAlpha = 1
      for (let i = 0; i < particles.current.length; i++) {
        for (let j = i + 1; j < particles.current.length; j++) {
          const a = particles.current[i]
          const b = particles.current[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < CONNECTION_DIST) {
            const alpha = (1 - dist / CONNECTION_DIST) * 0.18
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = a.color
            ctx.lineWidth = 0.6
            ctx.globalAlpha = alpha
            ctx.stroke()
          }
        }
      }

      // Mouse glow ring
      if (mx > 0 && mx < canvas.width) {
        const grad = ctx.createRadialGradient(mx, my, 0, mx, my, MOUSE_REPEL_DIST)
        grad.addColorStop(0, 'rgba(255, 51, 153, 0.06)')
        grad.addColorStop(1, 'rgba(255, 51, 153, 0)')
        ctx.beginPath()
        ctx.arc(mx, my, MOUSE_REPEL_DIST, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.globalAlpha = 1
        ctx.fill()
      }

      ctx.globalAlpha = 1
      rafId.current = requestAnimationFrame(draw)
    }

    rafId.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafId.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.85 }}
    />
  )
}
