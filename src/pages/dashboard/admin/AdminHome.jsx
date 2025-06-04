import {
  HiChartPie,
  HiCurrencyDollar,
  HiOutlineDotsVertical,
  HiOutlineEye,
  HiTrash,
} from "react-icons/hi";
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
import { FaRegCalendarCheck, FaTasks, FaUsers } from "react-icons/fa";

import { FaUserDoctor } from "react-icons/fa6";
import { AiOutlineSchedule } from "react-icons/ai";
import {
  Dropdown,
  DropdownItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";

import InfoCard from "../../../components/dashboard/common/InfoCard";
import useApiRequest from "../../../hooks/useApiRequest";
import { useEffect } from "react";
import globalApi from "../../../utils/globalApi";
import formatDateTime from "../../../utils/formatDateTime";
import { useNavigate } from "react-router-dom";
import Skeleton from "../../../components/common/Skeleton";

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

export default function AdminHome() {
  const navigate = useNavigate();
  const {
    data: statesData,
    error: statesError,
    loading: statesLoading,
    request: statesRequest,
  } = useApiRequest();

  const {
    data: usersData,
    error: usersError,
    loading: usersLoading,
    request: usersRequest,
  } = useApiRequest();
  const {
    data: appointments,
    error: appointmentsError,
    loading: appointmentsloading,
    request: appointmentsrequest,
  } = useApiRequest();

  useEffect(() => {
    statesRequest(() => globalApi.getAdminHomeStates());
    usersRequest(() => globalApi.getLastUsers());
    appointmentsrequest(() => globalApi.getAllAppointments());
  }, []);

  return (
    <div>
      <DashPageHeader
        Icon={HiChartPie}
        title="لوحة التحكم"
        description="مرحباً بك، أحمد! هذا هو ملخص نشاط منصة شفاؤك."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {statesLoading
          ? [0, 1, 2, 3].map((index) => (
              <Skeleton key={index} className="h-32" />
            ))
          : statesData &&
            [
              {
                title: "المرضى المسجلين",
                icon: FaUsers,
                color: "#0D99FF",
                value: statesData?.data?.totalPatients || 0,
                percentage: statesData?.data?.patientChangePercent || 0,
                percentageText: "مقارنة بالشهر الماضي",
              },
              {
                title: "الاطباء النشطين",
                icon: FaUserDoctor,
                color: "#25A85C",
                value: statesData?.data?.approvedDoctors || 0,
                percentage: statesData?.data?.doctorChangePercent || 0,
                percentageText: "مقارنة بالشهر الماضي",
              },
              {
                title: "الاطباء في الانتظار",
                icon: FaUserDoctor,
                color: "#FFAE00",
                value: statesData?.data?.pendingDoctors || 0,
                percentage: statesData?.data?.doctorChangePercent || 0,
                percentageText: "مقارنة بالشهر الماضي",
              },
              {
                title: "الاستشارات التي تمت",
                icon: FaRegCalendarCheck,
                color: "#13324F",
                value: statesData?.data?.completedConsultations || 0,
                percentage: statesData?.data?.consultationChangePercent || 0,
                percentageText: "مقارنة بالشهر الماضي",
              },
              {
                title: "الاستشارات المجدولة",
                icon: AiOutlineSchedule,
                color: "#960DFF",
                value: statesData?.data?.ConfirmedConsultations || 0,
                percentage: statesData?.data?.appointmentChangePercent || 0,
                percentageText: "مقارنة بالشهر الماضي",
              },
              {
                title: "الارباح",
                icon: HiCurrencyDollar,
                color: "#65D2E5",
                value: statesData?.data?.profites || 0,
                valueText: "دج",
                percentage: statesData?.data?.revenueChangePercent || 0,
                percentageText: "مقارنة بالشهر الماضي",
              },
            ].map((card, index) => (
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
              <TableHeadCell>الجنس</TableHeadCell>
              <TableHeadCell>تاريخ التسجيل</TableHeadCell>
              <TableHeadCell>الحالة</TableHeadCell>
            </TableHead>
            <TableBody>
              {usersLoading ? (
                [...Array(5)].map((_, index) => (
                  <TableRow key={index} className="bg-white animate-pulse">
                    {[...Array(6)].map((_, cellIndex) => (
                      <TableCell key={cellIndex}>
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : usersData?.data?.users?.length > 0 ? (
                usersData.data.users.map((user, index) => (
                  <TableRow
                    key={index}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => {
                      if (user?.role === "doctor") {
                        if (user?.doctorProfile?.status === "approved") {
                          return navigate(`/dashboard/doctors/${user?._id}`);
                        } else {
                          return navigate(
                            `/dashboard/doctors/requests/${user?.doctorProfile.requestId}`
                          );
                          // !edit-here | يجب اضافة صفحة فيها قرار اللجنة بقبول او رفض الطبيب
                        }
                      } else if (user?.role === "patient") {
                        return navigate(`/dashboard/patients/${user?._id}`);
                      }
                    }}
                  >
                    <TableCell>
                      {user?.fullName?.first} {user?.fullName?.second}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800`}
                      >
                        {user?.role === "doctor"
                          ? "طبيب"
                          : user?.role === "patient"
                          ? "مريض"
                          : "مسؤول"}
                      </span>
                    </TableCell>
                    <TableCell>{user?.email}</TableCell>
                    <TableCell>{user?.phone}</TableCell>
                    <TableCell>{user?.gender}</TableCell>
                    <TableCell>
                      {formatDateTime(user?.createdAt, "date")}
                    </TableCell>
                    <TableCell>
                      {user?.role === "doctor" ? (
                        <span
                          className={`px-3 py-1 rounded-full text-[11px] ${
                            user.doctorProfile?.status === "approved"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-gray-800"
                          }`}
                        >
                          {user?.doctorProfile?.status === "approved"
                            ? "نشط"
                            : "غير نشط"}
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full text-[11px] bg-green-100 text-green-800">
                          نشط
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    لا توجد بيانات
                  </TableCell>
                </TableRow>
              )}
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
              <TableHeadCell>رقم الموعد</TableHeadCell>
              <TableHeadCell>اسم الطبيب</TableHeadCell>
              <TableHeadCell>اسم المريض</TableHeadCell>
              <TableHeadCell>نوع الموعد</TableHeadCell>
              <TableHeadCell>تاريخ ووقت الموعد</TableHeadCell>
              <TableHeadCell>الحالة</TableHeadCell>
              <TableHeadCell>الإجراء</TableHeadCell>
            </TableHead>
            <TableBody>
              {appointmentsloading ? (
                [...Array(5)].map((_, index) => (
                  <TableRow key={index} className="bg-white animate-pulse">
                    {[...Array(7)].map((_, cellIndex) => (
                      <TableCell key={cellIndex}>
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : appointments?.data?.length > 0 ? (
                appointments.data.map((appointment, index) => (
                  <TableRow key={index} className="bg-white">
                    <TableCell className="text-center font-bold">
                      #{appointment?.consultationId}
                    </TableCell>
                    <TableCell>
                      {appointment?.doctor?.fullName?.first}{" "}
                      {appointment?.doctor?.fullName?.second}
                    </TableCell>
                    <TableCell>
                      {appointment?.patient?.fullName?.first}{" "}
                      {appointment?.patient?.fullName?.second}
                    </TableCell>
                    <TableCell>{appointment.type}</TableCell>
                    <TableCell>
                      {formatDateTime(appointment?.date, "both")}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-3 py-1 rounded-full text-[11px] ${
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
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-5 text-gray-500"
                  >
                    لا توجد بيانات
                  </TableCell>
                </TableRow>
              )}
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
