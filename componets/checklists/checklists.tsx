import styles from "./checklists.module.css";
import { useChecklists } from "./use-checklists";
import { PrefecturesResponse } from "model/prefectures";
import { Checkbox } from "componets/checkbox/checkbox";

export const Checklists = ({ data }: { data: PrefecturesResponse }) => {
  const [checklists, onChange] = useChecklists(data);

  return (
    <div className={styles.checklists}>
      {checklists.map((c) => {
        return <Checkbox key={c.id} onChange={onChange} {...c}></Checkbox>;
      })}
    </div>
  );
};
