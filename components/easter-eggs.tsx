"use client"

import { useEffect, useState } from "react"
import { useAchievement } from "@/contexts/achievement-context"
import { useSound } from "@/contexts/sound-context"

const KONAMI_CODE = [
    "ArrowUp", "ArrowUp",
    "ArrowDown", "ArrowDown",
    "ArrowLeft", "ArrowRight",
    "ArrowLeft", "ArrowRight",
    "b", "a"
]

export function EasterEggs() {
    const [input, setInput] = useState<string[]>([])
    const { unlockAchievement } = useAchievement()
    const { playSuccess } = useSound() // We could make a custom explosion sound if synthesized

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const key = e.key

            setInput((prev) => {
                const updated = [...prev, key].slice(-KONAMI_CODE.length)

                if (JSON.stringify(updated) === JSON.stringify(KONAMI_CODE)) {
                    // Trigger Easter Egg!
                    unlockAchievement("monster_hunter")
                    playSuccess()

                    // Visual Effect: Rotate the entire site? Or Shake?
                    document.body.style.transition = "transform 0.5s"
                    document.body.style.transform = "rotate(360deg)"
                    setTimeout(() => {
                        document.body.style.transform = "none"
                    }, 1000)

                    return []
                }

                return updated
            })
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [unlockAchievement, playSuccess])

    return null // Invisible component
}
