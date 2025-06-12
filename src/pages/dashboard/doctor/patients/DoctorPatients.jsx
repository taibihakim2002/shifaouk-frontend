// import React from "react";
// import flowbit from "../../../config/flowbit";
// import { Search } from "lucide-react";
// import { IoDocumentText, IoVideocam } from "react-icons/io5";
// import DashPageHeader from "../../../components/dashboard/common/DashPageHeader";
// import { Button, Label, TextInput } from "flowbite-react";
// import { MdAccessTimeFilled, MdCalendarToday } from "react-icons/md";
// import { FaFilter, FaInfoCircle, FaRegUserCircle } from "react-icons/fa";
// import { BsFillCalendarDateFill } from "react-icons/bs";
// import { IoIosVideocam } from "react-icons/io";
// import { GiHealthNormal } from "react-icons/gi";
// import { AiFillMessage } from "react-icons/ai";

// export default function DoctorPatients() {
//   return (
//     <div>
//       <DashPageHeader
//         Icon={IoDocumentText}
//         title="المرضى"
//         description="قم بادارة  مرضاك"
//       />
//       <div className="border rounded-lg p-10 flex items-center gap-8 jus flex-col md:flex-row mb-10">
//         <div className="flex flex-col md:flex-row w-full items-center gap-5">
//           <div className="flex flex-col gap-2 w-full md:w-44" dir="rtl">
//             <div className="flex flex-col gap-2 w-full md:w-44" dir="rtl">
//               <Label htmlFor="cities" className="flex items-center gap-2">
//                 <span>
//                   <GiHealthNormal />
//                 </span>
//                 <span>الحالة الصحية</span>
//               </Label>
//               <select
//                 className="w-full border p-1 rounded-md bg-gray-50 text-gray-900 border-gray-300 "
//                 id="cities"
//                 required
//                 defaultValue=""
//               >
//                 <option value="">اختر الحالة</option>
//                 <option>اليوم</option>
//                 <option>امس</option>
//                 <option>هذا الاسبوع</option>
//                 <option>هذا الشهر</option>
//               </select>
//             </div>
//           </div>
//           <div className="flex flex-col gap-2 w-full md:w-44" dir="rtl">
//             <Label htmlFor="cities" className="flex items-center gap-2">
//               <span>
//                 <FaFilter />
//               </span>
//               <span>ترتيب حسب</span>
//             </Label>
//             <select
//               className="w-full border p-1 rounded-md bg-gray-50 text-gray-900 border-gray-300 "
//               id="cities"
//               required
//               defaultValue=""
//             >
//               <option value="">التاريخ</option>
//               <option>مكتملة</option>
//               <option>معلقة</option>
//               <option>مؤكدة</option>
//               <option>مرفوضة </option>
//             </select>
//           </div>
//         </div>
//         <div className="flex flex-col gap-2 w-full md:max-w-[500px]">
//           <Label htmlFor="cities" className="flex items-center gap-2">
//             البحث عن مريض
//           </Label>
//           <TextInput
//             theme={flowbit.input}
//             color="primary"
//             className="w-full "
//             id="search"
//             type="text"
//             rightIcon={Search}
//             placeholder="ابحث عن مريض..."
//             required
//           />
//         </div>
//       </div>
//       <div className="border rounded-lg p-10 mb-10">
//         <h3 className="text-lg font-bold text-gray-600 mb-10">المرضى</h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//           <div className="w-full border rounded-lg p-5">
//             <div className="flex items-center gap-3 mb-3">
//               <img
//                 src="/doctor1.jpg"
//                 alt="doctor"
//                 className="w-20 h-20 object-cover rounded-full"
//               />
//               <div>
//                 <h3 className="text-gray-600 font-bold mb-2">بن علي علي</h3>
//                 <div className="flex items-center gap-2">
//                   <span className="text-sm rounded-full text-gray-400">
//                     27 سنة ،
//                   </span>
//                   <span className="text-sm text-gray-400"> ذكر</span>
//                 </div>
//               </div>
//             </div>

