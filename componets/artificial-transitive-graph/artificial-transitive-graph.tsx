import {} from "libs/get-population-composition";
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  ResponsiveContainer,
  ReferenceLine,
  LabelList,
} from "recharts";
import style from "./artificial-transitive-graph.module.css";
import { useSetDrawingData } from "./use-get-Population";

export const ArtificialTransitiveGraph = () => {
  const [data, targetPref] = useSetDrawingData();

  if (!data) {
    return <>Loading...</>;
  }

  return (
    <div className={style.main}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Legend />
          <ReferenceLine x="2015" stroke="green" label="Min PAGE" />
          {targetPref.map((prefecture) => {
            return (
              <Line
                key={prefecture.id}
                type="monotone"
                dataKey={prefecture.id}
                stroke="#8884d8"
                activeDot={{ r: 8 }}
                name={prefecture.label}
              ></Line>
            );
          })}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
