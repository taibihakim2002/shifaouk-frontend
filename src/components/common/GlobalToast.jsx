import { Toast, ToastToggle } from "flowbite-react";
import { HiCheck, HiExclamation } from "react-icons/hi";
import useToastStore from "../../store/toastStore";

export default function GlobalToast() {
  const { toast, hideToast } = useToastStore();

  if (!toast.message) return null;

  return (
    <div className="fixed top-5 right-5 z-50">
      <Toast>
        <div
          className={`inline-flex h-8 w-8 items-center justify-center rounded-lg ${
            toast.type === "success"
              ? "bg-green-100 text-green-500"
              : "bg-red-100 text-red-500"
          }`}
        >
          {toast.type === "success" ? (
            <HiCheck className="h-5 w-5" />
          ) : (
            <HiExclamation className="h-5 w-5" />
          )}
        </div>
        <div className="ml-3 text-sm font-normal">{toast.message}</div>
        <ToastToggle onDismiss={hideToast} />
      </Toast>
    </div>
  );
}
