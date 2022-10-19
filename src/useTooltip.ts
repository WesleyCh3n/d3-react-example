import { Selection, BaseType } from "d3-selection";
import { easeExpInOut } from "d3-ease"

export const useTooltip = (
  tooltip: Selection<SVGElement, unknown, null, undefined>,
  tooltip_overlay: Selection<BaseType, unknown, null, undefined>,
  mouseMoveFn: (e: any) => [number, number] | undefined,
) => {
  tooltip.style("opacity", 0)
    .selectAll("circle").data([1])
    .join("circle")
    .attr("r", 4)
    .attr("class", "fill-stone-900");

  tooltip_overlay
    .attr("fill", "none")
    .attr("pointer-events", "all")
    .on("mouseout", () => tooltip.transition().style("opacity", 0))
    .on("mousemove", (e) => {
      let move = mouseMoveFn(e);
      if (move) {
        tooltip.transition()
          .style("opacity", 0.5)
          .ease(easeExpInOut)
          .attr(
            "transform",
            `translate(${move[0]}, ${move[1]})`,
          );
      }
    });
};
