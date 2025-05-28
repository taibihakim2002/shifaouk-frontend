import { HiChartPie, HiCurrencyDollar } from "react-icons/hi";
import DashPageHeader from "../../../components/dashboard/common/DashPageHeader";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { FaRegCalendarCheck, FaUsers } from "react-icons/fa";

import { FaUserDoctor } from "react-icons/fa6";
import { AiOutlineSchedule } from "react-icons/ai";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";

import InfoCard from "../../../components/dashboard/common/InfoCard";

const piChartData = [
  { name: "أمراض القلب", value: 12 },
  { name: "طب الأطفال", value: 8 },
  { name: "جراحة عامة", value: 10 },
  { name: "الجلدية", value: 6 },
  { name: "النساء والتوليد", value: 7 },
];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28EF5"];

const chartData = [
  { month: "1", doctors: 520, patients: 600 },
  { month: "2", doctors: 300, patients: 700 },
  { month: "3", doctors: 280, patients: 250 },
  { month: "4", doctors: 400, patients: 690 },
  { month: "5", doctors: 0, patients: 520 },
  { month: "6", doctors: 460, patients: 520 },
  { month: "7", doctors: 950, patients: 960 },
  { month: "8", doctors: 780, patients: 900 },
  { month: "9", doctors: 800, patients: 800 },
];
const consultationsData = [
  { month: "1", consultations: 25, appointments: 5 },
  { month: "2", consultations: 20, appointments: 3 },
  { month: "3", consultations: 55, appointments: 50 },
  { month: "4", consultations: 90, appointments: 10 },
  { month: "5", consultations: 70, appointments: 85 },
  { month: "6", consultations: 65, appointments: 20 },
  { month: "7", consultations: 15, appointments: 10 },
  { month: "8", consultations: 100, appointments: 60 },
  { month: "9", consultations: 90, appointments: 95 },
];

const users = [
  {
    name: "د. كريم بن عمر",
    type: "طبيب",
    email: "karim.doc@example.com",
    phone: "0550 123 456",
    registeredAt: "2025-05-24",
    status: "نشط",
  },
  {
    name: "ليلى منصوري",
    type: "مريض",
    email: "layla.mansouri@example.com",
    phone: "0560 789 321",
    registeredAt: "2025-05-23",
    status: "نشط",
  },
];

const appointments = [
  {
    doctor: "د. أحمد قادري",
    patient: "سعاد بن زيد",
    type: "استشارة",
    datetime: "2025-05-25 14:00",
    price: 2500,
    status: "مكتمل",
  },
  {
    doctor: "د. ليلى بن عيسى",
    patient: "علي ناصر",
    type: "متابعة",
    datetime: "2025-05-26 09:30",
    price: 2000,
    status: "قيد الانتظار",
  },
];

const infoCards = [
  {
    title: "المرضى المسجلين",
    icon: FaUsers,
    color: "#0D99FF",
    value: 10054,
    percentage: -3,
    percentageText: "مقارنة بالشهر الماضي",
  },
  {
    title: "الاطباء المسجلين",
    icon: FaUserDoctor,
    color: "#25A85C",
    value: 2108,
    percentage: 5,
    percentageText: "مقارنة بالشهر الماضي",
  },
  {
    title: "الاستشارات التي تمت",
    icon: FaRegCalendarCheck,
    color: "#13324F",
    value: 571,
    percentage: 15,
    percentageText: "مقارنة بالشهر الماضي",
  },
  {
    title: "المواعيد المجدولة",
    icon: AiOutlineSchedule,
    color: "#960DFF",
    value: 120,
    percentage: 3,
    percentageText: "مقارنة بالشهر الماضي",
  },
  {
    title: "الارباح",
    icon: HiCurrencyDollar,
    color: "#65D2E5",
    value: 120822,
    valueText: "دج",
    percentage: 3,
    percentageText: "مقارنة بالشهر الماضي",
  },
];

