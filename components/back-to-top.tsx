"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function BackToTop() {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 300)
        window.addEventListener("scroll", onScroll, { passive: true })
        return () => window.removeEventListener("scroll", onScroll)
    }, [])

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    return (
        <AnimatePresence>
            {visible && (
                <motion.button
                    initial={{ opacity: 0, y: 40, scale: 0.5 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 40, scale: 0.5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    whileHover={{ scale: 1.15, y: -6 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-1 group"
                    aria-label="Back to top"
                    style={{ willChange: "transform" }}
                >
                    {/* TNT Block */}
                    <div className="relative h-12 w-12 border-4 border-[#373737] bg-[#C41E3A] block-shadow overflow-hidden">
                        {/* TNT label stripes */}
                        <div className="absolute inset-0 flex flex-col justify-center items-center">
                            <div className="w-full h-[3px] bg-[#373737]" />
                            <div className="w-full h-[5px] bg-[#F5F5DC] flex items-center justify-center">
                                <span className="text-[6px] font-bold text-[#373737] tracking-widest">TNT</span>
                            </div>
                            <div className="w-full h-[3px] bg-[#373737]" />
                        </div>
                        {/* Shine overlay on hover */}
                        <motion.div
                            className="absolute inset-0 bg-white/20"
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                        />
                    </div>
                    {/* Arrow */}
                    <motion.div
                        animate={{ y: [0, -4, 0] }}
                        transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                        className="text-[#C41E3A] text-lg leading-none drop-shadow-[0_2px_0_rgba(0,0,0,0.5)]"
                    >
                        ▲
                    </motion.div>
                    {/* Tooltip */}
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap border-2 border-[#373737] bg-[#1a1a2e] px-2 py-1 text-[10px] uppercase tracking-wider text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        Top
                    </span>
                </motion.button>
            )}
        </AnimatePresence>
    )
}
