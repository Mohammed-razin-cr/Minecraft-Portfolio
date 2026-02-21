"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface Skill {
  id: string
  name: string
  icon: string
  level: number
  description: string
  category: "frontend" | "backend" | "design"
}

const SKILLS: Skill[] = [
  // Frontend
  {
    id: "html",
    name: "HTML5",
    icon: "🌐",
    level: 95,
    description: "Semantic HTML structure and accessibility best practices",
    category: "frontend",
  },
  {
    id: "css",
    name: "CSS3",
    icon: "🎨",
    level: 90,
    description: "Modern CSS with Flexbox, Grid, and animations",
    category: "frontend",
  },
  {
    id: "javascript",
    name: "JavaScript",
    icon: "JS",
    level: 85,
    description: "ES6+, DOM manipulation, and async programming",
    category: "frontend",
  },
  {
    id: "responsive",
    name: "Responsive",
    icon: "📱",
    level: 90,
    description: "Mobile-first responsive design principles",
    category: "frontend",
  },
  // Backend
  {
    id: "python",
    name: "Python",
    icon: "🐍",
    level: 80,
    description: "Python programming for AI, automation, and scripting",
    category: "backend",
  },
  {
    id: "ml",
    name: "ML/NLP",
    icon: "🤖",
    level: 75,
    description: "Machine Learning and Natural Language Processing",
    category: "backend",
  },
  {
    id: "speech",
    name: "Speech AI",
    icon: "🎙️",
    level: 78,
    description: "Speech recognition and text-to-speech systems",
    category: "backend",
  },
  // Design
  {
    id: "uiux",
    name: "UI/UX",
    icon: "✨",
    level: 85,
    description: "Designing intuitive user interfaces and experiences",
    category: "design",
  },
  {
    id: "video",
    name: "Video Editing",
    icon: "🎬",
    level: 85,
    description: "Editing videos on mobile — cuts, transitions, colour grading & storytelling for reels and YouTube content",
    category: "design",
  },
  {
    id: "videography",
    name: "Videography",
    icon: "🎥",
    level: 82,
    description: "Shooting cinematic footage using smartphones — composition, framing, movement and lighting techniques",
    category: "design",
  },
  {
    id: "photography",
    name: "Photography",
    icon: "📸",
    level: 80,
    description: "Phone photography — portrait, landscape and street shots with attention to light, angle and mood",
    category: "design",
  },
  {
    id: "project",
    name: "Project Mgmt",
    icon: "📋",
    level: 82,
    description: "Leading projects with agile methodologies",
    category: "design",
  },
]

const HOTBAR_SLOTS = 9

