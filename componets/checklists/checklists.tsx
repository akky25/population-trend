import styles from "./checklists.module.css";
import { useChecklists } from "./use-checklists";
import { Checkbox } from "componets/checkbox/checkbox";

export const Checklists = () => {
  const [checklists, onChange] = useChecklists();

  return (
    <>
      <div className={styles.title}>都道府県</div>
      <div className={styles.checklists}>
        {checklists.map((c) => {
          return <Checkbox key={c.id} onChange={onChange} {...c}></Checkbox>;
        })}
      </div>
    </>
  );
};
