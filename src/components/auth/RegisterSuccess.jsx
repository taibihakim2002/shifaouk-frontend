import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
import flowbit from "../../config/flowbit";
import useAuthModalStore from "../../store/authModalStore";

export default function RegisterSuccess() {
  const { closeModal } = useAuthModalStore();
  return (
    <div className="flex relative" dir="rtl">
      <div className="flex flex-col items-center w-full p-10">
        <img
          src="logo.png"
          alt="Logo"
          className="h-[60px] max-w-[180px] object-contain mb-4"
        />
        <p className="text-darkBlue font-bold text-lg mb-4 text-center">
          اهلا بك في <span className="text-primary"> منصة شفائك👋</span>
        </p>
        <p className="text-sm text-grayBlue mb-7 text-center">
          لقد تم انشاء حساب جديد خاص بك بنجاح
        </p>
        <Link to="/" className="w-full">
          <Button
            theme={flowbit.button}
            color="primary"
            className="w-full"
            onClick={() => closeModal()}
          >
            الصفحة الرئيسية
          </Button>
        </Link>
      </div>
    </div>
  );
}
