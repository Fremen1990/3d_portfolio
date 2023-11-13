// @ts-ignore
import birdScene from "../assets/3d/bird.glb";
import { useGLTF } from "@react-three/drei";

// @ts-ignore
export const Bird = (props) => {
  // @ts-ignore
  const { scene, animations } = useGLTF(birdScene);
  return (
    <mesh position={[10, 2, 1]} scale={[0.003, 0.003, 0.003]}>
      <primitive object={scene} />
    </mesh>
  );
};
