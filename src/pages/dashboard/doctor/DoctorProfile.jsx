import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Button,
  Label,
  TextInput,
  Textarea,
  Select,
  Avatar,
  Card,
  FileInput,
  Tooltip,
} from "flowbite-react";
import DashPageHeader from "../../../components/dashboard/common/DashPageHeader";
import flowbit from "../../../config/flowbit";
import useApiRequest from "../../../hooks/useApiRequest";
import globalApi from "../../../utils/globalApi";
import useAuthStore from "../../../store/authStore";
import useToastStore from "../../../store/toastStore";
import parseImgUrl from "../../../utils/parseImgUrl";
import {
  HiOutlineUserCircle,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
  HiOutlineIdentification,
  HiOutlineSave,
  HiOutlinePhotograph,
  HiOutlineShieldCheck,
  HiOutlinePencilAlt,
  HiOutlinePencil,
  HiOutlineCurrencyDollar,
  HiOutlineClock,
  HiOutlineTranslate,
} from "react-icons/hi";
import {
  MdDeleteForever,
  MdOutlineAttachMoney,
  MdOutlineTimer,
} from "react-icons/md";
import {
  FaUserAlt,
  FaKey,
  FaBriefcase,
  FaGraduationCap,
  FaRegAddressCard,
  FaStethoscope,
} from "react-icons/fa";
import { FiUploadCloud } from "react-icons/fi";
import { AlertTriangle, Languages, Edit3 } from "lucide-react";
import { BsCamera, BsTrash } from "react-icons/bs";
import specializations from "../../../data/specializations"; // بيانات التخصصات
import states from "../../../data/states"; // بيانات الولايات
import { FaUserDoctor } from "react-icons/fa6";

// خيارات مدة الجلسة
const durationOptions = [
  { value: 15, label: "15 دقيقة" },
  { value: 30, label: "30 دقيقة" },
  { value: 45, label: "45 دقيقة" },
  { value: 60, label: "ساعة واحدة (60 دقيقة)" },
  { value: 75, label: "ساعة وربع (75 دقيقة)" },
  { value: 90, label: "ساعة ونصف (90 دقيقة)" },
];

const genderOptions = [
  { value: "", label: "اختر الجنس" },
  { value: "male", label: "ذكر" },
  { value: "female", label: "أنثى" },
];

// --- Helper Component ---
const SectionCard = ({ title, icon: Icon, children }) => (
  <Card theme={flowbit.card} className="shadow-xl dark:bg-gray-800 w-full">
    <h3 className="text-xl font-semibold text-primaryColor dark:text-primaryColor-400 mb-5 flex items-center gap-3 border-b border-gray-200 dark:border-gray-700 pb-3">
      <Icon size={24} /> {title}
    </h3>
    <div className="space-y-5">{children}</div>
  </Card>
);

