import {
  createContext,
  Dispatch,
  ReactNode,
  Reducer,
  useContext,
  useReducer,
} from "react";

// 型定義
export type AppState = {
  id: string;
  checked: boolean;
  label: string;
}[];
export type Action = { type: "Toggle"; prefCode: string };

// Contextの生成
const AppStateContext = createContext<AppState>([]);
const SetAppStateContext = createContext<Dispatch<Action>>(
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  () => {}
);

// reducerの定義
const reducer: Reducer<AppState, Action> = (
  state: AppState,
  action: Action
) => {
  switch (action.type) {
    case "Toggle":
      // 対象の要素のcheckedを反転させる
      return state.map((c) =>
        c.id === action.prefCode ? { ...c, checked: !c.checked } : c
      );
    default:
      return [...state];
  }
};

export const useAppState = () => useContext(AppStateContext);
export const useDispachAppStateContext = () => useContext(SetAppStateContext);

export const AppStateProvider = (props: {
  initialState: AppState;
  children: ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, props.initialState);
  return (
    <AppStateContext.Provider value={state}>
      <SetAppStateContext.Provider value={dispatch}>
        {props.children}
      </SetAppStateContext.Provider>
    </AppStateContext.Provider>
  );
};
