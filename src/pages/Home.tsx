import { Suspense, useEffect, useRef, useState } from "react";
import { useSpring, a } from "@react-spring/three";

import { CameraControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { HomeInfo, Loader } from "../components";
import { Island, Sky, Plane, Bird } from "../models";
import { useHome } from "./Home.hooks.ts";
import {
  FaArrowDown,
  FaArrowLeft,
  FaArrowRight,
  FaArrowUp,
} from "react-icons/fa";

import sakura from "../assets/sakura.mp3";
import { soundoff, soundon } from "../assets/icons";
import { MdZoomIn, MdZoomOut } from "react-icons/md";

export const Home = () => {
  const [islandPosition, setIslandPosition] = useState([0, -6, -20]);
  // const [api] = useSpring(() => ({ position: islandPosition }));
  // const islandSpring = useSpring({ position: islandPosition as any });

  const [{ position }, set] = useSpring(() => ({
    position: islandPosition,
  }));

  const islandRef = useRef();
  const rotationSpeed = useRef(0);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowLeft") {
      if (!isRotating) setIsRotating(true);
      // @ts-ignore
      islandRef.current.rotation.y += 0.01 * Math.PI;
      rotationSpeed.current = 0.0125;
      // setIsRotatingLeft(true);
    } else if (event.key === "ArrowRight") {
      if (!isRotating) setIsRotating(true);
      // @ts-ignore
      islandRef.current.rotation.y -= 0.01 * Math.PI;
      rotationSpeed.current = -0.0125;
      // setIsRotatingRight(true)
    } else if (event.key === "ArrowUp") {
      adjustIslandPosition("up");
    } else if (event.key === "ArrowDown") {
      adjustIslandPosition("down");
    }
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    if (event.key === "ArrowLeft") {
      setIsRotating(false);
      // setIsRotatingLeft(false)
    } else if (event.key === "ArrowRight") {
      setIsRotating(false);
      // setIsRotatingRight(false)
    }
  };

  // Island posiitoin up and down
  // @ts-ignore
  const adjustIslandPosition = (direction) => {
    setIslandPosition((prevPosition) => {
      let newY = prevPosition[1];
      const adjustmentAmount = 1; // Adjust this value based on your requirement

      if (direction === "up") {
        newY -= adjustmentAmount;
      } else if (direction === "down") {
        newY += adjustmentAmount;
      }

      set({ position: [prevPosition[0], newY, prevPosition[2]] });

      return [prevPosition[0], newY, prevPosition[2]];
    });
  };

  //Audio
  const audioRef = useRef<HTMLAudioElement>(new Audio(sakura));
  audioRef.current.volume = 0.4;
  audioRef.current.loop = true;

  // camera rotation
  const cameraControlRef = useRef<CameraControls | null>(null);

  const rotateIntervalRef = useRef(null);

  // @ts-ignore
  const startRotating = (direction) => {
    if (rotateIntervalRef.current) {
      clearInterval(rotateIntervalRef.current);
    }

    // @ts-ignore
    rotateIntervalRef.current = setInterval(() => {
      const rotationAmount = 0.05; // Adjust the rotation speed as needed
      switch (direction) {
        case "up":
          cameraControlRef.current?.rotate(0, -rotationAmount, true);
          break;
        case "down":
          cameraControlRef.current?.rotate(0, rotationAmount, true);
          break;
        // Add more cases for other directions if needed
      }
    }, 100); // Adjust the interval timing as needed
  };

  const stopRotating = () => {
    if (rotateIntervalRef.current) {
      clearInterval(rotateIntervalRef.current);
      rotateIntervalRef.current = null;
    }
  };

  // ZOOM
  const zoomIntervalRef = useRef(null);
  // @ts-ignore
  const startZoomming = (direction) => {
    if (zoomIntervalRef.current) {
      clearInterval(zoomIntervalRef.current);
    }

    // @ts-ignore
    zoomIntervalRef.current = setInterval(() => {
      const zoomRatio = 0.05;
      switch (direction) {
        case "zoomIn":
          cameraControlRef.current?.zoom(zoomRatio, true);
          break;
        case "zoomOut":
          cameraControlRef.current?.zoom(-zoomRatio, true);
          break;
        default:
          break;
      }
    }, 100);
  };

  const stopZoomming = () => {
    if (zoomIntervalRef.current) {
      clearInterval(zoomIntervalRef.current);
      zoomIntervalRef.current = null;
    }
  };

  const { adjustIslandForScreenSize, adjustPlaneForScreenSize } = useHome({
    islandPosition,
    setIslandPosition,
  });

  const [isRotating, setIsRotating] = useState(false);
  const [currentStage, setCurrentStage] = useState(1);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  const [islandScale, screenRotation] = adjustIslandForScreenSize();

  const [planeScale, planePosition] = adjustPlaneForScreenSize();

  const rotationInterval = useRef(null);
  // @ts-ignore
  const handleMouseDown = (event) => {
    const direction = event.currentTarget.getAttribute("data-direction");

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

    if (rotationInterval.current && direction === "left") {
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
          <directionalLight position={[1, 1, 1]} intensity={1.5} />
          <ambientLight intensity={0.5} />
          <hemisphereLight
            skyColor="#b1e1ff"
            groundColor="#000000"
            intensity={0.5}
          />

          <CameraControls ref={cameraControlRef} />
          <Bird />
          <Sky isRotating={isRotating} />
          {/*// @ts-ignore*/}
          <a.group position={position}>
            <Island
              adjustIslandPosition={adjustIslandPosition}
              islandPosition={islandPosition}
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
              handleKeyDown={handleKeyDown}
              handleKeyUp={handleKeyUp}
            />
            // @ts-ignore
          </a.group>

          <Plane
            isRotating={isRotating}
            scale={planeScale}
            position={planePosition}
            rotation={[0, 20, 0]}
          />
        </Suspense>
      </Canvas>

      <div className="hover-animate absolute bottom-2 left-2">
        <img
          src={isPlayingMusic ? soundon : soundoff}
          alt="Speaker Icon"
          className="w-10 h-10 cursor-pointer object-contain"
          onClick={() => setIsPlayingMusic(!isPlayingMusic)}
        />
      </div>

      <button
        onMouseDown={() => startZoomming("zoomIn")}
        onMouseUp={stopZoomming}
        onMouseLeave={stopZoomming}
        className="hide-on-mobile hover-animate absolute p-3 right-5 top-1/2 -mt-40 w-max h-max text-lg text-white bg-blue-600 rounded-full"
      >
        <MdZoomIn className="text-4xl" />
      </button>
      <button
        onMouseDown={() => startZoomming("zoomOut")}
        onMouseUp={stopZoomming}
        onMouseLeave={stopZoomming}
        className="hide-on-mobile hover-animate absolute p-3 right-5 top-1/2 -mt-20 w-max h-max text-lg text-white bg-blue-600 rounded-full"
      >
        <MdZoomOut className="text-4xl" />
      </button>

      <button
        onMouseDown={() => startRotating("up")}
        onMouseUp={stopRotating}
        onMouseLeave={stopRotating}
        className="hide-on-mobile hover-animate absolute p-4 right-5 top-1/2 mb-20 w-max h-max text-lg text-white bg-blue-600 rounded-full"
      >
        <FaArrowUp className="text-3xl" />
      </button>
      <button
        onMouseDown={() => startRotating("down")}
        onMouseUp={stopRotating}
        onMouseLeave={stopRotating}
        className="hide-on-mobile hover-animate absolute p-4 right-5 top-1/2 mt-20 w-max h-max text-lg text-white bg-blue-600 rounded-full"
      >
        <FaArrowDown className="text-3xl" />
      </button>

      <div className="hide-on-mobile hover-animate absolute w-max h-max bg-blue-600 left-20   bottom-24 rounded-full">
        <button
          className="absolute bottom-5 ml-20 left-1/2 transform -translate-x-1/2 p-4 w-max h-max text-lg text-white bg-blue-600 rounded-full"
          data-direction="left"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div className="flex gap-2">
            <FaArrowLeft className="text-2xl" />
            Press Arrow Key
          </div>
        </button>
      </div>

      <div className="hide-on-mobile hover-animate absolute w-max h-max bg-blue-600 right-20   bottom-24 rounded-full">
        <button
          className="absolute bottom-5 -ml-20 left-1/2 transform -translate-x-1/2 p-4 w-max h-max text-lg text-white bg-blue-600 rounded-full"
          data-direction="right"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div className="flex gap-2">
            Press Arrow Key
            <FaArrowRight className="text-2xl" />
          </div>
        </button>
      </div>

      <button
        onMouseDown={() => adjustIslandPosition("up")}
        className="hide-on-mobile hover-animate absolute bottom-5 -ml-40 left-1/2 transform -translate-x-1/2 p-4 w-max h-max text-lg text-white bg-blue-600 rounded-full"
      >
        <div className="flex gap-2">
          <FaArrowUp className="text-2xl" />
          Press Arrow Key
        </div>
      </button>

      <button
        onMouseDown={() => adjustIslandPosition("down")}
        className="hide-on-mobile hover-animate absolute bottom-5 ml-40 left-1/2 transform -translate-x-1/2 p-4 w-max h-max text-lg text-white bg-blue-600 rounded-full"
      >
        <div className="flex gap-2">
          <FaArrowDown className="text-2xl" />
          Press Arrow Key
        </div>
      </button>
    </section>
  );
};
