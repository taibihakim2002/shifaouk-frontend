import { Modal, ModalBody } from "flowbite-react";
import { IoClose } from "react-icons/io5";
import { motion } from "framer-motion";

import Login from "../auth/Login";
import Register from "../auth/Register";
import RegisterSuccess from "../auth/RegisterSuccess";
import useAuthModalStore from "../../store/authModalStore";
import flowbit from "../../config/flowbit";

export default function AuthDialog() {
  const { isOpen, modalType, closeModal } = useAuthModalStore();

  return (
    <Modal
      show={isOpen}
      onClose={closeModal}
      size="5xl"
      theme={flowbit.authDialog}
    >
      <ModalBody className="p-0">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.3 }}
          className="w-full h-full relative"
        >
          <button
            className="text-sm p-0 m-0 outline-none border-none absolute top-2 left-2 z-50"
            onClick={closeModal}
          >
            <IoClose size={20} />
          </button>

          <div className="overflow-hidden">
            {modalType === "login" && <Login />}
            {modalType === "register" && <Register />}
            {modalType === "registerSuccess" && <RegisterSuccess />}
          </div>
        </motion.div>
      </ModalBody>
    </Modal>
  );
}
