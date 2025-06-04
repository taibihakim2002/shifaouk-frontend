// import { CircleHelp } from "lucide-react";
// import SectionHeader from "../common/SectionHeader";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionPanel,
//   AccordionTitle,
// } from "flowbite-react";

// const FAQs = [
//   {
//     question: "كيف يمكنني إجراء استشارة عبر الفيديو؟",
//     answer:
//       "لإجراء استشارة عبر الفيديو، يجب أولاً إنشاء حساب على المنصة باستخدام بريدك الإلكتروني أو رقم هاتفك. بعد تسجيل الدخول، يمكنك التوجه إلى قسم 'الاستشارات' واختيار التخصص الذي يناسب حالتك الصحية. ستظهر لك قائمة بالأطباء المتاحين مع تفاصيلهم وتقييماتهم. بعد اختيار الطبيب، تقوم بحجز الموعد المناسب لك، وسيتم إرسال رابط خاص بجلسة الفيديو إلى حسابك أو بريدك الإلكتروني. يوم الموعد، قم بالدخول إلى المنصة واضغط على الرابط لبدء الاستشارة مباشرة مع الطبيب من خلال الفيديو، بكل خصوصية وأمان.",
//   },
//   {
//     question: "هل يمكنني تحميل تقارير الفحوصات للطبيب؟",
//     answer:
//       "نعم، المنصة تتيح لك إمكانية رفع الملفات الطبية مثل صور الأشعة، نتائج التحاليل، أو أي مستندات طبية أخرى. عند حجز الاستشارة أو بعدها، يمكنك الدخول إلى صفحة الاستشارة واستخدام ميزة 'رفع الملفات' لإرفاق الوثائق الخاصة بك. الطبيب سيطّلع على هذه الملفات قبل أو أثناء الجلسة، مما يساعده على تشخيص حالتك بشكل أدق ويقدم لك العلاج الأنسب بناءً على بيانات طبية موثقة.",
//   },
//   {
//     question: "هل الخدمات متوفرة على مدار الساعة؟",
//     answer:
//       "المنصة توفر العديد من الخدمات على مدار 24 ساعة، خصوصًا الاستشارات العامة أو الطارئة. ومع ذلك، فإن توفر بعض الأطباء قد يكون حسب جداولهم الشخصية. ننصح دائمًا بتصفح مواعيد الأطباء المتاحين وحجز الموعد المناسب لك مسبقًا. كما توجد خدمة الرد الآلي أو المحادثة الفورية مع طاقم الدعم للمساعدة في أي وقت طوال اليوم.",
//   },
//   {
//     question: "هل يمكنني اختيار الطبيب بنفسي؟",
//     answer:
//       "بالتأكيد، المنصة تمنحك الحرية الكاملة في اختيار الطبيب الذي يناسبك. يمكنك تصفح قائمة الأطباء حسب التخصص، الجنسية، اللغة، الجنس، أو حتى تقييمات المستخدمين السابقين. لكل طبيب صفحة تعريفية تحتوي على معلومات مفصلة عن خبرته، مجالات تخصصه، عدد الحالات التي تعامل معها، وتقييمات المرضى. هذا يساعدك على اتخاذ قرار واثق عند اختيار الطبيب الأنسب لحالتك الصحية.",
//   },
//   {
//     question: "كيف يتم الحفاظ على سرية معلوماتي الطبية؟",
//     answer:
//       "نأخذ خصوصيتك وأمان بياناتك على محمل الجد. المنصة تستخدم تقنيات تشفير متقدمة لحماية جميع المعلومات الشخصية والطبية التي تقدمها. كما يتم تخزين البيانات على خوادم آمنة تتوافق مع المعايير العالمية لحماية المعلومات الصحية (مثل HIPAA). لا يمكن لأي جهة خارجية الاطلاع على بياناتك دون إذن صريح منك، ونضمن عدم استخدام بياناتك لأي أغراض تجارية أو ترويجية.",
//   },
//   {
//     question: "هل الاستشارة تشمل وصفة طبية؟",
//     answer:
//       "نعم، في حالة رأى الطبيب حاجة لوصف علاج بعد تقييم حالتك، فسيقوم بإصدار وصفة طبية إلكترونية معتمدة يتم إرسالها مباشرة إلى حسابك داخل المنصة. يمكنك طباعة هذه الوصفة أو إرسالها إلى أقرب صيدلية معتمدة للتنفيذ. بعض الأدوية قد تتطلب تأكيد هوية أو استشارة إضافية، حسب القوانين المعمول بها في بلدك، والمنصة ستوجهك بما يلزم لتنفيذها بشكل قانوني وآمن.",
//   },
// ];

