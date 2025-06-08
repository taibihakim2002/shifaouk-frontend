// import { FaUser, FaUserAlt } from "react-icons/fa";
// import DashPageHeader from "../../../components/dashboard/common/DashPageHeader";
// import { Button, Label, TextInput } from "flowbite-react";
// import flowbit from "../../../config/flowbit";
// import { BsCamera } from "react-icons/bs";
// import { MdDelete, MdDeleteForever } from "react-icons/md";
// import { HiMail } from "react-icons/hi";
// import { Phone } from "lucide-react";
// import { TiWarning } from "react-icons/ti";
// import { FiLogOut } from "react-icons/fi";

// const stats = [
//   { id: 1, name: "أدرار" },
//   { id: 2, name: "الشلف" },
//   { id: 3, name: "الأغواط" },
//   { id: 4, name: "أم البواقي" },
//   { id: 5, name: "باتنة" },
//   { id: 6, name: "بجاية" },
//   { id: 7, name: "بسكرة" },
//   { id: 8, name: "بشار" },
//   { id: 9, name: "البليدة" },
//   { id: 10, name: "البويرة" },
//   { id: 11, name: "تمنراست" },
//   { id: 12, name: "تبسة" },
//   { id: 13, name: "تلمسان" },
//   { id: 14, name: "تيارت" },
//   { id: 15, name: "تيزي وزو" },
//   { id: 16, name: "الجزائر" },
//   { id: 17, name: "الجلفة" },
//   { id: 18, name: "جيجل" },
//   { id: 19, name: "سطيف" },
//   { id: 20, name: "سعيدة" },
//   { id: 21, name: "سكيكدة" },
//   { id: 22, name: "سيدي بلعباس" },
//   { id: 23, name: "عنابة" },
//   { id: 24, name: "قالمة" },
//   { id: 25, name: "قسنطينة" },
//   { id: 26, name: "المدية" },
//   { id: 27, name: "مستغانم" },
//   { id: 28, name: "المسيلة" },
//   { id: 29, name: "معسكر" },
//   { id: 30, name: "ورقلة" },
//   { id: 31, name: "وهران" },
//   { id: 32, name: "البيض" },
//   { id: 33, name: "إليزي" },
//   { id: 34, name: "برج بوعريريج" },
//   { id: 35, name: "بومرداس" },
//   { id: 36, name: "الطارف" },
//   { id: 37, name: "تندوف" },
//   { id: 38, name: "تيسمسيلت" },
//   { id: 39, name: "الوادي" },
//   { id: 40, name: "خنشلة" },
//   { id: 41, name: "سوق أهراس" },
//   { id: 42, name: "تيبازة" },
//   { id: 43, name: "ميلة" },
//   { id: 44, name: "عين الدفلى" },
//   { id: 45, name: "النعامة" },
//   { id: 46, name: "عين تموشنت" },
//   { id: 47, name: "غرداية" },
//   { id: 48, name: "غليزان" },
//   { id: 49, name: "تميمون" },
//   { id: 50, name: "برج باجي مختار" },
//   { id: 51, name: "أولاد جلال" },
//   { id: 52, name: "بني عباس" },
//   { id: 53, name: "عين صالح" },
//   { id: 54, name: "عين قزام" },
//   { id: 55, name: "تقرت" },
//   { id: 56, name: "جانت" },
//   { id: 57, name: "المغير" },
//   { id: 58, name: "المنيعة" },
// ];

