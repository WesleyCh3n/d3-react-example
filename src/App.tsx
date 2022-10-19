import * as d3 from "d3";
import { useState } from "react";
import { Data, LinePlot } from "./LinePlot";
import { Layout } from "./Plot";

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
    <div className="p-2">
      <LinePlot data={data} layout={layout} />
      <button
        className="border p-2 rounded hover:bg-slate-200"
        onClick={() => {
          let a = [...Array(10).keys()].map((_, i) => {
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
        className="border p-2 rounded w-12 text-center font-bold"
        step={1}
        value={layout.left}
        onChange={e =>
          setLayout(layout => ({ ...layout, left: +e.target.value }))}
      />
      <input
        type="number"
        className="border p-2 rounded w-12 text-center font-bold"
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
    </div>
  );
}

export default App;
