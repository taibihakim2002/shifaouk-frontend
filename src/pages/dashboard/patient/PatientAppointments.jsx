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
  HiOutlineInformationCircle,
  HiDotsVertical,
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
import useApiRequest from "../../../hooks/useApiRequest";
import globalApi from "../../../utils/globalApi";
import useCountdown from "../../../utils/useCountdown";
import { HiMiniInformationCircle } from "react-icons/hi2";
import specializations from "../../../data/specializations";
import AppointmentDetailsModal from "../../../components/dashboard/common/AppointmentDetailsModal";
import { FaHistory } from "react-icons/fa";

// --- Static Data for Demonstration ---

const UpcomingAppointmentSkeleton = () => (
  <div className="lg:col-span-2 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-2xl shadow-xl p-5 sm:p-6 animate-pulse">
    {/* Title Skeleton */}
    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-md w-1/3 mb-5"></div>

    {/* Main Card Skeleton */}
    <div className="rounded-xl bg-gray-200 dark:bg-gray-700/50 p-5 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-gray-300 dark:bg-gray-600 rounded-full flex-shrink-0"></div>
          <div className="space-y-2">
            <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-32"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-24"></div>
          </div>
        </div>
        <div className="h-11 bg-gray-300 dark:bg-gray-600 rounded-lg w-full sm:w-32"></div>
      </div>
      <div className="h-px bg-gray-300 dark:bg-gray-600 my-4"></div>
      <div className="flex justify-between items-center">
        <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-1/4"></div>
        <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/3"></div>
      </div>
    </div>

    {/* Details Skeleton */}
    <div className="mt-5 space-y-3">
      <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-2"></div>
      <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
      <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
    </div>
  </div>
);

// const statusOptions = [
//   { value: "", label: "كل الحالات" },
//   { value: "confirmed", label: "مؤكدة/قادمة" },
//   { value: "completed", label: "مكتملة" },
//   { value: "pending", label: "بانتظار التأكيد" },
//   { value: "cancelled", label: "ملغاة" },
// ];

// const dateRangeOptions = [
//   { value: "", label: "كل الأوقات" },
//   { value: "last_week", label: "آخر 7 أيام" },
//   { value: "last_month", label: "آخر 30 يوم" },
//   { value: "last_3_months", label: "آخر 3 أشهر" },
// ];

