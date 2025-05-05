import {
  Button,
  Checkbox,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  TextInput,
} from "flowbite-react";

import flowbit from "../../config/flowbit";
import { IoClose } from "react-icons/io5";
import Login from "../auth/Login";
import Register from "../auth/Register";
import useAuthModalStore from "../../store/authModalStore";

export default function AuthDialog() {
  const { isOpen, modalType, closeModal } = useAuthModalStore();

  return (
    <Modal
      show={isOpen}
      theme={flowbit.authDialog}
      onClose={() => closeModal()}
      size={"4xl"}
    >
      <ModalBody className="p-0">
        <div className="w-full h-full relative">
          <button
            className="text-sm p-0 m-0 outline-none border-none absolute top-2 left-2 z-50"
            onClick={() => closeModal()}
          >
            <IoClose size={20} />
          </button>
          <div className="overflow-hidden">
            {modalType === "login" && <Login />}
            {modalType === "register" && <Register />}
            {/* {dialogType === "registerSuccess" && <RegisterSuccess />} */}
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
}
