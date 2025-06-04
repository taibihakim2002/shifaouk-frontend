import { Button } from "flowbite-react";
import flowbit from "../../config/flowbit";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { Typewriter } from "react-simple-typewriter";
import { Link } from "react-router-dom";
export default function Hero() {
  return (
    <div className="hero flex items-center relative bg-primary-50">
      <div className="container flex flex-col md:flex-row items-center md:gap-5 justify-between py-5 md:py-20">
        <div className="order-2 md:order-1 w-full lg:w-[60%] text-center md:text-start">
          <h2 className="text-3xl md:text-5xl 2xl:text-6xl font-extrabold mb-6 md:mb-8 leading-[70px] dark:text-white">
            إستشر الخبراء{" "}
            <span className="text-primaryColor">
              <Typewriter
                words={["وابدأ رحلتك نحو حياة اكثر صحة اليوم"]}
                cursor
                cursorStyle="_"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1500}
              />
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 font-normal leading-relaxed mb-8 md:mb-10 lg:text-lg 2xl:text-xl">
            ابدأ رحلتك نحو حياة اكثر صحة اليوم، دع الخبراء يوجهونك في كل خطوة من
            الاستشارة الى التخطيط والعلاجـ لتتخذ قرارات مدروسة لتعزيز رفاهيتك.
            صحتك تستحق الاهتمام، اجعلها أولويتك وابدأ التغيير الآن!
          </p>
          <Link to="/doctors" className="w-full md:w-auto">
            <Button
              theme={flowbit.button} // تأكد من أن flowbit.button مهيأ بشكل صحيح
              color="primary" // يجب أن يكون هذا اللون معرفًا في ثيماتك
              className="w-full md:w-auto transform transition-transform duration-300 hover:scale-105 shadow-lg hover:shadow-primaryColor/40 focus:ring-4 focus:ring-primaryColor/50"
              size="xl" // حجم أكبر قليلاً للزر الرئيسي
            >
              <span className="text-lg font-semibold px-6 py-1">
                ابحث عن طبيب
              </span>
            </Button>
          </Link>
        </div>
        <div className="order-1 md:order-2 w-full lg:w-[30%] flex items-center justify-center flex-col gap-2 mb-5 md:mb-0">
          <motion.div
            animate={{ y: [0, -12, 0], scale: [1, 1.03, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-72 h-72 md:w-96 md:h-96 lg:w-[400px] lg:h-[400px] 2xl:w-[550px] 2xl:h-[550px]"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primaryColor to-purple-600 dark:from-primaryColor/70 dark:to-purple-500/70 shadow-2xl transform group-hover:scale-105 transition-transform duration-300"></div>
            <img
              className="absolute inset-0 w-full h-full object-contain p-4 md:p-6 transform transition-transform duration-500 hover:scale-110" // تكبير الصورة داخل الدائرة عند المرور
              src="/doctor-hero.png" // تأكد أن مسار الصورة صحيح
              alt="Doctor smiling"
            />
            {/* تأثيرات زخرفية اختيارية */}
            <motion.div
              className="absolute -top-5 -left-5 w-20 h-20 bg-white/20 dark:bg-white/10 rounded-full filter blur-xl"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            ></motion.div>
            <motion.div
              className="absolute -bottom-5 -right-5 w-24 h-24 bg-primaryColor/20 dark:bg-primaryColor/10 rounded-lg filter blur-xl"
              animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            ></motion.div>
          </motion.div>
          <div className="shadow-md rounded-lg flex flex-col gap-2 p-2">
            <p className="text-center text-gray-400 2xl:text-lg">
              +
              <spam>
                <CountUp end={100} duration={2} />
              </spam>
              طبيب متاح للاستشارة
            </p>
            <div className="flex gap-1">
              <img
                className="w-10 h-10 2xl:w-14 2xl:h-14 rounded-full object-cover border"
                src="/doctor1.jpg"
                alt="doctor"
              />
              <img
                className="w-10 h-10 2xl:w-14 2xl:h-14 rounded-full object-cover border"
                src="/doctor2.jpg"
                alt="doctor"
              />
              <img
                className="w-10 h-10 2xl:w-14 2xl:h-14 rounded-full object-cover border"
                src="/doctor3.webp"
                alt="doctor"
              />
              <img
                className="w-10 h-10 2xl:w-14 2xl:h-14 rounded-full object-cover border"
                src="/doctor4.webp"
                alt="doctor"
              />
              <img
                className="w-10 h-10 2xl:w-14 2xl:h-14 rounded-full object-cover border"
                src="/doctor5.jpg"
                alt="doctor"
              />
              <div className="w-10 h-10 2xl:w-14 2xl:h-14 flex justify-center items-center bg-primaryColor text-white font-bold rounded-full 2xl:text-lg">
                <spam>+99</spam>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
