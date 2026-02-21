"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { MinecraftBlock3D } from "@/components/minecraft-block-3d"
import { useTheme, themeColors } from "@/contexts/theme-context"

export function SkySection() {
  const ref = useRef<HTMLDivElement>(null)
  const { biome, timeOfDay } = useTheme()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const cloudY = useTransform(scrollYProgress, [0, 1], [0, 100])
  const sunY = useTransform(scrollYProgress, [0, 1], [0, 50])

  // Get current theme colors
  const colors = themeColors[biome][timeOfDay]
  const isNight = timeOfDay === "night"

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-screen overflow-hidden transition-colors duration-700"
      style={{
        background: `linear-gradient(to bottom, ${colors.sky}, ${colors.skyDark})`
      }}
    >
      {/* Sun/Moon */}
      <motion.div
        style={{
          y: sunY,
          willChange: 'transform',
          backgroundColor: isNight ? "#E8E8E8" : "#FFD700",
          borderRadius: isNight ? "50%" : "0%",
          boxShadow: isNight ? "0 0 30px rgba(232, 232, 232, 0.8)" : "none"
        }}
        className="absolute right-32 top-4 sm:right-36 sm:top-8 md:right-40 md:top-12 lg:right-48 lg:top-20 h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 transition-all duration-700"
      >
        <div className="absolute inset-0 block-shadow" />
      </motion.div>

      {/* Clouds */}
      <motion.div style={{ y: cloudY, willChange: 'transform' }} className="absolute inset-0">
        {[
          { left: "5%", top: "10%", width: 80 },
          { left: "50%", top: "18%", width: 60 },
          { left: "20%", top: "28%", width: 70 },
          { left: "85%", top: "35%", width: 50 },
        ].map((cloud, index) => (
          <div
            key={index}
            className="absolute"
            style={{
              left: cloud.left,
              top: cloud.top,
            }}
          >
            <CloudBlock width={cloud.width} />
          </div>
        ))}
      </motion.div>

      {/* Hero Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 sm:px-6 md:px-8 text-center pt-16 sm:pt-0">
        {/* 3D Block */}
        <div className="mb-6">
          <MinecraftBlock3D />
        </div>

        {/* Name box */}
        <div className="mb-4">
          <div className="border-4 border-[#373737] bg-[#C6C6C6] p-2">
            <p className="text-sm sm:text-base md:text-lg uppercase tracking-wider text-[#5D8C3C]">
              Hi, I&apos;m
            </p>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl uppercase tracking-wider text-[#373737]">
              Mohammed Razin CR
            </h1>
          </div>
        </div>

        {/* Subtitle */}
        <div className="border-4 border-[#373737] bg-[#1a1a2e] p-3 sm:p-4 shadow-lg">
          <p className="text-base sm:text-lg md:text-xl text-white" style={{ letterSpacing: "0.1em" }}>
            FULL STACK WEB DEV &nbsp;|&nbsp; CYBER SECURITY EXPERT &nbsp;|&nbsp; VIDEO EDITOR &nbsp;|&nbsp; PHOTOGRAPHER
          </p>
        </div>

        {/* Description */}
        <p className="mt-4 max-w-xs sm:max-w-sm md:max-w-lg border-2 border-[#373737] bg-[#C6C6C6]/90 p-2 sm:p-3 text-xs sm:text-sm md:text-base text-[#373737]">
          I build stellar web experiences with modern tech &mdash; and tell visual stories through
          video editing &amp; phone photography.
        </p>

        {/* Buttons */}
        <div className="mt-6 sm:mt-8 flex flex-wrap justify-center gap-2 sm:gap-4">
          <motion.a
            href="#about"
            whileHover={{
              scale: 1.1,
              y: -8,
              rotateX: 5,
              rotateY: -5,
              boxShadow: "0 15px 35px rgba(93, 140, 60, 0.6), 0 0 25px rgba(93, 140, 60, 0.4)",
              transition: { type: "spring", stiffness: 400, damping: 10 }
            }}
            whileTap={{ scale: 0.95, y: 0, rotateX: 0, rotateY: 0 }}
            className="relative block-shadow border-2 border-[#373737] bg-[#5D8C3C] px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base md:text-lg uppercase tracking-wider text-white overflow-hidden group"
            style={{ willChange: 'transform', transformStyle: 'preserve-3d', perspective: '1000px' }}
          >
            {/* Animated diagonal stripes */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-[#4A7030]/0 via-[#4A7030]/30 to-[#4A7030]/0"
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%'],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              style={{ backgroundSize: '200% 200%' }}
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.6 }}
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-[#4A7030]/30 to-transparent"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            <span className="relative z-10">View My Work</span>
          </motion.a>
          <motion.a
            href="#projects"
            whileHover={{
              scale: 1.1,
              y: -8,
              rotateX: 5,
              rotateY: 5,
              boxShadow: "0 15px 35px rgba(139, 105, 20, 0.6), 0 0 25px rgba(139, 105, 20, 0.4)",
              transition: {
                type: "spring",
                stiffness: 400,
                damping: 10
              }
            }}
            whileTap={{ scale: 0.95, y: 0, rotateX: 0, rotateY: 0 }}
            className="relative block-shadow border-2 border-[#373737] bg-[#8B6914] px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base md:text-lg uppercase tracking-wider text-white overflow-hidden group"
            style={{ willChange: 'transform', transformStyle: 'preserve-3d', perspective: '1000px' }}
          >
            {/* Animated corner glow */}
            <motion.div
              className="absolute inset-0"
              animate={{
                background: [
                  'radial-gradient(circle at 0% 0%, rgba(107, 79, 16, 0.4) 0%, transparent 50%)',
                  'radial-gradient(circle at 100% 0%, rgba(107, 79, 16, 0.4) 0%, transparent 50%)',
                  'radial-gradient(circle at 100% 100%, rgba(107, 79, 16, 0.4) 0%, transparent 50%)',
                  'radial-gradient(circle at 0% 100%, rgba(107, 79, 16, 0.4) 0%, transparent 50%)',
                  'radial-gradient(circle at 0% 0%, rgba(107, 79, 16, 0.4) 0%, transparent 50%)'
                ]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.6, delay: 0.1 }}
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-[#6B4F10]/30 to-transparent"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            <span className="relative z-10">Projects</span>
          </motion.a>
        </div>

        {/* Scroll indicator */}
        <motion.button
          onClick={() => {
            const aboutSection = document.getElementById('about')
            aboutSection?.scrollIntoView({ behavior: 'smooth' })
          }}
          animate={{
            y: [0, 10, 0]
          }}
          transition={{
            y: { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
          }}
          className="mt-8 sm:mt-12 flex flex-col items-center gap-2 cursor-pointer"
          style={{ willChange: 'transform' }}
          aria-label="Scroll to next section"
        >
          <span className="text-xs sm:text-sm uppercase tracking-wider text-[#373737]">Scroll</span>
          <div className="h-6 sm:h-8 w-3 sm:w-4 border-2 border-[#373737] bg-[#8B6914]" />
        </motion.button>
      </div>
    </section>
  )
}

function CloudBlock({ width }: { width: number }) {
  const blocks = Math.ceil(width / 16)
  return (
    <div className="flex flex-wrap" style={{ width }}>
      {Array.from({ length: blocks * 2 }).map((_, i) => (
        <div
          key={i}
          className="h-4 w-4 bg-white opacity-90"
          style={{
            display: i < blocks || (i >= blocks && i % 3 !== 0) ? "block" : "none",
          }}
        />
      ))}
    </div>
  )
}
