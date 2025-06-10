import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  Button,
  Tabs,
  TabItem,
  Avatar,
  Badge,
  Card,
  TextInput, // قد تحتاجها إذا أضفت وضع التعديل
  Textarea, // قد تحتاجها إذا أضفت وضع التعديل
  FileInput, // لرفع المستندات
  Spinner,
  Label, // لعرض مؤشر تحميل أدق
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
  HiOutlineDocumentText,
  HiOutlineCreditCard,
  HiOutlinePencil,
  HiOutlineClock,
  HiOutlinePaperClip,
  HiOutlineExclamationCircle,
  HiOutlineCheckCircle,
  HiOutlineInformationCircle,
  HiOutlineHeart,
  HiOutlineLink,
  HiOutlineShieldCheck,
  HiOutlineCollection,
  HiOutlineArrowLeft, // للعودة
  HiOutlinePlusCircle,
  HiOutlineClipboardList,
  HiOutlinePencilAlt,
  HiOutlineEye, // لرفع ملف
} from "react-icons/hi";
import {
  Cake,
  Languages,
  Users as UsersIcon,
  AlertCircle,
  ListChecks,
} from "lucide-react"; // أيقونات إضافية

// Skeleton component for loading state (يمكنك إنشاء مكون مخصص أكثر تفصيلاً)
const ProfileSkeleton = () => (
  <div className="animate-pulse mt-8">
    <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
      {/* Left Skeleton Card */}
      <div className="lg:w-1/3 xl:w-1/4 w-full">
        <div className="p-6 py-8 bg-white dark:bg-gray-800 rounded-xl shadow-xl border dark:border-gray-700">
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 bg-gray-300 dark:bg-gray-600 rounded-full mb-4"></div>
            <div className="h-7 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-500 rounded w-1/2 mb-4"></div>
            <div className="h-5 bg-gray-200 dark:bg-gray-500 rounded w-full mb-2"></div>
            <div className="h-5 bg-gray-200 dark:bg-gray-500 rounded w-full mb-4"></div>
            <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded-lg w-full mb-2"></div>
            <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded-lg w-full"></div>
          </div>
        </div>
      </div>
      {/* Right Tabs Skeleton */}
      <div className="lg:w-2/3 xl:w-3/4 w-full">
        <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-t-lg w-full mb-0.5"></div>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-b-lg rounded-tl-lg shadow-xl border dark:border-gray-700 min-h-[300px]">
          {" "}
          {/* تم عكس rounded-tr إلى rounded-tl لـ RTL */}
          <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/3 mb-6"></div>
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="mb-4 pb-2 border-b border-gray-100 dark:border-gray-700"
            >
              <div className="h-4 bg-gray-200 dark:bg-gray-500 rounded w-1/4 mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-500 rounded w-full"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// DetailItem component (معدل قليلاً ليتناسب مع RTL بشكل أفضل)
const DetailItem = ({
  icon: Icon,
  label,
  value,
  children,
  valueClassName = "text-gray-800 dark:text-gray-200",
}) => (
  <div className="flex flex-col sm:flex-row py-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0 sm:gap-4">
    <div className="flex-shrink-0 w-full sm:w-auto sm:min-w-[140px] md:min-w-[160px] mb-1 sm:mb-0 flex items-center">
      {Icon && (
        <Icon className="w-5 h-5 text-primaryColor-600 dark:text-primaryColor-400 flex-shrink-0 ml-2.5" />
      )}
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
        {label}:
      </p>
    </div>
    <div className="flex-1 text-right sm:text-right">
      {" "}
      {/* ضمان المحاذاة لليمين */}
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

const getPatientAccountStatus = (patient) => {
  // افترض وجود حقل مثل patient.accountStatus أو patient.isActive
  // هذا مثال، ستحتاج لتكييفه مع بياناتك الفعلية
  if (patient?.accountStatus === "active" || patient?.isActive === true) {
    return { text: "نشط", color: "success", icon: HiOutlineCheckCircle };
  } else if (
    patient?.accountStatus === "suspended" ||
    patient?.isActive === false
  ) {
    return { text: "معلّق", color: "pink", icon: HiOutlineExclamationCircle };
  }
  return { text: "غير معروف", color: "gray", icon: HiOutlineInformationCircle };
};

export default function AdminPatientProfile() {
  const { id: patientId } = useParams();
  const navigate = useNavigate();
  const {
    data: patientApiResponse,
    loading,
    error,
    request: fetchPatient,
  } = useApiRequest();
  const [patientData, setPatientData] = useState(null);
  const [newFile, setNewFile] = useState(null); // لرفع ملف جديد
  const [isUploading, setIsUploading] = useState(false); // حالة لرفع الملف

  useEffect(() => {
    if (patientId) {
      fetchPatient(() => globalApi.getPatientById(patientId));
    }
  }, [patientId]);

  useEffect(() => {
    if (patientApiResponse?.data) {
      setPatientData(patientApiResponse.data);
    }
  }, [patientApiResponse]);

  const handleEditPatient = () => {
    navigate(`/dashboard/patients/edit/${patientId}`);
  };

  const handleViewAppointments = () => {
    navigate(`/dashboard/appointments?patientId=${patientId}`);
  };

  const handleFileUpload = async () => {
    if (!newFile) {
      alert("يرجى اختيار ملف أولاً.");
      return;
    }
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", newFile); // 'file' هو المفتاح الذي يتوقعه الخادم
    formData.append("patientId", patientId); // إرسال ID المريض

    try {
      // افترض وجود دالة API لرفع الملفات للمريض
      // const response = await globalApi.uploadPatientDocument(patientId, formData);
      // if(response.success) {
      //     alert("تم رفع الملف بنجاح!");
      //     setNewFile(null); // مسح الملف المختار
      //     fetchPatient(() => globalApi.getPatientById(patientId)); // تحديث بيانات المريض (خاصة قائمة الملفات)
      // } else {
      //     alert("فشل رفع الملف: " + response.error);
      // }
      console.log("Uploading file:", newFile.name, "for patient:", patientId);
      await new Promise((resolve) => setTimeout(resolve, 1500)); // محاكاة الرفع
      alert(`تم رفع الملف "${newFile.name}" بنجاح (محاكاة).`);
      setNewFile(null);
      // أعد جلب بيانات المريض لتحديث قائمة الملفات
      fetchPatient(() => globalApi.getPatientById(patientId));
    } catch (uploadError) {
      console.error("File upload error:", uploadError);
      alert("حدث خطأ أثناء رفع الملف.");
    } finally {
      setIsUploading(false);
    }
  };

  if (loading && !patientData) {
    // عرض هيكل التحميل فقط إذا لم تكن هناك بيانات سابقة
    return (
      <div
        className="p-4 md:p-6 lg:p-8 dark:bg-gray-900 min-h-screen"
        dir="rtl"
      >
        <DashPageHeader
          Icon={HiOutlineUserCircle}
          title="ملف المريض"
          description="جاري تحميل تفاصيل المريض..."
        />
        <ProfileSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="p-4 md:p-6 lg:p-8 dark:bg-gray-900 min-h-screen flex flex-col items-center justify-center text-center"
        dir="rtl"
      >
        <DashPageHeader Icon={HiOutlineUserCircle} title="ملف المريض" />
        <div className="py-10">
          <AlertCircle size={56} className="mx-auto text-red-400 mb-5" />
          <h3 className="text-2xl font-semibold text-red-500 dark:text-red-400 mb-3">
            {error ? "خطأ في تحميل البيانات" : "المريض غير موجود"}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {error
              ? "حدث خطأ أثناء محاولة جلب تفاصيل المريض. يرجى المحاولة مرة أخرى."
              : "لم نتمكن من العثور على المريض المطلوب. يرجى التأكد من صحة المعرّف."}
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

  const age = patientData?.patientProfile?.birthDate
    ? Math.floor(
        (new Date() - new Date(patientData?.patientProfile?.birthDate)) /
          (365.25 * 24 * 60 * 60 * 1000)
      )
    : null;

  const patientStatusInfo = getPatientAccountStatus(patientData); // افترض أن patientData يحتوي على حقل مثل isActive أو accountStatus

  return (
    <div className="p-4 md:p-6 lg:p-8 dark:bg-gray-900 min-h-screen" dir="rtl">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 pb-4 border-b dark:border-gray-700">
        <DashPageHeader
          Icon={HiOutlineUserCircle}
          title={`ملف المريض: ${patientData?.fullName?.first || ""} ${
            patientData?.fullName?.second || ""
          }`}
          description="عرض وتعديل معلومات المريض التفصيلية وسجلاته."
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
        {/* --- عامود ملخص المريض (يمين في RTL) --- */}
        <div className="lg:col-span-5 xl:col-span-4 w-full">
          <Card
            theme={flowbit.card}
            className="shadow-xl dark:bg-gray-800 !p-0 sticky top-24"
          >
            {" "}
            {/* جعل البطاقة لاصقة */}
            <div className="flex flex-col items-center p-6 pt-8">
              <Avatar
                img={
                  patientData?.profileImage
                    ? parseImgUrl(patientData?.profileImage)
                    : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        patientData?.fullName?.first || "P"
                      )}+${encodeURIComponent(
                        patientData?.fullName?.second || ""
                      )}&background=6366F1&color=fff&font-size=0.45&bold=true`
                } // لون مختلف للمرضى
                rounded
                size="xl"
                bordered
                color="indigo" // لون ليتناسب مع ui-avatars
                className="mb-4 shadow-lg ring-4 ring-white dark:ring-gray-700"
              />
              <h5 className="mb-1 text-xl md:text-2xl font-bold text-gray-900 dark:text-white text-center">
                {patientData?.fullName?.first} {patientData?.fullName?.second}
              </h5>
              <span className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                {patientData?.email}
              </span>

              <div className="mb-4">
                <Badge
                  color={patientStatusInfo.color}
                  icon={patientStatusInfo.icon}
                  theme={flowbit.badge} // استخدم flowbit.badge إذا كان لديك ثيم مخصص
                  className="!text-sm !px-3 !py-1" // استخدام ! لفرض التنسيق إذا لزم الأمر
                >
                  {patientStatusInfo.text}
                </Badge>
              </div>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-4 space-y-3.5 text-sm">
              <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                <HiOutlinePhone
                  size={18}
                  className="text-primaryColor-500 flex-shrink-0"
                />{" "}
                <span>{patientData?.phone || "لم يضف رقم هاتف"}</span>
              </div>
              {patientData?.state && (
                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  {" "}
                  <HiOutlineLocationMarker
                    size={18}
                    className="text-primaryColor-500 flex-shrink-0"
                  />{" "}
                  <span>
                    {patientData?.state}
                    {patientData?.city ? `، ${patientData?.city}` : ""}
                  </span>
                </div>
              )}
              <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                {" "}
                <Cake
                  size={17}
                  className="text-primaryColor-500 flex-shrink-0"
                />{" "}
                <span>
                  {age
                    ? `${age} سنة`
                    : patientData?.patientProfile?.birthDate
                    ? formatDateTime(
                        patientData?.patientProfile?.birthDate,
                        "arabic"
                      )
                    : "تاريخ الميلاد غير محدد"}
                </span>
              </div>
              <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                {" "}
                <Languages
                  size={17}
                  className="text-primaryColor-500 flex-shrink-0"
                />{" "}
                <span>
                  {patientData?.patientProfile?.preferredLanguages?.join(
                    "، "
                  ) || "العربية"}
                </span>
              </div>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 p-4">
              <div className="flex flex-col gap-2 w-full">
                <Button
                  color="primary"
                  onClick={handleEditPatient}
                  theme={flowbit.button}
                  size="sm"
                  className="flex-grow justify-center shadow-sm hover:shadow-md"
                >
                  <HiOutlinePencil className="ml-2 h-4 w-4" /> تعديل الملف
                  الشخصي
                </Button>
                <Button
                  color="light"
                  onClick={handleViewAppointments}
                  theme={flowbit.button}
                  size="sm"
                  className="flex-grow justify-center dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600 shadow-sm hover:shadow-md"
                >
                  <HiOutlineClipboardList className="ml-2 h-4 w-4" /> عرض مواعيد
                  المريض
                </Button>
              </div>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-7 xl:col-span-8 w-full">
          <Tabs
            aria-label="Patient details tabs"
            theme={flowbit.tabs}
            className="[&_button]:text-sm [&_button]:font-medium [&_button]:py-3 dark:[&_button]:hover:!bg-gray-700 dark:[&_button]:focus:!ring-primaryColor-600"
          >
            <TabItem
              active
              title="المعلومات الشخصية"
              icon={HiOutlineIdentification}
            >
              <div className="p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-b-lg shadow-md border-x border-b dark:border-gray-700">
                <DetailItem
                  icon={HiOutlineUserCircle}
                  label="الاسم الأول"
                  value={patientData?.fullName?.first}
                />
                <DetailItem
                  icon={HiOutlineUserCircle}
                  label="اللقب"
                  value={patientData?.fullName?.second}
                />
                <DetailItem
                  icon={HiOutlineMail}
                  label="البريد الإلكتروني"
                  value={patientData?.email}
                />
                <DetailItem
                  icon={HiOutlinePhone}
                  label="رقم الهاتف"
                  value={patientData?.phone}
                />
                <DetailItem
                  icon={UsersIcon}
                  label="الجنس"
                  value={
                    patientData?.patientProfile?.gender === "male"
                      ? "ذكر"
                      : patientData?.patientProfile?.gender === "female"
                      ? "أنثى"
                      : "غير محدد"
                  }
                />
                <DetailItem
                  icon={HiOutlineCalendar}
                  label="تاريخ الميلاد"
                  value={
                    patientData?.patientProfile?.birthDate
                      ? formatDateTime(
                          patientData?.patientProfile?.birthDate,
                          "arabicDate"
                        )
                      : "غير محدد"
                  }
                />
                {age !== null && (
                  <DetailItem
                    icon={HiOutlineInformationCircle}
                    label="العمر الحالي"
                    value={`${age} سنة`}
                  />
                )}
                <DetailItem
                  icon={HiOutlineLocationMarker}
                  label="الولاية"
                  value={patientData?.state}
                />
                <DetailItem
                  icon={HiOutlineLocationMarker}
                  label="المدينة/البلدية"
                  value={patientData?.city}
                />
                <DetailItem
                  icon={Languages}
                  label="اللغات المفضلة"
                  value={
                    patientData?.patientProfile?.preferredLanguages?.join(
                      "، "
                    ) || "العربية"
                  }
                />
                <DetailItem
                  icon={HiOutlineClock}
                  label="تاريخ التسجيل في المنصة"
                  value={formatDateTime(patientData?.createdAt, "both")}
                />
              </div>
            </TabItem>

            <TabItem title="السجل الطبي" icon={HiOutlineHeart}>
              <div className="p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-b-lg shadow-md border-x border-b dark:border-gray-700 space-y-6">
                <div>
                  <h4 className="text-md font-semibold text-gray-800 dark:text-gray-100 mb-2 flex items-center gap-2">
                    <HiOutlinePencilAlt className="text-primaryColor-500" />
                    التاريخ الطبي العام:
                  </h4>
                  {patientData?.patientProfile?.medicalHistory &&
                  patientData?.patientProfile.medicalHistory.length > 0 ? (
                    <div className="text-sm text-gray-700 dark:text-gray-300 bg-slate-50 dark:bg-gray-700/60 p-4 rounded-md border dark:border-gray-600/50 space-y-1.5">
                      {patientData?.patientProfile?.medicalHistory.map(
                        (item, index) => (
                          <p key={index} className="py-0.5">
                            - {item}
                          </p>
                        )
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 dark:text-gray-400 italic bg-slate-50 dark:bg-gray-700/60 p-4 rounded-md">
                      لا يوجد تاريخ طبي مسجل.
                    </p>
                  )}
                </div>
                <div>
                  <h4 className="text-md font-semibold text-gray-800 dark:text-gray-100 mb-2 flex items-center gap-2">
                    <HiOutlineExclamationCircle className="text-red-500" />
                    الحساسية المعروفة:
                  </h4>
                  {patientData?.patientProfile?.allergies &&
                  patientData?.patientProfile?.allergies.length > 0 ? (
                    <div className="text-sm text-gray-700 dark:text-gray-300 bg-slate-50 dark:bg-gray-700/60 p-4 rounded-md border dark:border-gray-600/50 space-y-1.5">
                      {patientData?.patientProfile?.allergies.map(
                        (item, index) => (
                          <p key={index} className="py-0.5">
                            - {item}
                          </p>
                        )
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 dark:text-gray-400 italic bg-slate-50 dark:bg-gray-700/60 p-4 rounded-md">
                      لا توجد حساسية مسجلة.
                    </p>
                  )}
                </div>
                <div>
                  <h4 className="text-md font-semibold text-gray-800 dark:text-gray-100 mb-2 flex items-center gap-2">
                    <HiOutlineShieldCheck className="text-orange-500" />
                    الأمراض المزمنة:
                  </h4>
                  {patientData?.patientProfile?.chronicDiseases &&
                  patientData?.patientProfile?.chronicDiseases.length > 0 ? (
                    <div className="text-sm text-gray-700 dark:text-gray-300 bg-slate-50 dark:bg-gray-700/60 p-4 rounded-md border dark:border-gray-600/50 space-y-1.5">
                      {patientData?.patientProfile?.chronicDiseases.map(
                        (item, index) => (
                          <p key={index} className="py-0.5">
                            - {item}
                          </p>
                        )
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 dark:text-gray-400 italic bg-slate-50 dark:bg-gray-700/60 p-4 rounded-md">
                      لا توجد أمراض مزمنة مسجلة.
                    </p>
                  )}
                </div>
              </div>
            </TabItem>

            <TabItem title="المستندات المرفقة" icon={HiOutlineCollection}>
              <div className="p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-b-lg shadow-md border-x border-b dark:border-gray-700 space-y-3">
                {patientData?.patientProfile?.uploadedFiles &&
                patientData?.patientProfile?.uploadedFiles.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {patientData?.patientProfile?.uploadedFiles.map(
                      (fileUrl, index) => {
                        const fileName =
                          typeof fileUrl === "string"
                            ? fileUrl.split("/").pop().split("?")[0]
                            : `مستند ${index + 1}`; // استخلاص اسم الملف
                        const decodedFileName = decodeURIComponent(fileName);
                        return (
                          <a
                            key={index}
                            href={parseImgUrl(fileUrl)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center justify-between p-3.5 bg-slate-100 dark:bg-gray-700 hover:bg-slate-200 dark:hover:bg-gray-600 rounded-lg border dark:border-gray-200 dark:border-gray-600 transition-all duration-200 shadow-sm hover:shadow-lg"
                          >
                            <div className="flex items-center gap-3 overflow-hidden">
                              <HiOutlinePaperClip className="w-6 h-6 text-primaryColor-600 dark:text-primaryColor-400 flex-shrink-0" />
                              <span
                                className="text-sm text-gray-700 dark:text-gray-200 truncate group-hover:text-primaryColor-700 dark:group-hover:text-primaryColor-300"
                                title={decodedFileName}
                              >
                                {decodedFileName.length > 30
                                  ? `${decodedFileName.substring(0, 27)}...`
                                  : decodedFileName}
                              </span>
                            </div>
                            <Button
                              size="xs"
                              color="light"
                              theme={flowbit.button}
                              className="dark:text-gray-300 dark:border-gray-500 !p-2 shadow-sm"
                            >
                              <HiOutlineEye size={16} />
                            </Button>
                          </a>
                        );
                      }
                    )}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <HiOutlineDocumentText
                      size={48}
                      className="mx-auto text-gray-300 dark:text-gray-500 mb-3"
                    />
                    <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                      لا توجد مستندات مرفقة حاليًا.
                    </p>
                  </div>
                )}
                <div className="pt-6 mt-6 border-t dark:border-gray-600">
                  <Label
                    htmlFor="admin-patient-file-upload"
                    className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    إرفاق مستند جديد للمريض:
                  </Label>
                  <div className="flex items-center gap-3">
                    <FileInput
                      id="admin-patient-file-upload"
                      // helperText="PDF, PNG, JPG, DOCX (الحد الأقصى 5MB)"
                      theme={flowbit.fileInput}
                      className="[&_button]:text-xs [&_input]:text-xs flex-grow"
                      onChange={(e) => setNewFile(e.target.files[0])}
                    />
                    <Button
                      color="primary"
                      size="sm"
                      theme={flowbit.button}
                      onClick={handleFileUpload}
                      // isProcessing={isUploading}
                      disabled={!newFile || isUploading}
                      className="flex-shrink-0"
                    >
                      {isUploading ? (
                        "جاري الرفع..."
                      ) : (
                        <HiOutlinePlusCircle className="ml-2 h-4 w-4" />
                      )}
                      {isUploading ? "" : "رفع"}
                    </Button>
                  </div>
                  {newFile && (
                    <p className="text-xs text-green-500 mt-1">
                      الملف المختار: {newFile.name}
                    </p>
                  )}
                </div>
              </div>
            </TabItem>

            <TabItem title="المحفظة والمالية" icon={HiOutlineCreditCard}>
              <div className="p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-b-lg shadow-md border-x border-b dark:border-gray-700 space-y-5">
                <DetailItem
                  icon={HiOutlineCreditCard}
                  label="رصيد المحفظة الحالي"
                  value={`${
                    patientData?.patientProfile?.walletBalance?.toLocaleString(
                      "ar-EG"
                    ) || 0
                  } د.ط`}
                  valueClassName="text-2xl font-bold text-green-600 dark:text-green-400"
                />
                <DetailItem
                  icon={HiOutlineIdentification}
                  label="رقم الحساب البريدي الجاري (CCP)"
                  value={patientData?.patientProfile?.ccpNumber}
                />
                <div className="pt-3 flex flex-wrap gap-3">
                  <Button
                    color="cyan"
                    size="sm"
                    theme={flowbit.button}
                    className="shadow-sm hover:shadow-md"
                  >
                    <HiOutlinePencil className="ml-2 h-4 w-4" />
                    تعديل الرصيد (إداري)
                  </Button>
                  <Button
                    color="alternative"
                    size="sm"
                    theme={flowbit.button}
                    onClick={handleViewAppointments}
                    className="dark:text-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 shadow-sm hover:shadow-md"
                  >
                    <HiOutlineClipboardList className="ml-2 h-4 w-4" />
                    عرض سجل المعاملات (المواعيد)
                  </Button>
                </div>
              </div>
            </TabItem>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
