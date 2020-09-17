import { useRef, useEffect } from "react";

const shellOrigin = "http://localhost:4000";

export function shellAdd() {
  window.parent.postMessage({ app: "MF_REACT", event: "add" }, shellOrigin);
}

export function shellSubtract() {
  window.parent.postMessage(
    { app: "MF_REACT", event: "subtract" },
    shellOrigin
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
