import { useEffect } from "react";

export function useMount(callback: Fn) {
  useEffect(callback, []);
}

export type Fn = () => void