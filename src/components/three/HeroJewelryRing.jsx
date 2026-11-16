
import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Lightformer, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

export const HERO_RINGS = {
  fiveStone: '/models/silver_five_stone_ring.glb',
  eternity: '/models/solitaire-ring.glb',
};

function useVisible(ref, rootMargin = '180px') {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    if (!('IntersectionObserver' in window)) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, rootMargin]);

  return visible;
}

function FrameTicker() {
  const invalidate = useThree((state) => state.invalidate);

  useEffect(() => {
    const id = window.setInterval(() => {
      if (
        document.visibilityState === 'visible' &&
        !window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ) {
        invalidate();
      }
    }, 40);

    return () => window.clearInterval(id);
  }, [invalidate]);

  return null;
}

function Ring({
  kind,
  speed = 0.07,
  size = 2.65,
  position = [0, 0, 0],
  tilt = 0,
  yaw = 0.3,
  roll = 0.06,
}) {
  const { scene } = useGLTF(HERO_RINGS[kind]);
  const holder = useRef(null);

  const { model, center, scale } = useMemo(() => {
    const model = scene.clone(true);

    model.traverse((child) => {
      if (!child.isMesh) return;

      const materials = Array.isArray(child.material)
        ? child.material
        : [child.material];

      const copies = materials.map((material) => material.clone());

      child.material = Array.isArray(child.material)
        ? copies
        : copies[0];
    });

    const box = new THREE.Box3().setFromObject(model);
    const dimensions = box.getSize(new THREE.Vector3());

    return {
      model,
      center: box.getCenter(new THREE.Vector3()),
      scale: size / Math.max(
        dimensions.x,
        dimensions.y,
        dimensions.z,
        0.001
      ),
    };
  }, [scene, size]);

  useEffect(() => {
    return () => {
      model.traverse((child) => {
        if (!child.isMesh) return;

        const materials = Array.isArray(child.material)
          ? child.material
          : [child.material];

        materials.forEach((material) => material?.dispose?.());
      });
    };
  }, [model]);

  useFrame((_, dt) => {
    if (
      holder.current &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      holder.current.rotation.y += Math.min(dt, 0.045) * speed;
    }
  });

  return (
    <group position={position} rotation={[tilt, yaw, roll]}>
      <group ref={holder}>
        <group scale={scale}>
          <primitive
            object={model}
            position={[-center.x, -center.y, -center.z]}
          />
        </group>
      </group>
    </group>
  );
}

function StudioLights() {
  return (
    <>
      <ambientLight intensity={0.38} />

      <hemisphereLight
        intensity={0.65}
        color="#ffffff"
        groundColor="#b4c4e2"
      />

      <directionalLight
        intensity={1.25}
        color="#ffffff"
        position={[3, 7, 7]}
      />

      <directionalLight
        intensity={0.8}
        color="#dce7ff"
        position={[-5, 2, -3]}
      />

      <Environment resolution={128} environmentIntensity={1.15}>
        <Lightformer
          intensity={2.5}
          color="#ffffff"
          form="rect"
          scale={[9, 7, 1]}
          position={[0, 5, 6]}
        />

        <Lightformer
          intensity={1.9}
          color="#ffffff"
          form="rect"
          scale={[3, 9, 1]}
          position={[-5, 1, 2]}
          rotation={[0, Math.PI / 2, 0]}
        />

        <Lightformer
          intensity={1.8}
          color="#e3ecff"
          form="rect"
          scale={[4, 8, 1]}
          position={[5, 1, -1]}
          rotation={[0, -Math.PI / 2, 0]}
        />

        <Lightformer
          intensity={1.5}
          color="#ffffff"
          form="rect"
          scale={[8, 3, 1]}
          position={[0, -4, 1]}
          rotation={[Math.PI / 2, 0, 0]}
        />

        <Lightformer
          intensity={1.4}
          color="#d6e3ff"
          form="rect"
          scale={[8, 6, 1]}
          position={[0, 2, -6]}
          rotation={[0, Math.PI, 0]}
        />
      </Environment>
    </>
  );
}

const canvasProps = {
  dpr: [1, 1.5],
  frameloop: 'demand',
  gl: {
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance',
    toneMapping: THREE.ACESFilmicToneMapping,
    toneMappingExposure: 1.15,
  },
};

export function HeroTwinRings() {
  const ref = useRef(null);
  const visible = useVisible(ref, '100px');

  return (
    <div
      className="heroTwinCanvas"
      ref={ref}
      aria-label="Два плавно вращающихся 3D-кольца"
    >
      {visible && (
        <Canvas
          {...canvasProps}
          camera={{
            position: [0, 0, 9.2],
            fov: 36,
            near: 0.1,
            far: 100,
          }}
        >
          <FrameTicker />
          <StudioLights />

          <Suspense fallback={null}>
            <Ring
              kind="eternity"
              size={3.8}
              position={[1.12, 0.86, -0.65]}
              tilt={1.38}
              yaw={0.3}
              speed={0.048}
            />

            <Ring
              kind="fiveStone"
              size={4.5}
              position={[-0.9, -0.68, 0.75]}
              tilt={0.54}
              yaw={-0.15}
              speed={-0.065}
            />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
}

export default function HeroJewelryRing({
  kind = 'eternity',
  className = '',
  speed = 0.06,
}) {
  const ref = useRef(null);
  const visible = useVisible(ref, '80px');

  return (
    <div
      ref={ref}
      className={'heroJewelryRing ' + className}
      aria-label="Интерактивная модель кольца"
    >
      {visible && (
        <Canvas
          {...canvasProps}
          camera={{
            position: [0, 0, 5.8],
            fov: 38,
            near: 0.1,
            far: 100,
          }}
        >
          <FrameTicker />
          <StudioLights />

          <Suspense fallback={null}>
            <Ring
              kind={kind}
              size={3.3}
              tilt={-0.2}
              speed={speed}
            />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
}
