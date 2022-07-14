import { env } from "config";
import { PrefecturesResponse } from "model/prefectures";
import { config } from "./api-header";

export const getPrefectures = async () => {
  return await fetch(env.api.url.prefectures, config).then(
    (response) => response.json() as unknown as PrefecturesResponse
  );
};