// export default function DoctorProfile() {
//   return (
//     <div>
//       <DashPageHeader
//         Icon={FaUserAlt}
//         title=" تعديل الملف الشخصي"
//         description="قم بتعديل معلوماتك الشخصية "
//       />
//       <div className="flex flex-col gap-2 mb-10">
//         <Label htmlFor="spec">الصورة الشخصية </Label>
//         <div className="border rounded-lg p-4 flex flex-col items-center md:flex-row gap-5">
//           <img
//             src="/doctor1.jpg"
//             alt="doctor image"
//             className="w-24 h-24 rounded-full object-cover"
//           />
//           <div className="text-center md:text-start flex-1">
//             <h3 className=" text-gray-600 mb-2 text-lg">صورة الملف الشخصي</h3>
//             <p className="text text-gray-400 ">
//               يفضل استخدام صورة بحجم 400×400 بكسل
//             </p>
//           </div>
//           <div className="flex items-center gap-2"></div>
//           <Button theme={flowbit.button} color="primary" className="flex gap-2">
//             <span>
//               <BsCamera size={18} className="text-white" />
//             </span>
//             <span>تغيير الصورة</span>
//           </Button>
//           <Button theme={flowbit.button} color="light" className="flex gap-2">
//             <span>
//               <MdDelete size={18} className="text-gray-600" />
//             </span>
//             <span>إزالة الصورة</span>
//           </Button>
//         </div>
//       </div>
//       <div className="p-5 border rounded-lg mb-10">
//         <h3 className="text-gray-600 font-bold mb-5 ">المعلومات الاساسية</h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
//           <div className="flex flex-col gap-2">
//             <Label htmlFor="name">الاسم الكامل</Label>
//             <TextInput
//               id="name"
//               type="text"
//               rightIcon={FaUser}
//               placeholder="أدخل إسمك هنا..."
//               required
//             />
//           </div>
//           <div className="flex flex-col gap-2">
//             <Label htmlFor="email">البريد الالكتروني</Label>
//             <TextInput
//               id="email"
//               type="email"
//               rightIcon={HiMail}
//               placeholder="ahmed@example.com"
//               required
//             />
//           </div>
//           <div className="flex flex-col gap-2">
//             <Label htmlFor="phone">رقم الهاتف</Label>
//             <TextInput
//               id="phone"
//               type="number"
//               rightIcon={Phone}
//               placeholder="06********"
//               required
//             />
//           </div>
//           <div className="flex flex-col gap-2" dir="rtl">
//             <Label htmlFor="password">كلمة المرور</Label>
//             <TextInput
//               id="password"
//               type="password"
//               placeholder="*************"
//               required
//             />
//           </div>
//           <div className="flex flex-col gap-2" dir="rtl">
//             <Label htmlFor="states">الولاية </Label>
//             <select
//               className="border p-1 rounded-md bg-gray-50 text-gray-900 border-gray-300 "
//               id="states"
//               required
//               defaultValue=""
//             >
//               <option value="">اختر ولاية</option>
//               {stats.map((ele) => (
//                 <option value={ele.id}>{ele.name}</option>
//               ))}
//             </select>
//           </div>
//           <div className="flex flex-col gap-2" dir="rtl">
//             <Label htmlFor="cities">البلدية </Label>
//             <select
//               className="border p-1 rounded-md bg-gray-50 text-gray-900 border-gray-300 "
//               id="cities"
//               required
//               defaultValue=""
//             >
//               <option value="">اختر بلدية </option>
//               <option>الفييييض</option>
//             </select>
//           </div>
//         </div>
//         <div className="flex justify-center gap-10">
//           <Button theme={flowbit.button} color="green">
//             حفظ
//           </Button>
//           <Button theme={flowbit.button} color="red">
//             الغاء
//           </Button>
//         </div>
//       </div>
//       <div className="p-5 border rounded-lg">
//         <div className="flex items-center gap-2 mb-3">
//           <div className="p-1 rounded-full bg-[#ffc2c2]">
//             <TiWarning className="text-[#F50000]" size={22} />
//           </div>
//           <h3 className="text-gray-600 font-bold ">منطقة الاجراءات الحساسة</h3>
//         </div>

//         <p className="text-[#F50000] text-sm p-2 bg-[#ffd4d4] rounded-lg mb-5">
//           تحذير: الإجراءات التالية قد تؤدي إلى فقدان البيانات أو تعطيل الوصول
//           إلى حسابك.
//         </p>
//         <div className="flex items-center justify-between">
//           <Button theme={flowbit.button} color="light" className="flex gap-2">
//             <span>
//               <FiLogOut size={18} />
//             </span>
//             <span>تسجيل الخروج </span>
//           </Button>
//           <Button theme={flowbit.button} color="red" className="flex gap-2">
//             <span>
//               <MdDeleteForever size={18} />
//             </span>
//             <span>إزالة الحساب</span>
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Button,
  Label,
  TextInput,
  Textarea,
  Select, // Using Flowbite Select for consistency
  FileInput,
  Avatar,
  Card, // For sectioning
  Tooltip,
} from "flowbite-react";
import DashPageHeader from "../../../components/dashboard/common/DashPageHeader";
import flowbit from "../../../config/flowbit";
import useApiRequest from "../../../hooks/useApiRequest";
import globalApi from "../../../utils/globalApi";
import useAuthStore from "../../../store/authStore"; // For getting current user
import useToastStore from "../../../store/toastStore";
import parseImgUrl from "../../../utils/parseImgUrl";
import {
  FaUserAlt,
  FaUserMd, // For specialization section
  FaBriefcase, // For workplace
  FaGraduationCap, // For experience
  FaRegAddressCard, // For address
  FaGlobeAmericas, // For languages
  FaInfoCircle, // For booking instructions
  FaKey,
  FaStethoscope, // For password
} from "react-icons/fa";
import { FiLogOut, FiSave, FiUser, FiUploadCloud } from "react-icons/fi"; // User icon for name
import {
  MdEmail,
  MdDeleteForever,
  MdOutlineAttachMoney,
  MdOutlineTimer,
  MdOutlineBook,
} from "react-icons/md";
import { Phone, Edit3, AlertTriangle } from "lucide-react";
import { BsCamera, BsTrash } from "react-icons/bs"; // BsCamera from previous
import {
  HiOutlineExclamationCircle,
  HiOutlineTranslate,
  HiOutlineShieldCheck,
  HiOutlineIdentification,
  HiOutlineLocationMarker,
  HiOutlinePhotograph,
  HiOutlineUserCircle,
  HiOutlineMail,
  HiOutlinePencilAlt,
} from "react-icons/hi";

