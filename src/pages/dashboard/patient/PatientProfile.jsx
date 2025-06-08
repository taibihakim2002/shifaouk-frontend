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
  Datepicker,
  Tooltip,
  Spinner,
} from "flowbite-react";
import DashPageHeader from "../../../components/dashboard/common/DashPageHeader";
import flowbit from "../../../config/flowbit";
import useApiRequest from "../../../hooks/useApiRequest";
import globalApi from "../../../utils/globalApi";
import useAuthStore from "../../../store/authStore";
import useToastStore from "../../../store/toastStore";
import parseImgUrl from "../../../utils/parseImgUrl";
import formatDateTime from "../../../utils/formatDateTime";
import {
  HiOutlineUserCircle,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
  HiOutlineCalendar,
  HiOutlineIdentification,
  HiOutlineSave,
  HiOutlinePhotograph,
  HiOutlineKey,
  HiOutlineExclamationCircle,
  HiOutlinePaperClip,
  HiOutlinePlus,
  HiOutlineTrash,
  HiOutlineArrowLeft,
} from "react-icons/hi";
import { MdOutlineMedicalServices } from "react-icons/md";
import { FaUserAlt, FaKey } from "react-icons/fa";
import { FiUploadCloud } from "react-icons/fi";
import {
  AlertTriangle,
  Droplets,
  HeartPulse,
  Dna,
  Stethoscope,
  FilePlus2,
} from "lucide-react";
import { HiOutlineDocumentDuplicate, HiOutlinePencil } from "react-icons/hi2";

