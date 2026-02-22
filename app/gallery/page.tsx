"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { BackToTop } from "@/components/back-to-top"
import { AnimatedBackground } from "@/components/animated-background"

// ─── DATA ──────────────────────────────────────────────────────────────────────

interface Photo {
    id: string
    src: string
    caption: string
    tag: string
}

interface Video {
    id: string
    src: string
    thumbnail?: string
    caption: string
    url?: string
    views?: string
    tag: string
    type: "reel" | "video"
}

const PHOTOS: Photo[] = [
    { id: "p1", src: "/gallery/IMG_0928.JPG", caption: "The Taj Mahal Palace, Mumbai", tag: "City 🏙️" },
    { id: "p2", src: "/gallery/IMG_2178.JPG", caption: "Hidden Jungle Waterfall", tag: "Nature 🌿" },
    { id: "p3", src: "/gallery/IMG_3332.JPG", caption: "Chikkamagaluru Rain Drops", tag: "Nature 🌿" },
    { id: "p4", src: "/gallery/IMG_3725.JPG", caption: "Western Ghats View", tag: "Landscape 🌄" },
    { id: "p5", src: "/gallery/IMG_3733.JPG", caption: "Coffee Estate Trails", tag: "Nature 🌿" },
    { id: "p6", src: "/gallery/IMG_5192.JPG", caption: "Mist over the Mountains", tag: "Landscape 🌄" },
    { id: "p7", src: "/gallery/IMG_5195.JPG", caption: "Street View", tag: "Street 🌆" },
    { id: "p8", src: "/gallery/IMG_6333.JPG", caption: "Distant Hills", tag: "Landscape 🌄" },
    { id: "p9", src: "/gallery/IMG_6969.JPG", caption: "Dusk at the Valley", tag: "Sunset 🌅" },
    { id: "p10", src: "/gallery/IMG_7026.JPG", caption: "Mountain Pass", tag: "Nature 🌿" },
    { id: "p11", src: "/gallery/IMG_7199.JPG", caption: "Forest Canopy", tag: "Nature 🌿" },
    { id: "p12", src: "/gallery/IMG_7792.JPG", caption: "Local Residents (Monkeys)", tag: "Nature 🌿" },
    { id: "p13", src: "/gallery/IMG_5702.PNG", caption: "Cultural Heritage", tag: "Art 🎨" },
    { id: "p14", src: "/gallery/IMG_5575.JPG", caption: "Classical Dance Performance", tag: "Culture 🎭" },
    { id: "p15", src: "/gallery/IMG_8355.JPG", caption: "Foggy Peak Swing", tag: "Landscape 🌄" },
    { id: "p16", src: "/gallery/IMG_8061.JPG", caption: "River Bank Serenity", tag: "Nature 🌿" },
]

const VIDEOS: Video[] = [
    {
        id: "v1",
        src: "/gallery/IMG_2411.mp4",
        caption: "Hill Station Morning Vibes",
        tag: "Travel ✈️",
        type: "reel",
        views: "1.2k"
    },
    {
        id: "v2",
        src: "/gallery/IMG_3338.mp4",
        caption: "Cinematic Forest Stream",
        tag: "Cinematic 🎬",
        type: "reel",
        views: "800"
    },
    {
        id: "v3",
        src: "/gallery/IMG_3790.mp4",
        caption: "Coffee Estate Walkthrough",
        tag: "Nature 🌿",
        type: "reel",
        views: "1.5k"
    },
    {
        id: "v4",
        src: "/gallery/IMG_4531.mp4",
        caption: "Rainy Day Loops",
        tag: "Nature 🌿",
        type: "reel",
        views: "600"
    },
    {
        id: "v5",
        src: "/gallery/IMG_4533.mp4",
        caption: "Winding Mountain Drive",
        tag: "Vlog 📹",
        type: "video"
    },
    {
        id: "v6",
        src: "/gallery/IMG_4895.mp4",
        caption: "Monsoon Moods",
        tag: "Cinematic 🎬",
        type: "video"
    },
    {
        id: "v7",
        src: "/gallery/IMG_5176.mp4",
        caption: "Foggy Peaks Drone-style",
        tag: "Landscape 🌄",
        type: "video"
    },
    {
        id: "v8",
        src: "/gallery/IMG_5563.mp4",
        caption: "Traditional Marriage Vibes",
        tag: "Marriage 💍",
        type: "video"
    },
    {
        id: "v9",
        src: "/gallery/IMG_7931.mp4",
        caption: "Golden Hour Cinematic Flight",
        tag: "Sunset 🌅",
        type: "video"
    },
]

