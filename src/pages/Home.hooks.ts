
// @ts-ignore
export const useHome = ({ islandPosition, setIslandPosition }) => {
  // Movement up and down of a plance
  // const [islandPosition, setIslandPosition] = useState([0, -10, -40]);




  const adjustIslandForScreenSize = () => {
    let screenScale = null;
    // let screenPosition = [0, -10, -40];
    let screenPosition = islandPosition;
    let screenRotation = [0.1, 4.7, 0];

    if (window.innerWidth < 768) {
      screenScale = [0.9, 0.9, 0.9];
    } else {
      screenScale = [1, 1, 1];
    }

    return [screenScale, screenPosition, screenRotation];
  };

  const adjustPlaneForScreenSize = () => {
    let screenScale, screenPosition;

    if (window.innerWidth < 768) {
      screenScale = [1.5, 1.5, 1.5];
      screenPosition = [0, -1.5, 0];
    } else {
      screenScale = [4, 4, 4];
      screenPosition = [0, -2, -4];
    }

    return [screenScale, screenPosition];
  };

  return {
    adjustIslandForScreenSize,
    adjustPlaneForScreenSize,
  };
};
