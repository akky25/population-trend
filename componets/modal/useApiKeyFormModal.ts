import { useDispachApiKeyStateContext } from "libs/state/ApiKeyState";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export type Inputs = {
  apiKey: string;
};

export const useApiKeyFormModal = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const dispatch = useDispachApiKeyStateContext();

  const closeModal = () => {
    setIsOpen(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    dispatch({ type: "Set", apiKey: data.apiKey });
    closeModal();
  };

  useEffect(() => {
    setIsOpen(true);
  }, []);

  return { modalIsOpen, register, handleSubmit, errors, onSubmit } as const;
};
