// import {
//   Button,
//   Rating,
//   RatingStar,
//   TabItem,
//   Tabs,
//   Textarea,
// } from "flowbite-react";
// import { Timer } from "lucide-react";
// import flowbit from "../config/flowbit";
// import { BiSave } from "react-icons/bi";
// import {
//   HiAdjustments,
//   HiClipboardList,
//   HiUserCircle,
//   HiOutlineMail,
//   HiOutlineInformationCircle,
//   HiCurrencyDollar,
// } from "react-icons/hi"; // Added HiOutlineInformationCircle
// import { MdDashboard } from "react-icons/md";
// import BlogCard from "../components/common/BlogCard";
// import { FaUserDoctor } from "react-icons/fa6";
// import { GrSchedule } from "react-icons/gr";
// import useApiRequest from "../hooks/useApiRequest";
// import { useEffect } from "react";
// import globalApi from "../utils/globalApi";
// import parseImgUrl from "../utils/parseImgUrl";
// import Skeleton from "../components/common/Skeleton";
// import { Link, useParams } from "react-router-dom";

// // Static reviews and blogs arrays remain the same...
// const reviews = [
//   {
//     name: "محمد بوهالي",
//     image: "/doctor1.jpg",
//     rating: 4,
//     date: "26 أفريل 2025",
//     time: "19:25",
//     comment:
//       "طبيب متمكن وخلوق، تعامل راقٍ وتشخيص دقيق. شعرت باهتمامه الحقيقي بحالتي. العيادة نظيفة والتنظيم ممتاز. أشكركم على الخدمة الرائعة.",
//   },
//   {
//     name: "ليلى حمودي",
//     image: "/doctor2.jpg",
//     rating: 5,
//     date: "15 مارس 2025",
//     time: "10:10",
//     comment:
//       "تجربتي كانت ممتازة، الطبيبة أنصتت لي جيدًا وقدمت لي نصائح مهمة. أجواء العيادة مريحة جدًا.",
//   },
//   {
//     name: "يوسف بن عمر",
//     image: "/doctor3.webp",
//     rating: 3,
//     date: "02 فيفري 2025",
//     time: "14:30",
//     comment: "الخدمة جيدة عمومًا لكن وقت الانتظار كان طويلًا بعض الشيء.",
//   },
//   {
//     name: "نسرين زروقي",
//     image: "/doctor4.webp",
//     rating: 5,
//     date: "20 جانفي 2025",
//     time: "09:45",
//     comment: "أفضل دكتورة زرتها، دقيقة في تشخيصها ومتفهمة جدًا. أوصي بها بشدة.",
//   },
//   {
//     name: "علي عيادي",
//     image: "/doctor5.jpg",
//     rating: 4,
//     date: "12 ديسمبر 2024",
//     time: "17:00",
//     comment: "العلاج كان فعّال والدكتور محترف. فقط أتمنى تحسين نظام الحجز.",
//   },
//   {
//     name: "سميرة قادري",
//     image: "/doctor-hero.png",
//     rating: 2,
//     date: "03 نوفمبر 2024",
//     time: "12:20",
//     comment:
//       "لم تكن التجربة كما توقعت. شعرت بعدم اهتمام بالتفاصيل، لكن المكان نظيف.",
//   },
// ];

// // Helper for day mapping
// const dayMap = {
//   sun: "الأحد",
//   mon: "الاثنين",
//   tue: "الثلاثاء",
//   wed: "الأربعاء",
//   thu: "الخميس",
//   fri: "الجمعة",
//   sat: "السبت",
// };

// // Helper function to format availability
// const FormatAvailability = ({ availability }) => {
//   if (!availability || availability.length === 0) {
//     return (
//       <p className="font-bold text-lg text-gray-500 hover:text-darkColor">
//         أوقات العمل غير معروفة
//       </p>
//     );
//   }

//   const groupedByDay = availability.reduce((acc, slot) => {
//     acc[slot.day] = acc[slot.day] || [];
//     acc[slot.day].push(`من ${slot.from} إلى ${slot.to}`); // Explicit "من - إلى"
//     return acc;
//   }, {});

//   const dayOrder = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

//   return (
//     <div className="flex flex-col gap-1 text-gray-600">
//       {dayOrder.map((dayKey) => {
//         if (groupedByDay[dayKey] && groupedByDay[dayKey].length > 0) {
//           return (
//             <div
//               key={dayKey}
//               className="flex flex-col sm:flex-row sm:items-start"
//             >
//               <span className="font-semibold text-primaryColor w-full sm:w-16 mb-1 sm:mb-0 flex-shrink-0">
//                 {dayMap[dayKey] || dayKey}:
//               </span>
//               <span className="hover:text-darkColor flex-1 text-sm md:text-base">
//                 {groupedByDay[dayKey].join("  |  ")}
//               </span>
//             </div>
//           );
//         }
//         return null;
//       })}
//     </div>
//   );
// };

