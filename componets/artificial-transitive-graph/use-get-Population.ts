import { getAllPrefCode } from "libs/convert";
import { fetchAllPopulationCompositionPeryear } from "libs/get-population-composition";
import { useAppState } from "libs/state/AppState";
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

export const useSetDrawingData = () => {
  const [data, setData] = useState<DrawingData>();
  const appState = useAppState();

  const allPrefCode = getAllPrefCode(appState);

  const hasDrawingTarget = useMemo(() => {
    return appState.findIndex((s) => s.checked) !== -1;
  }, [appState]);

  // 人口データの取得
  useEffect(() => {
    generateDrawingData(allPrefCode).then((d) => setData(d));
  }, [allPrefCode]);

  return { data, appState, hasDrawingTarget } as const;
};
