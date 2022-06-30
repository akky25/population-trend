import styles from "./checkbox.module.css";

type Props = {
  id: string;
  checked: boolean;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Checkbox = ({ id, checked, label, onChange }: Props) => {
  return (
    <label className={styles.checkbox}>
      <input
        id={id}
        type="checkbox"
        name="inputNames"
        checked={checked}
        onChange={onChange}
        value={label}
      />
      {label}
    </label>
  );
};
