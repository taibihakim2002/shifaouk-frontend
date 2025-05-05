import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import flowbit from "../../config/flowbit";
import useAuthModalStore from "../../store/authModalStore";

export default function Login() {
  const { openModal } = useAuthModalStore();
  return (
    <div className="flex relative items-center" dir="rtl">
      <div className="flex flex-col items-center w-full lg:w-1/2 p-10">
        <img
          src="/logo.png"
          alt="Logo"
          className="h-[60px] max-w-[180px] object-contain mb-7"
        />
        <p className="text-darkBlue font-bold text-lg mb-7">تسجيل الدخول</p>
        <form className="flex w-full flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="البريد الالكتروني" />
            </div>
            <TextInput
              id="email"
              type="email"
              placeholder="example@example.com"
              required
              shadow
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password" value="كلمة السر" />
            </div>
            <TextInput
              id="password"
              type="password"
              placeholder="********"
              required
              shadow
            />
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember">تذكرني</Label>
            </div>
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
          >
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
          className="max-w-full max-h-[700px] object-cover"
        />
      </div>
    </div>
  );
}
