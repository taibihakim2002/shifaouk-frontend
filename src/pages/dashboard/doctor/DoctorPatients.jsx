import React from "react";
import flowbit from "../../../config/flowbit";
import { Search } from "lucide-react";
import { IoDocumentText, IoVideocam } from "react-icons/io5";
import DashPageHeader from "../../../components/dashboard/common/DashPageHeader";
import { Button, Label, TextInput } from "flowbite-react";
import { MdAccessTimeFilled, MdCalendarToday } from "react-icons/md";
import { FaFilter, FaInfoCircle, FaRegUserCircle } from "react-icons/fa";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { IoIosVideocam } from "react-icons/io";
import { GiHealthNormal } from "react-icons/gi";
import { AiFillMessage } from "react-icons/ai";

export default function DoctorPatients() {
  return (
    <div>
      <DashPageHeader
        Icon={IoDocumentText}
        title="المرضى"
        description="قم بادارة  مرضاك"
      />
      <div className="border rounded-lg p-10 flex items-center gap-8 jus flex-col md:flex-row mb-10">
        <div className="flex flex-col md:flex-row w-full items-center gap-5">
          <div className="flex flex-col gap-2 w-full md:w-44" dir="rtl">
            <div className="flex flex-col gap-2 w-full md:w-44" dir="rtl">
              <Label htmlFor="cities" className="flex items-center gap-2">
                <span>
                  <GiHealthNormal />
                </span>
                <span>الحالة الصحية</span>
              </Label>
              <select
                className="w-full border p-1 rounded-md bg-gray-50 text-gray-900 border-gray-300 "
                id="cities"
                required
                defaultValue=""
              >
                <option value="">اختر الحالة</option>
                <option>اليوم</option>
                <option>امس</option>
                <option>هذا الاسبوع</option>
                <option>هذا الشهر</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full md:w-44" dir="rtl">
            <Label htmlFor="cities" className="flex items-center gap-2">
              <span>
                <FaFilter />
              </span>
              <span>ترتيب حسب</span>
            </Label>
            <select
              className="w-full border p-1 rounded-md bg-gray-50 text-gray-900 border-gray-300 "
              id="cities"
              required
              defaultValue=""
            >
              <option value="">التاريخ</option>
              <option>مكتملة</option>
              <option>معلقة</option>
              <option>مؤكدة</option>
              <option>مرفوضة </option>
            </select>
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full md:max-w-[500px]">
          <Label htmlFor="cities" className="flex items-center gap-2">
            البحث عن مريض
          </Label>
          <TextInput
            theme={flowbit.input}
            color="primary"
            className="w-full "
            id="search"
            type="text"
            rightIcon={Search}
            placeholder="ابحث عن مريض..."
            required
          />
        </div>
      </div>
      <div className="border rounded-lg p-10 mb-10">
        <h3 className="text-lg font-bold text-gray-600 mb-10">المرضى</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="w-full border rounded-lg p-5">
            <div className="flex items-center gap-3 mb-3">
              <img
                src="/doctor1.jpg"
                alt="doctor"
                className="w-20 h-20 object-cover rounded-full"
              />
              <div>
                <h3 className="text-gray-600 font-bold mb-2">بن علي علي</h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm rounded-full text-gray-400">
                    27 سنة ،
                  </span>
                  <span className="text-sm text-gray-400"> ذكر</span>
                </div>
              </div>
            </div>

            <div className=" text-gray-500">
              <div className="flex items-center gap-2 text-sm mb-2">
                <span>اخر استشارة:</span>
                <p> 27 ماي 2025</p>
              </div>
              <p className="text-sm mb-3">الام في المفاصل وارتفاع ضغط الدم</p>
            </div>
            <div className="flex gap-2 items-center justify-between">
              <p className="p-2 text-sm text-red-700 bg-red-200 rounded-lg">
                حالة حرجة
              </p>
              <div className="flex items-center gap-2">
                <Button theme={flowbit.button} color="light" size="sm">
                  <span className="me-2">
                    <AiFillMessage />
                  </span>
                  <span>مراسلة </span>
                </Button>
                <Button theme={flowbit.button} color="primary" size="sm">
                  <span className="me-2">
                    <FaInfoCircle />
                  </span>
                  <span>تفاصيل</span>
                </Button>
              </div>
            </div>
          </div>
          <div className="w-full border rounded-lg p-5">
            <div className="flex items-center gap-3 mb-3">
              <img
                src="/doctor1.jpg"
                alt="doctor"
                className="w-20 h-20 object-cover rounded-full"
              />
              <div>
                <h3 className="text-gray-600 font-bold mb-2">بن علي علي</h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm rounded-full text-gray-400">
                    27 سنة ،
                  </span>
                  <span className="text-sm text-gray-400"> ذكر</span>
                </div>
              </div>
            </div>

            <div className=" text-gray-500">
              <div className="flex items-center gap-2 text-sm mb-2">
                <span>اخر استشارة:</span>
                <p> 27 ماي 2025</p>
              </div>
              <p className="text-sm mb-3">الام في المفاصل وارتفاع ضغط الدم</p>
            </div>
            <div className="flex gap-2 items-center justify-between">
              <p className="p-2 text-sm text-red-700 bg-red-200 rounded-lg">
                حالة حرجة
              </p>
              <div className="flex items-center gap-2">
                <Button theme={flowbit.button} color="light" size="sm">
                  <span className="me-2">
                    <AiFillMessage />
                  </span>
                  <span>مراسلة </span>
                </Button>
                <Button theme={flowbit.button} color="primary" size="sm">
                  <span className="me-2">
                    <FaInfoCircle />
                  </span>
                  <span>تفاصيل</span>
                </Button>
              </div>
            </div>
          </div>
          <div className="w-full border rounded-lg p-5">
            <div className="flex items-center gap-3 mb-3">
              <img
                src="/doctor1.jpg"
                alt="doctor"
                className="w-20 h-20 object-cover rounded-full"
              />
              <div>
                <h3 className="text-gray-600 font-bold mb-2">بن علي علي</h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm rounded-full text-gray-400">
                    27 سنة ،
                  </span>
                  <span className="text-sm text-gray-400"> ذكر</span>
                </div>
              </div>
            </div>

            <div className=" text-gray-500">
              <div className="flex items-center gap-2 text-sm mb-2">
                <span>اخر استشارة:</span>
                <p> 27 ماي 2025</p>
              </div>
              <p className="text-sm mb-3">الام في المفاصل وارتفاع ضغط الدم</p>
            </div>
            <div className="flex gap-2 items-center justify-between">
              <p className="p-2 text-sm text-red-700 bg-red-200 rounded-lg">
                حالة حرجة
              </p>
              <div className="flex items-center gap-2">
                <Button theme={flowbit.button} color="light" size="sm">
                  <span className="me-2">
                    <AiFillMessage />
                  </span>
                  <span>مراسلة </span>
                </Button>
                <Button theme={flowbit.button} color="primary" size="sm">
                  <span className="me-2">
                    <FaInfoCircle />
                  </span>
                  <span>تفاصيل</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
