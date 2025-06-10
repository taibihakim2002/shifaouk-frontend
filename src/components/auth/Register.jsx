import { useState } from "react";
import { Button, Checkbox, Label, Spinner, TextInput } from "flowbite-react";
import flowbit from "../../config/flowbit";
import useAuthModalStore from "../../store/authModalStore";
import useApiRequest from "../../hooks/useApiRequest";
import globalApi from "../../utils/globalApi";
import useToastStore from "../../store/toastStore";
import useAuthStore from "../../store/authStore";

export default function Register() {
  const setUser = useAuthStore((state) => state.setUser);
  const { openModal } = useAuthModalStore();

  const { data, error, loading, request } = useApiRequest();

  const [formData, setFormData] = useState({
    name: "",
    prename: "",
    email: "",
    phone: "",
    password: "",
    password2: "",
    gender: "",
    birthdate: "",
    termsAccepted: false,
  });

  const [formErrors, setFormErrors] = useState({});
  const { showToast } = useToastStore();

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "الاسم مطلوب";
    } else if (formData.name.length < 2 || formData.name.length > 20) {
      errors.name = "الاسم يجب أن يكون بين 2 و 20 أحرف";
    }
    if (!formData.prename.trim()) {
      errors.prename = "اللقب مطلوب";
    } else if (formData.prename.length < 2 || formData.prename.length > 20) {
      errors.prename = "اللقب يجب أن يكون بين 2 و 20 أحرف";
    }

    if (!formData.email.trim()) {
      errors.email = "البريد الإلكتروني مطلوب";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "البريد غير صالح";
    }

    if (!formData.phone.trim()) {
      errors.phone = "رقم الهاتف مطلوب";
    } else if (!/^0[567][0-9]{8}$/.test(formData.phone)) {
      errors.phone = "رقم الهاتف غير صالح";
    }

    if (!formData.password) {
      errors.password = "كلمة السر مطلوبة";
    } else if (formData.password.length < 6) {
      errors.password = "كلمة السر قصيرة جداً";
    }
    if (!formData.password2) {
      errors.password2 = "تأكيد كلمة السر مطلوب";
    } else if (formData.password !== formData.password2) {
      errors.password2 = "كلمة السر غير متطابقة";
    }
    if (!formData.gender) errors.gender = "اختر الجنس";
    if (!formData.birthdate) errors.birthdate = "تاريخ الميلاد مطلوب";
    if (!formData.termsAccepted) {
      errors.termsAccepted = "يجب قبول الشروط والأحكام";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    const payload = {
      fullName: {
        first: formData.name,
        second: formData.prename,
      },
      gender: formData.gender,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,

      birthDate: formData.birthdate,
    };

    const {
      success,
      data: responseData,
      error: requestError,
    } = await request(() => globalApi.registerPatient(payload));

    if (success) {
      showToast("success", "تم إنشاء الحساب بنجاح!");
      openModal("registerSuccess");
      setUser(responseData.user);
    } else {
      showToast("error", requestError);
    }
  };

  return (
    <div className="flex relative items-center" dir="rtl">
      <div className="flex flex-col items-center w-full lg:w-1/2 px-10 py-7">
        <img
          src="/logo.png"
          alt="Logo"
          className="h-[45px] max-w-[180px] object-contain mb-1"
        />
        <p className="text-darkBlue font-bold mb-2">انشاء حساب</p>
        <form className="flex w-full flex-col gap-2" onSubmit={handleSubmit}>
          <div className="flex gap-5">
            <div className="flex-1">
              <Label htmlFor="name" className="text-[13px]">
                الاسم
              </Label>
              <TextInput
                id="name"
                theme={flowbit.input}
                type="text"
                placeholder="ادخل اسمك"
                shadow
                value={formData.name}
                onChange={handleChange}
                color={formErrors.name ? "failure" : "gray"}
              />
              {formErrors.name && (
                <p className="text-[12px] text-red-600">{formErrors.name}</p>
              )}
            </div>

            <div className="flex-1">
              <Label htmlFor="prename" className="text-[13px]">
                اللقب
              </Label>
              <TextInput
                id="prename"
                theme={flowbit.input}
                type="text"
                placeholder="ادخل لقبك"
                shadow
                value={formData.prename}
                onChange={handleChange}
                color={formErrors.prename ? "failure" : "gray"}
              />
              {formErrors.prename && (
                <p className="text-[12px] text-red-600">{formErrors.prename}</p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="email" className="text-[13px]">
              البريد الالكتروني
            </Label>
            <TextInput
              id="email"
              theme={flowbit.input}
              type="text"
              placeholder="example@example.com"
              shadow
              value={formData.email}
              onChange={handleChange}
              color={formErrors.email ? "failure" : "gray"}
            />
            {formErrors.email && (
              <p className="text-[12px] text-red-600">{formErrors.email}</p>
            )}
          </div>

          <div>
            <Label htmlFor="phone" className="text-[13px]">
              رقم الهاتف
            </Label>
            <TextInput
              id="phone"
              theme={flowbit.input}
              type="text"
              placeholder="+213000000000"
              shadow
              value={formData.phone}
              onChange={handleChange}
              color={formErrors.phone ? "failure" : "gray"}
            />
            {formErrors.phone && (
              <p className="text-[12px] text-red-600">{formErrors.phone}</p>
            )}
          </div>

          <div className="flex gap-5">
            <div className="flex-1">
              <Label htmlFor="password" className="text-[13px]">
                كلمة السر
              </Label>
              <TextInput
                id="password"
                theme={flowbit.input}
                type="password"
                placeholder="كلمة المرور"
                shadow
                value={formData.password}
                onChange={handleChange}
                color={formErrors.password ? "failure" : "gray"}
              />
              {formErrors.password && (
                <p className="text-[12px] text-red-600">
                  {formErrors.password}
                </p>
              )}
            </div>

            <div className="flex-1">
              <Label htmlFor="password2" className="text-[13px]">
                اعادة كلمة السر
              </Label>
              <TextInput
                id="password2"
                theme={flowbit.input}
                type="password"
                placeholder="اعد كتابة كلمة المرور"
                shadow
                value={formData.password2}
                onChange={handleChange}
                color={formErrors.password2 ? "failure" : "gray"}
              />
              {formErrors.password2 && (
                <p className="text-[12px] text-red-600">
                  {formErrors.password2}
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-5">
            <div className="flex-1">
              <Label htmlFor="gender" className="text-[13px]">
                الجنس
              </Label>
              <select
                id="gender"
                className={`w-full p-1.5 border rounded-lg text-sm bg-gray-50 ${
                  formErrors.gender ? "border-red-500" : ""
                }`}
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">اختر الجنس</option>
                <option value="ذكر">ذكر</option>
                <option value="أنثى">أنثى</option>
              </select>
              {formErrors.gender && (
                <p className="text-[12px] text-red-600">{formErrors.gender}</p>
              )}
            </div>

            <div className="flex-1">
              <Label htmlFor="birthdate" className="text-sm">
                تاريخ الميلاد
              </Label>
              <TextInput
                id="birthdate"
                theme={flowbit.input}
                type="date"
                value={formData.birthdate}
                onChange={handleChange}
                color={formErrors.birthdate ? "failure" : "gray"}
              />
              {formErrors.birthdate && (
                <p className="text-[12px] text-red-600">
                  {formErrors.birthdate}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
              theme={flowbit.checkbox}
              color={formErrors.termsAccepted ? "failure" : "gray"}
            />
            <Label htmlFor="termsAccepted" className="text-sm">
              اوافق على الشروط
            </Label>
          </div>
          {formErrors.termsAccepted && (
            <p className="text-[12px] text-red-600">
              {formErrors.termsAccepted}
            </p>
          )}

          <Button
            theme={flowbit.button}
            color="primary"
            type="submit"
            className="mb-2 flex items-center justify-center gap-2"
            disabled={loading}
          >
            {loading && <Spinner color="info" size="sm" />}
            <span> انشاء حساب</span>
          </Button>
        </form>

        <p className="text-sm">
          لديك حساب بالفعل؟{" "}
          <button
            className="font-bold text-blue-600 p-0 m-0 outline-none border-none"
            onClick={() => openModal("login")}
          >
            تسجيل الدخول
          </button>
        </p>
      </div>

      <div className="hidden lg:flex lg:w-1/2">
        <img
          src="/authModal.png"
          alt="Image"
          className="max-w-full w-full max-h-[700px] object-cover"
        />
      </div>
    </div>
  );
}
