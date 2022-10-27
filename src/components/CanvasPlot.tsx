import * as d3 from "d3";
import { useD3Canvas } from "../hooks/useD3Canvas";

// https://observablehq.com/@d3/hello-d3-drag?collection=@d3/d3-drag
export const CanvasPlot = () => {
  const ref = useD3Canvas((div) => {
    const detachContainer = document.createElement("virtual");
    const dataContainer = d3.select(detachContainer);
    const circle = dataContainer.append("circle")
      .attr("cx", 20).attr("cy", 10).attr("r", 10)
      .attr("fill", "steelblue");

    var canvas = div.select<HTMLCanvasElement>("canvas")
      .attr("width", 600)
      .attr("height", 400);
    canvas.dispatch("input")
    // canvas.call()
    const context = canvas.node()?.getContext("2d");
    if (!context) return;
    context.beginPath();
    context.fillStyle = circle.attr("fill");
    context.arc(
      +circle.attr("cx"),
      +circle.attr("cy"),
      +circle.attr("r"),
      0,
      2 * Math.PI,
    );
    context.fill();
    context.closePath();

  }, []);
  return (
    <div ref={ref} className="border border-red-500">
      <canvas />
    </div>
  );
};
