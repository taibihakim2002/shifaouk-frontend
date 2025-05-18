import { Button } from "flowbite-react";
import {
  FaCalendarCheck,
  FaHeart,
  FaHistory,
  FaVideo,
  FaWallet,
} from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { HiOutlineCurrencyDollar } from "react-icons/hi";
import { IoCheckmarkCircleSharp, IoSearch } from "react-icons/io5";
import flowbit from "../../../config/flowbit";
import { GiSandsOfTime } from "react-icons/gi";
import { HiMiniInformationCircle } from "react-icons/hi2";
import { MdAccessTimeFilled, MdOutlineChat } from "react-icons/md";
import { FcIdea } from "react-icons/fc";

export default function PatientHome() {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
        <div className="p-3 border rounded-lg">
          <div className="flex gap-5 items-center mb-5">
            <div className="p-2 bg-[#a3ffc9] rounded-lg">
              <IoCheckmarkCircleSharp size={30} className="text-[#25A85C]" />
            </div>
            <h3 className="text-gray-600 text-lg">الاستشارات المنجزة </h3>
          </div>
          <div className="flex justify-between items-center ps-10">
            <h3 className="text-[35px] font-bold">12</h3>
          </div>
        </div>
        <div className="p-3 border rounded-lg">
          <div className="flex gap-5 items-center mb-5">
            <div className="p-2 bg-[#b2dcff] rounded-lg">
              <FaWallet size={30} className="text-[#008CFF]" />
            </div>
            <h3 className="text-gray-600 text-lg">رصيد الدينار الطبي</h3>
          </div>
          <div className="flex justify-between items-center ps-10">
            <h3 className="text-[35px] font-bold">2500</h3>
            <HiOutlineCurrencyDollar size={30} className="text-[#008CFF]" />
          </div>
        </div>
        <div className="p-3 border rounded-lg">
          <div className="flex gap-5 items-center mb-5">
            <div className="p-2 bg-[#e7c8ff] rounded-lg">
              <FaUserDoctor size={30} className="text-[#960DFF]" />
            </div>
            <h3 className="text-gray-600 text-lg">المواعيد القادمة </h3>
          </div>
          <div className="flex justify-between items-center ps-10">
            <h3 className="text-[35px] font-bold">12</h3>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
        <div className="p-5 border rounded-lg md:col-span-2">
          <h2 className="text-xl text-gray-600 font-bold mb-5">
            الاستشارات القادمة
          </h2>
          <div className="rounded-lg bg-[url('/imgs/website/dash-next.png')] bg-cover p-5 mb-5">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-5">
              <div className="flex gap-4 items-center">
                <img
                  src="/doctor1.jpg"
                  alt="Doctor"
                  className="w-20 h-20 object-cover rounded-full "
                />
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    د. صخري معاذ
                  </h3>
                  <p className="text-gray-700">اخصائي امراض قلبية </p>
                </div>
              </div>
              <Button
                theme={flowbit.button}
                color="light"
                className="text-primaryColor gap-3"
              >
                <FaVideo size={22} className="text-primaryColor" />
                <span>انضم الان</span>
              </Button>
            </div>
            <div className="flex justify-center text-white pb-5 border-b border-b-gray-500">
              <span className="me-2"> مكالمة فيديو </span>|
              <span className="ms-2">اليوم، 02:30 مساءً</span>
            </div>
            <div className="flex justify-between mt-3 text-white">
              <div className="flex gap-3 items-center ">
                <GiSandsOfTime size={22} />
                <p>متبقي على الموعد</p>
              </div>

              <p>02ساعة : 15 دقيقة : 15 ثانية </p>
            </div>
          </div>
          <h3 className="text-lg text-gray-600  mb-5">تفاصيل الاستشارة</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-4 p-3 rounded-lg bg-gray-100">
              <HiMiniInformationCircle
                size={22}
                className="text-primaryColor"
              />
              <p className="text-gray-600 text-sm">
                ألم في الصدر مع ضيق في تنفس
              </p>
            </div>
            <div className="flex items-center gap-4 p-3 rounded-lg bg-gray-100">
              <MdAccessTimeFilled size={22} className="text-[#25A85C]" />
              <p className="text-gray-600 text-sm">مدة الجلسة 30 دقيقة</p>
            </div>
          </div>
        </div>
        <div className="p-5 border rounded-lg ">
          <div className="flex items-center mb-10 gap-3 justify-center">
            <FaHistory size={33} className="text-[#9747FF]" />
            <h2 className="text-xl text-gray-600 font-bold">السجل</h2>
          </div>
          <div className="px-7">
            <div className="mb-5 ">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-1 bg-[#dbbfff] w-fit rounded-full">
                  <FaCalendarCheck className="text-[#9747FF]" size={10} />
                </div>
                <h4 className="font-bold text-gray-600">حجز استشارة جديدة</h4>
              </div>
              <div className="ps-6 text-sm ">
                <p className="text-gray-400 mb-2">
                  تم تاكيد حجز استشارة جديدة مع دكتور صخري معاذ
                </p>
                <div className="flex gap-3 items-center text-gray-400">
                  <MdAccessTimeFilled size={18} />
                  <span>منذ ساعة </span>
                </div>
              </div>
            </div>
            <div className="mb-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-1 bg-[#b1dfff] w-fit rounded-full">
                  <HiOutlineCurrencyDollar
                    className="text-[#0D99FF]"
                    size={10}
                  />
                </div>
                <h4 className="font-bold text-gray-600">شحن رصيد المحفظة</h4>
              </div>
              <div className="ps-6 text-sm ">
                <p className="text-gray-400 mb-2">
                  تم إضافة 100 دينار طبي إلى رصيدك
                </p>
                <div className="flex gap-3 items-center text-gray-400">
                  <MdAccessTimeFilled size={18} />
                  <span>منذ 30 دقيقة</span>
                </div>
              </div>
            </div>
            <div className="mb-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-1 bg-[#dbbfff] w-fit rounded-full">
                  <FaCalendarCheck className="text-[#9747FF]" size={10} />
                </div>
                <h4 className="font-bold text-gray-600">حجز استشارة جديدة</h4>
              </div>
              <div className="ps-6 text-sm ">
                <p className="text-gray-400 mb-2">
                  تم تاكيد حجز استشارة جديدة مع دكتور صخري معاذ
                </p>
                <div className="flex gap-3 items-center text-gray-400">
                  <MdAccessTimeFilled size={18} />
                  <span>منذ 30 دقيقة</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border p-7 rounded-lg mb-10">
        <div className="flex items-center mb-10 gap-3 ">
          <FcIdea size={33} className="text-[#9747FF]" />
          <h2 className="text-xl text-gray-600 font-bold">نصائح طبية سريعة</h2>
        </div>
        <div className="rounded-lg bg-gradient-to-l from-[#25A85C] to-[#86CA48] p-5 flex items-center gap-5">
          <div className="w-fit p-3 bg-[#0f6633] rounded-full">
            <FaHeart size={35} className="text-[#31ff87]" />
          </div>
          <div>
            <h3 className="text-xl text-white font-bold mb-3">
              إبتعد عن التدخين
            </h3>
            <p className="text-lg text-white">
              التدخين يسبب تلف الأوعية الدموية ويزيد من خطر الإصابة بأمراض
              القلب.
            </p>
          </div>
        </div>
      </div>
      <div className="border p-7 rounded-lg mb-10">
        <h2 className="text-xl text-gray-600 font-bold mb-6">اجراءات سريعة </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          <div className="p-7 rounded-lg bg-[#e1caff] flex flex-col gap-5 items-center">
            <FaCalendarCheck className="text-[#9747FF]" size={35} />
            <p className="text-gray-600">حجز استشارة جديدة</p>
          </div>
          <div className="p-7 rounded-lg bg-[#c3e4ff] flex flex-col gap-5 items-center">
            <FaWallet className="text-[#008CFF]" size={35} />
            <p className="text-gray-600">شحن رصيدك </p>
          </div>
          <div className="p-7 rounded-lg bg-[#c9ffdf] flex flex-col gap-5 items-center">
            <IoSearch className="text-[#25A85C]" size={35} />
            <p className="text-gray-600">ابحث عن طبيب </p>
          </div>
          <div className="p-7 rounded-lg bg-[#ffeeac] flex flex-col gap-5 items-center">
            <MdOutlineChat className="text-[#d3b334]" size={35} />
            <p className="text-gray-600">تحدث من الشات</p>
          </div>
        </div>
      </div>
    </div>
  );
}
