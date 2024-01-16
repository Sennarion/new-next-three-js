import { useRef, useState, useEffect, useCallback } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import * as THREE from "three";
import SimplexNoise from "simplex-noise";

const Bg = () => {
  const conf = {
    fov: 75,
    cameraZ: 75,
    xyCoef: 50,
    zCoef: 10,
    lightIntensity: 0.9,
    ambientColor: 0x000000,
    light1Color: 0x0e09dc,
    light2Color: 0x1cd1e1,
    light3Color: 0x18c02c,
    light4Color: 0xee3bcf,
  };

  const simplex = new SimplexNoise();
  const [mouse, setMouse] = useState(new THREE.Vector2());
  const [mousePosition, setMousePosition] = useState(new THREE.Vector3());
  const [raycaster] = useState(new THREE.Raycaster());
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const [wWidth, setWWidth] = useState(0);
  const [wHeight, setWHeight] = useState(0);

  const planeRef = useRef();
  const cameraRef = useRef();
  const lightRefs = useRef([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const initLights = () => {
    const r = 30;
    const y = 10;
    const lightDistance = 500;

    lightRefs.current = Array.from({ length: 4 }, (_, index) => {
      const light = new THREE.PointLight(
        conf[`light${index + 1}Color`],
        conf.lightIntensity,
        lightDistance
      );
      scene.add(light);
      return light;
    });

    lightRefs.current[0].position.set(0, y, r);
    lightRefs.current[1].position.set(0, -y, -r);
    lightRefs.current[2].position.set(r, y, 0);
    lightRefs.current[3].position.set(-r, y, 0);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      const v = new THREE.Vector3();
      cameraRef.current.getWorldDirection(v);
      v.normalize();

      const mousePlane = new THREE.Plane(v, 0);

      setMouse({
        x: (e.clientX / width) * 2 - 1,
        y: -((e.clientY / height) * 2) + 1,
      });

      raycaster.setFromCamera(mouse, cameraRef.current);
      raycaster.ray.intersectPlane(mousePlane, setMousePosition);
    };

    window.addEventListener("resize", updateSize, false);
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", updateSize);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [width, height, raycaster, updateSize, mouse]);

  useEffect(() => {
    updateSize();
    initLights();
  }, [initLights, updateSize]);

  useFrame(() => {
    animatePlane();
    animateLights();
  });

  const updateSize = useCallback(() => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);

    if (cameraRef.current) {
      const wsize = getRendererSize();
      setWWidth(wsize[0]);
      setWHeight(wsize[1]);
    }
  });

  const getRendererSize = () => {
    const cam = new THREE.PerspectiveCamera(conf.fov, width / height);
    const vFOV = cam.fov * (Math.PI / 180);
    const h = 2 * Math.tan(vFOV / 2) * Math.abs(conf.cameraZ);
    const w = h * cam.aspect;
    return [w, h];
  };

  const animatePlane = () => {
    const gArray = planeRef.current.geometry.attributes.position.array;
    const time = Date.now() * 0.0002;

    for (let i = 0; i < gArray.length; i += 3) {
      gArray[i + 2] =
        simplex.noise4D(
          gArray[i] / conf.xyCoef,
          gArray[i + 1] / conf.xyCoef,
          time,
          mouse.x + mouse.y
        ) * conf.zCoef;
    }

    planeRef.current.geometry.attributes.position.needsUpdate = true;
  };

  const animateLights = () => {
    const time = Date.now() * 0.001;
    const d = 50;

    lightRefs.current[0].position.x = Math.sin(time * 0.1) * d;
    lightRefs.current[0].position.z = Math.cos(time * 0.2) * d;
    lightRefs.current[1].position.x = Math.cos(time * 0.3) * d;
    lightRefs.current[1].position.z = Math.sin(time * 0.4) * d;
    lightRefs.current[2].position.x = Math.sin(time * 0.5) * d;
    lightRefs.current[2].position.z = Math.sin(time * 0.6) * d;
    lightRefs.current[3].position.x = Math.sin(time * 0.7) * d;
    lightRefs.current[3].position.z = Math.cos(time * 0.8) * d;
  };

  return (
    <Canvas>
      <pointLight color={conf.ambientColor} intensity={conf.lightIntensity} />
      <mesh
        ref={planeRef}
        rotation={[-Math.PI / 2 - 0.2, 0, 0]}
        position={[0, -25, 0]}
      >
        <planeBufferGeometry
          args={[wWidth, wHeight, wWidth / 2, wHeight / 2]}
        />
        <meshLambertMaterial color={0xffffff} side={THREE.DoubleSide} />
      </mesh>
    </Canvas>
  );
};

export default Bg;
