import { env } from "config";
import { PrefecturesResponse } from "model/prefectures";
import useSWR from "swr";
import { config } from "./api-header";
import { useApiKeyState } from "./state/ApiKeyState";

export const getPrefectures = async (url: string) => {
  return await fetch(url, config).then(
    (response) => response.json() as unknown as PrefecturesResponse
  );
};

export const useFetchPrefectures = () => {
  const { apiKey } = useApiKeyState();
  return useSWR<PrefecturesResponse, Error>(
    apiKey ? env.api.url.prefectures : null,
    getPrefectures,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
};
