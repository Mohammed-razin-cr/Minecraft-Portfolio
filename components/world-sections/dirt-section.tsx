"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { InventorySkills } from "@/components/inventory-skills"
import { useTheme, themeColors } from "@/contexts/theme-context"

export function DirtSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const { biome, timeOfDay } = useTheme()
  const colors = themeColors[biome][timeOfDay]

  return (
    <section
      ref={ref}
      id="skills"
      className="relative min-h-screen overflow-hidden transition-colors duration-700"
      style={{
        backgroundColor: colors.grassDark,
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='32' height='32' fill='${encodeURIComponent(colors.grassDark)}'/%3E%3Crect x='0' y='0' width='16' height='16' fill='%23000' fillOpacity='0.1'/%3E%3Crect x='16' y='16' width='16' height='16' fill='%23000' fillOpacity='0.1'/%3E%3C/svg%3E")`,
      }}
    >
      {/* Transition blocks from grass */}
      <div className="absolute left-0 right-0 top-0 flex overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="h-6 w-6 sm:h-8 sm:w-8 flex-shrink-0 transition-colors duration-700"
            style={{
              backgroundColor: i % 3 === 0 ? colors.grass : colors.grassDark,
              marginTop: i % 4 === 0 ? "-3px" : "0",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 pt-16 sm:pt-20 md:pt-24 pb-20 sm:pb-24 md:pb-32">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-8 sm:mb-12"
        >
          <div className="inline-block border-4 border-[#373737] bg-[#C6C6C6] p-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl uppercase tracking-wider text-[#373737]">Skills</h2>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <InventorySkills />
        </motion.div>
      </div>
    </section>
  )
}
