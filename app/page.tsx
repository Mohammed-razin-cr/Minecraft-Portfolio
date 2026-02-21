"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { ThemeControls } from "@/components/theme-controls"
import { SkySection } from "@/components/world-sections/sky-section"
import { GrassSection } from "@/components/world-sections/grass-section"
import { DirtSection } from "@/components/world-sections/dirt-section"
import { StoneSection } from "@/components/world-sections/stone-section"
import { NetherSection } from "@/components/world-sections/nether-section"
import { BlockLoader } from "@/components/block-loader"
import { BackToTop } from "@/components/back-to-top"

const SECTIONS = ["home", "about", "skills", "projects", "contact"]

export default function Home() {
  const [currentSection, setCurrentSection] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault()
        const nextIndex = Math.min(currentSection + 1, SECTIONS.length - 1)
        setCurrentSection(nextIndex)
        document.getElementById(SECTIONS[nextIndex])?.scrollIntoView({ behavior: "smooth" })
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault()
        const prevIndex = Math.max(currentSection - 1, 0)
        setCurrentSection(prevIndex)
        document.getElementById(SECTIONS[prevIndex])?.scrollIntoView({ behavior: "smooth" })
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentSection])

  return (
    <>
      {isLoading && <BlockLoader onComplete={() => setIsLoading(false)} />}
      <Navigation />
      <ThemeControls />
      <main className="relative">
        <SkySection />
        <GrassSection />
        <DirtSection />
        <StoneSection />
        <NetherSection />
      </main>
      <BackToTop />
    </>
  )
}
