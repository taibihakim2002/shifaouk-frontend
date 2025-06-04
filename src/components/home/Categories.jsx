// import { Heart } from "lucide-react";
// import SectionHeader from "../common/SectionHeader";

// export default function Categories() {
//   return (
//     <div className="py-16">
//       <SectionHeader sectionTitle="اهم التخصصات" icon={Heart} />
//     </div>
//   );
// }

import {
  Heart,
  Baby, // لطب الأطفال
  Layers, // للأمراض الجلدية (طبقات الجلد)
  Ear, // للأنف والأذن والحنجرة لطب الأسنان
  Stethoscope, // للأمراض الباطنية
  Eye, // لطب العيون
  Bone, // للعظام والمفاصل
  Brain, // للأعصاب
  ShieldCheck, // للمناعة أو الوقاية
} from "lucide-react";
import SectionHeader from "../common/SectionHeader";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // افترض أنك تستخدم react-router-dom للروابط
import { FaTooth } from "react-icons/fa";

const categoriesData = [
  {
    name: "أمراض القلب والشرايين",
    icon: Heart,
    href: "/specialties/cardiology",
    color: "rose", // استخدام أسماء ألوان Tailwind القياسية
    bgColorLight: "bg-rose-50 dark:bg-rose-900/30",
    textColorLight: "text-rose-600 dark:text-rose-400",
    hoverBgColorLight: "hover:bg-rose-500",
  },
  {
    name: "طب الأطفال وحديثي الولادة",
    icon: Baby,
    href: "/specialties/pediatrics",
    color: "sky",
    bgColorLight: "bg-sky-50 dark:bg-sky-900/30",
    textColorLight: "text-sky-600 dark:text-sky-400",
    hoverBgColorLight: "hover:bg-sky-500",
  },
  {
    name: "الأمراض الجلدية والتناسلية",
    icon: Layers,
    href: "/specialties/dermatology",
    color: "teal",
    bgColorLight: "bg-teal-50 dark:bg-teal-900/30",
    textColorLight: "text-teal-600 dark:text-teal-400",
    hoverBgColorLight: "hover:bg-teal-500",
  },
  {
    name: "الأنف والأذن والحنجرة",
    icon: Ear,
    href: "/specialties/ent",
    color: "amber",
    bgColorLight: "bg-amber-50 dark:bg-amber-900/30",
    textColorLight: "text-amber-600 dark:text-amber-400",
    hoverBgColorLight: "hover:bg-amber-500",
  },
  {
    name: "طب وجراحة الفم والأسنان",
    icon: FaTooth,
    href: "/specialties/dentistry",
    color: "blue",
    bgColorLight: "bg-blue-50 dark:bg-blue-900/30",
    textColorLight: "text-blue-600 dark:text-blue-400",
    hoverBgColorLight: "hover:bg-blue-500",
  },
  {
    name: "الأمراض الباطنية العامة",
    icon: Stethoscope,
    href: "/specialties/internal-medicine",
    color: "indigo",
    bgColorLight: "bg-indigo-50 dark:bg-indigo-900/30",
    textColorLight: "text-indigo-600 dark:text-indigo-400",
    hoverBgColorLight: "hover:bg-indigo-500",
  },
  {
    name: "طب وجراحة العيون",
    icon: Eye,
    href: "/specialties/ophthalmology",
    color: "emerald",
    bgColorLight: "bg-emerald-50 dark:bg-emerald-900/30",
    textColorLight: "text-emerald-600 dark:text-emerald-400",
    hoverBgColorLight: "hover:bg-emerald-500",
  },
  {
    name: "جراحة العظام والمفاصل",
    icon: Bone,
    href: "/specialties/orthopedics",
    color: "orange", // تأكد من أن orange معرف في tailwind.config.js
    bgColorLight: "bg-orange-50 dark:bg-orange-900/30",
    textColorLight: "text-orange-600 dark:text-orange-400",
    hoverBgColorLight: "hover:bg-orange-500",
  },
];

// إعدادات Framer Motion للتحريك
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      duration: 0.3,
    },
  },
};

export default function Categories() {
  return (
    <div className="py-16 md:py-24  dark:bg-slate-900">
      {" "}
      {/* خلفية للقسم */}
      <div className="container mx-auto px-4">
        <SectionHeader sectionTitle="أهم التخصصات الطبية" icon={Heart} />

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {categoriesData.map((category) => {
            const IconComponent = category.icon;
            return (
              <motion.div key={category.name} variants={itemVariants}>
                <Link
                  to={category.href}
                  className={`group block rounded-xl p-6 md:p-8 text-center transition-all duration-300 ease-in-out
                    bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl dark:hover:shadow-slate-700/50
                    hover:-translate-y-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-900 focus:ring-${category.color}-500`}
                >
                  <div
                    className={`mx-auto flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full mb-5 md:mb-6 transition-all duration-300 ease-in-out
                      ${category.bgColorLight} ${category.hoverBgColorLight} group-hover:text-white`}
                  >
                    <IconComponent
                      className={`${category.textColorLight} group-hover:text-white transition-colors duration-300`}
                      size={36} // حجم الأيقونة md:size={40}
                      strokeWidth={1.75}
                    />
                  </div>
                  <h3 className="font-semibold text-slate-600 dark:text-white mb-1 group-hover:text-primary-600 dark:group-hover:text-primary-400">
                    {category.name}
                  </h3>
                  {/* يمكنك إضافة وصف قصير هنا إذا أردت */}
                  {/* <p className="text-sm text-slate-500 dark:text-slate-400">وصف قصير</p> */}
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
