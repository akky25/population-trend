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
} from "recharts";
import style from "./artificial-transitive-graph.module.css";
import { useSetDrawingData } from "./use-get-Population";

export const ArtificialTransitiveGraph = (props: {
  getAllPrefCode: string[];
}) => {
  const [data, targetPref] = useSetDrawingData(props.getAllPrefCode);

  if (!data) {
    return <>Loading...</>;
  }

  if (targetPref.length === 0) {
    return <></>;
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
          <ReferenceLine x="2015" stroke="green" label="実績・予測値境界" />
          {targetPref.map((prefecture) => {
            return (
              <Line
                key={prefecture.id}
                id={prefecture.id}
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