// ─── COMPONENT ─────────────────────────────────────────────────────────────────

export default function GalleryPage() {
    const [activeTab, setActiveTab] = useState<"photos" | "videos">("photos")
    const [activePhoto, setActivePhoto] = useState<Photo | null>(null)
    const [activeVideo, setActiveVideo] = useState<Video | null>(null)
    const [loaded, setLoaded] = useState(false)

    useEffect(() => { setLoaded(true) }, [])

    return (
        <div className="relative min-h-screen font-sans text-white">
            <AnimatedBackground />

            {/* ── HEADER ── */}
            <header className="sticky top-0 z-40 border-b border-cyan-500/30 bg-black/40 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
                <div className="container mx-auto flex items-center justify-between px-4 py-4">
                    <Link href="/">
                        <motion.div
                            whileHover={{ x: -4, scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 border border-cyan-500/50 bg-cyan-500/10 px-4 py-2 text-xs uppercase tracking-[0.2em] font-bold text-cyan-400 hover:bg-cyan-500/20 cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.2)]"
                        >
                            ← Home
                        </motion.div>
                    </Link>

                    <div className="flex flex-col items-center">
                        <div className="flex items-center gap-3">
                            <h1 className="text-xl sm:text-2xl uppercase tracking-[0.3em] font-black text-white leading-tight">
                                Gallery
                            </h1>
                        </div>
                        <p className="text-[10px] text-cyan-500/60 uppercase tracking-[0.4em] font-bold mt-1">
                            Photos & Reels
                        </p>
                    </div>

                    <motion.a
                        href="https://www.instagram.com/im.chikkamagalurian?igsh=ZjRvM2F5OWsyaDdj"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05, y: -2, boxShadow: "0 0 20px rgba(225, 48, 108, 0.4)" }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 border border-pink-500/50 bg-pink-500/10 px-4 py-2 text-xs uppercase font-bold tracking-widest text-pink-400 hover:bg-pink-500/20"
                    >
                        <span>🎬</span>
                        <span className="hidden sm:inline">Instagram</span>
                    </motion.a>
                </div>
            </header>

            {/* ── TABS ── */}
            <div className="container mx-auto px-4 pt-10 pb-6">
                <div className="flex gap-2 p-1 border border-white/10 w-fit backdrop-blur-md bg-white/5 rounded-lg">
                    {(["photos", "videos"] as const).map((tab) => (
                        <motion.button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            whileTap={{ scale: 0.95 }}
                            className={`flex items-center gap-3 px-10 py-4 text-xs uppercase font-black tracking-[0.2em] transition-all rounded-md ${activeTab === tab
                                ? "bg-cyan-500 text-black shadow-[0_0_25px_rgba(6,182,212,0.5)]"
                                : "text-white/40 hover:text-white hover:bg-white/5"
                                }`}
                        >
                            {tab === "photos" ? "📷 Photos" : "🎬 Videos"}
                            <span
                                className={`ml-2 text-[10px] opacity-60 ${activeTab === tab ? "text-black" : "text-cyan-500"}`}
                            >
                                [{tab === "photos" ? PHOTOS.length : VIDEOS.length}]
                            </span>
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* ── CONTENT GRID ── */}
            <div className="container mx-auto px-4 pb-24">
                <AnimatePresence mode="wait">

                    {/* ─── PHOTOS TAB ─── */}
                    {activeTab === "photos" && (
                        <motion.div
                            key="photos"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.5, ease: "circOut" }}
                        >
                            <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                                <AnimatePresence mode="popLayout">
                                    {PHOTOS.map((photo, i) => (
                                        <GalleryItem
                                            key={photo.id}
                                            src={photo.src}
                                            caption={photo.caption}
                                            tag={photo.tag}
                                            index={i}
                                            onClick={() => setActivePhoto(photo)}
                                        />
                                    ))}
                                </AnimatePresence>
                            </motion.div>
                        </motion.div>
                    )}

                    {/* ─── VIDEOS TAB ─── */}
                    {activeTab === "videos" && (
                        <motion.div
                            key="videos"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.5, ease: "circOut" }}
                        >
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                                <AnimatePresence mode="popLayout">
                                    {VIDEOS.map((video, i) => (
                                        <VideoItem
                                            key={video.id}
                                            video={video}
                                            index={i}
                                            onClick={() => setActiveVideo(video)}
                                        />
                                    ))}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>

            {/* ── LIGHTBOXES ── */}
            <PhotoLightbox photo={activePhoto} onClose={() => setActivePhoto(null)} />
            <VideoLightbox video={activeVideo} onClose={() => setActiveVideo(null)} />

            <BackToTop />
        </div>
    )
}

