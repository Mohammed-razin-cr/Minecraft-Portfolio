"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

const BLOCK_COLORS = [
  "#5D8C3C", // grass
  "#8B6914", // dirt
  "#7F7F7F", // stone
  "#6B5634", // wood
  "#87CEEB", // sky
]

const GRID_SIZE = 8
const TOTAL_BLOCKS = GRID_SIZE * GRID_SIZE

interface BlockLoaderProps {
  onComplete: () => void
}

export function BlockLoader({ onComplete }: BlockLoaderProps) {
  const [blocks, setBlocks] = useState<number[]>([])
  const [loadingText, setLoadingText] = useState("")
  const fullText = "LOADING WORLD..."

  useEffect(() => {
    // Faster block animation for better perceived performance
    const blockInterval = setInterval(() => {
      setBlocks((prev) => {
        if (prev.length >= TOTAL_BLOCKS) {
          clearInterval(blockInterval)
          return prev
        }
        return [...prev, prev.length]
      })
    }, 20) // Reduced from 30ms to 20ms

    return () => clearInterval(blockInterval)
  }, [])

  useEffect(() => {
    // Faster text animation
    let charIndex = 0
    const textInterval = setInterval(() => {
      if (charIndex <= fullText.length) {
        setLoadingText(fullText.slice(0, charIndex))
        charIndex++
      } else {
        clearInterval(textInterval)
      }
    }, 60) // Reduced from 80ms to 60ms

    return () => clearInterval(textInterval)
  }, [fullText])

  useEffect(() => {
    // Complete loading after all blocks are placed
    if (blocks.length >= TOTAL_BLOCKS) {
      const timeout = setTimeout(() => {
        onComplete()
      }, 500) // Reduced from 800ms to 500ms
      return () => clearTimeout(timeout)
    }
  }, [blocks.length, onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#1a1a2e]"
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      {/* Block grid forming terrain */}
      <div
        className="relative mb-8"
        style={{
          width: GRID_SIZE * 24,
          height: GRID_SIZE * 24,
        }}
      >
        {Array.from({ length: TOTAL_BLOCKS }).map((_, index) => {
          const row = Math.floor(index / GRID_SIZE)
          const col = index % GRID_SIZE
          const isVisible = blocks.includes(index)

          // Create terrain-like pattern
          let colorIndex = 0
          if (row < 2)
            colorIndex = 4 // sky
          else if (row < 3)
            colorIndex = 0 // grass
          else if (row < 5)
            colorIndex = 1 // dirt
          else colorIndex = 2 // stone

          return (
            <motion.div
              key={index}
              initial={{ scale: 0, opacity: 0, rotateZ: -180 }}
              animate={isVisible ? { scale: 1, opacity: 1, rotateZ: 0 } : { scale: 0, opacity: 0, rotateZ: -180 }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 25,
                mass: 0.5
              }}
              className="absolute block-shadow"
              style={{
                width: 24,
                height: 24,
                left: col * 24,
                top: row * 24,
                backgroundColor: BLOCK_COLORS[colorIndex],
                border: "2px solid rgba(0,0,0,0.3)",
                willChange: 'transform, opacity'
              }}
            />
          )
        })}
      </div>

      {/* Loading text */}
      <div className="h-8">
        <motion.p
          className="text-2xl tracking-widest text-white"
          style={{ fontFamily: "var(--font-minecraft), monospace" }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {loadingText}
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.5, ease: "easeInOut" }}
          >
            _
          </motion.span>
        </motion.p>
      </div>

      {/* Progress bar */}
      <div className="mt-4 h-4 w-48 border-2 border-[#373737] bg-[#8B8B8B] overflow-hidden">
        <motion.div
          className="h-full bg-[#5D8C3C]"
          initial={{ width: 0 }}
          animate={{ width: `${(blocks.length / TOTAL_BLOCKS) * 100}%` }}
          transition={{ duration: 0.1, ease: "linear" }}
          style={{ willChange: 'width' }}
        />
      </div>
    </motion.div>
  )
}
