"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function AnimatedBackground() {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-[#050505]">
            {/* Deep Space Base */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0c0c14] via-[#050505] to-[#0a0a0f]" />

            {/* Dynamic Mesh Gradients (Futuristic Neons) */}
            <motion.div
                animate={{
                    x: [0, 40, -40, 0],
                    y: [0, -60, 60, 0],
                    scale: [1, 1.2, 0.9, 1],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                }}
                style={{ willChange: "transform" }}
                className="absolute top-[-10%] left-[-10%] h-[60%] w-[60%] rounded-full bg-purple-600/10 blur-[120px]"
            />

            <motion.div
                animate={{
                    x: [0, -50, 50, 0],
                    y: [0, 40, -40, 0],
                    scale: [1, 1.1, 1.2, 1],
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear",
                }}
                style={{ willChange: "transform" }}
                className="absolute bottom-[-10%] right-[-10%] h-[70%] w-[70%] rounded-full bg-blue-600/10 blur-[120px]"
            />

            <motion.div
                animate={{
                    opacity: [0.1, 0.3, 0.1],
                    scale: [0.8, 1.1, 0.8],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                style={{ willChange: "transform" }}
                className="absolute top-[30%] left-[20%] h-[40%] w-[40%] rounded-full bg-cyan-500/5 blur-[100px]"
            />

            {/* Futuristic Tech Grid */}
            <div
                className="absolute inset-0 opacity-[0.1]"
                style={{
                    backgroundImage: `linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                    maskImage: 'radial-gradient(ellipse at center, black, transparent 80%)'
                }}
            />

            {/* Moving Scanning Line */}
            <motion.div
                animate={{
                    top: ["-5%", "105%"]
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent opacity-50"
            />

            {/* Floating Particles (Tech specs) */}
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{
                        x: Math.random() * 100 + "%",
                        y: Math.random() * 100 + "%",
                        opacity: Math.random() * 0.5
                    }}
                    animate={{
                        y: ["-10%", "110%"],
                        opacity: [0, 0.8, 0]
                    }}
                    transition={{
                        duration: Math.random() * 10 + 10,
                        repeat: Infinity,
                        ease: "linear",
                        delay: Math.random() * 5
                    }}
                    className="absolute h-[1px] w-[1px] bg-white"
                />
            ))}

            {/* Digital Vibe Overlay */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] contrast-150 brightness-150" />
        </div>
    )
}
