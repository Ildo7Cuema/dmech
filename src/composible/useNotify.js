import { useQuasar, Notify } from "quasar";

export default function usenotification() {
  const notifySuccess = async (message) => {
    Notify.create({
      position: "top-right",
      type: "positive",
      message: message || "Tudo certo",
    });
  };

  const notifyError = async (message) => {
    Notify.create({
      position: "top-right",
      type: "negative",
      message: message || "Falha na execução",
    });
  };

  return {
    notifySuccess,
    notifyError,
  };
}
