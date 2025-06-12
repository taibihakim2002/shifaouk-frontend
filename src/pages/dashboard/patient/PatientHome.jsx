import React, { useEffect } from "react";
import { Button, Avatar, Badge, Card, Tooltip } from "flowbite-react";
import { Link } from "react-router-dom";
import flowbit from "../../../config/flowbit"; // Make sure path is correct
import DashPageHeader from "../../../components/dashboard/common/DashPageHeader";
import {
  FaCalendarCheck,
  FaHeart,
  FaHistory,
  FaVideo,
  FaWallet,
  FaUserAlt,
} from "react-icons/fa";
import {
  HiChartPie,
  HiMiniInformationCircle,
  HiOutlineCalendar,
  HiOutlineCurrencyDollar,
} from "react-icons/hi2";
import { MdAccessTimeFilled, MdOutlineChat } from "react-icons/md";
import {
  Video as VideoIcon,
  MessageCircle as MessageCircleIcon,
  HeartPulse,
  Stethoscope,
  Search as SearchIcon,
  ChevronRight,
  Lightbulb,
  AlertCircle,
  CalendarClock,
  HardHat,
} from "lucide-react"; // Modern icons
import formatDateTime from "../../../utils/formatDateTime";
import AppAvatar from "../../../components/common/AppAvatar";
import useApiRequest from "../../../hooks/useApiRequest";
import globalApi from "../../../utils/globalApi";
import Skeleton from "../../../components/common/Skeleton";
import parseImgUrl from "../../../utils/parseImgUrl";
import { IoVideocam } from "react-icons/io5";
import useCountdown from "../../../utils/useCountdown";
import getAppointmentButtonState from "../../../utils/getAppointmentButtonState";

// --- Static Data for Demonstration ---
const user = { name: "أحمد" };
// --- Helper Component: Skeleton Loader ---
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

const favoriteDoctors = [
  { id: "doc1", name: "د. علي بن أحمد", avatar: "/doctor1.jpg" },
  { id: "doc2", name: "د. سارة خالد", avatar: "/doctor2.jpg" },
  { id: "doc3", name: "د. يوسف عمر", avatar: "/doctor3.webp" },
  { id: "doc4", name: "د. ليلى حسن", avatar: "/doctor4.webp" },
];

const healthTip = {
  title: "اشرب كمية كافية من الماء",
  description:
    "يساعد الماء في الحفاظ على توازن سوائل الجسم، وتنظيم درجة حرارته، ونقل العناصر الغذائية. حاول شرب 8 أكواب يوميًا.",
};

// --- Helper Components for Styling ---

const StatCard = ({ icon: Icon, title, value, valueText, color }) => (
  <div className="group block bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-5 border border-gray-200 dark:border-gray-700 hover:shadow-2xl hover:border-primaryColor/50 dark:hover:border-primaryColor-500/50 transition-all duration-300 transform hover:-translate-y-1.5">
    <div className="flex items-center justify-between">
      <h3 className="font-semibold text-md text-gray-600 dark:text-gray-300">
        {title}
      </h3>
      <div
        className={`w-12 h-12 rounded-lg flex items-center justify-center bg-${color}-100 dark:bg-${color}-500/20 transition-colors duration-300 group-hover:bg-${color}-200 dark:group-hover:bg-${color}-500/30`}
      >
        <Icon
          size={24}
          className={`text-${color}-600 dark:text-${color}-300`}
        />
      </div>
    </div>
    <div className="mt-2">
      <p className="text-4xl font-extrabold text-gray-600 dark:text-white">
        {value}
        {valueText && (
          <span className="text-xl font-medium ml-1">{valueText}</span>
        )}
      </p>
    </div>
  </div>
);

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

const QuickActionCard = ({ action }) => (
  <Link
    to={action.link}
    className="block p-6 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800/50 dark:to-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-center group"
  >
    <div
      className={`w-16 h-16 mx-auto rounded-2xl bg-${action.color}-100 dark:bg-${action.color}-500/10 flex items-center justify-center shadow-md mb-4 transition-transform group-hover:scale-110 group-hover:rotate-[-6deg]`}
    >
      <action.icon
        size={32}
        className={`text-${action.color}-500 dark:text-${action.color}-400`}
      />
    </div>
    <h3 className="text-lg font-bold text-gray-800 dark:text-white group-hover:text-primaryColor dark:group-hover:text-primaryColor-300 transition-colors">
      {action.title}
    </h3>
  </Link>
);

