import { select, Selection } from "d3-selection";
import { DependencyList, useEffect, useRef } from "react";

export const useD3 = (
  renderFn: (svg: Selection<SVGSVGElement, unknown, null, undefined>) => void,
  deps: DependencyList | undefined,
) => {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    if (!ref.current) {
      return () => { };
    }
    renderFn(select(ref.current));
    return () => { };
  }, deps);
  return ref;
};
