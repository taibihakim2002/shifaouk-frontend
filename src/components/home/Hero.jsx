import { motion } from "framer-motion";
import { Button } from "flowbite-react";
import flowbit from "../../config/flowbit";

export default function Hero() {
  return (
    <div className="hero flex items-center overflow-hidden">
      <div className="container flex flex-col md:flex-row items-center md:gap-5 justify-between py-5 md:py-20">
        {/* Text Section */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="order-2 md:order-1 w-full lg:w-[60%] text-center md:text-start"
        >
          <h2 className="text-[25px] w-[70%] md:w-full text-center m-auto md:text-start md:text-[35px] 2xl:text-[43px] font-bold mb-3 md:mb-7">
            إسشتشر الخبراء
            <span className="text-primaryColor">
              وابدأ رحلتك نحو حياة اكثر صحة اليوم
            </span>
          </h2>
          <p className="text-gray-400 font-light leading-[35px] mb-3 md:mb-7 2xl:text-lg">
            ابدأ رحلتك نحو حياة اكثر صحة اليوم، دع الخبراء يوجهونكك في كل خطوة
            من الاستشارة الى التخطيط والعلاجـ لتتخذ قرارات مدروسة لتعزيز رفاهيتك
            ، صحتك تستحق الاهتمام اجعلها اولويتك وابدأالتغيير الان
          </p>
          <Button
            theme={flowbit.button}
            color="primary"
            className="text-whiteColor w-full md:w-fit"
            size="md"
          >
            ابحث عن طبيب
          </Button>
        </motion.div>

        {/* Image Section */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="order-1 md:order-2 w-full lg:w-[30%] flex items-center justify-center flex-col gap-2 mb-5 md:mb-0"
        >
          <div className="relative w-64 h-64 md:w-96 md:h-96 2xl:w-[450px] 2xl:h-[450px] rounded-full bg-primaryColor overflow-hidden">
            <img
              className="absolute w-full max-h-full object-contain"
              src="/doctor-hero.png"
              alt="Doctor"
            />
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="shadow-md rounded-lg flex flex-col gap-2 p-2"
          >
            <p className="text-center text-gray-400 2xl:text-lg">
              +100 طبيب متاح للاستشارة
            </p>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <img
                  key={i}
                  className="w-10 h-10 2xl:w-14 2xl:h-14 rounded-full object-cover border"
                  src={`/doctor${i}.jpg`}
                  alt="doctor"
                />
              ))}
              <div className="w-10 h-10 2xl:w-14 2xl:h-14 flex justify-center items-center bg-primaryColor text-whiteColor font-bold rounded-full 2xl:text-lg">
                +99
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
