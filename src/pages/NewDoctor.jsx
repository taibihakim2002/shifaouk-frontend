import { FaCheck, FaCircleCheck, FaUserDoctor } from "react-icons/fa6";
import Logo from "../components/common/Logo";
import { FaRegCalendarCheck, FaRegCheckCircle, FaUser } from "react-icons/fa";
import { MdEmail, MdOutlineSecurity } from "react-icons/md";
import { useState } from "react";
import {
  Button,
  Checkbox,
  FileInput,
  Label,
  Spinner,
  TextInput,
  Textarea,
} from "flowbite-react";
import { HiMail } from "react-icons/hi";
import { Phone } from "lucide-react";
import flowbit from "../config/flowbit";
import { BsCamera } from "react-icons/bs";
import { HiMiniDocumentPlus } from "react-icons/hi2";
import { IoDocumentTextOutline, IoHelpCircleSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import globalApi from "../utils/globalApi";
import useApiRequest from "../hooks/useApiRequest";
import useToastStore from "../store/toastStore";
import states from "../data/states";
import specializations from "../data/specializations";

export default function NewDoctor() {
  const [step, setStep] = useState(1);
  const { data, error, loading, request } = useApiRequest();
  const showToast = useToastStore((state) => state.showToast);
  const [formErrors, setFormErrors] = useState({});
  const [formDataState, setFormDataState] = useState({
    name: "",
    prename: "",
    email: "",
    phone: "",
    password: "",
    password2: "",
    state: "",
    city: "",
    address: "",
    gender: "",
    exper: "",
    workplace: "",
    pio: "",
    profile: null,
    bac: null,
    specCar: null,
    profession: null,
    termsAccepted: false,
  });

  const handleNext = () => {
    const errors = validateForm();
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;
    setStep((pre) => pre + 1);
  };

  const handleChange = (e) => {
    const { id, value, type, files, checked } = e.target;

    if (type === "file") {
      setFormDataState((prev) => ({
        ...prev,
        [id]: files[0],
      }));
    } else if (type === "checkbox") {
      setFormDataState((prev) => ({
        ...prev,
        [id]: checked,
      }));
    } else {
      setFormDataState((prev) => ({
        ...prev,
        [id]: value,
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (step === 1) {
      if (!formDataState.name.trim()) {
        errors.name = "الاسم مطلوب";
      } else if (
        formDataState.name.length < 2 ||
        formDataState.name.length > 20
      ) {
        errors.name = "الاسم يجب أن يكون بين 2 و 20 أحرف";
      }
      if (!formDataState.prename.trim()) {
        errors.prename = "اللقب مطلوب";
      } else if (
        formDataState.prename.length < 2 ||
        formDataState.prename.length > 20
      ) {
        errors.prename = "اللقب يجب أن يكون بين 2 و 20 أحرف";
      }

      if (!formDataState.email.trim()) {
        errors.email = "البريد الإلكتروني مطلوب";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formDataState.email)) {
        errors.email = "البريد غير صالح";
      }

      if (!formDataState.phone.trim()) {
        errors.phone = "رقم الهاتف مطلوب";
      } else if (!/^0[567][0-9]{8}$/.test(formDataState.phone)) {
        errors.phone = "رقم الهاتف غير صالح";
      }

      if (!formDataState.password) {
        errors.password = "كلمة السر مطلوبة";
      } else if (formDataState.password.length < 6) {
        errors.password = "كلمة السر قصيرة جداً";
      }
      if (!formDataState.password2) {
        errors.password2 = "تأكيد كلمة السر مطلوب";
      } else if (formDataState.password !== formDataState.password2) {
        errors.password2 = "كلمة السر غير متطابقة";
      }
      if (!formDataState.state) {
        errors.state = "الولاية مطلوبة";
      }
      if (!formDataState.city) {
        errors.city = "البلدية مطلوبة";
      }
      if (!formDataState.gender) {
        errors.gender = "اختر الجنس  ";
      }
    }
    if (step === 2) {
      if (!formDataState.spec) {
        errors.spec = "اختر تخصصك";
      }

      if (!formDataState.exper) {
        errors.exper = "عدد سنوات الخبرة مطلوب";
      } else if (
        isNaN(formDataState.exper) ||
        Number(formDataState.exper) < 0
      ) {
        errors.exper = "عدد سنوات الخبرة غير صالح";
      }

      if (!formDataState.workplace.trim()) {
        errors.workplace = "مكان العمل مطلوب";
      }

      if (!formDataState.pio.trim()) {
        errors.pio = "النبذة مطلوبة";
      } else if (formDataState.pio.length < 10) {
        errors.pio = "النبذة قصيرة جداً";
      }
    }
    if (step === 3) {
      if (!formDataState.profile) {
        errors.profile = "الصورة الشخصية مطلوبة";
      }

      if (!formDataState.bac) {
        errors.bac = "شهادة البكالوريا مطلوبة";
      }

      if (!formDataState.specCar) {
        errors.specCar = "شهادة التخصص مطلوبة";
      }

      if (!formDataState.profession) {
        errors.profession = "رخصة مزاولة المهنة مطلوبة";
      }

      if (!formDataState.termsAccepted) {
        errors.termsAccepted = "يجب الموافقة على الشروط والأحكام";
      }
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;
    const formData = new FormData();

    Object.entries(formDataState).forEach(([key, value]) => {
      if (value === null || value === undefined) return;
      formData.append(key, typeof value === "boolean" ? String(value) : value);
    });

    console.log(formData);
    const { success, error: requestError } = await request(() =>
      globalApi.registerDoctor(formData)
    );

    if (success) {
      showToast("success", "تم تسجيل طلبك بنجاح");
      setStep(4);
    } else {
      showToast("error", requestError);
    }
  };

  const preStep = () => setStep((pre) => pre - 1);
  return (
    <div>
      <div className="w-full flex items-center h-[80px]">
        <div className="container flex justify-between items-center pb-3 border-b border-b-gray-100">
          <Logo />
        </div>
      </div>
      <div className="container py-16 flex gap-5 flex-col lg:flex-row">
        <div className="w-full lg:w-2/3  order-2 lg:order-1 border rounded-lg shadow-md p-7">
          <h3 className="text-center text-gray-600 font-bold text-lg mb-7">
            إنشاء حساب جديد
          </h3>
          <div className="py-14 flex justify-center">
            <div className="flex items-center relative">
              <h4
                className={`p-2 w-7 h-7 flex justify-center items-center text-white rounded-full bg-primaryColor text-sm z-10`}
              >
                1
              </h4>
              <span
                className={`w-16 md:w-32  h-[6px] bg-primaryColor -ms-2`}
              ></span>
              <h4
                className={`p-2 w-7 h-7 flex justify-center items-center text-white rounded-full ${
                  step >= 2 ? "bg-primaryColor" : "bg-gray-500"
                } -ms-1 text-sm z-10`}
              >
                2
              </h4>
              <span
                className={`w-16  md:w-32 h-[6px] ${
                  step >= 2 ? "bg-primaryColor" : "bg-gray-500"
                } -ms-2`}
              ></span>
              <h4
                className={`p-2 w-7 h-7 flex justify-center items-center text-white rounded-full ${
                  step >= 3 ? "bg-primaryColor" : "bg-gray-500"
                } -ms-1 text-sm z-10`}
              >
                3
              </h4>
              <span
                className={`w-16  md:w-32 h-[6px] ${
                  step >= 3 ? "bg-primaryColor" : "bg-gray-500"
                } -ms-2`}
              ></span>
              <h4
                className={`p-2 w-7 h-7 flex justify-center items-center text-white rounded-full ${
                  step >= 4 ? "bg-primaryColor" : "bg-gray-500"
                } -ms-1 text-sm z-10`}
              >
                4
              </h4>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div>
                <h3 className="text-gray-600 font-bold mb-5">
                  المعلومات الاساسية
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-7">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="name">الاسم </Label>
                    <TextInput
                      id="name"
                      type="text"
                      rightIcon={FaUser}
                      placeholder="أدخل إسمك هنا..."
                      value={formDataState.name}
                      onChange={handleChange}
                      color={formErrors.name ? "failure" : "gray"}
                      required
                    />
                    {formErrors.name && (
                      <p className="text-[12px] text-red-600">
                        {formErrors.name}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="prename">اللقب </Label>
                    <TextInput
                      id="prename"
                      type="text"
                      rightIcon={FaUser}
                      placeholder="أدخل إسمك هنا..."
                      value={formDataState.prename}
                      onChange={handleChange}
                      color={formErrors.prename ? "failure" : "gray"}
                      required
                    />
                    {formErrors.prename && (
                      <p className="text-[12px] text-red-600">
                        {formErrors.prename}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="email">البريد الالكتروني</Label>
                    <TextInput
                      id="email"
                      type="text"
                      rightIcon={HiMail}
                      value={formDataState.email}
                      onChange={handleChange}
                      placeholder="example@example.com"
                      color={formErrors.email ? "failure" : "gray"}
                      required
                    />
                    {formErrors.email && (
                      <p className="text-[12px] text-red-600">
                        {formErrors.email}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="phone">رقم الهاتف</Label>
                    <TextInput
                      id="phone"
                      type="number"
                      rightIcon={Phone}
                      placeholder="06********"
                      value={formDataState.phone}
                      onChange={handleChange}
                      color={formErrors.phone ? "failure" : "gray"}
                      required
                    />
                    {formErrors.phone && (
                      <p className="text-[12px] text-red-600">
                        {formErrors.phone}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2" dir="rtl">
                    <Label htmlFor="password">كلمة المرور</Label>
                    <TextInput
                      id="password"
                      type="password"
                      placeholder="*************"
                      value={formDataState.password}
                      onChange={handleChange}
                      color={formErrors.password ? "failure" : "gray"}
                      required
                    />
                    {formErrors.password && (
                      <p className="text-[12px] text-red-600">
                        {formErrors.password}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2" dir="rtl">
                    <Label htmlFor="password2"> اعادة كلمة المرور</Label>
                    <TextInput
                      id="password2"
                      type="password"
                      placeholder="*************"
                      value={formDataState.password2}
                      onChange={handleChange}
                      color={formErrors.password2 ? "failure" : "gray"}
                      required
                    />
                    {formErrors.password2 && (
                      <p className="text-[12px] text-red-600">
                        {formErrors.password2}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2" dir="rtl">
                    <Label htmlFor="state">الولاية </Label>
                    <select
                      className={`border  ${
                        formErrors.state && "border-red-600 bg-red-50"
                      } p-1 rounded-md bg-gray-50 text-gray-900 border-gray-300 `}
                      id="state"
                      required
                      value={formDataState.state}
                      onChange={handleChange}
                      defaultValue=""
                    >
                      <option value="">اختر ولاية</option>
                      {states.map((ele) => (
                        <option value={ele.name}>{ele.name}</option>
                      ))}
                    </select>
                    {formErrors.state && (
                      <p className="text-[12px] text-red-600">
                        {formErrors.state}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2" dir="rtl">
                    <Label htmlFor="city">البلدية </Label>
                    <TextInput
                      id="city"
                      type="text"
                      placeholder="البلدية"
                      value={formDataState.city}
                      onChange={handleChange}
                      color={formErrors.city ? "failure" : "gray"}
                    />
                    {formErrors.city && (
                      <p className="text-[12px] text-red-600">
                        {formErrors.city}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2" dir="rtl">
                    <Label htmlFor="gender">الجنس </Label>
                    <select
                      className={`border ${
                        formErrors.city && "border-red-600 bg-red-50"
                      } p-1 rounded-md bg-gray-50 text-gray-900 border-gray-300 `}
                      id="gender"
                      required
                      value={formDataState.gender}
                      onChange={handleChange}
                      defaultValue=""
                    >
                      <option value="">اختر الجنس</option>
                      <option value="ذكر">ذكر</option>
                      <option value="أنثى">انثى</option>
                    </select>
                    {formErrors.gender && (
                      <p className="text-[12px] text-red-600">
                        {formErrors.gender}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2" dir="rtl">
                    <Label htmlFor="password2">العنوان</Label>
                    <TextInput
                      id="address"
                      type="text"
                      placeholder="أدخل عنوانك هنا..."
                      value={formDataState.address}
                      onChange={handleChange}
                      color="gray"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button
                    theme={flowbit.button}
                    color="primary"
                    onClick={handleNext}
                  >
                    التالي
                  </Button>
                </div>
              </div>
            )}
            {step === 2 && (
              <div>
                <h3 className="text-gray-600 font-bold mb-5">
                  المعلومات المهنية
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-5 md:gap-5 mb-7">
                  <div className="flex flex-col gap-2 w-full md:col-span-2">
                    <Label htmlFor="spec">التخصص </Label>
                    <select
                      className={`border ${
                        formErrors.spec && "border-red-600 bg-red-50"
                      } p-1 rounded-md bg-gray-50 text-gray-900 border-gray-300 `}
                      id="spec"
                      value={formDataState.spec}
                      onChange={handleChange}
                      required
                    >
                      <option value="">اختر التخصص</option>
                      {specializations.map((ele) => (
                        <option key={ele.value} value={ele.value}>
                          {ele.label}
                        </option>
                      ))}
                    </select>
                    {formErrors.spec && (
                      <p className="text-[12px] text-red-600">
                        {formErrors.spec}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 col-span-2 md:col-span-1">
                    <Label htmlFor="exper">سنوات الخبرة</Label>
                    <TextInput
                      id="exper"
                      type="number"
                      placeholder="عدد سنوات الخبرة"
                      value={formDataState.exper}
                      onChange={handleChange}
                      color={formErrors.exper ? "failure" : "gray"}
                      required
                    />
                    {formErrors.exper && (
                      <p className="text-[12px] text-red-600">
                        {formErrors.exper}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label htmlFor="workplace">مكان العمل الحالي</Label>
                    <TextInput
                      id="workplace"
                      type="text"
                      placeholder="مستشفى/ عيادة"
                      value={formDataState.workplace}
                      onChange={handleChange}
                      color={formErrors.workplace ? "failure" : "gray"}
                      required
                    />
                    {formErrors.workplace && (
                      <p className="text-[12px] text-red-600">
                        {formErrors.workplace}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 col-span-2">
                    <Label htmlFor="pio">نبذة عامة </Label>
                    <Textarea
                      id="pio"
                      placeholder="نبذة عامة عنك ..."
                      value={formDataState.pio}
                      onChange={handleChange}
                      rows={4}
                      color={formErrors.pio ? "failure" : "gray"}
                      className={`${
                        formErrors.pio ? "border-red-500" : "border-gray-300"
                      }`}
                      required
                    />
                    {formErrors.pio && (
                      <p className="text-[12px] text-red-600">
                        {formErrors.pio}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button
                    theme={flowbit.button}
                    color="primary"
                    outline
                    onClick={preStep}
                  >
                    السابق
                  </Button>
                  <Button
                    theme={flowbit.button}
                    color="primary"
                    onClick={handleNext}
                  >
                    التالي
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h3 className="text-gray-600 font-bold mb-5">
                  المعلومات المهنية
                </h3>
                <div className="mb-7">
                  {/* الصورة الشخصية */}
                  <div className="flex flex-col gap-2 col-span-2 mb-3">
                    <Label>الصورة الشخصية </Label>
                    <div
                      className={`border ${
                        formErrors.profile && "border-red-600 bg-red-50"
                      } rounded-lg p-4 flex flex-col items-center md:flex-row gap-5 `}
                    >
                      <img
                        src={
                          formDataState.profile
                            ? URL.createObjectURL(formDataState.profile)
                            : "/doctor1.jpg"
                        }
                        alt="doctor image"
                        className="w-20 h-20 rounded-full object-cover"
                      />
                      <div className="text-center md:text-start flex-1">
                        <h3 className=" text-gray-600 mb-2">
                          صورة الملف الشخصي
                        </h3>
                        <p className="text-sm text-gray-400 ">
                          يفضل استخدام صورة بحجم 400×400 بكسل
                        </p>
                      </div>
                      <Label
                        htmlFor="profile"
                        className="p-3 bg-primaryColor rounded-lg text-white flex gap-2 cursor-pointer"
                      >
                        <span>
                          <BsCamera size={18} className="text-white" />
                        </span>
                        <span>اضافة صورة</span>
                      </Label>
                      <input
                        type="file"
                        id="profile"
                        accept="image/*"
                        onChange={handleChange}
                        className="hidden"
                      />
                    </div>
                    {formErrors.profile && (
                      <p className="text-[12px] text-red-600">
                        {formErrors.profile}
                      </p>
                    )}
                  </div>

                  {/* Checkbox */}
                  <div className="flex flex-col gap-1 mb-4">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        theme={flowbit.checkbox}
                        id="termsAccepted"
                        checked={formDataState.termsAccepted}
                        onChange={handleChange}
                      />
                      <Label htmlFor="termsAccepted">
                        اوافق على الشروط والاحكام
                      </Label>
                    </div>

                    {formErrors.termsAccepted && (
                      <p className="text-[12px] text-red-600 ">
                        {formErrors.termsAccepted}
                      </p>
                    )}
                  </div>
                  {/* شهادة البكالوريا */}
                  <div className="flex flex-col gap-2 mb-4">
                    <Label htmlFor="bac">شهادة البكالوريا</Label>
                    <Label
                      htmlFor="bac"
                      className={`flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed ${
                        formErrors.bac
                          ? "border-red-600 bg-red-50"
                          : "border-gray-300 bg-gray-50 hover:bg-gray-100"
                      }  `}
                    >
                      <div className="flex flex-col items-center justify-center pb-6 pt-5">
                        <HiMiniDocumentPlus
                          size={73}
                          className="text-primaryColor mb-2"
                        />
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">
                            {" "}
                            اسحب الملف هنا{" "}
                          </span>{" "}
                          أو اضغط للاختيار
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          يدعم ملفات pdf و png و jpg الحد القصى : (2MB)
                        </p>
                      </div>
                      <FileInput
                        id="bac"
                        className="hidden"
                        onChange={handleChange}
                      />
                    </Label>
                    {formErrors.bac && (
                      <p className="text-[12px] text-red-600">
                        {formErrors.bac}
                      </p>
                    )}
                  </div>

                  {/* شهادة التخصص */}
                  <div className="flex flex-col gap-2 mb-4">
                    <Label htmlFor="specCar">شهادة التخصص </Label>
                    <Label
                      htmlFor="specCar"
                      className={`flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed ${
                        formErrors.bac
                          ? "border-red-600 bg-red-50"
                          : "border-gray-300 bg-gray-50 hover:bg-gray-100"
                      }  `}
                    >
                      <div className="flex flex-col items-center justify-center pb-6 pt-5">
                        <HiMiniDocumentPlus
                          size={73}
                          className="text-primaryColor mb-2"
                        />
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">
                            {" "}
                            اسحب الملف هنا{" "}
                          </span>{" "}
                          أو اضغط للاختيار
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          يدعم ملفات pdf و png و jpg الحد القصى : (2MB)
                        </p>
                      </div>
                      <FileInput
                        id="specCar"
                        className="hidden"
                        onChange={handleChange}
                      />
                    </Label>
                    {formErrors.specCar && (
                      <p className="text-[12px] text-red-600">
                        {formErrors.specCar}
                      </p>
                    )}
                  </div>

                  {/* رخصة مزاولة المهنة */}
                  <div className="flex flex-col gap-2 mb-2">
                    <Label htmlFor="profession">رخصة مزاولة المهنة</Label>
                    <Label
                      htmlFor="profession"
                      className={`flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed ${
                        formErrors.bac
                          ? "border-red-600 bg-red-50"
                          : "border-gray-300 bg-gray-50 hover:bg-gray-100"
                      }  `}
                    >
                      <div className="flex flex-col items-center justify-center pb-6 pt-5">
                        <HiMiniDocumentPlus
                          size={73}
                          className="text-primaryColor mb-2"
                        />
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">
                            {" "}
                            اسحب الملف هنا{" "}
                          </span>{" "}
                          أو اضغط للاختيار
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          يدعم ملفات pdf و png و jpg الحد القصى : (2MB)
                        </p>
                      </div>
                      <FileInput
                        id="profession"
                        className="hidden"
                        onChange={handleChange}
                      />
                    </Label>
                    {formErrors.profession && (
                      <p className="text-[12px] text-red-600">
                        {formErrors.profession}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button
                    theme={flowbit.button}
                    color="primary"
                    outline
                    onClick={preStep}
                  >
                    السابق
                  </Button>
                  <Button
                    theme={flowbit.button}
                    color="primary"
                    type="submit"
                    onClick={handleSubmit}
                    disabled={loading}
                  >
                    {loading && (
                      <Spinner className="me-2" color="info" size="sm" />
                    )}
                    تسجيل
                  </Button>
                </div>
              </div>
            )}
          </form>
          {step === 4 && (
            <div>
              <div className="p-3 rounded-full bg-gradient-to-r from-[#0F1242] to-[#008CFF] w-20 h-20 flex justify-center items-center m-auto mb-4">
                <FaCheck className="text-white" size={33} />
              </div>
              <h3 className="text-primaryColor font-bold mb-5 text-center text-xl">
                مرحباً بك في عائلتنا
              </h3>
              <p className="text-center text-gray-400 mb-7">
                تم استلام طلبك بنجاح وسيتم مراجعته خلال 24-48 ساعة
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                <div className="border shadow-md rounded-lg p-5 text-center hover:bg-[#d9efff] transition">
                  <div className="p-3 w-20 h-20 flex justify-center items-center bg-[#afdeff] m-auto rounded-full mb-3">
                    <MdEmail size={40} className="text-[#0D99FF]" />
                  </div>
                  <h3 className="text-gray-600 mb-3">
                    تأكيد البريد الالكتروني
                  </h3>
                  <p className="text-sm text-gray-400">
                    تم إرسال رابط التفعيل إلى بريدك الإلكتروني
                  </p>
                </div>
                <div className="border shadow-md rounded-lg p-5 text-center hover:bg-[#fef4de] transition">
                  <div className="p-3 w-20 h-20 flex justify-center items-center bg-[#f7e3b6] m-auto rounded-full mb-3">
                    <IoDocumentTextOutline
                      size={40}
                      className="text-[#FFAE00]"
                    />
                  </div>
                  <h3 className="text-gray-600 mb-3">مراجعة المستندات</h3>
                  <p className="text-sm text-gray-400">
                    سيتم التحقق من شهاداتك ومؤهلاتك الطبية{" "}
                  </p>
                </div>
                <div className="border shadow-md rounded-lg p-5 text-center hover:bg-[#d8ffe9] transition">
                  <div className="p-3 w-20 h-20 flex justify-center items-center bg-[#b3f8d0] m-auto rounded-full mb-3">
                    <FaRegCheckCircle size={40} className="text-[#25A85C]" />
                  </div>
                  <h3 className="text-gray-600 mb-3">تفعيل الحساب</h3>
                  <p className="text-sm text-gray-400">
                    بعد الموافقة، سيتم تفعيل حسابك بشكل كامل
                  </p>
                </div>
              </div>
              <div className="border rounded-md p-10 mb-7">
                <div className="flex gap-2 items-center text-gray-600 mb-7">
                  <IoHelpCircleSharp className="text-primaryColor" size={28} />
                  <p>الخطوات القادمة</p>
                </div>
                <ul className="flex flex-col gap-5">
                  <li className="flex items-center gap-4">
                    <FaCircleCheck className="text-[#25A85C]" size={20} />
                    <p className="text-gray-600 text-sm">
                      ستصلك رسالة تأكيد على بريدك الإلكتروني
                    </p>
                  </li>
                  <li className="flex items-center gap-4">
                    <FaCircleCheck className="text-[#25A85C]" size={20} />
                    <p className="text-gray-600 text-sm">
                      سيتواصل معك فريق الدعم لإكمال عملية التحقق{" "}
                    </p>
                  </li>
                  <li className="flex items-center gap-4">
                    <FaCircleCheck className="text-[#25A85C]" size={20} />
                    <p className="text-gray-600 text-sm">
                      بعد الموافقة، يمكنك إكمال ملفك الشخصي وتحديد مواعيد العمل{" "}
                    </p>
                  </li>
                  <li className="flex items-center gap-4">
                    <FaCircleCheck className="text-[#25A85C]" size={20} />
                    <p className="text-gray-600 text-sm">
                      ستظهر في قائمة الأطباء المعتمدين وتبدأ باستقبال الاستشارات{" "}
                    </p>
                  </li>
                </ul>
              </div>
              <Link to="/" className="block w-fit m-auto">
                <Button
                  theme={flowbit.button}
                  color="primary"
                  className="m-auto"
                >
                  الانتقال الى الصفحة الرئيسية
                </Button>
              </Link>
            </div>
          )}
        </div>
        <div className="w-full lg:w-1/3 order-1 lg:order-2 border rounded-lg shadow-md p-7">
          <h3 className="text-lg mb-7 font-bold text-gray-600">
            انضم إلى شبكة الأطباء المعتمدين
          </h3>
          <div className="mb-7">
            <img
              src="/imgs/website/new-doctor.png"
              className="w-52 m-auto object-contain"
              alt="new doctor"
            />
          </div>
          <div className="flex gap-3 items-center mb-5">
            <div className="p-3 bg-primaryColor rounded-xl">
              <FaUserDoctor className="text-white" size={22} />
            </div>
            <div>
              <h3 className="text-gray-600 text-sm font-bold mb-1">
                بناء سمعتك المهنية
              </h3>
              <p className="text-[13px] text-gray-400">
                أنشئ ملفك الطبي الاحترافي وعزز تواجدك الرقمي في المجال الطبي
              </p>
            </div>
          </div>
          <div className="flex gap-3 items-center mb-5">
            <div className="p-3 bg-[#e4d1ff] rounded-xl text-sm">
              <FaRegCalendarCheck className="text-[#9747FF]" size={22} />
            </div>
            <div>
              <h3 className="text-gray-600 font-bold mb-1 text-sm">
                مرونة في جدولة المواعيد
              </h3>
              <p className="text-[13px] text-gray-400 ">
                تحكم في مواعيد عملك وقدم استشاراتك عن بُعد بكل سهولة
              </p>
            </div>
          </div>
          <div className="flex gap-3 items-center">
            <div className="p-3 bg-[#aefdcf] rounded-xl">
              <MdOutlineSecurity className="text-[#25A85C]" size={22} />
            </div>
            <div>
              <h3 className="text-gray-600 font-bold mb-1 text-sm">
                منصة آمنة وموثوقة{" "}
              </h3>
              <p className="text-[13px] text-gray-400">
                بيئة رقمية آمنة تحمي خصوصية بياناتك وبيانات مرضاك{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