// export default function ProfileDoctor() {
//   const { data: doctor, loading, error, request } = useApiRequest();
//   const { id } = useParams();

//   useEffect(() => {
//     if (id) {
//       request(() => globalApi.getDoctorById(id));
//     }
//   }, []);

//   const renderStars = (rating) => {
//     const totalStars = 5;
//     const fullStars = Math.round(rating);
//     const stars = [];
//     for (let i = 1; i <= totalStars; i++) {
//       stars.push(<RatingStar key={i} filled={i <= fullStars} />);
//     }
//     return stars;
//   };

//   if (error) {
//     return (
//       <div className="container text-center py-10 text-red-500 h-[400px]">
//         حدث خطأ أثناء تحميل بيانات الطبيب.
//       </div>
//     );
//   }

//   return (
//     <div>
//       <div className="container pb-16">
//         <div className="w-full mt-7 flex flex-col items-center lg:items-start lg:flex-row justify-between gap-5">
//           <div className="flex items-center gap-5">
//             {loading ? (
//               <Skeleton className="w-32 h-32 rounded-full" />
//             ) : (
//               doctor &&
//               doctor.data && (
//                 <img
//                   src={parseImgUrl(doctor.data.profileImage)}
//                   alt="doctor profile"
//                   className="w-32 h-32 rounded-full object-cover"
//                 />
//               )
//             )}
//             <div>
//               {loading ? (
//                 <>
//                   <Skeleton className="w-48 h-7 mb-3" />
//                   <Skeleton className="w-40 h-5" />
//                 </>
//               ) : (
//                 doctor &&
//                 doctor.data && (
//                   <>
//                     <h2 className="text-xl font-bold mb-3 text-gray-600">
//                       {`${doctor.data.fullName.first} ${doctor.data.fullName.second}`}
//                     </h2>
//                     <p className="text-gray-400">
//                       {doctor.data.doctorProfile?.specialization ||
//                         "التخصص غير محدد"}
//                     </p>
//                   </>
//                 )
//               )}
//             </div>
//           </div>

//           <div className="flex gap-5 ">
//             <Link to={`/doctors/${doctor?.data?._id}/book`}>
//               <Button theme={flowbit.button} color="primary" className="w-44">
//                 حجز استشارة
//               </Button>
//             </Link>

