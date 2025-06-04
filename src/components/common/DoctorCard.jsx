// import { Button } from "flowbite-react";
// import { Star } from "lucide-react";
// import flowbit from "../../config/flowbit";
// import { Link, useNavigate } from "react-router-dom";
// import parseImgUrl from "../../utils/parseImgUrl";

// export default function DoctorCard({ ele, key }) {
//   const navigate = useNavigate();
//   return (
//     <div className="rounded-xl relative h-80 overflow-hidden group" key={key}>
//       <img
//         className="w-full h-full absolute object-cover group-hover:scale-105 transition"
//         src={parseImgUrl(ele?.profileImage)}
//         alt="Doctor"
//       />
//       <div className="absolute w-full h-56 bottom-0 left-0 bg-gradient-to-t from-secondaryColor to-transparent"></div>
//       <div className="relative z-10 flex flex-col justify-end items-center h-full py-5 px-5">
//         <h3 className="text-[18px] text-white font-bold  mb-3">
//           {ele.fullName.first} {ele.fullName.second}
//         </h3>
//         <div className="flex justify-between w-full text-sm text-white mb-3">
//           <p className=" ">اخصائي {ele.doctorProfile.specialization}</p>
//           <div className="flex gap-1 items-center justify-center">
//             <Star className="text-yellow-300" size={15} strokeWidth={3} />
//             <p className="text-yellow-300 font-bold">
//               {ele.doctorProfile.rating}
//             </p>
//           </div>
//         </div>

//         <Link to={`/doctors/${ele._id}`} className="w-full">
//           <div className="w-full">
//             <Button
//               theme={flowbit.button}
//               color="primary"
//               className="w-full"
//               size="sm"
//             >
//               إستشر الان
//             </Button>
//           </div>
//         </Link>
//       </div>
//     </div>
//   );
// }

import { Button } from "flowbite-react";
import { Star, ShieldCheck } from "lucide-react"; // ShieldCheck كأيقونة إضافية محتملة
import flowbit from "../../config/flowbit"; // تأكد من أن هذا الملف مهيأ بشكل صحيح
import { Link } from "react-router-dom"; // useNavigate غير مستخدم في هذا المكون مباشرة
import parseImgUrl from "../../utils/parseImgUrl";

// مكون لإنشاء النجوم بناءً على التقييم
const RatingStars = ({ rating, starSize = 16, className = "" }) => {
  const totalStars = 5;
  const fullStars = Math.floor(rating);
  // const halfStar = rating % 1 >= 0.5; // إذا أردت دعم نصف نجمة
  const emptyStars = totalStars - fullStars; // - (halfStar ? 1 : 0);

  return (
    <div className={`flex items-center ${className}`}>
      {[...Array(fullStars)].map((_, i) => (
        <Star
          key={`full-${i}`}
          size={starSize}
          className="text-amber-400 fill-amber-400"
          strokeWidth={1.5}
        />
      ))}
      {/* Placeholder for half star logic if needed */}
      {[...Array(emptyStars)].map((_, i) => (
        <Star
          key={`empty-${i}`}
          size={starSize}
          className="text-slate-300 dark:text-slate-600 fill-slate-300 dark:fill-slate-600"
          strokeWidth={1.5}
        />
      ))}
      {rating > 0 && (
        <span className="ml-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
          ({rating % 1 === 0 ? rating.toFixed(0) : rating.toFixed(1)}){" "}
          {/* عرض رقم التقييم */}
        </span>
      )}
    </div>
  );
};

export default function DoctorCard({ ele }) {
  // تمت إزالة key من props، يجب أن يوضع في مكان استدعاء المكون ضمن map
  const doctorName = `${ele.fullName.first || ""} ${
    ele.fullName.second || ""
  }`.trim();
  const doctorImage = parseImgUrl(ele?.profileImage);
  const doctorSpecialty = ele.doctorProfile?.specialization || "تخصص عام";
  const doctorRating = ele.doctorProfile?.rating || 0;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg group transform-gpu transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1.5 flex flex-col overflow-hidden h-full min-h-[380px] sm:min-h-[400px] md:min-h-[420px]">
      {/* منطقة الصورة */}
      <div className="relative w-full h-52 sm:h-56 md:h-60 lg:h-56 xl:h-60 2xl:h-64 overflow-hidden">
        <img
          className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-350 ease-in-out"
          src={doctorImage} // صورة احتياطية
          alt={`د. ${doctorName}`}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/placeholder-doctor.jpg";
          }} // معالجة خطأ تحميل الصورة
        />
        {/* يمكنك إضافة شارة هنا مثل "متصل الآن" أو "مميز" */}
        {/* <span className="absolute top-3 right-3 bg-green-500 text-white text-xs font-semibold px-2.5 py-1 rounded-md shadow">متصل</span> */}
      </div>

      {/* منطقة المحتوى */}
      <div className="p-4 md:p-5 flex flex-col flex-grow text-center">
        <h3
          className="text-lg md:text-xl font-bold text-slate-800 dark:text-white mb-1 truncate"
          title={`د. ${doctorName}`}
        >
          د. {doctorName}
        </h3>
        <p
          className="text-sm text-primary dark:text-primary-400 font-medium mb-2.5 md:mb-3 capitalize truncate"
          title={doctorSpecialty}
        >
          {doctorSpecialty}
        </p>

        {/* عرض التقييم */}
        <RatingStars
          rating={doctorRating}
          starSize={18}
          className="justify-center mb-3 md:mb-4"
        />

        {/* زر الإجراء */}
        <div className="mt-auto w-full pt-2">
          {" "}
          {/* mt-auto لدفع الزر للأسفل */}
          <Link to={`/doctors/${ele._id}`} className="block w-full">
            <Button
              theme={flowbit.button} // افتراض أن لديك تخصيص لـ primary
              color="primary" // كخيار احتياطي
              className="w-full !font-semibold !py-2.5 md:!py-3 !text-sm md:!text-base group/button" // فئات لفرض النمط إذا لزم الأمر
              size="sm" // حجم الزر من Flowbite (قد يتم تجاوز الحشو الداخلي والنص بالفئات أعلاه)
            >
              <span className="transition-all duration-300 group-hover/button:tracking-wider">
                عرض الملف الشخصي
              </span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
