import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface LiquidAudioCanvasProps {
  className?: string;
  tintHex?: string;
  intensity?: number;
}

export const LiquidAudioCanvas: React.FC<LiquidAudioCanvasProps> = ({
  className = '',
  tintHex = '#92B6E5',
  intensity = 1.0,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL availability
    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
    } catch {
      // Graceful fallback if WebGL not supported
      return;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(dpr);
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 7.5);

    // Studio Lighting setup: key, fill, ice-blue rim, silver reflection
    const ambientLight = new THREE.AmbientLight(0x0b0d10, 2.5);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 3.2 * intensity);
    keyLight.position.set(5, 6, 4);
    scene.add(keyLight);

    const rimLightBlue = new THREE.PointLight(new THREE.Color(tintHex), 4.5 * intensity, 15);
    rimLightBlue.position.set(-4, -2, 3);
    scene.add(rimLightBlue);

    const silverSpecLight = new THREE.PointLight(0xa9b5c1, 3.0 * intensity, 12);
    silverSpecLight.position.set(2, -4, 2);
    scene.add(silverSpecLight);

    // Liquid Metal Organic Mesh (Polished Mercury / Chrome)
    const baseGeometry = new THREE.IcosahedronGeometry(1.85, 48);
    // Store original vertex positions for fluid noise morphing
    const posAttribute = baseGeometry.attributes.position;
    const vertexCount = posAttribute.count;
    const originalPositions = new Float32Array(vertexCount * 3);
    for (let i = 0; i < vertexCount * 3; i++) {
      originalPositions[i] = posAttribute.array[i];
    }

    const liquidMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x98a5b2,
      emissive: 0x050a12,
      roughness: 0.12,
      metalness: 0.96,
      clearcoat: 0.85,
      clearcoatRoughness: 0.15,
      reflectivity: 0.9,
      transmission: 0.05,
      ior: 1.52,
    });

    const liquidMesh = new THREE.Mesh(baseGeometry, liquidMaterial);
    scene.add(liquidMesh);

    // Orbital acoustic rings (representing sound waves & spatial depth)
    const ringGroup = new THREE.Group();
    scene.add(ringGroup);

    const ringMaterial = new THREE.MeshStandardMaterial({
      color: 0x92b6e5,
      metalness: 0.85,
      roughness: 0.25,
      transparent: true,
      opacity: 0.45,
      wireframe: true,
    });

    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(2.5, 0.015, 16, 100), ringMaterial);
    ring1.rotation.x = Math.PI * 0.4;
    ringGroup.add(ring1);

    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(3.1, 0.012, 16, 120), ringMaterial);
    ring2.rotation.x = -Math.PI * 0.35;
    ring2.rotation.y = Math.PI * 0.2;
    ringGroup.add(ring2);

    // Subtle mercury micro-droplets
    const dropletGroup = new THREE.Group();
    scene.add(dropletGroup);
    const dropletGeo = new THREE.SphereGeometry(0.08, 16, 16);
    const dropletMat = new THREE.MeshPhysicalMaterial({
      color: 0xa9b5c1,
      metalness: 0.98,
      roughness: 0.08,
      clearcoat: 1.0,
    });

    const dropletPositions = [
      [-2.3, 1.4, 0.5],
      [2.5, -1.2, -0.2],
      [-1.8, -1.8, 0.8],
      [2.0, 1.8, -0.5],
      [0.8, -2.4, 0.3],
    ];

    dropletPositions.forEach(([x, y, z]) => {
      const drop = new THREE.Mesh(dropletGeo, dropletMat);
      drop.position.set(x, y, z);
      dropletGroup.add(drop);
    });

    // Pointer parallax with inertia
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      targetX = (e.clientX / innerWidth - 0.5) * 1.5;
      targetY = (e.clientY / innerHeight - 0.5) * 1.5;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    // Scroll parallax reaction
    let scrollY = 0;
    const handleScroll = () => {
      scrollY = window.scrollY * 0.001;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Resize handler
    const handleResize = () => {
      if (!container || !renderer) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth camera damping
      mouseX += (targetX - mouseX) * 0.04;
      mouseY += (targetY - mouseY) * 0.04;

      camera.position.x = mouseX * 0.9;
      camera.position.y = -mouseY * 0.9;
      camera.lookAt(0, 0, 0);

      // Morphing liquid mesh vertices using harmonic trigonometric waves
      const positions = baseGeometry.attributes.position.array as Float32Array;
      const t = elapsedTime * 1.25;

      for (let i = 0; i < vertexCount; i++) {
        const i3 = i * 3;
        const ox = originalPositions[i3];
        const oy = originalPositions[i3 + 1];
        const oz = originalPositions[i3 + 2];

        // Complex 3-frequency wave noise for organic fluid deformation
        const wave1 = Math.sin(ox * 2.1 + t) * Math.cos(oy * 2.3 + t);
        const wave2 = Math.sin(oz * 2.5 + t * 0.9) * 0.5;
        const wave3 = Math.cos((ox + oy + oz) * 1.8 + t * 1.1) * 0.35;
        const displacement = 1 + (wave1 + wave2 + wave3) * 0.16;

        positions[i3] = ox * displacement;
        positions[i3 + 1] = oy * displacement;
        positions[i3 + 2] = oz * displacement;
      }
      baseGeometry.attributes.position.needsUpdate = true;
      baseGeometry.computeVertexNormals();

      // Slowly rotate mesh and orbital elements
      liquidMesh.rotation.y = elapsedTime * 0.2 + scrollY * 0.5;
      liquidMesh.rotation.x = Math.sin(elapsedTime * 0.15) * 0.2;

      ringGroup.rotation.z = elapsedTime * 0.1;
      ringGroup.rotation.y = elapsedTime * 0.08;

      dropletGroup.children.forEach((drop, idx) => {
        drop.position.y += Math.sin(elapsedTime * 1.5 + idx) * 0.003;
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);

      // Dispose Three.js objects cleanly
      baseGeometry.dispose();
      liquidMaterial.dispose();
      ringMaterial.dispose();
      dropletGeo.dispose();
      dropletMat.dispose();

      if (renderer) {
        renderer.dispose();
        if (renderer.domElement && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      }
    };
  }, [tintHex, intensity]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      aria-hidden="true"
    />
  );
};
