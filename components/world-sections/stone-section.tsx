"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { useAchievement } from "@/contexts/achievement-context"

interface Project {
  id: string
  title: string
  description: string
  tech: string[]
  image: string
  link: string
  github?: string
}

const PROJECTS: Project[] = [
  {
    id: "0",
    title: "Barterly",
    description:
      "A modern bartering platform that connects users to trade goods and services seamlessly. Features secure messaging, user verification, and an intuitive item discovery interface.",
    tech: ["Next.js", "React", "Node.js"],
    image: "/barterly.png",
    link: "https://barterly.co.in/",
  },
  {
    id: "new-1",
    title: "Deepfake Image Detection",
    description:
      "A deep learning solution to detect manipulated media and deepfakes. Analyzes facial inconsistencies and artifacts to verify image authenticity.",
    tech: ["Python", "TensorFlow", "OpenCV"],
    image: "/deep.jpg",
    link: "#",
    github: "https://github.com/Mohammed-razin-cr/CYBER-SENTINEL-0.1",
  },
  {
    id: "1",
    title: "AI Voice Assistant",
    description:
      "An AI-powered voice assistant that understands natural language, performs tasks, and integrates with system utilities. Built with speech recognition, text-to-speech, and custom command handlers.",
    tech: ["Python", "Speech Recognition", "NLP"],
    image: "/ai-voice.png",
    link: "#",
    github: "https://github.com/Mohammed-razin-cr/AI-Voice-Assistant",
  },
  {
    id: "2",
    title: "Steganography Project",
    description:
      "A secure application that hides confidential data within images using encryption techniques, enhancing data privacy and protection.",
    tech: ["Python", "Tkinter", "Cryptography"],
    image: "/stego.png",
    link: "#",
    github: "https://github.com/Mohammed-razin-cr/STEGANOGRAPHY---FINAL-YEAR-PROJECT",
  },
  {
    id: "3",
    title: "Language Detection",
    description:
      "A language detection tool that identifies the language of input text using statistical models and machine learning. Useful for preprocessing in multilingual applications.",
    tech: ["Python", "Machine Learning", "NLP"],
    image: "/lang.png",
    link: "#",
    github: "https://github.com/Mohammed-razin-cr/Language-Detection",
  },
  {
    id: "4",
    title: "College Website",
    description:
      "A fully responsive modern website built for BCA students, featuring downloadable notes, subject playlists, event updates. Awarded Best Website Design at the college level.",
    tech: ["HTML5", "CSS3", "JavaScript"],
    image: "/aibm.png",
    link: "https://aibm-quick-support.netlify.app/",
  },
]

export function StoneSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)
  const { unlockAchievement } = useAchievement()

  useEffect(() => {
    if (isInView) {
      unlockAchievement("taking_inventory")
    }
  }, [isInView, unlockAchievement])

  return (
    <section
      ref={ref}
      id="projects"
      className="relative min-h-screen overflow-hidden bg-[#7F7F7F]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='32' height='32' fill='%237F7F7F'/%3E%3Crect x='0' y='0' width='16' height='16' fill='%236B6B6B' fillOpacity='0.5'/%3E%3Crect x='16' y='16' width='16' height='16' fill='%236B6B6B' fillOpacity='0.5'/%3E%3Crect x='8' y='8' width='4' height='4' fill='%235A5A5A' fillOpacity='0.6'/%3E%3Crect x='24' y='8' width='4' height='4' fill='%235A5A5A' fillOpacity='0.6'/%3E%3C/svg%3E")`,
      }}
    >
      {/* Transition from dirt */}
      <div className="absolute left-0 right-0 top-0 flex overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="h-6 w-6 sm:h-8 sm:w-8 flex-shrink-0"
            style={{
              backgroundColor: i % 4 === 0 ? "#8B6914" : "#7F7F7F",
              marginTop: i % 3 === 0 ? "-3px" : "0",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-12 sm:py-16 md:py-20">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-8 sm:mb-12"
        >
          <div className="inline-block border-4 border-[#373737] bg-[#C6C6C6] p-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl uppercase tracking-wider text-[#373737]">Featured Projects</h2>
          </div>
        </motion.div>

        <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ y: 50, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              className="group"
            >
              <motion.div
                animate={{
                  y: hoveredProject === project.id ? -8 : 0,
                }}
                className="block border-4 border-[#373737] bg-[#C6C6C6] p-4 transition-colors hover:bg-[#D6D6D6]"
              >
                {/* Project Image */}
                <div className="mb-4 overflow-hidden border-2 border-[#373737]">
                  {project.link && project.link !== "#" ? (
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="h-32 sm:h-40 md:h-48 w-full object-cover pixelated transition-transform duration-500 hover:scale-110"
                      />
                    </a>
                  ) : (
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="h-32 sm:h-40 md:h-48 w-full object-cover pixelated"
                    />
                  )}
                </div>

                {/* Project Info */}
                <h3 className="mb-2 text-lg sm:text-xl uppercase tracking-wider text-[#373737]">
                  {project.link && project.link !== "#" ? (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="hover:text-[#5D8C3C] transition-colors">
                      {project.title}
                    </a>
                  ) : (
                    project.title
                  )}
                </h3>
                <p className="mb-4 text-xs sm:text-sm text-[#5A5A5A]">{project.description}</p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="border-2 border-[#373737] bg-[#5D8C3C] px-2 py-1 text-xs uppercase text-white"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="mt-4 flex items-center gap-3">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border-2 border-[#373737] bg-[#1a1a2e] px-3 py-1 text-sm uppercase text-white hover:bg-[#2a2a3e]"
                    >
                      GitHub
                    </a>
                  )}
                  {project.link && project.link !== "#" && (
                    <motion.a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredProject === project.id ? 1 : 0 }}
                      className="flex items-center gap-2 text-sm text-[#5D8C3C] hover:underline"
                    >
                      <span className="animate-pulse">▶</span>
                      <span>Visit Site</span>
                    </motion.a>
                  )}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-8 sm:mt-12"
        >
          <div className="inline-block border-4 border-[#373737] bg-[#C6C6C6] p-2 mb-6">
            <h3 className="text-xl sm:text-2xl uppercase tracking-wider text-[#373737]">Achievements</h3>
          </div>
          <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: "🏆", title: "Best Website Design", desc: "College-level Award" },
              { icon: "⚔️", title: "First Prize", desc: "Debugging Competition" },
              { icon: "🎖️", title: "Scout Awards", desc: "Rajya & Rashtrapati" },
              { icon: "📺", title: "YouTube", desc: "2.6k+ Subscribers" },
            ].map((achievement, index) => (
              <motion.div
                key={achievement.title}
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="border-4 border-[#373737] bg-[#8B6914] p-3 sm:p-4 text-center block-shadow"
              >
                <span className="text-2xl sm:text-3xl">{achievement.icon}</span>
                <p className="mt-2 text-xs sm:text-sm font-bold uppercase text-white">{achievement.title}</p>
                <p className="text-xs text-white/80">{achievement.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
