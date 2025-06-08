import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  Button,
  Label,
  TextInput,
  Textarea,
  Select,
  FileInput,
  Spinner,
  Avatar,
  Card, // لاستخدام بطاقات لتجميع الحقول
} from "flowbite-react";
import DashPageHeader from "../../../../components/dashboard/common/DashPageHeader";
import flowbit from "../../../../config/flowbit";
import useApiRequest from "../../../../hooks/useApiRequest";
import globalApi from "../../../../utils/globalApi";
import formatDateTime from "../../../../utils/formatDateTime"; // قد لا تحتاج إليه هنا
import parseImgUrl from "../../../../utils/parseImgUrl";
import useToastStore from "../../../../store/toastStore";
import {
  HiOutlineUserCircle,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
  HiOutlineIdentification, // للجنس
  HiOutlineSave,
  HiOutlineArrowLeft,
  HiOutlinePhotograph,
  HiOutlineTranslate, // للغات
  HiOutlineBriefcase, // لمكان العمل والخبرة
  HiOutlineCurrencyDollar, // للسعر
  HiOutlineClock, // للمدة
  HiOutlinePencilAlt, // للنبذة
  HiOutlineInformationCircle, // لتعليمات الحجز
  HiOutlineDocumentDuplicate, // للوثائق
  HiOutlinePencil, // لرفع الملفات
} from "react-icons/hi";
import { FaUserDoctor } from "react-icons/fa6"; // أيقونة لعنوان الصفحة
import { AlertCircle } from "lucide-react";
import states from "../../../../data/states"; // قائمة الولايات
import specializations from "../../../../data/specializations"; // قائمة التخصصات

// قائمة خيارات مدة الجلسة
const durationOptions = [
  { value: 15, label: "15 دقيقة" },
  { value: 30, label: "30 دقيقة" },
  { value: 45, label: "45 دقيقة" },
  { value: 60, label: "ساعة واحدة" },
  { value: 75, label: "ساعة وربع" },
  { value: 90, label: "ساعة ونصف" },
];

