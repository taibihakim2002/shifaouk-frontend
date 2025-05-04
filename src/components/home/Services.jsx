import {
  CalendarCheck,
  ClipboardList,
  MessageSquareMore,
  Stethoscope,
} from "lucide-react";
import SectionHeader from "../common/SectionHeader";

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

export default function Services() {
  return (
    <div className="py-16 bg-primary-50">
      <SectionHeader sectionTitle="خدماتنا" icon={Stethoscope} />
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-12 lg:px-20">
        {services.map((ele) => {
          const Icon = ele.icon;
          return (
            <div
              className={`w-full h-72 justify-center flex items-start flex-col gap-7 rounded-lg shadow-sm hover:-translate-y-3 transition ${
                ele.isSpecific
                  ? "bg-primaryColor text-whiteColor shadow-lg"
                  : "bg-whiteColor text-darkColor"
              }   p-10`}
            >
              <div
                className={`p-5 rounded-full flex items-center justify-center text-primaryColor ${
                  ele.isSpecific
                    ? "bg-whiteColor "
                    : "border border-primaryColor"
                } `}
              >
                <Icon size={30} />
              </div>
              <p className="text-lg font-bold">{ele.title}</p>
              <p
                className={`text-sm ${
                  ele.isSpecific ? "text-gray-200" : "text-gray-400"
                }`}
              >
                {ele.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
