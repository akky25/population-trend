import { PrefecturesResponse } from "model/prefectures";
import { AppState } from "./state/AppState";

/**
 * APIレスポンスの都道府県からチェックボックスのステートを生成
 * @param data APIレスポンスの都道府県
 * @returns チェックボックスのステート
 */
export const convertResponseToState = (data: PrefecturesResponse): AppState => {
  return data.result.map((d, i) => {
    return {
      id: d.prefCode.toString(),
      checked: false,
      label: d.prefName,
      color: undefined,
    };
  });
};

/**
 * APIレスポンスから全都道府県コードをstringに変換し配列で返却
 * @param data APIレスポンスの都道府県
 * @returns 全都道県コード(stringに変換)
 */
export const getAllPrefCode = (data: PrefecturesResponse) => {
  return data.result.map((r) => r.prefCode.toString());
};
