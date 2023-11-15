// @ts-ignore
import birdScene from "../assets/3d/bird.glb";
import { useAnimations, useGLTF } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";

// @ts-ignore
export const Bird = (props) => {
  const birdRef = useRef();

  // @ts-ignore
  const { scene, animations } = useGLTF(birdScene);
  const { actions } = useAnimations(animations, birdRef);


  useEffect(() => {
    actions["Take 001"].play();
  }, []);

  useFrame(({ clock, camera }) => {
    // Update the Y position to simulate bird-like motion using a sine wave
    // @ts-ignore
    birdRef.current.position.y = Math.sin(clock.elapsedTime) * 0.2 + 2;

    // Check if the bird reached a certain endpoint relative to the camera
    // @ts-ignore
    if (birdRef.current.position.x > camera.position.x + 10) {
      // Change direction to backward and rotate the bird 180 degrees on the y-axis
      // @ts-ignore
      birdRef.current.rotation.y = Math.PI;
      // @ts-ignore
    } else if (birdRef.current.position.x < camera.position.x - 10) {
      // Change direction to forward and reset the bird's rotation
      // @ts-ignore
      birdRef.current.rotation.y = 0;
    }

    // Update the X and Z positions based on the direction
    // @ts-ignore
    if (birdRef.current.rotation.y === 0) {
      // Moving forward
      // @ts-ignore
      birdRef.current.position.x += 0.01;
      // @ts-ignore
      birdRef.current.position.z -= 0.01;
    } else {
      // Moving backward
      // @ts-ignore
      birdRef.current.position.x -= 0.01;
      // @ts-ignore
      birdRef.current.position.z += 0.01;
    }
  });

  return (
    <mesh ref={birdRef} position={[-5, 2, 1]} scale={[0.003, 0.003, 0.003]}>
      <primitive object={scene} />
    </mesh>
  );
};
