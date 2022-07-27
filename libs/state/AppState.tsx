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
  color?: string;
}[];

export type Action = {
  type: "Init" | "Toggle" | "Clear" | "AllCheck";
  prefCode?: string;
  color?: string;
  colors?: string[];
  prefectures?: AppState;
};

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
  const tmpColors = action.colors ? [...action.colors] : [];
  switch (action.type) {
    case "Init":
      return [...(action.prefectures as AppState)];
    case "Toggle":
      // 対象の要素のcheckedを反転させる
      return state.map((c) =>
        c.id === action.prefCode
          ? { ...c, checked: !c.checked, color: action.color }
          : c
      );
    case "Clear":
      // 全てチェックをfalse
      return state.map((c) => {
        return { ...c, checked: false };
      });
    case "AllCheck":
      // 10件チェックをtrue
      // eslint-disable-next-line no-case-declarations
      const targetArr = generateTargetId(state);
      return state.map((c) => {
        if (targetArr.findIndex((v) => v === c.id) !== -1) {
          return {
            ...c,
            checked: true,
            color: tmpColors.pop(),
          };
        } else {
          return {
            ...c,
          };
        }
      });
    default:
      return [...state];
  }
};

export const useAppState = () => useContext(AppStateContext);
export const useDispachAppStateContext = () => useContext(SetAppStateContext);

export const AppStateProvider = (props: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, []);
  return (
    <AppStateContext.Provider value={state}>
      <SetAppStateContext.Provider value={dispatch}>
        {props.children}
      </SetAppStateContext.Provider>
    </AppStateContext.Provider>
  );
};

/**
 * チェックのついていないものをランダムに選択
 * 選択件数は10件になるよう選択
 * @param appState
 * @returns チェックをつける都道府県のidを格納した配列
 */
const generateTargetId = (appState: AppState) => {
  const noCheckedArr = appState.filter((s) => !s.checked);
  const checkedNum = 10 - (47 - noCheckedArr.length);
  const targetIdArr: string[] = [];
  for (let index = 0; index < checkedNum; index++) {
    const randomIndex = Math.floor(Math.random() * noCheckedArr.length);
    targetIdArr.push(noCheckedArr.splice(randomIndex, 1)[0].id);
  }
  return targetIdArr;
};
