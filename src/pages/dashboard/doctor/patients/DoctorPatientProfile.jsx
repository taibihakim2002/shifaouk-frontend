import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  Button,
  Avatar,
  Badge,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Dropdown,
  DropdownItem,
  DropdownDivider,
} from "flowbite-react";
import DashPageHeader from "../../../../components/dashboard/common/DashPageHeader";
import flowbit from "../../../../config/flowbit";
import useApiRequest from "../../../../hooks/useApiRequest";
import globalApi from "../../../../utils/globalApi";
import formatDateTime from "../../../../utils/formatDateTime";
import parseImgUrl from "../../../../utils/parseImgUrl";
import {
  HiOutlineUserCircle,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
  HiOutlineCalendar,
  HiOutlineIdentification,
  HiOutlineArrowLeft,
  HiOutlineEye,
  HiOutlineDotsVertical,
  HiOutlineClipboardList,
} from "react-icons/hi";
import { FaHeartbeat, FaAllergies, FaPlus } from "react-icons/fa";
import { GiMedicalDrip, GiMedicalPack } from "react-icons/gi";
import {
  Cake,
  Languages,
  Users as UsersIcon,
  AlertCircle,
  MessageSquare,
  Video,
} from "lucide-react";
import { HiMiniPlusCircle } from "react-icons/hi2";
import { MdOutlineHistory } from "react-icons/md";

// --- بيانات ثابتة (مستخدمة للعرض في هذا المثال) ---

const mockPatientData = {
  _id: "patient123",
  fullName: {
    first: "فاطمة",
    second: "الزهراء",
  },
  email: "fatima.zahra@example.com",
  phone: "0550123456",
  profileImage: "/doctor2.jpg", // استخدام صورة موجودة كمثال
  state: "وهران",
  city: "وهران",
  isActive: true,
  createdAt: "2023-01-15T10:30:00Z",
  patientProfile: {
    gender: "female",
    birthDate: "1990-05-20T00:00:00Z",
    medicalHistory: [
      "عملية جراحية (استئصال الزائدة) عام 2015",
      "لا يوجد تاريخ مرضي عائلي مهم",
    ],
    allergies: ["بنسلين (يسبب طفح جلدي)"],
    chronicDiseases: ["ربو خفيف (تستخدم بخاخ عند اللزوم)"],
    preferredLanguages: ["العربية", "الفرنسية"],
  },
};

const mockConsultationHistory = [
  {
    _id: "consult1",
    date: "2024-05-10T14:00:00Z",
    type: "video",
    mainComplaint: "فحص دوري ومتابعة حالة الربو",
    status: "completed",
  },
  {
    _id: "consult2",
    date: "2024-02-22T09:30:00Z",
    type: "chat",
    mainComplaint: "استفسار بخصوص نتيجة تحليل دم",
    status: "completed",
  },
  {
    _id: "consult3",
    date: "2023-11-05T18:00:00Z",
    type: "video",
    mainComplaint: "أعراض زكام حادة مع سعال",
    status: "completed",
  },
];
// --- نهاية البيانات الثابتة ---

// --- المكونات المساعدة ---
const DetailItem = ({ icon: Icon, label, value, children }) => (
  <div className="flex items-start py-3 border-b border-gray-100 dark:border-gray-700/50 last:border-b-0">
    {Icon && (
      <Icon className="w-5 h-5 text-primaryColor-600 dark:text-primaryColor-400 flex-shrink-0 mt-1 ml-3" />
    )}
    <div className="flex-1 text-right">
      <p className="text-sm text-gray-500 dark:text-gray-400">{label}:</p>
      {children ? (
        <div className="text-md font-medium text-gray-800 dark:text-gray-200">
          {children}
        </div>
      ) : (
        <p className="text-md font-semibold text-gray-800 dark:text-gray-200">
          {value || <span className="italic text-gray-400">غير متوفر</span>}
        </p>
      )}
    </div>
  </div>
);

const MedicalListItem = ({ item }) => (
  <li className="flex items-start">
    <FaHeartbeat className="w-3 h-3 text-red-400 mt-1.5 ml-2 flex-shrink-0" />
    <span className="text-gray-700 dark:text-gray-300">{item}</span>
  </li>
);

