import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import flowbit from "../../config/flowbit";
import useAuthModalStore from "../../store/authModalStore";
export default function Register() {
  const { openModal } = useAuthModalStore();
  return (
    <div className="flex relative" dir="rtl">
      <div className="flex flex-col items-center w-full lg:w-1/2 p-10">
        <img
          src="/logo.png"
          alt="Logo"
          className="h-[60px] max-w-[180px] object-contain mb-3"
        />
        <p className="text-darkBlue font-bold text-lg mb-4">انشاء حساب</p>
        <form className="flex w-full flex-col gap-3">
          <div className="flex gap-5">
            <div className="flex-1">
              <div className="mb-2 block ">
                <Label htmlFor="name" value="الاسم" />
              </div>
              <TextInput
                id="name"
                type="name"
                placeholder="ادخل اسمك"
                required
                shadow
              />
            </div>
            <div className="flex-1">
              <div className="mb-2 block">
                <Label htmlFor="prename" value="اللقب" />
              </div>
              <TextInput
                id="prename"
                type="prename"
                placeholder="ادخل لقبك"
                required
                shadow
              />
            </div>
          </div>
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
              <Label htmlFor="phone" value="رقم الهاتف" />
            </div>
            <TextInput
              id="phone"
              type="text"
              placeholder="+213000000000"
              required
              shadow
            />
          </div>
          <div className="flex gap-5">
            <div className="flex-1">
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
            <div className="flex-1">
              <div className="mb-2 block">
                <Label htmlFor="password2" value="اعادة  كلمة السر" />
              </div>
              <TextInput
                id="password2"
                type="password"
                placeholder="********"
                required
                shadow
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember">اوافق على الشروط</Label>
          </div>

          <Button
            theme={flowbit.button}
            color="primary"
            type="submit"
            className="mb-4"
          >
            انشاء حساب
          </Button>
        </form>
        <p>
          لديك حساب بالفعل ؟{" "}
          <button
            className="text-sm font-bold text-blue-600 p-0 m-0 outline-none border-none"
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
          className="max-w-full  object-cover"
        />
      </div>
    </div>
  );
}