//             <Button theme={flowbit.button} color="noColor" className="p-1">
//               <BiSave className="text-gray-500" size={25} />
//             </Button>
//           </div>
//         </div>
//         <div className="mt-5">
//           <Tabs
//             aria-label="Tabs with underline"
//             variant="underline"
//             theme={flowbit.tab}
//           >
//             <TabItem active title="معلومات عامة" icon={HiUserCircle}>
//               <h3 className="text-xl font-bold text-primaryColor mb-10 text-center">
//                 معلومات عامة
//               </h3>
//               <div className="md:flex gap-10">
//                 <div className="w-full h-72 md:w-72 md:h-96 mb-5 md:mb-0">
//                   {loading ? (
//                     <Skeleton className="object-cover w-full h-full rounded" />
//                   ) : doctor && doctor.data ? (
//                     <img
//                       src={parseImgUrl(doctor.data.profileImage)}
//                       alt="Doctor Main"
//                       className="object-cover w-full h-full rounded"
//                     />
//                   ) : (
//                     <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded">
//                       <p className="text-gray-500">لا توجد صورة</p>
//                     </div>
//                   )}
//                 </div>
//                 <div className="w-full md:w-auto p-5 flex flex-col gap-6 items-start">
//                   {/* Doctor Name */}
//                   <div className="flex gap-5 justify-start items-center w-full">
//                     <FaUserDoctor
//                       size={27}
//                       className="text-primaryColor flex-shrink-0"
//                     />
//                     {loading ? (
//                       <Skeleton className="w-48 h-6" />
//                     ) : (
//                       <p className="font-bold text-lg text-gray-500 hover:text-darkColor">
//                         {doctor && doctor.data
//                           ? `د. ${doctor.data.fullName.first} ${doctor.data.fullName.second}`
//                           : "اسم الطبيب"}
//                       </p>
//                     )}
//                   </div>
//                   {/* Email */}
//                   <div className="flex gap-5 justify-start items-center w-full">
//                     <HiOutlineMail
//                       size={27}
//                       className="text-primaryColor flex-shrink-0"
//                     />
//                     {loading ? (
//                       <Skeleton className="w-52 h-6" />
//                     ) : (
//                       <p className="font-bold text-lg text-gray-500 hover:text-darkColor break-all">
//                         {doctor && doctor.data
//                           ? doctor.data.email
//                           : "البريد الإلكتروني غير متوفر"}
//                       </p>
//                     )}
//                   </div>
//                   {/* Specialization */}
//                   <div className="flex gap-5 justify-start items-center w-full">
//                     <FaUserDoctor
//                       size={27}
//                       className="text-primaryColor flex-shrink-0"
//                     />{" "}
//                     {/* Icon can be more specific */}
//                     {loading ? (
//                       <Skeleton className="w-40 h-6" />
//                     ) : (
//                       <p className="font-bold text-lg text-gray-500 hover:text-darkColor">
//                         {doctor && doctor.data && doctor.data.doctorProfile
//                           ? doctor.data.doctorProfile.specialization
//                           : "التخصص"}
//                       </p>
//                     )}
//                   </div>
//                   {/* Experience */}
//                   <div className="flex gap-5 justify-start items-center w-full">
//                     <Timer
//                       size={27}
//                       className="text-primaryColor flex-shrink-0"
//                     />
//                     {loading ? (
//                       <Skeleton className="w-60 h-6" />
//                     ) : (
//                       <p className="font-bold text-lg text-gray-500 hover:text-darkColor">
//                         {doctor && doctor.data && doctor.data.doctorProfile
//                           ? `+${
//                               doctor.data.doctorProfile.experienceYears
//                             } سنة خبرة في مجال ${
//                               doctor.data.doctorProfile.specialization || "الطب"
//                             }`
//                           : "سنوات الخبرة"}
//                       </p>
//                     )}
//                   </div>
//                   <div className="flex gap-5 justify-start items-center w-full">
//                     <HiCurrencyDollar
//                       size={27}
//                       className="text-primaryColor flex-shrink-0"
//                     />
//                     {loading ? (
//                       <Skeleton className="w-60 h-6" />
//                     ) : (
//                       <p className="font-bold text-lg text-gray-500 hover:text-darkColor">
//                         {doctor &&
//                         doctor.data &&
//                         doctor.data.doctorProfile.consultationPrice
//                           ? `${doctor.data.doctorProfile.consultationPrice} دج`
//                           : "السعر غير محدد"}
//                       </p>
//                     )}
//                   </div>
//                   {/* Availability */}
//                   <div className="flex gap-5 justify-start items-start w-full">
//                     <GrSchedule
//                       size={27}
//                       className="text-primaryColor mt-1 flex-shrink-0"
//                     />
//                     <div className="w-full">
//                       {loading ? (
//                         <Skeleton className="w-full h-24" />
//                       ) : doctor && doctor.data && doctor.data.doctorProfile ? (
//                         <FormatAvailability
//                           availability={doctor.data.doctorProfile.availability}
//                         />
//                       ) : (
//                         <p className="font-bold text-lg text-gray-500 hover:text-darkColor">
//                           أوقات العمل غير معروفة
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                   {/* Booking Instructions */}
//                   {loading &&
//                   (!doctor ||
//                     !doctor.data ||
//                     !doctor.data.doctorProfile ||
//                     !doctor.data.doctorProfile.bookingInstructions) ? (
//                     <div className="flex gap-5 justify-start items-start w-full">
//                       <HiOutlineInformationCircle
//                         size={27}
//                         className="text-primaryColor mt-1 flex-shrink-0"
//                       />
//                       <Skeleton className="w-full h-12" />
//                     </div>
//                   ) : (
//                     doctor &&
//                     doctor.data &&
//                     doctor.data.doctorProfile &&
//                     doctor.data.doctorProfile.bookingInstructions && (
//                       <div className="flex gap-5 justify-start items-start w-full">
//                         <HiOutlineInformationCircle
//                           size={27}
//                           className="text-primaryColor mt-1 flex-shrink-0"
//                         />
//                         <div className="w-full">
//                           <h4 className="font-semibold text-md text-primaryColor mb-1">
//                             تعليمات الحجز:
//                           </h4>
//                           <p className="text-sm md:text-base text-gray-600 hover:text-darkColor whitespace-pre-line">
//                             {doctor.data.doctorProfile.bookingInstructions}
//                           </p>
//                         </div>
//                       </div>
//                     )
//                   )}
//                 </div>
//               </div>
//             </TabItem>
//             {/* Medical Articles Tab remains the same */}
//             <TabItem title="مقالات طبية" icon={MdDashboard}>
//               <h3 className="text-xl font-bold text-primaryColor text-center mb-5">
//                 مقالات طبية
//               </h3>
//               <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-center">
//                 <p>هذا القسم غير متوفر حاليا</p>
//               </div>
//             </TabItem>
//             {/* Ratings Tab remains the same */}
//             <TabItem title="التقييمات" icon={HiAdjustments}>
//               <h3 className="text-xl font-bold text-primaryColor text-center mb-5">
//                 التقييمات
//               </h3>
//               <div>
//                 <div className="text-center text-[35px] font-bold text-secondaryColor mb-5">
//                   {loading ? (
//                     <>
//                       <Skeleton className="w-12 h-10 inline-block" />
//                       <span className="font-light"> | </span>
//                       <Skeleton className="w-24 h-10 inline-block" />
//                     </>
//                   ) : (
//                     doctor &&
//                     doctor.data &&
//                     doctor.data.doctorProfile && (
//                       <>
//                         <span>
//                           {(doctor.data.doctorProfile.rating || 0).toFixed(1)}
//                         </span>
//                         <span className="font-light"> | </span>
//                         <span>
//                           {doctor.data.doctorProfile.totalReviews || 0} مقيم
//                         </span>
//                       </>
//                     )
//                   )}
//                 </div>
//                 <div className="flex justify-center mb-5">
//                   <Rating className="mb-2" size="lg">
//                     {loading
//                       ? [...Array(5)].map((_, i) => (
//                           <Skeleton
//                             key={i}
//                             className="w-8 h-8 rounded-full mx-0.5"
//                           />
//                         ))
//                       : doctor && doctor.data && doctor.data.doctorProfile
//                       ? renderStars(doctor.data.doctorProfile.rating || 0)
//                       : renderStars(0)}
//                   </Rating>
//                 </div>
//                 <div className="mb-5">
//                   <h3 className="text-lg font-bold text-primaryColor mb-5">
//                     أضف تقييمك
//                   </h3>
//                   <Textarea
//                     className="mb-3"
//                     id="comment"
//                     placeholder="أكتب تقييم للطبيب"
//                     required
//                     rows={4}
//                   />
//                   <Button
//                     className="w-32 ms-auto"
//                     theme={flowbit.button}
//                     color="primary"
//                     pill
//                   >
//                     إرسال
//                   </Button>
//                 </div>
//                 <div>
//                   <h3 className="text-lg font-bold text-primaryColor mb-5">
//                     تقييم العملاء
//                   </h3>
//                   <div className="flex flex-col gap-5">
//                     {reviews.map((ele, index) => (
//                       <div
//                         className="p-4 rounded-lg shadow-md border hover:bg-gray-100"
//                         key={index}
//                       >
//                         <div className="flex items-center justify-between mb-4">
//                           <div className="flex items-center gap-5">
//                             <img
//                               className="w-16 h-16 rounded-full object-cover"
//                               src={ele.image}
//                               alt={ele.name}
//                             />
//                             <div className="flex flex-col gap-2">
//                               <p className="text-lg font-bold text-secondaryColor">
//                                 {ele.name}
//                               </p>
//                               <Rating className="mb-2" size="sm">
//                                 {renderStars(ele.rating)}
//                               </Rating>
//                             </div>
//                           </div>
//                           <div className="border shadow-lg text-sm px-3 py-1 rounded-lg text-gray-500">
//                             <span>{ele.date}</span>
//                             <span> | </span>
//                             <span>{ele.time}</span>
//                           </div>
//                         </div>
//                         <div className="ps-20">{ele.comment}</div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </TabItem>
//             {/* Overview Tab remains the same */}
//             <TabItem title="نبذة عامة" icon={HiClipboardList}>
//               <h3 className="text-xl font-bold text-primaryColor text-center mb-5">
//                 نبذة عامة
//               </h3>
//               {loading ? (
//                 <>
//                   <Skeleton className="w-full h-8 mb-2" />
//                   <Skeleton className="w-full h-8 mb-2" />
//                   <Skeleton className="w-3/4 h-8" />
//                 </>
//               ) : (
//                 <p className="leading-8 indent-8">
//                   {doctor && doctor.data && doctor.data.doctorProfile
//                     ? doctor.data.doctorProfile.doctorBio
//                     : "لا توجد نبذة متوفرة حاليًا."}
//                 </p>
//               )}
//             </TabItem>
//           </Tabs>
//         </div>
//       </div>
//     </div>
//   );
// }