export function InventorySkills() {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null)
  const [equippedSkills, setEquippedSkills] = useState<(Skill | null)[]>(SKILLS.slice(0, HOTBAR_SLOTS))
  const [activeHotbarSlot, setActiveHotbarSlot] = useState(0)

  const categories = [
    { key: "frontend", label: "Frontend", skills: SKILLS.filter((s) => s.category === "frontend") },
    { key: "backend", label: "Backend & AI", skills: SKILLS.filter((s) => s.category === "backend") },
    { key: "design", label: "Design & More", skills: SKILLS.filter((s) => s.category === "design") },
  ]

  const handleSkillClick = (skill: Skill) => {
    setSelectedSkill(selectedSkill?.id === skill.id ? null : skill)
  }

  const handleEquip = (skill: Skill) => {
    const newEquipped = [...equippedSkills]
    const emptySlot = newEquipped.findIndex((s) => s === null)
    if (emptySlot !== -1) {
      newEquipped[emptySlot] = skill
    } else {
      newEquipped[activeHotbarSlot] = skill
    }
    setEquippedSkills(newEquipped)
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Main Inventory */}
      <div
        className="border-4 border-[#373737] bg-[#C6C6C6] p-3 sm:p-4"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h32v32H0z' fill='%23C6C6C6'/%3E%3Cpath d='M0 0h16v16H0z' fill='%23B8B8B8' fillOpacity='0.3'/%3E%3Cpath d='M16 16h16v16H16z' fill='%23B8B8B8' fillOpacity='0.3'/%3E%3C/svg%3E")`,
        }}
      >
        <h2 className="mb-3 sm:mb-4 text-center text-xl sm:text-2xl uppercase tracking-wider text-[#373737]">Skill Inventory</h2>

        {/* Skill Categories */}
        {categories.map((category) => (
          <div key={category.key} className="mb-4 sm:mb-6">
            <h3 className="mb-2 text-sm sm:text-lg uppercase tracking-wider text-[#5D8C3C]">{category.label}</h3>
            <div className="flex flex-wrap gap-1 sm:gap-2">
              {category.skills.map((skill) => (
                <motion.button
                  key={skill.id}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSkillClick(skill)}
                  className={`inventory-slot relative flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center text-lg sm:text-2xl border-2 transition-colors ${selectedSkill?.id === skill.id
                      ? "border-[#FF6B00] bg-[#FF6B00]"
                      : "border-[#373737] bg-[#8B6914]"
                    }`}
                  aria-label={`${skill.name} skill, level ${skill.level}`}
                >
                  <span className="relative z-10">{skill.icon}</span>
                  {/* Level indicator */}
                  <span className="absolute bottom-0.5 right-0.5 text-xs font-bold text-white drop-shadow-[1px_1px_0_#000]">
                    {skill.level}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        ))}

        {/* Skill Tooltip */}
        <AnimatePresence>
          {selectedSkill && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="mt-4 border-4 border-[#373737] bg-[#C6C6C6] p-3 sm:p-4"
            >
              <div className="flex items-start gap-2 sm:gap-3">
                <span className="text-2xl sm:text-3xl">{selectedSkill.icon}</span>
                <div className="flex-1">
                  <h4 className="text-base sm:text-lg uppercase text-[#5D8C3C] font-bold">{selectedSkill.name}</h4>
                  <p className="text-xs sm:text-sm text-[#373737]">{selectedSkill.description}</p>
                </div>
              </div>
              <div className="mt-3 sm:mt-4">
                <div className="flex items-center justify-between text-xs sm:text-sm mb-2">
                  <span className="text-[#373737]">Skill Level</span>
                  <span className="text-[#5D8C3C] font-bold">{selectedSkill.level}/100</span>
                </div>
                <div className="h-2 sm:h-3 border-2 border-[#373737] bg-[#8B8B8B]">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${selectedSkill.level}%` }}
                    className="h-full bg-[#5D8C3C]"
                  />
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleEquip(selectedSkill)}
                className="mt-3 sm:mt-4 w-full border-2 border-[#5D8C3C] bg-[#5D8C3C] py-1 sm:py-2 text-xs sm:text-sm uppercase tracking-wider text-white hover:bg-[#4A7030]"
              >
                Equip to Hotbar
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Hotbar */}
      <div className="mt-6 sm:mt-8">
        <h3 className="mb-2 text-xs sm:text-sm uppercase tracking-wider text-[#5D8C3C]">⚔️ Hotbar</h3>
        <div className="flex flex-wrap gap-1 border-2 border-[#373737] bg-[#8B8B8B] p-2">
          {equippedSkills.map((skill, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveHotbarSlot(index)}
              className={`inventory-slot relative flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center text-base sm:text-lg border-2 transition-colors ${activeHotbarSlot === index ? "border-[#FFD700] ring-2 ring-[#FFD700]" : "border-[#373737] bg-[#5D8C3C]"
                }`}
              aria-label={skill ? `Hotbar slot ${index + 1}: ${skill.name}` : `Empty hotbar slot ${index + 1}`}
            >
              {skill ? (
                <>
                  <span>{skill.icon}</span>
                  <span className="absolute bottom-0 right-0.5 text-xs font-bold text-white drop-shadow-[1px_1px_0_#000]">
                    {index + 1}
                  </span>
                </>
              ) : (
                <span className="text-[#1a1a1a] font-bold">{index + 1}</span>
              )}
            </motion.button>
          ))}
        </div>
        {equippedSkills[activeHotbarSlot] && (
          <p className="mt-2 text-xs sm:text-sm text-[#373737]">
            <strong>{equippedSkills[activeHotbarSlot]?.name}</strong> equipped
          </p>
        )}
      </div>
    </div>
  )
}
