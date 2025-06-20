import {
  HiChartPie,
  HiCurrencyDollar,
  HiOutlineCalendar,
  HiOutlineChartBar,
  HiOutlineCheckCircle,
  HiOutlineClipboardList,
  HiOutlineClock,
  HiOutlineDotsVertical,
  HiOutlineEye,
  HiOutlineInformationCircle,
  HiOutlinePencil,
  HiOutlineUsers,
  HiOutlineXCircle,
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
  Avatar,
  Badge,
  Button,
  Dropdown,
  DropdownItem,
  Select,
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
import flowbit from "../../../config/flowbit";
import parseImgUrl from "../../../utils/parseImgUrl";
import { ChevronRight, Link } from "lucide-react";

const getStatusDisplay = (status) => {
  switch (status) {
    case "confirmed":
      return { text: "مؤكد", color: "success", icon: HiOutlineCheckCircle };
    case "pending":
      return {
        text: "بانتظار المراجعة",
        color: "warning",
        icon: HiOutlineClock,
      };
    case "completed":
      return { text: "مكتمل", color: "teal", icon: HiOutlineCheckCircle };
    case "cancelled":
    case "rejected":
      return { text: "ملغي", color: "failure", icon: HiOutlineXCircle };
    default:
      return { text: status, color: "gray", icon: HiOutlineInformationCircle };
  }
};

const InfoCardSkeleton = () => (
  <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 animate-pulse">
    <div className="flex justify-between items-start">
      {/* Icon Placeholder */}
      <div className="w-12 h-12 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
      {/* Percentage Placeholder */}
      <div className="flex items-center gap-1">
        <div className="w-4 h-4 bg-gray-200 dark:bg-gray-600 rounded-full"></div>
        <div className="h-5 bg-gray-200 dark:bg-gray-600 rounded-md w-16"></div>
      </div>
    </div>
    <div className="mt-4 space-y-2">
      {/* Title Placeholder */}
      <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded-md w-1/2"></div>
      {/* Value Placeholder */}
      <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded-md w-3/4"></div>
    </div>
  </div>
);

const userGrowthData = [
  { month: "يناير", patients: 22, doctors: 5 },
  { month: "فبراير", patients: 28, doctors: 7 },
  { month: "مارس", patients: 45, doctors: 8 },
  { month: "أبريل", patients: 52, doctors: 10 },
  { month: "مايو", patients: 78, doctors: 12 },
  { month: "يونيو", patients: 85, doctors: 15 },
];

const consultationsData = [
  { month: "يناير", consultations: 120, appointments: 150 },
  { month: "فبراير", consultations: 180, appointments: 210 },
  { month: "مارس", consultations: 220, appointments: 280 },
  { month: "أبريل", consultations: 190, appointments: 240 },
  { month: "مايو", consultations: 250, appointments: 310 },
  { month: "يونيو", consultations: 270, appointments: 340 },
];
// --- End of Static Data ---

// --- Helper Components for Styling ---

// A reusable card wrapper for charts
const ChartCard = ({ title, icon: Icon, children, filterOptions }) => (
  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-3 mb-3 sm:mb-0">
        <Icon
          size={24}
          className="text-primaryColor dark:text-primaryColor-400"
        />
        {title}
      </h3>
      {filterOptions && (
        <div className="w-full sm:w-auto">
          <Select
            id="chart-filter"
            sizing="sm"
            theme={flowbit.select}
            className="w-full sm:w-40"
            // Add onChange handler here
          >
            {filterOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </Select>
        </div>
      )}
    </div>
    <div className="w-full h-[300px]" dir="ltr">
      {children}
    </div>
  </div>
);

// Custom styled tooltip for Recharts
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-3 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm shadow-xl rounded-lg border border-gray-200 dark:border-gray-600">
        <p className="label font-semibold text-sm text-gray-800 dark:text-white mb-1">
          {label}
        </p>
        {payload.map((entry, index) => (
          <p
            key={`item-${index}`}
            style={{ color: entry.color }}
            className="text-xs font-medium flex items-center"
          >
            <span
              className="w-2 h-2 rounded-full mr-1.5"
              style={{ backgroundColor: entry.color }}
            ></span>
            {`${entry.name}: ${entry.value}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

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

  console.log(appointments);
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
          ? [0, 1, 2, 3].map((index) => <InfoCardSkeleton key={index} />)
          : statesData &&
            [
              {
                title: "المرضى المسجلين",
                icon: FaUsers,
                color: "#0D99FF",
                value: statesData?.data?.totalPatients || 0,
                percentage: statesData?.data?.patientChangePercent || 0,
                percentageText: "مقارنة بالشهر الماضي",
                link: "/dashboard/patients",
              },
              {
                title: "الاطباء النشطين",
                icon: FaUserDoctor,
                color: "#25A85C",
                value: statesData?.data?.approvedDoctors || 0,
                percentage: statesData?.data?.doctorChangePercent || 0,
                percentageText: "مقارنة بالشهر الماضي",
                link: "/dashboard/patients",
              },
              {
                title: "الاطباء في الانتظار",
                icon: FaUserDoctor,
                color: "#FFAE00",
                value: statesData?.data?.pendingDoctors || 0,
                percentage: statesData?.data?.doctorChangePercent || 0,
                percentageText: "مقارنة بالشهر الماضي",
                link: "/dashboard/doctors/requests",
              },
              {
                title: "الاستشارات التي تمت",
                icon: FaRegCalendarCheck,
                color: "#13324F",
                value: statesData?.data?.completedConsultations || 0,
                percentage: statesData?.data?.consultationChangePercent || 0,
                percentageText: "مقارنة بالشهر الماضي",
                link: "/dashboard/appointments",
              },
              {
                title: "الاستشارات المجدولة",
                icon: AiOutlineSchedule,
                color: "#960DFF",
                value: statesData?.data?.ConfirmedConsultations || 0,
                percentage: statesData?.data?.appointmentChangePercent || 0,
                percentageText: "مقارنة بالشهر الماضي",
                link: "/dashboard/appointments",
              },
              {
                title: "الارباح",
                icon: HiCurrencyDollar,
                color: "#65D2E5",
                value: statesData?.data?.profites || 0,
                valueText: "دج",
                percentage: statesData?.data?.revenueChangePercent || 0,
                percentageText: "مقارنة بالشهر الماضي",
                link: "/dashboard/wallet",
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
                link={card.link}
              />
            ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-10">
        {/* User Growth Chart */}
        <ChartCard
          title="نمو المستخدمين (آخر 6 أشهر)"
          icon={HiOutlineUsers}
          filterOptions={[
            { value: "6m", label: "آخر 6 أشهر" },
            { value: "1y", label: "آخر سنة" },
            { value: "all", label: "كل الأوقات" },
          ]}
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={userGrowthData}
              margin={{ top: 5, right: 20, left: -25, bottom: 5 }}
            >
              <defs>
                <linearGradient id="colorPatients" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4ade80" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#4ade80" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorDoctors" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#60a5fa" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                strokeOpacity={0.2}
                className="dark:stroke-gray-600"
              />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 11, fill: "#4B5563" }}
                className="dark:text-gray-400"
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#4B5563" }}
                className="dark:text-gray-400"
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: "12px", paddingTop: "20px" }}
              />
              <Line
                type="monotone"
                dataKey="patients"
                name="المرضى"
                stroke="#4ade80"
                strokeWidth={2.5}
                dot={{ r: 4, strokeWidth: 2, fill: "#fff" }}
                activeDot={{ r: 6, strokeWidth: 2, fill: "#fff" }}
              />
              <Line
                type="monotone"
                dataKey="doctors"
                name="الأطباء"
                stroke="#60a5fa"
                strokeWidth={2.5}
                dot={{ r: 4, strokeWidth: 2, fill: "#fff" }}
                activeDot={{ r: 6, strokeWidth: 2, fill: "#fff" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Consultations Activity Chart */}
        <ChartCard
          title="نشاط الاستشارات الشهري"
          icon={HiOutlineChartBar}
          filterOptions={[
            { value: "6m", label: "آخر 6 أشهر" },
            { value: "1y", label: "آخر سنة" },
            { value: "all", label: "كل الأوقات" },
          ]}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={consultationsData}
              margin={{ top: 5, right: 20, left: -25, bottom: 5 }}
              barGap={6}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                strokeOpacity={0.2}
                className="dark:stroke-gray-600"
              />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 11, fill: "#4B5563" }}
                className="dark:text-gray-400"
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#4B5563" }}
                className="dark:text-gray-400"
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: "12px", paddingTop: "20px" }}
              />
              <Bar
                dataKey="appointments"
                name="المواعيد المجدولة"
                fill="#818CF8"
                radius={[6, 6, 0, 0]}
                barSize={12}
              />
              <Bar
                dataKey="consultations"
                name="الاستشارات المكتملة"
                fill="#F472B6"
                radius={[6, 6, 0, 0]}
                barSize={12}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
      <div className="mt-10 p-5 border rounded-xl bg-white dark:bg-gray-800 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-5 pb-3 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-3">
            <FaUsers
              size={26}
              className="text-primaryColor dark:text-primaryColor-400"
            />
            احدث المستخدمين المسجلين
          </h2>
        </div>
        <div className="overflow-x-auto mb-3">
          <Table hoverable className="text-right dark:divide-gray-700">
            <TableHead className="bg-gray-100 dark:bg-gray-700 text-xs text-gray-600 dark:text-gray-300 uppercase">
              <TableHeadCell className="p-3 px-4">المستخدم</TableHeadCell>
              <TableHeadCell className="p-3 px-4">نوع المستخدم</TableHeadCell>
              <TableHeadCell className="p-3 px-4">رقم الهاتف</TableHeadCell>
              <TableHeadCell className="p-3 px-4">الجنس</TableHeadCell>
              <TableHeadCell className="p-3 px-4">تاريخ التسجيل</TableHeadCell>
              <TableHeadCell className="p-3 px-4 text-center">
                الحالة
              </TableHeadCell>
            </TableHead>

            <TableBody className="divide-y dark:divide-gray-700">
              {usersLoading ? (
                [...Array(5)].map((_, index) => (
                  <TableRow
                    key={index}
                    className="bg-white animate-pulse dark:bg-gray-800"
                  >
                    {[...Array(6)].map((__, cellIndex) => (
                      <TableCell key={cellIndex} className="p-3 px-4">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : usersData?.data?.users?.length > 0 ? (
                usersData.data.users.map((user) => {
                  const fullName = `${user?.fullName?.first || ""} ${
                    user?.fullName?.second || ""
                  }`;
                  const avatarUrl = user.avatar
                    ? parseImgUrl(user.avatar)
                    : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        fullName
                      )}&background=0D8ABC&color=fff&font-size=0.4&format=svg`;

                  return (
                    <TableRow
                      key={user._id}
                      className="bg-white hover:bg-slate-50 dark:bg-gray-800 dark:hover:bg-gray-700/50 transition-colors duration-150 cursor-pointer"
                      onClick={() => {
                        if (user?.role === "doctor") {
                          return user?.doctorProfile?.status === "approved"
                            ? navigate(`/dashboard/doctors/${user._id}`)
                            : navigate(
                                `/dashboard/doctors/requests/${user?.doctorProfile?.requestId}`
                              );
                        } else if (user?.role === "patient") {
                          return navigate(`/dashboard/patients/${user._id}`);
                        }
                      }}
                    >
                      <TableCell className="p-3 px-4 whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        <div className="flex items-center gap-3">
                          <img
                            className="w-10 h-10 rounded-full object-cover shadow-sm border border-gray-200 dark:border-gray-600"
                            src={avatarUrl}
                            alt={fullName}
                          />
                          <div className="overflow-hidden">
                            <p className="text-sm font-semibold text-primaryColor-600 dark:text-primaryColor-400 truncate">
                              {fullName}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell className="p-3 px-4 text-sm text-blue-800 dark:text-blue-400">
                        <span className="bg-blue-100 dark:bg-blue-800/20 px-3 py-1 rounded-full text-sm">
                          {user?.role === "doctor"
                            ? "طبيب"
                            : user?.role === "patient"
                            ? "مريض"
                            : "مسؤول"}
                        </span>
                      </TableCell>

                      <TableCell className="p-3 px-4 text-sm text-gray-500 dark:text-gray-400">
                        {user.phone || "-"}
                      </TableCell>

                      <TableCell className="p-3 px-4 text-sm text-gray-500 dark:text-gray-400">
                        {user.gender || "-"}
                      </TableCell>

                      <TableCell className="p-3 px-4 text-sm text-gray-500 dark:text-gray-400">
                        {formatDateTime(user.createdAt, "date")}
                      </TableCell>

                      <TableCell className="p-3 px-4 text-center">
                        <span
                          className={`px-3 py-1 rounded-full text-[11px] ${
                            user?.role === "doctor"
                              ? user.doctorProfile?.status === "approved"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-gray-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {user?.role === "doctor"
                            ? user.doctorProfile?.status === "approved"
                              ? "نشط"
                              : "غير نشط"
                            : "نشط"}
                        </span>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow className="bg-white dark:bg-gray-800">
                  <TableCell
                    colSpan={6}
                    className="text-center py-16 text-gray-500 dark:text-gray-400"
                  >
                    <p className="text-lg font-medium mb-1">لا توجد بيانات</p>
                    <p className="text-sm">لم يتم تسجيل أي مستخدم جديد بعد.</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="my-10 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-5 pb-3 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-3">
            <HiOutlineCalendar
              size={26}
              className="text-primaryColor dark:text-primaryColor-400"
            />
            آخر الاستشارات والمواعيد
          </h2>
          <a href="/dashboard/appointments">
            <Button
              size="sm"
              color="light"
              theme={flowbit.button}
              className="dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700 mt-2 sm:mt-0"
            >
              عرض كل المواعيد{" "}
              <ChevronRight size={16} className="mr-1 transform scale-x-[-1]" />
            </Button>
          </a>
        </div>
        <div className="overflow-x-auto">
          <Table
            hoverable
            className="min-w-[900px] text-right dark:divide-gray-700"
          >
            <TableHead className="bg-slate-50 dark:bg-gray-700 text-xs text-gray-600 dark:text-gray-300 uppercase">
              <TableHeadCell className="p-3 px-4">رقم الموعد</TableHeadCell>
              <TableHeadCell className="p-3 px-4">الطبيب</TableHeadCell>
              <TableHeadCell className="p-3 px-4">المريض</TableHeadCell>
              <TableHeadCell className="p-3 px-4">نوع الموعد</TableHeadCell>
              <TableHeadCell className="p-3 px-4">
                تاريخ ووقت الموعد
              </TableHeadCell>
              <TableHeadCell className="p-3 px-4 text-center">
                الحالة
              </TableHeadCell>
              <TableHeadCell className="p-3 px-4 text-center sticky right-0 bg-slate-50 dark:bg-gray-700">
                الإجراء
              </TableHeadCell>
            </TableHead>
            <TableBody className="divide-y dark:divide-gray-700">
              {appointmentsloading ? (
                [...Array(5)].map((_, index) => (
                  <TableRow
                    key={index}
                    className="bg-white animate-pulse dark:bg-gray-800"
                  >
                    <TableCell className="p-3 px-4">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                    </TableCell>
                    <TableCell className="p-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-28"></div>
                      </div>
                    </TableCell>
                    <TableCell className="p-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-28"></div>
                      </div>
                    </TableCell>
                    <TableCell className="p-3 px-4">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                    </TableCell>
                    <TableCell className="p-3 px-4">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
                    </TableCell>
                    <TableCell className="p-3 px-4 text-center">
                      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-24 mx-auto"></div>
                    </TableCell>
                    <TableCell className="p-3 px-4 text-center sticky right-0 bg-white dark:bg-gray-800">
                      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-8 mx-auto"></div>
                    </TableCell>
                  </TableRow>
                ))
              ) : appointmentsError ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-10 text-red-500"
                  >
                    حدث خطأ أثناء تحميل البيانات.
                  </TableCell>
                </TableRow>
              ) : appointments?.data?.length > 0 ? (
                appointments?.data?.map((appointment) => {
                  const statusInfo = getStatusDisplay(appointment.status);
                  return (
                    <TableRow
                      key={appointment._id}
                      className="bg-white dark:bg-gray-800 hover:bg-slate-50 dark:hover:bg-gray-700/50 transition-colors duration-150 group"
                    >
                      <TableCell className="p-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300 text-center">
                        #{appointment?.consultationId}
                      </TableCell>
                      <TableCell className="p-3 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <img
                            className="w-10 h-10 rounded-full object-cover shadow-sm border border-gray-200 dark:border-gray-600"
                            src={
                              appointment.doctor?.profileImage ||
                              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                appointment.patient?.name
                              )}&background=0D8ABC&color=fff&font-size=0.4&format=svg`
                            }
                            alt={"doctor"}
                          />
                          <div className="overflow-hidden">
                            <p className="text-sm font-semibold text-primaryColor-600 dark:text-primaryColor-400 truncate">
                              {appointment.doctor?.name}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                              {appointment.doctor?.email}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="p-3 px-4 whitespace-nowrap">
                        {/* <span className="text-sm font-medium text-gray-800 dark:text-gray-200 group-hover/link:underline group-hover/link:text-primaryColor">
                          {appointment.patient?.fullName?.first}{" "}
                          {appointment.patient?.fullName?.second}
                        </span> */}
                        <div className="flex items-center gap-3">
                          <img
                            className="w-10 h-10 rounded-full object-cover shadow-sm border border-gray-200 dark:border-gray-600"
                            src={
                              appointment.patient?.profileImage ||
                              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                appointment.patient?.name
                              )}&background=0D8ABC&color=fff&font-size=0.4&format=svg`
                            }
                            alt={"doctor"}
                          />
                          <div className="overflow-hidden">
                            <p className="text-sm font-semibold text-primaryColor-600 dark:text-primaryColor-400 truncate">
                              {appointment.patient?.name}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                              {appointment.patient?.email}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="p-3 px-4 text-sm text-gray-500 dark:text-gray-400">
                        {appointment.type === "online"
                          ? "عن بعد"
                          : appointment.type === "in-person"
                          ? "حضوري"
                          : appointment.type || "غير محدد"}
                      </TableCell>
                      <TableCell className="p-3 px-4 text-sm text-gray-500 dark:text-gray-400">
                        {formatDateTime(appointment?.date, "both")}
                      </TableCell>
                      <TableCell className="p-3 px-4 text-center">
                        <Badge
                          color={statusInfo.color}
                          icon={statusInfo.icon}
                          theme={flowbit.badge}
                          className="!text-xs !font-medium !px-2.5 !py-1"
                        >
                          {statusInfo.text}
                        </Badge>
                      </TableCell>
                      <TableCell className="p-3 px-4 text-center sticky right-0 bg-white group-hover:bg-slate-50 dark:bg-gray-800 dark:group-hover:bg-gray-700/50">
                        <Dropdown
                          arrowIcon={false}
                          inline
                          renderTrigger={() => (
                            <button
                              type="button"
                              className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                            >
                              <HiOutlineDotsVertical className="h-5 w-5" />
                            </button>
                          )}
                          theme={flowbit.dropdown}
                          placement="bottom-end"
                        >
                          <DropdownItem icon={HiOutlineEye}>
                            عرض التفاصيل
                          </DropdownItem>
                          <DropdownItem icon={HiOutlinePencil}>
                            تعديل
                          </DropdownItem>
                          <Dropdown.Divider />
                          <DropdownItem
                            icon={HiTrash}
                            className="!text-red-600 hover:!bg-red-100 dark:!text-red-500 dark:hover:!text-white dark:hover:!bg-red-600"
                          >
                            إلغاء الموعد
                          </DropdownItem>
                        </Dropdown>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-12 text-gray-500 dark:text-gray-400"
                  >
                    <HiOutlineClipboardList
                      size={48}
                      className="mx-auto mb-3 text-gray-300 dark:text-gray-500"
                    />
                    لا توجد مواعيد لعرضها حاليًا.
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
          {/* <ResponsiveContainer width="100%" height="100%">
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
          </ResponsiveContainer> */}
        </div>
      </div>
    </div>
  );
}