// export default function FAQ() {
//   return (
//     <div className="py-16">
//       <SectionHeader sectionTitle="الاسئلة الشائعة FAQ" icon={CircleHelp} />
//       <div className="container">
//         <Accordion>
//           {FAQs.map((ele) => (
//             <AccordionPanel>
//               <AccordionTitle>{ele.question}</AccordionTitle>
//               <AccordionContent>
//                 <p className="mb-2 text-gray-500 dark:text-gray-400 text-sm">
//                   {ele.answer}
//                 </p>
//               </AccordionContent>
//             </AccordionPanel>
//           ))}
//         </Accordion>
//       </div>
//     </div>
//   );
// }

import { CircleHelp, ChevronDown } from "lucide-react"; // ChevronDown لأيقونة الفتح/الإغلاق
import SectionHeader from "../common/SectionHeader";
import {
  Accordion,
  AccordionContent,
  AccordionPanel,
  AccordionTitle,
  // AccordionContent, // لن نستخدمها كاستيراد مباشر إذا كنا نعتمد على theme
  // AccordionPanel,  // نفس الأمر
  // AccordionTitle,   // نفس الأمر
} from "flowbite-react";

const faqsData = [
  {
    question: "كيف يمكنني إجراء استشارة عبر الفيديو؟",
    answer:
      "لإجراء استشارة عبر الفيديو، يجب أولاً إنشاء حساب على المنصة. بعد تسجيل الدخول، يمكنك التوجه إلى قسم 'الاستشارات'، اختيار التخصص والطبيب، ثم حجز الموعد. سيتم إرسال رابط الجلسة إلى حسابك لبدء الاستشارة.",
  },
  {
    question: "هل يمكنني تحميل تقارير الفحوصات للطبيب؟",
    answer:
      "نعم، المنصة تتيح لك رفع الملفات الطبية مثل صور الأشعة ونتائج التحاليل. يمكنك إرفاقها عند حجز الاستشارة أو من خلال صفحة الاستشارة الخاصة بك ليطلع عليها الطبيب.",
  },
  {
    question: "هل الخدمات متوفرة على مدار الساعة؟",
    answer:
      "العديد من الخدمات، كالاستشارات العامة، متوفرة على مدار الساعة. توفر الأطباء المتخصصين قد يختلف. خدمة دعم العملاء متاحة دائماً للمساعدة.",
  },
  {
    question: "هل يمكنني اختيار الطبيب بنفسي؟",
    answer:
      "بالتأكيد. يمكنك تصفح قائمة الأطباء حسب التخصص، التقييمات، وغيرها، واختيار من يناسبك. لكل طبيب صفحة تعريفية مفصلة لمساعدتك في اتخاذ القرار.",
  },
  {
    question: "كيف يتم الحفاظ على سرية معلوماتي الطبية؟",
    answer:
      "نحن نأخذ خصوصيتك على محمل الجد. نستخدم تقنيات تشفير متقدمة ونلتزم بمعايير حماية المعلومات الصحية العالمية لضمان أمان وسرية بياناتك.",
  },
  {
    question: "هل الاستشارة تشمل وصفة طبية؟",
    answer:
      "نعم، إذا رأى الطبيب ضرورة لذلك بعد تقييم حالتك، يمكنه إصدار وصفة طبية إلكترونية معتمدة يمكنك استخدامها في الصيدليات المعتمدة.",
  },
];

