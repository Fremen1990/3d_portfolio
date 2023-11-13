import { useRef } from "react";
import { useGLTF } from "@react-three/drei";

// @ts-ignore
import skyScene from "../assets/3d/sky.glb";
import { useFrame } from "@react-three/fiber";

// @ts-ignore
export const Sky = ({ isRotating }) => {
  const sky = useGLTF(skyScene);
  const skyRef = useRef();

  useFrame((_, delta) => {
    if (isRotating) {
      // @ts-ignore
      skyRef.current.rotation.y += 0.15 * delta;
    }
  });

  return (
    <mesh ref={skyRef}>
      <primitive object={sky.scene} />
    </mesh>
  );
};
