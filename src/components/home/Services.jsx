// import {
//   CalendarCheck,
//   ClipboardList,
//   MessageSquareMore,
//   Stethoscope,
// } from "lucide-react";
// import SectionHeader from "../common/SectionHeader";

// const services = [
//   {
//     icon: Stethoscope,
//     title: "استشارة عن بعد",
//     description: "تحدث مع طبيبك من أي مكان عبر مكالمة فيديو أو محادثة فورية.",
//     isSpecific: true,
//   },
//   {
//     icon: CalendarCheck,
//     title: "حجز موعد في افضل العيادات",
//     description: "احجز موعدك بسهولة مع الطبيب المناسب في الوقت الذي يناسبك.",
//     isSpecific: false,
//   },
//   {
//     icon: MessageSquareMore,
//     title: "شات ذكي",
//     description:
//       "ارفع تقرير فحص الدم الخاص بك، ودع البوت الذكي يقرأ النتائج ويشرح لك بلغة بسيطة.",
//     isSpecific: false,
//   },
//   {
//     icon: ClipboardList,
//     title: "متابعة الحالات الطبية",
//     description: "راجع تقاريرك الطبية وسجل الاستشارات السابقة في مكان واحد.",
//     isSpecific: false,
//   },
// ];

// export default function Services() {
//   return (
//     <div className="py-16 bg-primary-50">
//       <SectionHeader sectionTitle="خدماتنا" icon={Stethoscope} />
//       <div className="container grid grid-cols-1 md:grid-cols-2 gap-7 lg:px-32  rounded-xl">
//         {services.map((ele) => {
//           const Icon = ele.icon;
//           return (
//             <div
//               className={`w-full h-72 justify-center flex items-start flex-col gap-7 rounded-lg shadow-sm hover:border hover:border-primaryColor hover:-translate-y-3 transition ${
//                 ele.isSpecific
//                   ? "bg-primaryColor text-white shadow-lg"
//                   : "bg-white text-darkColor"
//               }   p-10`}
//             >
//               <div
//                 className={`p-5 rounded-full flex items-center justify-center text-primaryColor ${
//                   ele.isSpecific ? "bg-white " : "border border-primaryColor"
//                 } `}
//               >
//                 <Icon size={30} />
//               </div>
//               <p className="text-lg font-bold">{ele.title}</p>
//               <p
//                 className={`text-sm ${
//                   ele.isSpecific ? "text-gray-200" : "text-gray-400"
//                 }`}
//               >
//                 {ele.description}
//               </p>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

import {
  CalendarCheck,
  ClipboardList,
  MessageSquareMore,
  Stethoscope,
  Sparkles, // أيقونة إضافية للتمييز
} from "lucide-react";
import SectionHeader from "../common/SectionHeader"; // نفترض أن هذا المكون موجود ومصمم بشكل جيد
import { motion } from "framer-motion";

const services = [
  {
    icon: Stethoscope,
    title: "استشارة عن بعد",
    description: "تحدث مع طبيبك من أي مكان عبر مكالمة فيديو أو محادثة فورية.",
    isSpecific: true,
  },
  {
    icon: CalendarCheck,
    title: "حجز موعد في افضل العيادات",
    description: "احجز موعدك بسهولة مع الطبيب المناسب في الوقت الذي يناسبك.",
    isSpecific: false,
  },
  {
    icon: MessageSquareMore,
    title: "شات ذكي",
    description:
      "ارفع تقرير فحص الدم الخاص بك، ودع البوت الذكي يقرأ النتائج ويشرح لك بلغة بسيطة.",
    isSpecific: false,
  },
  {
    icon: ClipboardList,
    title: "متابعة الحالات الطبية",
    description: "راجع تقاريرك الطبية وسجل الاستشارات السابقة في مكان واحد.",
    isSpecific: false,
  },
];

// إعدادات Framer Motion للتحريك
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // زيادة التأخير قليلاً لظهور أكثر سلاسة
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { scale: 0.9, opacity: 0, y: 50 },
  visible: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 12,
    },
  },
};

export default function Services() {
  return (
    <div className="py-20 md:py-28 bg-primary-50 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4">
        <SectionHeader sectionTitle="خدماتنا المصممة لراحتك" icon={Sparkles} />

        <motion.div
          className="lg:w-[90%] m-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            const isHighlighted = service.isSpecific;

            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`rounded-2xl overflow-hidden transition-all duration-350 ease-in-out group relative flex flex-col items-center text-center
                  ${
                    isHighlighted
                      ? "bg-primaryColor shadow-2xl shadow-primaryColor/40 dark:shadow-primaryColor/30"
                      : "bg-white dark:bg-slate-800 shadow-xl hover:shadow-2xl dark:shadow-slate-700/50"
                  }
                  p-8 md:p-10 min-h-[300px] hover:-translate-y-2.5`}
              >
                {/* شريط علوي زخرفي للبطاقة المميزة */}
                {isHighlighted && (
                  <div className="absolute top-0 left-0 right-0 h-2.5 bg-white/20 animate-pulse"></div>
                )}

                {/* أيقونة الخدمة */}
                <div
                  className={`mb-6 mt-4 p-4 md:p-5 rounded-full transition-all duration-300
                    ${
                      isHighlighted
                        ? "bg-white/25 group-hover:bg-white/30 transform group-hover:scale-110"
                        : "bg-primaryColor/10 dark:bg-primaryColor/20 text-primaryColor group-hover:bg-primaryColor group-hover:text-white"
                    }
                  `}
                >
                  <Icon
                    size={34} // حجم أيقونة أكبر
                    strokeWidth={1.75}
                    className={isHighlighted ? "text-white" : ""}
                  />
                </div>

                {/* عنوان الخدمة */}
                <h3
                  className={`text-xl font-bold mb-3 md:mb-4
                    ${
                      isHighlighted
                        ? "text-white"
                        : "text-slate-800 dark:text-white"
                    }
                  `}
                >
                  {service.title}
                </h3>

                {/* وصف الخدمة */}
                <p
                  className={`text-base leading-relaxed flex-grow
                    ${
                      isHighlighted
                        ? "text-indigo-100 dark:text-indigo-200 opacity-90"
                        : "text-slate-600 dark:text-slate-400"
                    }
                  `}
                >
                  {service.description}
                </p>

                {/* نقط زخرفية (اختياري) */}
                {!isHighlighted && (
                  <div className="absolute bottom-5 right-5 flex gap-1.5 opacity-20 group-hover:opacity-50 transition-opacity duration-300">
                    <span className="w-2 h-2 bg-primaryColor rounded-full"></span>
                    <span className="w-2 h-2 bg-primaryColor rounded-full animation-delay-200"></span>
                    <span className="w-2 h-2 bg-primaryColor rounded-full animation-delay-400"></span>
                  </div>
                )}
                {/* "زر" أو رابط وهمي للبطاقة المميزة */}
                {isHighlighted && (
                  <div className="mt-auto pt-5">
                    <a
                      href="#learn-more" // يجب أن يكون رابطًا فعليًا
                      className="inline-block text-sm px-6 py-2 bg-white text-primaryColor font-semibold rounded-lg shadow-md hover:bg-slate-100 transition-colors duration-300 transform hover:scale-105"
                    >
                      اعرف المزيد
                    </a>
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
