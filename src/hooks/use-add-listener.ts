import React, { useEffect } from "react";

type EventHandler = (event: KeyboardEvent) => void;

export const useAddListener = <T extends Node>(
  container: React.MutableRefObject<T>,
  handler: EventHandler,
  type: string
): void =>
  useEffect(() => {
    container.current?.addEventListener(type, handler, true);
    return () => {
      container.current?.removeEventListener(type, handler, true);
    };
  }, [handler, container]);
