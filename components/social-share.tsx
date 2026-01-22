"use client"

import { motion } from "framer-motion"

interface ShareButton {
    name: string
    icon: string
    color: string
    getUrl: (url: string, title: string) => string
}

const shareButtons: ShareButton[] = [
    {
        name: "Twitter",
        icon: "𝕏",
        color: "#000000",
        getUrl: (url, title) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    },
    {
        name: "LinkedIn",
        icon: "💼",
        color: "#0077B5",
        getUrl: (url, title) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    },
    {
        name: "Facebook",
        icon: "📘",
        color: "#1877F2",
        getUrl: (url) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    },
    {
        name: "WhatsApp",
        icon: "💬",
        color: "#25D366",
        getUrl: (url, title) => `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`,
    },
]

export function SocialShare() {
    const shareUrl = "https://mohammed-razin-cr.tech"
    const shareTitle = "Check out Mohammed Razin's Minecraft Portfolio! 🧱✨"

    const handleShare = (button: ShareButton) => {
        const url = button.getUrl(shareUrl, shareTitle)
        window.open(url, '_blank', 'width=600,height=400')
    }

    const handleCopyLink = () => {
        navigator.clipboard.writeText(shareUrl)
        // You could add a toast notification here
        alert("Link copied to clipboard! 📋")
    }

    return (
        <div className="border-4 border-[#373737] bg-[#C6C6C6] p-4">
            <h3 className="mb-3 text-sm uppercase tracking-wider text-[#373737]">Share This Portfolio</h3>

            <div className="flex flex-wrap gap-2">
                {shareButtons.map((button) => (
                    <motion.button
                        key={button.name}
                        onClick={() => handleShare(button)}
                        whileHover={{ scale: 1.1, y: -3 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex h-10 w-10 items-center justify-center border-2 border-[#373737] text-xl transition-colors"
                        style={{ backgroundColor: button.color }}
                        aria-label={`Share on ${button.name}`}
                        title={`Share on ${button.name}`}
                    >
                        {button.icon}
                    </motion.button>
                ))}

                {/* Copy Link Button */}
                <motion.button
                    onClick={handleCopyLink}
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex h-10 w-10 items-center justify-center border-2 border-[#373737] bg-[#8B8B8B] text-xl transition-colors hover:bg-[#9B9B9B]"
                    aria-label="Copy link"
                    title="Copy link"
                >
                    🔗
                </motion.button>
            </div>
        </div>
    )
}
