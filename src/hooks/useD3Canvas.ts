import { select, Selection } from "d3-selection";
import { DependencyList, useEffect, useRef } from "react";

export const useD3Canvas = (
  renderFn: (svg: Selection<HTMLDivElement, unknown, null, undefined>) => void,
  deps: DependencyList | undefined,
) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) {
      return () => { };
    }
    renderFn(select(ref.current));
    return () => { };
  }, deps);
  return ref;
};
