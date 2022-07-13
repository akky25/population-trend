import chroma from "chroma-js";
import { useAppState, useDispachAppStateContext } from "libs/state/AppState";
import { useState } from "react";

const shuffle = ([...array]) => {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const generateInitColors = () => {
  const colors: string[] = [];
  for (let index = 0; index < 10; index++) {
    colors.push(chroma.hsl((360 / 10) * index, 0.9, 0.3).hex());
  }
  return shuffle(colors);
};

export const useChecklists = () => {
  const appState = useAppState();
  const dispach = useDispachAppStateContext();

  const [colors, setColors] = useState<string[]>(generateInitColors());

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked && appState.filter((v) => v.checked).length >= 10) {
      window.alert("選択できるの１０件までです");
      return;
    }

    if (e.target.checked) {
      const color = colors.pop();
      setColors(colors);
      dispach({ type: "Toggle", prefCode: e.target.id, color: color });
    } else {
      const target = appState.find((v) => v.id === e.target.id);
      colors.push(target?.color as string);
      setColors(colors);
      dispach({ type: "Toggle", prefCode: e.target.id, color: undefined });
    }
  };

  const onClear = () => {
    setColors(generateInitColors());
    dispach({ type: "Clear" });
  };

  const onAllCheck = () => {
    setColors([]);
    dispach({ type: "AllCheck", colors: colors });
  };

  const events = {
    onChange,
    onClear,
    onAllCheck,
  };

  return [appState, events] as const;
};
