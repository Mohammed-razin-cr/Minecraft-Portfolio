"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { useMemo, Suspense, useRef } from "react"
import * as THREE from "three"

export type BlockType = "grass" | "dirt" | "stone" | "cobblestone" | "diamond" | "oak_log" | "netherrack" | "gold_block" | "emerald_block"

interface MinecraftBlock3DProps {
  type?: BlockType
  autoRotate?: boolean
}

function MinecraftBlock({ type = "grass", autoRotate = true }: MinecraftBlock3DProps) {
  const meshRef = useRef<THREE.Group>(null)

  useFrame((state, delta) => {
    if (autoRotate && meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5
    }
  })

  const materials = useMemo(() => {
    const colors = {
      grass: "#5D8C3C",
      grassSide: "#4A7030",
      dirt: "#6B4423",
      stone: "#7F7F7F",
      stoneDark: "#6B6B6B",
      cobblestone: "#8B8B8B",
      cobblestoneDark: "#5B5B5B",
      diamond: "#62D4D7",
      oakLog: "#634E34",
      oakTop: "#B39369",
      netherrack: "#6B1A1A",
      netherrackDark: "#5A1515",
      gold: "#FDF55F",
      emerald: "#17DD62",
    }

    const m = {
      dirt: new THREE.MeshStandardMaterial({ color: colors.dirt }),
      grassTop: new THREE.MeshStandardMaterial({ color: colors.grass }),
      stone: new THREE.MeshStandardMaterial({ color: colors.stone }),
      cobblestone: new THREE.MeshStandardMaterial({ color: colors.cobblestone }),
      diamond: new THREE.MeshStandardMaterial({ color: colors.diamond }),
      oakLog: new THREE.MeshStandardMaterial({ color: colors.oakLog }),
      oakTop: new THREE.MeshStandardMaterial({ color: colors.oakTop }),
      netherrack: new THREE.MeshStandardMaterial({ color: colors.netherrack }),
      gold: new THREE.MeshStandardMaterial({ color: colors.gold }),
      emerald: new THREE.MeshStandardMaterial({ color: colors.emerald }),
    }
    return m
  }, [])

  const grassEdges = useMemo(() => {
    const edges: Array<{ position: [number, number, number]; rotation: [number, number, number]; color: string }> = []
    if (type !== "grass") return edges

    for (let i = 0; i < 8; i++) {
      edges.push({
        position: [-0.875 + i * 0.25, 0.9, 1.01] as [number, number, number],
        rotation: [0, 0, 0] as [number, number, number],
        color: i % 2 === 0 ? "#5D8C3C" : "#4A7030",
      })
    }
    for (let i = 0; i < 8; i++) {
      edges.push({
        position: [-0.875 + i * 0.25, 0.9, -1.01] as [number, number, number],
        rotation: [0, Math.PI, 0] as [number, number, number],
        color: i % 2 === 0 ? "#5D8C3C" : "#4A7030",
      })
    }
    for (let i = 0; i < 8; i++) {
      edges.push({
        position: [-1.01, 0.9, -0.875 + i * 0.25] as [number, number, number],
        rotation: [0, -Math.PI / 2, 0] as [number, number, number],
        color: i % 2 === 0 ? "#5D8C3C" : "#4A7030",
      })
    }
    for (let i = 0; i < 8; i++) {
      edges.push({
        position: [1.01, 0.9, -0.875 + i * 0.25] as [number, number, number],
        rotation: [0, Math.PI / 2, 0] as [number, number, number],
        color: i % 2 === 0 ? "#5D8C3C" : "#4A7030",
      })
    }
    return edges
  }, [type])

  const renderBlock = () => {
    switch (type) {
      case "dirt":
        return (
          <mesh>
            <boxGeometry args={[2, 2, 2]} />
            <primitive object={materials.dirt} />
          </mesh>
        )
      case "stone":
        return (
          <mesh>
            <boxGeometry args={[2, 2, 2]} />
            <primitive object={materials.stone} />
          </mesh>
        )
      case "diamond":
        return (
          <group>
            <mesh>
              <boxGeometry args={[2, 2, 2]} />
              <primitive object={materials.stone} />
            </mesh>
            {/* Diamond Ore Bits */}
            {[
              [0.5, 0.5, 1.01], [-0.5, -0.2, 1.01], [0.2, -0.6, 1.01],
              [0.5, 0.5, -1.01], [-0.5, -0.2, -1.01],
              [1.01, 0.5, 0.5], [1.01, -0.5, -0.2],
              [-1.01, 0.2, -0.4], [-1.01, -0.3, 0.6]
            ].map((pos, i) => (
              <mesh key={i} position={pos as [number, number, number]}>
                <planeGeometry args={[0.3, 0.3]} />
                <primitive object={materials.diamond} />
              </mesh>
            ))}
          </group>
        )
      case "netherrack":
        return (
          <mesh>
            <boxGeometry args={[2, 2, 2]} />
            <primitive object={materials.netherrack} />
          </mesh>
        )
      case "cobblestone":
        return (
          <group>
            <mesh>
              <boxGeometry args={[2, 2, 2]} />
              <primitive object={materials.cobblestone} />
            </mesh>
            {/* Cobblestone details */}
            {[
              [0.3, 0.4, 1.01], [-0.5, -0.2, 1.01], [0.1, -0.7, 1.01],
              [0.4, 0.4, -1.01], [-0.4, -0.3, -1.01],
              [1.01, 0.4, 0.3], [1.01, -0.4, -0.2],
              [-1.01, 0.3, -0.4], [-1.01, -0.2, 0.5]
            ].map((pos, i) => (
              <mesh key={i} position={pos as [number, number, number]}>
                <planeGeometry args={[0.5, 0.4]} />
                <meshStandardMaterial color="#5B5B5B" />
              </mesh>
            ))}
          </group>
        )
      case "oak_log":
        return (
          <group>
            <mesh>
              <boxGeometry args={[2, 2, 2]} />
              <primitive object={materials.oakLog} />
            </mesh>
            <mesh position={[0, 1.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[2, 2]} />
              <primitive object={materials.oakTop} />
            </mesh>
            <mesh position={[0, -1.01, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <planeGeometry args={[2, 2]} />
              <primitive object={materials.oakTop} />
            </mesh>
          </group>
        )
      case "gold_block":
        return (
          <mesh>
            <boxGeometry args={[2, 2, 2]} />
            <primitive object={materials.gold} />
          </mesh>
        )
      case "emerald_block":
        return (
          <mesh>
            <boxGeometry args={[2, 2, 2]} />
            <primitive object={materials.emerald} />
          </mesh>
        )
      case "grass":
      default:
        return (
          <group>
            <mesh>
              <boxGeometry args={[2, 2, 2]} />
              <primitive object={materials.dirt} />
            </mesh>
            <mesh position={[0, 1.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[2, 2]} />
              <primitive object={materials.grassTop} />
            </mesh>
            {grassEdges.map((edge, i) => (
              <mesh key={i} position={edge.position} rotation={edge.rotation}>
                <planeGeometry args={[0.25, 0.2]} />
                <meshStandardMaterial color={edge.color} />
              </mesh>
            ))}
          </group>
        )
    }
  }

  return <group ref={meshRef}>{renderBlock()}</group>
}

function CanvasPlaceholder({ type }: { type: BlockType }) {
  const colors = {
    grass: "#5D8C3C",
    dirt: "#6B4423",
    stone: "#7F7F7F",
    diamond: "#62D4D7",
    netherrack: "#6B1A1A",
    gold_block: "#FDF55F",
    emerald_block: "#17DD62",
    oak_log: "#634E34",
    cobblestone: "#8B8B8B",
  }
  const color = colors[type as keyof typeof colors] || colors.grass

  return (
    <div className="h-full w-full flex items-center justify-center bg-black/10 rounded-xl backdrop-blur-sm">
      <div className="relative">
        <div
          className="h-24 w-24 md:h-32 md:w-32 border-4 border-[#373737] block-shadow animate-pulse"
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  )
}

export function MinecraftBlock3D({ type = "grass", autoRotate = true }: MinecraftBlock3DProps) {
  return (
    <div className="h-64 w-64 md:h-80 md:w-80 mx-auto">
      <Suspense fallback={<CanvasPlaceholder type={type} />}>
        <Canvas
          camera={{ position: [3, 2, 3], fov: 45 }}
          shadows={false}
          dpr={[1, 2]}
          performance={{ min: 0.5 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance"
          }}
        >
          <ambientLight intensity={0.7} />
          <directionalLight position={[5, 10, 5]} intensity={1.2} />
          <pointLight position={[-5, 5, -5]} intensity={0.5} />
          <MinecraftBlock type={type} autoRotate={autoRotate} />
        </Canvas>
      </Suspense>
    </div>
  )
}
