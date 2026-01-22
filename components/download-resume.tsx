"use client"

import { motion } from "framer-motion"
import { useAchievement } from "@/contexts/achievement-context"

export function DownloadResume() {
    const { unlockAchievement } = useAchievement()

    const downloadResume = () => {
        const link = document.createElement('a')
        link.href = '/Mohammed Razin CR.pdf'
        link.download = 'Mohammed Razin CR.pdf'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        unlockAchievement("getting_upgrade")
    }

    return (
        <motion.button
            onClick={downloadResume}
            whileHover={{ scale: 1.05, y: -3, boxShadow: "0 10px 25px rgba(139, 105, 20, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 border-4 border-[#373737] bg-[#8B6914] px-6 py-3 text-sm uppercase tracking-wider text-white transition-colors hover:bg-[#6B4F10]"
        >
            <span>📄</span> Download Resume
        </motion.button>
    )
}
