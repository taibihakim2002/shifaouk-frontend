import {
  Avatar,
  Badge,
  Dropdown,
  DropdownDivider,
  DropdownItem,
  Rating,
  RatingStar,
} from "flowbite-react";
import {
  FaCalendarCheck,
  FaHistory,
  FaUserAlt,
  FaUserCheck,
  FaUserTimes,
  FaWallet,
} from "react-icons/fa";
import { FaCircleCheck, FaUserDoctor } from "react-icons/fa6";
import { GoArrowDown, GoArrowUp } from "react-icons/go";
import {
  HiChartPie,
  HiOutlineCalendar,
  HiOutlineChatAlt2,
  HiOutlineCheckCircle,
  HiOutlineClipboardList,
  HiOutlineClock,
  HiOutlineCurrencyDollar,
  HiOutlineDotsVertical,
  HiOutlineEye,
  HiOutlineInformationCircle,
  HiTrash,
  HiUsers,
} from "react-icons/hi";
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
import {
  Info,
  Video,
  MessageCircle,
  UsersIcon,
  MailQuestion,
  ChevronRight,
  AlertCircle,
  CalendarClock,
  HardHat,
  VideoIcon,
  MessageCircleIcon,
} from "lucide-react";
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
import { Link, useNavigate } from "react-router-dom";
import { MdAccessTimeFilled, MdDone } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import { GiSandsOfTime } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import InfoCard from "../../../components/dashboard/common/InfoCard";
import DashPageHeader from "../../../components/dashboard/common/DashPageHeader";
import useApiRequest from "../../../hooks/useApiRequest";
import globalApi from "../../../utils/globalApi";
import { useEffect, useState } from "react";
import Skeleton from "../../../components/common/Skeleton";
import formatDateTime from "../../../utils/formatDateTime";
import parseImgUrl from "../../../utils/parseImgUrl";
import useAuthStore from "../../../store/authStore";
import useCountdown from "../../../utils/useCountdown";
import { HiMiniInformationCircle } from "react-icons/hi2";
import getAppointmentButtonState from "../../../utils/getAppointmentButtonState";

const chartData = [
  { day: "05 يوليو", patients: 6, consultations: 8 },
  { day: "06 يوليو", patients: 7, consultations: 6 },
  { day: "07 يوليو", patients: 9, consultations: 18 },
  { day: "08 يوليو", patients: 10, consultations: 15 },
  { day: "09 يوليو", patients: 8, consultations: 10 },
  { day: "10 يوليو", patients: 1, consultations: 12 },
  { day: "11 يوليو", patients: 6, consultations: 19 },
  // ... more data
];

