import React, { useState, useEffect, useRef } from "react";
import {
  Avatar,
  Button,
  TextInput,
  Badge,
  Tooltip,
  Spinner,
} from "flowbite-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Search,
  Paperclip,
  Send,
  Smile,
  ArrowRight,
  Video,
  Info,
  User,
  BrainCircuit,
  MessageSquare,
  AlertCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import useApiRequest from "../../../hooks/useApiRequest";
import globalApi from "../../../utils/globalApi";
import useToastStore from "../../../store/toastStore";
import parseImgUrl from "../../../utils/parseImgUrl";
import formatDateTime from "../../../utils/formatDateTime";
import useAuthStore from "../../../store/authStore";
import flowbit from "../../../config/flowbit";

// --- Helper Components ---
const ConversationItem = ({ conversation, isActive, onClick }) => {
  const { otherUser, lastMessage } = conversation;
  const { user: currentUser } = useAuthStore.getState();

  if (!otherUser) return null;

  const lastMessageSender =
    lastMessage?.sender === currentUser._id ? "أنت: " : "";
  const isUnread =
    !lastMessage?.isReadByUser && lastMessage?.sender !== currentUser._id;

  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors duration-200 ${
        isActive
          ? "bg-primaryColor/10 dark:bg-primaryColor/20"
          : "hover:bg-gray-100 dark:hover:bg-gray-700"
      }`}
    >
      <div className="relative flex-shrink-0">
        <Avatar
          img={parseImgUrl(otherUser.profileImage)}
          rounded
          size="md"
          bordered
          color={isActive ? "primary" : "gray"}
        />

        {isUnread && (
          <span className="absolute top-0 right-0 block h-3 w-3 rounded-full bg-primaryColor ring-2 ring-white dark:ring-gray-800" />
        )}
      </div>
      <div className="flex-1 overflow-hidden">
        <div className="flex justify-between items-center">
          <h4 className="text-sm font-bold text-gray-800 dark:text-white truncate">
            {otherUser.fullName.first} {otherUser.fullName.second} 
          </h4>

          <p className="text-xs text-gray-400 dark:text-gray-500 flex-shrink-0">
            {formatDateTime(lastMessage?.createdAt, "timeAgo")}     
          </p>
        </div>

        <p
          className={`text-xs truncate ${
            isUnread
              ? "font-bold text-gray-700 dark:text-gray-200"
              : "text-gray-500 dark:text-gray-400"
          }`}
        >
          <span className="font-semibold">{lastMessageSender}</span> 
          {lastMessage?.text}
        </p>
      </div>
         {" "}
    </div>
  );
};

const ChatMessageBubble = ({ message, senderAvatar, isUser, userAvatar }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 15, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.3, ease: "easeOut" }}
    className={`flex items-end gap-2.5 w-full ${
      isUser ? "justify-end" : "justify-start"
    }`}
  >
    {!isUser && (
      <Avatar
        img={parseImgUrl(senderAvatar)}
        rounded
        size="xs"
        className="flex-shrink-0"
      />
    )}

    <div
      className={`p-3 px-4 max-w-[70%] sm:max-w-[60%] shadow-md ${
        isUser
          ? "bg-primaryColor text-white rounded-t-xl rounded-br-xl"
          : "bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-t-xl rounded-bl-xl"
      }`}
    >
      <p className="text-sm leading-relaxed whitespace-pre-wrap">
        {message.text}
      </p>
    </div>

    {isUser && (
      <Avatar
        img={parseImgUrl(userAvatar)}
        rounded
        size="xs"
        className="flex-shrink-0"
      />
    )}
  </motion.div>
);

const SidebarSkeleton = () => (
  <div className="p-2 space-y-1">
    {[...Array(8)].map((_, i) => (
      <div
        key={i}
        className="flex items-center gap-3 p-3 rounded-xl animate-pulse"
      >
        <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>

          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
        </div>
      </div>
    ))}
  </div>
);

const MessagesSkeleton = () => (
  <div className="p-4 md:p-6 space-y-4 animate-pulse">
    <div className="flex justify-start gap-3">
      <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700"></div> 
      <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-xl w-1/2"></div>
    </div>
    <div className="flex justify-end gap-3">
      <div className="h-16 bg-primaryColor-100 dark:bg-primaryColor-900/50 rounded-xl w-3/5"></div>
      <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700"></div> 
    </div>

    <div className="flex justify-start gap-3">
      <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700"></div> 
      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-xl w-1/3"></div> 
    </div>
  </div>
);

// --- Main Chat Component ---
export default function PatientChat() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { showToast } = useToastStore();

  const [conversations, setConversations] = useState([]);
  const [selectedConversationId, setSelectedConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  const {
    loading: conversationsLoading,
    data: conversationsData,
    error: conversationsError,
    request: loadConversations,
  } = useApiRequest();
  const {
    loading: messagesLoading,
    data: messagesData,
    error: messagesError,
    request: loadMessages,
  } = useApiRequest();
  const { loading: sendingMessage, request: sendMessageRequest } =
    useApiRequest();
  // <<< بداية الحل: خطاف API إضافي للتحديث الدوري بدون إظهار التحميل >>>
  const { data: polledMessagesData, request: pollMessages } = useApiRequest();
  // <<< نهاية الحل >>>

  useEffect(() => {
    if (user?._id) {
      loadConversations(globalApi.getMyConversations);
    }
  }, [user]);

  useEffect(() => {
    if (conversationsData?.data) {
      const processedConversations = conversationsData.data
        .map((conv) => {
          if (
            !conv.consultation ||
            !conv.consultation.patient ||
            !conv.consultation.doctor
          ) {
            return null;
          }
          const otherUser =
            user._id === conv.consultation.patient._id
              ? conv.consultation.doctor
              : conv.consultation.patient;

          return { ...conv, otherUser };
        })
        .filter(Boolean);

      setConversations(processedConversations);

      if (!selectedConversationId && window.innerWidth >= 768) {
        setSelectedConversationId(processedConversations[0]?._id);
      }
    }
  }, [conversationsData, user, selectedConversationId]);

  useEffect(() => {
    if (selectedConversationId) {
      setMessages([]);
      loadMessages(() =>
        globalApi.getMessagesByConversationId(selectedConversationId)
      );
    }
  }, [selectedConversationId]);

  // <<< بداية الحل: إعداد التحديث الدوري للرسائل >>>
  useEffect(() => {
    if (!selectedConversationId) return;

    const intervalId = setInterval(() => {
      pollMessages(() =>
        globalApi.getMessagesByConversationId(selectedConversationId)
      );
    }, 5000);

    return () => clearInterval(intervalId);
  }, [selectedConversationId, pollMessages]);
  // <<< نهاية الحل >>>

  useEffect(() => {
    if (messagesData?.data) {
      setMessages(messagesData.data);
    }
  }, [messagesData]);

  // <<< بداية الحل: تحديث الرسائل من البيانات الدورية >>>
  useEffect(() => {
    if (polledMessagesData?.data) {
      setMessages(polledMessagesData.data);
    }
  }, [polledMessagesData]);
  // <<< نهاية الحل >>>

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const selectedConversation = conversations.find(
    (c) => c._id === selectedConversationId
  );
  const isChatExpired =
    selectedConversation &&
    new Date(selectedConversation.expiresAt) < new Date();

  const handleSendMessage = async () => {
    const trimmedMessage = newMessage.trim();
    if (!trimmedMessage || isChatExpired || sendingMessage) return;

    const messagePayload = {
      consultationId: selectedConversation.consultation._id,
      text: trimmedMessage,
    };

    const tempId = Date.now().toString();
    const optimisticMessage = {
      _id: tempId,
      sender: user._id,
      text: trimmedMessage,
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, optimisticMessage]);
    setNewMessage("");

    const {
      success,
      data: responseData,
      error,
    } = await sendMessageRequest(() => globalApi.sendMessage(messagePayload));

    if (success && responseData?.data) {
      // setMessages((prev) =>
      //   prev.map((msg) => (msg._id === tempId ? responseData.data : msg))
      // );
    } else {
      showToast("error", error || "فشل في إرسال الرسالة");
      setMessages((prev) => prev.filter((msg) => msg._id !== tempId));
    }
  };

  return (
    <div
      className="h-[calc(100vh-160px)] w-full flex bg-slate-50 dark:bg-gray-900 relative overflow-hidden"
      dir="rtl"
    >
      <aside
        className={`
w-full md:w-2/5 lg:w-1/3 xl:w-1/4 h-full bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 
flex flex-col absolute md:relative top-0 right-0 z-20 transition-transform duration-300 ease-in-out
 ${
   selectedConversationId && user
     ? "-translate-x-full md:translate-x-0"
     : "translate-x-0"
 }
 `}
      >
        <div className="p-4 border-b dark:border-gray-700 flex-shrink-0">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            المحادثات
          </h2>
        </div>

        <div className="flex-grow overflow-y-auto p-2 space-y-1 custom-scrollbar">
          {conversationsLoading ? (
            <SidebarSkeleton />
          ) : (
            conversations.map((conv) => (
              <ConversationItem
                key={conv._id}
                conversation={conv}
                isActive={selectedConversationId === conv._id}
                onClick={() => setSelectedConversationId(conv._id)}
              />
            ))
          )}
        </div>
      </aside>
      <section
        className={`
 w-full md:w-3/5 lg:w-2/3 xl:w-3/4 flex flex-col bg-gray-100 dark:bg-gray-900 
 absolute md:relative top-0 right-0 h-full z-10 transition-transform duration-300 ease-in-out
 ${
   selectedConversationId && user
     ? "translate-x-0"
     : "-translate-x-full md:translate-x-0"
 }
`}
      >
        {" "}
        {selectedConversation && selectedConversation.otherUser ? (
          <>
            <header className="flex items-center justify-between p-3 border-b bg-white dark:bg-gray-800 dark:border-gray-700 shadow-sm flex-shrink-0">
              <div className="flex items-center gap-3 overflow-hidden">
                <Button
                  color="gray"
                  size="xs"
                  className="md:hidden !p-2 flex-shrink-0"
                  onClick={() => setSelectedConversationId(null)}
                >
                  <ArrowRight size={18} />
                </Button>
                <Avatar
                  img={parseImgUrl(selectedConversation.otherUser.profileImage)}
                  rounded
                  bordered
                  size="md"
                />
                <div className="truncate">
                  <h4 className="font-bold text-md text-gray-800 dark:text-white truncate">
                    {selectedConversation.otherUser.fullName.first}
                    {selectedConversation.otherUser.fullName.second}
                  </h4>

                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {
                      selectedConversation.otherUser.doctorProfile
                        ?.specialization
                    }
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <Badge
                  color={isChatExpired ? "failure" : "success"}
                  theme={flowbit.badge}
                >
                  {isChatExpired ? "الاستشارة منتهية" : "الاستشارة نشطة"}
                </Badge>
                <Tooltip content="عرض تفاصيل الاستشارة">
                  <Button
                    as={Link}
                    to={`/dashboard/appointments/${selectedConversation.consultation._id}`}
                    color="light"
                    size="xs"
                    className="!p-2"
                  >
                    <Info size={18} />
                  </Button>
                </Tooltip>
              </div>
            </header>

            <main className="flex-grow p-4 md:p-6 overflow-y-auto space-y-4 custom-scrollbar">
              {messagesLoading ? (
                <MessagesSkeleton />
              ) : (
                <AnimatePresence>
                  {messages.map((msg) => (
                    <ChatMessageBubble
                      key={msg._id}
                      message={msg}
                      senderAvatar={selectedConversation.otherUser.profileImage}
                      isUser={msg.sender === user._id}
                      userAvatar={user.profileImage}
                    />
                  ))}
                </AnimatePresence>
              )}
              <div ref={messagesEndRef}></div>
            </main>

            <footer className="p-3 bg-white dark:bg-gray-800 border-t dark:border-gray-700 relative flex-shrink-0">
              {isChatExpired && (
                <div className="absolute inset-0 bg-gray-200/70 dark:bg-gray-900/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center text-center p-4">
                  <AlertCircle className="w-8 h-8 text-gray-500 dark:text-gray-400 mb-2" />
                  <p className="font-semibold text-gray-700 dark:text-gray-200">
                    انتهت فترة هذه الاستشارة
                  </p>

                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    لا يمكنك إرسال رسائل جديدة.
                  </p>
                </div>
              )}

              <div className="flex items-center gap-2">
                <TextInput
                  type="text"
                  placeholder="اكتب رسالتك هنا..."
                  className="flex-grow"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  autoFocus
                  disabled={sendingMessage}
                />

                <Button
                  color="primary"
                  onClick={handleSendMessage}
                  theme={flowbit.button}
                  className="!p-3 shadow-md"
                  isProcessing={sendingMessage}
                  disabled={sendingMessage}
                >
                  {sendingMessage ? (
                    <Spinner size="sm" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </Button>
              </div>
            </footer>
          </>
        ) : (
          <div className="hidden md:flex flex-col items-center justify-center h-full text-center text-gray-500 dark:text-gray-400">
            <MessageSquare size={64} className="mb-4 opacity-50" /> 
            <h3 className="text-xl font-semibold">اختر محادثة</h3>   
            <p>اختر محادثة من القائمة على اليمين لبدء الدردشة.</p>
          </div>
        )}
             {" "}
      </section>
         {" "}
    </div>
  );
}
