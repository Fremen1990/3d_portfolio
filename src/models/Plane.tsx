import { useEffect, useRef } from "react";
import { useAnimations, useGLTF } from "@react-three/drei"

// https://sketchfab.com/3d-models/stylized-ww1-plane-c4edeb0e410f46e8a4db320879f0a1db
// @ts-ignore
import planeScene from "../assets/3d/plane.glb";

// @ts-ignore
export const Plane = ({ isRotating, ...props }) => {
  const ref = useRef();
  const { scene, animations } = useGLTF(planeScene);
  const { actions } = useAnimations(animations, ref);


  // Use an effect to control the plane's animation based on 'isRotating'
  // Note: Animation names can be found on the Sketchfab website where the 3D model is hosted.
  useEffect(() => {
    if (isRotating) {
      actions["Take 001"].play();
    } else {
      actions["Take 001"].stop();
    }
  }, [actions, isRotating]);

  return (
    <mesh {...props} ref={ref}>
      <primitive object={scene} />
    </mesh>
  );
};