const activityLog = [
  {
    icon: FaCalendarCheck,
    title: "حجز استشارة جديدة",
    description: "مع د. صخري معاذ",
    time: "منذ ساعة",
    color: "purple",
  },
  {
    icon: HiOutlineCurrencyDollar,
    title: "شحن رصيد المحفظة",
    description: "تمت إضافة 100 د.ط",
    time: "منذ 3 ساعات",
    color: "blue",
  },
  {
    icon: FaUserAlt,
    title: "تحديث الملف الشخصي",
    description: "تم تغيير رقم الهاتف.",
    time: "أمس",
    color: "green",
  },
];
// Custom Tooltip for Recharts
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-3 bg-white dark:bg-gray-700 shadow-xl rounded-lg border border-gray-200 dark:border-gray-600">
        <p className="label font-semibold text-sm text-gray-800 dark:text-white">
          {label}
        </p>
        {payload.map((entry, index) => (
          <p
            key={`item-${index}`}
            style={{ color: entry.color }}
            className="text-xs"
          >
            {`${entry.name}: ${entry.value}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};
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
// Custom Card for Account Settings Links
const SettingsLinkCard = ({
  to,
  icon: Icon,
  title,
  description,
  color,
  hoverColor,
}) => (
  <Link
    to={to}
    className={`group block p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl border border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out transform hover:-translate-y-1.5`}
  >
    <div className="flex items-start gap-4">
      <div
        className={`w-12 h-12 rounded-lg bg-${color}-100 dark:bg-${color}-500/20 flex items-center justify-center transition-colors duration-300 group-hover:bg-${color}-500 dark:group-hover:bg-${color}-500`}
      >
        <Icon
          size={24}
          className={`text-${color}-600 dark:text-${color}-300 transition-colors duration-300 group-hover:text-white`}
        />
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-1 group-hover:text-primaryColor dark:group-hover:text-primaryColor-300 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
          {description}
        </p>
      </div>
      <ChevronRight className="w-6 h-6 text-gray-300 dark:text-gray-500 transition-transform duration-300 group-hover:translate-x-[-4px] group-hover:text-primaryColor dark:group-hover:text-primaryColor-400 transform scale-x-[-1]" />
    </div>
  </Link>
);

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

const newConsultationRequests = [
  {
    id: "req1",
    patient: { name: "علي بن علي", avatar: "/doctor1.jpg" },
    symptoms: "آلام في المعدة وحموضة مستمرة، تزداد بعد الأكل.",
    timeSince: "منذ ساعة",
  },
  {
    id: "req2",
    patient: { name: "نور الهدى", avatar: "/doctor2.jpg" },
    symptoms: "صداع نصفي متكرر مع غثيان وتشوش في الرؤية.",
    timeSince: "منذ 3 ساعات",
  },
  {
    id: "req3",
    patient: { name: "خالد العمري", avatar: "/doctor3.webp" },
    symptoms: "أعاني من سعال جاف مستمر وضيق في التنفس عند بذل مجهود بسيط.",
    timeSince: "منذ 5 ساعات",
  },
];

const recentChats = [
  {
    id: "chat1",
    patient: { name: "محمد معاوية", avatar: "/doctor1.jpg" },
    lastMessage: "شكرًا لك دكتور، سأتبع التعليمات.",
    time: "10:45 ص",
    unread: 0,
  },
  {
    id: "chat2",
    patient: { name: "سارة خالد", avatar: "/doctor3.webp" },
    lastMessage: "لدي استفسار بخصوص الدواء...",
    time: "09:15 ص",
    unread: 2,
  },
  {
    id: "chat3",
    patient: { name: "أحمد الإبراهيم", avatar: "/doctor4.webp" },
    lastMessage: "أنت: أهلاً بك، كيف يمكنني مساعدتك؟",
    time: "أمس",
    unread: 0,
  },
];
const ActivityItem = ({ item }) => (
  <div className="relative pl-8 rtl:pl-0 rtl:pr-8">
    <div
      className={`absolute top-0 left-1.5 rtl:left-auto rtl:right-1.5 w-5 h-5 rounded-full bg-${item.color}-100 dark:bg-${item.color}-500/20 flex items-center justify-center ring-4 ring-white dark:ring-gray-800`}
    >
      <item.icon
        className={`text-${item.color}-600 dark:text-${item.color}-300`}
        size={10}
      />
    </div>
    <div className="ml-4 rtl:mr-4">
      <h4 className="font-semibold text-gray-700 dark:text-gray-200 text-sm">
        {item.title}
      </h4>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        {item.description}
      </p>
      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
        {item.time}
      </p>
    </div>
  </div>
);
const ConsultationRequestCard = ({ request }) => (
  <Link to={`appointments/${request._id}/request`}>
    <div className="bg-white dark:bg-gray-700/50 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-lg hover:shadow-xl hover:border-primaryColor/50 dark:hover:border-primaryColor-500/50 transition-all duration-300 ease-in-out">
      <div className="flex flex-col sm:flex-row items-start gap-4">
        <Avatar
          img={request.patient.profileImage}
          size="lg"
          rounded
          bordered
          color="light"
        />
        <div className="flex-grow">
          <div className="flex justify-between items-center">
            <h4 className="font-semibold text-gray-800 dark:text-white text-md">
              {request.patient.name}
            </h4>
            <p className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
              <HiOutlineClock />
              {formatDateTime(request.date, "arabic-both")}
            </p>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed line-clamp-2 my-1.5">
            {request.notes}
          </p>
        </div>
        <div className="flex sm:flex-col lg:flex-row gap-2 mt-2 sm:mt-0 self-stretch sm:self-center justify-end w-full sm:w-auto">
          <Button
            theme={flowbit.button}
            color="green"
            size="xs"
            className="flex-grow sm:flex-grow-0 !px-3 !py-2 shadow-md hover:shadow-lg"
          >
            <FaUserCheck className="ml-1.5" size={14} /> قبول
          </Button>
          <Button
            theme={flowbit.button}
            color="red"
            size="xs"
            outline
            className="flex-grow sm:flex-grow-0 !px-3 !py-2"
          >
            <FaUserTimes className="ml-1.5" size={14} /> رفض
          </Button>
        </div>
      </div>
    </div>
  </Link>
);

// عنصر محادثة حديثة
const RecentChatItem = ({ chat }) => (
  <Link
    to={`/dashboard/chat/${chat.id}`}
    className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-gray-700 transition-colors duration-200"
  >
    <div className="relative flex-shrink-0">
      <Avatar img={chat.patient.avatar} rounded bordered color="light" />
      {/* مثال على شارة رسالة غير مقروءة */}
      {chat.unread > 0 && (
        <span className="absolute bottom-0 right-0 block h-4 w-4 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center ring-2 ring-white dark:ring-gray-800">
          {chat.unread}
        </span>
      )}
    </div>
    <div className="flex-grow overflow-hidden">
      <h5 className="text-sm font-semibold text-gray-800 dark:text-white truncate">
        {chat.patient.name}
      </h5>
      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
        {chat.lastMessage}
      </p>
    </div>
    <p className="text-xs text-gray-400 dark:text-gray-500 flex-shrink-0">
      {chat.time}
    </p>
  </Link>
);

export default function DoctorHome() {
  const { user } = useAuthStore();
  const [consultationsRequests, setConsultationsRequests] = useState();
  const {
    data: statesData,
    error: statesError,
    loading: statesLoading,
    request: statesRequest,
  } = useApiRequest();

  const navigate = useNavigate();
  const {
    data: patientsData,
    loading: patientsLoading,
    error: patientsError,
    request: patientsRequest,
  } = useApiRequest();

  const {
    data: consultationsData,
    loading: consultationsLoading,
    error: consultationsError,
    request: consultationsRequest,
  } = useApiRequest();

  const {
    data: nextData,
    error: nextError,
    loading: nextLoading,
    request: nextRequest,
  } = useApiRequest();

  useEffect(() => {
    if (user._id && user.role === "doctor") {
      consultationsRequest(() =>
        globalApi.getAllAppointments({
          doctor: user._id,
          status: "pending",
        })
      );
      nextRequest(() => globalApi.getDoctorNextAppointment());
    }
  }, [user]);

  const { formatted, status } = useCountdown(
    nextData?.data?.date,
    nextData?.data?.duration
  );
  useEffect(() => {
    setConsultationsRequests(consultationsData?.data);
  }, [consultationsData]);

  useEffect(() => {
    statesRequest(() => globalApi.getDoctorHomeStates());
    patientsRequest(() => globalApi.getDoctorPatients(user._id));
  }, []);

  const patientsList = patientsData?.data || [];

  const getPatientStatusBadge = (status) => {
    if (status === "active" || status === "نشط") {
      // مثال
      return { text: "نشط", color: "success", icon: HiOutlineCheckCircle };
    }
    return {
      text: status || "غير محدد",
      color: "gray",
      icon: HiOutlineInformationCircle,
    };
  };

  const { join: showJoinButton, report: showReportButton } =
    getAppointmentButtonState(
      nextData?.data?.date,
      nextData?.data?.duration // تأكد أن هذا الرقم بوحدة "دقائق"
    );

  return (
    <div>
      <DashPageHeader
        Icon={HiChartPie}
        title="لوحة التحكم"
        description="مرحباً بك، أحمد! هذا هو ملخص نشاط منصة شفاؤك."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {statesLoading
          ? [0, 1, 2, 3].map((index) => (
              <Skeleton key={index} className="h-32" />
            ))
          : statesData &&
            [
              {
                title: "عدد المرضى ",
                icon: HiUsers,
                color: "#9747FF",
                value: statesData?.data?.totalPatients,
                percentage: 8,
                percentageText: "مقارنة بالشهر الماضي",
              },
              {
                title: "طلبات بانتظار المراجعة",
                icon: GiSandsOfTime,
                color: "#FFAE00",
                value: statesData?.data?.pendingRequests,
                percentage: 4,
                percentageText: "مقارنة بالشهر الماضي",
              },
              {
                title: "طلبات مقبولة",
                icon: MdDone,
                color: "#25A85C",
                value: statesData?.data?.confirmedConsultationsCount,
                percentage: 4,
                percentageText: "مقارنة بالشهر الماضي",
              },
              {
                title: "المحفظة ",
                icon: FaWallet,
                color: "#65D2E5",
                value: statesData?.data?.walletBalance,
                valueText: "دج",
                percentage: -11,
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10 items-start">
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
                <Link to="/dashboard/appointments">
                  <Button
                    size="xs"
                    color="light"
                    theme={flowbit.button}
                    className="dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
                  >
                    كل المواعيد{" "}
                    <ChevronRight
                      size={16}
                      className="mr-1 transform scale-x-[-1]"
                    />
                  </Button>
                </Link>
              </div>
              <div className="rounded-xl bg-gradient-to-tr from-primaryColor to-blue-500 dark:from-primary-700 dark:to-blue-600 bg-cover bg-center p-5 sm:p-6 relative overflow-hidden shadow-lg">
                <div className="relative z-10">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
                    <div className="flex items-center gap-4">
                      <Avatar
                        img={parseImgUrl(nextData?.data?.patient?.profileImage)}
                        alt={nextData?.data?.patient?.name}
                        size="lg"
                        rounded
                        bordered
                        color="light"
                      />
                      <div>
                        <h3 className="text-lg font-bold text-white mb-1">
                          {nextData?.data?.patient?.name}
                        </h3>
                        {/* <p className="text-blue-100 text-sm">
                          {
                            nextData?.data?.doctor?.doctorProfile
                              ?.specialization
                          }
                        </p> */}
                      </div>
                    </div>
                    {showJoinButton && (
                      <a href={nextData?.data?.meetingLink} target="_blank">
                        <Button
                          theme={flowbit.button}
                          color="light"
                          className="!bg-white/95 hover:!bg-white !text-primaryColor gap-2 shadow-lg w-full sm:w-auto !py-3 !px-5 font-semibold transition-transform hover:scale-105"
                        >
                          <VideoIcon size={18} />
                          <span>انضم إلى الجلسة</span>
                        </Button>
                      </a>
                    )}

                    {showReportButton && (
                      <Button
                        as={Link}
                        to={`/dashboard/appointments/${nextData?.data?._id}/create-report`}
                        theme={flowbit.button}
                        color="primary"
                        className="gap-2 shadow-lg w-full sm:w-auto !py-3 !px-5 font-semibold transition-transform hover:scale-105"
                      >
                        📝 <span>كتابة تقرير الاستشارة</span>
                      </Button>
                    )}
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

                    <p className="font-bold tracking-wider animate-pulse">
                      {status === "ongoing"
                        ? "جارية الآن"
                        : status === "completed"
                        ? "مكتملة"
                        : formatted}
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

        {/* Activity Log Section */}
        <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-2xl shadow-xl p-4 sm:p-6 lg:col-span-1 relative overflow-hidden">
          {/* Existing Content */}
          <div className="flex justify-between items-center mb-5 pb-3 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2">
              <FaHistory
                size={18}
                className="text-primaryColor dark:text-primaryColor-400"
              />
              آخر الأنشطة
            </h3>
            <Link
              to="/dashboard/history"
              className="text-xs text-primaryColor hover:underline font-medium"
            >
              عرض الكل
            </Link>
          </div>
          <div className="relative space-y-6">
            <div className="absolute left-4 rtl:left-auto rtl:right-4 top-2 bottom-2 w-0.5 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
            {activityLog.map((item, index) => (
              <ActivityItem key={index} item={item} />
            ))}
          </div>

          {/* --- Under Development Overlay --- */}
          <div className="absolute inset-0 z-10 bg-white/80 dark:bg-gray-800/90 backdrop-blur-sm flex flex-col items-center justify-center text-center p-4">
            <div className="relative w-28 h-28 mx-auto mb-4">
              <div className="absolute inset-0 bg-amber-500/10 dark:bg-amber-400/10 rounded-full animate-pulse"></div>
              <div className="relative w-full h-full flex items-center justify-center bg-white dark:bg-gray-800 rounded-full shadow-lg border-2 border-amber-500/20 dark:border-amber-400/30">
                <HardHat className="w-14 h-14 text-amber-500 dark:text-amber-400" />
              </div>
            </div>
            <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
              قيد التطوير
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              سجل الأنشطة سيكون متاحًا هنا قريبًا!
            </p>
          </div>
        </div>
      </div>
      <div className="my-10">
        <h2 className="text-lg font-bold text-gray-600 mb-5">أحدث المرضى</h2>
        <div className="bg-white rounded-xl shadow-xl border border-gray-200 dark:bg-gray-800 dark:border-gray-700 overflow-x-auto">
          <Table
            hoverable
            className="min-w-[1100px] text-right dark:divide-gray-700"
          >
            <TableHead className="bg-slate-50 dark:bg-gray-700 text-xs text-gray-600 dark:text-gray-300 uppercase">
              <TableHeadCell className="">المريض</TableHeadCell>
              <TableHeadCell className="">رقم الهاتف</TableHeadCell>
              <TableHeadCell className="">الجنس</TableHeadCell>
              <TableHeadCell className=" text-center">
                عدد الاستشارات
              </TableHeadCell>
              <TableHeadCell className="">تاريخ التسجيل</TableHeadCell>
              <TableHeadCell className="text-center">الحالة</TableHeadCell>
              <TableHeadCell className="text-center sticky right-0 bg-slate-50 dark:bg-gray-700 z-10">
                الإجراءات
              </TableHeadCell>
            </TableHead>
            <TableBody className="divide-y dark:divide-gray-700">
              {patientsLoading ? (
                [...Array(7)].map((_, index) => (
                  <TableRow
                    key={index}
                    className="bg-white animate-pulse dark:bg-gray-800"
                  >
                    <TableCell className="p-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600 flex-shrink-0"></div>
                        <div className="w-full">
                          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-1.5"></div>
                          <div className="h-3 bg-gray-200 dark:bg-gray-500 rounded w-full"></div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="p-3 px-4">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-28"></div>
                    </TableCell>
                    <TableCell className="p-3 px-4 text-center">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-12 mx-auto"></div>
                    </TableCell>
                    <TableCell className="p-3 px-4 text-center">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-12 mx-auto"></div>
                    </TableCell>
                    <TableCell className="p-3 px-4">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                    </TableCell>
                    <TableCell className="p-3 px-4 text-center">
                      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-20 mx-auto"></div>
                    </TableCell>
                    <TableCell className="p-3 px-4 text-center sticky right-0 bg-white dark:bg-gray-800">
                      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-8 mx-auto"></div>
                    </TableCell>
                  </TableRow>
                ))
              ) : patientsError ? (
                <TableRow className="bg-white dark:bg-gray-800">
                  <TableCell
                    colSpan={7}
                    className="text-center py-12 text-red-600 dark:text-red-400"
                  >
                    <AlertCircle size={32} className="inline-block ml-2 mb-1" />
                    حدث خطأ أثناء تحميل البيانات. يرجى المحاولة مرة أخرى.
                  </TableCell>
                </TableRow>
              ) : patientsList.length > 0 ? (
                patientsList.map((patient) => {
                  const statusInfo = getPatientStatusBadge(
                    patient.status || "active"
                  ); // Default to active if status is not present
                  return (
                    <TableRow
                      key={patient._id} // Using unique ID
                      className="bg-white cursor-pointer hover:bg-slate-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700/50 transition-colors duration-150 group"
                      onClick={() =>
                        navigate(`/dashboard/patients/${patient._id}`)
                      }
                    >
                      <TableCell className="whitespace-nowrap ">
                        <div className="flex items-center gap-3">
                          <Avatar
                            img={
                              patient.profileImage
                                ? parseImgUrl(patient.profileImage)
                                : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                    patient.fullName.first
                                  )}+${encodeURIComponent(
                                    patient.fullName.second
                                  )}&background=4F46E5&color=fff&font-size=0.45`
                            }
                            alt={`${patient.fullName.first} ${patient.fullName.second}`}
                            rounded
                            bordered
                            size="md"
                            color="indigo" // A distinct color for patients
                            className="flex-shrink-0"
                          />
                          <div className="overflow-hidden">
                            <span
                              className="text-sm font-semibold text-primaryColor-700 hover:text-primaryColor-800 hover:underline dark:text-primaryColor-400 dark:hover:text-primaryColor-300 cursor-pointer truncate block"
                              onClick={() =>
                                navigate(`/dashboard/patients/${patient._id}`)
                              }
                            >
                              {patient.fullName.first} {patient.fullName.second}
                            </span>
                            <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                              {patient.email}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className=" text-sm text-gray-600 dark:text-gray-300">
                        {patient.phone}
                      </TableCell>
                      <TableCell className="text-sm text-gray-600 dark:text-gray-300 text-center">
                        {patient?.gender}
                      </TableCell>
                      <TableCell className="text-sm text-gray-600 dark:text-gray-300 text-center">
                        {patient.consultationsCount || 0}
                      </TableCell>
                      <TableCell className="text-sm text-gray-500 dark:text-gray-400">
                        {formatDateTime(patient?.createdAt, "arabic")}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge
                          color={statusInfo.color}
                          // icon={statusInfo.icon} // Icon can make it look crowded, optional
                          theme={flowbit.badge}
                          className={`!inline-flex !items-center !px-2.5 !py-1 !text-xs !font-medium`}
                        >
                          {statusInfo.text}
                        </Badge>
                      </TableCell>
                      <TableCell className="p-3 px-4 text-center sticky right-0 bg-white group-hover:bg-slate-50 dark:bg-gray-800 dark:group-hover:bg-gray-700/50 transition-colors duration-150 z-0 group-hover:z-10">
                        <div
                          className="flex justify-center"
                          onClick={(e) => e.stopPropagation()}
                        >
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
                            <DropdownItem
                              icon={HiOutlineEye}
                              onClick={() =>
                                navigate(`/dashboard/patients/${patient._id}`)
                              }
                            >
                              عرض الملف الشخصي
                            </DropdownItem>
                            <DropdownItem
                              icon={HiOutlineClipboardList}
                              onClick={() =>
                                navigate(
                                  `/dashboard/appointments?patientId=${patient._id}`
                                )
                              }
                            >
                              عرض المواعيد
                            </DropdownItem>
                            <DropdownDivider />
                            <DropdownItem
                              icon={HiTrash}
                              className="!text-red-600 hover:!bg-red-100 dark:!text-red-500 dark:hover:!text-white dark:hover:!bg-red-600"
                            >
                              حذف المريض
                            </DropdownItem>
                          </Dropdown>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow className="bg-white dark:bg-gray-800">
                  <TableCell
                    colSpan={7}
                    className="text-center py-16 text-gray-500 dark:text-gray-400"
                  >
                    <UsersIcon
                      size={48}
                      className="mx-auto text-gray-300 dark:text-gray-500 mb-4"
                    />
                    <p className="text-lg font-medium mb-1">
                      لا توجد بيانات مرضى لعرضها
                    </p>
                    <p className="text-sm">
                      حاول تعديل الفلاتر أو إضافة مرضى جدد.
                    </p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10 items-start">
        {/* قسم طلبات الاستشارة الجديدة */}
        <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-2xl shadow-xl p-4 sm:p-6 lg:col-span-2">
          <div className="flex justify-between items-center mb-5 pb-3 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-3">
              <MailQuestion
                size={24}
                className="text-primaryColor dark:text-primaryColor-400"
              />
              طلبات الاستشارة الجديدة
            </h3>
            <Badge
              color="info"
              size="sm"
              theme={flowbit.badge}
              className="!px-3 !py-1"
            >
              {consultationsRequests?.length} طلبات جديدة
            </Badge>
          </div>
          <div className="flex flex-col gap-4 max-h-[450px] overflow-y-auto custom-scrollbar pr-2">
            {consultationsRequests?.length > 0 ? (
              consultationsRequests?.map((request) => (
                <ConsultationRequestCard key={request.id} request={request} />
              ))
            ) : (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                <MailQuestion size={48} className="mx-auto mb-3 opacity-50" />
                <p>لا توجد طلبات جديدة في الوقت الحالي.</p>
              </div>
            )}
          </div>
        </div>

        {/* قسم سجل المحادثات */}
        <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-2xl shadow-xl p-4 sm:p-6 lg:col-span-1">
          <div className="flex justify-between items-center mb-5 pb-3 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-3">
              <HiOutlineChatAlt2
                size={24}
                className="text-primaryColor dark:text-primaryColor-400"
              />
              آخر المحادثات
            </h3>
            <Link
              to="/dashboard/chat"
              className="text-xs text-primaryColor hover:underline font-medium"
            >
              عرض الكل
            </Link>
          </div>
          <div className="flex flex-col gap-2 max-h-[450px] overflow-y-auto custom-scrollbar">
            {recentChats.length > 0 ? (
              recentChats.map((chat) => (
                <RecentChatItem key={chat.id} chat={chat} />
              ))
            ) : (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                <MessageCircle size={48} className="mx-auto mb-3 opacity-50" />
                <p>لا توجد محادثات لعرضها.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10 items-start">
        {/* Doctor Statistics Chart Section */}
        <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-2xl shadow-xl p-4 sm:p-6 lg:col-span-3 xl:col-span-2">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-5 pb-3 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-3">
              <HiChartPie
                size={24}
                className="text-primaryColor dark:text-primaryColor-400"
              />
              إحصائيات الأداء
            </h3>
            <div className="flex items-center gap-4 text-xs mt-2 sm:mt-0">
              <div className="flex items-center gap-1.5">
                <span
                  className="w-3 h-3 rounded-sm"
                  style={{ backgroundColor: "#10B981" }}
                ></span>
                <span className="text-gray-600 dark:text-gray-300">المرضى</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span
                  className="w-3 h-3 rounded-sm"
                  style={{ backgroundColor: "#3B82F6" }}
                ></span>
                <span className="text-gray-600 dark:text-gray-300">
                  الاستشارات
                </span>
              </div>
            </div>
          </div>
          <div className="w-full h-[350px] sm:h-[400px]" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData} // Use chartData to avoid conflict
                margin={{ top: 20, right: 10, left: -20, bottom: 5 }} // Adjusted margins
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  strokeOpacity={0.2}
                  className="dark:stroke-gray-600"
                />
                <XAxis
                  dataKey="day"
                  tick={{ fontSize: 11, fill: "#4B5563" }}
                  className="dark:text-gray-400"
                  axisLine={{ stroke: "transparent" }}
                  tickLine={{ stroke: "transparent" }}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "#4B5563" }}
                  className="dark:text-gray-400"
                  axisLine={{ stroke: "transparent" }}
                  tickLine={{ stroke: "transparent" }}
                />
                <Tooltip
                  cursor={{ fill: "rgba(168, 186, 219, 0.1)" }}
                  content={<CustomTooltip />} // Using the custom styled tooltip
                />
                {/* Legend is now part of the header */}
                {/* <Legend /> */}
                <Bar
                  dataKey="patients"
                  fill="#10B981"
                  name="المرضى"
                  radius={[4, 4, 0, 0]}
                  barSize={12}
                />
                <Bar
                  dataKey="consultations"
                  fill="#3B82F6"
                  name="الاستشارات"
                  radius={[4, 4, 0, 0]}
                  barSize={12}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Account Settings Section */}
        <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-2xl shadow-xl p-4 sm:p-6 lg:col-span-3 xl:col-span-1">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-5 pb-3 border-b border-gray-200 dark:border-gray-700 flex items-center gap-3">
            <HiOutlineInformationCircle
              size={24}
              className="text-primaryColor dark:text-primaryColor-400"
            />
            إعدادات الحساب
          </h3>
          <div className="flex flex-col gap-4">
            <SettingsLinkCard
              to="/dashboard/profile"
              icon={FaUserAlt}
              title="الملف الشخصي"
              description="تعديل معلوماتك الشخصية والمهنية."
              color="primary" // Tailwind color prefix (e.g., bg-blue-100, text-blue-600)
            />
            <SettingsLinkCard
              to="/dashboard/availability" // Example link
              icon={MdAccessTimeFilled}
              title="أوقات العمل"
              description="تحديد وتعديل أوقات توفرك للاستشارات."
              color="emerald" // Tailwind color prefix
            />
            <SettingsLinkCard
              to="/dashboard/security" // Example link
              icon={CiLock}
              title="كلمة السر والأمان"
              description="تغيير كلمة المرور وإدارة أمان حسابك."
              color="rose" // Tailwind color prefix
            />
          </div>
        </div>
      </div>
    </div>
  );
}
