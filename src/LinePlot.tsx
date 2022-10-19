import * as d3 from "d3";
import { Layout } from "./Plot";
import { useD3 } from "./useD3";
import { useTooltip } from "./useTooltip";

export type Data = {
  x: number;
  y: number;
};

export const LinePlot = (props: { data: Data[]; layout: Layout }) => {
  // const refChart = useRef<SVGSVGElement>(null);
  const ref = useD3((svg) => {
    // function of map dimension of abstract data to a visual representation
    const xScale = d3.scaleLinear()
      // boundary of actual data, ex: [min(data), max(data)]
      .domain(d3.extent(props.data, (d) => d.x).map((x) => x ?? 0))
      // output range for virualization, ex: [0, svg width]
      .range([props.layout.left, props.layout.width - props.layout.right]);
    const yScale = d3.scaleLinear()
      .domain(d3.extent(props.data, (d) => d.y).map((y) => y ?? 0))
      .range([props.layout.height - props.layout.bottom, props.layout.top]);

    // create axis line
    const xAxis: d3.Selection<SVGGElement, unknown, null, undefined> = svg
      .select("#xAxis");
    const yAxis: d3.Selection<SVGGElement, unknown, null, undefined> = svg
      .select("#yAxis");
    xAxis.transition().call(d3.axisBottom(xScale));
    yAxis.transition().call(d3.axisLeft(yScale));

    const yGrid: d3.Selection<SVGGElement, unknown, null, undefined> = svg
      .select("#yGrid");
    yGrid.selectAll("line").data(yScale.ticks())
      .join("line")
      .transition()
      .attr("class", "stroke-gray-300")
      .attr("x1", props.layout.left)
      .attr("x2", props.layout.width - props.layout.right)
      .attr("y1", d => yScale(d))
      .attr("y2", d => yScale(d));

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

    useTooltip(
      svg.select("#tooltip"), // a tooltip group
      svg.select("#tooltip_overlay")
        .attr("width", props.layout.width)
        .attr("height", props.layout.height), // mouse over rect overlay on plot
      (e: any) => {
        const x0 = xScale.invert(d3.pointer(e)[0]),
          i = d3.bisector((d: typeof props.data[number]) => d.x).left(
            props.data,
            x0,
          ),
          d0 = props.data[i - 1],
          d1 = props.data[i];
        if (!d0 || !d1) return;
        const closestData = x0 - d0.x > d1.x - x0 ? d1 : d0;
        return [xScale(closestData.x), yScale(closestData.y)];
      },
    );
  }, [props.data, props.layout]);

  return (
    <svg
      className="border border-red-600"
      ref={ref}
      width={props.layout.width}
      height={props.layout.height}
      viewBox={`0 0 ${props.layout.width} ${props.layout.height}`}
    >
      <g>
        <g
          id="yGrid"
          className="text-lime-700"
        />
        <g>
          <path className="stroke-2 stroke-blue-300 fill-transparent" />
        </g>
        <g
          id="xAxis"
          className="text-gray-600"
          transform={`translate(0, ${props.layout.height - props.layout.bottom
            })`}
        />
        <g
          id="yAxis"
          className="text-gray-600"
          transform={`translate(${props.layout.left}, 0)`}
        />
        <g id="tooltip">
          <rect
            className="fill-stone-900 w-20 h-14 rounded-lg"
            rx="5"
            y="-28"
            x="6"
          />
        </g>
        <rect id="tooltip_overlay" />
      </g>
    </svg>
  );
};
