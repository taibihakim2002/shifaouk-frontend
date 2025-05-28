import { FaWallet } from "react-icons/fa";
import DashPageHeader from "../../../../components/dashboard/common/DashPageHeader";
import { IoWalletOutline } from "react-icons/io5";
import { GiSandsOfTime } from "react-icons/gi";
import { MdDone } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import InfoCard from "../../../../components/dashboard/common/InfoCard";
import {
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

const infoCards = [
  {
    title: "اجمالي الطلبات",
    icon: IoWalletOutline,
    color: "#9747FF",
    value: 120,
    percentage: 8,
    percentageText: "مقارنة بالشهر الماضي",
  },
  {
    title: "طلبات بانتظار المراجعة",
    icon: GiSandsOfTime,
    color: "#FFAE00",
    value: 15,
    percentage: 4,
    percentageText: "مقارنة بالشهر الماضي",
  },
  {
    title: "طلبات مقبولة",
    icon: MdDone,
    color: "#25A85C",
    value: 92,
    percentage: 4,
    percentageText: "مقارنة بالشهر الماضي",
  },
  {
    title: "طلبات مرفوضة",
    icon: IoMdClose,
    color: "#F50000",
    value: 14,
    percentage: -11,
    percentageText: "من اجمالي الطلبات",
  },
];
const rechargeRequests = [
  {
    id: 3521,
    customer: "محمد أحمد",
    email: "ahmed@shifauk.com",
    amount: "1500 دج",
    time: "اليوم 21:30",
    method: "RIB",
    status: "مكتملة",
  },
  {
    id: 3522,
    customer: "سارة ياسين",
    email: "sara@shifauk.com",
    amount: "2500 دج",
    time: "اليوم 18:45",
    method: "CCP",
    status: "مرفوضة",
  },
  {
    id: 3523,
    customer: "أمين بلال",
    email: "amin@shifauk.com",
    amount: "3000 دج",
    time: "أمس 13:00",
    method: "RIB",
    status: "قيد المراجعة",
  },
  {
    id: 3524,
    customer: "ليلى عماد",
    email: "leila@shifauk.com",
    amount: "1000 دج",
    time: "اليوم 10:15",
    method: "CCP",
    status: "مكتملة",
  },
  {
    id: 3525,
    customer: "يوسف سالم",
    email: "youssef@shifauk.com",
    amount: "5000 دج",
    time: "أمس 16:30",
    method: "RIB",
    status: "مرفوضة",
  },
  {
    id: 3526,
    customer: "هدى علوي",
    email: "houda@shifauk.com",
    amount: "2000 دج",
    time: "اليوم 12:00",
    method: "RIB",
    status: "قيد المراجعة",
  },
  {
    id: 3527,
    customer: "كريم عبد النور",
    email: "karim@shifauk.com",
    amount: "3500 دج",
    time: "أمس 20:00",
    method: "CCP",
    status: "مكتملة",
  },
  {
    id: 3528,
    customer: "إيناس علي",
    email: "inas@shifauk.com",
    amount: "1800 دج",
    time: "اليوم 08:45",
    method: "RIB",
    status: "مرفوضة",
  },
  {
    id: 3529,
    customer: "عبد الله سمير",
    email: "abdallah@shifauk.com",
    amount: "2200 دج",
    time: "أمس 09:00",
    method: "CCP",
    status: "قيد المراجعة",
  },
  {
    id: 3530,
    customer: "ريم بن صالح",
    email: "rim@shifauk.com",
    amount: "1200 دج",
    time: "اليوم 15:30",
    method: "RIB",
    status: "مكتملة",
  },
];

export default function AdminWallet() {
  return (
    <div>
      <DashPageHeader
        Icon={FaWallet}
        title="طلبات الشحن"
        description="مراجعة وإدارة طلبات شحن العملات الرقمية من المستخدمين
"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {infoCards.map((card, index) => (
          <InfoCard
            key={index}
            title={card.title}
            icon={card.icon}
            color={card.color}
            value={card.value}
            valueText={card.valueText}
            percentage={card.percentage}
            percentageText={card.percentageText}
          />
        ))}
      </div>
      <div className="border rounded-lg p-10 flex items-center gap-8 jus flex-col md:flex-row mb-10">
        <div className="flex flex-col gap-2 w-full md:max-w-[500px]">
          <Label
            htmlFor="cities"
            className="flex items-center gap-2 text-gray-600"
          >
            البحث عن طلب شحن
          </Label>
          <TextInput
            theme={flowbit.input}
            color="primary"
            className="w-full "
            id="search"
            type="text"
            rightIcon={Search}
            placeholder="ابحث عن طلب شحن ..."
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
              <TableHeadCell>رقم الطلب</TableHeadCell>
              <TableHeadCell>العميل</TableHeadCell>
              <TableHeadCell>البريد الإلكتروني</TableHeadCell>
              <TableHeadCell>المبلغ</TableHeadCell>
              <TableHeadCell>وقت الطلب</TableHeadCell>
              <TableHeadCell>طريقة الدفع</TableHeadCell>
              <TableHeadCell>الحالة</TableHeadCell>
              <TableHeadCell>الإجراء</TableHeadCell>
            </TableHead>
            <TableBody>
              {rechargeRequests.map((req, index) => (
                <TableRow
                  key={index}
                  className="bg-white hover:bg-gray-50 cursor-pointer"
                >
                  <TableCell className="font-bold">{req.id}</TableCell>
                  <TableCell>{req.customer}</TableCell>
                  <TableCell>{req.email}</TableCell>
                  <TableCell>{req.amount}</TableCell>
                  <TableCell>{req.time}</TableCell>
                  <TableCell>{req.method}</TableCell>
                  <TableCell>
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        req.status === "مكتملة"
                          ? "bg-green-100 text-green-800"
                          : req.status === "مرفوضة"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {req.status}
                    </span>
                  </TableCell>
                  <TableCell className="flex gap-2 justify-center items-center">
                    <button
                      title="عرض"
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <i className="fas fa-eye"></i>
                    </button>
                    <button
                      title="قبول"
                      className="text-green-500 hover:text-green-700"
                    >
                      <i className="fas fa-check-circle"></i>
                    </button>
                    <button
                      title="رفض"
                      className="text-red-500 hover:text-red-700"
                    >
                      <i className="fas fa-times-circle"></i>
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