// ─── HELPER COMPONENTS ─────────────────────────────────────────────────────────

function GalleryItem({ src, caption, tag, index, onClick }: { src: string, caption: string, tag: string, index: number, onClick: () => void }) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ delay: index * 0.05, duration: 0.4 }}
            whileHover={{ y: -10, scale: 1.02 }}
            onClick={onClick}
            style={{ willChange: "transform" }}
            className="group relative aspect-square cursor-pointer overflow-hidden border border-white/10 bg-black/40 backdrop-blur-sm shadow-2xl transition-all duration-500 hover:border-cyan-500/50"
        >
            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

            <Image
                src={src}
                alt={caption}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 high-quality group-hover:scale-105"
                loading={index < 8 ? "eager" : "lazy"}
                priority={index < 4}
            />

            <div className="absolute inset-0 z-10 flex flex-col items-center justify-end bg-gradient-to-t from-black via-black/20 to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-cyan-400 mb-2">{tag}</span>
                <p className="text-[11px] font-bold uppercase tracking-widest text-white text-center leading-relaxed max-w-[90%]">{caption}</p>
            </div>

            <div className="absolute right-4 top-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-cyan-500/20 backdrop-blur-md p-2 border border-cyan-500/30">
                    <span className="text-xs text-cyan-400">VIEW</span>
                </div>
            </div>
        </motion.div>
    )
}

function VideoItem({ video, index, onClick }: { video: Video, index: number, onClick: () => void }) {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [isPreviewLoading, setIsPreviewLoading] = useState(false)

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ delay: index * 0.05, duration: 0.4 }}
            whileHover={{ y: -10, scale: 1.02 }}
            onClick={onClick}
            onMouseEnter={() => {
                if (videoRef.current) {
                    setIsPreviewLoading(true)
                    videoRef.current.play().catch(() => setIsPreviewLoading(false))
                }
            }}
            onMouseLeave={() => {
                if (videoRef.current) {
                    videoRef.current.pause()
                    videoRef.current.currentTime = 0
                    setIsPreviewLoading(false)
                }
            }}
            className="group relative overflow-hidden border border-white/10 bg-black/40 backdrop-blur-sm cursor-pointer shadow-2xl transition-all duration-500 hover:border-pink-500/50"
            style={{ willChange: "transform", aspectRatio: video.type === "reel" ? "9/16" : "1/1" }}
        >
            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-pink-500/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

            <video
                ref={videoRef}
                src={video.src}
                muted
                loop
                playsInline
                preload="none"
                onPlaying={() => setIsPreviewLoading(false)}
                className="h-full w-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700 high-quality"
            />

            {/* Preview Loading Spinner */}
            {isPreviewLoading && (
                <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/20">
                    <div className="h-6 w-6 border-2 border-pink-500/30 border-t-pink-500 rounded-full animate-spin" />
                </div>
            )}

            <div className="absolute inset-0 z-20 flex flex-col items-center justify-end bg-gradient-to-t from-black via-black/20 to-transparent p-5">
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-pink-400 mb-2">{video.tag}</span>
                <p className="text-[11px] font-bold uppercase tracking-widest text-white text-center leading-relaxed truncate w-full">{video.caption}</p>
            </div>

            <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none group-hover:opacity-0 transition-opacity duration-300">
                <div className="flex h-16 w-16 items-center justify-center border border-white/20 bg-white/5 backdrop-blur-sm rounded-full">
                    <span className="text-xl ml-1 text-cyan-400">▶</span>
                </div>
            </div>

            <div className="absolute right-4 top-4 z-20">
                <span className="bg-pink-500/20 backdrop-blur-md px-3 py-1 text-[8px] font-black text-pink-400 tracking-[0.2em] uppercase border border-pink-500/30">
                    {video.type}
                </span>
            </div>
        </motion.div>
    )
}

