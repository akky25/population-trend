import styles from "./checklists.module.css";
import { useChecklists } from "./use-checklists";
import { Checkbox } from "componets/checkbox/checkbox";

export const Checklists = () => {
  const [checklists, events] = useChecklists();

  return (
    <>
      <div className={styles.title}>都道府県</div>
      <div className={styles.checklists}>
        {checklists.map((c) => {
          return (
            <Checkbox key={c.id} onChange={events.onChange} {...c}></Checkbox>
          );
        })}
      </div>
      <div>
        <button className={styles.button} onClick={events.onClear}>
          クリア
        </button>
        <button className={styles.button} onClick={events.onAllCheck}>
          10件ランダムに選択
        </button>
      </div>
    </>
  );
};
