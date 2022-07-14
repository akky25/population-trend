import { env } from "config";
import { PopulationComposition } from "model/population-composition";
import { config } from "./api-header";

/**
 * 人口構成APIから指定された都道府県コードに基づくデータを取得する
 * @param prefCode 都道府県コード
 * @returns 取得データ
 */
const fetchPopulationCompositionPeryear = async (prefCode: string) => {
  const data = await fetch(
    `${env.api.url.populationCompositionPeryear}?cityCode=-&prefCode=${prefCode}`,
    config
  ).then((res) => res.json() as unknown as PopulationComposition);
  return {
    prefCode,
    data,
  };
};

/**
 * 都道府県コード配列に指定されたすべての都道府県について、人口構成APIのデータをFETCHする
 * @param prefCodes 都道府県コードの配列
 * @returns fetchPopulationCompositionPeryear()返却値の配列
 */
export const fetchAllPopulationCompositionPeryear = async (
  prefCodes: string[]
) => {
  const promises = prefCodes.map((code) =>
    fetchPopulationCompositionPeryear(code)
  );
  return await Promise.all(promises).then((v) => {
    return v;
  });
};
