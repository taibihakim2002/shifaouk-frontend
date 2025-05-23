import { FaUser, FaUserAlt } from "react-icons/fa";
import DashPageHeader from "../../../components/dashboard/common/DashPageHeader";
import { Button, Label, TextInput } from "flowbite-react";
import flowbit from "../../../config/flowbit";
import { BsCamera } from "react-icons/bs";
import { MdDelete, MdDeleteForever } from "react-icons/md";
import { HiMail } from "react-icons/hi";
import { Phone } from "lucide-react";
import { TiWarning } from "react-icons/ti";
import { FiLogOut } from "react-icons/fi";

const stats = [
  { id: 1, name: "أدرار" },
  { id: 2, name: "الشلف" },
  { id: 3, name: "الأغواط" },
  { id: 4, name: "أم البواقي" },
  { id: 5, name: "باتنة" },
  { id: 6, name: "بجاية" },
  { id: 7, name: "بسكرة" },
  { id: 8, name: "بشار" },
  { id: 9, name: "البليدة" },
  { id: 10, name: "البويرة" },
  { id: 11, name: "تمنراست" },
  { id: 12, name: "تبسة" },
  { id: 13, name: "تلمسان" },
  { id: 14, name: "تيارت" },
  { id: 15, name: "تيزي وزو" },
  { id: 16, name: "الجزائر" },
  { id: 17, name: "الجلفة" },
  { id: 18, name: "جيجل" },
  { id: 19, name: "سطيف" },
  { id: 20, name: "سعيدة" },
  { id: 21, name: "سكيكدة" },
  { id: 22, name: "سيدي بلعباس" },
  { id: 23, name: "عنابة" },
  { id: 24, name: "قالمة" },
  { id: 25, name: "قسنطينة" },
  { id: 26, name: "المدية" },
  { id: 27, name: "مستغانم" },
  { id: 28, name: "المسيلة" },
  { id: 29, name: "معسكر" },
  { id: 30, name: "ورقلة" },
  { id: 31, name: "وهران" },
  { id: 32, name: "البيض" },
  { id: 33, name: "إليزي" },
  { id: 34, name: "برج بوعريريج" },
  { id: 35, name: "بومرداس" },
  { id: 36, name: "الطارف" },
  { id: 37, name: "تندوف" },
  { id: 38, name: "تيسمسيلت" },
  { id: 39, name: "الوادي" },
  { id: 40, name: "خنشلة" },
  { id: 41, name: "سوق أهراس" },
  { id: 42, name: "تيبازة" },
  { id: 43, name: "ميلة" },
  { id: 44, name: "عين الدفلى" },
  { id: 45, name: "النعامة" },
  { id: 46, name: "عين تموشنت" },
  { id: 47, name: "غرداية" },
  { id: 48, name: "غليزان" },
  { id: 49, name: "تميمون" },
  { id: 50, name: "برج باجي مختار" },
  { id: 51, name: "أولاد جلال" },
  { id: 52, name: "بني عباس" },
  { id: 53, name: "عين صالح" },
  { id: 54, name: "عين قزام" },
  { id: 55, name: "تقرت" },
  { id: 56, name: "جانت" },
  { id: 57, name: "المغير" },
  { id: 58, name: "المنيعة" },
];

export default function DoctorProfile() {
  return (
    <div>
      <DashPageHeader
        Icon={FaUserAlt}
        title=" تعديل الملف الشخصي"
        description="قم بتعديل معلوماتك الشخصية "
      />
      <div className="flex flex-col gap-2 mb-10">
        <Label htmlFor="spec">الصورة الشخصية </Label>
        <div className="border rounded-lg p-4 flex flex-col items-center md:flex-row gap-5">
          <img
            src="/doctor1.jpg"
            alt="doctor image"
            className="w-24 h-24 rounded-full object-cover"
          />
          <div className="text-center md:text-start flex-1">
            <h3 className=" text-gray-600 mb-2 text-lg">صورة الملف الشخصي</h3>
            <p className="text text-gray-400 ">
              يفضل استخدام صورة بحجم 400×400 بكسل
            </p>
          </div>
          <div className="flex items-center gap-2"></div>
          <Button theme={flowbit.button} color="primary" className="flex gap-2">
            <span>
              <BsCamera size={18} className="text-white" />
            </span>
            <span>تغيير الصورة</span>
          </Button>
          <Button theme={flowbit.button} color="light" className="flex gap-2">
            <span>
              <MdDelete size={18} className="text-gray-600" />
            </span>
            <span>إزالة الصورة</span>
          </Button>
        </div>
      </div>
      <div className="p-5 border rounded-lg mb-10">
        <h3 className="text-gray-600 font-bold mb-5 ">المعلومات الاساسية</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">الاسم الكامل</Label>
            <TextInput
              id="name"
              type="text"
              rightIcon={FaUser}
              placeholder="أدخل إسمك هنا..."
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">البريد الالكتروني</Label>
            <TextInput
              id="email"
              type="email"
              rightIcon={HiMail}
              placeholder="ahmed@example.com"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="phone">رقم الهاتف</Label>
            <TextInput
              id="phone"
              type="number"
              rightIcon={Phone}
              placeholder="06********"
              required
            />
          </div>
          <div className="flex flex-col gap-2" dir="rtl">
            <Label htmlFor="password">كلمة المرور</Label>
            <TextInput
              id="password"
              type="password"
              placeholder="*************"
              required
            />
          </div>
          <div className="flex flex-col gap-2" dir="rtl">
            <Label htmlFor="states">الولاية </Label>
            <select
              className="border p-1 rounded-md bg-gray-50 text-gray-900 border-gray-300 "
              id="states"
              required
              defaultValue=""
            >
              <option value="">اختر ولاية</option>
              {stats.map((ele) => (
                <option value={ele.id}>{ele.name}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2" dir="rtl">
            <Label htmlFor="cities">البلدية </Label>
            <select
              className="border p-1 rounded-md bg-gray-50 text-gray-900 border-gray-300 "
              id="cities"
              required
              defaultValue=""
            >
              <option value="">اختر بلدية </option>
              <option>الفييييض</option>
            </select>
          </div>
        </div>
        <div className="flex justify-center gap-10">
          <Button theme={flowbit.button} color="green">
            حفظ
          </Button>
          <Button theme={flowbit.button} color="red">
            الغاء
          </Button>
        </div>
      </div>
      <div className="p-5 border rounded-lg">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-1 rounded-full bg-[#ffc2c2]">
            <TiWarning className="text-[#F50000]" size={22} />
          </div>
          <h3 className="text-gray-600 font-bold ">منطقة الاجراءات الحساسة</h3>
        </div>

        <p className="text-[#F50000] text-sm p-2 bg-[#ffd4d4] rounded-lg mb-5">
          تحذير: الإجراءات التالية قد تؤدي إلى فقدان البيانات أو تعطيل الوصول
          إلى حسابك.
        </p>
        <div className="flex items-center justify-between">
          <Button theme={flowbit.button} color="light" className="flex gap-2">
            <span>
              <FiLogOut size={18} />
            </span>
            <span>تسجيل الخروج </span>
          </Button>
          <Button theme={flowbit.button} color="red" className="flex gap-2">
            <span>
              <MdDeleteForever size={18} />
            </span>
            <span>إزالة الحساب</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
