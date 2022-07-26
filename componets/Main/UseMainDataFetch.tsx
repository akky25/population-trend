import { convertResponseToState } from "libs/convert";
import { useFetchPrefectures } from "libs/get-prefectures";
import { useApiKeyState } from "libs/state/ApiKeyState";
import { useDispachAppStateContext } from "libs/state/AppState";
import { useEffect } from "react";

export const useMainDataFetch = () => {
  const { apiKey } = useApiKeyState();
  const dispatchAppState = useDispachAppStateContext();
  const { data, error } = useFetchPrefectures();

  useEffect(() => {
    if (data) {
      const initAppstate = convertResponseToState(data);
      dispatchAppState({ type: "Init", prefectures: initAppstate });
    }
  }, [data, dispatchAppState]);

  return {
    isNoDrawing: !apiKey,
    isLoading: !data && !error,
    error,
  } as const;
};
