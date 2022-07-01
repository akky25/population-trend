import { useState } from "react";
import { PrefecturesResponse } from "model/prefectures";

type Checkbox = {
  id: string;
  checked: boolean;
  label: string;
};

/**
 * APIレスポンスの都道府県からチェックボックスのステートを生成
 * @param data APIレスポンスの都道府県
 * @returns チェックボックスのステート
 */
const convert = (data: PrefecturesResponse) => {
  return data.result.map((d) => {
    return {
      id: d.prefCode.toString(),
      checked: false,
      label: d.prefName,
    };
  });
};

export const useChecklists = (data: PrefecturesResponse) => {
  const [checklists, setChecklists] = useState<Checkbox[]>(convert(data));

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecklists(
      checklists.map((c) =>
        c.id === e.target.id ? { ...c, checked: !c.checked } : c
      )
    );
  };

  return [checklists, onChange] as const;
};
