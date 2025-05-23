import React from "react";
import { IoDocumentText, IoVideocam } from "react-icons/io5";
import DashPageHeader from "../../../components/dashboard/common/DashPageHeader";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { Button, Label, TextInput } from "flowbite-react";
import flowbit from "../../../config/flowbit";
import { Filter, Search } from "lucide-react";
import { MdAccessTimeFilled, MdCalendarToday } from "react-icons/md";
import { FaFilter, FaRegUserCircle } from "react-icons/fa";
import { IoIosVideocam } from "react-icons/io";

export default function DoctorAppointments() {
  return (
    <div>
      <DashPageHeader
        Icon={IoDocumentText}
        title="ادارة المواعيد"
        description="قم بادارة مواعيدك مع مع المرضى"
      />
      <div className="border rounded-lg p-10 flex items-center gap-8 jus flex-col md:flex-row mb-10">
        <div className="flex flex-col md:flex-row w-full items-center gap-5">
          <div className="flex flex-col gap-2 w-full md:w-44" dir="rtl">
            <div className="flex flex-col gap-2 w-full md:w-44" dir="rtl">
              <Label htmlFor="cities" className="flex items-center gap-2">
                <span>
                  <MdCalendarToday />
                </span>
                <span>اليوم</span>
              </Label>
              <select
                className="w-full border p-1 rounded-md bg-gray-50 text-gray-900 border-gray-300 "
                id="cities"
                required
                defaultValue=""
              >
                <option value="">اختر اليوم</option>
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
              <span>الحالة</span>
            </Label>
            <select
              className="w-full border p-1 rounded-md bg-gray-50 text-gray-900 border-gray-300 "
              id="cities"
              required
              defaultValue=""
            >
              <option value="">الحالة</option>
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
            placeholder="ابحث عن طبيب..."
            required
          />
        </div>
      </div>
      <div className="border rounded-lg p-10 mb-10">
        <h3 className="text-lg font-bold text-gray-600 mb-10">المواعيد</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="w-full border rounded-lg p-5">
            <div className="flex justify-between items-center gap-3 mb-3">
              <div className="flex items-center gap-3">
                <img
                  src="/doctor1.jpg"
                  alt="doctor"
                  className="w-20 h-20 object-cover rounded-full"
                />
                <div>
                  <h3 className="text-gray-600 font-bold mb-2">بن علي علي</h3>
                  <div className="flex items-center gap-2">
                    <span className="p-1 rounded-full border border-primaryColor">
                      <IoVideocam size={14} className="text-primaryColor" />
                    </span>
                    <span className="text-sm text-gray-400">
                      استشارة عن بعد
                    </span>
                  </div>
                </div>
              </div>
              <p className="py-2 text-sm px-3 text-[#25A85C] bg-[#c1ffdb]  rounded-lg">
                مؤكدة
              </p>
            </div>
            <div className="flex items-center gap-6 text-gray-500 mb-3">
              <div className="flex items-center gap-2">
                <MdAccessTimeFilled className="text-primaryColor" />
                <p>5:00 - 5:30 مساءً</p>
              </div>
              <div className="flex items-center gap-2">
                <BsFillCalendarDateFill className="text-primaryColor" />

                <p>اليوم</p>
              </div>
            </div>
            <div className="flex gap-2 items-center justify-center">
              <Button theme={flowbit.button} color="primary" size="sm">
                <span className="me-2">
                  <IoIosVideocam />
                </span>
                <span>بدأ الجلسة</span>
              </Button>
              <Button theme={flowbit.button} color="light" size="sm">
                <span className="me-2">
                  <MdAccessTimeFilled />
                </span>
                <span>تأجيل </span>
              </Button>
              <Button theme={flowbit.button} color="light" size="sm">
                <span className="me-2">
                  <FaRegUserCircle />
                </span>
                <span>الملف الشخصي </span>
              </Button>
            </div>
          </div>
          <div className="w-full border rounded-lg p-5">
            <div className="flex justify-between items-center gap-3 mb-3">
              <div className="flex items-center gap-3">
                <img
                  src="/doctor1.jpg"
                  alt="doctor"
                  className="w-20 h-20 object-cover rounded-full"
                />
                <div>
                  <h3 className="text-gray-600 font-bold mb-2">بن علي علي</h3>
                  <div className="flex items-center gap-2">
                    <span className="p-1 rounded-full border border-primaryColor">
                      <IoVideocam size={14} className="text-primaryColor" />
                    </span>
                    <span className="text-sm text-gray-400">
                      استشارة عن بعد
                    </span>
                  </div>
                </div>
              </div>
              <p className="py-2 text-sm px-3 text-[#25A85C] bg-[#c1ffdb]  rounded-lg">
                مؤكدة
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-6 text-gray-500 mb-3">
              <div className="flex items-center gap-2">
                <MdAccessTimeFilled className="text-primaryColor" />
                <p>5:00 - 5:30 مساءً</p>
              </div>
              <div className="flex items-center gap-2">
                <BsFillCalendarDateFill className="text-primaryColor" />

                <p>اليوم</p>
              </div>
            </div>
            <div className="flex gap-2 items-center justify-center">
              <Button theme={flowbit.button} color="primary" size="sm">
                <span className="me-2">
                  <IoIosVideocam />
                </span>
                <span>بدأ الجلسة</span>
              </Button>
              <Button theme={flowbit.button} color="light" size="sm">
                <span className="me-2">
                  <MdAccessTimeFilled />
                </span>
                <span>تأجيل </span>
              </Button>
              <Button theme={flowbit.button} color="light" size="sm">
                <span className="me-2">
                  <FaRegUserCircle />
                </span>
                <span>الملف الشخصي </span>
              </Button>
            </div>
          </div>
          <div className="w-full border rounded-lg p-5">
            <div className="flex justify-between items-center gap-3 mb-3">
              <div className="flex items-center gap-3">
                <img
                  src="/doctor1.jpg"
                  alt="doctor"
                  className="w-20 h-20 object-cover rounded-full"
                />
                <div>
                  <h3 className="text-gray-600 font-bold mb-2">بن علي علي</h3>
                  <div className="flex items-center gap-2">
                    <span className="p-1 rounded-full border border-primaryColor">
                      <IoVideocam size={14} className="text-primaryColor" />
                    </span>
                    <span className="text-sm text-gray-400">
                      استشارة عن بعد
                    </span>
                  </div>
                </div>
              </div>
              <p className="py-2 text-sm px-3 text-[#25A85C] bg-[#c1ffdb]  rounded-lg">
                مؤكدة
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-6 text-gray-500 mb-3">
              <div className="flex items-center gap-2">
                <MdAccessTimeFilled className="text-primaryColor" />
                <p>5:00 - 5:30 مساءً</p>
              </div>
              <div className="flex items-center gap-2">
                <BsFillCalendarDateFill className="text-primaryColor" />

                <p>اليوم</p>
              </div>
            </div>
            <div className="flex gap-2 items-center justify-center">
              <Button theme={flowbit.button} color="primary" size="sm">
                <span className="me-2">
                  <IoIosVideocam />
                </span>
                <span>بدأ الجلسة</span>
              </Button>
              <Button theme={flowbit.button} color="light" size="sm">
                <span className="me-2">
                  <MdAccessTimeFilled />
                </span>
                <span>تأجيل </span>
              </Button>
              <Button theme={flowbit.button} color="light" size="sm">
                <span className="me-2">
                  <FaRegUserCircle />
                </span>
                <span>الملف الشخصي </span>
              </Button>
            </div>
          </div>
          <div className="w-full border rounded-lg p-5">
            <div className="flex justify-between items-center gap-3 mb-3">
              <div className="flex items-center gap-3">
                <img
                  src="/doctor1.jpg"
                  alt="doctor"
                  className="w-20 h-20 object-cover rounded-full"
                />
                <div>
                  <h3 className="text-gray-600 font-bold mb-2">بن علي علي</h3>
                  <div className="flex items-center gap-2">
                    <span className="p-1 rounded-full border border-primaryColor">
                      <IoVideocam size={14} className="text-primaryColor" />
                    </span>
                    <span className="text-sm text-gray-400">
                      استشارة عن بعد
                    </span>
                  </div>
                </div>
              </div>
              <p className="py-2 text-sm px-3 text-[#25A85C] bg-[#c1ffdb]  rounded-lg">
                مؤكدة
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-6 text-gray-500 mb-3">
              <div className="flex items-center gap-2">
                <MdAccessTimeFilled className="text-primaryColor" />
                <p>5:00 - 5:30 مساءً</p>
              </div>
              <div className="flex items-center gap-2">
                <BsFillCalendarDateFill className="text-primaryColor" />

                <p>اليوم</p>
              </div>
            </div>
            <div className="flex gap-2 items-center justify-center">
              <Button theme={flowbit.button} color="primary" size="sm">
                <span className="me-2">
                  <IoIosVideocam />
                </span>
                <span>بدأ الجلسة</span>
              </Button>
              <Button theme={flowbit.button} color="light" size="sm">
                <span className="me-2">
                  <MdAccessTimeFilled />
                </span>
                <span>تأجيل </span>
              </Button>
              <Button theme={flowbit.button} color="light" size="sm">
                <span className="me-2">
                  <FaRegUserCircle />
                </span>
                <span>الملف الشخصي </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="border rounded-lg p-10">
        <h3 className="text-lg font-bold text-gray-600 mb-10">
          المواعيد المتاحة
        </h3>
      </div>
    </div>
  );
}
