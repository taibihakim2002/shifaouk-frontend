import { Button, Checkbox, Label, Spinner, TextInput } from "flowbite-react";
import flowbit from "../../config/flowbit";
import useAuthModalStore from "../../store/authModalStore";
import { useState } from "react";
import useApiRequest from "../../hooks/useApiRequest";
import globalApi from "../../utils/globalApi";
import useToastStore from "../../store/toastStore";
import useAuthStore from "../../store/authStore";

export default function Login() {
  const { openModal } = useAuthModalStore();
  const { data, error, loading, request } = useApiRequest();
  const showToast = useToastStore((state) => state.showToast);
  const setUser = useAuthStore((state) => state.setUser);
  const closeModal = useAuthModalStore((state) => state.closeModal);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const validateForm = () => {
    const errors = {};
    if (!formData.email.trim()) {
      errors.email = "البريد الإلكتروني مطلوب";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "البريد الالكتروني غير صالح";
    }
    if (!formData.password) {
      errors.password = "كلمة السر مطلوبة";
    } else if (formData.password.length < 6) {
      errors.password = "كلمة السر قصيرة جداً";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);
    if (Object.keys(formErrors).length > 0) return;

    const payload = {
      email: formData.email,
      password: formData.password,
    };

    const {
      success: requestSuccess,
      data: requestData,
      error: requestError,
    } = await request(() => globalApi.login(payload));

    if (requestSuccess) {
      showToast("success", "تم تسجيل الدخول بنجاح");
      closeModal();
      setUser(requestData?.user);
    } else {
      showToast("error", requestError);
    }
  };
  return (
    <div className="flex relative items-center" dir="rtl">
      <div className="flex flex-col items-center w-full lg:w-1/2 p-10">
        <img
          src="/logo.png"
          alt="Logo"
          className="h-[60px] max-w-[180px] object-contain mb-7"
        />
        <p className="text-darkBlue font-bold text-lg mb-7">تسجيل الدخول</p>
        <form className="flex w-full flex-col gap-2" onSubmit={handleSubmit}>
          <div>
            <div className="mb-1 ">
              <Label htmlFor="email" className="text-[13px]">
                البريد الالكتروني
              </Label>
            </div>
            <TextInput
              id="email"
              type="text"
              placeholder="example@example.com"
              onChange={(e) =>
                setFormData((pre) => ({ ...pre, email: e.target.value }))
              }
              value={formData.email}
              color={formErrors.email ? "failure" : "gray"}
              shadow
            />
            {formErrors.email && (
              <p className="text-[12px] mt-1 text-red-600">
                {formErrors.email}
              </p>
            )}
          </div>
          <div>
            <div className="mb-1 ">
              <Label htmlFor="password" className="text-[13px]">
                كلمة السر
              </Label>
            </div>
            <TextInput
              id="password"
              type="password"
              placeholder="********"
              onChange={(e) =>
                setFormData((pre) => ({ ...pre, password: e.target.value }))
              }
              value={formData.password}
              shadow
              color={formErrors.password ? "failure" : "gray"}
            />
            {formErrors.password && (
              <p className="text-[12px] mt-1 text-red-600">
                {formErrors.password}
              </p>
            )}
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2"></div>
            <Button
              theme={flowbit.button}
              color="noColor"
              className="text-sm text-blue-600 p-0 m-0 outline-none border-none"
            >
              هل نسيت كلمة السر؟
            </Button>
          </div>
          <Button
            theme={flowbit.button}
            color="primary"
            type="submit"
            className="mb-5"
            disabled={loading}
          >
            {loading && <Spinner color="info" size="sm" />}
            تسجيل الدخول
          </Button>
        </form>
        <p>
          مستخدم جديد؟{" "}
          <button
            className="text-sm font-bold text-blue-600 p-0 m-0 outline-none border-none"
            onClick={() => openModal("register")}
          >
            انشاء حساب
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
