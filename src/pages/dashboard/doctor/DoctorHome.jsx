import { Rating, RatingStar } from "flowbite-react";
import { FaUserAlt, FaWallet } from "react-icons/fa";
import { FaCircleCheck, FaUserDoctor } from "react-icons/fa6";
import { GoArrowDown, GoArrowUp } from "react-icons/go";
import { HiChartPie, HiOutlineCurrencyDollar, HiUsers } from "react-icons/hi";
import { IoCheckmarkCircleSharp, IoCloseCircle, IoStar } from "react-icons/io5";
import { Button } from "flowbite-react";
import flowbit from "../../../config/flowbit";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { Info, Video, MessageCircle } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Link } from "react-router-dom";
import { MdAccessTimeFilled, MdDone } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import { GiSandsOfTime } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import InfoCard from "../../../components/dashboard/common/InfoCard";
import DashPageHeader from "../../../components/dashboard/common/DashPageHeader";

const infoCards = [
  {
    title: "عدد المرضى ",
    icon: HiUsers,
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
    title: "المحفظة ",
    icon: FaWallet,
    color: "#65D2E5",
    value: 5200,
    valueText: "دج",
    percentage: -11,
    percentageText: "مقارنة بالشهر الماضي",
  },
];
const data = [
  { day: "05 جويلية", patients: 6, consultations: 8 },
  { day: "06 جويلية", patients: 7, consultations: 6 },
  { day: "07 جويلية", patients: 9, consultations: 18 },
  { day: "08 جويلية", patients: 10, consultations: 15 },
  { day: "09 جويلية", patients: 8, consultations: 10 },
  { day: "10 جويلية", patients: 1, consultations: 12 },
  { day: "11 جويلية", patients: 6, consultations: 19 },
  { day: "12 جويلية", patients: 18, consultations: 17 },
  { day: "13 جويلية", patients: 10, consultations: 14 },
  { day: "14 جويلية", patients: 14, consultations: 9 },
];
const patients = [
  {
    name: "محمد معاوية",
    age: 21,
    date: "21 مايو",
    time: "21:00",
    status: "مكتملة",
    email: "mohamed.mouawia@example.com",
    action: { label: "عرض بروفيل", type: "info" },
  },
  {
    name: "علي بن احمد",
    age: 21,
    date: "21 مايو",
    time: "22:00",
    status: "قادمة",
    email: "ali.benahmed@example.com",
    action: { label: "بدء الجلسة", type: "video" },
  },
  {
    name: "احمد إبن شعبان",
    age: 21,
    date: "21 مايو",
    time: "23:00",
    status: "قادمة",
    email: "ahmed.ibnchaaban1@example.com",
    action: { label: "عرض بروفيل", type: "info" },
  },
  {
    name: "احمد إبن شعبان",
    age: 21,
    date: "21 مايو",
    time: "23:00",
    status: "تحتاج متابعة",
    email: "ahmed.ibnchaaban2@example.com",
    action: { label: "تواصل", type: "chat" },
  },
];

const getStatusStyle = (status) => {
  if (status === "مكتملة") return "bg-green-100 text-green-800";
  if (status === "قادمة") return "bg-yellow-100 text-yellow-800";
  if (status === "تحتاج متابعة") return "bg-red-100 text-red-800";
  return "bg-gray-100 text-gray-800";
};

const getActionButton = (action) => {
  switch (action.type) {
    case "info":
      return (
        <Button theme={flowbit.button} color="primary" outline size="sm">
          <Info size={14} /> <span className="ms-2">{action.label}</span>
        </Button>
      );
    case "video":
      return (
        <Button theme={flowbit.button} color="primary" size="sm">
          <Video size={14} />
          <span className="ms-2"> {action.label}</span>
        </Button>
      );
    case "chat":
      return (
        <Button theme={flowbit.button} color="primary" size="sm">
          <MessageCircle size={14} />{" "}
          <span className="ms-2"> {action.label}</span>
        </Button>
      );
    default:
      return null;
  }
};

