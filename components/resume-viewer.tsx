"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function ResumeViewer() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            {/* Trigger Button */}
            <motion.button
                onClick={() => setIsOpen(true)}
                whileHover={{ scale: 1.05, y: -3, boxShadow: "0 10px 25px rgba(26,26,46,0.6)" }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 border-4 border-[#373737] bg-[#1a1a2e] px-6 py-3 text-sm uppercase tracking-wider text-white transition-colors hover:bg-[#2a2a4e]"
                style={{ willChange: "transform" }}
            >
                <span>📖</span> View Resume
            </motion.button>

            {/* Modal */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm"
                        />

                        {/* Book Modal */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.7, y: 60 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.7, y: 60 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            className="fixed inset-4 sm:inset-8 md:inset-12 lg:inset-16 z-[101] flex flex-col border-4 border-[#373737] bg-[#C6C6C6] overflow-hidden"
                            style={{ willChange: "transform" }}
                        >
                            {/* Header Bar */}
                            <div className="flex items-center justify-between border-b-4 border-[#373737] bg-[#8B6914] px-4 py-2 flex-shrink-0">
                                <div className="flex items-center gap-2">
                                    <span className="text-xl">📖</span>
                                    <h3 className="text-sm sm:text-base uppercase tracking-wider text-white font-bold">
                                        Mohammed Razin CR — Resume
                                    </h3>
                                </div>
                                <div className="flex items-center gap-2">
                                    {/* Download button */}
                                    <motion.a
                                        href="/Mohammed Razin CR.pdf"
                                        download
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="flex items-center gap-1 border-2 border-[#373737] bg-[#5D8C3C] px-3 py-1 text-xs uppercase tracking-wider text-white hover:bg-[#4A7030]"
                                    >
                                        <span>⬇</span>
                                        <span className="hidden sm:inline">Download</span>
                                    </motion.a>
                                    {/* Close button */}
                                    <motion.button
                                        whileHover={{ scale: 1.1, backgroundColor: "#C41E3A" }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => setIsOpen(false)}
                                        className="flex h-8 w-8 items-center justify-center border-2 border-[#373737] bg-[#5A5A5A] text-white text-sm font-bold transition-colors"
                                        aria-label="Close resume viewer"
                                    >
                                        ✕
                                    </motion.button>
                                </div>
                            </div>

                            {/* PDF Iframe */}
                            <div className="flex-1 bg-[#373737] overflow-hidden">
                                <iframe
                                    src="/Mohammed Razin CR.pdf"
                                    className="h-full w-full"
                                    title="Mohammed Razin CR Resume"
                                    style={{ border: "none" }}
                                />
                            </div>

                            {/* Footer */}
                            <div className="border-t-4 border-[#373737] bg-[#8B8B8B] px-4 py-1.5 flex-shrink-0 flex items-center justify-between">
                                <span className="text-xs uppercase tracking-wider text-[#373737]">
                                    📄 Mohammed Razin CR.pdf
                                </span>
                                <span className="text-xs uppercase tracking-wider text-[#373737]">
                                    Press ESC or click outside to close
                                </span>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}
