import React, { useState, useEffect, useRef } from "react";
import { Avatar, Button, TextInput } from "flowbite-react";
import { Send, Bot, User, BrainCircuit } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import Header from "../components/common/Header"; // Import the main Header
import flowbit from "../config/flowbit";
import Logo from "../components/common/Logo";

// --- Helper Component for a single message ---
const ChatMessage = ({ sender, text, avatarSrc }) => {
  const isBot = sender === "bot";
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{
        opacity: { duration: 0.2 },
        layout: { type: "spring", bounce: 0.3, duration: 0.4 },
      }}
      className={`flex items-start gap-3 w-full ${
        isBot ? "justify-start" : "justify-end"
      }`}
    >
      {isBot && (
        <Avatar
          img={"/logo.png"}
          rounded
          size="sm"
          className="flex-shrink-0 border-2 border-primaryColor/50 p-0.5"
        />
      )}
      <div
        className={`rounded-xl px-4 py-2.5 max-w-[80%] break-words shadow-md ${
          isBot
            ? "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-bl-none"
            : "bg-primaryColor text-white dark:bg-primaryColor-600 rounded-br-none"
        }`}
      >
        <p
          className="text-sm leading-relaxed"
          dangerouslySetInnerHTML={{ __html: text }}
        ></p>
      </div>
      {!isBot && (
        <Avatar
          rounded
          size="sm"
          icon={User}
          className="flex-shrink-0 bg-gray-200 text-gray-600"
        />
      )}
    </motion.div>
  );
};

