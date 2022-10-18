import * as d3 from "d3";
import { useState } from "react";
import { Data, LinePlot } from "./LineChart";

function App() {
  const [data, setData] = useState<Data[]>([]);

  return (
    <div className="p-2">
      <LinePlot data={data} />
      <button
        className="border p-2 rounded hover:bg-slate-200"
        onClick={() => {
          let a = [...Array(10).keys()].map((_, i) => {
            return { x: i, y: d3.randomUniform(d3.randomUniform(20)())() };
          });
          setData(a);
        }}
      >
        button
      </button>
      <button
        className="border p-2 rounded hover:bg-slate-200"
        onClick={() => setData([])}
      >
        clear
      </button>
    </div>
  );
}

export default App;
