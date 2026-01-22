"use client"

import { useState, useCallback, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useAchievement } from "@/contexts/achievement-context"
import { useSound } from "@/contexts/sound-context"

const GRID_SIZE = 5
const TOTAL_BLOCKS = GRID_SIZE * GRID_SIZE

// Block types
const BLOCKS = {
    DIRT: "#8B6914",
    STONE: "#7F7F7F",
    COAL: "#1C1C1C",
    DIAMOND_ORE: "#00CED1"
}

export function BlockBreakerGame() {
    const [grid, setGrid] = useState<string[]>([])
    const [foundDiamond, setFoundDiamond] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    const { unlockAchievement } = useAchievement()
    const { playClick, playSuccess } = useSound()

    // Initialize game
    const resetGame = useCallback(() => {
        const newGrid = Array(TOTAL_BLOCKS).fill("DIRT")
        // Add some random ores
        for (let i = 0; i < 5; i++) {
            newGrid[Math.floor(Math.random() * TOTAL_BLOCKS)] = "STONE"
        }
        for (let i = 0; i < 3; i++) {
            newGrid[Math.floor(Math.random() * TOTAL_BLOCKS)] = "COAL"
        }
        // One diamond
        const diamondIndex = Math.floor(Math.random() * TOTAL_BLOCKS)
        newGrid[diamondIndex] = "DIAMOND_ORE"

        setGrid(newGrid)
        setFoundDiamond(false)
    }, [])

    useEffect(() => {
        resetGame()
    }, [resetGame])

    const handleBreak = (index: number) => {
        if (!grid[index]) return // Already broken

        playClick()

        if (grid[index] === "DIAMOND_ORE") {
            setFoundDiamond(true)
            playSuccess()
            unlockAchievement("monster_hunter") // Or a new achievement "miner"
            // Let's assume reuse for now or add "miner" later
        }

        const newGrid = [...grid]
        newGrid[index] = "" // Broken
        setGrid(newGrid)
    }

    return (
        <>
            <motion.button
                onClick={() => setIsOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-4 border-4 border-[#373737] bg-[#5D8C3C] px-6 py-2 text-white uppercase tracking-wider block mx-auto"
            >
                🎮 Play Mini Game
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-[#C6C6C6] border-4 border-[#373737] p-4 max-w-sm w-full shadow-2xl relative"
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-2 right-2 text-[#373737] hover:text-red-600 font-bold"
                            >
                                ✖
                            </button>

                            <h2 className="text-xl text-center mb-4 uppercase tracking-wider text-[#373737]">
                                Find the Diamond! 💎
                            </h2>

                            <div
                                className="grid grid-cols-5 gap-1 bg-[#373737] p-2 border-2 border-[#8B8B8B]"
                                style={{ aspectRatio: "1/1" }}
                            >
                                {grid.map((blockType, i) => (
                                    <motion.button
                                        key={i}
                                        onClick={() => handleBreak(i)}
                                        disabled={!blockType}
                                        whileHover={blockType ? { scale: 1.1, zIndex: 10 } : {}}
                                        whileTap={blockType ? { scale: 0.9 } : {}}
                                        className="w-full h-full relative"
                                    >
                                        {blockType ? (
                                            <div
                                                className="w-full h-full block-shadow"
                                                style={{
                                                    backgroundColor: BLOCKS[blockType as keyof typeof BLOCKS] || BLOCKS.DIRT,
                                                    border: "2px solid rgba(0,0,0,0.2)"
                                                }}
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-[#1a1a1a] opacity-50" />
                                        )}
                                    </motion.button>
                                ))}
                            </div>

                            {foundDiamond && (
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    className="mt-4 text-center p-2 bg-[#8B6914] text-white border-2 border-[#373737]"
                                >
                                    <p className="font-bold">🎉 DIAMOND FOUND!</p>
                                    <button
                                        onClick={resetGame}
                                        className="mt-2 text-xs underline hover:text-yellow-200"
                                    >
                                        Play Again
                                    </button>
                                </motion.div>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    )
}
