import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  Button,
  Avatar, // لعرض صورة الطبيب
  Badge, // لعرض حالة الحساب
  Card, // لتغليف أقسام المعلومات
  Spinner, // لعرض مؤشر التحميل
  // Dropdown, DropdownItem, // إذا كانت هناك إجراءات إضافية
} from "flowbite-react";
import DashPageHeader from "../../../../components/dashboard/common/DashPageHeader";
import flowbit from "../../../../config/flowbit";
import useApiRequest from "../../../../hooks/useApiRequest";
import globalApi from "../../../../utils/globalApi";
import formatDateTime from "../../../../utils/formatDateTime";
import parseImgUrl from "../../../../utils/parseImgUrl";
import {
  // أيقونة لعنوان الصفحة
  FaStethoscope,
  FaUserMd,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaInfoCircle,
  FaBriefcase,
  FaGraduationCap,
  FaVenusMars,
  FaAddressCard,
} from "react-icons/fa"; // أيقونات متنوعة
import {
  HiOutlineArrowLeft,
  HiOutlinePencil, // إذا أردت إضافة زر تعديل لاحقًا
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineExclamationCircle,
  HiOutlineInformationCircle,
  HiOutlineDocumentText,
  HiOutlineLocationMarker,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineCalendar,
  HiOutlineClipboardList,
} from "react-icons/hi";
import { BiSolidFilePdf } from "react-icons/bi";
import { CgClose } from "react-icons/cg"; // إذا كانت تستخدم لعرض حالة "غير مفعل"
import Loading from "../../../../components/common/Loading"; // افترض وجود مكون Loading
import { FaUserDoctor } from "react-icons/fa6";
import { AlertCircle } from "lucide-react";