import {
  Button,
  Rating,
  RatingStar,
  TabItem, // سنستخدم Tabs.Item
  Tabs, // سنستخدم Tabs
  Textarea,
} from "flowbite-react";
// import { Tabs } from "flowbite-react"; // استيراد Tabs بشكل منفصل
import {
  Timer,
  Heart,
  Mail,
  Briefcase,
  GraduationCap,
  DollarSign,
  Info,
  MessageCircle,
  BookOpen,
  Edit3,
  ThumbsUp,
  CalendarDays,
} from "lucide-react"; // أيقونات جديدة ومناسبة
import flowbit from "../config/flowbit"; // تأكد من أن flowbit.tab و flowbit.button مهيأة بشكل جيد
import { BiSave } from "react-icons/bi"; // أيقونة الحفظ
import {
  HiClipboardList,
  HiUserCircle,
  // HiOutlineMail, // استبدلت بـ Mail من lucide
  // HiOutlineInformationCircle, // استبدلت بـ Info من lucide
  // HiCurrencyDollar, // استبدلت بـ DollarSign من lucide
} from "react-icons/hi";
import { MdDashboard, MdVerifiedUser } from "react-icons/md"; // MdVerifiedUser للتحقق مثلاً
// import BlogCard from "../components/common/BlogCard"; // إذا كنت ستستخدمه لاحقًا
// import { FaUserDoctor } from "react-icons/fa6"; // استبدلت بـ Briefcase أو GraduationCap
// import { GrSchedule } from "react-icons/gr"; // استبدلت بـ CalendarDays من lucide
import useApiRequest from "../hooks/useApiRequest";
import { useEffect, useState } from "react";
import globalApi from "../utils/globalApi";
import parseImgUrl from "../utils/parseImgUrl";
import Skeleton from "../components/common/Skeleton";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";