// Skeleton for edit page
const EditDoctorProfileSkeleton = () => (
  <div className="animate-pulse mt-8 space-y-8">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start">
      <div className="lg:col-span-4 xl:col-span-3 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl border dark:border-gray-700">
        <div className="flex flex-col items-center">
          <div className="w-32 h-32 bg-gray-300 dark:bg-gray-600 rounded-full mb-4"></div>
          <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded-lg w-full mb-3"></div>
          <div className="h-6 bg-gray-200 dark:bg-gray-500 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-500 rounded w-1/2"></div>
        </div>
      </div>
      <div className="lg:col-span-8 xl:col-span-9 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl border dark:border-gray-700 space-y-6">
        {[1, 2, 3].map((section) => (
          <div key={section}>
            <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/3 mb-5"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[...Array(2)].map((_, i) => (
                <div key={i}>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-2"></div>
                  <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="flex justify-end gap-3 mt-4">
          <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded-lg w-24"></div>
          <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded-lg w-32"></div>
        </div>
      </div>
    </div>
  </div>
);

export default function AdminEditDoctorProfile() {
  const { id: doctorId } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToastStore();

  const [doctorData, setDoctorData] = useState();

  const [currentProfileImageUrl, setCurrentProfileImageUrl] = useState(null);
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [existingLicenseDocs, setExistingLicenseDocs] = useState([]);
  const [newLicenseDocsFiles, setNewLicenseDocsFiles] = useState([]);

  const {
    loading: fetchLoading,
    error: fetchError,
    data: fetchedDoctorData,
    request: fetchDoctorDetails,
  } = useApiRequest();

  const { loading: updateLoading, request: updateDoctorRequest } =
    useApiRequest();

  useEffect(() => {
    fetchDoctorDetails(() => globalApi.getDoctorById(doctorId));
  }, [doctorId]);
  useEffect(() => {
    setDoctorData(fetchedDoctorData?.data);
  }, [fetchedDoctorData]);

  //   const handleChange = (e) => {
  //     const { id, value, type } = e.target;
  //     setFormData((prev) => ({
  //       ...prev,
  //       [id]: type === "number" ? (value === "" ? "" : Number(value)) : value,
  //     }));
  //   };

  //   const handleProfileImageChange = (event) => {
  //     const file = event.target.files[0];
  //     if (file) {
  //       setProfileImageFile(file);
  //       const reader = new FileReader();
  //       reader.onloadend = () => {
  //         setCurrentProfileImageUrl(reader.result);
  //       };
  //       reader.readAsDataURL(file);
  //     }
  //   };

  //   const handleLicenseDocsChange = (event) => {
  //     setNewLicenseDocsFiles(Array.from(event.target.files)); // تحويل FileList إلى مصفوفة
  //   };

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();

  //     const payload = new FormData(); // استخدام FormData لرفع الملفات

  //     // إضافة الحقول النصية
  //     payload.append("fullName[first]", formData.firstName);
  //     payload.append("fullName[second]", formData.lastName);
  //     payload.append("email", formData.email);
  //     payload.append("phone", formData.phone);
  //     payload.append("gender", formData.gender);
  //     payload.append("state", formData.state);
  //     payload.append("city", formData.city);
  //     payload.append("address", formData.address);

  //     // حقول DoctorProfile
  //     payload.append("doctorProfile[specialization]", formData.specialization);
  //     payload.append(
  //       "doctorProfile[experienceYears]",
  //       Number(formData.experienceYears) || 0
  //     );
  //     payload.append("doctorProfile[workplace]", formData.workplace);
  //     payload.append(
  //       "doctorProfile[consultationPrice]",
  //       Number(formData.consultationPrice) || 0
  //     );
  //     payload.append(
  //       "doctorProfile[slotDurationInMinutes]",
  //       Number(formData.slotDurationInMinutes) || 30
  //     );
  //     payload.append("doctorProfile[doctorBio]", formData.doctorBio);
  //     payload.append(
  //       "doctorProfile[bookingInstructions]",
  //       formData.bookingInstructions
  //     );

  //     // معالجة اللغات كمصفوفة
  //     const languagesArray = formData.languages
  //       .split(",")
  //       .map((lang) => lang.trim())
  //       .filter(Boolean);
  //     languagesArray.forEach((lang) =>
  //       payload.append("doctorProfile[languages][]", lang)
  //     );

  //     // إضافة ملف الصورة الشخصية إذا تم اختياره
  //     if (profileImageFile) {
  //       payload.append("profileImage", profileImageFile);
  //     }

  //     // إضافة ملفات التراخيص الجديدة
  //     newLicenseDocsFiles.forEach((file) => {
  //       payload.append("licenseDocuments", file); // الخادم يجب أن يكون مستعدًا لاستقبال مصفوفة ملفات
  //     });

  //     // ملاحظة: لإرسال مصفوفة الملفات licenseDocuments،
  //     // قد تحتاج الواجهة الخلفية لمعالجة خاصة (مثل استخدام multer.array()).
  //     // اسم الحقل "licenseDocuments" سيتم إرساله عدة مرات إذا كان هناك عدة ملفات.

  //     updateDoctorRequest(async () => {
  //       // يجب أن تكون globalApi.updateDoctor مهيأة لاستقبال FormData
  //       const response = await globalApi.updateDoctor(doctorId, payload);
  //       if (response.data || response.success) {
  //         // تحقق من success أيضًا
  //         showToast("success", "تم تحديث بيانات الطبيب بنجاح!");
  //         navigate(`/dashboard/doctors/${doctorId}`); // العودة لصفحة عرض الملف الشخصي
  //       } else {
  //         showToast("error", response.error || "فشل تحديث بيانات الطبيب.");
  //       }
  //       return response;
  //     });
  //   };

  if (fetchLoading) {
    // عرض هيكل التحميل فقط إذا لم تكن هناك بيانات أولية
    return (
      <div
        className="p-4 md:p-6 lg:p-8 dark:bg-gray-900 min-h-screen"
        dir="rtl"
      >
        <DashPageHeader
          Icon={FaUserDoctor}
          title="تعديل ملف الطبيب"
          description="جاري تحميل بيانات الطبيب..."
        />
        <EditDoctorProfileSkeleton />
      </div>
    );
  }

  if (fetchError) {
    return (
      <div
        className="p-4 md:p-6 lg:p-8 dark:bg-gray-900 min-h-screen flex flex-col items-center justify-center text-center"
        dir="rtl"
      >
        <AlertCircle size={56} className="mx-auto text-red-400 mb-5" />
        <h3 className="text-2xl font-semibold text-red-500 dark:text-red-400 mb-3">
          خطأ في تحميل البيانات
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">{fetchError}</p>
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
        title={`تعديل ملف الطبيب: ${doctorData?.fullName?.first || ""} ${
          doctorData?.fullName?.second || ""
        }`}
        description="يرجى تحديث المعلومات المطلوبة بعناية."
      />

      <form onSubmit={() => console.log("hello")} className="mt-8 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start">
          {/* --- عامود الصورة والاسم --- */}
          <div className="lg:col-span-5 xl:col-span-4">
            <Card
              theme={flowbit.card}
              className="shadow-xl dark:bg-gray-800 !p-0 sticky top-24"
            >
              <div className="flex flex-col items-center p-6 pt-8">
                <Avatar
                  img={
                    doctorData?.profileImage ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      doctorData?.fullName?.first || "D"
                    )}+${encodeURIComponent(
                      doctorData?.fullName?.second || ""
                    )}&background=048CFF&color=fff&font-size=0.45&bold=true`
                  }
                  rounded
                  size="xl"
                  bordered
                  color="primary"
                  className="mb-4  ring-4 ring-white dark:ring-gray-700"
                />
                <Label
                  htmlFor="profileImageFile"
                  className="cursor-pointer text-sm text-primaryColor  hover:text-primaryColor-700 dark:text-primaryColor-400 dark:hover:text-primaryColor-300 font-medium mb-4 flex items-center gap-2"
                >
                  <HiOutlinePhotograph size={18} />
                  <span>تغيير الصورة الشخصية</span>
                </Label>
                <FileInput
                  id="profileImageFile"
                  name="profileImageFile" // مهم لـ FormData
                  className="hidden"
                  //   onChange={handleProfileImageChange}
                  accept="image/png, image/jpeg, image/jpg"
                />
                <h5 className="mb-1 text-xl font-bold text-gray-900 dark:text-white text-center">
                  {doctorData?.fullName?.first} {doctorData?.fullName?.second}
                </h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {doctorData?.email}
                </span>
              </div>
            </Card>
          </div>

          {/* --- عامود حقول التعديل --- */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-6">
            {/* المعلومات الشخصية */}
            <Card theme={flowbit.card} className="shadow-xl dark:bg-gray-800">
              <h3 className="text-lg font-semibold text-primaryColor-700 dark:text-primaryColor-400 mb-4 border-b pb-3 dark:border-gray-700 flex items-center gap-2">
                <HiOutlineUserCircle size={22} /> المعلومات الشخصية
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                <div>
                  <Label htmlFor="firstName">الاسم الأول</Label>
                  <TextInput
                    id="firstName"
                    name="firstName"
                    value={doctorData?.fullName?.first}
                    theme={flowbit.textInput}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">اللقب</Label>
                  <TextInput
                    id="lastName"
                    name="lastName"
                    value={doctorData?.fullName?.second}
                    theme={flowbit.textInput}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="gender">الجنس</Label>
                  <Select
                    id="gender"
                    name="gender"
                    value={doctorData?.gender}
                    theme={flowbit.select}
                    required
                  >
                    <option value="">اختر الجنس</option>
                    <option value="male">ذكر</option>
                    <option value="female">أنثى</option>
                  </Select>
                </div>
              </div>
            </Card>

            {/* معلومات الاتصال والعنوان */}
            <Card theme={flowbit.card} className="shadow-xl dark:bg-gray-800">
              <h3 className="text-lg font-semibold text-primaryColor-700 dark:text-primaryColor-400 mb-4 border-b pb-3 dark:border-gray-700 flex items-center gap-2">
                <HiOutlineMail size={22} /> معلومات الاتصال والعنوان
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                <div>
                  <Label htmlFor="email">البريد الإلكتروني</Label>
                  <TextInput
                    id="email"
                    name="email"
                    type="email"
                    value={doctorData?.email}
                    theme={flowbit.textInput}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">رقم الهاتف</Label>
                  <TextInput
                    id="phone"
                    name="phone"
                    type="tel"
                    value={doctorData?.phone}
                    theme={flowbit.textInput}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="state">الولاية</Label>
                  <Select
                    id="state"
                    name="state"
                    value={doctorData?.state}
                    theme={flowbit.select}
                    required
                  >
                    {(states || []).map((s) => (
                      <option key={s.id || s.value || s.name} value={s.name}>
                        {s.name}
                      </option>
                    ))}
                  </Select>
                </div>
                <div>
                  <Label htmlFor="city">المدينة/البلدية</Label>
                  <TextInput
                    id="city"
                    name="city"
                    value={doctorData?.city}
                    theme={flowbit.textInput}
                  />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="address">العنوان التفصيلي (اختياري)</Label>
                  <TextInput
                    id="address"
                    name="address"
                    value={doctorData?.address}
                    theme={flowbit.textInput}
                  />
                </div>
              </div>
            </Card>

            {/* المعلومات المهنية */}
            <Card theme={flowbit.card} className="shadow-xl dark:bg-gray-800">
              <h3 className="text-lg font-semibold text-primaryColor-700 dark:text-primaryColor-400 mb-4 border-b pb-3 dark:border-gray-700 flex items-center gap-2">
                <HiOutlineBriefcase size={22} /> المعلومات المهنية
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                <div>
                  <Label htmlFor="specialization">التخصص الطبي</Label>
                  <Select
                    id="specialization"
                    name="specialization"
                    value={doctorData?.doctorProfile?.specialization}
                    theme={flowbit.select}
                    required
                  >
                    {(specializations || []).map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </Select>
                </div>
                <div>
                  <Label htmlFor="experienceYears">سنوات الخبرة</Label>
                  <TextInput
                    id="experienceYears"
                    name="experienceYears"
                    type="number"
                    min="0"
                    value={doctorData?.doctorProfile?.experienceYears}
                    theme={flowbit.textInput}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="workplace">مكان العمل الأساسي</Label>
                  <TextInput
                    id="workplace"
                    name="workplace"
                    value={doctorData?.doctorProfile?.workplace}
                    theme={flowbit.textInput}
                  />
                </div>
                <div>
                  <Label htmlFor="consultationPrice">سعر الاستشارة (دج)</Label>
                  <TextInput
                    id="consultationPrice"
                    name="consultationPrice"
                    type="number"
                    min="0"
                    value={doctorData?.doctorProfile?.consultationPrice}
                    theme={flowbit.textInput}
                    icon={HiOutlineCurrencyDollar}
                  />
                </div>
                <div>
                  <Label htmlFor="slotDurationInMinutes">
                    مدة الجلسة (بالدقائق)
                  </Label>
                  <Select
                    id="slotDurationInMinutes"
                    name="slotDurationInMinutes"
                    value={doctorData?.doctorProfile?.slotDurationInMinutes}
                    theme={flowbit.select}
                    icon={HiOutlineClock}
                  >
                    {durationOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>
            </Card>

            {/* النبذة والتعليمات */}
            <Card theme={flowbit.card} className="shadow-xl dark:bg-gray-800">
              <h3 className="text-lg font-semibold text-primaryColor-700 dark:text-primaryColor-400 mb-4 border-b pb-3 dark:border-gray-700 flex items-center gap-2">
                <HiOutlinePencilAlt size={22} /> النبذة التعريفية وتعليمات الحجز
              </h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="doctorBio">نبذة تعريفية عن الطبيب</Label>
                  <Textarea
                    id="doctorBio"
                    name="doctorBio"
                    value={doctorData?.doctorProfile?.doctorBio}
                    theme={flowbit.textarea}
                    rows={5}
                    placeholder="اكتب نبذة مختصرة عن خبراتك وإنجازاتك..."
                  />
                </div>
                <div>
                  <Label htmlFor="bookingInstructions">
                    تعليمات إضافية للحجز (اختياري)
                  </Label>
                  <Textarea
                    id="bookingInstructions"
                    name="bookingInstructions"
                    value={doctorData?.doctorProfile?.bookingInstructions}
                    theme={flowbit.textarea}
                    rows={3}
                    placeholder="مثال: يرجى إحضار التحاليل السابقة، الحضور قبل الموعد بـ 15 دقيقة..."
                  />
                </div>
              </div>
            </Card>

            {/* وثائق التحقق */}
            <Card theme={flowbit.card} className="shadow-xl dark:bg-gray-800">
              <h3 className="text-lg font-semibold text-primaryColor-700 dark:text-primaryColor-400 mb-4 border-b pb-3 dark:border-gray-700 flex items-center gap-2">
                <HiOutlineDocumentDuplicate size={22} /> وثائق التراخيص
                والشهادات
              </h3>
              <div className="space-y-3 mb-4">
                <Label>الوثائق المرفوعة حاليًا:</Label>
                {existingLicenseDocs.length > 0 ? (
                  <ul className="list-disc list-inside pl-5 text-sm space-y-1">
                    {existingLicenseDocs.map((docUrl, index) => {
                      const docName =
                        typeof docUrl === "string"
                          ? docUrl.split("/").pop().split("?")[0]
                          : `وثيقة ${index + 1}`;
                      const decodedDocName = decodeURIComponent(docName);
                      return (
                        <li
                          key={index}
                          className="text-gray-600 dark:text-gray-300"
                        >
                          <a
                            href={parseImgUrl(docUrl)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline text-primaryColor-600 dark:text-primaryColor-400"
                          >
                            {decodedDocName}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                    لا توجد وثائق مرفوعة حاليًا.
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="newLicenseDocsFiles">
                  إضافة وثائق جديدة (متعددة):
                </Label>
                <FileInput
                  id="newLicenseDocsFiles"
                  name="newLicenseDocsFiles"
                  multiple
                  theme={flowbit.fileInput}
                  className="[&_button]:text-xs [&_input]:text-xs"
                />
                {newLicenseDocsFiles.length > 0 && (
                  <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                    ملفات مختارة للرفع:{" "}
                    {newLicenseDocsFiles.map((f) => f.name).join(", ")}
                  </div>
                )}
              </div>
            </Card>

            {/* أزرار الإجراءات */}
            <div className="flex justify-end items-center gap-3 pt-6 border-t dark:border-gray-700 mt-8">
              <Button
                color="gray"
                onClick={() => navigate(-1)}
                theme={flowbit.button}
                className="dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700 shadow-sm hover:shadow-md"
              >
                إلغاء
              </Button>
              <Button
                type="submit"
                color="primary"
                theme={flowbit.button}
                disabled={updateLoading || fetchLoading}
                className="min-w-[150px] shadow-md hover:shadow-lg"
              >
                <HiOutlineSave className="ml-2 h-5 w-5" />
                {updateLoading ? "جاري الحفظ..." : "حفظ التغييرات"}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
