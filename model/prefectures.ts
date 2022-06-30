export type PrefecturesResponse = {
  message: null;
  result: Prefectures[];
};

type Prefectures = {
  prefCode: number;
  prefName: string;
};
