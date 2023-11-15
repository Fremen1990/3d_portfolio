import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { HomeInfo, Loader } from "../components";
import { Island, Sky, Plane, Bird } from "../models";
import { useHome } from "./Home.hooks.ts";

import sakura from "../assets/sakura.mp3";
import { soundoff, soundon } from "../assets/icons";

export const Home = () => {
  const audioRef = useRef<HTMLAudioElement>(new Audio(sakura));
  audioRef.current.volume = 0.4;
  audioRef.current.loop = true;

  const { adjustIslandForScreenSize, adjustPlaneForScreenSize } = useHome();

  const islandRef = useRef();
  const rotationSpeed = useRef(0);

  const [isRotating, setIsRotating] = useState(false);
  const [currentStage, setCurrentStage] = useState(1);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  const [islandScale, islandPosition, screenRotation] =
    adjustIslandForScreenSize();

  const [planeScale, planePosition] = adjustPlaneForScreenSize();

  const rotationInterval = useRef(null);
  // @ts-ignore
  const handleMouseDown = (event) => {
    const direction = event.currentTarget.getAttribute("data-direction");
console.log("Direction: ", direction)

    if (!rotationInterval.current) {
      // Check if an interval is already running
      setIsRotating(true);
      // @ts-ignore
      rotationInterval.current = setInterval(() => {
        if (islandRef.current) {
          // @ts-ignore
          // islandRef.current.rotation.y += 0.01 * Math.PI;
          // rotationSpeed.current = 0.0125;
          const rotationAmount = 0.01 * Math.PI;

          // Rotate left or right based on the button clicked
          // @ts-ignore
          islandRef.current.rotation.y +=
            direction === "right" ? -rotationAmount : rotationAmount;
        }
      }, 20); // Adjust the interval time as needed
    }
  };

  // @ts-ignore
  const handleMouseUp = (event) => {
    const direction = event.currentTarget.getAttribute("data-direction");

    if (rotationInterval.current && direction === "right") {
      rotationSpeed.current = -0.0125;
      clearInterval(rotationInterval.current);
      rotationInterval.current = null; // Clear the interval reference
      setIsRotating(false);
    }

    if(rotationInterval.current && direction === "left") {
      rotationSpeed.current = 0.0125;
      clearInterval(rotationInterval.current);
      rotationInterval.current = null; // Clear the interval reference
      setIsRotating(false);
    }
  };

  useEffect(() => {
    // Cleanup on component unmount
    return () => {
      if (rotationInterval.current) {
        clearInterval(rotationInterval.current);
      }
    };
  }, []); // Removed dependency on isRotating

  useEffect(() => {
    if (isPlayingMusic) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlayingMusic]);

  return (
    <section className="w-full h-screen relative">
      <div className="absolute top-28 left-0 right-0 z-10 flex items-center justify-center">
        {currentStage && <HomeInfo currentStage={currentStage} />}
      </div>

      <Canvas
        className={`w-full h-screen bg-transparent ${
          isRotating ? "cursor-grabbing" : "cursor-grab"
        }`}
        camera={{ near: 0.1, far: 1000 }}
      >
        <Suspense fallback={<Loader />}>
          <directionalLight position={[1, 1, 1]} intensity={2} />
          <ambientLight intensity={0.5} />
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
            islandRef={islandRef}
            rotationSpeed={rotationSpeed}
            handleMouseDown={handleMouseDown}
            handleMouseUp={handleMouseUp}
          />
          <Plane
            isRotating={isRotating}
            scale={planeScale}
            position={planePosition}
            rotation={[0, 20, 0]}
          />
        </Suspense>
      </Canvas>

      <div className="hover-animate absolute w-max h-max bg-blue-600  left-20  bottom-24 rounded-full">
        <button
          data-direction="left"
          className="rotate-button text-indigo-100 p-3"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/*<img src={arrow} alt="arrow" className="w-4 h-4 object-contain" />*/}
          &lt; Push Left Arrow Key
        </button>
      </div>

      <div className="hover-animate absolute w-max h-max bg-blue-600 right-20   bottom-24 rounded-full">
        <button
          data-direction="right"
          className="rotate-button text-indigo-100 p-3"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/*<img src={arrow} alt="arrow" className="w-4 h-4 object-contain" />*/}
          Push Right Arrow Key &gt;
        </button>
      </div>

      <div className="hover-animate absolute bottom-2 left-2">
        <img
          src={isPlayingMusic ? soundon : soundoff}
          alt="Speaker Icon"
          className="w-10 h-10 cursor-pointer object-contain"
          onClick={() => setIsPlayingMusic(!isPlayingMusic)}
        />
      </div>
    </section>
  );
};
