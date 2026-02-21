"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"

export function GallerySection() {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: true, amount: 0.2 })

    const previews = [
        { icon: "📷", label: "Portrait 🤳", color: "#8B2FC9" },
        { icon: "🌄", label: "Landscape", color: "#405DE6" },
        { icon: "🎬", label: "Cinematic 🎬", color: "#E1306C" },
        { icon: "🌿", label: "Nature 🌿", color: "#5D8C3C" },
        { icon: "🌆", label: "Street 🌆", color: "#8B6914" },
        { icon: "🌅", label: "Sunset 🌅", color: "#FF6B00" },
    ]

    return (
        <section
            ref={ref}
            id="gallery"
            className="relative overflow-hidden"
            style={{
                backgroundColor: "#0d0d1a",
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='32' height='32' fill='%230d0d1a'/%3E%3Crect x='0' y='0' width='16' height='16' fill='%23fff' fillOpacity='0.02'/%3E%3Crect x='16' y='16' width='16' height='16' fill='%23fff' fillOpacity='0.02'/%3E%3C/svg%3E")`,
            }}
        >
            {/* Transition from nether */}
            <div className="absolute left-0 right-0 top-0 flex overflow-hidden">
                {Array.from({ length: 30 }).map((_, i) => (
                    <div
                        key={i}
                        className="h-6 w-6 sm:h-8 sm:w-8 flex-shrink-0"
                        style={{
                            backgroundColor: i % 3 === 0 ? "#6B1A1A" : "#0d0d1a",
                            marginTop: i % 5 === 0 ? "-3px" : "0",
                        }}
                    />
                ))}
            </div>

            <div className="container mx-auto px-4 pt-16 sm:pt-20 pb-16 sm:pb-20">
                {/* Heading */}
                <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    animate={isInView ? { x: 0, opacity: 1 } : {}}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <div className="inline-block border-4 border-[#8B2FC9] bg-[#0d0d1a] p-2">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl uppercase tracking-wider text-[#8B2FC9]">
                            📸 Gallery
                        </h2>
                    </div>
                    <p className="mt-3 text-sm text-[#C6C6C6]/60 uppercase tracking-wider">
                        Photography & Reels — Shot on Phone
                    </p>
                </motion.div>

                {/* Preview grid */}
                <motion.div
                    initial={{ y: 40, opacity: 0 }}
                    animate={isInView ? { y: 0, opacity: 1 } : {}}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-8"
                >
                    {previews.map((item, i) => (
                        <motion.div
                            key={item.label}
                            initial={{ scale: 0 }}
                            animate={isInView ? { scale: 1 } : {}}
                            transition={{ delay: 0.1 * i + 0.3, type: "spring", stiffness: 300, damping: 20 }}
                            className="group relative aspect-square border-4 border-[#373737] flex flex-col items-center justify-center gap-2 overflow-hidden"
                            style={{ background: `linear-gradient(135deg, ${item.color}44 0%, #0d0d1a 100%)` }}
                        >
                            <span className="text-3xl sm:text-4xl">{item.icon}</span>
                            <span className="text-[10px] uppercase tracking-wider text-[#C6C6C6]/60 text-center px-1">
                                {item.label}
                            </span>
                            {/* Shine on hover */}
                            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.div>
                    ))}
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={isInView ? { y: 0, opacity: 1 } : {}}
                    transition={{ delay: 0.7, duration: 0.4 }}
                    className="flex flex-col sm:flex-row items-center gap-4"
                >
                    <Link href="/gallery">
                        <motion.div
                            whileHover={{ scale: 1.04, y: -4, boxShadow: "0 12px 32px rgba(139,47,201,0.5)" }}
                            whileTap={{ scale: 0.96 }}
                            className="flex items-center gap-3 border-4 border-[#8B2FC9] bg-[#8B2FC9] px-8 py-4 text-base uppercase tracking-wider text-white hover:bg-[#A040E8] cursor-pointer"
                            style={{ willChange: "transform" }}
                        >
                            <span className="text-xl">📸</span>
                            Open Full Gallery
                            <span className="text-xl">→</span>
                        </motion.div>
                    </Link>

                    <motion.a
                        href="https://www.instagram.com/im.chikkamagalurian?igsh=ZjRvM2F5OWsyaDdj"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.04, y: -4 }}
                        whileTap={{ scale: 0.96 }}
                        className="flex items-center gap-3 border-4 border-[#E1306C] bg-transparent px-8 py-4 text-base uppercase tracking-wider text-[#E1306C] hover:bg-[#E1306C]/10"
                    >
                        <span className="text-xl">🎬</span>
                        View on Instagram
                    </motion.a>
                </motion.div>
            </div>
        </section>
    )
}
