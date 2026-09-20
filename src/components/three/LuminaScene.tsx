import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import {
  DoubleSide,
  ExtrudeGeometry,
  Group,
  MathUtils,
  PointLight,
} from "three";
import { SVGLoader } from "three/addons/loaders/SVGLoader.js";
import { useReducedMotion } from "motion/react";
import { BRAND_ASSETS } from "@/config/assets";

const LOGO_SCALE = 0.005;

function LogoSculpture({ reduceMotion }: { reduceMotion: boolean }) {
  const logo = useLoader(SVGLoader, BRAND_ASSETS.logo);
  const group = useRef<Group>(null);
  const lamp = useRef<PointLight>(null);
  const elapsed = useRef(0);

  const meshes = useMemo(
    () =>
      logo.paths.flatMap((path) =>
        path.toShapes().map((shape) => ({
          color: `#${path.color.getHexString()}`,
          geometry: new ExtrudeGeometry(shape, {
            depth: 18,
            bevelEnabled: true,
            bevelThickness: 4,
            bevelSize: 2,
            bevelSegments: 2,
            curveSegments: 12,
          }),
        })),
      ),
    [logo.paths],
  );

  useEffect(
    () => () => meshes.forEach(({ geometry }) => geometry.dispose()),
    [meshes],
  );

  useFrame(({ pointer }, delta) => {
    if (reduceMotion) return;
    elapsed.current += delta;

    if (group.current) {
      group.current.rotation.y = MathUtils.damp(
        group.current.rotation.y,
        pointer.x * 0.14 + Math.sin(elapsed.current * 0.34) * 0.06,
        3,
        delta,
      );
      group.current.rotation.x = MathUtils.damp(
        group.current.rotation.x,
        -pointer.y * 0.09 + Math.sin(elapsed.current * 0.25) * 0.025,
        3,
        delta,
      );
    }

    if (lamp.current) {
      lamp.current.position.x =
        Math.sin(elapsed.current * 0.55) * 3 + pointer.x * 2;
      lamp.current.intensity = Math.min(elapsed.current / 1.6, 1) * 34;
    }
  });

  return (
    <group ref={group} rotation={[0.04, -0.08, -0.025]}>
      <ambientLight intensity={0.34} />
      <directionalLight position={[-2, 3, 4]} intensity={3} color="#fff3bf" />
      <pointLight
        ref={lamp}
        position={[2, 0, 3]}
        intensity={34}
        color="#ffcf02"
        distance={12}
      />
      <pointLight position={[-2, -2, 2]} intensity={12} color="#e6efff" />
      <group
        position={[-2.54, 2.43, 0]}
        scale={[LOGO_SCALE, -LOGO_SCALE, LOGO_SCALE]}
      >
        {meshes.map(({ color, geometry }, index) => (
          <mesh geometry={geometry} key={`${color}-${index}`}>
            <meshStandardMaterial
              color={color}
              metalness={0.72}
              roughness={0.24}
              side={DoubleSide}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

export default function LuminaScene() {
  const container = useRef<HTMLDivElement>(null);
  const reduceMotion = Boolean(useReducedMotion());
  const [active, setActive] = useState(true);
  const [supported] = useState(() => {
    try {
      return Boolean(document.createElement("canvas").getContext("webgl2"));
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.05 },
    );
    if (container.current) observer.observe(container.current);

    const syncVisibility = () => {
      const visible =
        !document.hidden &&
        Boolean(
          container.current &&
          container.current.getBoundingClientRect().bottom > 0,
        );
      setActive(visible);
    };

    document.addEventListener("visibilitychange", syncVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncVisibility);
    };
  }, []);

  return (
    <div ref={container} className="sculpture" aria-hidden="true">
      {supported ? (
        <Canvas
          camera={{ position: [0, 0, 7.2], fov: 43 }}
          dpr={[1, 1.5]}
          gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
          frameloop={active && !reduceMotion ? "always" : "demand"}
          performance={{ min: 0.5 }}
        >
          <Suspense fallback={null}>
            <LogoSculpture reduceMotion={reduceMotion} />
          </Suspense>
        </Canvas>
      ) : (
        <img src={BRAND_ASSETS.logo} alt="" />
      )}
    </div>
  );
}