// --- Main ChatBot Page Component ---
export default function ChatBot() {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "مرحباً بك! أنا مساعدك الطبي الذكي. كيف يمكنني مساعدتك اليوم؟ (ملاحظة: هذه المعلومات ليست بديلاً عن استشارة طبية حقيقية).",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async () => {
    const trimmedMessage = newMessage.trim();
    if (!trimmedMessage) return;

    setMessages((prev) => [...prev, { sender: "user", text: trimmedMessage }]);
    setNewMessage("");
    setIsTyping(true);

    try {
      const botResponse = await getBotResponse(trimmedMessage);
      setMessages((prev) => [...prev, { sender: "bot", text: botResponse }]);
    } catch (error) {
      console.log(error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "حدث خطأ أثناء الاتصال بالخدمة. حاول لاحقًا." },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  //   const getBotResponse = async (userMessage) => {
  //     const response = await fetch("https://api.openai.com/v1/chat/completions", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${import.meta.env.VITE_OPENIA_KEY}`,
  //       },
  //       body: JSON.stringify({
  //         model: "gpt-3.5-turbo", // استخدم gpt-3.5-turbo لو أردت
  //         messages: [
  //           {
  //             role: "system",
  //             content:
  //               "أنت مساعد طبي ذكي تتحدث العربية. قدم نصائح طبية عامة وبلغة مبسطة، وتجنب تقديم تشخيص مباشر.",
  //           },
  //           { role: "user", content: userMessage },
  //         ],
  //         temperature: 0.6,
  //       }),
  //     });

  //     const data = await response.json();
  //     console.log(data);
  //     if (data?.choices?.[0]?.message?.content) {
  //       return data.choices[0].message.content.trim();
  //     }
  //     return "عذرًا، لم أتمكن من فهم سؤالك. حاول مرة أخرى.";
  //   };

  const VITE_OPENIA_KEY =
    "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";
  const getBotResponse = async (userMessage) => {
    // إعداد سجل المحادثة: system + كل الرسائل السابقة + الرسالة الحالية
    const chatHistory = [
      {
        role: "system",
        content: `أنت مساعد طبي ذكي يتحدث اللغة العربية الفصحى المبسطة. دورك هو توجيه المستخدم وتقديم نصائح طبية عامة، ولكن بدون تقديم أي تشخيص طبي مباشر أو قرارات علاجية.

قبل إعطاء أي توجيه، يجب عليك دائمًا طرح أسئلة على المستخدم لفهم حالته بشكل أفضل. استفسر عن الأعراض، المدة، الشدة، والمكان، وكذلك إذا كان يعاني من أمراض مزمنة أو يتناول أدوية.

كن مهذبًا، واضحًا، واهتم بصحة المستخدم، ولكن لا تتجاوز حدود الاستشارة العامة.

ابدأ دائمًا بسؤاله عن مشكلته، ثم تابع بأسئلة استكشافية مناسبة بناءً على ما يقوله.

عند تقديم الإجابة، استخدم تنسيق HTML منظمًا، مع اعتماد تنسيق بصري جميل باستخدام CSS مضمن (inline styles داخل عناصر HTML) لتحسين قابلية القراءة وجعل المحتوى أكثر احترافية.

احرص على استخدام عناصر مثل:
- <h3 style="direction: rtl; color: #2b6cb0; font-size: 20px; margin-bottom: 10px;"> للعناوين الرئيسية
- <p style="direction: rtl; font-size: 16px; color: #333; margin: 8px 0;"> للنصوص التوضيحية
- <ul style="direction: rtl; padding-right: 20px; color: #2d3748;"> و <li style="margin-bottom: 6px;"> للقوائم

استخدم ألوانًا هادئة (مثل الأزرق أو الأخضر)، حجم خط مريح، ومسافات مناسبة (margin/padding).

مهم جدًا: لا تُرسل أي أكواد JavaScript أو خارج HTML. أرسل فقط كود HTML منسقًا ومباشرًا يحتوي على المعلومات المطلوبة.`,
      },
      // تحويل سجل المحادثة الحالي إلى التنسيق المناسب
      ...messages.map((msg) => ({
        role: msg.sender === "bot" ? "assistant" : "user",
        content: msg.text,
      })),
      // الرسالة الجديدة من المستخدم
      {
        role: "user",
        content: userMessage,
      },
    ];

    // طلب من OpenRouter
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${VITE_OPENIA_KEY}`, // مفتاح OpenRouter
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-chat-v3-0324:free",
          messages: chatHistory,
          temperature: 0.6,
        }),
      }
    );

    const data = await response.json();
    console.log(data);

    if (data?.choices?.[0]?.message?.content) {
      return data.choices[0].message.content.trim();
    }
    return "عذرًا، لم أتمكن من فهم سؤالك. حاول مرة أخرى.";
  };

  const suggestedQuestions = [
    "ما هي أعراض الأنفلونزا؟",
    "كيف أتعامل مع الأرق؟",
    "ما هو أفضل وقت لقياس ضغط الدم؟",
  ];

  return (
    <div className="bg-slate-50 dark:bg-gray-900 h-full w-full flex flex-col">
      <main className="flex-grow flex flex-col items-center justify-center">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col  h-full min-h-[calc(100vh-200px)] w-full ">
          {/* Header */}
          <div className="bg-primaryColor/5 dark:bg-primaryColor-900/20 text-primaryColor-800 dark:text-primaryColor-200 py-4 px-5 flex items-center justify-between border-b border-primaryColor-200/50 dark:border-primaryColor-900/50">
            <div className="flex items-center gap-3">
              <BrainCircuit className="w-8 h-8" />
              <div>
                <h3 className="font-bold text-lg">المساعد الطبي الذكي</h3>
                <p className="text-xs text-primaryColor-600 dark:text-primaryColor-300">
                  مدعوم بالذكاء الاصطناعي
                </p>
              </div>
            </div>
          </div>

          {/* Conversation Area */}
          <div className="p-4 md:p-6 overflow-y-auto flex-grow space-y-4 custom-scrollbar bg-white dark:bg-gray-800">
            <AnimatePresence>
              {messages.map((msg, index) => (
                <ChatMessage
                  key={index}
                  sender={msg.sender}
                  text={msg.text}
                  avatarSrc="/bot-avatar.png"
                />
              ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3"
                >
                  <Avatar rounded size="sm" className="flex-shrink-0" />
                  <div className="flex items-center gap-1.5 bg-gray-200 dark:bg-gray-700 p-3 rounded-xl rounded-bl-none">
                    <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Questions Area */}
          {messages.length <= 1 && (
            <div className="p-4 pt-2 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
              <p className="text-xs text-center text-gray-500 dark:text-gray-400 mb-3">
                أو جرب أحد هذه الأسئلة المقترحة:
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {suggestedQuestions.map((q) => (
                  <Button
                    key={q}
                    color="light"
                    size="xs"
                    theme={flowbit.button}
                    className="dark:bg-gray-700"
                    onClick={() => setNewMessage(q)}
                  >
                    {q}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="bg-gray-50 dark:bg-gray-900/50 p-4 border-t dark:border-gray-700">
            <div className="flex items-center gap-3">
              <TextInput
                type="text"
                placeholder="اطرح سؤالك الطبي هنا..."
                theme={flowbit.textInput}
                color="primary"
                className="flex-grow"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                autoFocus
              />
              <Button
                color="primary"
                onClick={handleSendMessage}
                theme={flowbit.button}
                className="!p-3 shadow-md"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
            <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-3 px-2">
              تنبيه: هذا المساعد يقدم معلومات عامة ولا يغني عن استشارة الطبيب
              المختص.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
