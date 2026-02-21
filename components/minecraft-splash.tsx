"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const MINECRAFT_QUOTES = [
    "Built with blocks & code 🧱",
    "Creepers gonna creep...",
    "404: Sleep not found",
    "Warning: May cause creativity",
    "Powered by caffeine & JavaScript",
    "Also try: Sleeping before 2AM",
    "Achievement Unlocked: Found Portfolio",
    "sudo apt-get install skills",
    "Hello World! ...again.",
    "One does not simply stop coding",
    "git commit -m 'Changed everything'",
    "It's not a bug, it's a feature!",
    "npm install everything",
    "The cake is a lie",
    "Keep digging deeper...",
    "You are now breathing manually",
    "Press F to pay respects",
    "Made in Karnataka, India 🇮🇳",
]

export function MinecraftSplash() {
    const [quote, setQuote] = useState(MINECRAFT_QUOTES[0])
    const [key, setKey] = useState(0)

    useEffect(() => {
        // Pick a random quote on mount
        const random = Math.floor(Math.random() * MINECRAFT_QUOTES.length)
        setQuote(MINECRAFT_QUOTES[random])

        // Rotate every 4 seconds
        const interval = setInterval(() => {
            const next = Math.floor(Math.random() * MINECRAFT_QUOTES.length)
            setQuote(MINECRAFT_QUOTES[next])
            setKey(k => k + 1)
        }, 4000)

        return () => clearInterval(interval)
    }, [])

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={key}
                initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
                animate={{ scale: 1, opacity: 1, rotate: [-3, 3, -3] }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{
                    scale: { type: "spring", stiffness: 400, damping: 15 },
                    rotate: { repeat: Infinity, duration: 1.5, ease: "easeInOut" },
                }}
                className="mt-3 inline-block max-w-xs px-1"
                style={{ transformOrigin: "center" }}
            >
                <span
                    className="text-[#FFFF00] text-sm sm:text-base font-bold drop-shadow-[2px_2px_0_rgba(180,130,0,0.8)]"
                    style={{ fontStyle: "italic", textShadow: "2px 2px 0 #AA7700" }}
                >
                    {quote}
                </span>
            </motion.div>
        </AnimatePresence>
    )
}
