import { useEffect, useRef } from 'react'

interface Blob {
  // Orbital center (normalised 0-1)
  cx: number
  cy: number
  // Orbit radii (px)
  rx: number
  ry: number
  // Current orbit angle & angular speed
  angle: number
  speed: number
  // Blob size
  radius: number
  // Hex colour
  color: string
  // Phase offset for secondary wobble
  wobble: number
}

const BLOBS: Omit<Blob, 'rx' | 'ry'>[] = [
  { cx: 0.35, cy: 0.38, radius: 520, color: '#FF3399', angle: 0,              speed:  0.0022, wobble: 0 },
  { cx: 0.65, cy: 0.55, radius: 460, color: '#9945FF', angle: Math.PI,        speed:  0.0015, wobble: 1.1 },
  { cx: 0.50, cy: 0.25, radius: 380, color: '#00FF41', angle: Math.PI / 2,    speed:  0.0031, wobble: 2.3 },
  { cx: 0.20, cy: 0.72, radius: 340, color: '#3B5FCC', angle: Math.PI * 1.5,  speed:  0.0018, wobble: 0.7 },
  { cx: 0.80, cy: 0.20, radius: 300, color: '#FF3399', angle: Math.PI * 0.7,  speed:  0.0026, wobble: 1.9 },
]

// Mouse influence: blobs lazily follow cursor
const MOUSE_LERP  = 0.018  // how fast blobs drift toward cursor
const MOUSE_PULL  = 0.12   // fraction of screen the cursor can shift blob centres

export default function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouse     = useRef({ x: 0.5, y: 0.5 })   // normalised
  const blobs     = useRef<Blob[]>([])
  const rafId     = useRef<number>(0)
  const t         = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    /* ── resize ── */
    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight

      // Rebuild blobs so orbit radii scale with viewport
      blobs.current = BLOBS.map(b => ({
        ...b,
        rx: canvas.width  * 0.18,
        ry: canvas.height * 0.14,
      }))
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })

    /* ── mouse ── */
    const onMove = (e: MouseEvent) => {
      mouse.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      }
    }
    window.addEventListener('mousemove', onMove, { passive: true })

    /* ── noise grain (static texture, generated once) ── */
    const grainCanvas = document.createElement('canvas')
    grainCanvas.width  = 256
    grainCanvas.height = 256
    const gCtx = grainCanvas.getContext('2d')!
    const imageData = gCtx.createImageData(256, 256)
    for (let i = 0; i < imageData.data.length; i += 4) {
      const v = Math.random() * 255
      imageData.data[i]     = v
      imageData.data[i + 1] = v
      imageData.data[i + 2] = v
      imageData.data[i + 3] = 18   // very faint
    }
    gCtx.putImageData(imageData, 0, 0)
    const grainPattern = ctx.createPattern(grainCanvas, 'repeat')!

    /* ── render loop ── */
    const draw = () => {
      const W = canvas.width
      const H = canvas.height
      t.current += 1

      // Base fill
      ctx.fillStyle = '#080808'
      ctx.fillRect(0, 0, W, H)

      // Aurora blobs
      ctx.globalCompositeOperation = 'screen'

      for (const b of blobs.current) {
        b.angle += b.speed

        // Wobble gives organic, non-circular orbit
        const wobbleFactor = 1 + 0.25 * Math.sin(t.current * 0.008 + b.wobble)

        // Lazy mouse pull (normalised offsets → pixel deltas)
        const pullX = (mouse.current.x - 0.5) * MOUSE_PULL * W
        const pullY = (mouse.current.y - 0.5) * MOUSE_PULL * H
        b.cx += (0.5 + pullX / W * 0.5 - b.cx) * MOUSE_LERP * 0.1
        b.cy += (0.5 + pullY / H * 0.5 - b.cy) * MOUSE_LERP * 0.1

        const bx = b.cx * W + Math.cos(b.angle) * b.rx * wobbleFactor + pullX * 0.4
        const by = b.cy * H + Math.sin(b.angle) * b.ry * wobbleFactor + pullY * 0.4

        const grad = ctx.createRadialGradient(bx, by, 0, bx, by, b.radius)
        grad.addColorStop(0,   hexAlpha(b.color, 0.28))
        grad.addColorStop(0.4, hexAlpha(b.color, 0.10))
        grad.addColorStop(1,   hexAlpha(b.color, 0))

        ctx.beginPath()
        ctx.ellipse(bx, by, b.radius, b.radius * 0.72, b.angle * 0.3, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()
      }

      // Subtle scanline-style horizontal bands (luxury feel)
      ctx.globalCompositeOperation = 'source-over'
      ctx.fillStyle = 'rgba(0,0,0,0.04)'
      for (let y = 0; y < H; y += 4) {
        ctx.fillRect(0, y, W, 1)
      }

      // Grain overlay
      ctx.globalCompositeOperation = 'overlay'
      ctx.fillStyle = grainPattern
      ctx.fillRect(0, 0, W, H)

      // Radial vignette
      ctx.globalCompositeOperation = 'source-over'
      const vignette = ctx.createRadialGradient(W / 2, H / 2, H * 0.1, W / 2, H / 2, H * 0.85)
      vignette.addColorStop(0, 'rgba(0,0,0,0)')
      vignette.addColorStop(1, 'rgba(0,0,0,0.72)')
      ctx.fillStyle = vignette
      ctx.fillRect(0, 0, W, H)

      ctx.globalCompositeOperation = 'source-over'
      rafId.current = requestAnimationFrame(draw)
    }

    rafId.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafId.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  )
}

/* Convert hex + alpha to rgba string */
function hexAlpha(hex: string, a: number): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r},${g},${b},${a})`
}
