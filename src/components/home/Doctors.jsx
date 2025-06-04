// import { Star, Stethoscope } from "lucide-react";
// import SectionHeader from "../common/SectionHeader";
// import { Button } from "flowbite-react";
// import flowbit from "../../config/flowbit";
// import { Link } from "react-router-dom";
// import DoctorCard from "../common/DoctorCard";

// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import { Navigation, Pagination } from "swiper/modules";
// import "swiper/css/pagination";
// import useApiRequest from "../../hooks/useApiRequest";
// import { useEffect } from "react";
// import globalApi from "../../utils/globalApi";
// import Skeleton from "../common/Skeleton";

// // const doctors = [
// //   {
// //     name: "معاوية احمد",
// //     description: "أخصائي امراض القلب",
// //     image: "/doctor2.jpg",
// //     link: "/profile",
// //     rating: 4,
// //   },
// //   {
// //     name: "طيبي عبد الحكيم",
// //     description: "أخصائي امراض المعدة",
// //     image: "/doctor1.jpg",
// //     link: "/profile",
// //     rating: 4,
// //   },
// //   {
// //     name: " حلباوي محمد",
// //     description: "أخصائي امراض الكبد",
// //     image: "doctor4.webp",
// //     link: "/profile",
// //     rating: 5,
// //   },
// //   {
// //     name: "محمدي اسامة",
// //     description: "أخصائي امراض الرئة",
// //     image: "doctor5.jpg",
// //     link: "/profile",
// //     rating: 3.5,
// //   },
// //   {
// //     name: "محمدي اسامة",
// //     description: "أخصائي امراض الرئة",
// //     image: "doctor5.jpg",
// //     link: "/profile",
// //     rating: 3.5,
// //   },
// // ];

// export default function Doctors() {
//   const { data: doctors, loading, error, request } = useApiRequest();

//   useEffect(() => {
//     request(() => globalApi.getTopDoctors());
//   }, []);

//   return (
//     <div className="py-16 bg-primary-50">
//       <SectionHeader sectionTitle="اطبائنا المميزون" icon={Stethoscope} />

//       <div className="container">
//         <Swiper
//           modules={[Navigation, Pagination]}
//           navigation
//           spaceBetween={20}
//           breakpoints={{
//             0: { slidesPerView: 1 },
//             640: { slidesPerView: 2 },
//             1024: { slidesPerView: 3 },
//             1280: { slidesPerView: 4 },
//           }}
//           pagination={{ clickable: true }}
//           className="mb-5 "
//         >
//           {loading ? (
//             [0, 0, 0, 0].map((ele, index) => (
//               <SwiperSlide key={index}>
//                 <Skeleton className="w-56 h-56" />
//               </SwiperSlide>
//             ))
//           ) : doctors ? (
//             doctors?.data?.map((ele, index) => (
//               <SwiperSlide key={index}>
//                 <DoctorCard ele={ele} />
//               </SwiperSlide>
//             ))
//           ) : (
//             <p>لا يوجد أطباء</p>
//           )}
//         </Swiper>

//         <div className="flex justify-center">
//           <Link to="/doctors">
//             <Button theme={flowbit.button} color="primary" pill size="md">
//               عرض المزيد
//             </Button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

import { Star, Stethoscope, ChevronLeft, ChevronRight } from "lucide-react";
import SectionHeader from "../common/SectionHeader";
import { Button } from "flowbite-react";
import flowbit from "../../config/flowbit"; // تأكد أن هذا الملف مهيأ بشكل صحيح
import { Link } from "react-router-dom";
import DoctorCard from "../common/DoctorCard"; // المكون الفعلي لبطاقة الطبيب

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, A11y } from "swiper/modules"; // A11y لتحسين إمكانية الوصول
import { useEffect, useRef } from "react"; // useRef للتحكم في أزرار التنقل المخصصة
import useApiRequest from "../../hooks/useApiRequest";
import globalApi from "../../utils/globalApi";

// مكون Skeleton مُحسَّن لبطاقة الطبيب
function DoctorCardSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden animate-pulse">
      <div className="w-full h-60 bg-slate-200 dark:bg-slate-700"></div>{" "}
      {/* placeholder للصورة */}
      <div className="p-5 text-center">
        <div className="h-6 w-3/4 bg-slate-200 dark:bg-slate-700 mb-2.5 mx-auto rounded"></div>{" "}
        {/* placeholder للاسم */}
        <div className="h-4 w-1/2 bg-slate-200 dark:bg-slate-700 mb-3 mx-auto rounded"></div>{" "}
        {/* placeholder للتخصص */}
        <div className="h-5 w-1/3 bg-slate-200 dark:bg-slate-700 mb-4 mx-auto rounded"></div>{" "}
        {/* placeholder للتقييم */}
        <div className="h-10 w-full bg-slate-200 dark:bg-slate-700 rounded-lg"></div>{" "}
        {/* placeholder للزر */}
      </div>
    </div>
  );
}

