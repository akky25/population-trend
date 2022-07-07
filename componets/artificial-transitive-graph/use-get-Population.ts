import { fetchAllPopulationCompositionPeryear } from "libs/get-population-composition";
import { AppState, useAppState } from "libs/state/AppState";
import { useState, useEffect, useMemo } from "react";

type DrawingData = {
  year: number;
  [key: string]: number;
}[];

/**
 *
 * @param prefCodes 都道府県コードの配列
 * @returns
 */
const generateDrawingData = async (prefCodes: string[]) => {
  // 全データ取得
  const responses = await fetchAllPopulationCompositionPeryear(prefCodes);

  // 年毎の総人口データMAP
  const totalPopulationEachPrefectures = new Map<
    number,
    { [key: string]: number }
  >();

  // 取得したデータから都道県毎に総人口データを取得
  responses.forEach((res) => {
    // Fetchデータから総人口データを抽出
    const totalPopulationData = res.data.result.data.find(
      (d) => d.label === "総人口"
    )?.data;

    // 年毎のMAPに総人口データを設定
    totalPopulationData?.forEach((v) => {
      totalPopulationEachPrefectures.set(v.year, {
        ...totalPopulationEachPrefectures.get(v.year),
        [res.prefCode]: v.value,
      });
    });
  });

  // 描画用に整形
  const drawingData: DrawingData = [];
  totalPopulationEachPrefectures.forEach((v, k) => {
    drawingData.push({
      year: k,
      ...v,
    });
  });
  return drawingData;
};

//
const targetPrefReducer = (
  p: AppState,
  c: {
    id: string;
    checked: boolean;
    label: string;
  }
) => {
  if (c.checked) {
    p.push(c);
  }
  return p;
};

export const useSetDrawingData = () => {
  const [data, setData] = useState<DrawingData>();
  const appState = useAppState();

  // GlobalStateから全都道県コードを取得
  const allPref = useMemo(() => appState.map((s) => s.id), []);

  // GlobalStateから描画対象の都道府県コードを取得
  const targetPref = useMemo(
    () => appState.reduce(targetPrefReducer, []),
    [appState]
  );

  useEffect(() => {
    generateDrawingData(allPref).then((d) => setData(d));
  }, [allPref]);
  return [data, targetPref] as const;
};