export default function AdminHome() {
  return (
    <div>
      <DashPageHeader
        Icon={HiChartPie}
        title="لوحة التحكم"
        description="مرحباً بك، أحمد! هذا هو ملخص نشاط منصة شفاؤك."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="mt-10 p-5 border rounded-xl bg-white">
          <h2 className="text-lg font-bold text-gray-600 mb-10">
            نمو المستخدمين خلال الشهور
          </h2>

          <div className="flex justify-center gap-4 mb-4">
            <span className="px-3 py-1 rounded bg-green-400 text-white text-sm">
              المرضى
            </span>
            <span className="px-3 py-1 rounded bg-blue-400 text-white text-sm">
              الأطباء
            </span>
          </div>
          <div className="w-full h-full relative" dir="ltr">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData} margin={{ left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="month"
                  height={20}
                  tick={{ fontSize: 12, fill: "#333" }}
                />
                <YAxis tick={{ fontSize: 12, fill: "#333" }} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="patients"
                  stroke="#4ade80"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="doctors"
                  stroke="#60a5fa"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="mt-10 p-5 border rounded-xl bg-white">
          <h2 className="text-lg font-bold text-gray-600 mb-10">
            نشاط الاستشارات الشهري
          </h2>

          <div className="flex justify-center gap-4 mb-4">
            <span className="px-3 py-1 rounded bg-pink-500 text-white text-sm">
              الاستشارات
            </span>
            <span className="px-3 py-1 rounded bg-green-800 text-white text-sm">
              المواعيد
            </span>
          </div>
          <div className="w-full h-full" dir="ltr">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={consultationsData} margin={{ left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="month"
                  height={20}
                  tick={{ fontSize: 12, fill: "#333" }}
                />
                <YAxis tick={{ fontSize: 12, fill: "#333" }} />
                <Tooltip />

                <Bar dataKey="consultations" fill="#ec4899" />
                <Bar dataKey="appointments" fill="#4d4d00" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="mt-10 p-5 border rounded-xl bg-white">
        <h2 className="text-lg font-bold text-gray-600 mb-10">
          أحدث المستخدمين المسجلين
        </h2>

        <div className="overflow-x-auto mb-3">
          <Table className="text-right">
            <TableHead className="bg-gray-100">
              <TableHeadCell>الاسم الكامل</TableHeadCell>
              <TableHeadCell>نوع المستخدم</TableHeadCell>
              <TableHeadCell>البريد الإلكتروني</TableHeadCell>
              <TableHeadCell>رقم الهاتف</TableHeadCell>
              <TableHeadCell>تاريخ التسجيل</TableHeadCell>
              <TableHeadCell>الحالة</TableHeadCell>
            </TableHead>
            <TableBody>
              {users.map((user, index) => (
                <TableRow key={index} className="bg-white">
                  <TableCell>{user.name}</TableCell>
                  <TableCell>
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        user.type === "طبيب"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {user.type}
                    </span>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.registeredAt}</TableCell>
                  <TableCell>
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        user.status === "نشط"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {user.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="mt-10 p-5 border rounded-xl bg-white">
        <h2 className="text-lg font-bold text-gray-600 mb-10">
          آخر الاستشارات والمواعيد
        </h2>

        <div className="overflow-x-auto mb-3">
          <Table className="text-right">
            <TableHead className="bg-gray-100">
              <TableHeadCell>اسم الطبيب</TableHeadCell>
              <TableHeadCell>اسم المريض</TableHeadCell>
              <TableHeadCell>نوع الموعد</TableHeadCell>
              <TableHeadCell>التاريخ والوقت</TableHeadCell>
              <TableHeadCell>السعر</TableHeadCell>
              <TableHeadCell>الحالة</TableHeadCell>
            </TableHead>
            <TableBody>
              {appointments.map((appt, index) => (
                <TableRow key={index} className="bg-white">
                  <TableCell>{appt.doctor}</TableCell>
                  <TableCell>{appt.patient}</TableCell>
                  <TableCell>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {appt.type}
                    </span>
                  </TableCell>
                  <TableCell>{appt.datetime}</TableCell>
                  <TableCell className="text-green-600">
                    {appt.price} د.ج
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        appt.status === "مكتمل"
                          ? "bg-green-100 text-green-800"
                          : appt.status === "قيد الانتظار"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {appt.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="mt-10 p-5 border rounded-xl bg-white">
        <h2 className="text-lg font-bold text-gray-600 mb-6 text-center">
          توزيع تخصصات الأطباء
        </h2>

        <div className="h-72" dir="ltr">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={piChartData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {piChartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
