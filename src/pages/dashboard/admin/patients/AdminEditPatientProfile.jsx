import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  Button,
  Label,
  TextInput,
  Textarea,
  Select,
  Datepicker,
  FileInput,
  Spinner, // لعرض مؤشر التحميل
  Avatar, // لعرض الصورة الرمزية
} from "flowbite-react";
import DashPageHeader from "../../../../components/dashboard/common/DashPageHeader";
import flowbit from "../../../../config/flowbit"; // تأكد من صحة المسار
import useApiRequest from "../../../../hooks/useApiRequest";
import globalApi from "../../../../utils/globalApi"; // تأكد من صحة المسار
import formatDateTime from "../../../../utils/formatDateTime"; // تأكد من صحة المسار
import parseImgUrl from "../../../../utils/parseImgUrl"; // تأكد من صحة المسار
import useToastStore from "../../../../store/toastStore"; // لنظام التنبيهات
import {
  HiOutlineUserCircle,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
  HiOutlineCalendar,
  HiOutlineIdentification, // للجنس
  HiOutlineSave,
  HiOutlineArrowLeft,
  HiOutlinePhotograph, // لرفع الصورة
  HiOutlineTranslate,
  HiOutlinePencil,
  HiOutlineCreditCard, // للغات
} from "react-icons/hi";
import { Users as UsersIcon, AlertCircle, ChevronRight } from "lucide-react"; // أيقونات إضافية

// قائمة الولايات (مثال، يمكنك جلبها من مصدر بيانات)
const allWilayas = [
  { value: "", label: "اختر الولاية" },
  { value: "الجزائر", label: "الجزائر" },
  { value: "وهران", label: "وهران" },
  { value: "قسنطينة", label: "قسنطينة" },
  { value: "عنابة", label: "عنابة" },
  { value: "سطيف", label: "سطيف" },
  { value: "الجلفة", label: "الجلفة" },
  // ... أضف باقي الولايات
];

// Skeleton component for loading state
const ProfileSkeleton = () => (
  <div className="animate-pulse mt-6 space-y-8">
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
      <div className="md:col-span-5 xl:col-span-4 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border dark:border-gray-700">
        <div className="flex flex-col items-center">
          <div className="w-32 h-32 bg-gray-300 dark:bg-gray-600 rounded-full mb-4"></div>
          <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-500 rounded w-1/2"></div>
        </div>
      </div>
      <div className="md:col-span-7 xl:col-span-8 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border dark:border-gray-700 space-y-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-2"></div>
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            </div>
            <div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-2"></div>
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            </div>
          </div>
        ))}
        <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded-lg w-1/4 ml-auto"></div>
      </div>
    </div>
  </div>
);

