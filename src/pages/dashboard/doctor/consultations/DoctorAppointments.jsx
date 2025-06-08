import React, { useEffect, useState } from "react";
import {
  IoChatbubbleEllipses,
  IoDocumentText,
  IoVideocam,
} from "react-icons/io5";
import DashPageHeader from "../../../../components/dashboard/common/DashPageHeader";
import { BsFillCalendarDateFill } from "react-icons/bs";
import {
  Button,
  Label,
  Select,
  TextInput,
  Tooltip,
  Textarea,
  Avatar,
  Badge,
} from "flowbite-react";

import {
  ChevronRight,
  Filter,
  Link,
  Search,
  SlidersHorizontal,
  VideoIcon,
} from "lucide-react";
import {
  MdAccessTimeFilled,
  MdCalendarToday,
  MdOutlineCancel,
  MdPendingActions,
} from "react-icons/md";
import {
  FaFilter,
  FaPlus,
  FaRegUserCircle,
  FaSave,
  FaTrashAlt,
  FaRegClock,
  FaRegStickyNote,
  FaInfoCircle,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { IoIosVideocam } from "react-icons/io";
import {
  HiCurrencyDollar,
  HiOutlineCalendar,
  HiOutlineCheckCircle,
  HiOutlineEye,
} from "react-icons/hi";
import flowbit from "../../../../config/flowbit";
import useAuthStore from "../../../../store/authStore";
import useToastStore from "../../../../store/toastStore";
import useApiRequest from "../../../../hooks/useApiRequest";
import globalApi from "../../../../utils/globalApi";

const upcomingAppointments = [
  {
    id: "appt1",
    patient: {
      name: "بن علي علي",
      avatar: "/doctor1.jpg",
    },
    type: "video", // 'video' or 'chat' or 'in-person'
    date: "2025-07-15T17:00:00Z", // Use ISO format for dates
    status: "confirmed",
  },
  {
    id: "appt2",
    patient: {
      name: "فاطمة الزهراء",
      avatar: "/doctor2.jpg",
    },
    type: "chat",
    date: "2025-07-15T18:30:00Z",
    status: "confirmed",
  },
  {
    id: "appt3",
    patient: {
      name: "يوسف بن عمر",
      avatar: "/doctor3.webp",
    },
    type: "video",
    date: "2025-07-16T09:00:00Z",
    status: "pending",
  },
  {
    id: "appt4",
    patient: {
      name: "خالد نزار",
      avatar: "/doctor4.webp",
    },
    type: "video",
    date: "2025-07-16T10:00:00Z",
    status: "confirmed",
  },
];

const getStatusDisplay = (status) => {
  switch (status) {
    case "confirmed":
      return { text: "مؤكدة", color: "success", icon: HiOutlineCheckCircle };
    case "pending":
      return {
        text: "بانتظار المراجعة",
        color: "warning",
        icon: MdPendingActions,
      };
    case "cancelled":
      return { text: "ملغاة", color: "failure", icon: MdOutlineCancel };
    default:
      return { text: status, color: "gray", icon: HiOutlineEye };
  }
};

const AppointmentCard = ({ appointment }) => {
  const statusInfo = getStatusDisplay(appointment.status);
  const isUpcoming = new Date(appointment.date) >= new Date();

  return (
    <div className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-lg hover:shadow-xl hover:border-primaryColor/50 dark:hover:border-primaryColor-500/50 transition-all duration-300 ease-in-out group transform hover:-translate-y-1">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <Avatar
          img={
            appointment.patient.avatar ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              appointment.patient.name
            )}&background=random`
          }
          size="lg"
          rounded
          bordered
          color="light"
          className="flex-shrink-0"
        />
        <div className="flex-grow">
          <div className="flex justify-between items-center">
            <h4 className="font-semibold text-gray-800 dark:text-white text-md group-hover:text-primaryColor dark:group-hover:text-primaryColor-300 transition-colors">
              {appointment.patient.name}
            </h4>
            <Badge
              color={statusInfo.color}
              icon={statusInfo.icon}
              theme={flowbit.badge}
              className="!text-xs !font-medium !px-2 !py-0.5"
            >
              {statusInfo.text}
            </Badge>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500 dark:text-gray-400 mt-2">
            <div className="flex items-center gap-1.5">
              <HiOutlineCalendar className="w-4 h-4 text-gray-400" />
              <span>
                {new Date(appointment.date).toLocaleDateString(
                  "ar-EG-u-nu-latn",
                  { day: "numeric", month: "long" }
                )}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <MdAccessTimeFilled className="w-4 h-4 text-gray-400" />
              <span>
                {new Date(appointment.date).toLocaleTimeString(
                  "ar-EG-u-nu-latn",
                  { hour: "2-digit", minute: "2-digit", hour12: true }
                )}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              {appointment.type === "video" ? (
                <IoVideocam className="w-4 h-4 text-gray-400" />
              ) : (
                <IoChatbubbleEllipses className="w-4 h-4 text-gray-400" />
              )}
              <span>
                استشارة{" "}
                {appointment.type === "video" ? "عن بعد" : "عبر المحادثة"}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-2 items-center justify-end mt-4 pt-4 border-t border-gray-100 dark:border-gray-700/50">
        <Button
          theme={flowbit.button}
          color="light"
          size="xs"
          className="!px-3 !py-1.5 dark:!border-gray-600 dark:!text-gray-300 dark:hover:!bg-gray-700"
        >
          <FaInfoCircle className="ml-1.5" size={14} />
          التفاصيل
        </Button>
        {isUpcoming && appointment.status === "confirmed" && (
          <Button
            theme={flowbit.button}
            color="primary"
            size="xs"
            className="!px-3 !py-1.5"
          >
            <VideoIcon className="ml-1.5" size={14} />
            بدء الجلسة
          </Button>
        )}
        {isUpcoming && appointment.status === "pending" && (
          <div className="flex gap-2">
            <Button
              theme={flowbit.button}
              color="green"
              size="xs"
              className="!px-3 !py-1.5"
            >
              <FaCheckCircle className="ml-1.5" size={14} /> قبول
            </Button>
            <Button
              theme={flowbit.button}
              color="red"
              outline
              size="xs"
              className="!px-3 !py-1.5"
            >
              <FaTimesCircle className="ml-1.5" size={14} /> رفض
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

const daysOfWeek = [
  { key: "sun", label: "الأحد" },
  { key: "mon", label: "الإثنين" },
  { key: "tue", label: "الثلاثاء" },
  { key: "wed", label: "الأربعاء" },
  { key: "thu", label: "الخميس" },
  { key: "fri", label: "الجمعة" },
  { key: "sat", label: "السبت" },
];

const durationOptions = [
  { value: 15, label: "15 دقيقة" },
  { value: 30, label: "30 دقيقة" },
  { value: 45, label: "45 دقيقة" },
  { value: 60, label: "ساعة واحدة (60 دقيقة)" },
  { value: 75, label: "ساعة وربع (75 دقيقة)" },
  { value: 90, label: "ساعة ونصف (90 دقيقة)" },
];

export default function DoctorAppointments() {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const { showToast } = useToastStore();
  const [availability, setAvailability] = useState([]);
  const [slotDuration, setSlotDuration] = useState(30);
  const [bookingNotes, setBookingNotes] = useState("");
  const [consultationPrice, setConsultationPrice] = useState();
  const { loading: setAvaLoading, request: setAvaRequest } = useApiRequest();

  useEffect(() => {
    if (user?.doctorProfile) {
      if (user.doctorProfile.availability) {
        setAvailability(user.doctorProfile.availability);
      }
      if (user.doctorProfile.slotDurationInMinutes) {
        setSlotDuration(user.doctorProfile.slotDurationInMinutes);
      }
      if (user.doctorProfile.bookingInstructions) {
        setBookingNotes(user.doctorProfile.bookingInstructions);
      }
      if (user.doctorProfile.consultationPrice) {
        setConsultationPrice(user.doctorProfile.consultationPrice);
      }
    }
  }, [user]);

  const handleAdd = () => {
    setAvailability([...availability, { day: "", from: "", to: "" }]);
  };

  const handleChange = (index, field, value) => {
    const updated = [...availability];
    updated[index][field] = value;
    setAvailability(updated);
  };

  const handleDelete = (index) => {
    const updated = [...availability];
    updated.splice(index, 1);
    setAvailability(updated);
  };

  const handleSubmit = async () => {
    const dataToSubmit = {
      availability: availability,
      slotDurationInMinutes: Number(slotDuration),
      bookingInstructions: bookingNotes,
      consultationPrice: Number(consultationPrice),
    };

    const {
      success,
      data,
      error: requestError,
    } = await setAvaRequest(() =>
      globalApi.setDoctorAvailability(user._id, dataToSubmit)
    );

    if (success) {
      showToast("success", "تم حفظ الإعدادات والأوقات بنجاح");
      if (data && data.data) {
        setUser(data.data);
      } else if (data) {
        setUser(data);
      }
    } else {
      showToast("error", requestError);
    }
  };

  return (
    <div>
      <DashPageHeader
        Icon={IoDocumentText}
        title="إدارة التوفر والمواعيد"
        description="قم بتحديد أوقات العمل، مدة الجلسات، وإضافة ملاحظات للحجوزات."
      />

      <div className="mb-8 p-5 sm:p-6 bg-white rounded-xl shadow-xl border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        {/* عنوان القسم */}
        <div className="flex items-center justify-between mb-5 pb-3 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2">
            <SlidersHorizontal
              size={20}
              className="text-primaryColor dark:text-primaryColor-400"
            />
            تصفية المواعيد
          </h3>
        </div>

        {/* شبكة الفلاتر */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-5 items-end">
          {/* --- فلتر التاريخ --- */}
          <div>
            <Label
              htmlFor="day-filter"
              className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              <span className="inline-flex items-center">
                <MdCalendarToday className="ml-1.5" />
                اليوم
              </span>
            </Label>
            <select
              id="day-filter"
              className="w-full p-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryColor-300 focus:border-primaryColor-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-primaryColor-500 dark:focus:border-primaryColor-500 shadow-sm transition-colors duration-200"
              defaultValue=""
            >
              <option value="">اختر اليوم</option>
              <option>اليوم</option>
              <option>أمس</option>
              <option>هذا الأسبوع</option>
              <option>هذا الشهر</option>
            </select>
          </div>

          {/* --- فلتر الحالة --- */}
          <div>
            <Label
              htmlFor="status-filter"
              className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              <span className="inline-flex items-center">
                <FaFilter className="ml-1.5" />
                الحالة
              </span>
            </Label>
            <select
              id="status-filter"
              className="w-full p-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryColor-300 focus:border-primaryColor-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-primaryColor-500 dark:focus:border-primaryColor-500 shadow-sm transition-colors duration-200"
              defaultValue=""
            >
              <option value="">الحالة</option>
              <option>مكتملة</option>
              <option>معلقة</option>
              <option>مؤكدة</option>
              <option>مرفوضة</option>
            </select>
          </div>

          {/* --- البحث --- */}
          <div className="lg:col-span-2">
            <Label
              htmlFor="search"
              className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              البحث عن مريض
            </Label>
            <TextInput
              theme={flowbit.input}
              color="primary"
              className="w-full text-sm"
              id="search"
              type="text"
              icon={Search}
              placeholder="ابحث عن طبيب..."
            />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-2xl shadow-xl p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-5 pb-3 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-3">
            <HiOutlineCalendar className="w-6 h-6 text-primaryColor dark:text-primaryColor-400" />
            المواعيد القادمة والطلبات الجديدة
          </h2>
          <Link to="/dashboard/appointments">
            <Button
              size="sm"
              color="light"
              theme={flowbit.button}
              className="dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700 mt-2 sm:mt-0"
            >
              عرض كل المواعيد{" "}
              <ChevronRight size={16} className="mr-1 transform scale-x-[-1]" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {upcomingAppointments.length > 0 ? (
            upcomingAppointments.map((appointment) => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))
          ) : (
            <div className="md:col-span-2 text-center py-10 text-gray-500 dark:text-gray-400">
              <HiOutlineCalendar
                size={48}
                className="mx-auto mb-3 opacity-50"
              />
              <p>لا توجد مواعيد قادمة أو طلبات جديدة حاليًا.</p>
            </div>
          )}
        </div>
      </div>
      <div className="pt-8 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-5">
          تحديد أوقات العمل
        </h3>
        {availability.length === 0 && !setAvaLoading && (
          <div className="text-center py-12 px-6 bg-slate-50 dark:bg-gray-700/50 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
            <MdAccessTimeFilled className="mx-auto text-5xl text-gray-400 dark:text-gray-500 mb-4" />
            <p className="text-gray-600 dark:text-gray-300 text-lg font-medium mb-2">
              لم تقم بإضافة أي أوقات عمل بعد.
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
              انقر على الزر أدناه لإضافة أول فترة زمنية تكون فيها متاحًا.
            </p>
            <Button
              theme={flowbit.button}
              color="primary"
              outline
              onClick={handleAdd}
              className="mx-auto group"
              disabled={setAvaLoading}
            >
              <FaPlus className="ml-2 transition-transform duration-300 ease-out group-hover:rotate-90" />
              إضافة أول توقيت
            </Button>
          </div>
        )}

        {availability.length > 0 && (
          <div className="space-y-4">
            {availability.map((slot, index) => (
              <div
                key={index}
                className="bg-slate-50 dark:bg-gray-700/60 p-4 rounded-xl shadow-md border border-slate-200 dark:border-gray-600/50 transition-all hover:shadow-lg hover:border-primaryColor/30"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[1fr,1fr,1fr,auto] gap-4 items-end">
                  <div>
                    <Label
                      htmlFor={`day-${index}`}
                      className="mb-1.5 block text-xs font-medium text-gray-600 dark:text-gray-300"
                    >
                      {" "}
                      اليوم{" "}
                    </Label>
                    <Select
                      id={`day-${index}`}
                      value={slot.day}
                      onChange={(e) =>
                        handleChange(index, "day", e.target.value)
                      }
                      theme={flowbit.select}
                      required
                    >
                      <option value="">اختر يوماً</option>
                      {daysOfWeek.map((day) => (
                        <option key={day.key} value={day.key}>
                          {day.label}
                        </option>
                      ))}
                    </Select>
                  </div>
                  <div>
                    <Label
                      htmlFor={`start-time-${index}`}
                      className="mb-1.5 block text-xs font-medium text-gray-600 dark:text-gray-300"
                    >
                      {" "}
                      من{" "}
                    </Label>
                    <TextInput
                      id={`start-time-${index}`}
                      type="time"
                      value={slot.from}
                      onChange={(e) =>
                        handleChange(index, "from", e.target.value)
                      }
                      theme={flowbit.textInput}
                      required
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor={`end-time-${index}`}
                      className="mb-1.5 block text-xs font-medium text-gray-600 dark:text-gray-300"
                    >
                      {" "}
                      إلى{" "}
                    </Label>
                    <TextInput
                      id={`end-time-${index}`}
                      type="time"
                      value={slot.to}
                      onChange={(e) =>
                        handleChange(index, "to", e.target.value)
                      }
                      theme={flowbit.textInput}
                      required
                    />
                  </div>
                  <div className="text-left">
                    <Tooltip content="حذف هذا التوقيت" placement="top">
                      <Button
                        theme={flowbit.button}
                        color="light"
                        onClick={() => handleDelete(index)}
                        aria-label="حذف التوقيت"
                        disabled={setAvaLoading}
                        className="!p-2.5 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:!bg-red-100 dark:hover:!bg-red-800/70 hover:!text-red-600 dark:hover:!text-red-400 focus:!ring-red-300 dark:focus:!ring-red-800"
                      >
                        <FaTrashAlt className="h-4 w-4" />
                      </Button>
                    </Tooltip>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-600">
          <Button
            theme={flowbit.button}
            onClick={handleAdd}
            outline
            color="primary"
            className="w-full sm:w-auto"
            disabled={setAvaLoading}
          >
            <FaPlus className="ml-2" />
            إضافة توقيت آخر
          </Button>
          <Button
            theme={flowbit.button}
            color="primary"
            onClick={handleSubmit}
            className="w-full sm:w-auto min-w-[180px] shadow-lg hover:shadow-primary-400/50"
            isProcessing={setAvaLoading}
            disabled={setAvaLoading}
          >
            <FaSave className="ml-2 h-5 w-5" />
            {setAvaLoading ? "جاري الحفظ..." : "حفظ الإعدادات والأوقات"}
          </Button>
        </div>
      </div>
    </div>
  );
}