// --- المكون الرئيسي ---
export default function DoctorPatientProfile() {
  const { id: patientId } = useParams();
  const navigate = useNavigate();

  // استخدام البيانات الثابتة بدلاً من استدعاء API
  const [patientData, setPatientData] = useState(mockPatientData);
  const [consultations, setConsultations] = useState(mockConsultationHistory);
  const [loading, setLoading] = useState(false); // محاكاة انتهاء التحميل
  const [error, setError] = useState(null); // محاكاة عدم وجود خطأ

  const age = patientData.patientProfile?.birthDate
    ? Math.floor(
        (new Date() - new Date(patientData.patientProfile.birthDate)) /
          (365.25 * 24 * 60 * 60 * 1000)
      )
    : null;

  if (loading) {
    return <div className="p-8">جاري التحميل...</div>; // يمكنك وضع هيكل تحميل هنا
  }

  if (error || !patientData) {
    return (
      <div className="p-8">خطأ في تحميل البيانات أو المريض غير موجود.</div>
    );
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 dark:bg-gray-900 min-h-screen" dir="rtl">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 pb-4 border-b dark:border-gray-700">
        <DashPageHeader
          Icon={HiOutlineUserCircle}
          title={`ملف المريض: ${patientData.fullName?.first || ""} ${
            patientData.fullName?.second || ""
          }`}
          description="عرض شامل لمعلومات المريض وسجله الطبي والاستشاري."
        />
        <Button
          color="light"
          onClick={() => navigate("/dashboard/patients")}
          theme={flowbit.button}
          className="dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700 flex-shrink-0"
        >
          <HiOutlineArrowLeft className="ml-2 h-5 w-5 transform scale-x-[-1]" />{" "}
          العودة إلى قائمة المرضى
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start">
        {/* --- عامود ملخص المريض (على اليمين في RTL) --- */}
        <div className="lg:col-span-5 xl:col-span-4 w-full">
          <div className="sticky top-24">
            <Card
              theme={flowbit.card}
              className="shadow-xl dark:bg-gray-800 !p-0"
            >
              <div className="flex flex-col items-center p-6 pt-8">
                <Avatar
                  img={
                    patientData.profileImage
                      ? parseImgUrl(patientData.profileImage)
                      : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          patientData.fullName?.first || "P"
                        )}+${encodeURIComponent(
                          patientData.fullName?.second || ""
                        )}&background=6366F1&color=fff&font-size=0.45&bold=true`
                  }
                  theme={flowbit.avatar}
                  rounded
                  size="xl"
                  bordered
                  color="indigo"
                  className="mb-4 ring-4 ring-white dark:ring-gray-700 object-cover"
                />
                <h5 className="mb-1 text-xl md:text-2xl font-bold text-gray-900 dark:text-white text-center">
                  {patientData.fullName?.first} {patientData.fullName?.second}
                </h5>
                <span className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                  {patientData.email}
                </span>
                <Badge
                  color={patientData.isActive ? "success" : "failure"}
                  theme={flowbit.badge}
                  className="!text-sm !px-3 !py-1"
                >
                  {patientData.isActive ? "حساب نشط" : "حساب غير نشط"}
                </Badge>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-4 space-y-3.5 text-sm">
                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  {" "}
                  <HiOutlinePhone
                    size={18}
                    className="text-primaryColor-500 flex-shrink-0"
                  />{" "}
                  <span>{patientData.phone || "لم يضف رقم هاتف"}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  {" "}
                  <Cake
                    size={17}
                    className="text-primaryColor-500 flex-shrink-0"
                  />{" "}
                  <span>{age ? `${age} سنة` : "تاريخ الميلاد غير محدد"}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  {" "}
                  <HiOutlineIdentification
                    size={18}
                    className="text-primaryColor-500 flex-shrink-0"
                  />{" "}
                  <span>
                    {patientData.patientProfile?.gender === "male"
                      ? "ذكر"
                      : "أنثى"}
                  </span>
                </div>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 p-4">
                <div className="flex flex-col gap-2 w-full">
                  <Button
                    as={Link}
                    to={`/dashboard/chat/${patientData._id}`}
                    color="primary"
                    theme={flowbit.button}
                    size="sm"
                    className="flex-grow justify-center shadow-sm hover:shadow-md"
                  >
                    <MessageSquare size={16} className="ml-2" /> مراسلة المريض
                  </Button>
                  <Button
                    as={Link}
                    to={`/dashboard/appointments/new?patientId=${patientData._id}`}
                    color="light"
                    theme={flowbit.button}
                    size="sm"
                    className="flex-grow justify-center dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600 shadow-sm hover:shadow-md"
                  >
                    <HiMiniPlusCircle className="ml-2 h-4 w-4" /> حجز موعد جديد
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* --- عامود التفاصيل (على اليسار في RTL) --- */}
        <div className="lg:col-span-7 xl:col-span-8 w-full space-y-6">
          {/* قسم السجل الطبي */}
          <Card theme={flowbit.card} className="shadow-xl dark:bg-gray-800">
            <h3 className="text-xl font-semibold text-primaryColor dark:text-primaryColor-400 mb-4 flex items-center gap-2 border-b dark:border-gray-700 pb-3">
              <GiMedicalPack size={22} /> السجل الطبي للمريض
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-md font-semibold text-gray-700 dark:text-gray-200 mb-1.5 flex items-center gap-2">
                  <MdOutlineHistory className="text-indigo-500" />
                  التاريخ الطبي:
                </h4>
                {patientData.patientProfile?.medicalHistory?.length > 0 ? (
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-300 bg-slate-50 dark:bg-gray-700/60 p-3 rounded-md border dark:border-gray-600/50">
                    {patientData.patientProfile.medicalHistory.map(
                      (item, i) => (
                        <li key={i}>{item}</li>
                      )
                    )}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-400 italic">
                    لا يوجد تاريخ طبي مسجل.
                  </p>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-md font-semibold text-gray-700 dark:text-gray-200 mb-1.5 flex items-center gap-2">
                    <FaAllergies className="text-orange-500" />
                    الحساسية:
                  </h4>
                  {patientData.patientProfile?.allergies?.length > 0 ? (
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-300 bg-slate-50 dark:bg-gray-700/60 p-3 rounded-md border dark:border-gray-600/50">
                      {patientData.patientProfile.allergies.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-400 italic">
                      لا توجد حساسية مسجلة.
                    </p>
                  )}
                </div>
                <div>
                  <h4 className="text-md font-semibold text-gray-700 dark:text-gray-200 mb-1.5 flex items-center gap-2">
                    <FaHeartbeat className="text-red-500" />
                    الأمراض المزمنة:
                  </h4>
                  {patientData.patientProfile?.chronicDiseases?.length > 0 ? (
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-300 bg-slate-50 dark:bg-gray-700/60 p-3 rounded-md border dark:border-gray-600/50">
                      {patientData.patientProfile.chronicDiseases.map(
                        (item, i) => (
                          <li key={i}>{item}</li>
                        )
                      )}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-400 italic">
                      لا توجد أمراض مزمنة مسجلة.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </Card>

          {/* قسم الاستشارات السابقة */}
          <Card theme={flowbit.card} className="shadow-xl dark:bg-gray-800">
            <h3 className="text-xl font-semibold text-primaryColor dark:text-primaryColor-400 mb-4 flex items-center gap-2 border-b dark:border-gray-700 pb-3">
              <HiOutlineClipboardList size={22} /> سجل الاستشارات المكتملة
            </h3>
            <div className="overflow-x-auto">
              <Table
                hoverable
                className="min-w-[700px] text-right dark:divide-gray-700"
              >
                <TableHead className="bg-slate-50 dark:bg-gray-700 text-xs text-gray-600 dark:text-gray-300 uppercase">
                  <TableHeadCell className="p-3 px-4">
                    تاريخ الاستشارة
                  </TableHeadCell>
                  <TableHeadCell className="p-3 px-4">نوعها</TableHeadCell>
                  <TableHeadCell className="p-3 px-4">
                    الشكوى الرئيسية
                  </TableHeadCell>
                  <TableHeadCell className="p-3 px-4 text-center">
                    الإجراء
                  </TableHeadCell>
                </TableHead>
                <TableBody className="divide-y dark:divide-gray-700">
                  {consultations.length > 0 ? (
                    consultations.map((consult) => (
                      <TableRow
                        key={consult._id}
                        className="bg-white dark:bg-gray-800 hover:bg-slate-50 dark:hover:bg-gray-700/50"
                      >
                        <TableCell className="p-3 px-4 text-sm text-gray-600 dark:text-gray-300">
                          {formatDateTime(consult.date, "arabicDate")}
                        </TableCell>
                        <TableCell className="p-3 px-4">
                          <div className="inline-flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-300">
                            {consult.type === "video" ? (
                              <Video size={16} className="text-blue-500" />
                            ) : (
                              <MessageSquare
                                size={16}
                                className="text-purple-500"
                              />
                            )}
                            <span>
                              {consult.type === "video" ? "عن بعد" : "محادثة"}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="p-3 px-4 text-sm text-gray-500 dark:text-gray-400">
                          {consult.mainComplaint}
                        </TableCell>
                        <TableCell className="p-3 px-4 text-center">
                          <Button
                            as={Link}
                            to={`/dashboard/appointments/${consult._id}`}
                            theme={flowbit.button}
                            color="light"
                            size="xs"
                            className="!px-3 !py-1.5 dark:!border-gray-600 dark:!text-gray-300 dark:hover:!bg-gray-700"
                          >
                            <HiOutlineEye size={16} className="ml-1.5" /> عرض
                            التقرير
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={4}
                        className="text-center py-8 text-gray-500 dark:text-gray-400"
                      >
                        لا توجد استشارات مكتملة لعرضها.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
