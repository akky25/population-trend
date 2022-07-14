import {
  createContext,
  Dispatch,
  ReactNode,
  Reducer,
  useContext,
  useReducer,
} from "react";

// 型定義
export type ApiKeyState = {
  apiKey: string;
};

export type Action = {
  type: "Set";
  apiKey: string;
};

const initialState: ApiKeyState = {
  apiKey: "",
};

// Contextの生成
const ApiKeyStateContext = createContext<ApiKeyState>(initialState);
const SetApiKeyStateContext = createContext<Dispatch<Action>>(
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  () => {}
);

// reducerの定義
const reducer: Reducer<ApiKeyState, Action> = (
  state: ApiKeyState,
  action: Action
) => {
  switch (action.type) {
    case "Set":
      // 対象の要素のcheckedを反転させる
      return {
        apiKey: action.apiKey,
      };
    default:
      return { ...state };
  }
};

export const useApiKeyState = () => useContext(ApiKeyStateContext);
export const useDispachApiKeyStateContext = () =>
  useContext(SetApiKeyStateContext);

export const ApiKeyStateProvider = (props: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <ApiKeyStateContext.Provider value={state}>
      <SetApiKeyStateContext.Provider value={dispatch}>
        {props.children}
      </SetApiKeyStateContext.Provider>
    </ApiKeyStateContext.Provider>
  );
};
