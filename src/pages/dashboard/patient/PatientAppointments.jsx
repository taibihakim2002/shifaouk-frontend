import React, { useState, useEffect } from "react";
import {
  Button,
  Avatar,
  Badge,
  Card,
  Dropdown,
  DropdownItem,
  DropdownDivider,
  Label,
  TextInput,
  Select,
  Table,
  TableHead,
  TableHeadCell,
  TableBody,
  TableRow,
  TableCell, // Using Flowbite's Select
} from "flowbite-react";
import DashPageHeader from "../../../components/dashboard/common/DashPageHeader";
import flowbit from "../../../config/flowbit";
import { Link, useNavigate } from "react-router-dom";
import {
  IoDocumentText,
  IoVideocam,
  IoChatbubbleEllipses,
} from "react-icons/io5";
import {
  MdAccessTimeFilled,
  MdDone,
  MdOutlineCancel,
  MdPendingActions,
} from "react-icons/md";
import {
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlineCheckCircle,
  HiOutlineExclamationCircle,
  HiOutlineDotsVertical,
  HiOutlineEye,
  HiOutlinePencil,
} from "react-icons/hi";
import {
  Video as VideoIcon,
  MessageCircle as MessageCircleIcon,
  AlertCircle,
  CalendarClock,
  ChevronRight,
  ListFilter,
  CalendarPlus,
} from "lucide-react";
import formatDateTime from "../../../utils/formatDateTime"; // Assuming you have this
import parseImgUrl from "../../../utils/parseImgUrl"; // Assuming you have this

// --- Static Data for Demonstration ---
const upcomingAppointment = {
  id: "appt123",
  doctor: {
    name: "د. صخري معاذ",
    specialization: "أخصائي أمراض قلبية",
    avatar: "/doctor1.jpg",
  },
  type: "video",
  date: "2025-07-28T14:30:00Z",
  status: "confirmed",
  notes: "ألم في الصدر مع ضيق في التنفس.",
  duration: 30,
};

const appointmentHistory = [
  {
    id: "hist1",
    doctor: {
      name: "د. فلانة الفلانية",
      specialization: "اخصائية امراض المعدة",
      avatar: "/doctor2.jpg",
    },
    date: "2024-06-15T11:00:00Z",
    status: "completed",
    type: "video",
  },
  {
    id: "hist2",
    doctor: {
      name: "د. علي بن أحمد",
      specialization: "طب عام",
      avatar: "/doctor3.webp",
    },
    date: "2024-05-20T16:00:00Z",
    status: "completed",
    type: "chat",
  },
  {
    id: "hist3",
    doctor: {
      name: "د. صخري معاذ",
      specialization: "أخصائي أمراض قلبية",
      avatar: "/doctor1.jpg",
    },
    date: "2024-04-10T09:30:00Z",
    status: "cancelled",
    type: "video",
  },
];

const statusOptions = [
  { value: "", label: "كل الحالات" },
  { value: "confirmed", label: "مؤكدة/قادمة" },
  { value: "completed", label: "مكتملة" },
  { value: "pending", label: "بانتظار التأكيد" },
  { value: "cancelled", label: "ملغاة" },
];

const dateRangeOptions = [
  { value: "", label: "كل الأوقات" },
  { value: "last_week", label: "آخر 7 أيام" },
  { value: "last_month", label: "آخر 30 يوم" },
  { value: "last_3_months", label: "آخر 3 أشهر" },
];

// --- Helper Components ---
const getStatusDisplay = (status) => {
  switch (status) {
    case "confirmed":
      return { text: "مؤكدة", color: "success", icon: HiOutlineCheckCircle };
    case "pending":
      return {
        text: "بانتظار التأكيد",
        color: "warning",
        icon: HiOutlineClock,
      };
    case "completed":
      return { text: "مكتملة", color: "teal", icon: MdDone };
    case "cancelled":
      return { text: "ملغاة", color: "failure", icon: MdOutlineCancel };
    default:
      return { text: status, color: "gray", icon: HiOutlineInformationCircle };
  }
};