export default function DoctorHome() {
  return (
    <div>
      <DashPageHeader
        Icon={HiChartPie}
        title="لوحة التحكم"
        description="مرحباً بك، أحمد! هذا هو ملخص نشاط منصة شفاؤك."
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
      <div className="mt-10 p-5 border rounded-xl bg-white mb-10">
        <h2 className="text-lg font-bold text-gray-600 mb-10">سجل المرضى</h2>
        <div className="overflow-x-auto mb-3">
          <Table className="text-right">
            <TableHead className="bg-gray-100">
              <TableHeadCell>اسم المريض</TableHeadCell>
              <TableHeadCell>البريد الإلكتروني</TableHeadCell>
              <TableHeadCell>العمر</TableHeadCell>
              <TableHeadCell>التاريخ</TableHeadCell>
              <TableHeadCell>الوقت</TableHeadCell>
              <TableHeadCell>الحالة</TableHeadCell>
              <TableHeadCell>الإجراء</TableHeadCell>
            </TableHead>
            <TableBody>
              {patients.map((p, index) => (
                <TableRow key={index}>
                  <TableCell>{p.name}</TableCell>
                  <TableCell>{p.email}</TableCell>
                  <TableCell>{p.age}</TableCell>
                  <TableCell>{p.date}</TableCell>
                  <TableCell>{p.time}</TableCell>
                  <TableCell>
                    <span
                      className={`${getStatusStyle(
                        p.status
                      )} px-3 py-1 rounded-full  text-[12px]`}
                    >
                      {p.status}
                    </span>
                  </TableCell>
                  <TableCell className="flex justify-center"></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        <div className="border rounded-lg p-7 lg:col-span-2">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-lg font-bold text-gray-600">
              طلبات الاستشارة الجديدة
            </h3>
            <p className="flex items-center gap-2 text-sm text-blue-700 bg-blue-100 rounded-lg px-2 py-2">
              <span>4</span>
              <span>طلبات جديدة</span>
            </p>
          </div>
          <div className="flex flex-col gap-8">
            <div className="border rounded-lg p-4 flex flex-col lg:flex-row items-center justify-between gap-4">
              <div>
                <div className="flex gap-4 items-center">
                  <img
                    src="/doctor1.jpg"
                    alt="doctor"
                    className="w-20 h-20 object-cover rounded-full"
                  />
                  <div>
                    <h3 className="font-bold text-gray-600 mb-2">علي بن علي</h3>
                    <p className=" text-gray-400 text-sm">
                      الام في المعدة وحموضة مستمرة
                    </p>
                  </div>
                </div>
                <p className="ps-24 text-sm text-gray-400">منذ ساعة</p>
              </div>
              <div className="flex gap-3">
                <Button theme={flowbit.button} color="green">
                  <span className="me-2">
                    <FaCircleCheck className="" />
                  </span>
                  <span>قبول </span>
                </Button>
                <Button theme={flowbit.button} color="red">
                  <span className="me-2">
                    <IoCloseCircle />
                  </span>
                  <span>رفض </span>
                </Button>
              </div>
            </div>
            <div className="border rounded-lg p-4 flex flex-col lg:flex-row items-center justify-between gap-4">
              <div>
                <div className="flex gap-4 items-center">
                  <img
                    src="/doctor1.jpg"
                    alt="doctor"
                    className="w-20 h-20 object-cover rounded-full"
                  />
                  <div>
                    <h3 className="font-bold text-gray-600 mb-2">علي بن علي</h3>
                    <p className=" text-gray-400 text-sm">
                      الام في المعدة وحموضة مستمرة
                    </p>
                  </div>
                </div>
                <p className="ps-24 text-sm text-gray-400">منذ ساعة</p>
              </div>
              <div className="flex gap-3">
                <Button theme={flowbit.button} color="green">
                  <span className="me-2">
                    <FaCircleCheck className="" />
                  </span>
                  <span>قبول </span>
                </Button>
                <Button theme={flowbit.button} color="red">
                  <span className="me-2">
                    <IoCloseCircle />
                  </span>
                  <span>رفض </span>
                </Button>
              </div>
            </div>
            <div className="border rounded-lg p-4 flex flex-col lg:flex-row items-center justify-between gap-4">
              <div>
                <div className="flex gap-4 items-center">
                  <img
                    src="/doctor1.jpg"
                    alt="doctor"
                    className="w-20 h-20 object-cover rounded-full"
                  />
                  <div>
                    <h3 className="font-bold text-gray-600 mb-2">علي بن علي</h3>
                    <p className=" text-gray-400 text-sm">
                      الام في المعدة وحموضة مستمرة
                    </p>
                  </div>
                </div>
                <p className="ps-24 text-sm text-gray-400">منذ ساعة</p>
              </div>
              <div className="flex gap-3">
                <Button theme={flowbit.button} color="green">
                  <span className="me-2">
                    <FaCircleCheck className="" />
                  </span>
                  <span>قبول </span>
                </Button>
                <Button theme={flowbit.button} color="red">
                  <span className="me-2">
                    <IoCloseCircle />
                  </span>
                  <span>رفض </span>
                </Button>
              </div>
            </div>
            <div className="border rounded-lg p-4 flex flex-col lg:flex-row items-center justify-between gap-4">
              <div>
                <div className="flex gap-4 items-center">
                  <img
                    src="/doctor1.jpg"
                    alt="doctor"
                    className="w-20 h-20 object-cover rounded-full"
                  />
                  <div>
                    <h3 className="font-bold text-gray-600 mb-2">علي بن علي</h3>
                    <p className=" text-gray-400 text-sm">
                      الام في المعدة وحموضة مستمرة
                    </p>
                  </div>
                </div>
                <p className="ps-24 text-sm text-gray-400">منذ ساعة</p>
              </div>
              <div className="flex gap-3">
                <Button theme={flowbit.button} color="green">
                  <span className="me-2">
                    <FaCircleCheck className="" />
                  </span>
                  <span>قبول </span>
                </Button>
                <Button theme={flowbit.button} color="red">
                  <span className="me-2">
                    <IoCloseCircle />
                  </span>
                  <span>رفض </span>
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="border rounded-lg p-7 ">
          <h3 className="text-lg font-bold text-gray-600">سجل المحادثات </h3>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="border rounded-lg p-7 lg:col-span-2">
          <h3 className="text-lg font-bold text-gray-600">احصائيات الطبيب</h3>

          <div
            className="w-full h-[350px] flex justify-center items-center"
            dir="ltr"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{ top: 50, right: 0, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="day"
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  interval={0}
                  tick={{ fontSize: 12 }}
                />
                <YAxis />
                <Tooltip />
                <Legend
                  verticalAlign="top"
                  iconType="square"
                  wrapperStyle={{ marginTop: -10 }}
                  formatter={(value) =>
                    value === "patients" ? (
                      <span style={{ color: "#4CAF50", marginRight: 5 }}>
                        مرضى
                      </span>
                    ) : (
                      <span style={{ color: "#e91e63", marginRight: 5 }}>
                        استشارات طبية
                      </span>
                    )
                  }
                />
                <Bar dataKey="patients" fill="#4CAF50" name="مرضى" />
                <Bar
                  dataKey="consultations"
                  fill="#e91e63"
                  name="استشارات طبية"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="border rounded-lg p-7 ">
          <h3 className="text-lg font-bold text-gray-600 mb-10">
            اعدادات الحساب
          </h3>
          <div className="flex flex-col gap-6">
            <Link
              to="/dashboard/profile"
              className="border rounded-lg p-4 flex items-center gap-5 hover:bg-[#daf0ff]"
            >
              <div className="p-3 border border-primaryColor rounded-full bg-[#abdcff]">
                <FaUserAlt size={25} className="text-primaryColor" />
              </div>
              <div>
                <h3 className="text-center text-gray-600 font-bold mb-2">
                  الملف الشخصي
                </h3>
                <p className="text-gray-400 text-sm">تعديل معلوماتك الشخصية</p>
              </div>
            </Link>
            <Link className="border rounded-lg p-4 flex items-center gap-5 hover:bg-[#e1ffed]">
              <div className="p-3 border border-[#25A85C] rounded-full bg-[#b5ffd4]">
                <MdAccessTimeFilled size={25} className="text-[#25A85C]" />
              </div>
              <div>
                <h3 className="text-center text-gray-600 font-bold mb-2">
                  أوقات العمل
                </h3>
                <p className="text-gray-400 text-sm">تحديد اوقات العمل </p>
              </div>
            </Link>
            <Link className="border rounded-lg p-4 flex items-center gap-5 hover:bg-[#ffe5e5]">
              <div className="p-3 border border-[#F50000] rounded-full bg-[#ffbcbc]">
                <CiLock size={25} className="text-[#F50000]" />
              </div>
              <div>
                <h3 className="text-center text-gray-600 font-bold mb-2">
                  كلمة السر
                </h3>
                <p className="text-gray-400 text-sm"> تغيير كلمة السر</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
