import { useAppState, useDispachAppStateContext } from "libs/state/AppState";

export const useChecklists = () => {
  const checklists = useAppState();
  const dispach = useDispachAppStateContext();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispach({ type: "Toggle", prefCode: e.target.id });
  };

  return [checklists, onChange] as const;
};
