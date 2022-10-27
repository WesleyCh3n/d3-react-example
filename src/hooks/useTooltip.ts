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
        tooltip.attr(
          "transform",
          `translate(${move[0]}, ${move[1]})`,
        ).transition()
          .style("opacity", 0.5)
          .ease(easeExpInOut)
          ;
      }
    });
};

// Usage example

// const App = () => {
//  useTooltip(
//    svg.select("#tooltip"), // a tooltip group
//    svg.select("#tooltip_overlay")
//      .attr("width", props.layout.width)
//      .attr("height", props.layout.height), // mouse over rect overlay on plot
//    (e: any) => {
//      const x0 = xScale.invert(d3.pointer(e)[0]),
//        i = d3.bisector((d: typeof props.data[number]) => d.x).left(
//          props.data,
//          x0,
//        ),
//        d0 = props.data[i - 1],
//        d1 = props.data[i];
//      if (!d0 || !d1) return;
//      const closestData = x0 - d0.x > d1.x - x0 ? d1 : d0;
//      svg.select("#tooltip_text").text(
//        `(${closestData.x.toFixed(1)} ${closestData.y.toFixed(1)})`,
//      );
//      return [xScale(closestData.x), yScale(closestData.y)];
//    },
//  );
//   return (
//     <svg>
//     <g id= "tooltip" className = "-z-10 opacity-0" >
//       <rect className="fill-stone-900 w-16 h-8 rounded-lg" rx = "5" y = "-16" x = "6" />
//       <text id="tooltip_text" className = "fill-white text-sm" children = "x: 1" x = "12" y = "5" />
//     </g>
//     < rect id = "tooltip_overlay" />
//     </svg>
//   )
// }