// تعريف الثيم المخصص للأكورديون
const customFaqTheme = {
  root: {
    base: "border-none divide-y-0 divide-transparent focus:outline-none focus:ring-0", // إزالة الحدود والتقسيمات الافتراضية
    flush: {
      off: "space-y-3 md:space-y-4", // المسافة بين كل سؤال (بطاقة)
      on: "border-b", // لا نستخدم flush:true هنا
    },
  },
  content: {
    // تصميم محتوى الإجابة
    base: "p-5 md:p-6 pt-0 text-base leading-relaxed text-slate-600 dark:text-slate-300",
  },
  title: {
    // تصميم عنوان السؤال (الجزء القابل للنقر)
    arrow: {
      // أيقونة السهم (فتح/إغلاق)
      base: "h-6 w-6 shrink-0 text-slate-500 dark:text-slate-400 transition-transform duration-200",
      open: {
        off: "", // عندما يكون مغلقًا
        on: "rotate-180 text-primary-600 dark:text-primary-400", // عندما يكون مفتوحًا، مع تغيير لون الأيقونة
      },
    },
    base: "flex w-full items-center justify-between text-left font-semibold text-slate-800 dark:text-white p-5 md:p-6 focus:outline-none focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-700 transition-colors duration-200 ease-in-out",
    flush: {
      off: "rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/60", // هذا يطبق على كل عنوان مغلق
      on: "bg-transparent dark:bg-transparent", // لا نستخدم flush:true
    },
    heading: "h3", // استخدام h3 للأسئلة من الناحية الدلالية
    open: {
      // تصميم العنوان عندما يكون مفتوحًا
      off: "", // هذه الفئة تطبق على الحالة المغلقة (بعد تعديل flush.off)
      on: "text-primary-700 bg-primary-50 dark:bg-primary-900/30 dark:text-primary-300 rounded-t-xl hover:bg-primary-100 dark:hover:bg-primary-900/40", // عندما يكون مفتوحًا (الجزء العلوي من البطاقة)
    },
  },
};

export default function FAQ() {
  return (
    <div className="py-16 md:py-24  dark:bg-gray-900">
      {" "}
      {/* خلفية القسم */}
      <div className="container mx-auto px-4">
        <SectionHeader sectionTitle="الأسئلة الشائعة" icon={CircleHelp} />

        <div className="max-w-3xl mx-auto">
          {" "}
          {/* تحديد عرض أقصى للأكورديون وتوسيطه */}
          <Accordion theme={customFaqTheme}>
            {faqsData.map((faqItem, index) => (
              // كل Accordion.Panel سيكون بطاقة مستقلة
              <AccordionPanel
                key={index}
                theme={
                  {
                    // يمكن تخصيص الـ panel هنا إذا كان للـ panel theme خاص به (عادة لا يوجد)
                    // ولكن نضيف الفئات هنا مباشرة
                  }
                }
                // الفئات هنا ستطبق على الحاوية لكل سؤال وجواب
                className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden focus:outline-none focus:ring-0"
              >
                <AccordionTitle
                // يمكن تمرير أيقونة مخصصة هنا إذا أردت استبدال السهم الافتراضي
                // arrowIcon={ChevronDown} // مثال: استخدام أيقونة مخصصة
                >
                  {faqItem.question}
                </AccordionTitle>
                <AccordionContent>
                  {/* تم نقل التنسيق إلى theme.content.base */}
                  <p className="mb-0">
                    {" "}
                    {/* إزالة mb-2 من هنا لأن theme.content.base يعتني بالحشو */}
                    {faqItem.answer}
                  </p>
                </AccordionContent>
              </AccordionPanel>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