function PhotoLightbox({ photo, onClose }: { photo: Photo | null, onClose: () => void }) {
    return (
        <AnimatePresence>
            {photo && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 40 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 40 }}
                        className="fixed inset-4 sm:inset-10 md:inset-20 z-[101] flex flex-col border border-white/10 bg-black/60 shadow-[0_0_100px_rgba(6,182,212,0.15)] overflow-hidden rounded-xl"
                    >
                        <div className="flex items-center justify-between border-b border-white/5 bg-white/5 px-8 py-5">
                            <div className="flex items-center gap-4">
                                <div className="h-2 w-2 bg-cyan-500 animate-pulse rounded-full" />
                                <div>
                                    <h2 className="text-xs sm:text-sm font-black uppercase tracking-[0.3em] text-white leading-none mb-2">{photo.caption}</h2>
                                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-cyan-500">Photo ID: {photo.id.toUpperCase()}</span>
                                </div>
                            </div>
                            <button onClick={onClose} className="h-10 w-10 flex items-center justify-center border border-white/10 text-white/40 hover:text-white hover:bg-white/5 transition-all rounded-md">
                                <span className="text-lg">✕</span>
                            </button>
                        </div>
                        <div className="flex-1 overflow-hidden p-8 flex items-center justify-center relative">
                            <Image
                                src={photo.src}
                                alt={photo.caption}
                                fill
                                className="object-contain high-quality shadow-[0_0_50px_rgba(0,0,0,0.5)]"
                                sizes="90vw"
                            />
                        </div>
                        <div className="border-t border-white/5 bg-white/5 px-8 py-4 flex justify-between items-center text-[9px] font-bold uppercase tracking-widest text-white/30">
                            <span>Tag: {photo.tag}</span>
                            <span className="text-cyan-500/50">High Quality Render</span>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}

function VideoLightbox({ video, onClose }: { video: Video | null, onClose: () => void }) {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (video) setIsLoading(true)
    }, [video])

    return (
        <AnimatePresence>
            {video && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 40 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 40 }}
                        className="fixed inset-4 sm:inset-10 md:inset-20 z-[101] flex flex-col border border-white/10 bg-black/60 shadow-[0_0_100px_rgba(236,72,153,0.15)] overflow-hidden rounded-xl"
                    >
                        <div className="flex items-center justify-between border-b border-white/5 bg-white/5 px-8 py-5">
                            <div className="flex items-center gap-4">
                                <div className="h-2 w-2 bg-pink-500 animate-pulse rounded-full" />
                                <div>
                                    <h2 className="text-xs sm:text-sm font-black uppercase tracking-[0.3em] text-white leading-none mb-2">{video.caption}</h2>
                                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-pink-500">Video ID: {video.id.toUpperCase()}</span>
                                </div>
                            </div>
                            <button onClick={onClose} className="h-10 w-10 flex items-center justify-center border border-white/10 text-white/40 hover:text-white hover:bg-white/5 transition-all rounded-md">
                                <span className="text-lg">✕</span>
                            </button>
                        </div>
                        <div className="flex-1 overflow-hidden bg-black flex items-center justify-center relative">
                            {isLoading && (
                                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm">
                                    <div className="h-12 w-12 border-4 border-pink-500/30 border-t-pink-500 rounded-full animate-spin mb-4" />
                                    <p className="text-[10px] uppercase tracking-[0.3em] text-pink-400 font-bold animate-pulse">Loading High-res Video...</p>
                                    <p className="text-[8px] uppercase tracking-[0.2em] text-white/40 mt-2 text-center max-w-[200px]">Large files may take a moment to buffer on slow connections</p>
                                </div>
                            )}
                            <video
                                src={video.src}
                                controls
                                autoPlay
                                onLoadedData={() => setIsLoading(false)}
                                className={`max-h-full max-w-full transition-opacity duration-700 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                            />
                        </div>
                        <div className="border-t border-white/5 bg-white/5 px-8 py-4 flex justify-between items-center text-[9px] font-bold uppercase tracking-widest text-white/30">
                            <span>Tag: {video.tag}</span>
                            <span className="text-pink-500/50">Live Motion Playback</span>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
