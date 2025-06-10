import { useState } from "react";
import GlobalToast from "./components/common/GlobalToast";
import AppRoutes from "./routes/AppRoutes";
import { Button, Modal, ModalBody } from "flowbite-react";
import { MessageCircle } from "lucide-react";
import ChatBot from "./pages/ChatBot";
import flowbit from "./config/flowbit";

function App() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div dir="rtl" className="relative min-h-screen">
      <GlobalToast />
      <AppRoutes />

      {/* زر عائم في الأسفل */}
      <button
        onClick={() => setOpenModal(true)}
        className="fixed bottom-5 right-5 bg-primaryColor hover:bg-primaryColor-600 text-white p-3 rounded-full shadow-lg transition-all z-50"
        title="المساعد الذكي"
      >
        <MessageCircle size={22} />
      </button>

      {/* نافذة البوت */}
      <Modal
        show={openModal}
        onClose={() => setOpenModal(false)}
        size="5xl"
        dir="rtl"
        popup
        theme={flowbit.botDialog}
      >
        <ModalBody className="">
          <ChatBot />
        </ModalBody>
      </Modal>
    </div>
  );
}

export default App;
