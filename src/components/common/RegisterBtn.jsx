import { Button } from "flowbite-react";
import flowbit from "../../config/flowbit";
import useAuthModalStore from "../../store/authModalStore";

export default function RegisterBtn() {
  const { openModal } = useAuthModalStore();
  return (
    <Button
      theme={flowbit.button}
      color="primary"
      pill
      outline
      size="md"
      onClick={() => openModal("register")}
    >
      انشاء حساب
    </Button>
  );
}
