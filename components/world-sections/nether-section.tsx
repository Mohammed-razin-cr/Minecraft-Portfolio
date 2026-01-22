"use client"

import type React from "react"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { SocialShare } from "@/components/social-share"
import { DownloadResume } from "@/components/download-resume"
import { BlockBreakerGame } from "@/components/mini-game"

export function NetherSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState)
      })

      if (response.ok) {
        setSubmitted(true)
      } else {
        console.error("Failed to submit")
        alert("Something went wrong. Please try again.")
      }
    } catch (error) {
      console.error(error)
      alert("Failed to send message. Please check your connection.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = {
    email: "razincr32@gmail.com",
    phone: "+91 7349256189",
    location: "Chikkamagaluru, Karnataka, India",
    whatsapp: "https://wa.me/917349256189",
    linkedin: "https://www.linkedin.com/in/mohammed-razin-cr-100b432a3/",
    instagram: "https://www.instagram.com/mohammed_razin_c.r/",
    twitch: "https://www.twitch.tv/razin1cr",
  }

  return (
    <section
      ref={ref}
      id="contact"
      className="relative min-h-screen overflow-hidden bg-[#6B1A1A]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='32' height='32' fill='%236B1A1A'/%3E%3Crect x='0' y='0' width='16' height='16' fill='%235A1515' fillOpacity='0.5'/%3E%3Crect x='16' y='16' width='16' height='16' fill='%235A1515' fillOpacity='0.5'/%3E%3C/svg%3E")`,
      }}
    >
      {/* Transition from stone */}
      <div className="absolute left-0 right-0 top-0 flex overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="h-6 w-6 sm:h-8 sm:w-8 flex-shrink-0"
            style={{
              backgroundColor: i % 3 === 0 ? "#7F7F7F" : "#6B1A1A",
              marginTop: i % 4 === 0 ? "-3px" : "0",
            }}
          />
        ))}
      </div>

      {/* Lava pools */}
      <div className="absolute bottom-0 left-0 right-0 hidden sm:block">
        <div className="flex">
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={i}
              animate={{
                backgroundColor: ["#FF6B00", "#FF9500", "#FF6B00"],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 2,
                delay: i * 0.1,
              }}
              className="h-12 sm:h-16 w-6 sm:w-8 flex-shrink-0"
            />
          ))}
        </div>
      </div>

      <div className="container relative z-10 mx-auto px-4 py-12 sm:py-16 md:py-20">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-8 sm:mb-12"
        >
          <div className="inline-block border-4 border-[#FF6B00] bg-[#1a1a2e] p-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl uppercase tracking-wider text-[#FF6B00]">Get In Touch</h2>
          </div>
        </motion.div>

        <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
          {/* Contact Info */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="space-y-6"
          >
            <div className="border-4 border-[#373737] bg-[#C6C6C6] p-4 sm:p-6">
              <h3 className="mb-3 sm:mb-4 text-lg sm:text-xl uppercase tracking-wider text-[#5D8C3C]">Contact Information</h3>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-lg sm:text-2xl">📧</span>
                  <a href={`mailto:${contactInfo.email}`} className="text-xs sm:text-base text-[#373737] hover:text-[#5D8C3C] break-all">
                    {contactInfo.email}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-lg sm:text-2xl">📱</span>
                  <a href={`tel:${contactInfo.phone}`} className="text-xs sm:text-base text-[#373737] hover:text-[#5D8C3C]">
                    {contactInfo.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-lg sm:text-2xl">📍</span>
                  <span className="text-xs sm:text-base text-[#373737]">{contactInfo.location}</span>
                </div>
              </div>
            </div>

            <motion.a
              href={contactInfo.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03, y: -3 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="block border-4 border-[#25D366] bg-[#25D366] p-4 text-center text-lg uppercase tracking-wider text-white transition-colors hover:bg-[#1DA851]"
              style={{ willChange: 'transform' }}
            >
              Chat on WhatsApp
            </motion.a>

            <div className="mt-4 flex justify-center">
              <DownloadResume />
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="border-4 border-[#373737] bg-[#C6C6C6] p-4 sm:p-6"
          >
            {submitted ? (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="py-8 sm:py-12 text-center">
                <div className="mb-4 text-5xl sm:text-6xl">📬</div>
                <h3 className="mb-2 text-xl sm:text-2xl uppercase text-[#5D8C3C]">Message Sent!</h3>
                <p className="text-sm sm:text-base text-[#373737]">Thanks for reaching out. I&apos;ll get back to you soon!</p>
                <button
                  onClick={() => {
                    setSubmitted(false)
                    setFormState({ name: "", email: "", message: "" })
                  }}
                  className="mt-4 border-2 border-[#373737] bg-[#5D8C3C] px-4 py-2 text-sm sm:text-base text-white"
                >
                  Send Another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <label className="mb-2 block text-xs sm:text-sm uppercase tracking-wider text-[#373737]">Name</label>
                  <motion.input
                    type="text"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    required
                    whileFocus={{ scale: 1.01, borderColor: "#5D8C3C" }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="w-full border-2 border-[#373737] bg-[#8B8B8B] p-2 sm:p-3 text-sm text-[#1a1a1a] outline-none focus:border-[#5D8C3C] transition-colors duration-200"
                    placeholder="Your Name"
                    style={{ willChange: 'transform' }}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <label className="mb-2 block text-xs sm:text-sm uppercase tracking-wider text-[#373737]">Email</label>
                  <motion.input
                    type="email"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    required
                    whileFocus={{ scale: 1.01, borderColor: "#5D8C3C" }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="w-full border-2 border-[#373737] bg-[#8B8B8B] p-2 sm:p-3 text-sm text-[#1a1a1a] outline-none focus:border-[#5D8C3C] transition-colors duration-200"
                    placeholder="your@email.com"
                    style={{ willChange: 'transform' }}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <label className="mb-2 block text-xs sm:text-sm uppercase tracking-wider text-[#373737]">Message</label>
                  <motion.textarea
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    required
                    rows={4}
                    whileFocus={{ scale: 1.01, borderColor: "#5D8C3C" }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="w-full resize-none border-2 border-[#373737] bg-[#8B8B8B] p-2 sm:p-3 text-sm text-[#1a1a1a] outline-none focus:border-[#5D8C3C] transition-colors duration-200"
                    placeholder="Your message here..."
                    style={{ willChange: 'transform' }}
                  />
                </motion.div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{
                    delay: 0.4,
                    type: "spring",
                    stiffness: 400,
                    damping: 25
                  }}
                  className="w-full border-2 border-[#373737] bg-[#5D8C3C] py-2 sm:py-3 text-sm sm:text-lg uppercase tracking-wider text-white transition-colors hover:bg-[#4A7030] disabled:opacity-50"
                  style={{ willChange: 'transform' }}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        className="inline-block"
                      >
                        ⚙️
                      </motion.span>
                      Sending...
                    </span>
                  ) : (
                    "Send Message"
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>

        {/* Social Links & Share */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-8 flex flex-col items-center gap-8"
        >
          <div className="w-full max-w-md">
            <SocialShare />
          </div>

          <BlockBreakerGame />

          <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
            {[
              { label: "LinkedIn", icon: "💼", href: contactInfo.linkedin },
              { label: "Instagram", icon: "📸", href: contactInfo.instagram },
              { label: "Twitch", icon: "🎮", href: contactInfo.twitch },
              { label: "Email", icon: "📧", href: `mailto:${contactInfo.email}` },
            ].map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center border-2 border-[#FF6B00] bg-[#1a1a2e] text-lg sm:text-2xl transition-colors hover:bg-[#2a2a3e]"
                aria-label={social.label}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="relative z-10 border-t-4 border-[#FF6B00] bg-[#1a1a2e] py-6 sm:py-8 text-center">
        <p className="text-xs sm:text-sm uppercase tracking-wider text-[#8B8B8B]">Built with blocks & code by Mohammed Razin CR</p>
      </div>
    </section>
  )
}
