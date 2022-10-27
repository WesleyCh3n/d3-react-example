import * as d3 from "d3";
import { useD3Canvas } from "../hooks/useD3Canvas";
import { Data, Layout } from "./Plot";

// https://observablehq.com/@d3/hello-d3-drag?collection=@d3/d3-drag
export const CanvasPlot = (props: { data: Data[]; layout: Layout }) => {
  const ref = useD3Canvas((div) => {
    // virtual d3 data container
    // i think it's better to create data directly
    /* const detachContainer = document.createElement("virtual");
    const dataContainer = d3.select(detachContainer);
    const circle = dataContainer.append("circle")
      .attr("cx", 30).attr("cy", 40).attr("r", 20)
      .attr("fill", "steelblue"); */

    /* --------------------------------------------------------------------- */
    // line plot
    const xScale = d3.scaleLinear()
      .domain(d3.extent(props.data, (d) => d.x).map((x) => x ?? 0))
      .range([props.layout.left, props.layout.width - props.layout.right]);
    const yScale = d3.scaleLinear()
      .domain(d3.extent(props.data, (d) => d.y).map((y) => y ?? 0))
      .range([props.layout.height - props.layout.bottom, props.layout.top]);

    const line = d3.line<Data>()
      .x(d => xScale(d.x))
      .y(d => yScale(d.y))
      .curve(d3.curveMonotoneY)
      .curve(d3.curveMonotoneX);

    // create canvas and bind data on it
    var canvas = div.select<HTMLCanvasElement>("canvas")
      .attr("width", props.layout.width)
      .attr("height", props.layout.height);
    const context = canvas.node()?.getContext("2d");
    if (!context) return;

    function renderCanvas(ctx: CanvasRenderingContext2D) {
      // clear canvas
      // draw with d3 data bind
      /* ctx.beginPath();
      ctx.fillStyle = circle.attr("fill");
      ctx.arc(
        +circle.attr("cx"),
        +circle.attr("cy"),
        +circle.attr("r"),
        0,
        2 * Math.PI,
      );
      ctx.fill();
      ctx.closePath(); */
      // direct draw circles data
      const radius = 3;
      ctx.beginPath()
      props.data.forEach(d => {
        ctx.moveTo(xScale(d.x), yScale(d.y))
        ctx.arc(xScale(d.x), yScale(d.y), radius, 0, 2 * Math.PI);
        ctx.fillStyle = "steelblue";
        ctx.fill();
      })
      ctx.closePath();

      // draw line
      line.context(ctx);
      ctx.beginPath();
      line(props.data);
      ctx.strokeStyle = "steelblue";
      ctx.stroke();
      ctx.closePath();

      // x Axis
      ctx.beginPath();
      var ticks = xScale.ticks(),
        tickFormat = xScale.tickFormat(),
        tickSize = 6;
      ticks.forEach((d) => {
        ctx.moveTo(
          xScale(d),
          props.layout.height - props.layout.bottom,
        );
        ctx.lineTo(
          xScale(d),
          props.layout.height - props.layout.bottom + tickSize,
        );
      });
      // horizontal line
      ctx.moveTo(props.layout.left, props.layout.height - props.layout.bottom);
      ctx.lineTo(
        props.layout.width,
        props.layout.height - props.layout.bottom,
      );
      ctx.strokeStyle = "black";
      ctx.stroke();
      // tick label
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.fillStyle = "black";
      ticks.forEach((d) => {
        ctx.fillText(
          tickFormat(d),
          xScale(d),
          props.layout.height - props.layout.bottom + tickSize,
        );
      });
      ctx.closePath();

      // y Axis
      ctx.beginPath();
      var ticks = yScale.ticks(),
        tickFormat = yScale.tickFormat(),
        tickSize = 6;
      ticks.forEach(d => {
        ctx.moveTo(props.layout.left, yScale(d));
        ctx.lineTo(props.layout.left - tickSize, yScale(d));
      });
      // vertical line
      ctx.moveTo(props.layout.left, 0);
      ctx.lineTo(props.layout.left, props.layout.height - props.layout.bottom);
      ctx.strokeStyle = "black";
      ctx.stroke();
      // tick label
      ctx.textAlign = "right";
      ctx.textBaseline = "middle";
      ticks.forEach((d) => {
        ctx.fillText(
          tickFormat(d),
          props.layout.left - tickSize - 2,
          yScale(d),
        );
      });
      ctx.closePath();

      //  y grid
      ctx.beginPath()
      var ticks = yScale.ticks();
      ticks.forEach(d => {
        ctx.moveTo(props.layout.left, yScale(d));
        ctx.lineTo(props.layout.width - props.layout.right, yScale(d));
      })
      ctx.strokeStyle = "#D4D4D8";
      ctx.stroke();
      ctx.closePath()
    }

    renderCanvas(context);
  }, [props.data]);
  return (
    <div ref={ref} className="border border-red-500">
      <canvas />
    </div>
  );
};
