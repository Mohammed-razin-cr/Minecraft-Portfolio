"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface Particle {
    id: number
    x: number
    y: number
    color: string
    velocity: { x: number; y: number }
    size: number
}

const PARTICLE_COLORS = ["#5D8C3C", "#795548", "#7F7F7F", "#C6C6C6", "#373737"]

export function GlobalParticles() {
    const [particles, setParticles] = useState<Particle[]>([])

    const spawnParticles = useCallback((e: MouseEvent) => {
        // Determine color based on what was clicked (optional, but defaults are fine)
        // We'll spawn 4-6 particles
        const count = 4 + Math.floor(Math.random() * 3)
        const newParticles: Particle[] = []

        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2
            const speed = 2 + Math.random() * 3

            newParticles.push({
                id: Date.now() + i,
                x: e.clientX,
                y: e.clientY,
                color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
                velocity: {
                    x: Math.cos(angle) * speed,
                    y: Math.sin(angle) * speed - 2 // Initial upward burst
                },
                size: 4 + Math.random() * 6 // 4px to 10px pixels
            })
        }

        setParticles(prev => [...prev, ...newParticles])
    }, [])

    useEffect(() => {
        window.addEventListener("click", spawnParticles)
        return () => window.removeEventListener("click", spawnParticles)
    }, [spawnParticles])

    // Physics Loop
    useEffect(() => {
        if (particles.length === 0) return

        const interval = setInterval(() => {
            setParticles(prev => prev.map(p => ({
                ...p,
                x: p.x + p.velocity.x,
                y: p.y + p.velocity.y,
                velocity: {
                    x: p.velocity.x * 0.9, // Air resistance
                    y: p.velocity.y + 0.5  // Gravity
                }
            })).filter(p => p.y < window.innerHeight + 20)) // Remove below screen (roughly)
        }, 16) // ~60fps

        return () => clearInterval(interval)
    }, [particles.length])

    // Cleanup old particles to prevent memory leaks if they don't fall off screen fast enough
    useEffect(() => {
        if (particles.length > 50) {
            setParticles(prev => prev.slice(prev.length - 50))
        }
    }, [particles.length])

    return (
        <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
            <AnimatePresence>
                {particles.map(p => (
                    <motion.div
                        key={p.id}
                        initial={{ opacity: 1, scale: 1 }}
                        animate={{ opacity: 0, scale: 0 }}
                        transition={{ duration: 0.8, ease: "easeIn" }}
                        onAnimationComplete={() => {
                            setParticles(prev => prev.filter(particle => particle.id !== p.id))
                        }}
                        style={{
                            position: "absolute",
                            left: p.x,
                            top: p.y,
                            width: p.size,
                            height: p.size,
                            backgroundColor: p.color,
                            boxShadow: "2px 2px 0 rgba(0,0,0,0.2)"
                        }}
                    />
                ))}
            </AnimatePresence>
        </div>
    )
}
