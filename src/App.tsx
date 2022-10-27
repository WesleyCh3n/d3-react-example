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

  const shuffleData = () => {
    let d = d3.range(20).map(i => {
      return { x: i, y: d3.randomUniform(d3.randomUniform(20)())() };
    });
    setData(() => d);

  }

  return (
    <div className="p-2">
      <div className="flex justify-center">
        <div className="p-2">
          <h1 className="text-center">SVG Line Plot</h1>
          <LinePlot data={data} layout={layout} setData={setData} />
        </div>
        <div className="p-2">
          <h1 className="text-center">Canvas Plot</h1>
          <CanvasPlot data={data} layout={layout} />
        </div>
      </div>
      <div className="p-2 flex flex-col items-center gap-2">
        <div className="space-x-2">
          <button
            className="border p-2 rounded hover:bg-slate-200"
            onClick={shuffleData}
          >
            shuffle
          </button>
          <button
            className="border p-2 rounded hover:bg-slate-200"
            onClick={() => setData([])}
          >
            clear
          </button>
        </div>
        <div className="space-x-2">
          {"top: "}
          <input
            type="number"
            className="border p-2 rounded w-12 text-center font-bold"
            step={1}
            value={layout.top}
            onChange={e =>
              setLayout(layout => ({ ...layout, top: +e.target.value }))}
          />
          {" bottom: "}
          <input
            type="number"
            className="border p-2 rounded w-14 text-center font-bold"
            step={1}
            value={layout.bottom}
            onChange={e =>
              setLayout(layout => ({ ...layout, bottom: +e.target.value }))}
          />
          {" left: "}
          <input
            type="number"
            className="border p-2 rounded w-14 text-center font-bold"
            step={1}
            value={layout.left}
            onChange={e =>
              setLayout(layout => ({ ...layout, left: +e.target.value }))}
          />
          {" right: "}
          <input
            type="number"
            className="border p-2 rounded w-12 text-center font-bold"
            step={1}
            value={layout.right}
            onChange={e =>
              setLayout(layout => ({ ...layout, right: +e.target.value }))}
          />
          <button
            className="border p-2 rounded hover:bg-slate-200"
            onClick={() => setLayout(initLayout)}
          >
            reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
