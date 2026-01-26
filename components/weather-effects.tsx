"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "@/contexts/theme-context"

interface Snowflake {
    id: number
    x: number
    duration: number
    delay: number
}

export function WeatherEffects() {
    const { biome } = useTheme()
    const [snowflakes, setSnowflakes] = useState<Snowflake[]>([])

    useEffect(() => {
        if (biome === "snow") {
            const flakes = Array.from({ length: 50 }).map((_, i) => ({
                id: i,
                x: Math.random() * 100, // %
                duration: 3 + Math.random() * 4, // 3-7s
                delay: -Math.random() * 5 // Start at random times
            }))
            setSnowflakes(flakes)
        } else {
            setSnowflakes([])
        }
    }, [biome])

    if (biome !== "snow") return null

    return (
        <div className="pointer-events-none fixed inset-0 z-[10] overflow-hidden">
            {snowflakes.map((flake) => (
                <motion.div
                    key={flake.id}
                    initial={{ y: -20, x: `${flake.x}vw`, opacity: 0 }}
                    animate={{
                        y: "110vh",
                        opacity: [0, 1, 1, 0],
                        x: [`${flake.x}vw`, `${flake.x + (Math.random() * 5 - 2.5)}vw`] // Sway
                    }}
                    transition={{
                        duration: flake.duration,
                        repeat: Infinity,
                        delay: flake.delay,
                        ease: "linear"
                    }}
                    className="absolute bg-white"
                    style={{
                        width: 4,
                        height: 4,
                        boxShadow: "0 0 2px rgba(255,255,255,0.8)"
                    }}
                />
            ))}
        </div>
    )
}