export default function PatientHome() {
  const {
    data: statesData,
    error: statesError,
    loading: statesLoading,
    request: statesRequest,
  } = useApiRequest();

  const {
    data: nextData,
    error: nextError,
    loading: nextLoading,
    request: nextRequest,
  } = useApiRequest();

  useEffect(() => {
    statesRequest(() => globalApi.getPatientHomeStates());
    nextRequest(() => globalApi.getPatientNextAppointment());
  }, []);

  const { formatted, status } = useCountdown(
    nextData?.data?.date,
    nextData?.data?.duration
  );

  const { join: showJoinButton, report: showReportButton } =
    getAppointmentButtonState(
      nextData?.data?.date,
      nextData?.data?.duration // تأكد أن هذا الرقم بوحدة "دقائق"
    );

  return (
    <div className="p-4 md:p-6 lg:p-8 dark:bg-gray-900 min-h-screen">
      <DashPageHeader
        Icon={HiChartPie}
        title={`أهلاً بعودتك، ${user.name}!`}
        description="هذا هو ملخص نشاطك وآخر مستجدات حسابك في منصة شفاؤك."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 my-8">
        {statesLoading
          ? [0, 1, 2].map((index) => <Skeleton key={index} className="h-32" />)
          : statesData &&
            [
              {
                title: "الاستشارات المكتملة",
                icon: FaCalendarCheck,
                value: statesData?.data?.completedConsultations,
                color: "green",
              },
              {
                title: "رصيد المحفظة",
                icon: FaWallet,
                value: statesData?.data?.walletBalance,
                valueText: "دج",
                color: "blue",
              },
              {
                title: "الأطباء المفضلين",
                icon: FaHeart,
                value: statesData?.data?.totalfavoriteDoctors,
                color: "pink",
              },
            ].map((card, index) => (
              <StatCard
                key={index}
                title={card.title}
                icon={card.icon}
                color={card.color}
                value={card.value}
                valueText={card?.valueText}
                percentage={card?.percentage}
                percentageText={card?.percentageText}
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
                          {
                            nextData?.data?.doctor?.doctorProfile
                              ?.specialization
                          }
                        </p>
                      </div>
                    </div>
                    {showJoinButton && (
                      <Button
                        theme={flowbit.button}
                        color="light"
                        className="!bg-white/95 hover:!bg-white !text-primaryColor gap-2 shadow-lg w-full sm:w-auto !py-3 !px-5 font-semibold transition-transform hover:scale-105"
                      >
                        <VideoIcon size={18} />
                        <span>انضم إلى الجلسة</span>
                      </Button>
                    )}

                    {showReportButton && (
                      <Button
                        as={Link}
                        to={`/dashboard/appointments/${nextData?.data?.id}/report`}
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

      {/* New Sections: Favorite Doctors & Health Tip */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10 items-start">
        {/* Favorite Doctors */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-2xl shadow-xl p-5 sm:p-6 relative overflow-hidden">
          {" "}
          {/* Added relative and overflow-hidden */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-3">
              <FaHeart size={20} className="text-pink-500" />
              أطباؤك المفضلون
            </h3>
            <Link
              to="/dashboard/favorites"
              className="text-xs text-primaryColor hover:underline font-medium"
            >
              إدارة
            </Link>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
            {favoriteDoctors.map((doctor) => (
              <Link
                to={`/doctors/${doctor.id}`}
                key={doctor.id}
                className="flex flex-col items-center gap-2 flex-shrink-0 w-24 text-center group"
              >
                <Avatar
                  img={doctor.avatar}
                  alt={doctor.name}
                  size="lg"
                  rounded
                  bordered
                  color="light"
                  className="transition-all duration-300 group-hover:ring-primaryColor dark:group-hover:ring-primaryColor-400"
                />
                <p className="text-xs font-medium text-gray-600 dark:text-gray-300 group-hover:text-primaryColor dark:group-hover:text-primaryColor-300 transition-colors truncate w-full">
                  {doctor.name}
                </p>
              </Link>
            ))}
            <Link
              to="/doctors"
              className="flex flex-col items-center justify-center gap-2 flex-shrink-0 w-24 text-center group"
            >
              <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-gray-700 flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 transition-all duration-300 group-hover:border-primaryColor group-hover:text-primaryColor">
                <SearchIcon
                  size={24}
                  className="text-gray-400 dark:text-gray-500 transition-colors group-hover:text-primaryColor"
                />
              </div>
              <p className="text-xs font-medium text-gray-600 dark:text-gray-300 group-hover:text-primaryColor dark:group-hover:text-primaryColor-300 transition-colors">
                ابحث عن طبيب
              </p>
            </Link>
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
              الميزة قيد التطوير
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              نحن نعمل على هذه الميزة حاليًا وستكون متاحة قريبًا!
            </p>
          </div>
        </div>
        {/* Health Tip */}
        <div className="lg:col-span-1 bg-gradient-to-br from-green-400 to-teal-500 text-white rounded-2xl shadow-xl p-6 flex flex-col items-start h-full">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb size={24} />
            <h3 className="text-lg font-bold">نصيحة اليوم الصحية</h3>
          </div>
          <p className="text-sm font-medium leading-relaxed mb-4 flex-grow">
            {healthTip.description}
          </p>
          <a
            href="/blog"
            className="text-xs font-semibold bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-full transition-colors"
          >
            اقرأ المزيد من النصائح
          </a>
        </div>
      </div>

      {/* Quick Actions Section */}
      <div className="mt-2">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
          إجراءات سريعة
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {[
            {
              title: "حجز استشارة",
              link: "/doctors",
              icon: SearchIcon,
              color: "primary",
            },
            {
              title: "شحن المحفظة",
              link: "/dashboard/wallet",
              icon: FaWallet,
              color: "cyan",
            },
            {
              title: "محادثة طبيب",
              link: "/dashboard/chat",
              icon: MessageCircleIcon,
              color: "purple",
            },
            {
              title: "سجلاتي الطبية",
              link: "/dashboard/records",
              icon: HeartPulse,
              color: "pink",
            },
          ].map((action) => (
            <QuickActionCard key={action.title} action={action} />
          ))}
        </div>
      </div>
    </div>
  );
}