//             <div className=" text-gray-500">
//               <div className="flex items-center gap-2 text-sm mb-2">
//                 <span>اخر استشارة:</span>
//                 <p> 27 ماي 2025</p>
//               </div>
//               <p className="text-sm mb-3">الام في المفاصل وارتفاع ضغط الدم</p>
//             </div>
//             <div className="flex gap-2 items-center justify-between">
//               <p className="p-2 text-sm text-red-700 bg-red-200 rounded-lg">
//                 حالة حرجة
//               </p>
//               <div className="flex items-center gap-2">
//                 <Button theme={flowbit.button} color="light" size="sm">
//                   <span className="me-2">
//                     <AiFillMessage />
//                   </span>
//                   <span>مراسلة </span>
//                 </Button>
//                 <Button theme={flowbit.button} color="primary" size="sm">
//                   <span className="me-2">
//                     <FaInfoCircle />
//                   </span>
//                   <span>تفاصيل</span>
//                 </Button>
//               </div>
//             </div>
//           </div>
//           <div className="w-full border rounded-lg p-5">
//             <div className="flex items-center gap-3 mb-3">
//               <img
//                 src="/doctor1.jpg"
//                 alt="doctor"
//                 className="w-20 h-20 object-cover rounded-full"
//               />
//               <div>
//                 <h3 className="text-gray-600 font-bold mb-2">بن علي علي</h3>
//                 <div className="flex items-center gap-2">
//                   <span className="text-sm rounded-full text-gray-400">
//                     27 سنة ،
//                   </span>
//                   <span className="text-sm text-gray-400"> ذكر</span>
//                 </div>
//               </div>
//             </div>

//             <div className=" text-gray-500">
//               <div className="flex items-center gap-2 text-sm mb-2">
//                 <span>اخر استشارة:</span>
//                 <p> 27 ماي 2025</p>
//               </div>
//               <p className="text-sm mb-3">الام في المفاصل وارتفاع ضغط الدم</p>
//             </div>
//             <div className="flex gap-2 items-center justify-between">
//               <p className="p-2 text-sm text-red-700 bg-red-200 rounded-lg">
//                 حالة حرجة
//               </p>
//               <div className="flex items-center gap-2">
//                 <Button theme={flowbit.button} color="light" size="sm">
//                   <span className="me-2">
//                     <AiFillMessage />
//                   </span>
//                   <span>مراسلة </span>
//                 </Button>
//                 <Button theme={flowbit.button} color="primary" size="sm">
//                   <span className="me-2">
//                     <FaInfoCircle />
//                   </span>
//                   <span>تفاصيل</span>
//                 </Button>
//               </div>
//             </div>
//           </div>
//           <div className="w-full border rounded-lg p-5">
//             <div className="flex items-center gap-3 mb-3">
//               <img
//                 src="/doctor1.jpg"
//                 alt="doctor"
//                 className="w-20 h-20 object-cover rounded-full"
//               />
//               <div>
//                 <h3 className="text-gray-600 font-bold mb-2">بن علي علي</h3>
//                 <div className="flex items-center gap-2">
//                   <span className="text-sm rounded-full text-gray-400">
//                     27 سنة ،
//                   </span>
//                   <span className="text-sm text-gray-400"> ذكر</span>
//                 </div>
//               </div>
//             </div>

//             <div className=" text-gray-500">
//               <div className="flex items-center gap-2 text-sm mb-2">
//                 <span>اخر استشارة:</span>
//                 <p> 27 ماي 2025</p>
//               </div>
//               <p className="text-sm mb-3">الام في المفاصل وارتفاع ضغط الدم</p>
//             </div>
//             <div className="flex gap-2 items-center justify-between">
//               <p className="p-2 text-sm text-red-700 bg-red-200 rounded-lg">
//                 حالة حرجة
//               </p>
//               <div className="flex items-center gap-2">
//                 <Button theme={flowbit.button} color="light" size="sm">
//                   <span className="me-2">
//                     <AiFillMessage />
//                   </span>
//                   <span>مراسلة </span>
//                 </Button>
//                 <Button theme={flowbit.button} color="primary" size="sm">
//                   <span className="me-2">
//                     <FaInfoCircle />
//                   </span>
//                   <span>تفاصيل</span>
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { IoDocumentText, IoVideocam } from "react-icons/io5"; // Kept as per original

