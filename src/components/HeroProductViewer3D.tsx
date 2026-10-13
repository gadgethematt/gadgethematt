import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCcw, Sparkles } from 'lucide-react';

interface HeroProductViewer3DProps {
  colorHex?: string;
  tintHex?: string;
  metalHex?: string;
  className?: string;
}

export const HeroProductViewer3D: React.FC<HeroProductViewer3DProps> = ({
  colorHex = '#F2F5F8', // Default: Metallic Pearl Silver-White
  tintHex = '#92B6E5',
  metalHex = '#CAD6E2',
  className = '',
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // References for live 3D interaction without re-mounting
  const materialsRef = useRef<{
    body: THREE.MeshPhysicalMaterial;
    metal: THREE.MeshStandardMaterial;
    silicone: THREE.MeshPhysicalMaterial;
    lightTint: THREE.PointLight;
  } | null>(null);

  // Dynamic color updating when props change
  useEffect(() => {
    if (materialsRef.current) {
      materialsRef.current.body.color.set(colorHex);
      materialsRef.current.metal.color.set(metalHex);
      materialsRef.current.lightTint.color.set(tintHex);
    }
  }, [colorHex, metalHex, tintHex]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
    } catch {
      return;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(dpr);
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      36,
      container.clientWidth / container.clientHeight,
      0.1,
      50
    );
    camera.position.set(0, 0.25, 4.8);

    // Studio Lighting tailored for dramatic dark luxury campaign
    const ambientLight = new THREE.AmbientLight(0x06080c, 1.4);
    scene.add(ambientLight);

    // Dramatic Pure White Top/Overhead Rim Key Light (producing intense crest speculars like Apple AirPods Pro ad)
    const topKeyLight = new THREE.DirectionalLight(0xffffff, 5.2);
    topKeyLight.position.set(0, 6, 2.5);
    scene.add(topKeyLight);

    // Frontal Crisp Key Light from right
    const keyLight = new THREE.DirectionalLight(0xf0f4f8, 3.4);
    keyLight.position.set(3.5, 3.5, 4);
    scene.add(keyLight);

    // Soft Dark Silver Fill Light from opposite bottom
    const fillLight = new THREE.DirectionalLight(0x9aa5b1, 1.6);
    fillLight.position.set(-3.5, 1.5, 2);
    scene.add(fillLight);

    // Under-Glow Rim Light with subtle icy blue reflection
    const underRimLight = new THREE.PointLight(new THREE.Color(tintHex), 4.2, 10);
    underRimLight.position.set(0, -3.2, -1.8);
    scene.add(underRimLight);

    // Deep Specular Rim Accent
    const specLight = new THREE.PointLight(0xdde5ee, 3.2, 8);
    specLight.position.set(-2.5, 4, -2.5);
    scene.add(specLight);

    // Materials definition (Ultra-Refined Pearl Glossy Plastic & Polished Metal)
    const bodyMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(colorHex),
      roughness: 0.12,
      metalness: 0.18,
      clearcoat: 1.0,
      clearcoatRoughness: 0.06,
      reflectivity: 0.95,
      ior: 1.54,
    });

    const metalMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(metalHex),
      metalness: 0.96,
      roughness: 0.14,
    });

    const siliconeMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xedf2f7,
      roughness: 0.38,
      metalness: 0.04,
      transmission: 0.35,
      thickness: 0.45,
      transparent: true,
      opacity: 0.96,
    });

    const grilleMaterial = new THREE.MeshStandardMaterial({
      color: 0x111317,
      metalness: 0.9,
      roughness: 0.35,
    });

    const ledMaterial = new THREE.MeshBasicMaterial({
      color: 0x92b6e5,
    });

    materialsRef.current = {
      body: bodyMaterial,
      metal: metalMaterial,
      silicone: siliconeMaterial,
      lightTint: underRimLight,
    };

    // Build Luxury Precision 3D Earbud (inspired by modern high-end ANC earbuds)
    const createEarbud = (isRight: boolean) => {
      const earbud = new THREE.Group();

      // 1. Head Acoustic Chamber (Ergonomic Ellipsoid with refined crown)
      const headGeom = new THREE.SphereGeometry(0.54, 36, 32);
      headGeom.scale(1.02, 1.18, 0.92);
      const headMesh = new THREE.Mesh(headGeom, bodyMaterial);
      earbud.add(headMesh);

      // Inner Acoustic Vent on crown (Black micro mesh)
      const crownVentGeom = new THREE.BoxGeometry(0.04, 0.18, 0.02);
      const crownVent = new THREE.Mesh(crownVentGeom, grilleMaterial);
      crownVent.position.set(0, 0.52, -0.05);
      crownVent.rotation.z = Math.PI / 4;
      earbud.add(crownVent);

      // 2. Ear-tip Sound Nozzle (Angled inward)
      const nozzleGroup = new THREE.Group();
      nozzleGroup.position.set(isRight ? -0.34 : 0.34, 0.12, 0.32);
      nozzleGroup.rotation.set(0.24, isRight ? -0.58 : 0.58, 0);

      // Metal base ring of nozzle (Polished chrome)
      const nozzleRingGeom = new THREE.CylinderGeometry(0.25, 0.27, 0.14, 36);
      const nozzleRing = new THREE.Mesh(nozzleRingGeom, metalMaterial);
      nozzleRing.rotation.x = Math.PI / 2;
      nozzleGroup.add(nozzleRing);

      // Silicone ear-tip with delicate curvature
      const tipGeom = new THREE.ConeGeometry(0.38, 0.44, 36);
      tipGeom.scale(1, 0.88, 1);
      const tipMesh = new THREE.Mesh(tipGeom, siliconeMaterial);
      tipMesh.rotation.x = -Math.PI / 2;
      tipMesh.position.z = 0.22;
      nozzleGroup.add(tipMesh);

      // Inner Acoustic Grille
      const grilleGeom = new THREE.CircleGeometry(0.19, 28);
      const grilleMesh = new THREE.Mesh(grilleGeom, grilleMaterial);
      grilleMesh.position.z = 0.24;
      nozzleGroup.add(grilleMesh);

      earbud.add(nozzleGroup);

      // 3. Ergonomic Stem (Aerodynamic teardrop cylindrical form)
      const stemGroup = new THREE.Group();
      stemGroup.position.set(isRight ? 0.22 : -0.22, -0.65, -0.06);
      stemGroup.rotation.set(0.09, 0, isRight ? -0.14 : 0.14);

      const stemGeom = new THREE.CylinderGeometry(0.125, 0.095, 1.22, 36);
      const stemMesh = new THREE.Mesh(stemGeom, bodyMaterial);
      stemGroup.add(stemMesh);

      // Indented Capacitive Force Sensor / Touch Strip along outer stem
      const touchGeom = new THREE.BoxGeometry(0.08, 0.76, 0.025);
      const touchMesh = new THREE.Mesh(touchGeom, metalMaterial);
      touchMesh.position.set(0, 0.06, isRight ? 0.115 : -0.115);
      stemGroup.add(touchMesh);

      // Chrome bottom cap
      const capGeom = new THREE.CylinderGeometry(0.096, 0.096, 0.09, 36);
      const capMesh = new THREE.Mesh(capGeom, metalMaterial);
      capMesh.position.y = -0.6;
      stemGroup.add(capMesh);

      // Dual Micro Golden/Silver Charging Pins
      const pinGeom = new THREE.CylinderGeometry(0.02, 0.02, 0.04, 16);
      const pin1 = new THREE.Mesh(pinGeom, metalMaterial);
      pin1.position.set(-0.035, -0.64, 0);
      const pin2 = new THREE.Mesh(pinGeom, metalMaterial);
      pin2.position.set(0.035, -0.64, 0);
      stemGroup.add(pin1);
      stemGroup.add(pin2);

      // Status LED indicator
      const ledGeom = new THREE.SphereGeometry(0.026, 16, 16);
      const ledMesh = new THREE.Mesh(ledGeom, ledMaterial);
      ledMesh.position.set(0, 0.4, isRight ? 0.125 : -0.125);
      stemGroup.add(ledMesh);

      // Acoustic Mic vent on stem
      const micVentGeom = new THREE.BoxGeometry(0.04, 0.09, 0.02);
      const micVent = new THREE.Mesh(micVentGeom, grilleMaterial);
      micVent.position.set(0, -0.26, isRight ? 0.115 : -0.115);
      stemGroup.add(micVent);

      earbud.add(stemGroup);

      // Outer Acoustic ANC Noise Vent on Chamber (Curved oval black mesh)
      const outerVentGeom = new THREE.CylinderGeometry(0.09, 0.09, 0.02, 28);
      const outerVent = new THREE.Mesh(outerVentGeom, grilleMaterial);
      outerVent.position.set(isRight ? 0.46 : -0.46, 0.12, -0.16);
      outerVent.rotation.y = isRight ? Math.PI / 2 : -Math.PI / 2;
      earbud.add(outerVent);

      return earbud;
    };

    // Root Group for interactive rotation
    const productRoot = new THREE.Group();
    scene.add(productRoot);

    // Right Earbud (Facing camera dynamically like luxury advertisement)
    const rightEarbud = createEarbud(true);
    rightEarbud.position.set(0.58, 0.14, 0.18);
    rightEarbud.rotation.set(0.22, -0.38, 0.16);
    productRoot.add(rightEarbud);

    // Left Earbud (Complementary angle, hovering naturally)
    const leftEarbud = createEarbud(false);
    leftEarbud.position.set(-0.58, -0.14, -0.12);
    leftEarbud.rotation.set(-0.18, 0.44, -0.18);
    productRoot.add(leftEarbud);

    // Floating Atmospheric Depth Rings (representing spatial sound wave field)
    const orbitRingGeom = new THREE.TorusGeometry(1.7, 0.007, 16, 120);
    const orbitRingMat = new THREE.MeshBasicMaterial({
      color: 0xCAD6E2,
      transparent: true,
      opacity: 0.14,
    });
    const orbitRing = new THREE.Mesh(orbitRingGeom, orbitRingMat);
    orbitRing.rotation.x = Math.PI / 2.3;
    productRoot.add(orbitRing);

    // Realistic Floating Soft Contact Shadow Plane (Natural drop shadow without boxes)
    const createShadowTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const gradient = ctx.createRadialGradient(128, 128, 10, 128, 128, 120);
        gradient.addColorStop(0, 'rgba(0, 0, 0, 0.75)');
        gradient.addColorStop(0.35, 'rgba(0, 0, 0, 0.4)');
        gradient.addColorStop(0.7, 'rgba(0, 0, 0, 0.12)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 256, 256);
      }
      return new THREE.CanvasTexture(canvas);
    };

    const shadowGeom = new THREE.PlaneGeometry(3.6, 2.2);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: createShadowTexture(),
      transparent: true,
      opacity: 0.7,
      depthWrite: false,
    });
    const shadowPlane = new THREE.Mesh(shadowGeom, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -1.65;
    scene.add(shadowPlane);

    // Smooth Inertial Mouse/Touch Drag Controls
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;
    let rotX = 0;
    let rotY = 0;
    let targetRotX = 0;
    let targetRotY = 0.2;
    let autoIdleTime = 0;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevX = e.clientX;
      prevY = e.clientY;
      setHasInteracted(true);
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevX;
      const deltaY = e.clientY - prevY;
      prevX = e.clientX;
      prevY = e.clientY;

      targetRotY += deltaX * 0.009;
      // Restrict pitch so earbuds don't flip upside down
      targetRotX = Math.max(-0.6, Math.min(0.6, targetRotX + deltaY * 0.007));
    };

    const onPointerUp = (e: PointerEvent) => {
      isDragging = false;
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {
        // Safe fallback
      }
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('pointerdown', onPointerDown);
    domElement.addEventListener('pointermove', onPointerMove);
    domElement.addEventListener('pointerup', onPointerUp);
    domElement.addEventListener('pointercancel', onPointerUp);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Subtle auto-idle rotation & breathing when untouched
      if (!isDragging) {
        autoIdleTime += delta;
        targetRotY += 0.0035; // Controlled, slow, luxury showcase drift
      }

      // Smooth Inertial Damping
      rotX += (targetRotX - rotX) * 0.08;
      rotY += (targetRotY - rotY) * 0.08;

      productRoot.rotation.x = rotX;
      productRoot.rotation.y = rotY;

      // Harmonic Floating Suspended Bobbing
      const floatY = Math.sin(elapsedTime * 1.6) * 0.085;
      productRoot.position.y = floatY;

      // Micro differential hover between earbuds
      rightEarbud.position.y = 0.18 + Math.sin(elapsedTime * 1.9) * 0.025;
      leftEarbud.position.y = -0.18 + Math.cos(elapsedTime * 2.1) * 0.025;

      // Dynamic ground shadow scaling & breathing with float
      const shadowScale = 1.0 - (floatY * 0.4);
      shadowPlane.scale.set(shadowScale, shadowScale, 1);
      shadowMat.opacity = 0.65 - (floatY * 0.15);

      orbitRing.rotation.z = elapsedTime * 0.08;

      renderer?.render(scene, camera);
    };

    animate();

    // Resize Observer for fluid responsiveness
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0 && renderer) {
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          renderer.setSize(width, height);
        }
      }
    });

    resizeObserver.observe(container);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();

      domElement.removeEventListener('pointerdown', onPointerDown);
      domElement.removeEventListener('pointermove', onPointerMove);
      domElement.removeEventListener('pointerup', onPointerUp);
      domElement.removeEventListener('pointercancel', onPointerUp);

      renderer?.dispose();
      if (renderer?.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div 
      className={`relative w-full h-full flex items-center justify-center select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 3D WebGL Canvas Viewport */}
      <div 
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing touch-none"
        title="Klik dan seret untuk memutar 3D TWS 360°"
      />

      {/* Floating 360° Interactive Hint Badge */}
      <div 
        className={`absolute bottom-3 inset-x-0 mx-auto w-fit flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1E2329]/80 border border-[#A9B5C1]/20 backdrop-blur-md text-[11px] font-bold text-[#F2F3F1] pointer-events-none transition-all duration-500 shadow-md ${
          hasInteracted && !isHovered ? 'opacity-40 hover:opacity-100' : 'opacity-90'
        }`}
      >
        <RotateCcw className="w-3.5 h-3.5 text-[#92B6E5] animate-spin" style={{ animationDuration: '8s' }} />
        <span>Drag to rotate 3D • 360° View</span>
        <Sparkles className="w-3 h-3 text-[#92B6E5]" />
      </div>
    </div>
  );
};
