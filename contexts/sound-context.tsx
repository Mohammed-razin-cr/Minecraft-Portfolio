"use client"

import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from "react"

interface SoundContextType {
    isMuted: boolean
    toggleMute: () => void
    playClick: () => void
    playHover: () => void
    playSuccess: () => void
}

const SoundContext = createContext<SoundContextType | undefined>(undefined)

export function SoundProvider({ children }: { children: React.ReactNode }) {
    const [isMuted, setIsMuted] = useState(false)
    const audioContextRef = useRef<AudioContext | null>(null)

    // Initialize AudioContext on first interaction
    const initAudio = () => {
        if (!audioContextRef.current) {
            const AudioCtx = window.AudioContext || (window as any).webkitAudioContext
            audioContextRef.current = new AudioCtx()
        }
        if (audioContextRef.current.state === "suspended") {
            audioContextRef.current.resume()
        }
    }

    const toggleMute = () => {
        setIsMuted(!isMuted)
        if (!isMuted) {
            playClick() // Play one last click to confirm mute... or maybe not?
        }
    }

    const playTone = useCallback((
        freq: number,
        type: OscillatorType,
        duration: number,
        vol: number = 0.1,
        slideFreq?: number
    ) => {
        if (isMuted) return
        initAudio()
        const ctx = audioContextRef.current
        if (!ctx) return

        const osc = ctx.createOscillator()
        const gain = ctx.createGain()

        osc.type = type
        osc.frequency.setValueAtTime(freq, ctx.currentTime)
        if (slideFreq) {
            osc.frequency.exponentialRampToValueAtTime(slideFreq, ctx.currentTime + duration)
        }

        gain.gain.setValueAtTime(vol, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration)

        osc.connect(gain)
        gain.connect(ctx.destination)

        osc.start()
        osc.stop(ctx.currentTime + duration)
    }, [isMuted])

    // Minecraft-style Click (dispenser/click sound)
    const playClick = useCallback(() => {
        // Sharp click: High pitch random noise or high square wave with quick decay
        playTone(800, "square", 0.05, 0.05)
    }, [playTone])

    // Subtle Hover ( UI Blip )
    const playHover = useCallback(() => {
        playTone(400, "sine", 0.03, 0.02)
    }, [playTone])

    // Success / Achievement / Level Up (Chime)
    const playSuccess = useCallback(() => {
        const now = audioContextRef.current?.currentTime || 0
        // Arpeggio
        setTimeout(() => playTone(523.25, "square", 0.1, 0.05), 0)   // C5
        setTimeout(() => playTone(659.25, "square", 0.1, 0.05), 100) // E5
        setTimeout(() => playTone(783.99, "square", 0.2, 0.05), 200) // G5
    }, [playTone])

    return (
        <SoundContext.Provider value={{ isMuted, toggleMute, playClick, playHover, playSuccess }}>
            {children}
        </SoundContext.Provider>
    )
}

export function useSound() {
    const context = useContext(SoundContext)
    if (context === undefined) {
        throw new Error("useSound must be used within a SoundProvider")
    }
    return context
}
