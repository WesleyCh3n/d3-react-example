import * as d3 from "d3";
import { useEffect, useRef } from "react";

export type Data = {
  x: number;
  y: number;
};

const width = 600;
const height = 400;
const margin = {
  left: 10,
  top: 30
}

export const LinePlot = (props: { data: Data[] }) => {
  const refChart = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (refChart.current) {
      const svg = d3.select(refChart.current);

      // function of map dimension of abstract data to a visual representation
      const xScale = d3.scaleLinear()
        // boundary of actual data, ex: [min(data), max(data)]
        .domain(d3.extent(props.data, (d) => d.x).map((x) => x ?? 0))
        // output range for virualization, ex: [0, svg width]
        .range([0, width]);
      const yScale = d3.scaleLinear()
        .domain(d3.extent(props.data, (d) => d.y).map((y) => y ?? 0))
        .range([height, 0]);

      // create axis line
      const xAxis: d3.Selection<SVGGElement, unknown, null, undefined> = svg
        .select("#xAxis");
      const yAxis: d3.Selection<SVGGElement, unknown, null, undefined> = svg
        .select("#yAxis");
      xAxis.transition().call(d3.axisBottom(xScale));
      yAxis.transition().call(d3.axisLeft(yScale));

      // draw actual line plot
      svg.select("path")
        .data([props.data])
        .join(
          (enter) => enter,
          (update) =>
            update.transition().attr(
              "d",
              d3.line<Data>()
                .x((d) => xScale(d.x))
                .y((d) => yScale(d.y)),
            ),
          (exit) => exit.remove(),
        );
    }
  }, [props.data]);

  return (
    <svg
      className="border border-red-600 p-2"
      ref={refChart}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
    >
      <g transform={`translate(${0} ,${0})`}>
        <g>
          <path className="stroke-2 stroke-blue-300 fill-transparent" />
        </g>
        <g
          id="xAxis"
          className="text-green-600"
          transform={`translate(0, ${0})`}
        />
        <g
          id="yAxis"
          className="text-green-600"
          transform={`translate(${0}, 0)`}
        />
      </g>
    </svg>
  );
};
