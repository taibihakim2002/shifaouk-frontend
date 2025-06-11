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

      {!openModal && (
        <button
          onClick={() => setOpenModal(true)}
          className="fixed bottom-5 right-5 bg-primaryColor hover:bg-primaryColor-600 text-white p-3 rounded-full shadow-lg transition-all z-50"
          title="المساعد الذكي"
        >
          <MessageCircle size={22} />
        </button>
      )}

      {/* نافذة البوت */}
      <Modal
        show={openModal}
        onClose={() => setOpenModal(false)}
        size="4xl"
        dir="rtl"
        popup
        theme={flowbit.botDialog}
      >
        <ModalBody className="relative p-0">
          {/* زر إغلاق في الأعلى */}
          <button
            onClick={() => setOpenModal(false)}
            className="absolute top-3 left-3 bg-gray-200 hover:bg-gray-300 text-gray-600 rounded-full p-1.5 shadow z-50"
            title="إغلاق"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* مكون البوت */}
          <ChatBot />
        </ModalBody>
      </Modal>
    </div>
  );
}

export default App;
