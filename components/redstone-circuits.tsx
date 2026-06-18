"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface RedstonePoint {
  x: number
  y: number
}

export function RedstoneCircuits() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const timeRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const drawRedstoneWire = (
      fromX: number,
      fromY: number,
      toX: number,
      toY: number,
      powered: number
    ) => {
      const lineWidth = 3
      const distance = Math.hypot(toX - fromX, toY - fromY)
      const segmentLength = 15

      // Draw the wire base
      ctx.strokeStyle = powered > 0.5 ? "#FF6B35" : "#5A2D2D"
      ctx.lineWidth = lineWidth
      ctx.lineCap = "round"
      ctx.lineJoin = "round"
      ctx.beginPath()
      ctx.moveTo(fromX, fromY)
      ctx.lineTo(toX, toY)
      ctx.stroke()

      // Draw animated power particles
      if (powered > 0.5) {
        const particleCount = Math.ceil(distance / segmentLength)
        for (let i = 0; i < particleCount; i++) {
          const t = (i / particleCount + timeRef.current * 0.001) % 1
          const x = fromX + (toX - fromX) * t
          const y = fromY + (toY - fromY) * t

          // Create glowing particle effect
          const gradient = ctx.createRadialGradient(x, y, 0, x, y, 6)
          gradient.addColorStop(0, `rgba(255, 107, 53, ${0.8 * (1 - t)})`)
          gradient.addColorStop(1, "rgba(255, 107, 53, 0)")

          ctx.fillStyle = gradient
          ctx.beginPath()
          ctx.arc(x, y, 6, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // Draw nodes
      const nodeColor = powered > 0.5 ? "#FF6B35" : "#8B4513"
      const nodeSize = powered > 0.5 ? 6 : 4

      ctx.fillStyle = nodeColor
      ctx.beginPath()
      ctx.arc(fromX, fromY, nodeSize, 0, Math.PI * 2)
      ctx.fill()

      ctx.beginPath()
      ctx.arc(toX, toY, nodeSize, 0, Math.PI * 2)
      ctx.fill()
    }

    const animate = () => {
      // Clear canvas
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      timeRef.current += 16 // Approximate 60fps

      // Define circuit nodes (sections)
      const nodes: RedstonePoint[] = [
        { x: 50, y: 100 },
        { x: 200, y: 100 },
        { x: 350, y: 100 },
        { x: 200, y: 250 },
        { x: canvas.width - 50, y: 100 },
      ]

      // Calculate power based on time
      const power = Math.sin(timeRef.current * 0.002) * 0.5 + 0.5

      // Draw connections
      for (let i = 0; i < nodes.length - 1; i++) {
        drawRedstoneWire(nodes[i].x, nodes[i].y, nodes[i + 1].x, nodes[i + 1].y, power)
      }

      // Draw vertical connection
      if (nodes.length > 3) {
        drawRedstoneWire(nodes[1].x, nodes[1].y, nodes[3].x, nodes[3].y, power * 0.7)
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <div className="fixed top-0 left-0 w-full h-screen pointer-events-none -z-50 opacity-10">
      <canvas
        ref={canvasRef}
        className="w-full h-full mix-blend-screen"
      />

      {/* Animated redstone dust particles */}
      <motion.div
        className="absolute w-1 h-1 rounded-full bg-red-500"
        style={{ left: "20%", top: "30%" }}
        animate={{
          boxShadow: [
            "0 0 4px #FF6B35",
            "0 0 8px #FF6B35",
            "0 0 4px #FF6B35",
          ],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      <motion.div
        className="absolute w-1 h-1 rounded-full bg-red-500"
        style={{ left: "80%", top: "50%" }}
        animate={{
          boxShadow: [
            "0 0 4px #FF6B35",
            "0 0 8px #FF6B35",
            "0 0 4px #FF6B35",
          ],
        }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
      />
    </div>
  )
}
