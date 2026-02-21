"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

const NAV_ITEMS = [
  { id: "home", label: "Spawn", icon: "🏠", href: null },
  { id: "about", label: "About", icon: "👤", href: null },
  { id: "skills", label: "Skills", icon: "⚔️", href: null },
  { id: "projects", label: "Projects", icon: "📦", href: null },
  { id: "contact", label: "Contact", icon: "📬", href: null },
  { id: "gallery", label: "Gallery", icon: "📸", href: "/gallery" },
]

const INSTAGRAM_LINK = "https://www.instagram.com/im.chikkamagalurian?igsh=ZjRvM2F5OWsyaDdj"

export function Navigation() {
  const [activeSection, setActiveSection] = useState("home")
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const sections = NAV_ITEMS.map((item) => document.getElementById(item.id))
          const scrollPosition = window.scrollY + window.innerHeight / 3

          for (let i = sections.length - 1; i >= 0; i--) {
            const section = sections[i]
            if (section && section.offsetTop <= scrollPosition) {
              setActiveSection(NAV_ITEMS[i].id)
              break
            }
          }
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsOpen(false)
  }

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="fixed left-4 top-1/2 z-50 hidden -translate-y-1/2 lg:block">
        <div className="border-2 border-[#373737] bg-[#C6C6C6] p-2">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id
            const sharedClass = `mb-2 flex w-full items-center gap-2 border-2 px-3 py-2 text-left text-sm uppercase tracking-wider transition-colors last:mb-0 ${isActive
                ? "border-[#5D8C3C] bg-[#5D8C3C] text-white shadow-lg"
                : "border-[#373737] bg-[#8B8B8B] text-[#373737] hover:bg-[#9B9B9B]"
              }`

            if (item.href) {
              return (
                <Link key={item.id} href={item.href}>
                  <motion.div
                    whileHover={{ x: 6, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className={sharedClass}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </motion.div>
                </Link>
              )
            }

            return (
              <motion.button
                key={item.id}
                whileHover={{ x: 6, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                onClick={() => scrollToSection(item.id)}
                className={sharedClass}
                style={{ willChange: isActive ? 'transform' : 'auto' }}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </motion.button>
            )
          })}

          {/* Instagram Link Button */}
          <motion.a
            href={INSTAGRAM_LINK}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ x: 6, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="mt-2 flex w-full items-center gap-2 border-2 border-[#373737] bg-[#8B2FC9] px-3 py-2 text-sm uppercase tracking-wider text-white hover:bg-[#A040E8] transition-colors"
            style={{ willChange: 'transform' }}
            aria-label="Instagram"
          >
            <span>📸</span>
            <span>Instagram</span>
          </motion.a>
        </div>
      </nav>

      {/* Mobile Navigation Toggle */}
      <motion.button
        whileHover={{ scale: 1.05, rotate: isOpen ? 0 : 90 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed right-3 top-3 z-50 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center border-2 border-[#373737] bg-[#C6C6C6] text-xl sm:text-2xl lg:hidden"
        style={{ willChange: 'transform' }}
        aria-label="Toggle navigation"
      >
        {isOpen ? "✕" : "☰"}
      </motion.button>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%", scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 right-0 z-40 w-56 sm:w-64 border-l-4 border-[#373737] bg-[#C6C6C6] p-3 sm:p-4 pt-16 sm:pt-20 lg:hidden"
            style={{ willChange: 'transform, opacity' }}
          >
            {NAV_ITEMS.map((item, index) => {
              const isActive = activeSection === item.id
              const sharedClass = `mb-2 flex w-full items-center gap-2 sm:gap-3 border-2 px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm uppercase tracking-wider transition-colors ${isActive
                  ? "border-[#5D8C3C] bg-[#5D8C3C] text-white shadow-lg"
                  : "border-[#373737] bg-[#8B8B8B] text-[#373737]"
                }`

              if (item.href) {
                return (
                  <Link key={item.id} href={item.href} onClick={() => setIsOpen(false)}>
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      whileHover={{ scale: 1.03, x: -3 }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ delay: index * 0.08, type: "spring", stiffness: 400, damping: 25 }}
                      className={sharedClass}
                    >
                      <span className="text-base sm:text-xl">{item.icon}</span>
                      <span>{item.label}</span>
                    </motion.div>
                  </Link>
                )
              }

              return (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  whileHover={{ scale: 1.03, x: -3 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ delay: index * 0.08, type: "spring", stiffness: 400, damping: 25 }}
                  onClick={() => scrollToSection(item.id)}
                  className={sharedClass}
                  style={{ willChange: isActive ? 'transform' : 'auto' }}
                >
                  <span className="text-base sm:text-xl">{item.icon}</span>
                  <span>{item.label}</span>
                </motion.button>
              )
            })}

            {/* Instagram Link Button */}
            <motion.a
              href={INSTAGRAM_LINK}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.03, x: -3 }}
              whileTap={{ scale: 0.97 }}
              transition={{
                delay: NAV_ITEMS.length * 0.08,
                type: "spring",
                stiffness: 400,
                damping: 25
              }}
              className="mt-1 flex w-full items-center gap-2 sm:gap-3 border-2 border-[#373737] bg-[#8B2FC9] px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm uppercase tracking-wider text-white hover:bg-[#A040E8] transition-colors"
              style={{ willChange: 'transform' }}
              aria-label="Instagram"
            >
              <span className="text-base sm:text-xl">📸</span>
              <span>Instagram</span>
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
