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
const doctors = [
  {
    name: "د. ياسين بلقاسم",
    email: "yassine@example.com",
    phone: "06*******01",
    specialty: "طب القلب",
    patientsCount: 120,
    registeredAt: "10 مارس 2025",
    status: "مفعل",
  },
  {
    name: "د. سميرة قرفي",
    email: "samira@example.com",
    phone: "06*******02",
    specialty: "أمراض النساء",
    patientsCount: 98,
    registeredAt: "11 مارس 2025",
    status: "محظور",
  },
  {
    name: "د. أحمد شرفي",
    email: "ahmed@example.com",
    phone: "06*******03",
    specialty: "طب الأطفال",
    patientsCount: 76,
    registeredAt: "12 مارس 2025",
    status: "مفعل",
  },
  {
    name: "د. فاطمة الزهراء بن عمر",
    email: "fatima@example.com",
    phone: "06*******04",
    specialty: "طب العيون",
    patientsCount: 110,
    registeredAt: "13 مارس 2025",
    status: "مفعل",
  },
  {
    name: "د. كمال بوزيد",
    email: "kamal@example.com",
    phone: "06*******05",
    specialty: "جراحة العظام",
    patientsCount: 89,
    registeredAt: "14 مارس 2025",
    status: "مفعل",
  },
  {
    name: "د. نوال بن سليمان",
    email: "nawal@example.com",
    phone: "06*******06",
    specialty: "الطب العام",
    patientsCount: 65,
    registeredAt: "15 مارس 2025",
    status: "محظور",
  },
  {
    name: "د. رفيق صالحي",
    email: "rafik@example.com",
    phone: "06*******07",
    specialty: "طب الأعصاب",
    patientsCount: 54,
    registeredAt: "16 مارس 2025",
    status: "مفعل",
  },
  {
    name: "د. نادية رحماني",
    email: "nadia@example.com",
    phone: "06*******08",
    specialty: "الأمراض الجلدية",
    patientsCount: 72,
    registeredAt: "17 مارس 2025",
    status: "مفعل",
  },
  {
    name: "د. هشام عزيزي",
    email: "hichem@example.com",
    phone: "06*******09",
    specialty: "جراحة الأعصاب",
    patientsCount: 41,
    registeredAt: "18 مارس 2025",
    status: "مفعل",
  },
  {
    name: "د. نسرين زروقي",
    email: "nisrine@example.com",
    phone: "06*******10",
    specialty: "طب الأورام",
    patientsCount: 33,
    registeredAt: "19 مارس 2025",
    status: "محظور",
  },
];

export default function AdminDoctors() {
  return (
    <div>
      <div className="flex justify-between items-center flex-wrap">
        <DashPageHeader
          Icon={HiUsers}
          title="الاطباء"
          description="إدارة وعرض بيانات الاطباء المسجلين في منصة شفاؤك"
        />
        <Button theme={flowbit.button} color="primary" className="gap-2 mb-5">
          <span>
            <HiMiniPlusCircle size={18} />
          </span>
          <span>اضافة طبيب جديد</span>
        </Button>
      </div>
      <div className="border rounded-lg p-10 flex items-center gap-8 jus flex-col md:flex-row mb-10">
        <div className="flex flex-col gap-2 w-full md:max-w-[500px]">
          <Label
            htmlFor="cities"
            className="flex items-center gap-2 text-gray-600"
          >
            البحث عن طبيب
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
              <TableHeadCell>الاسم</TableHeadCell>
              <TableHeadCell>البريد الالكتروني</TableHeadCell>
              <TableHeadCell>رقم الهاتف</TableHeadCell>
              <TableHeadCell>التخصص</TableHeadCell>
              <TableHeadCell>عدد المرضى</TableHeadCell>
              <TableHeadCell>تاريخ التسجيل</TableHeadCell>
              <TableHeadCell>الحالة</TableHeadCell>
              <TableHeadCell>الإجراء</TableHeadCell>
            </TableHead>
            <TableBody>
              {doctors.slice(0, 10).map((doctor, index) => (
                <TableRow key={index} className="bg-white">
                  <TableCell>{doctor.name}</TableCell>
                  <TableCell>{doctor.email}</TableCell>
                  <TableCell>{doctor.phone}</TableCell>
                  <TableCell>{doctor.specialty}</TableCell>
                  <TableCell className="text-center">
                    {doctor.patientsCount}
                  </TableCell>
                  <TableCell>{doctor.registeredAt}</TableCell>
                  <TableCell>
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        doctor.status === "مفعل"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {doctor.status}
                    </span>
                  </TableCell>
                  <TableCell className="flex gap-2 justify-center items-center">
                    <button
                      title="حظر"
                      className="text-red-500 hover:text-red-700"
                    >
                      <i className="fas fa-ban"></i>
                    </button>
                    <button
                      title="تفعيل"
                      className="text-green-500 hover:text-green-700"
                    >
                      <i className="fas fa-check-circle"></i>
                    </button>
                    <button
                      title="حذف"
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <i className="fas fa-trash-alt"></i>
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
