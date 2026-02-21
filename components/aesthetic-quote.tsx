"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const FALLBACK_QUOTES = [
    { text: "The best way to predict the future is to create it.", author: "Peter Drucker" },
    { text: "Everything you can imagine is real.", author: "Pablo Picasso" },
    { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
    { text: "Do not go where the path may lead, go instead where there is no path and leave a trail.", author: "Ralph Waldo Emerson" },
    { text: "The only limit to our realization of tomorrow will be our doubts of today.", author: "Franklin D. Roosevelt" }
]

export function AestheticQuote() {
    const [quote, setQuote] = useState<{ text: string; author: string } | null>(null)
    const [loading, setLoading] = useState(true)

    const fetchQuote = async () => {
        setLoading(true)

        // Ensure the loading animation is visible for at least 800ms for that "decrypting" feel
        const startTime = Date.now()

        try {
            // Trying a more stable API first
            const response = await fetch(`https://dummyjson.com/quotes/random?t=${startTime}`)
            const data = await response.json()

            if (data && data.quote) {
                setQuote({
                    text: data.quote,
                    author: data.author
                })
            } else {
                throw new Error("Invalid data format")
            }
        } catch (error) {
            console.error("Primary API failed, trying fallback...", error)
            // Pick a random fallback quote different from the current one
            let randomFallback = FALLBACK_QUOTES[Math.floor(Math.random() * FALLBACK_QUOTES.length)]
            setQuote(randomFallback)
        } finally {
            const endTime = Date.now()
            const duration = endTime - startTime
            const waitTime = Math.max(0, 800 - duration)

            setTimeout(() => {
                setLoading(false)
            }, waitTime)
        }
    }

    useEffect(() => {
        fetchQuote()
    }, [])

    return (
        <div className="w-full flex justify-center py-12 px-4">
            <div className="w-full max-w-3xl flex flex-col items-center p-8 sm:p-12 text-center bg-black/40 backdrop-blur-xl border-2 border-[#FF6B00]/30 shadow-[0_0_50px_rgba(255,107,0,0.15)] rounded-sm min-h-[300px] justify-center">
                <AnimatePresence mode="wait">
                    {loading ? (
                        <motion.div
                            key="loader"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center gap-6 py-12"
                        >
                            <div className="relative h-12 w-12">
                                <div className="absolute inset-0 border-2 border-cyan-500/20 rounded-full" />
                                <div className="absolute inset-0 border-t-2 border-cyan-500 animate-spin rounded-full" />
                            </div>
                            <span className="uppercase tracking-[0.5em] text-[10px] text-cyan-400 animate-pulse font-mono">Decrypting_Wisdom...</span>
                        </motion.div>
                    ) : (
                        quote && (
                            <motion.div
                                key={quote.text}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.05 }}
                                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                                className="flex flex-col items-center"
                            >
                                {/* Tech frame element */}
                                <div className="mb-10 flex items-center gap-6">
                                    <div className="h-[2px] w-16 bg-gradient-to-r from-transparent via-[#FF6B00]/50 to-transparent" />
                                    <span className="text-2xl text-[#FF6B00] animate-pulse">✦</span>
                                    <div className="h-[2px] w-16 bg-gradient-to-r from-transparent via-[#FF6B00]/50 to-transparent" />
                                </div>

                                <p className="text-xl sm:text-2xl md:text-3xl font-[family-name:var(--font-serif)] text-white/95 leading-relaxed mb-8 block drop-shadow-lg italic">
                                    "{quote.text}"
                                </p>

                                <div className="flex flex-col items-center gap-12 w-full mt-4">
                                    <motion.cite
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                        className="text-xs sm:text-base font-[family-name:var(--font-serif)] uppercase tracking-[0.5em] text-cyan-400 not-italic block border-b border-cyan-500/20 pb-2"
                                    >
                                        &mdash; {quote.author}
                                    </motion.cite>

                                    <motion.button
                                        onClick={fetchQuote}
                                        whileHover={{
                                            scale: 1.05,
                                            backgroundColor: "rgba(6, 182, 212, 0.1)",
                                            borderColor: "rgba(6, 182, 212, 0.5)",
                                            boxShadow: "0 0 20px rgba(6, 182, 212, 0.2)"
                                        }}
                                        whileTap={{ scale: 0.95 }}
                                        className="relative group px-10 py-4 bg-white/5 border border-white/10 text-[11px] uppercase tracking-[0.4em] text-white/70 hover:text-white transition-all overflow-hidden"
                                    >
                                        <div className="absolute inset-0 w-0 bg-cyan-500/10 transition-all duration-300 group-hover:w-full" />
                                        <span className="relative z-10">Refresh Inspiration</span>
                                    </motion.button>
                                </div>
                            </motion.div>
                        )
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
