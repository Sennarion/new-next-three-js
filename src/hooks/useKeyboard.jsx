import { useEffect, useState } from "react";

export default function useKeyboard() {
  const [keyMap, setKeyMap] = useState({});

  useEffect(() => {
    const onKeyPress = (e) => {
      setKeyMap((prevKeyMap) => ({
        ...prevKeyMap,
        [e.code]: e.type === "keydown",
      }));
    };

    document.addEventListener("keydown", onKeyPress);
    document.addEventListener("keyup", onKeyPress);

    return () => {
      document.removeEventListener("keydown", onKeyPress);
      document.removeEventListener("keyup", onKeyPress);
    };
  }, []);

  return keyMap;
}
