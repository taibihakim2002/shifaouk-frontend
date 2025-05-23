import { Button, Label, Select, TextInput } from "flowbite-react";
import DoctorCard from "../components/common/DoctorCard";
import { Filter, Search } from "lucide-react";
import flowbit from "../config/flowbit";

const doctors = [
  {
    name: "معاوية احمد",
    description: "أخصائي امراض القلب",
    image: "/doctor1.jpg",
    rating: 4,
  },
  {
    name: "طيبي عبد الحكيم",
    description: "أخصائي امراض المعدة",
    image: "/doctor1.jpg",
    rating: 4,
  },
  {
    name: " حلباوي محمد",
    description: "أخصائي امراض الكبد",
    image: "doctor1.jpg",
    rating: 5,
  },
  {
    name: "محمدي اسامة",
    description: "أخصائي امراض الرئة",
    image: "doctor1.jpg",
    rating: 3.5,
  },
];

export default function Doctors() {
  return (
    <div>
      <div className="container py-16">
        <div className="flex gap-10">
          <div className="hidden lg:flex flex-col lg:w-96 border shadow-md rounded-xl p-4">
            <h3 className="font-bold text-lg mb-7">فلاتر البحث</h3>
            <div className="mb-10 p-2 rounded-lg flex flex-col ">
              <Label className="mb-3">التخصص</Label>
              <select
                id="countries"
                defaultValue=""
                required
                className="w-full mb-7 text-sm px-5 py-1 border border-primaryColor rounded-lg text-gray-900 focus:border-primaryColor outline-primaryColor"
              >
                <option value="">اختر الولاية</option>
                <option value="algeria">الجزائر</option>
                <option value="djelfa">الجلفة</option>
                <option value="mostaganem">مستغانم</option>
                <option value="jijel">جيجل</option>
                <option value="tamanrasset">تمنراست</option>
              </select>
              <Label className="mb-3">السعر</Label>
              <select
                id="rating"
                defaultValue=""
                required
                className="w-full mb-7 text-sm px-5 py-1 border border-primaryColor rounded-lg text-gray-900 focus:border-primaryColor outline-primaryColor"
              >
                <option value="">السعر</option>
                <option>أكبر من 800دج</option>
                <option>من 600دج الى 800دج</option>
                <option>من 400دج الى 600دج</option>
                <option>من 200دج الى 400دج</option>
                <option>اقل من 200دج</option>
              </select>
              <Label className="mb-3">التقييم</Label>
              <select
                id="rating"
                defaultValue=""
                required
                className="w-full mb-7 text-sm px-5 py-1 border border-primaryColor rounded-lg text-gray-900 focus:border-primaryColor outline-primaryColor"
              >
                <option value="">التقييم</option>
                <option>خمس نجوم</option>
                <option>اكبر من 4 نجوم</option>
                <option>أكبر من 3 نجوم</option>
                <option>أكبر من نجمتين</option>
                <option>اكبر من نجمة</option>
              </select>

              <Label className="mb-3">الجنس</Label>
              <select
                id="rating"
                defaultValue=""
                required
                className="w-full mb-7 text-sm px-5 py-1 border border-primaryColor rounded-lg text-gray-900 focus:border-primaryColor outline-primaryColor"
              >
                <option value="">الجنس</option>
                <option>ذكر </option>
                <option> أنثى</option>
              </select>
            </div>
          </div>
          <div className="w-full">
            <div className="mb-16 w-full flex justify-center items-center gap-4">
              <TextInput
                theme={flowbit.input}
                color="primary"
                className="w-[500px]"
                id="search"
                type="text"
                rightIcon={Search}
                placeholder="ابحث عن طبيب..."
                required
              />
              <Button
                theme={flowbit.button}
                color="primary"
                className="flex lg:hidden hover:text-white px-2 "
                outline
              >
                <Filter size={18} />
              </Button>
            </div>
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mb-10">
              {doctors.map((ele, index) => (
                <DoctorCard ele={ele} key={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
