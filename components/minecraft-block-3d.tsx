"use client"

import { Canvas } from "@react-three/fiber"
import { useMemo, Suspense } from "react"
import * as THREE from "three"

function MinecraftGrassBlock() {

  const materials = useMemo(() => ({
    dirt: new THREE.MeshStandardMaterial({ color: "#6B4423" }),
    grassTop: new THREE.MeshStandardMaterial({ color: "#5D8C3C" }),
  }), [])

  const grassEdges = useMemo(() => {
    const edges: Array<{ position: [number, number, number]; rotation: [number, number, number]; color: string }> = []

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
  }, [])

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

function CanvasPlaceholder() {
  return (
    <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-[#87CEEB] to-[#B4E1FF]">
      <div className="relative">
        <div className="h-24 w-24 md:h-32 md:w-32 bg-[#5D8C3C] border-4 border-[#373737] block-shadow animate-pulse" />
        <div className="absolute top-0 left-0 h-24 w-24 md:h-32 md:w-32 bg-[#5D8C3C]/50 border-2 border-[#4A7030] animate-[spin_3s_linear_infinite]" />
      </div>
    </div>
  )
}

export function MinecraftBlock3D() {
  return (
    <div className="h-64 w-64 md:h-80 md:w-80">
      <Suspense fallback={<CanvasPlaceholder />}>
        <Canvas
          camera={{ position: [3, 2, 3], fov: 50 }}
          shadows={false}
          dpr={[1, 2]}
          performance={{ min: 0.5 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance"
          }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <pointLight position={[-5, 5, -5]} intensity={0.5} />
          <MinecraftGrassBlock />
        </Canvas>
      </Suspense>
    </div>
  )
}
