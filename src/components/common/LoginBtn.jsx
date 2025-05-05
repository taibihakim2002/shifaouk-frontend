import { Button } from "flowbite-react";
import flowbit from "../../config/flowbit";
import useAuthModalStore from "../../store/authModalStore";

export default function LoginBtn() {
  const { openModal } = useAuthModalStore();
  return (
    <Button
      theme={flowbit.button}
      color="primary"
      pill
      size="md"
      onClick={() => openModal("login")}
    >
      تسجيل الدخول
    </Button>
  );
}