// Assuming 'stats' is your wilayas data and 'specializations' is your specializations data
import stats from "../../../data/states"; // Adjust path as needed
import specializations from "../../../data/specializations"; // Adjust path as needed
import { FaUserDoctor } from "react-icons/fa6";

// Options for slot duration
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

export default function DoctorProfile() {
  const navigate = useNavigate();
  const { user, setUser } = useAuthStore(); // Get user and setUser from auth store
  const { showToast } = useToastStore();

  const [doctorData, setDoctorData] = useState();

  const [currentProfileImageUrl, setCurrentProfileImageUrl] = useState(null);
  const [newProfileImageFile, setNewProfileImageFile] = useState(null);

  const {
    loading: dataLoading,
    error: dataError,
    data: profileData,
    request: fetchProfile,
  } = useApiRequest();
  const { loading: updateLoading, request: updateProfileRequest } =
    useApiRequest();

  // Fetch cur rent doctor's profile data
  console.log(profileData);
  useEffect(() => {
    fetchProfile(() => globalApi.getDoctorById(user._id));
  }, [user?._id]);

  useEffect(() => {
    setDoctorData(profileData?.data);
  }, [profileData]);

  // const handleChange = (e) => {
  //   const { id, value, type } = e.target;
  //   setFormData((prev) => ({
  //     ...prev,
  //     [id]: type === "number" ? (value === "" ? "" : Number(value)) : value,
  //   }));
  // };

  // const handleProfileImageChange = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     setNewProfileImageFile(file);
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setCurrentProfileImageUrl(reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  // const handleRemoveProfileImage = () => {
  //   setNewProfileImageFile(null);
  //   setCurrentProfileImageUrl(null); // Or a default placeholder
  //   // You might need an API call here if removing means deleting from server
  //   showToast(
  //     "info",
  //     "تمت إزالة الصورة الشخصية (مؤقتًا). احفظ التغييرات لتطبيقها."
  //   );
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const payload = new FormData();
  //   payload.append("fullName[first]", formData.firstName);
  //   payload.append("fullName[second]", formData.lastName);
  //   // Email might not be updatable or needs verification, handle accordingly
  //   // payload.append("email", formData.email);
  //   payload.append("phone", formData.phone);
  //   payload.append("gender", formData.gender);
  //   payload.append("state", formData.state);
  //   payload.append("city", formData.city);
  //   payload.append("address", formData.address);

  //   payload.append("doctorProfile[specialization]", formData.specialization);
  //   payload.append(
  //     "doctorProfile[experienceYears]",
  //     Number(formData.experienceYears) || 0
  //   );
  //   payload.append("doctorProfile[workplace]", formData.workplace);
  //   payload.append("doctorProfile[doctorBio]", formData.doctorBio);
  //   payload.append(
  //     "doctorProfile[consultationPrice]",
  //     Number(formData.consultationPrice) || 0
  //   );
  //   payload.append(
  //     "doctorProfile[slotDurationInMinutes]",
  //     Number(formData.slotDurationInMinutes) || 30
  //   );

  //   const languagesArray = formData.languages
  //     .split(",")
  //     .map((lang) => lang.trim())
  //     .filter(Boolean);
  //   languagesArray.forEach((lang) =>
  //     payload.append("doctorProfile[languages][]", lang)
  //   );

  //   payload.append(
  //     "doctorProfile[bookingInstructions]",
  //     formData.bookingInstructions
  //   );

  //   if (newProfileImageFile) {
  //     payload.append("profileImage", newProfileImageFile);
  //   } else if (currentProfileImageUrl === null && user?.profileImage) {
  //     // If image was removed and there was an old one, signal backend to delete it
  //     payload.append("removeProfileImage", "true");
  //   }

  //   const {
  //     success,
  //     data: updatedUserData,
  //     error: updateApiError,
  //   } = await updateProfileRequest(
  //     () => globalApi.updateMyDoctorProfile(payload) // API to update doctor's own profile
  //   );

  //   if (success && updatedUserData?.data) {
  //     showToast("success", "تم تحديث الملف الشخصي بنجاح!");
  //     setUser(updatedUserData.data); // Update user in global store
  //     setCurrentProfileImageUrl(
  //       updatedUserData.data.profileImage
  //         ? parseImgUrl(updatedUserData.data.profileImage)
  //         : null
  //     );
  //     setNewProfileImageFile(null);
  //   } else {
  //     showToast(
  //       "error",
  //       updateApiError || "فشل تحديث الملف الشخصي. يرجى المحاولة مرة أخرى."
  //     );
  //   }
  // };

  if (dataLoading) {
    // Show skeleton if loading and no data yet
    return (
      <div
        className="p-4 md:p-6 lg:p-8 dark:bg-gray-900 min-h-screen"
        dir="rtl"
      >
        <DashPageHeader
          Icon={FaUserAlt}
          title="تعديل الملف الشخصي"
          description="جاري تحميل البيانات..."
        />
        {/* Add a more detailed skeleton for the edit form */}
        <div className="animate-pulse mt-8 space-y-6">
          <div className="h-40 bg-gray-300 dark:bg-gray-700 rounded-xl"></div>
          <div className="h-64 bg-gray-300 dark:bg-gray-700 rounded-xl"></div>
          <div className="h-52 bg-gray-300 dark:bg-gray-700 rounded-xl"></div>
        </div>
      </div>
    );
  }

  if (dataError) {
    return (
      <div
        className="p-4 md:p-6 lg:p-8 dark:bg-gray-900 min-h-screen flex flex-col items-center justify-center text-center"
        dir="rtl"
      >
        <AlertCircle size={56} className="mx-auto text-red-400 mb-5" />
        <h3 className="text-2xl font-semibold text-red-500 dark:text-red-400 mb-3">
          خطأ في تحميل البيانات
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">{dataError}</p>
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
    <div className="p-4 md:p-6 lg:p-8 dark:bg-gray-900 min-h-screen">
      <DashPageHeader
        Icon={Edit3} // Icon for editing
        title="تعديل الملف الشخصي"
        description="قم بتحديث معلوماتك الشخصية والمهنية لتقديم أفضل خدمة لمرضاك."
      />

      <form onSubmit={() => console.log("hello")} className="mt-8 space-y-8">
        <Card theme={flowbit.card} className="shadow-xl dark:bg-gray-800">
          <h3 className="text-xl font-semibold text-primaryColor dark:text-primaryColor-400 mb-5 flex items-center gap-2 border-b dark:border-gray-700 pb-3">
            <HiOutlineUserCircle size={24} /> المعلومات الأساسية
          </h3>
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
                value={doctorData?.fullName?.first}
                theme={flowbit.textInput}
                icon={FiUser}
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
                value={doctorData?.fullName?.last}
                theme={flowbit.textInput}
                icon={FiUser}
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
                value={doctorData?.gender}
                theme={flowbit.select}
                icon={HiOutlineIdentification}
                required
              >
                {genderOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </Select>
            </div>
          </div>
        </Card>

        <Card theme={flowbit.card} className="shadow-xl dark:bg-gray-800">
          <h3 className="text-xl font-semibold text-primaryColor dark:text-primaryColor-400 mb-5 flex items-center gap-2 border-b dark:border-gray-700 pb-3">
            <HiOutlineMail size={24} /> معلومات الاتصال والعنوان
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
            <div>
              <Label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium"
              >
                البريد الإلكتروني (للعرض فقط)
              </Label>
              <TextInput
                id="email"
                type="email"
                value={doctorData?.email}
                theme={flowbit.textInput}
                icon={MdEmail}
                readOnly
                disabled
                className="bg-gray-100 dark:bg-gray-700 cursor-not-allowed"
              />
              <p className="text-xs text-gray-500 mt-1">
                لتغيير البريد الإلكتروني، يرجى التواصل مع الدعم.
              </p>
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
                value={doctorData?.phone}
                theme={flowbit.textInput}
                icon={Phone}
                required
              />
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
                value={doctorData?.state}
                theme={flowbit.select}
                icon={HiOutlineLocationMarker}
                required
              >
                {(stats || []).map((s) => (
                  <option key={s.id || s.name} value={s.name}>
                    {s.name}
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
                value={doctorData?.city}
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
                value={doctorData?.address}
                theme={flowbit.textInput}
                icon={FaRegAddressCard}
              />
            </div>
          </div>
        </Card>

        <Card theme={flowbit.card} className="shadow-xl dark:bg-gray-800">
          <h3 className="text-xl font-semibold text-primaryColor dark:text-primaryColor-400 mb-5 flex items-center gap-2 border-b dark:border-gray-700 pb-3">
            <FaUserDoctor size={22} /> المعلومات المهنية
          </h3>
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
                value={doctorData?.doctorProfile?.specialization}
                theme={flowbit.select}
                icon={FaStethoscope}
                required
              >
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
                value={doctorData?.doctorProfile?.experienceYears}
                theme={flowbit.textInput}
                icon={FaGraduationCap}
                required
              />
            </div>
            <div className="md:col-span-2">
              <Label
                htmlFor="workplace"
                className="mb-1.5 block text-sm font-medium"
              >
                مكان العمل (اسم العيادة/المستشفى)
              </Label>
              <TextInput
                id="workplace"
                value={doctorData?.doctorProfile?.workplace}
                theme={flowbit.textInput}
                icon={FaBriefcase}
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
                value={doctorData?.doctorProfile?.consultationPrice}
                theme={flowbit.textInput}
                icon={MdOutlineAttachMoney}
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
                value={doctorData?.doctorProfile?.slotDurationInMinutes}
                theme={flowbit.select}
                icon={MdOutlineTimer}
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

        <Card theme={flowbit.card} className="shadow-xl dark:bg-gray-800">
          <h3 className="text-xl font-semibold text-primaryColor dark:text-primaryColor-400 mb-5 flex items-center gap-2 border-b dark:border-gray-700 pb-3">
            <HiOutlinePencilAlt size={22} /> النبذة التعريفية وتعليمات الحجز
          </h3>
          <div className="space-y-5">
            <div>
              <Label
                htmlFor="doctorBio"
                className="mb-1.5 block text-sm font-medium"
              >
                نبذة تعريفية عنك
              </Label>
              <Textarea
                id="doctorBio"
                value={doctorData?.doctorProfile?.doctorBio}
                theme={flowbit.textarea}
                rows={6}
                placeholder="اكتب نبذة عن خبراتك، اهتماماتك المهنية، وما يميزك كطبيب..."
                className="text-sm"
              />
            </div>
            <div>
              <Label
                htmlFor="bookingInstructions"
                className="mb-1.5 block text-sm font-medium"
              >
                تعليمات خاصة بالحجز للمرضى (اختياري)
              </Label>
              <Textarea
                id="bookingInstructions"
                value={doctorData?.doctorProfile?.bookingInstructions}
                theme={flowbit.textarea}
                rows={4}
                placeholder="مثال: يرجى إحضار التقارير الطبية السابقة، الوصول قبل الموعد بـ 10 دقائق..."
                className="text-sm"
              />
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-end items-center gap-4 pt-4">
          <Button
            color="gray"
            onClick={() => navigate(-1)}
            theme={flowbit.button}
            className="dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700 shadow-sm hover:shadow-md px-6 py-2.5"
          >
            إلغاء
          </Button>
          <Button
            type="submit"
            color="primary"
            theme={flowbit.button}
            disabled={updateLoading}
            className="min-w-[160px] shadow-md hover:shadow-lg px-6 py-2.5"
          >
            <FiSave className="ml-2 h-5 w-5" />
            {updateLoading ? "جاري الحفظ..." : "حفظ التغييرات"}
          </Button>
        </div>
      </form>

      {/* Security and Account Management - Kept simple for this page */}
      <div className="mt-12 pt-8 border-t dark:border-gray-700">
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-6">
          إدارة الحساب والأمان
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
                <AlertTriangle
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
              color="red"
              size="sm"
              theme={flowbit.button}
              className="mt-3 w-full sm:w-auto self-end"
            >
              {" "}
              {/* Changed to failure color */}
              طلب حذف الحساب
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