// Skeleton component for loading state
const ProfileSkeleton = () => (
  <div className="animate-pulse mt-8">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start">
      <div className="lg:col-span-4 xl:col-span-3 w-full">
        <div className="p-6 py-8 bg-white dark:bg-gray-800 rounded-xl shadow-xl border dark:border-gray-700">
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 bg-gray-300 dark:bg-gray-600 rounded-full mb-4"></div>
            <div className="h-7 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-500 rounded w-1/2 mb-1"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-500 rounded w-1/3 mb-4"></div>
            <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded-full w-24 mb-4"></div>
            <div className="space-y-2 w-full">
              <div className="h-5 bg-gray-200 dark:bg-gray-500 rounded w-full"></div>
              <div className="h-5 bg-gray-200 dark:bg-gray-500 rounded w-full"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:col-span-8 xl:col-span-9 w-full space-y-6">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-xl border dark:border-gray-700 min-h-[150px]"
          >
            <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/3 mb-6"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-500 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-500 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// DetailItem component لعرض المعلومات بشكل منظم
const DetailItem = ({
  icon: Icon,
  label,
  value,
  children,
  valueClassName = "text-gray-800 dark:text-gray-100",
}) => (
  <div className="flex flex-col sm:flex-row py-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0 sm:gap-4">
    <div className="flex-shrink-0 w-full sm:w-auto sm:min-w-[150px] md:min-w-[180px] mb-1 sm:mb-0 flex items-center">
      {Icon && (
        <Icon className="w-5 h-5 text-primaryColor dark:text-primaryColor-400 flex-shrink-0 ml-2.5" />
      )}
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
        {label}:
      </p>
    </div>
    <div className="flex-1 text-right">
      {" "}
      {/* محاذاة لليمين للغة العربية */}
      {children ? (
        <div className={`text-sm sm:text-base ${valueClassName}`}>
          {children}
        </div>
      ) : (
        <p className={`text-sm sm:text-base font-semibold ${valueClassName}`}>
          {value || (
            <span className="text-gray-400 dark:text-gray-500 italic">
              غير متوفر
            </span>
          )}
        </p>
      )}
    </div>
  </div>
);

// دالة لتحديد معلومات عرض حالة الحساب
const getDoctorStatusDisplay = (status) => {
  switch (status) {
    case "approved":
      return {
        text: "حساب مفعل",
        color: "success",
        icon: HiOutlineCheckCircle,
      };
    case "pending":
      return { text: "قيد المراجعة", color: "warning", icon: HiOutlineClock };
    case "rejected":
      return {
        text: "مرفوض",
        color: "failure",
        icon: HiOutlineExclamationCircle,
      };
    case "suspended":
      return {
        text: "حساب معلّق",
        color: "pink",
        icon: HiOutlineExclamationCircle,
      };
    default:
      return {
        text: status || "غير معروف",
        color: "gray",
        icon: HiOutlineInformationCircle,
      };
  }
};

export default function AdminDoctorProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  // const { showToast } = useToastStore(); // غير مستخدم في وضع العرض فقط

  const {
    data: doctorApiResponse, // تم تغيير اسم data لتجنب التعارض
    error: doctorError,
    loading: doctorLoading,
    request: doctorRequest,
  } = useApiRequest();

  const [doctorData, setDoctorData] = useState(null); // حالة لتخزين بيانات الطبيب الفعلية

  useEffect(() => {
    if (id) {
      doctorRequest(() => globalApi.getDoctorById(id));
    }
  }, [id]); // يجب إضافة doctorRequest لأنه دالة خارجية

  useEffect(() => {
    if (doctorApiResponse?.data) {
      setDoctorData(doctorApiResponse.data);
    }
  }, [doctorApiResponse]);

  if (doctorLoading && !doctorData) {
    // عرض هيكل التحميل فقط إذا لم تكن هناك بيانات سابقة
    return (
      <div
        className="p-4 md:p-6 lg:p-8 dark:bg-gray-900 min-h-screen"
        dir="rtl"
      >
        <DashPageHeader
          Icon={FaUserDoctor}
          title="ملف الطبيب"
          description="جاري تحميل تفاصيل الطبيب..."
        />
        <ProfileSkeleton />
      </div>
    );
  }

  if (doctorError) {
    return (
      <div
        className="p-4 md:p-6 lg:p-8 dark:bg-gray-900 min-h-screen flex flex-col items-center justify-center text-center"
        dir="rtl"
      >
        <DashPageHeader Icon={FaUserDoctor} title="ملف الطبيب" />
        <div className="py-10">
          <AlertCircle size={56} className="mx-auto text-red-400 mb-5" />
          <h3 className="text-2xl font-semibold text-red-500 dark:text-red-400 mb-3">
            {doctorError ? "خطأ في تحميل البيانات" : "الطبيب غير موجود"}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {doctorError
              ? "حدث خطأ أثناء محاولة جلب تفاصيل الطبيب. يرجى المحاولة مرة أخرى."
              : "لم نتمكن من العثور على الطبيب المطلوب. يرجى التأكد من صحة المعرّف."}
          </p>
          <Button
            color="light"
            onClick={() => navigate(-1)}
            theme={flowbit.button}
            className="dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700"
          >
            <HiOutlineArrowLeft className="ml-2 h-5 w-5 transform scale-x-[-1]" />{" "}
            العودة للخلف
          </Button>
        </div>
      </div>
    );
  }

  const statusInfo = getDoctorStatusDisplay(doctorData?.doctorProfile?.status);

  return (
    <div className="p-4 md:p-6 lg:p-8 dark:bg-gray-900 min-h-screen" dir="rtl">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 pb-4 border-b dark:border-gray-700">
        <DashPageHeader
          Icon={FaUserDoctor}
          title={`ملف الطبيب: ${doctorData?.fullName?.first || ""} ${
            doctorData?.fullName?.second || ""
          }`}
          description="عرض تفصيلي لبيانات الطبيب المسجلة في المنصة."
        />
        {/* يمكنك إضافة أزرار إجراءات عامة هنا إذا أردت، مثل زر تعديل الذي ينقل لصفحة التعديل */}
        <Button
          color="light"
          onClick={() => navigate("/dashboard/doctors")}
          theme={flowbit.button}
          className="dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700 flex-shrink-0"
        >
          <HiOutlineArrowLeft className="ml-2 h-5 w-5 transform scale-x-[-1]" />{" "}
          العودة إلى قائمة الاطباء
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start">
        {/* --- عامود ملخص الطبيب (على اليمين في RTL) --- */}
        <div className="lg:col-span-5 xl:col-span-4 w-full">
          <Card
            theme={flowbit.card}
            className="shadow-xl dark:bg-gray-800 !p-0 sticky top-24"
          >
            <div className="flex flex-col items-center p-6 pt-8">
              <Avatar
                img={
                  doctorData?.profileImage
                    ? parseImgUrl(doctorData?.profileImage)
                    : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        doctorData?.fullName?.first || "D"
                      )}+${encodeURIComponent(
                        doctorData?.fullName?.second || ""
                      )}&background=048CFF&color=fff&font-size=0.45&bold=true`
                }
                rounded
                size="xl"
                bordered
                color="primary" // يمكن تغييره ليتناسب مع primaryColor
                className="mb-4 shadow-lg ring-4 ring-white dark:ring-gray-700"
              />
              <h5 className="mb-1 text-xl md:text-2xl font-bold text-gray-900 dark:text-white text-center">
                د. {doctorData?.fullName?.first} {doctorData?.fullName?.second}
              </h5>
              <span className="text-sm font-medium text-primaryColor dark:text-primaryColor-400 mb-1">
                {doctorData?.doctorProfile?.specialization || "تخصص غير محدد"}
              </span>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                {doctorData?.doctorProfile?.workplace || "مكان عمل غير محدد"}
              </p>
              <div className="mb-4">
                <Badge
                  color={statusInfo.color} // يجب أن تكون هذه الألوان معرفة في ثيم Badge
                  icon={statusInfo.icon}
                  theme={flowbit.badge} // أو استخدم className مباشرة إذا لم يكن الثيم يدعم الألوان الديناميكية بالكامل
                  className={`!text-sm !font-medium !px-3 !py-1 ${
                    statusInfo.colorClasses || ""
                  }`} // استخدم colorClasses من getStatusDisplayInfo
                >
                  {statusInfo.text}
                </Badge>
              </div>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-4 space-y-3 text-sm">
              <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                {" "}
                <HiOutlineMail
                  size={18}
                  className="text-gray-500 flex-shrink-0"
                />{" "}
                <span>{doctorData?.email}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                {" "}
                <HiOutlinePhone
                  size={18}
                  className="text-gray-500 flex-shrink-0"
                />{" "}
                <span>{doctorData?.phone}</span>
              </div>
              {doctorData?.state && (
                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  {" "}
                  <HiOutlineLocationMarker
                    size={18}
                    className="text-gray-500 flex-shrink-0"
                  />{" "}
                  <span>
                    {doctorData?.state}
                    {doctorData?.city ? `، ${doctorData?.city}` : ""}
                  </span>
                </div>
              )}
              {doctorData?.gender && (
                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  {" "}
                  <FaVenusMars
                    size={16}
                    className="text-gray-500 flex-shrink-0"
                  />{" "}
                  <span>
                    {doctorData?.gender === "male"
                      ? "ذكر"
                      : doctorData?.gender === "female"
                      ? "أنثى"
                      : doctorData?.gender}
                  </span>
                </div>
              )}
              <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                {" "}
                <HiOutlineClock
                  size={18}
                  className="text-gray-500 flex-shrink-0"
                />{" "}
                <span>
                  مسجل منذ: {formatDateTime(doctorData?.createdAt, "both")}
                </span>
              </div>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 p-4">
              <div className="flex flex-col gap-2 w-full">
                <Button
                  color="primary"
                  onClick={() =>
                    navigate(`/dashboard/doctors/edit/${doctorData?._id}`)
                  }
                  theme={flowbit.button}
                  size="sm"
                  className="flex-grow justify-center shadow-sm hover:shadow-md"
                >
                  <HiOutlinePencil className="ml-2 h-4 w-4" /> تعديل الملف
                  الشخصي
                </Button>
                <Button
                  color="light"
                  onClick={() =>
                    navigate(`/dashboard/apointments?doctor=${doctorData?._id}`)
                  }
                  theme={flowbit.button}
                  size="sm"
                  className="flex-grow justify-center dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600 shadow-sm hover:shadow-md"
                >
                  <HiOutlineClipboardList className="ml-2 h-4 w-4" /> عرض مواعيد
                  الطبيب
                </Button>
              </div>
            </div>
            {/* يمكن إضافة أزرار إجراءات إضافية هنا مثل تعليق الحساب، إلخ */}
          </Card>
        </div>

        {/* --- عامود التفاصيل (على اليسار في RTL) --- */}
        <div className="lg:col-span-7 xl:col-span-8 w-full space-y-6">
          <Card theme={flowbit.card} className="shadow-xl dark:bg-gray-800">
            <h3 className="text-lg font-semibold text-primaryColor dark:text-primaryColor-400 mb-3 flex items-center gap-2 border-b dark:border-gray-700 pb-2">
              <FaGraduationCap /> معلومات مهنية
            </h3>
            <div className="space-y-1">
              <DetailItem
                label="التخصص الدقيق"
                value={doctorData?.doctorProfile?.specialization}
                icon={FaStethoscope}
              />
              <DetailItem
                label="سنوات الخبرة"
                value={`${doctorData?.doctorProfile?.experienceYears || 0} سنة`}
                icon={FaBriefcase}
              />
              <DetailItem
                label="مكان العمل الأساسي"
                value={doctorData?.doctorProfile?.workplace}
                icon={HiOutlineLocationMarker}
              />
              {doctorData?.address && (
                <DetailItem
                  label="عنوان العيادة/العمل"
                  value={doctorData?.address}
                  icon={FaAddressCard}
                />
              )}
            </div>
          </Card>

          {doctorData?.doctorProfile?.doctorBio && (
            <Card theme={flowbit.card} className="shadow-xl dark:bg-gray-800">
              <h3 className="text-lg font-semibold text-primaryColor dark:text-primaryColor-400 mb-3 flex items-center gap-2 border-b dark:border-gray-700 pb-2">
                <FaInfoCircle /> نبذة عن الطبيب
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line p-1">
                {doctorData?.doctorProfile.doctorBio}
              </p>
            </Card>
          )}

          {doctorData?.doctorProfile?.licenseDocuments &&
            doctorData?.doctorProfile.licenseDocuments.length > 0 && (
              <Card theme={flowbit.card} className="shadow-xl dark:bg-gray-800">
                <h3 className="text-lg font-semibold text-primaryColor dark:text-primaryColor-400 mb-4 flex items-center gap-2 border-b dark:border-gray-700 pb-2">
                  <HiOutlineDocumentText /> وثائق التحقق
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {doctorData?.doctorProfile.licenseDocuments.map(
                    (docUrl, index) => {
                      const docName =
                        typeof docUrl === "string"
                          ? docUrl.split("/").pop().split("?")[0]
                          : `وثيقة ${index + 1}`;
                      const decodedDocName = decodeURIComponent(docName);
                      return (
                        <a
                          key={index}
                          href={parseImgUrl(docUrl)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-gray-700/60 hover:bg-slate-100 dark:hover:bg-gray-700 rounded-lg border dark:border-gray-200 dark:border-gray-600 transition-all duration-200 shadow-sm hover:shadow-md text-center"
                        >
                          <BiSolidFilePdf
                            size={36}
                            className="text-red-500 dark:text-red-400 mb-2 group-hover:scale-110 transition-transform"
                          />
                          <span
                            className="text-xs text-gray-700 dark:text-gray-200 group-hover:text-primaryColor dark:group-hover:text-primaryColor-300 truncate w-full"
                            title={decodedDocName}
                          >
                            {decodedDocName.length > 25
                              ? `${decodedDocName.substring(0, 22)}...`
                              : decodedDocName}
                          </span>
                          <span className="mt-1 text-[10px] text-blue-500 group-hover:underline">
                            عرض/تحميل
                          </span>
                        </a>
                      );
                    }
                  )}
                </div>
              </Card>
            )}
          {/* يمكنك إضافة المزيد من الأقسام هنا مثل مواعيد الطبيب، تقييماته، إلخ */}
        </div>
      </div>
    </div>
  );
}
