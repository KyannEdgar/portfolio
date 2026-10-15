"use client";

import React, { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface CloudMeshProps {
  mouse: React.MutableRefObject<{ x: number; y: number; targetX: number; targetY: number }>;
}

function CloudInfrastructureMesh({ mouse }: CloudMeshProps) {
  const outerMeshRef = useRef<THREE.Mesh>(null);
  const innerMeshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    // Smooth lerp towards target mouse coordinates for parallax tilt
    mouse.current.x = THREE.MathUtils.lerp(mouse.current.x, mouse.current.targetX, 0.05);
    mouse.current.y = THREE.MathUtils.lerp(mouse.current.y, mouse.current.targetY, 0.05);

    if (groupRef.current) {
      // Parallax tilt from mouse offset
      groupRef.current.rotation.x = mouse.current.y * 0.35;
      groupRef.current.rotation.z = -mouse.current.x * 0.35;
    }

    if (outerMeshRef.current) {
      // Auto-rotation of outer cloud infrastructure wireframe sphere
      outerMeshRef.current.rotation.y += delta * 0.2;
      outerMeshRef.current.rotation.x += delta * 0.08;
    }

    if (innerMeshRef.current) {
      // Counter-rotation of inner core network
      innerMeshRef.current.rotation.y -= delta * 0.15;
      innerMeshRef.current.rotation.z += delta * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[1.5, 0, 0]}>
      {/* Massive Outer Geodesic Sphere */}
      <mesh ref={outerMeshRef}>
        <sphereGeometry args={[3.5, 64, 64]} />
        <meshBasicMaterial
          wireframe={true}
          color="#ffffff"
          transparent
          opacity={0.75}
        />
      </mesh>

      {/* Concentric Inner Core Topology */}
      <mesh ref={innerMeshRef}>
        <icosahedronGeometry args={[2.2, 2]} />
        <meshBasicMaterial
          wireframe={true}
          color="#ffffff"
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  );
}

export function Hero3D() {
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouse.current.targetX = (e.clientX / innerWidth - 0.5) * 2;
      mouse.current.targetY = (e.clientY / innerHeight - 0.5) * 2;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative h-full w-full min-h-[500px] overflow-visible">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <fog attach="fog" args={["#000000", 2, 8.5]} />
        <CloudInfrastructureMesh mouse={mouse} />
      </Canvas>
    </div>
  );
}