import { Button, Label, TextInput, Avatar, Badge } from "flowbite-react"; // Added Avatar, Badge

import {
  Search,
  Info,
  MessageCircle,
  Video as VideoIcon,
  Users,
  ArrowUpDown,
  AlertCircle,
  SlidersHorizontal,
} from "lucide-react"; // Added Users for header
import { GiHealthNormal } from "react-icons/gi";
import { FaFilter, FaInfoCircle, FaRegUserCircle } from "react-icons/fa";
// import { BsCalendarDateFill } from "react-icons/bs"; // Not used in the new filter design
// import useApiRequest from "../../../hooks/useApiRequest"; // Not used with static data
// import globalApi from "../../../utils/globalApi"; // Not used with static data
// import formatDateTime from "../../../utils/formatDateTime"; // Not used with static data
import { Link, useNavigate } from "react-router-dom"; // Added useNavigate
import flowbit from "../../../../config/flowbit";
import DashPageHeader from "../../../../components/dashboard/common/DashPageHeader";
import useApiRequest from "../../../../hooks/useApiRequest";
import globalApi from "../../../../utils/globalApi";
import formatDateTime from "../../../../utils/formatDateTime";

const getAge = (patient) => {
  const age = patient?.birthDate
    ? Math.floor(
        (new Date() - new Date(patient?.birthDate)) /
          (365.25 * 24 * 60 * 60 * 1000)
      )
    : null;
  return age;
};

// Static Data (as provided in the original component)
const patients = [
  {
    id: "1", // Added id for key
    name: "بن علي علي",
    avatar: "/doctor1.jpg", // Assuming this is a patient avatar for now
    age: 27,
    gender: "ذكر",
    lastConsultationDate: "27 مايو 2025",
    lastConsultationReason: "آلام في المفاصل وارتفاع ضغط الدم",
    healthStatus: "حالة حرجة",
    healthStatusColor: "failure", // for Badge color
    action: { label: "تفاصيل", type: "info", patientId: "1" }, // Added patientId
    messageAction: { label: "مراسلة", type: "chat", patientId: "1" },
  },
  {
    id: "2",
    name: "محمد معاوية",
    avatar: "/doctor1.jpg", // Placeholder, use actual patient avatar path
    age: 21,
    gender: "ذكر",
    lastConsultationDate: "21 مايو 2025", // Example
    lastConsultationReason: "فحص دوري",
    healthStatus: "مستقرة",
    healthStatusColor: "success",
    action: { label: "تفاصيل", type: "info", patientId: "2" },
    messageAction: { label: "مراسلة", type: "chat", patientId: "2" },
  },
  {
    id: "3",
    name: "سارة خالد",
    avatar: "/doctor2.jpg", // Placeholder
    age: 35,
    gender: "أنثى",
    lastConsultationDate: "15 يونيو 2025",
    lastConsultationReason: "متابعة حمل",
    healthStatus: "جيدة",
    healthStatusColor: "success",
    action: { label: "تفاصيل", type: "info", patientId: "3" },
    messageAction: { label: "مراسلة", type: "chat", patientId: "3" },
  },
  {
    id: "4",
    name: "أحمد الإبراهيم",
    avatar: "/doctor3.webp", // Placeholder
    age: 42,
    gender: "ذكر",
    lastConsultationDate: "10 يونيو 2025",
    lastConsultationReason: "فحص سكري",
    healthStatus: "تحتاج متابعة",
    healthStatusColor: "warning",
    action: { label: "تفاصيل", type: "info", patientId: "4" },
    messageAction: { label: "مراسلة", type: "chat", patientId: "4" },
  },
];

