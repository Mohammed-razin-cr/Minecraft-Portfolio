"use client"

import { useState, useCallback, useMemo, useRef } from "react"
import { motion } from "framer-motion"
import html2canvas from "html2canvas"
import { useAchievement } from "@/contexts/achievement-context"

const SKIN_TONES = ["#FFDBAC", "#F5C6A5", "#E0AC69", "#C68642", "#8D5524", "#5C3317"]
const HAIR_COLORS = ["#2C1810", "#4A3728", "#8B4513", "#D4A574", "#FFD700", "#FF6B6B", "#4169E1", "#9370DB"]
const SHIRT_COLORS = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7", "#DDA0DD", "#98D8C8", "#F7DC6F"]
const PANTS_COLORS = ["#2C3E50", "#34495E", "#1ABC9C", "#3498DB", "#9B59B6", "#E74C3C", "#F39C12", "#27AE60"]

const HAIR_STYLES = [
  // Style 0: Short
  [
    [0, 0, 1, 1, 1, 1, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ],
  // Style 1: Long
  [
    [0, 0, 1, 1, 1, 1, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 0],
    [1, 1, 0, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 0, 1, 1],
  ],
  // Style 2: Spiky
  [
    [0, 1, 0, 1, 1, 0, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [0, 1, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ],
  // Style 3: Bald
  [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ],
]

interface AvatarConfig {
  skinTone: number
  hairStyle: number
  hairColor: number
  shirtColor: number
  pantsColor: number
}

export function PixelAvatar() {
  const avatarRef = useRef<HTMLDivElement>(null)
  const [viewMode, setViewMode] = useState<'full' | 'head'>('full')
  const { unlockAchievement } = useAchievement()

  const [config, setConfig] = useState<AvatarConfig>({
    skinTone: 0,
    hairStyle: 0,
    hairColor: 0,
    shirtColor: 0,
    pantsColor: 0,
  })

  const updateConfig = useCallback((key: keyof AvatarConfig, value: number) => {
    setConfig((prev) => ({ ...prev, [key]: value }))
  }, [])

  const downloadAvatar = async (format: 'png' | 'jpg') => {
    if (!avatarRef.current) return

    try {
      const canvas = await html2canvas(avatarRef.current, {
        backgroundColor: format === 'jpg' ? '#87CEEB' : null,
        scale: 4, // Higher quality
        useCORS: true,
        logging: false,
      })

      const link = document.createElement('a')
      const mimeType = format === 'png' ? 'image/png' : 'image/jpeg'
      const quality = format === 'jpg' ? 0.95 : undefined
      const filename = `my-minecraft-${viewMode === 'head' ? 'dp' : 'avatar'}.${format}`

      link.download = filename
      link.href = canvas.toDataURL(mimeType, quality)

      // Append to body (required for Firefox and some other browsers)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      unlockAchievement("photographer")
    } catch (error) {
      console.error('Failed to capture avatar:', error)
      alert('Failed to capture avatar. Please try again!')
    }
  }

  // Memoize pixel grid to prevent unnecessary re-renders
  const pixelGrid = useMemo(() => {
    const pixels: Array<{ x: number; y: number; color: string }> = []
    const gridWidth = 8
    const gridHeight = 16

    for (let y = 0; y < gridHeight; y++) {
      for (let x = 0; x < gridWidth; x++) {
        let color = "transparent"

        // Hair (rows 0-3)
        if (y < 4) {
          const hairStyle = HAIR_STYLES[config.hairStyle]
          if (hairStyle[y] && hairStyle[y][x] === 1) {
            color = HAIR_COLORS[config.hairColor]
          }
        }
        // Face (rows 4-7)
        else if (y >= 4 && y < 8) {
          // Face outline
          if (x >= 1 && x <= 6) {
            color = SKIN_TONES[config.skinTone]
            // Eyes
            if (y === 5 && (x === 2 || x === 5)) {
              color = "#1a1a1a"
            }
            // Mouth
            if (y === 7 && x >= 3 && x <= 4) {
              color = "#8B4513"
            }
          }
        }
        // Body/Shirt (rows 8-11)
        else if (y >= 8 && y < 12) {
          if (x >= 1 && x <= 6) {
            color = SHIRT_COLORS[config.shirtColor]
          }
          // Arms
          if (y >= 8 && y < 12) {
            if (x === 0 || x === 7) {
              color = SKIN_TONES[config.skinTone]
            }
          }
        }
        // Pants (rows 12-15)
        else if (y >= 12 && y < 16) {
          if ((x >= 1 && x <= 3) || (x >= 4 && x <= 6)) {
            color = PANTS_COLORS[config.pantsColor]
          }
        }

        if (color !== "transparent") {
          pixels.push({ x, y, color })
        }
      }
    }

    return pixels
  }, [config])

  const ColorPicker = ({
    label,
    colors,
    selected,
    onChange,
  }: {
    label: string
    colors: string[]
    selected: number
    onChange: (index: number) => void
  }) => (
    <div className="mb-4">
      <p className="mb-2 text-sm uppercase tracking-wider text-[#373737]">{label}</p>
      <div className="flex flex-wrap gap-2">
        {colors.map((color, index) => (
          <motion.button
            key={color}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onChange(index)}
            className={`h-8 w-8 border-2 ${selected === index ? "border-[#FFD700] shadow-lg" : "border-[#373737]"} block-shadow transition-shadow duration-200`}
            style={{
              backgroundColor: color,
              willChange: selected === index ? 'transform' : 'auto'
            }}
            aria-label={`Select ${label} color ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )

  return (
    <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-start">
      {/* Avatar Preview */}
      <div className="relative flex flex-col items-center">
        {/* View Toggle */}
        <div className="mb-4 flex gap-2">
          <button
            onClick={() => setViewMode('full')}
            className={`px-3 py-1 text-xs uppercase tracking-wider border-2 transition-colors duration-200 ${viewMode === 'full'
              ? "border-[#373737] bg-[#373737] text-white"
              : "border-[#373737] bg-transparent text-[#373737] hover:bg-[#373737]/10"
              }`}
          >
            Full Body
          </button>
          <button
            onClick={() => setViewMode('head')}
            className={`px-3 py-1 text-xs uppercase tracking-wider border-2 transition-colors duration-200 ${viewMode === 'head'
              ? "border-[#373737] bg-[#373737] text-white"
              : "border-[#373737] bg-transparent text-[#373737] hover:bg-[#373737]/10"
              }`}
          >
            Headshot (DP)
          </button>
        </div>

        <motion.div
          ref={avatarRef}
          className="relative border-4 border-[#373737] bg-[#87CEEB] p-4 overflow-hidden"
          animate={{
            height: viewMode === 'full' ? 240 : 136,
            width: 160
          }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <div className="relative" style={{ width: 96, height: 192, margin: "0 auto" }}>
            {pixelGrid.map(({ x, y, color }, index) => (
              <motion.div
                key={`${x}-${y}`}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.005 }}
                className="absolute block-shadow"
                style={{
                  width: 12,
                  height: 12,
                  left: x * 12,
                  top: y * 12,
                  backgroundColor: color,
                  willChange: 'transform'
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Download Buttons */}
        <div className="mt-4 flex gap-2 w-full">
          <motion.button
            onClick={() => downloadAvatar('png')}
            whileHover={{ scale: 1.05, y: -3, boxShadow: "0 6px 12px rgba(93, 140, 60, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 border-2 border-[#373737] bg-[#5D8C3C] px-3 py-2 text-sm uppercase tracking-wider text-white transition-all hover:bg-[#4A7030]"
          >
            PNG
          </motion.button>
          <motion.button
            onClick={() => downloadAvatar('jpg')}
            whileHover={{ scale: 1.05, y: -3, boxShadow: "0 6px 12px rgba(139, 105, 20, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 border-2 border-[#373737] bg-[#8B6914] px-3 py-2 text-sm uppercase tracking-wider text-white transition-all hover:bg-[#6B4F10]"
          >
            JPG
          </motion.button>
        </div>
        <p className="mt-2 text-center text-xs text-[#373737]">
          {viewMode === 'full' ? 'Full Body Avatar' : 'Profile Picture (Square)'}
        </p>
      </div>

      {/* Customization Panel */}
      <div className="w-full max-w-sm border-4 border-[#373737] bg-[#C6C6C6] p-4">
        <h3 className="mb-4 text-xl uppercase tracking-wider text-[#373737]">Customize</h3>

        <ColorPicker
          label="Skin Tone"
          colors={SKIN_TONES}
          selected={config.skinTone}
          onChange={(i) => updateConfig("skinTone", i)}
        />

        <div className="mb-4">
          <p className="mb-2 text-sm uppercase tracking-wider text-[#373737]">Hair Style</p>
          <div className="flex gap-2">
            {["Short", "Long", "Spiky", "Bald"].map((style, index) => (
              <motion.button
                key={style}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => updateConfig("hairStyle", index)}
                className={`border-2 px-3 py-1 text-sm transition-all duration-200 ${config.hairStyle === index
                  ? "border-[#FFD700] bg-[#5D8C3C] text-white shadow-lg"
                  : "border-[#373737] bg-[#8B8B8B] text-[#373737]"
                  }`}
                style={{ willChange: config.hairStyle === index ? 'transform' : 'auto' }}
              >
                {style}
              </motion.button>
            ))}
          </div>
        </div>

        <ColorPicker
          label="Hair Color"
          colors={HAIR_COLORS}
          selected={config.hairColor}
          onChange={(i) => updateConfig("hairColor", i)}
        />

        <ColorPicker
          label="Shirt Color"
          colors={SHIRT_COLORS}
          selected={config.shirtColor}
          onChange={(i) => updateConfig("shirtColor", i)}
        />

        <ColorPicker
          label="Pants Color"
          colors={PANTS_COLORS}
          selected={config.pantsColor}
          onChange={(i) => updateConfig("pantsColor", i)}
        />
      </div>
    </div >
  )
}