// --- Static Data for Demonstration ---
const allWilayas = [
  { value: "", label: "اختر الولاية" },
  { id: 1, name: "أدرار" },
  { id: 16, name: "الجزائر" },
  { id: 31, name: "وهران" },
]; // Example
const bloodTypes = ["", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const genderOptions = [
  { value: "", label: "اختر الجنس" },
  { value: "male", label: "ذكر" },
  { value: "female", label: "أنثى" },
];

// --- Helper Components ---
const SectionCard = ({ title, icon: Icon, children }) => (
  <Card theme={flowbit.card} className="shadow-xl dark:bg-gray-800 w-full">
    <h3 className="text-xl font-semibold text-primaryColor dark:text-primaryColor-400 mb-5 flex items-center gap-3 border-b border-gray-200 dark:border-gray-700 pb-3">
      <Icon size={24} /> {title}
    </h3>
    <div className="space-y-5">{children}</div>
  </Card>
);

export default function PatientProfile() {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
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
    birthDate: null,
    state: "",
    city: "",
    address: "",
    profileImage: "",
    // New medical fields
    bloodType: "",
    medicalHistory: "",
    surgeries: "",
    familyHistory: "",
    allergies: "",
    chronicDiseases: "",
    currentMedications: "",
  });

  const [currentProfileImageUrl, setCurrentProfileImageUrl] = useState(null);
  const [newProfileImageFile, setNewProfileImageFile] = useState(null);

  const [existingFiles, setExistingFiles] = useState([]);
  const [newFiles, setNewFiles] = useState([]); // To handle new files before upload

  useEffect(() => {
    if (user) {
      const patientProfile = user.patientProfile || {};
      setFormData({
        firstName: user.fullName?.first || "",
        lastName: user.fullName?.second || "",
        email: user.email || "",
        phone: user.phone || "",
        gender: user.gender || "",
        birthDate: user.birthDate ? new Date(user.birthDate) : null,
        state: user.state || "",
        city: user.city || "",
        address: user.address || "", // Assuming address is top-level
        bloodType: user.patientProfile.bloodType || "",
        medicalHistory: user.patientProfile.medicalHistory?.join("\n") || "",
        surgeries: user.patientProfile.surgeries?.join("\n") || "",
        familyHistory: user.patientProfile.familyHistory?.join("\n") || "",
        allergies: user.patientProfile.allergies?.join("\n") || "",
        chronicDiseases: user.patientProfile.chronicDiseases?.join("\n") || "",
        currentMedications:
          user.patientProfile.currentMedications?.join("\n") || "",
      });
      setCurrentProfileImageUrl(
        user.profileImage ? parseImgUrl(user.profileImage) : null
      );
      setExistingFiles(user.patientProfile.uploadedFiles || []);
    }
  }, [user]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({ ...prev, birthDate: date }));
  };

  const handleProfileImageChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setNewProfileImageFile(file);
      setCurrentProfileImageUrl(URL.createObjectURL(file));
    }
  };

  // --- Functions to manage new medical files ---
  const handleNewFileChange = (index, field, value) => {
    const updatedFiles = [...newFiles];
    updatedFiles[index][field] = value;
    setNewFiles(updatedFiles);
  };

  const addNewFileRow = () => {
    setNewFiles([...newFiles, { name: "", date: new Date(), file: null }]);
  };

  const removeNewFileRow = (index) => {
    setNewFiles(newFiles.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.firstName.trim()) {
      errors.firstName = "الاسم مطلوب";
    } else if (
      formData.firstName.length < 2 ||
      formData.firstName.length > 20
    ) {
      errors.firstName = "الاسم يجب أن يكون بين 2 و 20 أحرف";
    }
    if (!formData.lastName.trim()) {
      errors.lastName = "اللقب مطلوب";
    } else if (formData.lastName.length < 2 || formData.lastName.length > 20) {
      errors.lastName = "اللقب يجب أن يكون بين 2 و 20 أحرف";
    }

    if (!formData.phone.trim()) {
      errors.phone = "رقم الهاتف مطلوب";
    } else if (!/^0[567][0-9]{8}$/.test(formData.phone)) {
      errors.phone = "رقم الهاتف غير صالح";
    }
    if (!formData.gender.trim()) {
      errors.gender = "يرجى اختيار الجنس";
    }
    return errors;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;
    const newformData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value === null || value === undefined) return;
      newformData.append(
        key,
        typeof value === "boolean" ? String(value) : value
      );
    });
    if (newProfileImageFile) {
      newformData.append("profileImage", newProfileImageFile); // ✅ هذا ضروري جداً
    }
    newFiles.forEach((entry, index) => {
      if (entry.file) {
        newformData.append("files", entry.file);
        newformData.append(`fileNames[${index}]`, entry.name);
        newformData.append(`fileDates[${index}]`, entry.date.toISOString());
      }
    });

    const {
      success,
      data,
      error: requestError,
    } = await updateProfileRequest(() => globalApi.updatePatient(newformData));

    if (success) {
      console.log(data);
      showToast("success", "تم تحديث بياناتك بنجاح  ");
      setUser(data.data);
    } else {
      showToast("error", requestError);
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 dark:bg-gray-900 min-h-screen" dir="rtl">
      <DashPageHeader
        Icon={FaUserAlt}
        title="الملف الشخصي الطبي"
        description="حافظ على تحديث معلوماتك الشخصية والطبية لمساعدة الأطباء على تقديم أفضل رعاية لك."
      />

      <form onSubmit={handleSubmit} className="mt-8 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start">
          {/* --- Left-side column for main actions & profile pic --- */}
          <div className="lg:col-span-4 xl:col-span-4 w-full">
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
                          formData.firstName || "P"
                        )}+${encodeURIComponent(
                          formData.lastName || ""
                        )}&background=6366F1&color=fff&size=128&font-size=0.45&bold=true`
                      }
                      rounded
                      size="xl"
                      bordered
                      color="indigo"
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
                {updateLoading ? "جاري الحفظ..." : "حفظ التغييرات"}
              </Button>
            </div>
          </div>

          {/* --- Right-side column for form fields --- */}
          <div className="lg:col-span-7 xl:col-span-8 w-full space-y-6">
            <SectionCard title="المعلومات الأساسية" icon={HiOutlineUserCircle}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
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
                    color={formErrors.firstName ? "failure" : "gray"}
                  />
                  {formErrors.firstName && (
                    <p className="text-[12px] text-red-600">
                      {formErrors.firstName}
                    </p>
                  )}
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
                    color={formErrors.lastName ? "failure" : "gray"}
                    required
                  />
                  {formErrors.lastName && (
                    <p className="text-[12px] text-red-600">
                      {formErrors.lastName}
                    </p>
                  )}
                </div>
                <div>
                  <Label
                    htmlFor="birthDate"
                    className="mb-1.5 block text-sm font-medium"
                  >
                    تاريخ الميلاد
                  </Label>
                  <Datepicker
                    id="birthDate"
                    language="ar"
                    theme={flowbit.customThemeDatePicker}
                    value={formData.birthDate}
                    onChange={handleDateChange}
                    maxDate={new Date()}
                    className="[&_input]:p-2.5 [&_input]:text-sm"
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
                    color={formErrors.gender ? "failure" : "gray"}
                  >
                    <option value="">اختر جنس</option>
                    <option value="ذكر">ذكر</option>
                    <option value="انثى">انثى</option>
                  </Select>
                  {formErrors.gender && (
                    <p className="text-[12px] text-red-600">
                      {formErrors.gender}
                    </p>
                  )}
                </div>
              </div>
            </SectionCard>

            {/* Contact and Address Section */}
            <SectionCard title="معلومات الاتصال والعنوان" icon={HiOutlineMail}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                <div>
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
                  {formErrors.phone && (
                    <p className="text-[12px] text-red-600">
                      {formErrors.phone}
                    </p>
                  )}
                </div>
                <div>
                  <Label
                    htmlFor="state"
                    className="mb-1.5 block text-sm font-medium"
                  >
                    الولاية
                  </Label>
                  <Select
                    id="state"
                    value={formData.state}
                    onChange={handleChange}
                    theme={flowbit.select}
                    icon={HiOutlineLocationMarker}
                  >
                    {allWilayas.map((w) => (
                      <option key={w.value || w.id} value={w.value || w.name}>
                        {w.label || w.name}
                      </option>
                    ))}
                  </Select>
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
                    icon={HiOutlineLocationMarker}
                  />
                </div>
                <div className="md:col-span-2">
                  <Label
                    htmlFor="address"
                    className="mb-1.5 block text-sm font-medium"
                  >
                    العنوان التفصيلي (اختياري)
                  </Label>
                  <TextInput
                    id="address"
                    value={formData.address}
                    onChange={handleChange}
                    theme={flowbit.textInput}
                  />
                </div>
              </div>
            </SectionCard>

            <SectionCard title="معلومات طبية أساسية" icon={HeartPulse}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
                <div>
                  <Label
                    htmlFor="bloodType"
                    className="mb-1.5 block text-sm font-medium"
                  >
                    فصيلة الدم
                  </Label>
                  <Select
                    id="bloodType"
                    value={formData.bloodType}
                    onChange={handleChange}
                    theme={flowbit.select}
                    icon={Droplets}
                  >
                    {bloodTypes.map((type) => (
                      <option key={type} value={type}>
                        {type || "اختر فصيلة الدم"}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 mt-5 gap-y-5">
                <div>
                  <Label
                    htmlFor="currentMedications"
                    className="mb-1.5 block text-sm font-medium"
                  >
                    الأدوية الحالية (كل دواء في سطر)
                  </Label>
                  <Textarea
                    id="currentMedications"
                    value={formData.currentMedications}
                    onChange={handleChange}
                    theme={flowbit.textarea}
                    rows={3}
                    placeholder="مثال: Aspirin 100mg"
                  />
                </div>
              </div>
            </SectionCard>

            <SectionCard
              title="السجل الطبي (كل حالة في سطر)"
              icon={MdOutlineMedicalServices}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                <div>
                  <Label
                    htmlFor="surgeries"
                    className="mb-1.5 block text-sm font-medium"
                  >
                    العمليات الجراحية السابقة (كل حالة في سطر)
                  </Label>
                  <Textarea
                    id="surgeries"
                    value={formData.surgeries}
                    onChange={handleChange}
                    theme={flowbit.textarea}
                    placeholder="مثال: عملية جراحية عن الكبد 2015"
                    rows={4}
                  />
                </div>
                <div>
                  <Label
                    htmlFor="familyHistory"
                    className="mb-1.5 block text-sm font-medium"
                  >
                    الأمراض الوراثية في العائلة (كل حالة في سطر)
                  </Label>
                  <Textarea
                    id="familyHistory"
                    value={formData.familyHistory}
                    onChange={handleChange}
                    theme={flowbit.textarea}
                    placeholder="مثال: مرض عائلي "
                    rows={4}
                  />
                </div>
                <div>
                  <Label
                    htmlFor="allergies"
                    className="mb-1.5 block text-sm font-medium"
                  >
                    الحساسية (كل حالة في سطر)
                  </Label>
                  <Textarea
                    id="allergies"
                    value={formData.allergies}
                    onChange={handleChange}
                    theme={flowbit.textarea}
                    placeholder="مثال: حساسية من دواء "
                    rows={3}
                  />
                </div>
                <div>
                  <Label
                    htmlFor="chronicDiseases"
                    className="mb-1.5 block text-sm font-medium"
                  >
                    الأمراض المزمنة (كل حالة في سطر)
                  </Label>
                  <Textarea
                    id="chronicDiseases"
                    value={formData.chronicDiseases}
                    onChange={handleChange}
                    theme={flowbit.textarea}
                    placeholder="مثال: مرض السكري منذ 2015"
                    rows={3}
                  />
                </div>
              </div>
            </SectionCard>

            <SectionCard
              title="السجلات والملفات الطبية"
              icon={HiOutlineDocumentDuplicate}
            >
              {existingFiles.length > 0 && (
                <div className="mb-4">
                  <Label className="mb-2 block text-sm font-medium">
                    الملفات المرفوعة سابقًا
                  </Label>
                  <div className="space-y-2">
                    {existingFiles.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 bg-slate-50 dark:bg-gray-700/60 rounded-md border dark:border-gray-600"
                      >
                        <a
                          href={parseImgUrl(file.url)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-primaryColor-600 hover:underline"
                        >
                          <HiOutlinePaperClip /> {file.name}
                        </a>
                        <span className="text-xs text-gray-400">
                          {formatDateTime(file.date, "date")}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="space-y-4">
                <Label className="text-sm font-medium">
                  إضافة ملفات طبية جديدة
                </Label>
                {newFiles.map((fileEntry, index) => (
                  <div
                    key={index}
                    className="flex items-end gap-3 p-3 bg-slate-50 dark:bg-gray-700/60 rounded-lg border dark:border-gray-600/50"
                  >
                    <div className="flex-grow">
                      <Label
                        htmlFor={`newFileName-${index}`}
                        className="mb-1.5 text-xs"
                      >
                        اسم الوثيقة {index + 1}
                      </Label>
                      <TextInput
                        id={`newFileName-${index}`}
                        value={fileEntry.name}
                        onChange={(e) =>
                          handleNewFileChange(index, "name", e.target.value)
                        }
                        placeholder="مثال: تحليل دم"
                        required
                        theme={flowbit.textInput}
                        sizing="sm"
                      />
                    </div>
                    <div className="flex-grow">
                      <Label
                        htmlFor={`newFileDate-${index}`}
                        className="mb-1.5 text-xs"
                      >
                        تاريخ الوثيقة
                      </Label>
                      <Datepicker
                        id={`newFileDate-${index}`}
                        onChanged={(date) =>
                          handleNewFileChange(index, "date", date)
                        }
                        theme={flowbit.datepicker}
                        sizing="sm"
                        language="ar"
                        // value={fileEntry.date}
                      />
                    </div>
                    <div className="flex-grow-[2]">
                      <Label
                        htmlFor={`newFile-${index}`}
                        className="mb-1.5 text-xs"
                      >
                        اختر الملف
                      </Label>
                      <FileInput
                        id={`newFile-${index}`}
                        onChange={(e) =>
                          handleNewFileChange(
                            index,
                            "file",
                            e.target.files?.[0]
                          )
                        }
                        size="sm"
                        required
                      />
                    </div>
                    <Tooltip content="إزالة هذا الحقل">
                      <Button
                        type="button"
                        size="sm"
                        color="light"
                        onClick={() => removeNewFileRow(index)}
                        className="!p-2.5 flex-shrink-0 dark:!bg-gray-600 dark:!border-gray-500"
                      >
                        <HiOutlineTrash className="h-4 w-4 text-red-600" />
                      </Button>
                    </Tooltip>
                  </div>
                ))}
                <Button
                  type="button"
                  color="light"
                  size="xs"
                  onClick={addNewFileRow}
                  theme={flowbit.button}
                  className="dark:!bg-gray-600 dark:!border-gray-500"
                >
                  <HiOutlinePlus size={14} />
                  إضافة ملف جديد
                </Button>
              </div>
            </SectionCard>
          </div>
        </div>
      </form>
    </div>
  );
}
