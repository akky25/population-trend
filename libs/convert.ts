import { PrefecturesResponse } from "model/prefectures";

/**
 * APIレスポンスの都道府県からチェックボックスのステートを生成
 * @param data APIレスポンスの都道府県
 * @returns チェックボックスのステート
 */
export const convertResponseToState = (data: PrefecturesResponse) => {
  return data.result.map((d) => {
    return {
      id: d.prefCode.toString(),
      checked: false,
      label: d.prefName,
    };
  });
};
