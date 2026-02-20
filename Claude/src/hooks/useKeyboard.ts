"use client";

import { useEffect } from "react";

interface UseKeyboardOptions {
  key: string;
  meta?: boolean;
  ctrl?: boolean;
  onPress: () => void;
}

export function useKeyboard({ key, meta, ctrl, onPress }: UseKeyboardOptions) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const metaMatch = meta ? e.metaKey || e.ctrlKey : true;
      const ctrlMatch = ctrl ? e.ctrlKey : true;
      if (e.key === key && metaMatch && ctrlMatch) {
        e.preventDefault();
        onPress();
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [key, meta, ctrl, onPress]);
}
