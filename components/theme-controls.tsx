"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme, type BiomeTheme } from "@/contexts/theme-context"
import { useSound } from "@/contexts/sound-context"
import { useAchievement } from "@/contexts/achievement-context"

export function ThemeControls() {
    const [isOpen, setIsOpen] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    const { biome, timeOfDay, setBiome, toggleDayNight } = useTheme()
    const { isMuted, toggleMute, playClick, playHover } = useSound()
    const { unlockAchievement } = useAchievement()

    const biomes: { name: BiomeTheme; icon: string; label: string }[] = [
        { name: "plains", icon: "🌱", label: "Plains" },
        { name: "desert", icon: "🏜️", label: "Desert" },
        { name: "snow", icon: "❄️", label: "Snow" },
        { name: "jungle", icon: "🌴", label: "Jungle" },
    ]

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    return (
        <div ref={containerRef} className="fixed left-4 top-4 z-50 flex flex-col items-start gap-2">
            {/* Main Toggle Button */}
            <motion.button
                onClick={() => {
                    setIsOpen(!isOpen)
                    playClick()
                }}
                onMouseEnter={playHover}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 border-4 border-[#373737] px-4 py-2 text-sm font-bold uppercase tracking-wider text-[#373737] shadow-lg transition-colors ${isOpen ? "bg-[#D6D6D6]" : "bg-[#C6C6C6] hover:bg-[#D6D6D6]"
                    }`}
            >
                <motion.span
                    animate={{ rotate: isOpen ? 90 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    ⚙️
                </motion.span>
                <span>Theme</span>
            </motion.button>

            {/* Expandable Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="w-40 overflow-hidden border-2 border-[#373737] bg-[#C6C6C6] shadow-xl"
                    >
                        {/* Sound Toggle */}
                        <motion.button
                            onClick={() => {
                                toggleMute()
                                if (isMuted) playClick()
                                unlockAchievement("sound_engineer")
                            }}
                            onMouseEnter={playHover}
                            whileHover={{ backgroundColor: "#D6D6D6" }}
                            className="flex w-full items-center justify-between border-b-2 border-[#373737] px-4 py-3 text-xs uppercase"
                        >
                            <span className="font-bold">Sound</span>
                            <span>{isMuted ? "🔇 Off" : "🔊 On"}</span>
                        </motion.button>

                        {/* Day/Night Toggle */}
                        <motion.button
                            onClick={() => {
                                toggleDayNight()
                                playClick()
                                unlockAchievement("time_traveler")
                            }}
                            onMouseEnter={playHover}
                            whileHover={{ backgroundColor: "#D6D6D6" }}
                            className="flex w-full items-center justify-between border-b-2 border-[#373737] px-4 py-3 text-xs uppercase"
                        >
                            <span className="font-bold">Time</span>
                            <div className="flex items-center gap-2">
                                <motion.span
                                    animate={{ rotate: timeOfDay === "night" ? 180 : 0 }}
                                >
                                    {timeOfDay === "day" ? "☀️" : "🌙"}
                                </motion.span>
                                <span>{timeOfDay === "day" ? "Day" : "Night"}</span>
                            </div>
                        </motion.button>

                        {/* Biome Selector */}
                        <div className="bg-[#B0B0B0] p-2">
                            <p className="mb-2 text-center text-[10px] font-bold uppercase text-[#373737]">
                                Select Biome
                            </p>
                            <div className="grid grid-cols-2 gap-1">
                                {biomes.map((b) => (
                                    <motion.button
                                        key={b.name}
                                        onClick={() => {
                                            setBiome(b.name)
                                            playClick()
                                            unlockAchievement("biome_explorer")
                                        }}
                                        onMouseEnter={playHover}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`flex flex-col items-center gap-1 border-2 p-2 transition-colors ${biome === b.name
                                            ? "border-[#5D8C3C] bg-[#5D8C3C] text-white"
                                            : "border-[#373737] bg-[#8B8B8B] text-[#373737] hover:bg-[#9B9B9B]"
                                            }`}
                                    >
                                        <span className="text-lg">{b.icon}</span>
                                        <span className="text-[10px] font-bold uppercase">{b.label}</span>
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
