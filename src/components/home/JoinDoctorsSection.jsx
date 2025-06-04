import { UserPlus, ArrowLeftCircle } from "lucide-react"; // ArrowLeftCircle أكثر وضوحًا كأيقونة زر
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import flowbit from "../../config/flowbit";

// import flowbit from "../../config/flowbit";

// تعريفات Framer Motion للتحريك (يمكن وضعها في ملف منفصل إذا أردت)
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
      staggerChildren: 0.2, // تأثير متتابع على العناصر الداخلية
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function JoinDoctorsSection() {
  return (
    <div className="py-10 md:py-20 bg-gradient-to-tr from-primary-600 via-primary-500 to-secondary-600 text-white relative overflow-hidden">
      {/* عناصر زخرفية اختيارية في الخلفية */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="smallGrid"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 20 0 L 0 0 0 20"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#smallGrid)" />
        </svg>
      </div>
      <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-white/5 rounded-full filter blur-3xl animate-pulse"></div>
      <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-white/5 rounded-full filter blur-3xl animate-pulse animation-delay-2000"></div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={itemVariants} className="mb-8">
            <UserPlus
              size={64}
              className="mx-auto text-white opacity-80 group-hover:opacity-100 transition-opacity duration-300"
              strokeWidth={1.5}
            />
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-xl md:text-3xl lg:text-4xl font-extrabold mb-6 leading-tight"
          >
            هل أنت طبيب أو أخصائي متميز؟
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="md:text-lg text-white/90 mb-10 md:mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            انضم إلى شبكتنا الطبية الرائدة ووسّع نطاق تأثيرك الإيجابي. نقدم لك
            منصة متطورة، وصولاً أوسع للمرضى، ودعماً كاملاً لتتمكن من تقديم أفضل
            رعاية صحية بكل سهولة ومرونة. سجل الآن وكن جزءًا من مستقبل الطب
            الرقمي.
          </motion.p>

          <motion.div variants={itemVariants}>
            <Link to="/new-doctor" className="flex justify-center">
              {" "}
              {/* يجب أن يوجه هذا إلى صفحة تسجيل الأطباء */}
              <Button
                theme={flowbit.button} // إذا كنت تستخدم تخصيصات Flowbite
                size="lg" // حجم زر كبير وواضح
                className="!bg-white !text-primary-600 hover:!bg-slate-100 dark:!bg-slate-100 dark:!text-primary-700 dark:hover:!bg-slate-200 font-bold shadow-2xl transform transition-all duration-300 ease-in-out hover:scale-105 focus:ring-4 focus:ring-white/50 group rounded-lg"
                // استخدمت ! لفرض الأنماط على Flowbite Button، يمكنك استخدام theme prop لتخصيص أكثر نظافة
              >
                <span className="px-5 md:px-8 py-1">سجل كطبيب الآن</span>
                <ArrowLeftCircle
                  size={28}
                  className="ml-3 group-hover:translate-x-[-4px] transition-transform duration-300 ease-out" // ml-3 في RTL لوضع الأيقونة على اليسار
                />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