export default function Doctors() {
  const { data: doctorsResponse, loading, error, request } = useApiRequest();
  const doctors = doctorsResponse?.data; // الوصول إلى مصفوفة الأطباء

  useEffect(() => {
    request(() => globalApi.getTopDoctors());
  }, []); // إضافة request إلى مصفوفة الاعتماديات

  const swiperRef = useRef(null);

  return (
    <div className="py-16 md:py-24 bg-primary-50 dark:bg-primary-900/10">
      {" "}
      {/* استخدام primary-50 من الإعدادات */}
      <div className="container mx-auto px-4">
        <SectionHeader sectionTitle="أطباؤنا المميزون" icon={Stethoscope} />

        <div className="relative">
          {" "}
          {/* حاوية نسبية لأزرار التنقل المطلقة */}
          <Swiper
            ref={swiperRef}
            modules={[Navigation, Pagination, A11y]}
            spaceBetween={24} // زيادة المسافة بين البطاقات
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 20 },
              768: { slidesPerView: 2, spaceBetween: 24 }, // تعديل لـ md
              1024: { slidesPerView: 3, spaceBetween: 24 },
              1280: { slidesPerView: 4, spaceBetween: 24 },
            }}
            pagination={{
              clickable: true,
              // يمكنك تخصيص شكل الـ bullets هنا إذا أردت عبر CSS Variables
              // انظر: https://swiperjs.com/swiper-api#pagination-css-custom-properties
              // مثال (يجب وضعه في ملف CSS عام أو <style jsx global>):
              // :root { --swiper-pagination-color: theme('colors.primary.DEFAULT');
              //          --swiper-pagination-bullet-inactive-color: theme('colors.slate.300'); }
              // أو استهداف الفئات مباشرةً
              // .swiper-pagination-bullet-active { background-color: theme('colors.primary.DEFAULT') !important; }
              // .swiper-pagination-bullet { background-color: theme('colors.slate.300'); width: 10px; height: 10px; }
            }}
            // navigation // سنستخدم أزرار مخصصة بدلاً من الافتراضية
            className="pb-12 md:pb-16" // إضافة padding سفلي لإظهار الـ pagination بشكل جيد
            // loop={doctors && doctors.length > 3} // تكرار إذا كان عدد الأطباء كافيًا
          >
            {loading ? (
              [...Array(4)].map(
                (
                  _,
                  index // عرض 4 هياكل عظمية
                ) => (
                  <SwiperSlide key={`skeleton-${index}`}>
                    <DoctorCardSkeleton />
                  </SwiperSlide>
                )
              )
            ) : doctors && doctors.length > 0 ? (
              doctors.map(
                (
                  doctor // استخدام doctor.id كمفتاح إذا كان متاحًا وفريدًا
                ) => (
                  <SwiperSlide
                    key={
                      doctor.id ||
                      `doctor-${doctor.attributes?.name}-${Math.random()}`
                    }
                  >
                    <DoctorCard ele={doctor} />{" "}
                    {/* تمرير بيانات الطبيب للبطاقة */}
                  </SwiperSlide>
                )
              )
            ) : (
              <SwiperSlide>
                {" "}
                {/* يجب أن يكون المحتوى داخل SwiperSlide */}
                <div className="flex flex-col items-center justify-center text-center py-10 h-full min-h-[300px] bg-white dark:bg-slate-800 rounded-xl shadow">
                  <Stethoscope
                    size={48}
                    className="mx-auto text-slate-400 dark:text-slate-500 mb-4"
                  />
                  <p className="text-xl text-slate-600 dark:text-slate-300">
                    عفواً، لا يوجد أطباء مميزون حالياً.
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    يرجى المحاولة مرة أخرى لاحقاً.
                  </p>
                </div>
              </SwiperSlide>
            )}
          </Swiper>
          {/* أزرار التنقل المخصصة */}
          {doctors &&
            doctors.length > 3 && ( // عرض الأزرار فقط إذا كان هناك ما يكفي من الشرائح
              <>
                <button
                  onClick={() => swiperRef.current?.swiper.slidePrev()}
                  aria-label="Previous doctor"
                  className="absolute top-1/2 -translate-y-1/2 -left-3 md:-left-5 z-10 p-2.5 bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <ChevronRight
                    size={28}
                    className="text-primary dark:text-primary-400"
                  />{" "}
                  {/* الأيقونة معكوسة لـ RTL */}
                </button>
                <button
                  onClick={() => swiperRef.current?.swiper.slideNext()}
                  aria-label="Next doctor"
                  className="absolute top-1/2 -translate-y-1/2 -right-3 md:-right-5 z-10 p-2.5 bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <ChevronLeft
                    size={28}
                    className="text-primary dark:text-primary-400"
                  />{" "}
                  {/* الأيقونة معكوسة لـ RTL */}
                </button>
              </>
            )}
        </div>

        {doctors && doctors.length > 0 && (
          <div className="flex justify-center mt-8 md:mt-10">
            <Link to="/doctors">
              <Button
                theme={flowbit.button} // تأكد أن هذا الثيم معرف
                color="primary" // يجب أن يكون معرفًا في ألوانك
                size="lg" // حجم أكبر قليلاً للزر
                className="group shadow-md hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 transform hover:scale-105"
              >
                <span className="px-4">عرض جميع الأطباء</span>
                <Star
                  size={20}
                  className="ml-2 group-hover:animate-ping transition-transform duration-300 transform group-hover:scale-125"
                />{" "}
                {/* أيقونة بجانب النص */}
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