// Options for filters (example)
const healthStatusOptions = [
  { value: "", label: "كل الحالات الصحية" },
  { value: "critical", label: "حالة حرجة" },
  { value: "stable", label: "مستقرة" },
  { value: "good", label: "جيدة" },
  { value: "follow-up", label: "تحتاج متابعة" },
];

const sortOptionsData = [
  { value: "", label: "الفرز الافتراضي" },
  { value: "name_asc", label: "الاسم (أ-ي)" },
  { value: "name_desc", label: "الاسم (ي-أ)" },
  { value: "last_consultation_desc", label: "آخر استشارة (الأحدث)" },
  { value: "last_consultation_asc", label: "آخر استشارة (الأقدم)" },
];

export default function DoctorPatients() {
  const navigate = useNavigate();
  // State for filters - Add more as needed
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedHealthStatus, setSelectedHealthStatus] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [patients, setPatients] = useState();
  const filteredAndSortedPatients = patients
    ?.filter((patient) => {
      const matchesSearch =
        patient?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (patient?.lastConsultationReason &&
          patient?.lastConsultationReason
            .toLowerCase()
            .includes(searchQuery.toLowerCase()));
      const matchesStatus = selectedHealthStatus
        ? patient.healthStatusColor === selectedHealthStatus ||
          patient.healthStatus === selectedHealthStatus
        : true; // Allow filtering by text or color key
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (!sortBy) return 0;
      if (sortBy === "name_asc") return a.name.localeCompare(b.name, "ar");
      if (sortBy === "name_desc") return b.name.localeCompare(a.name, "ar");
      if (sortBy === "last_consultation_desc")
        return (
          new Date(b.lastConsultationDate) - new Date(a.lastConsultationDate)
        ); // Assuming dates are parsable
      if (sortBy === "last_consultation_asc")
        return (
          new Date(a.lastConsultationDate) - new Date(b.lastConsultationDate)
        );
      return 0;
    });

  const { data: apiResponse, loading, error, request } = useApiRequest(); // تم تغيير اسم data إلى apiResponse
  useEffect(() => {
    request(() => globalApi.getDoctorPatients());
  }, []);
  useEffect(() => {
    setPatients(apiResponse?.data);
  }, [apiResponse]);

  return (
    <div className="p-4 md:p-6 lg:p-8 dark:bg-gray-900 min-h-screen">
      <DashPageHeader
        Icon={Users} // Changed icon
        title="قائمة مرضاك"
        description="تصفح وقم بإدارة معلومات مرضاك المسجلين لديك."
      />

      {/* Filter and Search Bar */}
      <div className="mb-8 p-5 sm:p-6 bg-white rounded-xl shadow-xl border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        {/* عنوان القسم */}
        <div className="flex items-center justify-between mb-5 pb-3 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2">
            <SlidersHorizontal
              size={20}
              className="text-primaryColor dark:text-primaryColor-400"
            />
            تصفية المرضى وترتيبهم
          </h3>
        </div>

        {/* محتوى الفلاتر */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-5 items-end">
          {/* --- حقل البحث --- */}
          <div>
            <Label
              htmlFor="search-patients-input"
              className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              <span className="inline-flex items-center">
                <Search size={16} className="ml-1.5" />
                بحث عن مريض
              </span>
            </Label>
            <TextInput
              theme={flowbit.input}
              color="primary"
              id="search-patients-input"
              type="text"
              icon={Search}
              placeholder="ابحث بالاسم، سبب الاستشارة..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-sm"
            />
          </div>

          {/* --- فلتر الحالة الصحية --- */}
          <div>
            <Label
              htmlFor="health-status-filter"
              className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              <span className="inline-flex items-center">
                <GiHealthNormal className="ml-1.5 w-4 h-4 text-primaryColor dark:text-primaryColor-400" />
                الحالة الصحية
              </span>
            </Label>
            <select
              id="health-status-filter"
              className="w-full p-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryColor-300 focus:border-primaryColor-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primaryColor-500 dark:focus:border-primaryColor-500 shadow-sm transition-colors duration-200"
              value={selectedHealthStatus}
              onChange={(e) => setSelectedHealthStatus(e.target.value)}
            >
              {healthStatusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* --- فلتر ترتيب حسب --- */}
          <div>
            <Label
              htmlFor="sort-patients-select"
              className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              <span className="inline-flex items-center">
                <ArrowUpDown
                  size={16}
                  className="ml-1.5 text-primaryColor dark:text-primaryColor-400"
                />
                ترتيب حسب
              </span>
            </Label>
            <select
              id="sort-patients-select"
              className="w-full p-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryColor-300 focus:border-primaryColor-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primaryColor-500 dark:focus:border-primaryColor-500 shadow-sm transition-colors duration-200"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              {sortOptionsData.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Patients Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-lg border dark:border-gray-700 animate-pulse"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-20 h-20 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-1/2"></div>
                </div>
              </div>
              <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-5/6 mb-3"></div>
              <div className="flex justify-between items-center">
                <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded-full w-24"></div>
                <div className="flex gap-2">
                  <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded-lg w-20"></div>
                  <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded-lg w-20"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-10 text-red-500 dark:text-red-400 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <AlertCircle size={48} className="mx-auto mb-4" />
          <p className="text-lg">
            حدث خطأ أثناء تحميل بيانات المرضى. يرجى المحاولة مرة أخرى.
          </p>
        </div>
      ) : patients?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {patients?.map((patient) => (
            <div
              key={patient.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border dark:border-gray-700 flex flex-col"
            >
              <div className="p-5 flex-grow">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-gray-500">
                    <img
                      src={
                        patient.profileImage ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          patient.name
                        )}&background=4A5568&color=fff&font-size=0.45`
                      }
                      alt={patient.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                      {patient.fullName.first} {patient.fullName.second}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {getAge(patient) ? getAge(patient) : ""} سنة،{" "}
                      {patient.gender}
                    </p>
                  </div>
                </div>

                <div className="mb-3 space-y-1.5 text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex items-center">
                    <strong className="ml-1 font-medium text-gray-700 dark:text-gray-200">
                      آخر استشارة:
                    </strong>
                    <span>
                      {formatDateTime(
                        patient.lastConsultationDate,
                        "arabic-both"
                      )}
                    </span>
                  </div>
                  <div className="flex items-start">
                    <strong className="ml-1 font-medium text-gray-700 dark:text-gray-200 flex-shrink-0">
                      تشخيصها:
                    </strong>
                    <p className="line-clamp-2">
                      {patient.lastDiagnosis || "غير محدد"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-b-xl">
                <div className="flex items-center justify-between gap-3">
                  <Badge
                    color={patient.healthStatusColor || "gray"}
                    theme={flowbit.badge}
                    className="!text-xs !font-medium !px-2 !py-1"
                  >
                    {patient.lastConsultationStatus || "غير محدد"}
                  </Badge>
                  <div className="flex items-center gap-2">
                    {patient.messageAction && (
                      <Button
                        theme={flowbit.button}
                        color="light"
                        size="xs"
                        outline
                        className="!px-2.5 !py-1.5 dark:!border-gray-600 dark:!text-gray-300 dark:hover:!bg-gray-700"
                        onClick={() =>
                          handlePatientAction(patient.messageAction)
                        }
                      >
                        <MessageCircle size={14} className="ml-1" />
                        {patient.messageAction.label}
                      </Button>
                    )}
                    {patient.action && (
                      <Button
                        theme={flowbit.button}
                        color="primary"
                        size="xs"
                        className="!px-2.5 !py-1.5"
                        onClick={() => handlePatientAction(patient.action)}
                      >
                        <FaInfoCircle size={14} className="ml-1" />
                        {patient.action.label}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border dark:border-gray-700">
          <Users
            size={56}
            className="mx-auto text-gray-400 dark:text-gray-500 mb-4"
          />
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
            لا يوجد مرضى لعرضهم حاليًا
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            حاول تعديل معايير البحث أو تأكد من وجود مرضى مسجلين لديك.
          </p>
        </div>
      )}
    </div>
  );
}
