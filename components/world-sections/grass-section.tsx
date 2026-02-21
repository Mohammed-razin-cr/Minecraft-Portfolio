"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { PixelAvatar } from "@/components/pixel-avatar"
import { useTheme, themeColors } from "@/contexts/theme-context"

export function GrassSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const { biome, timeOfDay } = useTheme()

  // Get current theme colors
  const colors = themeColors[biome][timeOfDay]

  return (
    <section
      ref={ref}
      id="about"
      className="relative min-h-screen overflow-hidden transition-colors duration-700"
      style={{
        background: `
          linear-gradient(to bottom, ${colors.skyDark} 0%, ${colors.sky} 10%, ${colors.grass} 10%, ${colors.grass} 15%, ${colors.grassDark} 15%, ${colors.grassDark} 100%)
        `,
      }}
    >
      {/* Grass blocks top border */}
      <div className="absolute left-0 right-0 top-[10%] flex overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="h-6 w-6 sm:h-8 sm:w-8 flex-shrink-0 block-shadow transition-colors duration-700"
            style={{
              marginTop: i % 3 === 0 ? "-4px" : "0",
              backgroundColor: colors.grass
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 pb-12 sm:pb-16 md:pb-20 pt-24 sm:pt-28 md:pt-32 lg:pt-36">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-8 sm:mb-12"
        >
          <div className="inline-block border-4 border-[#373737] bg-[#C6C6C6] p-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl uppercase tracking-wider text-[#373737]">About Me</h2>
          </div>
        </motion.div>

        <div className="grid gap-8 sm:gap-10 md:gap-12 lg:grid-cols-2">
          {/* Avatar Generator */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex justify-center lg:justify-start"
          >
            <PixelAvatar />
          </motion.div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="space-y-4 sm:space-y-6"
          >
            <div className="border-4 border-[#373737] bg-[#C6C6C6] p-4 sm:p-6">
              <h3 className="mb-3 sm:mb-4 text-lg sm:text-xl uppercase tracking-wider text-[#5D8C3C]">Mohammed Razin CR</h3>
              <div className="space-y-3 sm:space-y-4 text-[#373737]">
                <p className="text-base sm:text-lg leading-relaxed">
                  Hello! I&apos;m a passionate frontend developer and web designer from Karnataka. I&apos;ve completed
                  my BCA and am currently pursuing my Master of Computer Applications (MCA).
                </p>
                <p className="text-base sm:text-lg leading-relaxed">
                  Beyond coding, I&apos;m passionate about visual storytelling — I shoot and edit videos using my
                  phone, and love capturing moments through phone photography. Whether it&apos;s a cinematic reel,
                  a travel vlog, or a candid street shot, creativity is always with me. I also enjoy gaming
                  and contributing to open-source projects.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {[
                { label: "Education", value: "BCA / MCA" },
                { label: "Location", value: "Karnataka" },
                { label: "Focus", value: "Frontend" },
                { label: "YouTube", value: "2.6k Subs" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="border-4 border-[#373737] bg-[#8B6914] p-3 sm:p-4 text-center block-shadow"
                >
                  <p className="text-lg sm:text-xl md:text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs sm:text-sm uppercase tracking-wider text-white/80">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
