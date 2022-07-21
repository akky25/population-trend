import Modal from "react-modal";
import style from "./ApiKeyFormModal.module.css";
import { useApiKeyFormModal } from "./useApiKeyFormModal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const errorMessageMap = new Map([["required", "入力してください"]]);

Modal.setAppElement("#__next");

export const ApiKeyFormModal = () => {
  const { modalIsOpen, register, handleSubmit, errors, onSubmit } =
    useApiKeyFormModal();

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        contentLabel="Api Key Modal"
      >
        <h3 className={style.message}>APIキーを入力してください</h3>
        <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
          {errors.apiKey?.type && (
            <span className={style.error_message}>
              {errorMessageMap.get(errors.apiKey.type)}
            </span>
          )}
          <input
            className={style.input}
            {...register("apiKey", { required: true })}
          />
          <input className={style.input_button} type="submit" value="決定" />
        </form>
      </Modal>
    </div>
  );
};
