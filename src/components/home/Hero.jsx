import { Button } from "flowbite-react";
import flowbit from "../../config/flowbit";

export default function Hero() {
  return (
    <div className="hero flex items-center">
      <div className="container flex flex-col md:flex-row items-center md:gap-5 justify-between py-5 md:py-20">
        <div className="order-2 md:order-1 w-full lg:w-[60%] text-center md:text-start">
          <h2 className="text-[25px] w-[70%] md:w-full text-center m-auto md:text-start md:text-[35px] font-bold mb-3 md:mb-7">
            إسشتشر الخبراء{" "}
            <span className="text-primaryColor">
              وابدأ رحلتك نحو حياة اكثر صحة اليوم
            </span>
          </h2>
          <p className="text-gray-400 font-light leading-[35px] mb-3 md:mb-7">
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
        </div>
        <div className="order-1 md:order-2 w-full lg:w-[30%] flex items-center justify-center flex-col gap-2 mb-5 md:mb-0">
          <div className="relative w-64 h-64  md:w-96 md:h-96 rounded-full bg-primaryColor overflow-hidden ">
            <img
              className="absolute  w-full max-h-full object-contain"
              src="/doctor-hero.png"
              alt="Doctor"
            />
          </div>
          <div className="shadow-md rounded-lg flex flex-col gap-2 p-2">
            <p className="text-center text-gray-400">
              +100 طبيب متاح للاستشارة
            </p>
            <div className="flex gap-1">
              <img
                className="w-10 h-10 rounded-full object-cover border"
                src="/doctor1.jpg"
                alt="doctor"
              />
              <img
                className="w-10 h-10 rounded-full object-cover border"
                src="/doctor2.jpg"
                alt="doctor"
              />
              <img
                className="w-10 h-10 rounded-full object-cover border"
                src="/doctor3.webp"
                alt="doctor"
              />
              <img
                className="w-10 h-10 rounded-full object-cover border"
                src="/doctor4.webp"
                alt="doctor"
              />
              <img
                className="w-10 h-10 rounded-full object-cover border"
                src="/doctor5.jpg"
                alt="doctor"
              />
              <div className="w-10 h-10 flex justify-center items-center bg-primaryColor text-whiteColor font-bold rounded-full">
                <spam>+99</spam>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