// const specializationsForFilter = [
//   { value: "", label: "كل التخصصات" },
//   ...(specializations || []), // تأكد أن specializations مصفوفة
// ];

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
  // const [statusFilter, setStatusFilter] = useState("");
  // const [dateFilter, setDateFilter] = useState("");
  // const [specializationFilter, setSpecializationFilter] = useState("");

  const {
    data: nextData,
    error: nextError,
    loading: nextLoading,
    request: nextRequest,
  } = useApiRequest();
  const {
    data: AppointmentsData,
    error: AppointmentsError,
    loading: AppointmentsLoading,
    request: AppointmentsRequest,
  } = useApiRequest();
  useEffect(() => {
    nextRequest(() => globalApi.getPatientNextAppointment());
    AppointmentsRequest(() => globalApi.getMyAppointments());
  }, []);

  // useEffect(() => {
  //   const fetchAppointments = () => {
  //     const params = new URLSearchParams();
  //     if (specializationFilter)
  //       params.append("specialization", specializationFilter);
  //     if (dateFilter) params.append("dateFilter", dateFilter);
  //     if (statusFilter) params.append("status", statusFilter);

  //     const queryString = params.toString();
  //     AppointmentsRequest(() => globalApi.getMyAppointments(queryString));
  //   };

  //   // لتجنب الاستدعاء المباشر عند التحميل إذا كان useEffect الأول يقوم بذلك بالفعل،
  //   // يمكن إضافة شرط هنا. ولكن سأتركه كما هو بناءً على طلبك.
  //   fetchAppointments();
  // }, [statusFilter, dateFilter, specializationFilter]);

  const { formatted } = useCountdown(nextData?.data?.date);

  const [openModal, setOpenModal] = useState(false);
  const [selectedAppointmentForModal, setSelectedAppointmentForModal] =
    useState(null); // تم تعديل الاسم ليكون أوضح
  const handleViewDetails = (appointment) => {
    setSelectedAppointmentForModal(appointment);
    setOpenModal(true);
  };
  return (
    <div className="p-4 md:p-6 lg:p-8 dark:bg-gray-900 min-h-screen" dir="rtl">
      {selectedAppointmentForModal && (
        <AppointmentDetailsModal
          role="patient"
          open={openModal}
          onClose={() => {
            setOpenModal(false);
            setSelectedAppointmentForModal(null);
          }}
          appointment={selectedAppointmentForModal}
        />
      )}
      <DashPageHeader
        Icon={HiOutlineCalendar}
        title="مواعيدي واستشاراتي"
        description="قم بإدارة مواعيدك القادمة والسابقة وتتبع استشاراتك بكل سهولة."
      />

      {/* Upcoming Appointment Section */}
      <div className="lg:col-span-2">
        {nextLoading ? (
          <UpcomingAppointmentSkeleton />
        ) : nextError ? (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700/50 rounded-2xl shadow-lg p-6 text-center h-full flex flex-col justify-center items-center">
            <AlertCircle size={40} className="text-red-500 mb-3" />
            <h3 className="font-semibold text-red-700 dark:text-red-300">
              خطأ في تحميل الموعد
            </h3>
            <p className="text-sm text-red-600 dark:text-red-400 mt-1">
              لم نتمكن من جلب بيانات موعدك القادم. يرجى المحاولة مرة أخرى.
            </p>
          </div>
        ) : nextData?.data ? (
          <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-2xl shadow-xl p-5 sm:p-6">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                استشارتك القادمة
              </h2>
            </div>
            <div className="rounded-xl bg-gradient-to-tr from-primaryColor to-blue-500 dark:from-primary-700 dark:to-blue-600 bg-cover bg-center p-5 sm:p-6 relative overflow-hidden shadow-lg">
              <div className="relative z-10">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
                  <div className="flex items-center gap-4">
                    <Avatar
                      img={parseImgUrl(nextData?.data?.doctor?.profileImage)}
                      alt={nextData?.doctor?.name}
                      size="lg"
                      rounded
                      bordered
                      color="light"
                    />
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">
                        {nextData?.data?.doctor?.name}
                      </h3>
                      <p className="text-blue-100 text-sm">
                        {nextData?.data?.doctor?.doctorProfile?.specialization}
                      </p>
                    </div>
                  </div>
                  <Button
                    theme={flowbit.button}
                    color="light"
                    className="!bg-white/95 hover:!bg-white !text-primaryColor gap-2 shadow-lg w-full sm:w-auto !py-3 !px-5 font-semibold transition-transform hover:scale-105"
                  >
                    <VideoIcon size={18} />
                    <span>انضم إلى الجلسة</span>
                  </Button>
                </div>
                <div className="text-center text-white border-y border-white/20 py-2 my-4 text-sm font-medium flex justify-center items-center flex-wrap gap-x-3">
                  <div className="flex items-center gap-1.5">
                    {nextData.type === "video" ? (
                      <IoVideocam />
                    ) : (
                      <MessageCircleIcon size={16} />
                    )}
                    <span>
                      {nextData?.data?.type === "online"
                        ? "مكالمة فيديو"
                        : "محادثة نصية"}
                    </span>
                  </div>
                  <span className="hidden sm:inline opacity-50">|</span>
                  <div className="flex items-center gap-1.5">
                    <HiOutlineCalendar size={16} />
                    <span>
                      {formatDateTime(nextData?.data?.date, "arabic-both")}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center text-white">
                  <div className="flex gap-2 items-center text-sm">
                    <MdAccessTimeFilled size={18} className="opacity-80" />
                    <p>الوقت المتبقي:</p>
                  </div>
                  {/* This would be a real countdown component */}
                  <p className="text-lg font-bold tracking-wider animate-pulse">
                    {formatted}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5 space-y-3">
              <h3 className="text-md font-semibold text-gray-700 dark:text-gray-200">
                تفاصيل الاستشارة
              </h3>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 dark:bg-gray-700/50">
                <HiMiniInformationCircle
                  size={22}
                  className="text-primaryColor-500 flex-shrink-0 mt-0.5"
                />
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  {nextData?.data?.notes}
                </p>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 dark:bg-gray-700/50">
                <MdAccessTimeFilled
                  size={22}
                  className="text-green-500 flex-shrink-0 mt-0.5"
                />
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  مدة الجلسة {nextData?.data?.duration}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-2xl shadow-xl p-6 text-center h-full flex flex-col justify-center items-center">
            <CalendarClock
              size={48}
              className="text-gray-300 dark:text-gray-500 mb-4"
            />
            <h3 className="font-semibold text-gray-700 dark:text-gray-200">
              لا توجد مواعيد قادمة
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 mb-4">
              جميع مواعيدك مكتملة. هل ترغب في حجز موعد جديد؟
            </p>
            <Button
              as={Link}
              to="/doctors"
              theme={flowbit.button}
              color="primary"
              size="sm"
              outline
            >
              حجز استشارة جديدة
            </Button>
          </div>
        )}
      </div>

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
          {/* <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full md:w-auto">
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
              {specializations.map((ele) => (
                <option key={ele.value} value={ele.value}>
                  {ele.label}
                </option>
              ))}
            </Select>
          </div> */}
        </div>

        {/* Appointments Table */}
        <div className="relative overflow-x-auto overflow-y-visible">
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
                المدة
              </TableHeadCell>
              <TableHeadCell className="p-3 px-4 text-center">
                السعر (دج)
              </TableHeadCell>
              <TableHeadCell className="p-3 px-4 text-center">
                الحالة
              </TableHeadCell>
              <TableHeadCell className="p-3 px-4 text-center sticky right-0 bg-slate-50 dark:bg-gray-700">
                الإجراء
              </TableHeadCell>
            </TableHead>
            <TableBody className="divide-y dark:divide-gray-600">
              {AppointmentsLoading ? (
                // Skeleton Loading State
                [...Array(5)].map((_, index) => (
                  <TableRow key={index} className="animate-pulse">
                    <TableCell className="p-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                        <div className="space-y-1.5 w-32">
                          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="p-3 px-4">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
                    </TableCell>
                    <TableCell className="p-3 px-4 text-center">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16 mx-auto"></div>
                    </TableCell>
                    <TableCell className="p-3 px-4 text-center">
                      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-24 mx-auto"></div>
                    </TableCell>
                    <TableCell className="p-3 px-4 text-center sticky right-0 bg-white dark:bg-gray-800">
                      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-lg w-24 mx-auto"></div>
                    </TableCell>
                  </TableRow>
                ))
              ) : AppointmentsError ? (
                // Error State
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-10 text-red-500 dark:text-red-400"
                  >
                    <AlertCircle size={32} className="inline-block ml-2 mb-1" />
                    حدث خطأ أثناء تحميل سجل المواعيد.
                  </TableCell>
                </TableRow>
              ) : AppointmentsData?.data?.length > 0 ? (
                // Data Rows
                AppointmentsData?.data?.map((appointment) => {
                  const statusInfo = getStatusDisplay(appointment.status);
                  return (
                    <TableRow
                      key={appointment.id}
                      className="bg-white cursor-pointer  dark:bg-gray-800 hover:bg-slate-50 dark:hover:bg-gray-700/50"
                      onClick={() => handleViewDetails(appointment)}
                    >
                      <TableCell className="p-3 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <Avatar
                            img={appointment?.doctor?.profileImage}
                            rounded
                            bordered
                            size="md"
                            color="light"
                          />
                          <div>
                            <p className="text-sm font-semibold text-gray-800 dark:text-white">
                              {appointment?.doctor?.name}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {
                                appointment?.doctor?.doctorProfile
                                  ?.specialization
                              }
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="p-3 px-4 text-sm text-gray-600 dark:text-gray-300">
                        {formatDateTime(appointment?.date, "both")}
                      </TableCell>
                      <TableCell className="p-3 px-4 text-center">
                        <div className="inline-flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-300">
                          {appointment?.type === "online" ? (
                            <VideoIcon size={16} className="text-blue-500" />
                          ) : (
                            <MessageCircleIcon
                              size={16}
                              className="text-purple-500"
                            />
                          )}
                          <span>
                            {appointment.type === "online"
                              ? "عن بعد"
                              : "محادثة"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="p-3 px-4 text-sm text-gray-500 dark:text-gray-400 text-center">
                        {appointment?.duration} دقيقة
                      </TableCell>
                      <TableCell className="p-3 px-4 text-sm text-gray-500 dark:text-gray-400 text-center">
                        {appointment?.price} دج
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
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <Dropdown
                          label=""
                          dismissOnClick={false}
                          renderTrigger={() => (
                            <button className="p-2 hover:bg-gray-100 rounded-full">
                              <HiDotsVertical className="w-5 h-5 text-gray-600" />
                            </button>
                          )}
                          placement="bottom-start"
                        >
                          <DropdownItem onClick={() => console.log("تعديل")}>
                            تعديل
                          </DropdownItem>
                          <DropdownItem
                            onClick={() => console.log("حذف")}
                            className="text-red-600"
                          >
                            حذف
                          </DropdownItem>
                        </Dropdown>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                // Empty State
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-12 text-gray-500 dark:text-gray-400"
                  >
                    <FaHistory
                      size={40}
                      className="mx-auto mb-3 text-gray-300 dark:text-gray-500"
                    />
                    <p className="font-medium">لا يوجد سجل استشارات لعرضه.</p>
                    <p className="text-sm">
                      لم تقم بأي استشارات سابقة حتى الآن.
                    </p>
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
