import { useRef, useEffect } from "react";

export function shellAdd() {
  window.parent.postMessage(
    { app: "MF_ANGULAR", event: "add" },
    "http://localhost:3000"
  );
}

export function shellSubstract() {
  window.parent.postMessage(
    { app: "MF_ANGULAR", event: "substract" },
    "http://localhost:3000"
  );
}

export function useEventListener(handler, element = window) {
  const savedHandler = useRef();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const eventListener = (event) => savedHandler.current(event);
    element.addEventListener("message", eventListener);
    return () => {
      element.removeEventListener("message", eventListener);
    };
  }, [element]);
}
