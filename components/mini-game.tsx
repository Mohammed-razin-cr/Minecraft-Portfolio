"use client"

import { useState, useCallback, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useAchievement } from "@/contexts/achievement-context"
import { useSound } from "@/contexts/sound-context"

const GRID_SIZE = 5
const TOTAL_BLOCKS = GRID_SIZE * GRID_SIZE

const BLOCKS = {
    DIRT: "#8B6914",
    STONE: "#7F7F7F",
    COAL: "#1C1C1C",
    DIAMOND_ORE: "#00CED1",
    CREEPER: "#38CD38",
    TNT: "#DB2B2B"
}

type GameState = "PLAYING" | "WON" | "LOST"

export function BlockBreakerGame() {
    const [grid, setGrid] = useState<string[]>([])
    const [gameState, setGameState] = useState<GameState>("PLAYING")
    const [isOpen, setIsOpen] = useState(false)
    const [moves, setMoves] = useState(0)

    const { unlockAchievement } = useAchievement()
    const { playClick, playSuccess } = useSound()

    const resetGame = useCallback(() => {
        const newGrid = Array(TOTAL_BLOCKS).fill("DIRT")

        const placeRandom = (type: string, count: number) => {
            for (let i = 0; i < count; i++) {
                let idx
                do {
                    idx = Math.floor(Math.random() * TOTAL_BLOCKS)
                } while (newGrid[idx] !== "DIRT")
                newGrid[idx] = type
            }
        }

        placeRandom("STONE", 5)
        placeRandom("COAL", 4)
        placeRandom("CREEPER", 3)
        placeRandom("TNT", 1)
        placeRandom("DIAMOND_ORE", 1)

        setGrid(newGrid)
        setGameState("PLAYING")
        setMoves(0)
    }, [])

    useEffect(() => {
        if (isOpen) {
            resetGame()
        }
    }, [isOpen, resetGame])

    const handleBreak = (index: number) => {
        if (gameState !== "PLAYING" || !grid[index]) return

        playClick()
        setMoves(prev => prev + 1)

        const blockType = grid[index]

        if (blockType === "DIAMOND_ORE") {
            setGameState("WON")
            playSuccess()
            unlockAchievement("monster_hunter")
        } else if (blockType === "CREEPER") {
            setGameState("LOST")
        } else if (blockType === "TNT") {
            const newGrid = [...grid]
            const row = Math.floor(index / GRID_SIZE)
            const col = index % GRID_SIZE

            for (let r = row - 1; r <= row + 1; r++) {
                for (let c = col - 1; c <= col + 1; c++) {
                    if (r >= 0 && r < GRID_SIZE && c >= 0 && c < GRID_SIZE) {
                        const idx = r * GRID_SIZE + c
                        if (newGrid[idx] === "DIAMOND_ORE") {
                        } else if (newGrid[idx] === "CREEPER") {
                        }
                        newGrid[idx] = ""
                    }
                }
            }
            newGrid[index] = ""
            setGrid(newGrid)
            return
        }

        const newGrid = [...grid]
        newGrid[index] = ""
        setGrid(newGrid)
    }

    return (
        <>
            <motion.button
                onClick={() => setIsOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-4 border-4 border-b-8 border-r-8 border-[#373737] bg-[#5D8C3C] px-6 py-2 text-white uppercase tracking-wider block mx-auto font-bold shadow-lg active:border-b-4 active:border-r-4 active:mt-5 transition-all"
            >
                🎮 Play Mine-Sweeper
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-[#C6C6C6] border-4 border-white outline outline-4 outline-[#373737] p-4 max-w-sm w-full shadow-2xl relative"
                        >
                            <div className="flex justify-between items-center mb-4 bg-[#373737] p-2 text-white border-b-4 border-[#1a1a1a]">
                                <span className="font-bold tracking-wider">MINING...</span>
                                <div className="flex gap-4">
                                    <span>Moves: {moves}</span>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="text-red-400 hover:text-red-600 font-bold"
                                    >
                                        ✖
                                    </button>
                                </div>
                            </div>

                            <div
                                className="grid grid-cols-5 gap-1 bg-[#222] p-2 border-4 border-[#555] shadow-inner"
                                style={{ aspectRatio: "1/1" }}
                            >
                                {grid.map((blockType, i) => (
                                    <motion.button
                                        key={i}
                                        onClick={() => handleBreak(i)}
                                        disabled={!blockType || gameState !== "PLAYING"}
                                        whileHover={blockType && gameState === "PLAYING" ? { scale: 1.1, zIndex: 10 } : {}}
                                        whileTap={blockType && gameState === "PLAYING" ? { scale: 0.9 } : {}}
                                        className="w-full h-full relative"
                                    >
                                        {blockType ? (
                                            <div
                                                className="w-full h-full"
                                                style={{
                                                    backgroundColor: BLOCKS[blockType as keyof typeof BLOCKS] || BLOCKS.DIRT,
                                                    boxShadow: "inset 4px 4px 0px rgba(255,255,255,0.2), inset -4px -4px 0px rgba(0,0,0,0.2)",
                                                    imageRendering: "pixelated"
                                                }}
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-[#000] opacity-20" />
                                        )}

                                        {blockType && (
                                            <div className="absolute inset-0 bg-[#5D8C3C] border-2 border-[#6aa146]"
                                                style={{
                                                    boxShadow: "inset 4px 4px 0px rgba(255,255,255,0.2), inset -4px -4px 0px rgba(0,0,0,0.2)"
                                                }}
                                            />
                                        )}
                                    </motion.button>
                                ))}
                            </div>

                            {gameState === "WON" && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute inset-0 flex items-center justify-center bg-black/60 z-20"
                                >
                                    <div className="bg-[#373737] p-6 border-4 border-white text-center">
                                        <h3 className="text-2xl text-yellow-400 font-bold mb-2">💎 DIAMOND! 💎</h3>
                                        <p className="text-white mb-4">You found it in {moves} moves!</p>
                                        <button onClick={resetGame} className="bg-[#5D8C3C] px-4 py-2 text-white border-2 border-[#1a1a1a] hover:bg-[#4a7230]">
                                            Play Again
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {gameState === "LOST" && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute inset-0 flex items-center justify-center bg-black/60 z-20"
                                >
                                    <div className="bg-[#373737] p-6 border-4 border-white text-center">
                                        <h3 className="text-2xl text-green-500 font-bold mb-2">☠️ SSSssss... BOOM!</h3>
                                        <p className="text-white mb-4">You hit a Creeper!</p>
                                        <button onClick={resetGame} className="bg-[#DB2B2B] px-4 py-2 text-white border-2 border-[#1a1a1a] hover:bg-[#b02222]">
                                            Try Again
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    )
}
