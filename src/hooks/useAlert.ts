import { useState } from "react";

export const useAlert = () => {
  const [alert, setAlert] = useState({
    show: false,
    text: "",
    type: "danger",
  });

  const showAlert = ({
    show,
    text,
    type = "danger",
  }: {
    show: boolean;
    text: string;
    type: string;
  }) => setAlert({ show: true, text, type });

  const hideAlert = () => setAlert({ ...alert, show: false });

  return { alert, showAlert, hideAlert };
};
