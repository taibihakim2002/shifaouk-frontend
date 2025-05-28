import React from "react";
import { HiMiniPlusCircle, HiUsers } from "react-icons/hi2";
import DashPageHeader from "../../../../components/dashboard/common/DashPageHeader";
import {
  Button,
  Label,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  TextInput,
} from "flowbite-react";
import flowbit from "../../../../config/flowbit";
import { Search } from "lucide-react";
import { GiHealthNormal } from "react-icons/gi";
import { FaFilter } from "react-icons/fa";
import { BsCalendarDateFill } from "react-icons/bs";

const appointments = [
  {
    id: "APT-001",
    doctorName: "د. ياسين بلقاسم",
    patientName: "محمد عبد القادر",
    type: "استشارة",
    dateTime: "27 مايو 2025 - 14:00",
    status: "مؤكد",
  },
  {
    id: "APT-002",
    doctorName: "د. نوال بن سليمان",
    patientName: "خديجة بوشامة",
    type: "متابعة",
    dateTime: "28 مايو 2025 - 10:30",
    status: "قيد الانتظار",
  },
  {
    id: "APT-003",
    doctorName: "د. أحمد شرفي",
    patientName: "رياض حمودة",
    type: "كشف أولي",
    dateTime: "29 مايو 2025 - 09:00",
    status: "ملغي",
  },
  {
    id: "APT-004",
    doctorName: "د. سامية بوصبيع",
    patientName: "سميرة قادري",
    type: "استشارة",
    dateTime: "30 مايو 2025 - 15:45",
    status: "مؤكد",
  },
  {
    id: "APT-005",
    doctorName: "د. مراد حداد",
    patientName: "جمال قشي",
    type: "متابعة",
    dateTime: "31 مايو 2025 - 11:15",
    status: "قيد الانتظار",
  },
  {
    id: "APT-006",
    doctorName: "د. فريدة بن زروقي",
    patientName: "لمياء تواتي",
    type: "استشارة",
    dateTime: "01 يونيو 2025 - 13:00",
    status: "مؤكد",
  },
  {
    id: "APT-007",
    doctorName: "د. عبد الكريم قادري",
    patientName: "صالح مسعود",
    type: "كشف أولي",
    dateTime: "01 يونيو 2025 - 09:30",
    status: "ملغي",
  },
  {
    id: "APT-008",
    doctorName: "د. نادية بوقرة",
    patientName: "هيثم قرميط",
    type: "استشارة",
    dateTime: "02 يونيو 2025 - 12:00",
    status: "قيد الانتظار",
  },
  {
    id: "APT-009",
    doctorName: "د. طارق خالدي",
    patientName: "منى بن يوسف",
    type: "متابعة",
    dateTime: "02 يونيو 2025 - 16:30",
    status: "مؤكد",
  },
  {
    id: "APT-010",
    doctorName: "د. زهرة سبتي",
    patientName: "عبد الله بوجلال",
    type: "كشف أولي",
    dateTime: "03 يونيو 2025 - 08:00",
    status: "مؤكد",
  },
];

export default function AdminAppointments() {
  return (
    <div>
      <div className="flex justify-between items-center flex-wrap">
        <DashPageHeader
          Icon={HiUsers}
          title="المواعيد"
          description="إدارة وعرض بيانات المواعيد في منصة شفاؤك"
        />
        <Button theme={flowbit.button} color="primary" className="gap-2 mb-5">
          <span>
            <HiMiniPlusCircle size={18} />
          </span>
          <span>اضافة موعد جديد</span>
        </Button>
      </div>
      <div className="border rounded-lg p-10 flex items-center gap-8 jus flex-col md:flex-row mb-10">
        <div className="flex flex-col gap-2 w-full md:max-w-[500px]">
          <Label
            htmlFor="cities"
            className="flex items-center gap-2 text-gray-600"
          >
            البحث عن موعد
          </Label>
          <TextInput
            theme={flowbit.input}
            color="primary"
            className="w-full "
            id="search"
            type="text"
            rightIcon={Search}
            placeholder="ابحث عن موعد او طبيب..."
            required
          />
        </div>
        <div className="flex flex-col md:flex-row w-full items-center gap-5 ">
          <div className="flex flex-col gap-2 w-full md:w-44" dir="rtl">
            <div className="flex flex-col gap-2 w-full md:w-44" dir="rtl">
              <Label
                htmlFor="cities"
                className="flex items-center gap-2 text-gray-600"
              >
                <span>
                  <BsCalendarDateFill />
                </span>
                <span>اليوم </span>
              </Label>
              <TextInput id="birthdate" theme={flowbit.input} type="date" />
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full md:w-44" dir="rtl">
            <div className="flex flex-col gap-2 w-full md:w-44" dir="rtl">
              <Label
                htmlFor="cities"
                className="flex items-center gap-2 text-gray-600"
              >
                <span>
                  <GiHealthNormal />
                </span>
                <span>الحالة الصحية</span>
              </Label>
              <select
                className="w-full border text-sm p-1 rounded-md bg-gray-50 text-gray-900 border-gray-300 "
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
            <Label
              htmlFor="cities"
              className="flex items-center gap-2 text-gray-600"
            >
              <span>
                <FaFilter />
              </span>
              <span>ترتيب حسب</span>
            </Label>
            <select
              className="w-full border text-sm p-1 rounded-md bg-gray-50 text-gray-900 border-gray-300 "
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
      </div>
      <div>
        <div className="overflow-x-auto mb-3">
          <Table className="text-right">
            <TableHead className="bg-gray-100">
              <TableHeadCell>رقم الموعد</TableHeadCell>
              <TableHeadCell>اسم الطبيب</TableHeadCell>
              <TableHeadCell>اسم المريض</TableHeadCell>
              <TableHeadCell>نوع الموعد</TableHeadCell>
              <TableHeadCell>تاريخ ووقت الموعد</TableHeadCell>
              <TableHeadCell>الحالة</TableHeadCell>
              <TableHeadCell>الإجراء</TableHeadCell>
            </TableHead>
            <TableBody>
              {appointments.slice(0, 10).map((appointment, index) => (
                <TableRow key={index} className="bg-white">
                  <TableCell className="text-center font-bold">
                    {appointment.id}
                  </TableCell>
                  <TableCell>{appointment.doctorName}</TableCell>
                  <TableCell>{appointment.patientName}</TableCell>
                  <TableCell>{appointment.type}</TableCell>
                  <TableCell>{appointment.dateTime}</TableCell>
                  <TableCell>
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        appointment.status === "مؤكد"
                          ? "bg-green-100 text-green-800"
                          : appointment.status === "ملغي"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {appointment.status}
                    </span>
                  </TableCell>
                  <TableCell className="flex gap-2 justify-center items-center">
                    <button
                      title="تأكيد"
                      className="text-green-500 hover:text-green-700"
                    >
                      <i className="fas fa-check-circle"></i>
                    </button>
                    <button
                      title="إلغاء"
                      className="text-red-500 hover:text-red-700"
                    >
                      <i className="fas fa-times-circle"></i>
                    </button>
                    <button
                      title="تعديل"
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