export default function PatientAppointments() {
  const navigate = useNavigate();
  // States for filters
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [specializationFilter, setSpecializationFilter] = useState("");

  // This would be your actual data fetching and filtering logic
  const displayedAppointments = appointmentHistory.filter((appt) => {
    const statusMatch = statusFilter ? appt.status === statusFilter : true;
    // Add date and specialization filtering logic here based on your needs
    return statusMatch;
  });

  return (
    <div className="p-4 md:p-6 lg:p-8 dark:bg-gray-900 min-h-screen" dir="rtl">
      <DashPageHeader
        Icon={HiOutlineCalendar}
        title="مواعيدي واستشاراتي"
        description="قم بإدارة مواعيدك القادمة والسابقة وتتبع استشاراتك بكل سهولة."
      />

      {/* Upcoming Appointment Section */}
      {upcomingAppointment && (
        <div className="my-8">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            موعدك القادم
          </h2>
          <div className="rounded-2xl bg-gradient-to-tr from-primaryColor to-blue-500 dark:from-primary-700 dark:to-blue-600 bg-cover bg-center p-6 sm:p-8 relative overflow-hidden shadow-2xl">
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-5">
                <div className="flex items-center gap-4">
                  <Avatar
                    img={upcomingAppointment.doctor.avatar}
                    alt={upcomingAppointment.doctor.name}
                    size="xl"
                    rounded
                    bordered
                    color="light"
                    className="border-4 flex-shrink-0"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">
                      {upcomingAppointment.doctor.name}
                    </h3>
                    <p className="text-blue-100 text-sm">
                      {upcomingAppointment.doctor.specialization}
                    </p>
                  </div>
                </div>
                <Button
                  theme={flowbit.button}
                  color="light"
                  className="!bg-white/95 hover:!bg-white !text-primaryColor gap-2 shadow-lg w-full sm:w-auto !py-3 !px-6 !text-base !font-semibold"
                >
                  <VideoIcon size={20} />
                  <span>انضم إلى الجلسة الآن</span>
                </Button>
              </div>
              <div className="text-center text-white border-y border-white/20 py-3 my-5 text-md font-medium flex justify-center items-center gap-x-4">
                <div className="flex items-center gap-2">
                  <HiOutlineCalendar size={20} />
                  <span>
                    {formatDateTime(upcomingAppointment.date, "arabicDate")}
                  </span>
                </div>
                <span className="opacity-50">|</span>
                <div className="flex items-center gap-2">
                  <HiOutlineClock size={20} />
                  <span>
                    {formatDateTime(upcomingAppointment.date, "time")}
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center text-white">
                <div className="flex gap-2 items-center text-sm">
                  <HiOutlineClock size={20} className="opacity-80" />
                  <p>الوقت المتبقي على الموعد:</p>
                </div>
                {/* This would be a real countdown timer component */}
                <p className="text-xl font-bold tracking-wider animate-pulse">
                  02:15:15
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filters and History Section */}
      <div className="mt-12 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-5 sm:p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 pb-4 border-b border-gray-200 dark:border-gray-700 gap-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-3">
            <ListFilter
              size={24}
              className="text-primaryColor dark:text-primaryColor-400"
            />
            سجل المواعيد
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full md:w-auto">
            <Select
              id="status-filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              theme={flowbit.select}
              sizing="sm"
            >
              {statusOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </Select>
            <Select
              id="date-filter"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              theme={flowbit.select}
              sizing="sm"
            >
              {dateRangeOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </Select>
            <Select
              id="specialization-filter"
              value={specializationFilter}
              onChange={(e) => setSpecializationFilter(e.target.value)}
              theme={flowbit.select}
              sizing="sm"
            >
              <option value="">كل التخصصات</option>
              {/* {specialization.map((ele) => (
                <option key={ele.value} value={ele.value}>
                  {ele.label}
                </option>
              ))} */}
            </Select>
          </div>
        </div>

        {/* Appointments Table */}
        <div className="overflow-x-auto">
          <Table
            hoverable
            className="min-w-[800px] text-right dark:divide-gray-700"
          >
            <TableHead className="bg-slate-50 dark:bg-gray-700 text-xs text-gray-600 dark:text-gray-300 uppercase">
              <TableHeadCell className="p-3 px-4">الطبيب</TableHeadCell>
              <TableHeadCell className="p-3 px-4">تاريخ الموعد</TableHeadCell>
              <TableHeadCell className="p-3 px-4 text-center">
                نوع الاستشارة
              </TableHeadCell>
              <TableHeadCell className="p-3 px-4 text-center">
                الحالة
              </TableHeadCell>
              <TableHeadCell className="p-3 px-4 text-center sticky right-0 bg-slate-50 dark:bg-gray-700">
                الإجراء
              </TableHeadCell>
            </TableHead>
            <TableBody className="divide-y dark:divide-gray-700">
              {displayedAppointments.length > 0 ? (
                displayedAppointments.map((appointment) => {
                  const statusInfo = getStatusDisplay(appointment.status);
                  return (
                    <TableRow
                      key={appointment.id}
                      className="bg-white dark:bg-gray-800 hover:bg-slate-50 dark:hover:bg-gray-700/50"
                    >
                      <TableCell className="p-3 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <Avatar
                            img={appointment.doctor.avatar}
                            rounded
                            bordered
                            size="md"
                            color="light"
                          />
                          <div>
                            <p className="text-sm font-semibold text-gray-800 dark:text-white">
                              {appointment.doctor.name}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {appointment.doctor.specialization}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="p-3 px-4 text-sm text-gray-600 dark:text-gray-300">
                        {formatDateTime(appointment.date, "datetimeShort")}
                      </TableCell>
                      <TableCell className="p-3 px-4 text-center">
                        <div className="inline-flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-300">
                          {appointment.type === "video" ? (
                            <VideoIcon size={16} className="text-blue-500" />
                          ) : (
                            <MessageCircleIcon
                              size={16}
                              className="text-purple-500"
                            />
                          )}
                          <span>
                            {appointment.type === "video" ? "عن بعد" : "محادثة"}
                          </span>
                        </div>
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
                        <Button
                          as={Link}
                          to={`/dashboard/appointments/${appointment.id}`}
                          theme={flowbit.button}
                          color="light"
                          size="xs"
                          className="!px-3 !py-1.5 dark:!border-gray-600 dark:!text-gray-300 dark:hover:!bg-gray-700"
                        >
                          <HiOutlineEye size={16} className="ml-1.5" /> عرض
                          التفاصيل
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-12 text-gray-500 dark:text-gray-400"
                  >
                    <HiOutlineCalendar
                      size={48}
                      className="mx-auto mb-3 opacity-50"
                    />
                    لا توجد مواعيد تطابق معايير البحث الحالية.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
