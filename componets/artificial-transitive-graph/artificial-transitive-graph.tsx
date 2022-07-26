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

export const ArtificialTransitiveGraph = () => {
  const { data, appState, hasDrawingTarget } = useSetDrawingData();

  if (!data) {
    return <>Loading...</>;
  }

  if (!hasDrawingTarget) {
    return <>都道府県を選択してください</>;
  }

  return (
    <div className={style.main}>
      <ResponsiveContainer width="100%" height="100%" minHeight={1000}>
        {/* <ResponsiveContainer width="100%" height="100%"> */}
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
          {appState.reduce((p: JSX.Element[], c) => {
            if (c.checked) {
              p.push(
                <Line
                  key={c.id}
                  type="monotone"
                  dataKey={c.id}
                  stroke={c.color}
                  activeDot={{ r: 8 }}
                  name={c.label}
                  strokeWidth={3}
                ></Line>
              );
            }
            return p;
          }, [])}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
