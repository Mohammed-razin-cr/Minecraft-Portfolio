"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

export type BiomeTheme = "plains" | "desert" | "snow" | "jungle"
export type TimeOfDay = "day" | "night"

interface ThemeContextType {
    biome: BiomeTheme
    timeOfDay: TimeOfDay
    setBiome: (biome: BiomeTheme) => void
    setTimeOfDay: (time: TimeOfDay) => void
    toggleDayNight: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [biome, setBiome] = useState<BiomeTheme>("plains")
    const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>("day")

    const toggleDayNight = () => {
        setTimeOfDay(prev => prev === "day" ? "night" : "day")
    }

    // Apply theme to document
    useEffect(() => {
        document.documentElement.setAttribute("data-biome", biome)
        document.documentElement.setAttribute("data-time", timeOfDay)
    }, [biome, timeOfDay])

    return (
        <ThemeContext.Provider value={{ biome, timeOfDay, setBiome, setTimeOfDay, toggleDayNight }}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error("useTheme must be used within ThemeProvider")
    }
    return context
}

// Theme color configurations
export const themeColors = {
    plains: {
        day: {
            sky: "#87CEEB",
            skyDark: "#B4E1FF",
            grass: "#5D8C3C",
            grassDark: "#4A7030",
        },
        night: {
            sky: "#0B1929",
            skyDark: "#1a2332",
            grass: "#2a4a1f",
            grassDark: "#1f3517",
        }
    },
    desert: {
        day: {
            sky: "#FFD89B",
            skyDark: "#FFC266",
            grass: "#D4A574",
            grassDark: "#C19A6B",
        },
        night: {
            sky: "#2B1B0E",
            skyDark: "#3d2814",
            grass: "#8B7355",
            grassDark: "#6B5742",
        }
    },
    snow: {
        day: {
            sky: "#B8D8E8",
            skyDark: "#D4E8F0",
            grass: "#FFFFFF",
            grassDark: "#E8F4F8",
        },
        night: {
            sky: "#1a2838",
            skyDark: "#2a3848",
            grass: "#C8D8E8",
            grassDark: "#B0C4D4",
        }
    },
    jungle: {
        day: {
            sky: "#87CEEB",
            skyDark: "#A8D8F0",
            grass: "#3A7D44",
            grassDark: "#2D6234",
        },
        night: {
            sky: "#0D1F1A",
            skyDark: "#1a2f2a",
            grass: "#1F4428",
            grassDark: "#163318",
        }
    }
}
