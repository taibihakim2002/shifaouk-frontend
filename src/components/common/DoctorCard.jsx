import { Button } from "flowbite-react";
import { Star } from "lucide-react";
import flowbit from "../../config/flowbit";
import { Link, useNavigate } from "react-router-dom";
import parseImgUrl from "../../utils/parseImgUrl";

export default function DoctorCard({ ele, key }) {
  const navigate = useNavigate();
  return (
    <div className="rounded-xl relative h-80 overflow-hidden group" key={key}>
      <img
        className="w-full h-full absolute object-cover group-hover:scale-105 transition"
        src={parseImgUrl(ele?.profileImage)}
        alt="Doctor"
      />
      <div className="absolute w-full h-56 bottom-0 left-0 bg-gradient-to-t from-secondaryColor to-transparent"></div>
      <div className="relative z-10 flex flex-col justify-end items-center h-full py-5 px-5">
        <h3 className="text-[18px] text-white font-bold  mb-3">
          {ele.fullName.first} {ele.fullName.second}
        </h3>
        <div className="flex justify-between w-full text-sm text-white mb-3">
          <p className=" ">اخصائي {ele.doctorProfile.specialization}</p>
          <div className="flex gap-1 items-center justify-center">
            <Star className="text-yellow-300" size={15} strokeWidth={3} />
            <p className="text-yellow-300 font-bold">
              {ele.doctorProfile.rating}
            </p>
          </div>
        </div>

        <Link to={`/doctors/${ele._id}`} className="w-full">
          <div className="w-full">
            <Button
              theme={flowbit.button}
              color="primary"
              className="w-full"
              size="sm"
            >
              إستشر الان
            </Button>
          </div>
        </Link>
      </div>
    </div>
  );
}
// import { Button, Badge } from "flowbite-react";
// import {
//   Star,
//   GraduationCap,
//   MapPin,
//   CircleDollarSign,
//   Clock,
// } from "lucide-react";
// import { Link } from "react-router-dom";
// import flowbit from "../../config/flowbit"; // تأكد من صحة مسار ملف الإعدادات
// import parseImgUrl from "../../utils/parseImgUrl"; // تأكد من صحة مسار الدالة

// // بيانات افتراضية للتعامل مع أي نقص في البيانات الواردة
// const getDoctorData = (ele) => ({
//   id: ele?._id || "1",
//   name: `${ele?.fullName?.first || "صدري"} ${
//     ele?.fullName?.second || "معاذ"
//   }`.trim(),
//   image: parseImgUrl(ele?.profileImage),
//   specialty: ele?.doctorProfile?.specialization || "استشاري امراض قلبية",
//   rating: ele?.doctorProfile?.rating || 4.5,
//   totalRatings: ele?.doctorProfile?.totalRatings || 230,
//   isOnline: ele?.doctorProfile?.isOnline ?? true,
//   experience: ele?.doctorProfile?.experienceYears || 15,
//   location: `${(ele.city, ele.state)}` || "غير محدد",
//   fee: ele?.doctorProfile?.consultationPrice || 150,
//   nextSlot: ele?.doctorProfile?.nextAvailableSlot || "اليوم، 04:30 م",
// });

// export default function DoctorCard({ ele }) {
//   const doctor = getDoctorData(ele);

//   return (
//     <div className="relative overflow-hidden bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 p-5 flex flex-col gap-4 w-full">
//       {/* ====== القسم العلوي: الصورة، الاسم، والتقييم ====== */}
//       <div className="absolute right-0 top-0 w-2 h-full bg-primaryColor"></div>

//       <div className="flex justify-between items-start">
//         <div className="flex items-center gap-4">
//           <div className="relative flex-shrink-0">
//             <img
//               src={doctor.image}
//               alt={`د. ${doctor.name}`}
//               className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
//             />
//             {doctor.isOnline && (
//               <span className="absolute bottom-1 right-1 block h-4 w-4 rounded-full bg-green-500 border-2 border-white" />
//             )}
//           </div>
//           <div>
//             <h3 className="text-xl font-bold text-gray-800">
//               د. {doctor.name}
//             </h3>
//             <p className="text-md text-primaryColor font-medium">
//               {doctor.specialty}
//             </p>
//           </div>
//         </div>
//         <div className="flex items-center gap-1.5 text-sm text-gray-600 flex-shrink-0">
//           <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
//           <span className="font-bold">{doctor.rating.toFixed(1)}</span>
//           <span className="text-gray-400">({doctor.totalRatings})</span>
//         </div>
//       </div>

//       {/* ====== الكلمات المفتاحية ====== */}

//       {/* ====== فاصل ====== */}
//       <hr className="my-2 border-gray-100" />

//       {/* ====== القسم السفلي: التفاصيل والأزرار ====== */}
//       <div className="">
//         {/* معلومات الطبيب */}
//         <div className="space-y-3 text-gray-700 pb-3 border-b">
//           <div className="flex items-center gap-2">
//             <GraduationCap className="w-5 h-5 text-primaryColor" />
//             <span>خبرة {doctor.experience} سنة طب قلب</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <MapPin className="w-5 h-5 text-primaryColor" />
//             <span>{doctor.location}</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <CircleDollarSign className="w-5 h-5 text-primaryColor" />
//             <span className="font-semibold">
//               مبلغ الاستشارة: {doctor.fee} دج
//             </span>
//           </div>
//         </div>

//         {/* الموعد والأزرار */}
//         <div className="flex flex-col items-stretch md:items-end gap-3 flex-shrink-0 pt-3">
//           <div className="flex items-stretch gap-2 w-full">
//             <Link to={`/doctors/${doctor.id}/profile`} className="flex-1">
//               <Button color="light" theme={flowbit.button} className="w-full">
//                 زيارة الملف الشخصي
//               </Button>
//             </Link>
//             <Link to={`/doctors/${doctor.id}/booking`} className="flex-1">
//               <Button color="primary" theme={flowbit.button} className="w-full">
//                 حجز موعد
//               </Button>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