// بيانات المراجعات (تبقى كما هي)
const reviews = [
  {
    name: "محمد بوهالي",
    image: "/doctor1.jpg",
    rating: 4,
    date: "26 أفريل 2025",
    time: "19:25",
    comment:
      "طبيب متمكن وخلوق، تعامل راقٍ وتشخيص دقيق. شعرت باهتمامه الحقيقي بحالتي. العيادة نظيفة والتنظيم ممتاز. أشكركم على الخدمة الرائعة.",
  },
  {
    name: "ليلى حمودي",
    image: "/doctor2.jpg",
    rating: 5,
    date: "15 مارس 2025",
    time: "10:10",
    comment:
      "تجربتي كانت ممتازة، الطبيبة أنصتت لي جيدًا وقدمت لي نصائح مهمة. أجواء العيادة مريحة جدًا.",
  },
  // ... باقي المراجعات
];

const dayMap = {
  sun: "الأحد",
  mon: "الاثنين",
  tue: "الثلاثاء",
  wed: "الأربعاء",
  thu: "الخميس",
  fri: "الجمعة",
  sat: "السبت",
};

// مكون مُحسَّن لعرض أوقات العمل
const FormatAvailability = ({ availability }) => {
  if (!availability || availability.length === 0) {
    return (
      <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
        <CalendarDays size={20} className="text-primaryColor" />
        <span>أوقات العمل غير محددة حاليًا.</span>
      </div>
    );
  }

  const groupedByDay = availability.reduce((acc, slot) => {
    acc[slot.day] = acc[slot.day] || [];
    acc[slot.day].push(`${slot.from} - ${slot.to}`); // تنسيق أبسط
    return acc;
  }, {});
  const dayOrder = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

  return (
    <div className="space-y-2">
      {dayOrder.map((dayKey) => {
        if (groupedByDay[dayKey] && groupedByDay[dayKey].length > 0) {
          return (
            <div key={dayKey} className="flex items-start text-sm md:text-base">
              <span className="font-semibold text-primaryColor dark:text-primaryColor-400 w-20 sm:w-24 shrink-0">
                {dayMap[dayKey] || dayKey}:
              </span>
              <span className="text-slate-700 dark:text-slate-300">
                {groupedByDay[dayKey].join(" | ")}
              </span>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

// مكون لعرض النجوم بشكل أفضل
const RenderStars = ({ rating, size = "md" }) => {
  // Flowbite Rating size: "sm", "md", "lg"
  const totalStars = 5;
  const fullStars = Math.round(parseFloat(rating) || 0); // Ensure rating is a number
  const stars = [];
  for (let i = 1; i <= totalStars; i++) {
    stars.push(
      <RatingStar
        key={i}
        filled={i <= fullStars}
        className={
          i <= fullStars
            ? "!text-amber-400"
            : "!text-slate-300 dark:!text-slate-600"
        }
      />
    );
  }
  return <Rating size={size}>{stars}</Rating>;
};

export default function ProfileDoctor() {
  const { data: doctorResponse, loading, error, request } = useApiRequest();
  const { id } = useParams();
  const doctor = doctorResponse?.data; // لتسهيل الوصول

  useEffect(() => {
    if (id) {
      request(() => globalApi.getDoctorById(id));
    }
  }, [id]); // إضافة request إلى مصفوفة الاعتماديات

  // تعريف الثيم المخصص للتبويبات هنا أو استيراده
  const customTabTheme = flowbit.tab || {
    // استخدام الثيم من flowbit أو قيم افتراضية محسنة
    base: "flex flex-col gap-3 md:gap-4",
    tablist: {
      base: "flex text-center border-b border-slate-200 dark:border-slate-700",
      styles: {
        underline: "-mb-px flex-wrap", // -mb-px لرفع الخط السفلي قليلاً
      },
      tabitem: {
        base: "flex items-center justify-center p-3 sm:p-4 text-sm sm:text-base font-medium first:ml-0 focus:outline-none focus:ring-2 focus:ring-primaryColor-300 dark:focus:ring-primaryColor-700 disabled:cursor-not-allowed disabled:text-slate-400 dark:disabled:text-slate-500 rounded-t-lg",
        styles: {
          underline: {
            base: "text-slate-500 hover:text-primaryColor-600 hover:border-primaryColor-300 dark:text-slate-400 dark:hover:text-primaryColor-400",
            active: {
              on: "text-primaryColor-600 border-b-2 border-primaryColor-600 active dark:text-primaryColor-400 dark:border-primaryColor-400",
              off: "border-b-2 border-transparent",
            },
          },
        },
        icon: "mr-2 h-5 w-5", // أيقونة التبويب
      },
    },
    tabpanel: "py-5 md:py-6 px-1", // حشوة لمحتوى التبويب
  };

  if (loading && !doctor) {
    // تحسين شرط التحميل الأولي
    return (
      <div className="container mx-auto px-4 py-10 md:py-16 min-h-screen">
        {/* يمكن وضع Skeleton أكثر تفصيلاً للصفحة بأكملها هنا */}
        <Skeleton className="w-1/2 h-10 mx-auto mb-8" />
        <Skeleton className="w-full h-96" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 text-center py-10 md:py-16 text-red-600 dark:text-red-400 min-h-[400px] flex flex-col justify-center items-center">
        <Info size={48} className="mb-4" />
        <h2 className="text-2xl font-semibold mb-2">خطأ في تحميل البيانات</h2>
        <p className="text-slate-600 dark:text-slate-300">
          حدث خطأ أثناء محاولة تحميل بيانات الطبيب. يرجى المحاولة مرة أخرى
          لاحقًا.
        </p>
      </div>
    );
  }

  if (!doctor) {
    // إذا لم يتم العثور على الطبيب بعد انتهاء التحميل
    return (
      <div className="container mx-auto px-4 text-center py-10 md:py-16 min-h-[400px] flex flex-col justify-center items-center">
        <Briefcase
          size={48}
          className="mb-4 text-slate-400 dark:text-slate-500"
        />
        <h2 className="text-2xl font-semibold mb-2 text-slate-700 dark:text-slate-200">
          لم يتم العثور على الطبيب
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          المعرف الذي تبحث عنه قد يكون غير صحيح أو أن الطبيب لم يعد متاحًا.
        </p>
      </div>
    );
  }

  const doctorName = `د. ${doctor.fullName.first || ""} ${
    doctor.fullName.second || ""
  }`.trim();
  const doctorSpecialty =
    doctor.doctorProfile?.specialization || "التخصص غير محدد";
  const doctorImage = parseImgUrl(doctor.profileImage);

  return (
    <div className="bg-slate-50 dark:bg-gray-950 min-h-screen">
      {/* قسم معلومات الطبيب الرئيسية (الهيدر) */}
      <div className="bg-gradient-to-b from-blue-500 via-blue-300 to-blue-100 dark:from-primary-900/20 dark:via-gray-950 dark:to-gray-900 pt-10 md:pt-16 pb-8 md:pb-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center sm:items-start gap-5 md:gap-8"
          >
            <img
              src={doctorImage || "/placeholder-doctor.jpg"}
              alt={doctorName}
              className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 rounded-full object-cover border-4 border-white dark:border-slate-700 shadow-lg"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/placeholder-doctor.jpg";
              }}
            />
            <div className="text-center sm:text-start flex-grow">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-1 md:mb-1.5">
                {doctorName}
              </h1>
              <p className="text-md sm:text-lg md:text-xl text-primaryColor dark:text-primaryColor-400 font-medium mb-2 md:mb-3">
                {doctorSpecialty}
              </p>
              {doctor.doctorProfile?.rating > 0 && (
                <div className="flex items-center justify-center sm:justify-start mb-3 md:mb-4">
                  <RenderStars rating={doctor.doctorProfile.rating} size="sm" />
                  <span className="text-xs text-slate-500 dark:text-slate-400 mr-2">
                    ({doctor.doctorProfile.totalReviews || 0} تقييم)
                  </span>
                </div>
              )}
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 mt-4 sm:mt-0 self-center sm:self-start">
              <Link
                to={`/doctors/${doctor._id}/book`}
                className="w-full sm:w-auto"
              >
                <Button
                  theme={flowbit.button}
                  color="primary"
                  size="md"
                  className="w-full sm:w-auto !px-5 md:!px-6 !font-semibold"
                >
                  <CalendarDays size={18} className="ml-2" /> حجز استشارة
                </Button>
              </Link>
              <Button
                theme={flowbit.button} // افترض أن لديك ثيم للزر الثانوي
                color="gray" // أو استخدم اللون الافتراضي
                size="md"
                className="!p-2.5 !rounded-lg group" // جعل الزر مربعًا بحواف دائرية
                title="حفظ الطبيب"
              >
                <Heart
                  size={20}
                  className="text-slate-500 dark:text-slate-400 group-hover:text-rose-500 group-hover:fill-rose-500 transition-colors"
                />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* قسم التبويبات */}
      <div className="container mx-auto px-4 py-8 md:py-10">
        <Tabs
          aria-label="Doctor profile tabs"
          variant="underline"
          theme={customTabTheme}
        >
          <TabItem active title="معلومات عامة" icon={Info}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-primaryColor dark:text-primaryColor-400 mb-6 md:mb-8 text-center">
                معلومات وتفاصيل الطبيب
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10">
                <div className="lg:col-span-1">
                  <img
                    src={doctorImage || "/placeholder-doctor.jpg"}
                    alt={`${doctorName} - صورة رئيسية`}
                    className="w-full h-auto max-h-[400px] md:max-h-[450px] object-cover rounded-xl shadow-lg"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/placeholder-doctor.jpg";
                    }}
                  />
                </div>
                <div className="lg:col-span-2 space-y-5 md:space-y-6 p-1">
                  {[
                    {
                      icon: Briefcase,
                      label: "التخصص الدقيق",
                      value: doctorSpecialty,
                    },
                    {
                      icon: Mail,
                      label: "البريد الإلكتروني",
                      value: doctor.email,
                      type: "email",
                    },
                    {
                      icon: GraduationCap,
                      label: "سنوات الخبرة",
                      value: doctor.doctorProfile?.experienceYears
                        ? `${doctor.doctorProfile.experienceYears} سنة خبرة`
                        : "غير محدد",
                    },
                    {
                      icon: DollarSign,
                      label: "سعر الكشفية",
                      value: doctor.doctorProfile?.consultationPrice
                        ? `${doctor.doctorProfile.consultationPrice} دج`
                        : "غير محدد",
                    },
                  ].map(
                    (item) =>
                      item.value && ( // عرض العنصر فقط إذا كانت قيمته موجودة
                        <div
                          key={item.label}
                          className="flex items-start gap-3 md:gap-4"
                        >
                          <item.icon
                            size={22}
                            md={24}
                            className="text-primaryColor dark:text-primaryColor-400 mt-1 shrink-0"
                          />
                          <div>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                              {item.label}
                            </p>
                            <p
                              className={`font-semibold text-md md:text-lg text-slate-700 dark:text-slate-200 ${
                                item.type === "email" ? "break-all" : ""
                              }`}
                            >
                              {item.value}
                            </p>
                          </div>
                        </div>
                      )
                  )}

                  {/* أوقات العمل */}
                  <div className="flex items-start gap-3 md:gap-4">
                    <CalendarDays
                      size={22}
                      md={24}
                      className="text-primaryColor dark:text-primaryColor-400 mt-1 shrink-0"
                    />
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">
                        أوقات العمل
                      </p>
                      <FormatAvailability
                        availability={doctor.doctorProfile?.availability}
                      />
                    </div>
                  </div>

                  {/* تعليمات الحجز */}
                  {doctor.doctorProfile?.bookingInstructions && (
                    <div className="flex items-start gap-3 md:gap-4 pt-2">
                      <Info
                        size={22}
                        md={24}
                        className="text-primaryColor dark:text-primaryColor-400 mt-1 shrink-0"
                      />
                      <div>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">
                          تعليمات الحجز الهامة
                        </p>
                        <p className="text-md md:text-lg text-slate-700 dark:text-slate-200 whitespace-pre-line">
                          {doctor.doctorProfile.bookingInstructions}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </TabItem>

          <TabItem title="نبذة تعريفية" icon={HiUserCircle}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-primaryColor dark:text-primaryColor-400 mb-6 md:mb-8 text-center">
                عن د. {doctorName}
              </h3>
              {doctor.doctorProfile?.doctorBio ? (
                <p className="text-md md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed md:leading-loose whitespace-pre-line text-justify indent-6 md:indent-8">
                  {doctor.doctorProfile.doctorBio}
                </p>
              ) : (
                <p className="text-center text-slate-500 dark:text-slate-400 py-8">
                  لا توجد نبذة تعريفية متاحة حاليًا لهذا الطبيب.
                </p>
              )}
            </motion.div>
          </TabItem>

          <TabItem title="التقييمات" icon={ThumbsUp}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-primaryColor dark:text-primaryColor-400 mb-6 md:mb-8 text-center">
                تقييمات المرضى
              </h3>
              {/* قسم عرض التقييم العام */}
              <div className="text-center mb-8 md:mb-10">
                <p className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white">
                  {(doctor.doctorProfile?.rating || 0).toFixed(1)}
                </p>
                <div className="flex justify-center my-2">
                  <RenderStars
                    rating={doctor.doctorProfile?.rating || 0}
                    size="lg"
                  />
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  بناءً على {doctor.doctorProfile?.totalReviews || 0} تقييم
                </p>
              </div>

              {/* قسم إضافة تقييم */}
              <div className="max-w-2xl mx-auto mb-10 md:mb-12 p-5 md:p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg">
                <h4 className="text-lg md:text-xl font-semibold text-slate-700 dark:text-white mb-3 md:mb-4">
                  أضف تقييمك وملاحظاتك
                </h4>
                {/* هنا يمكنك إضافة حقول لنجوم التقييم */}
                <Textarea
                  id="reviewComment"
                  placeholder="اكتب تعليقك هنا..."
                  required
                  rows={4}
                  className="mb-3 !text-base dark:!bg-slate-700 dark:!text-slate-200 dark:!border-slate-600"
                  theme={flowbit.textarea} // تأكد من وجود تخصيص لـ Textarea
                />
                <Button
                  theme={flowbit.button}
                  color="primary"
                  className="w-full sm:w-auto sm:float-left !font-semibold"
                >
                  {" "}
                  {/* float-left لـ RTL */}
                  <Edit3 size={18} className="ml-2" /> إرسال التقييم
                </Button>
              </div>

              {/* قسم عرض المراجعات */}
              <div className="space-y-5 md:space-y-6">
                {reviews.length > 0 ? (
                  reviews.map((review, index) => (
                    <div
                      key={index}
                      className="p-4 md:p-5 bg-white dark:bg-slate-800 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-start gap-3 md:gap-4">
                        <img
                          className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover"
                          src={review.image || "/placeholder-avatar.png"}
                          alt={review.name}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/placeholder-avatar.png";
                          }}
                        />
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-1.5">
                            <h5 className="text-md md:text-lg font-semibold text-slate-800 dark:text-white">
                              {review.name}
                            </h5>
                            <RenderStars rating={review.rating} size="sm" />
                          </div>
                          <p className="text-xs text-slate-400 dark:text-slate-500 mb-2">
                            {review.date} - {review.time}
                          </p>
                          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                            {review.comment}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-slate-500 dark:text-slate-400 py-8">
                    لا توجد تقييمات متاحة حاليًا لهذا الطبيب.
                  </p>
                )}
              </div>
            </motion.div>
          </TabItem>

          <TabItem title="مقالات طبية" icon={BookOpen} disabled>
            {" "}
            {/* تعطيل التبويب مؤقتًا */}
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-primaryColor dark:text-primaryColor-400 mb-10 text-center">
              مقالات طبية مقدمة من د. {doctorName}
            </h3>
            <p className="text-center text-slate-500 dark:text-slate-400 py-8">
              هذا القسم غير متوفر حالياً. سيتم إضافة مقالات الطبيب قريباً.
            </p>
          </TabItem>
        </Tabs>
      </div>
    </div>
  );
}
