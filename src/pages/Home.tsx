import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Loader } from "../components";
import { Island, Sky, Plane, Bird } from "../models";
import { useHome } from "./Home.hooks.ts";

export const Home = () => {
  const { adjustIslandForScreenSize, adjustPlaneForScreenSize } = useHome();

  const [isRotating, setIsRotating] = useState(false);
  const [currentStage, setCurrentStage] = useState(1);

  console.log("currentStage", currentStage);

  const [islandScale, islandPosition, screenRotation] =
    adjustIslandForScreenSize();

  const [planeScale, planePosition] = adjustPlaneForScreenSize();

  return (
    <section className="w-full h-screen relative">
      {/*<div className="absolute top-28 left-0 right-0 z-10 flex items-center justify-center">*/}
      {/*    POPUP*/}
      {/*</div>*/}

      <Canvas
        className={`w-full h-screen bg-transparent ${
          isRotating ? "cursor-grabbing" : "cursor-grab"
        }`}
        camera={{ near: 0.1, far: 1000 }}
      >
        <Suspense fallback={<Loader />}>
          <directionalLight position={[1, 1, 1]} intensity={2} />
          <ambientLight intensity={0.5} />
          {/*<pointLight />*/}
          {/*<spotLight />*/}
          <hemisphereLight
            skyColor="#b1e1ff"
            groundColor="#000000"
            intensity={1}
          />
          <Bird />
          <Sky isRotating={isRotating} />
          <Island
            position={islandPosition}
            scale={islandScale}
            screenRotation={screenRotation}
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
          />
          <Plane
            isRotating={isRotating}
            scale={planeScale}
            position={planePosition}
            rotation={[0, 20, 0]}
          />
        </Suspense>
      </Canvas>
    </section>
  );
};


// todo 01:18:30