export default function AdminEditPatientProfile() {
  const { id: patientId } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToastStore();
  const [patientData, setPatientData] = useState();
  const [currentProfileImageUrl, setCurrentProfileImageUrl] = useState(null);
  const [selectedProfileImageFile, setSelectedProfileImageFile] =
    useState(null);
  console.log(patientData);
  const {
    loading: fetchLoading,
    data: fetchedpatientData,
    error: fetchError,
    request: fetchPatientDetails,
  } = useApiRequest();
  const {
    loading: updateLoading,
    error: updateError,
    request: updatePatientDetails,
  } = useApiRequest();

  useEffect(() => {
    fetchPatientDetails(() => globalApi.getPatientById(patientId));
  }, [patientId]);

  useEffect(() => {
    setPatientData(fetchedpatientData?.data);
  }, [fetchedpatientData]);

  //   const handleChange = (e) => {
  //     const { name, value } = e.target;
  //     const keys = name.split(".");

  //     if (keys.length === 1) {
  //       setPatientData((prev) => ({ ...prev, [name]: value }));
  //     } else if (keys.length === 2) {
  //       setPatientData((prev) => ({
  //         ...prev,
  //         [keys[0]]: {
  //           ...prev[keys[0]],
  //           [keys[1]]: value,
  //         },
  //       }));
  //     }
  //   };

  //   const handleDateChange = (date) => {
  //     setPatientData((prev) => ({
  //       ...prev,
  //       patientProfile: { ...prev.patientProfile, birthDate: date },
  //     }));
  //   };

  //   const handleProfileImageChange = (event) => {
  //     const file = event.target.files[0];
  //     if (file) {
  //       setSelectedProfileImageFile(file);
  //       // عرض معاينة للصورة المختارة
  //       const reader = new FileReader();
  //       reader.onloadend = () => {
  //         setCurrentProfileImageUrl(reader.result);
  //       };
  //       reader.readAsDataURL(file);
  //     }
  //   };

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();

  //     const formData = new FormData();
  //     // إضافة الحقول النصية
  //     formData.append("fullName.first", patientData.fullName.first);
  //     formData.append("fullName.second", patientData.fullName.second);
  //     formData.append("email", patientData.email);
  //     formData.append("phone", patientData.phone);
  //     formData.append("state", patientData.state);
  //     formData.append("city", patientData.city);
  //     formData.append("patientProfile.gender", patientData.patientProfile.gender);
  //     if (patientData.patientProfile.birthDate) {
  //       formData.append(
  //         "patientProfile.birthDate",
  //         new Date(patientData.patientProfile.birthDate).toISOString()
  //       );
  //     }
  //     // تحويل النصوص المنفصلة بأسطر جديدة إلى مصفوفات قبل الإرسال
  //     formData.append(
  //       "patientProfile.medicalHistory",
  //       patientData.patientProfile.medicalHistory
  //         .split("\n")
  //         .filter(Boolean)
  //         .join("|")
  //     ); // مثال: فصل بـ |
  //     formData.append(
  //       "patientProfile.allergies",
  //       patientData.patientProfile.allergies.split("\n").filter(Boolean).join("|")
  //     );
  //     formData.append(
  //       "patientProfile.chronicDiseases",
  //       patientData.patientProfile.chronicDiseases
  //         .split("\n")
  //         .filter(Boolean)
  //         .join("|")
  //     );
  //     formData.append(
  //       "patientProfile.ccpNumber",
  //       patientData.patientProfile.ccpNumber
  //     );

  //     // (patientData.patientProfile.preferredLanguages || []).forEach(lang => {
  //     //     formData.append("patientProfile.preferredLanguages[]", lang);
  //     // });
  //     // لإرسال مصفوفة اللغات، قد تحتاج الواجهة الخلفية لطريقة معينة (مثل JSON.stringify أو مفاتيح متعددة)
  //     // هذا مثال مبسط:
  //     formData.append(
  //       "patientProfile.preferredLanguages",
  //       JSON.stringify(patientData.patientProfile.preferredLanguages || [])
  //     );

  //     if (selectedProfileImageFile) {
  //       formData.append("profileImage", selectedProfileImageFile); // اسم الحقل 'profileImage' كما يتوقعه الخادم
  //     }

  //     // لطباعة محتويات FormData (لأغراض التصحيح فقط، لا يمكن طباعتها مباشرة)
  //     // for (let [key, value] of formData.entries()) {
  //     //   console.log(`${key}: ${value}`);
  //     // }

  //     updatePatientDetails(async () => {
  //       // يجب أن تستخدم globalApi.updatePatient أو ما شابه مع طلب PUT/PATCH
  //       // API endpoint 'users/patients/edit/${patientId}' مع GET غير صحيح للتحديث
  //       // سأفترض أنك ستعدل هذا ليكون globalApi.updatePatient(patientId, formData) ويستخدم PUT/PATCH
  //       const response = await globalApi.updatePatientProfile(
  //         patientId,
  //         formData
  //       ); // مثال: دالة API للتحديث
  //       if (response.data) {
  //         showToast("success", "تم تحديث بيانات المريض بنجاح!");
  //         navigate(`/dashboard/patients/${patientId}`); // العودة لصفحة عرض الملف الشخصي
  //       } else {
  //         showToast(
  //           "error",
  //           response.error || updateError || "فشل تحديث بيانات المريض."
  //         );
  //       }
  //       return response;
  //     });
  //   };

  if (fetchLoading) {
    return <ProfileSkeleton />;
  }

  if (fetchError) {
    return (
      <div
        className="p-4 md:p-6 lg:p-8 dark:bg-gray-900 min-h-screen flex flex-col items-center justify-center text-center"
        dir="rtl"
      >
        <AlertCircle size={56} className="mx-auto text-red-400 mb-5" />
        <h3 className="text-2xl font-semibold text-red-500 dark:text-red-400 mb-3">
          {fetchError ? "خطأ في تحميل البيانات" : "المريض غير موجود"}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {fetchError ||
            "لم نتمكن من جلب بيانات المريض. يرجى المحاولة مرة أخرى أو التأكد من صحة المعرّف."}
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
    );
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 dark:bg-gray-900 min-h-screen" dir="rtl">
      <DashPageHeader
        Icon={HiOutlinePencil}
        title={`تعديل ملف المريض: ${patientData?.fullName?.first || ""} ${
          patientData?.fullName?.second || ""
        }`}
        description="قم بتحديث المعلومات الشخصية والطبية للمريض."
      />

      <form onSubmit={() => console.log("hello")} className="mt-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start">
          {/* --- عامود الصورة والاسم --- */}
          <div className="md:col-span-5 xl:col-span-4 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border dark:border-gray-700">
            <div className="flex flex-col items-center">
              <Avatar
                img={
                  currentProfileImageUrl ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    patientData?.fullName?.first || "P"
                  )}+${encodeURIComponent(
                    patientData?.fullName?.second || ""
                  )}&background=6366F1&color=fff&font-size=0.45&bold=true`
                }
                rounded
                size="xl" // حجم كبير
                bordered
                color="indigo"
                className="mb-4 shadow-lg ring-4 ring-white dark:ring-gray-700"
              />
              <Label
                htmlFor="profile-picture-upload"
                className="cursor-pointer text-sm text-primaryColor-600 hover:text-primaryColor-700 dark:text-primaryColor-400 dark:hover:text-primaryColor-300 font-medium mb-4 flex items-center gap-2"
              >
                <HiOutlinePhotograph size={18} />
                <span>تغيير الصورة الشخصية</span>
              </Label>
              <FileInput
                id="profile-picture-upload"
                className="hidden" // إخفاء الحقل الأصلي
                // onChange={handleProfileImageChange}
                accept="image/png, image/jpeg, image/jpg"
              />
              <h5 className="mb-1 text-xl font-bold text-gray-900 dark:text-white text-center">
                {patientData?.fullName?.first} {patientData?.fullName?.second}
              </h5>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {patientData?.email}
              </span>
            </div>
          </div>

          {/* --- عامود حقول التعديل --- */}
          <div className="md:col-span-7 xl:col-span-8 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border dark:border-gray-700 space-y-5">
            {/* المعلومات الشخصية */}
            <section>
              <h3 className="text-lg font-semibold text-primaryColor-700 dark:text-primaryColor-400 mb-4 border-b pb-2 dark:border-gray-700">
                المعلومات الشخصية
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                <div>
                  <Label htmlFor="fullName.first">الاسم الأول</Label>
                  <TextInput
                    id="fullName.first"
                    name="fullName.first"
                    value={patientData?.fullName?.first}
                    theme={flowbit.textInput}
                    icon={HiOutlineUserCircle}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="fullName.second">اللقب (الاسم الثاني)</Label>
                  <TextInput
                    id="fullName.second"
                    name="fullName.second"
                    value={patientData?.fullName?.second}
                    theme={flowbit.textInput}
                    icon={HiOutlineUserCircle}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="patientProfile.gender">الجنس</Label>
                  <Select
                    id="patientProfile.gender"
                    name="patientProfile.gender"
                    value={patientData?.gender}
                    theme={flowbit.select}
                    icon={HiOutlineIdentification}
                    required
                  >
                    <option value="">اختر الجنس</option>
                    <option value="male">ذكر</option>
                    <option value="female">أنثى</option>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="patientProfile.birthDate">
                    تاريخ الميلاد
                  </Label>
                  <Datepicker
                    id="patientProfile.birthDate"
                    name="patientProfile.birthDate"
                    language="ar"
                    theme={flowbit.datepicker}
                    showClearButton={true}
                    labelTodayButton="اليوم"
                    labelClearButton="مسح"
                    maxDate={new Date()}
                    className="[&_input]:p-2.5 [&_input]:text-sm [&_input]:w-full"
                    icon={HiOutlineCalendar}
                  />
                </div>
              </div>
            </section>

            {/* معلومات الاتصال والعنوان */}
            <section>
              <h3 className="text-lg font-semibold text-primaryColor-700 dark:text-primaryColor-400 mb-4 border-b pb-2 dark:border-gray-700 mt-6">
                معلومات الاتصال والعنوان
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                <div>
                  <Label htmlFor="email">البريد الإلكتروني</Label>
                  <TextInput
                    id="email"
                    name="email"
                    type="email"
                    value={patientData?.email}
                    theme={flowbit.textInput}
                    icon={HiOutlineMail}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">رقم الهاتف</Label>
                  <TextInput
                    id="phone"
                    name="phone"
                    type="tel"
                    value={patientData?.phone}
                    theme={flowbit.textInput}
                    icon={HiOutlinePhone}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="state">الولاية</Label>
                  <Select
                    id="state"
                    name="state"
                    value={patientData?.state}
                    theme={flowbit.select}
                    icon={HiOutlineLocationMarker}
                    required
                  >
                    {allWilayas.map((w) => (
                      <option key={w.value} value={w.value}>
                        {w.label}
                      </option>
                    ))}
                  </Select>
                </div>
                <div>
                  <Label htmlFor="city">المدينة/البلدية</Label>
                  <TextInput
                    id="city"
                    name="city"
                    value={patientData?.city}
                    theme={flowbit.textInput}
                    icon={HiOutlineLocationMarker}
                  />
                </div>
              </div>
            </section>

            {/* السجل الطبي */}
            <section>
              <h3 className="text-lg font-semibold text-primaryColor-700 dark:text-primaryColor-400 mb-4 border-b pb-2 dark:border-gray-700 mt-6">
                السجل الطبي (كل بند في سطر جديد)
              </h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="patientProfile.medicalHistory">
                    التاريخ الطبي العام
                  </Label>
                  <Textarea
                    id="patientProfile.medicalHistory"
                    name="patientProfile.medicalHistory"
                    value={patientData?.patientProfile?.medicalHistory}
                    theme={flowbit.textarea}
                    rows={3}
                    placeholder="أمثلة: عمليات سابقة، أمراض عائلية..."
                  />
                </div>
                <div>
                  <Label htmlFor="patientProfile.allergies">
                    الحساسية المعروفة
                  </Label>
                  <Textarea
                    id="patientProfile.allergies"
                    name="patientProfile.allergies"
                    value={patientData?.patientProfile?.allergies}
                    theme={flowbit.textarea}
                    rows={3}
                    placeholder="أمثلة: بنسلين، غبار الطلع..."
                  />
                </div>
                <div>
                  <Label htmlFor="patientProfile.chronicDiseases">
                    الأمراض المزمنة
                  </Label>
                  <Textarea
                    id="patientProfile.chronicDiseases"
                    name="patientProfile.chronicDiseases"
                    value={patientData?.patientProfile?.chronicDiseases}
                    theme={flowbit.textarea}
                    rows={3}
                    placeholder="أمثلة: سكري، ربو، ضغط دم..."
                  />
                </div>
              </div>
            </section>

            {/* معلومات إضافية */}
            <section>
              <h3 className="text-lg font-semibold text-primaryColor-700 dark:text-primaryColor-400 mb-4 border-b pb-2 dark:border-gray-700 mt-6">
                معلومات إضافية
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                <div>
                  <Label htmlFor="patientProfile.ccpNumber">
                    رقم الحساب البريدي (CCP) (اختياري)
                  </Label>
                  <TextInput
                    id="patientProfile.ccpNumber"
                    name="patientProfile.ccpNumber"
                    value={patientData?.patientProfile?.ccpNumber}
                    theme={flowbit.textInput}
                    icon={HiOutlineCreditCard}
                  />
                </div>
              </div>
            </section>

            {/* أزرار الإجراءات */}
            <div className="flex justify-end items-center gap-3 pt-6 border-t dark:border-gray-700 mt-6">
              <Button
                color="gray"
                onClick={() => navigate(-1)}
                theme={flowbit.button}
                className="dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700"
              >
                إلغاء
              </Button>
              <Button
                type="submit"
                color="primary"
                theme={flowbit.button}
                isProcessing={updateLoading}
                disabled={updateLoading}
              >
                <HiOutlineSave className="ml-2 h-5 w-5" />
                {updateLoading ? "جاري الحفظ..." : "حفظ التغييرات"}
              </Button>
            </div>
            {updateError && (
              <p className="text-sm text-red-600 dark:text-red-400 mt-2 text-right">
                خطأ: {updateError}
              </p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
