import { createContext, useContext, useState } from "react";

const ShibaAnimationContext = createContext({});

export const ShibaAnimationProvider = (props) => {
  const [animations, setAnimations] = useState([]);
  const [animationIdx, setAnimationIdx] = useState(4);

  return (
    <ShibaAnimationContext.Provider
      value={{ animations, setAnimations, animationIdx, setAnimationIdx }}
    >
      {props.children}
    </ShibaAnimationContext.Provider>
  );
};

export const useShibaAnimation = () => {
  return useContext(ShibaAnimationContext);
};
