"use client"

import React, { createContext, useContext, useState, useCallback, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useSound } from "./sound-context"

export interface Achievement {
    id: string
    title: string
    description: string
    icon: string
}

interface AchievementContextType {
    unlockAchievement: (id: string) => void
}

const AchievementContext = createContext<AchievementContextType | undefined>(undefined)

const ACHEIVEMENT_DATA: Record<string, Omit<Achievement, "id">> = {
    "time_traveler": { title: "Time Traveler", description: "Changed the time of day", icon: "⏰" },
    "biome_explorer": { title: "Biome Explorer", description: "Visited a new biome", icon: "🗺️" },
    "getting_upgrade": { title: "Getting an Upgrade", description: "Downloaded resume", icon: "📄" },
    "photographer": { title: "Photographer", description: "Took a profile picture", icon: "📸" },
    "monster_hunter": { title: "Monster Hunter", description: "Found a hidden easter egg", icon: "⚔️" },
    "taking_inventory": { title: "Taking Inventory", description: "Checked the projects", icon: "📦" },
    "sound_engineer": { title: "Sound Engineer", description: "Toggled the sound settings", icon: "🎵" },
}

export function AchievementProvider({ children }: { children: React.ReactNode }) {
    const [unlocked, setUnlocked] = useState<Set<string>>(new Set())
    const [queue, setQueue] = useState<Achievement[]>([])
    const [current, setCurrent] = useState<Achievement | null>(null)

    // Use sound context safely (might be undefined if used outside provider, though we wrapped it)
    // We'll trust it's wrapped correctly in layout
    const { playSuccess } = useSound()

    const unlockAchievement = useCallback((id: string) => {
        if (unlocked.has(id)) return // Already unlocked

        const data = ACHEIVEMENT_DATA[id]
        if (!data) return

        setUnlocked(prev => new Set(prev).add(id))
        setQueue(prev => [...prev, { id, ...data }])
    }, [unlocked])

    // Process Queue
    useEffect(() => {
        if (current || queue.length === 0) return

        const next = queue[0]
        setCurrent(next)
        setQueue(prev => prev.slice(1))

        // Play sound!
        playSuccess()

        // Hide after 4 seconds
        const timer = setTimeout(() => {
            setCurrent(null)
        }, 4000)

        return () => clearTimeout(timer)
    }, [queue, current, playSuccess])

    return (
        <AchievementContext.Provider value={{ unlockAchievement }}>
            {children}

            {/* Toast UI */}
            <AnimatePresence>
                {current && (
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        className="fixed bottom-4 right-4 z-[100] w-80 font-minecraft"
                    >
                        <div className="bg-[#212121] border-2 border-white p-1 text-white shadow-lg flex items-center gap-4 relative overflow-hidden">
                            {/* Minecraft Achievement Style */}
                            <div className="bg-[#373737] p-2 border-2 border-[#8B8B8B]">
                                <span className="text-2xl">{current.icon}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-yellow-400 text-sm font-bold tracking-wider">Achievement Get!</span>
                                <span className="text-white text-md">{current.title}</span>
                                <span className="text-gray-400 text-xs">{current.description}</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </AchievementContext.Provider>
    )
}

export function useAchievement() {
    const context = useContext(AchievementContext)
    if (context === undefined) {
        throw new Error("useAchievement must be used within an AchievementProvider")
    }
    return context
}
