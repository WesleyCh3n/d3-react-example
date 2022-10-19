import { Selection } from "d3-selection";
import { Layout } from "./Plot";

export const Tooltip = (
  props: {
    svg: Selection<SVGSVGElement, unknown, null, undefined>;
    layout: Layout;
    mouseMoveFn: (e: any) => [number, number];
  },
) => {
  // const tooltip: d3.Selection<SVGGElement, unknown, null, undefined> = props.svg
  //   .select("#tooltip");
  const tooltip = props.svg.selectAll("g").data([1]).join("g");
  tooltip.style("display", "none")
    .selectAll("circle").data([1])
    .join("circle").attr("r", 5).attr("fill", "steelblue");

  /* const tooltip_overlay: d3.Selection<
    SVGRectElement,
    unknown,
    null,
    undefined
  > = props.svg
    .select("#tooltip_overlay"); */

  const tooltip_overlay = props.svg.selectAll("rect").data([1]).join("rect");
  tooltip_overlay
    .attr("fill", "none")
    .attr("pointer-events", "all")
    .attr("width", props.layout.width)
    .attr("height", props.layout.height)
    .on("mouseover", () => tooltip.style("display", null))
    .on("mouseout", () => tooltip.style("display", "none"))
    .on("mousemove", (e) => {
      let move = props.mouseMoveFn(e);
      tooltip.attr("transform", `translate(${move[0]}, ${move[1]})`);
    });
  return (
    <>
      <g id="tooltip" />
      <rect id="tooltip_overlay" />
    </>
  );
};