export default function DoctorProfile() {
  const navigate = useNavigate();
  const { user, setUser } = useAuthStore();
  const { showToast } = useToastStore();
  const { loading: updateLoading, request: updateProfileRequest } =
    useApiRequest();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    state: "",
    city: "",
    address: "",
    specialization: "",
    experienceYears: "",
    workplace: "",
    consultationPrice: "",
    slotDurationInMinutes: 30,
    languages: "",
    doctorBio: "",
    bookingInstructions: "",
  });

  const [currentProfileImageUrl, setCurrentProfileImageUrl] = useState(null);
  const [newProfileImageFile, setNewProfileImageFile] = useState(null);

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.fullName?.first || "",
        lastName: user.fullName?.second || "",
        email: user.email || "",
        phone: user.phone || "",
        gender: user.gender || "",
        state: user.state || "",
        city: user.city || "",
        address: user.address || "",
        specialization: user.doctorProfile?.specialization || "",
        experienceYears: user.doctorProfile?.experienceYears || "",
        workplace: user.doctorProfile?.workplace || "",
        consultationPrice: user.doctorProfile?.consultationPrice || "",
        slotDurationInMinutes: user.doctorProfile?.slotDurationInMinutes || 30,
        languages: user.doctorProfile?.languages?.join(", ") || "",
        doctorBio: user.doctorProfile?.doctorBio || "",
        bookingInstructions: user.doctorProfile?.bookingInstructions || "",
      });
      setCurrentProfileImageUrl(
        user.profileImage ? parseImgUrl(user.profileImage) : null
      );
    }
  }, [user]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleProfileImageChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setNewProfileImageFile(file);
      setCurrentProfileImageUrl(URL.createObjectURL(file));
    }
  };

  const handleRemoveProfileImage = () => {
    setNewProfileImageFile(null);
    setCurrentProfileImageUrl(null);
    showToast("info", "تمت إزالة الصورة. احفظ التغييرات لتطبيقها.");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = new FormData();

    // Append top-level fields
    payload.append("fullName[first]", formData.firstName);
    payload.append("fullName[second]", formData.lastName);
    payload.append("phone", formData.phone);
    payload.append("gender", formData.gender);
    payload.append("state", formData.state);
    payload.append("city", formData.city);
    payload.append("address", formData.address);

    // Append doctorProfile fields
    payload.append("doctorProfile[specialization]", formData.specialization);
    payload.append(
      "doctorProfile[experienceYears]",
      Number(formData.experienceYears) || 0
    );
    payload.append("doctorProfile[workplace]", formData.workplace);
    payload.append(
      "doctorProfile[consultationPrice]",
      Number(formData.consultationPrice) || 0
    );
    payload.append(
      "doctorProfile[slotDurationInMinutes]",
      Number(formData.slotDurationInMinutes) || 30
    );
    payload.append("doctorProfile[doctorBio]", formData.doctorBio);
    payload.append(
      "doctorProfile[bookingInstructions]",
      formData.bookingInstructions
    );
    const languagesArray = formData.languages
      .split(",")
      .map((lang) => lang.trim())
      .filter(Boolean);
    languagesArray.forEach((lang) =>
      payload.append("doctorProfile[languages][]", lang)
    );

    // Append image file if changed
    if (newProfileImageFile) {
      payload.append("profileImage", newProfileImageFile);
    } else if (!currentProfileImageUrl && user?.profileImage) {
      payload.append("removeProfileImage", "true");
    }

    const { success, data, error } = await updateProfileRequest(
      () => globalApi.updateDoctorProfile(payload) // Assuming this API function exists
    );

    if (success && data?.data) {
      showToast("success", "تم تحديث ملفك الشخصي بنجاح!");
      setUser(data.data); // Update global user state
    } else {
      showToast("error", error || "فشل تحديث الملف الشخصي.");
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 dark:bg-gray-900 min-h-screen" dir="rtl">
      <DashPageHeader
        Icon={FaUserAlt}
        title="تعديل الملف الشخصي"
        description="قم بتحديث معلوماتك الشخصية والمهنية لتقديم أفضل خدمة لمرضاك."
      />

      <form onSubmit={handleSubmit} className="mt-8 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start">
          {/* --- Sidebar Column --- */}
          <div className="lg:col-span-5 xl:col-span-4 w-full">
            <div className="sticky top-24 space-y-6">
              <Card
                theme={flowbit.card}
                className="shadow-xl dark:bg-gray-800 !p-0"
              >
                <div className="flex flex-col items-center p-6 text-center">
                  <div className="relative mb-4">
                    <Avatar
                      img={
                        currentProfileImageUrl ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          formData.firstName || "D"
                        )}+${encodeURIComponent(
                          formData.lastName || ""
                        )}&background=048CFF&color=fff&size=128&font-size=0.45&bold=true`
                      }
                      rounded
                      size="xl"
                      bordered
                      color="primary"
                      className="ring-4 ring-white dark:ring-gray-700 shadow-lg"
                    />
                    <Label
                      htmlFor="profileImageFile"
                      className="absolute -bottom-2 -right-2 cursor-pointer bg-white dark:bg-gray-600 p-2 rounded-full shadow-md border dark:border-gray-500 hover:bg-gray-100 dark:hover:bg-gray-500"
                    >
                      <HiOutlinePencil
                        size={20}
                        className="text-primaryColor-600 dark:text-primaryColor-300"
                      />
                    </Label>
                    <FileInput
                      id="profileImageFile"
                      className="hidden"
                      onChange={handleProfileImageChange}
                      accept="image/*"
                    />
                  </div>
                  <h5 className="text-xl font-bold text-gray-900 dark:text-white">
                    {formData.firstName} {formData.lastName}
                  </h5>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {formData.email}
                  </span>
                </div>
              </Card>
              <Button
                type="submit"
                color="primary"
                theme={flowbit.button}
                isProcessing={updateLoading}
                disabled={updateLoading}
                fullSized
                className="!py-3 !text-base !font-semibold"
              >
                <HiOutlineSave className="ml-2 h-5 w-5" />
                {updateLoading ? "جاري الحفظ..." : "حفظ كل التغييرات"}
              </Button>
            </div>
          </div>

          {/* --- Main Form Content --- */}
          <div className="lg:col-span-7 xl:col-span-8 w-full space-y-6">
            <SectionCard
              title="المعلومات الأساسية والاتصال"
              icon={HiOutlineUserCircle}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                <div>
                  <Label
                    htmlFor="firstName"
                    className="mb-1.5 block text-sm font-medium"
                  >
                    الاسم الأول
                  </Label>
                  <TextInput
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    theme={flowbit.textInput}
                    required
                  />
                </div>
                <div>
                  <Label
                    htmlFor="lastName"
                    className="mb-1.5 block text-sm font-medium"
                  >
                    اللقب
                  </Label>
                  <TextInput
                    id="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    theme={flowbit.textInput}
                    required
                  />
                </div>
                <div>
                  <Label
                    htmlFor="gender"
                    className="mb-1.5 block text-sm font-medium"
                  >
                    الجنس
                  </Label>
                  <Select
                    id="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    theme={flowbit.select}
                    required
                  >
                    <option value={""}>اختر الجنس</option>
                    <option value={"ذكر"}>ذكر </option>
                    <option value={"انثى"}>انثى </option>
                  </Select>
                </div>
                <div>
                  <Label
                    htmlFor="phone"
                    className="mb-1.5 block text-sm font-medium"
                  >
                    رقم الهاتف
                  </Label>
                  <TextInput
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    theme={flowbit.textInput}
                    icon={HiOutlinePhone}
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <Label
                    htmlFor="email"
                    className="mb-1.5 block text-sm font-medium text-gray-500"
                  >
                    البريد الإلكتروني (لا يمكن تعديله)
                  </Label>
                  <TextInput
                    id="email"
                    type="email"
                    value={formData.email}
                    theme={flowbit.textInput}
                    icon={HiOutlineMail}
                    readOnly
                    disabled
                  />
                </div>
              </div>
            </SectionCard>

            <SectionCard
              title="العنوان ومكان العمل"
              icon={HiOutlineLocationMarker}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                <div>
                  <Label
                    htmlFor="state"
                    className="mb-1.5 block text-sm font-medium"
                  >
                    الولاية
                  </Label>
                  <TextInput
                    id="state"
                    value={formData.state}
                    onChange={handleChange}
                    theme={flowbit.select}
                  />
                </div>
                <div>
                  <Label
                    htmlFor="city"
                    className="mb-1.5 block text-sm font-medium"
                  >
                    المدينة/البلدية
                  </Label>
                  <TextInput
                    id="city"
                    value={formData.city}
                    onChange={handleChange}
                    theme={flowbit.textInput}
                  />
                </div>
                <div className="md:col-span-2">
                  <Label
                    htmlFor="address"
                    className="mb-1.5 block text-sm font-medium"
                  >
                    العنوان التفصيلي للعيادة
                  </Label>
                  <TextInput
                    id="address"
                    value={formData.address}
                    onChange={handleChange}
                    theme={flowbit.textInput}
                    placeholder="مثال: شارع الحرية، رقم 15"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label
                    htmlFor="workplace"
                    className="mb-1.5 block text-sm font-medium"
                  >
                    اسم مكان العمل (مستشفى، عيادة)
                  </Label>
                  <TextInput
                    id="workplace"
                    value={formData.workplace}
                    onChange={handleChange}
                    theme={flowbit.textInput}
                    icon={FaBriefcase}
                  />
                </div>
              </div>
            </SectionCard>

            <SectionCard
              title="المعلومات المهنية وإعدادات الحجز"
              icon={FaUserDoctor}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                <div>
                  <Label
                    htmlFor="specialization"
                    className="mb-1.5 block text-sm font-medium"
                  >
                    التخصص الطبي
                  </Label>
                  <Select
                    id="specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                    theme={flowbit.select}
                    icon={FaStethoscope}
                    required
                  >
                    <option value="">اختر التخصص</option>
                    {(specializations || []).map((spec) => (
                      <option key={spec.value} value={spec.value}>
                        {spec.label}
                      </option>
                    ))}
                  </Select>
                </div>
                <div>
                  <Label
                    htmlFor="experienceYears"
                    className="mb-1.5 block text-sm font-medium"
                  >
                    سنوات الخبرة
                  </Label>
                  <TextInput
                    id="experienceYears"
                    type="number"
                    min="0"
                    value={formData.experienceYears}
                    onChange={handleChange}
                    theme={flowbit.textInput}
                    icon={FaGraduationCap}
                    required
                  />
                </div>
                <div>
                  <Label
                    htmlFor="consultationPrice"
                    className="mb-1.5 block text-sm font-medium"
                  >
                    سعر الاستشارة (دج)
                  </Label>
                  <TextInput
                    id="consultationPrice"
                    type="number"
                    min="0"
                    value={formData.consultationPrice}
                    onChange={handleChange}
                    theme={flowbit.textInput}
                    icon={HiOutlineCurrencyDollar}
                  />
                </div>
                <div>
                  <Label
                    htmlFor="slotDurationInMinutes"
                    className="mb-1.5 block text-sm font-medium"
                  >
                    مدة الجلسة الافتراضية
                  </Label>
                  <Select
                    id="slotDurationInMinutes"
                    value={formData.slotDurationInMinutes}
                    onChange={handleChange}
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
            </SectionCard>

            <SectionCard
              title="النبذة التعريفية وتعليمات الحجز"
              icon={HiOutlinePencilAlt}
            >
              <div className="space-y-5">
                <div>
                  <Label
                    htmlFor="doctorBio"
                    className="mb-1.5 block text-sm font-medium"
                  >
                    النبذة التعريفية (تظهر في ملفك العام)
                  </Label>
                  <Textarea
                    id="doctorBio"
                    value={formData.doctorBio}
                    onChange={handleChange}
                    theme={flowbit.textarea}
                    rows={6}
                    placeholder="اكتب نبذة عن خبراتك، إنجازاتك، وما يميزك كطبيب..."
                  />
                </div>
                <div>
                  <Label
                    htmlFor="bookingInstructions"
                    className="mb-1.5 block text-sm font-medium"
                  >
                    تعليمات خاصة للحجز (اختياري)
                  </Label>
                  <Textarea
                    id="bookingInstructions"
                    value={formData.bookingInstructions}
                    onChange={handleChange}
                    theme={flowbit.textarea}
                    rows={4}
                    placeholder="مثال: يرجى إحضار التقارير الطبية السابقة، الوصول قبل الموعد بـ 10 دقائق..."
                  />
                </div>
              </div>
            </SectionCard>
          </div>
        </div>
      </form>

      {/* Security and Account Management */}
      {/* <div className="mt-12 pt-8 border-t-2 border-dashed border-red-300 dark:border-red-700/50">
        <h3 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-4 flex items-center gap-3">
          <AlertTriangle /> منطقة الإجراءات الحساسة
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card
            theme={flowbit.card}
            className="shadow-lg dark:bg-gray-800 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-100 dark:bg-orange-500/20 rounded-lg">
                <FaKey
                  size={22}
                  className="text-orange-500 dark:text-orange-400"
                />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 dark:text-white">
                  تغيير كلمة المرور
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  يوصى بتحديث كلمة المرور بشكل دوري.
                </p>
              </div>
            </div>
            <Button
              as={Link}
              to="/dashboard/change-password"
              color="light"
              size="sm"
              theme={flowbit.button}
              className="mt-3 w-full sm:w-auto self-end dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
            >
              تغيير الآن
            </Button>
          </Card>
          <Card
            theme={flowbit.card}
            className="shadow-lg dark:bg-gray-800 hover:shadow-xl transition-shadow border-red-200 dark:border-red-700/50"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-100 dark:bg-red-500/20 rounded-lg">
                <MdDeleteForever
                  size={22}
                  className="text-red-500 dark:text-red-400"
                />
              </div>
              <div>
                <h4 className="font-semibold text-red-700 dark:text-red-400">
                  حذف الحساب
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  هذا الإجراء لا يمكن التراجع عنه.
                </p>
              </div>
            </div>
            <Button
              color="failure"
              size="sm"
              theme={flowbit.button}
              className="mt-3 w-full sm:w-auto self-end"
            >
              طلب حذف الحساب
            </Button>
          </Card>
        </div>
      </div> */}
    </div>
  );
}
