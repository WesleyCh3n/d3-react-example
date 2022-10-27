import * as d3 from "d3";
import { useState } from "react";
import { CanvasPlot } from "./components/CanvasPlot";
import { LinePlot } from "./components/LinePlot";
import { Data, Layout } from "./components/Plot";

function App() {
  const [data, setData] = useState<Data[]>([]);
  const initLayout = {
    width: 600,
    height: 400,
    left: 25,
    right: 0,
    top: 0,
    bottom: 25,
  };
  const [layout, setLayout] = useState<Layout>(initLayout);

  return (
    <div className="p-2 flex">
      <div className="p-2">
        <h1 className="text-center">SVG Line Plot</h1>
        <LinePlot data={data} layout={layout} setData={setData} />
        <div className="p-2 flex justify-center gap-4">
          <button
            className="border p-2 rounded hover:bg-slate-200"
            onClick={() => {
              let a = d3.range(20).map(i => {
                return { x: i, y: d3.randomUniform(d3.randomUniform(20)())() };
              });
              setData(a);
            }}
          >
            shuffle
          </button>
          <button
            className="border p-2 rounded hover:bg-slate-200"
            onClick={() => setData([])}
          >
            clear
          </button>
          <input
            type="number"
            className="border p-2 rounded w-14 text-center font-bold"
            step={1}
            value={layout.left}
            onChange={e =>
              setLayout(layout => ({ ...layout, left: +e.target.value }))}
          />
          <input
            type="number"
            className="border p-2 rounded w-14 text-center font-bold"
            step={1}
            value={layout.bottom}
            onChange={e =>
              setLayout(layout => ({ ...layout, bottom: +e.target.value }))}
          />
          <input
            type="number"
            className="border p-2 rounded w-12 text-center font-bold"
            step={1}
            value={layout.right}
            onChange={e =>
              setLayout(layout => ({ ...layout, right: +e.target.value }))}
          />
          <input
            type="number"
            className="border p-2 rounded w-12 text-center font-bold"
            step={1}
            value={layout.top}
            onChange={e =>
              setLayout(layout => ({ ...layout, top: +e.target.value }))}
          />
          <button
            className="border p-2 rounded hover:bg-slate-200"
            onClick={() => setLayout(initLayout)}
          >
            reset
          </button>
          <button
            onClick={() => {
              console.log({ data });
            }}
          >
            data
          </button>
        </div>
      </div>
      <div className="p-2">
        <h1 className="text-center">Canvas Plot</h1>
        <CanvasPlot data={data} layout={{
          width: 600,
          height: 400,
          left: 25,
          right: 0,
          top: 0,
          bottom: 25,
        }} />
      </div>
    </div>
  );
}

export default App;
