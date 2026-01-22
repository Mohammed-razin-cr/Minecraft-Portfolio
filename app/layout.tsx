import type React from "react"
import type { Metadata } from "next"
import { VT323 } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/contexts/theme-context"
import { SoundProvider } from "@/contexts/sound-context"
import { AchievementProvider } from "@/contexts/achievement-context"
import { GlobalParticles } from "@/components/global-particles"
import { EasterEggs } from "@/components/easter-eggs"
import { WeatherEffects } from "@/components/weather-effects"

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-minecraft",
})

export const metadata: Metadata = {
  title: "Pixel Portfolio | Minecraft-Style Developer Portfolio",
  description: "An immersive Minecraft-inspired portfolio showcasing creative development skills",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${vt323.variable} font-sans antialiased`}>
        <ThemeProvider>
          <SoundProvider>
            <AchievementProvider>
              <WeatherEffects />
              <GlobalParticles />
              <EasterEggs />
              {children}
            </AchievementProvider>
          </SoundProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
