import React, { useEffect, useState } from "react";
import { HiMiniPlusCircle, HiUsers } from "react-icons/hi2";
import DashPageHeader from "../../../../components/dashboard/common/DashPageHeader";
import {
  Button,
  Datepicker,
  Dropdown,
  DropdownItem,
  Label,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  TextInput,
  Badge, // تمت إضافة Badge
} from "flowbite-react";
import flowbit from "../../../../config/flowbit";
import {
  Search,
  ArrowUpDown,
  CalendarDays,
  ListFilter,
  Tag,
  UserPlus,
  SlidersHorizontal,
} from "lucide-react"; // أيقونات محدثة
// import { GiHealthNormal } from "react-icons/gi"; // غير مستخدمة
import { FaFilter } from "react-icons/fa"; // مستخدمة في فلتر الترتيب
// import { BsCalendarDateFill } from "react-icons/bs"; // أيقونة Datepicker ستكون كافية
import globalApi from "../../../../utils/globalApi";
import useApiRequest from "../../../../hooks/useApiRequest";
import formatDateTime from "../../../../utils/formatDateTime";
import {
  HiOutlineDotsVertical,
  HiOutlineEye,
  HiTrash,
  HiOutlineClipboardList, // لعرض تفاصيل الموعد
  HiOutlineExclamationCircle, // لعرض الخطأ
  HiOutlineCheckCircle, // لحالة "مؤكد/مكتمل"
  HiOutlineClock, // لحالة "قيد الانتظار"
  HiOutlineXCircle, // لحالة "ملغي/مرفوض"
  HiOutlineInformationCircle, // لحالة "غير معروف"
} from "react-icons/hi";
import AppointmentDetailsModal from "../../../../components/dashboard/common/AppointmentDetailsModal"; // تأكد من صحة المسار
import { Link } from "react-router-dom"; // Link لزر الإضافة
import parseImgUrl from "../../../../utils/parseImgUrl";

const sortOptionsData = [
  { value: "", label: "الفرز الافتراضي" },
  { value: "fullName.first,fullName.second", label: "اسم المريض (أ-ي)" }, // تعديل ليشمل الاسم الكامل
  { value: "-fullName.first,-fullName.second", label: "اسم المريض (ي-أ)" },
  { value: "date", label: "تاريخ الموعد (الأقدم أولاً)" }, // فرز بتاريخ الموعد
  { value: "-date", label: "تاريخ الموعد (الأحدث أولاً)" },
  { value: "createdAt", label: "تاريخ الإنشاء (الأقدم)" },
  { value: "-createdAt", label: "تاريخ الإنشاء (الأحدث)" },
];

// قائمة بحالات المواعيد للفلتر
const appointmentStatusOptions = [
  { value: "", label: "كل الحالات" },
  { value: "pending", label: "في الانتظار" },
  { value: "confirmed", label: "مقبول" },
  { value: "cancelled", label: "ملغي" }, // "ملغي" بدلاً من "مرفوض" ليكون أوضح للمستخدم
  { value: "completed", label: "مكتمل" },
  { value: "rejected", label: "مرفوض من الطبيب" }, // حالة إضافية
];

export default function AdminAppointments() {
  // navigate غير مستخدم مباشرة في هذا الكود، لكنه قد يستخدم داخل AppointmentDetailsModal أو أزرار الإجراءات
  // const navigate = useNavigate();
  const { data: apiResponse, error, loading, request } = useApiRequest(); // تم تغيير appointments إلى apiResponse
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setDate] = useState(); // اسم الحالة كان 'date'
  const [selectedStatus, setStatus] = useState(""); // اسم الحالة كان 'status'
  const [sortBy, setSortBy] = useState("");

  const [openModal, setOpenModal] = useState(false);
  const [selectedAppointmentForModal, setSelectedAppointmentForModal] =
    useState(null); // تم تعديل الاسم ليكون أوضح

  useEffect(() => {
    request(() => globalApi.getAllAppointments()); // إرسال سلسلة فارغة في البداية لجلب الكل
  }, []); // إضافة request كاعتمادية

  console.log(apiResponse);
  useEffect(() => {
    request(() => globalApi.getAllAppointments());
  }, []);

  useEffect(() => {
    const fetchAppointments = async () => {
      const params = new URLSearchParams();

      if (searchQuery) params.append("search", searchQuery);
      if (sortBy) params.append("sort", sortBy);
      if (selectedDate) params.append("date", selectedDate.toISOString());
      if (selectedStatus) params.append("status", selectedStatus);
      const queryString = params.toString();
      console.log(queryString);
      request(() => globalApi.getAllAppointments(queryString));
    };
    fetchAppointments();
  }, [searchQuery, selectedDate, selectedStatus, sortBy]);

  const handleViewDetails = (appointment) => {
    setSelectedAppointmentForModal(appointment);
    setOpenModal(true);
  };

  const getStatusDisplay = (statusKey) => {
    switch (statusKey?.toLowerCase()) {
      case "pending":
        return { text: "في الانتظار", color: "warning", icon: HiOutlineClock };
      case "confirmed":
        return { text: "مؤكد", color: "success", icon: HiOutlineCheckCircle };
      case "cancelled":
        return { text: "ملغي", color: "pink", icon: HiOutlineXCircle }; // Flowbite 'pink' or 'failure'
      case "rejected":
        return {
          text: "مرفوض",
          color: "failure",
          icon: HiOutlineExclamationCircle,
        };
      case "completed":
        return { text: "مكتمل", color: "teal", icon: HiOutlineCheckCircle };
      default:
        return {
          text: statusKey || "غير معروف",
          color: "gray",
          icon: HiOutlineInformationCircle,
        };
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 dark:bg-gray-900 min-h-screen">
      {selectedAppointmentForModal && (
        <AppointmentDetailsModal
          open={openModal}
          onClose={() => {
            setOpenModal(false);
            setSelectedAppointmentForModal(null);
          }}
          appointment={selectedAppointmentForModal}
        />
      )}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 pb-4 border-b dark:border-gray-700">
        <DashPageHeader
          Icon={HiOutlineClipboardList} // أيقونة أكثر ملاءمة للمواعيد
          title="إدارة المواعيد"
          description="عرض وتتبع جميع المواعيد المحجوزة في منصة شفاؤك."
        />
        <Button
          as={Link}
          to="/dashboard/appointments/new" // مسار لإنشاء موعد جديد (إذا كان متاحًا للإداري)
          theme={flowbit.button}
          color="primary"
          className="flex items-center justify-center gap-2 mb-2 sm:mb-0 shadow-md hover:shadow-lg transition-shadow px-4 py-2"
        >
          <HiMiniPlusCircle size={20} />
          <span>إضافة موعد جديد</span>
        </Button>
      </div>

      {/* لوحة الفلاتر والبحث */}
      <div className="mb-8 p-5 sm:p-6 bg-white rounded-xl shadow-xl border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        {/* العنوان */}
        <div className="flex items-center justify-between mb-5 pb-3 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2">
            <SlidersHorizontal
              size={20}
              className="text-primaryColor dark:text-primaryColor-400"
            />
            تصفية المواعيد وترتيبها
          </h3>
        </div>

        {/* الشبكة */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-5 items-end">
          {/* --- حقل البحث --- */}
          <div>
            <Label
              htmlFor="search-appointments-input"
              className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              بحث شامل
            </Label>
            <TextInput
              theme={flowbit.input}
              color="primary"
              id="search-appointments-input"
              type="text"
              icon={Search}
              placeholder="اسم طبيب/مريض، رقم موعد..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-sm"
            />
          </div>

          {/* --- فلتر التاريخ --- */}
          <div>
            <Label
              htmlFor="date-filter-appointments"
              className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              <span className="inline-flex items-center">
                <CalendarDays size={16} className="ml-1.5 text-sky-500" />
                تاريخ الموعد
              </span>
            </Label>
            <Datepicker
              language="ar"
              labelTodayButton="اليوم"
              labelClearButton="ازالة"
              value={selectedDate}
              onChange={(e) => setDate(e)}
              theme={flowbit.customInlineDatePicker}
            />
          </div>

          {/* --- فلتر الحالة --- */}
          <div>
            <Label
              htmlFor="status-filter-appointments"
              className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              <span className="inline-flex items-center">
                <Tag size={16} className="ml-1.5 text-emerald-500" />
                حالة الموعد
              </span>
            </Label>
            <select
              id="status-filter-appointments"
              className="w-full p-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryColor-300 focus:border-primaryColor-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primaryColor-500 dark:focus:border-primaryColor-500 shadow-sm transition-colors duration-200"
              value={selectedStatus}
              onChange={(e) => setStatus(e.target.value)}
            >
              {appointmentStatusOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* --- فلتر ترتيب حسب --- */}
          <div>
            <Label
              htmlFor="sort-appointments-select"
              className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              <span className="inline-flex items-center">
                <ArrowUpDown size={16} className="ml-1.5 text-slate-500" />
                ترتيب حسب
              </span>
            </Label>
            <select
              id="sort-appointments-select"
              className="w-full p-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryColor-300 focus:border-primaryColor-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primaryColor-500 dark:focus:border-primaryColor-500 shadow-sm transition-colors duration-200"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              {sortOptionsData.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700 overflow-x-auto">
        <Table hoverable className="text-right dark:divide-gray-700">
          <TableHead className="bg-gray-100 dark:bg-gray-700 text-xs text-gray-600 dark:text-gray-300 uppercase">
            <TableHeadCell className="p-3 px-4">رقم الموعد</TableHeadCell>
            <TableHeadCell className="p-3 px-4">الطبيب</TableHeadCell>
            <TableHeadCell className="p-3 px-4">المريض</TableHeadCell>
            <TableHeadCell className="p-3 px-4">نوع الاستشارة</TableHeadCell>
            <TableHeadCell className="p-3 px-4">التاريخ والوقت</TableHeadCell>
            <TableHeadCell className="p-3 px-4 text-center">
              السعر (دج)
            </TableHeadCell>
            <TableHeadCell className="p-3 px-4 text-center">
              الحالة
            </TableHeadCell>
            <TableHeadCell className="p-3 px-4 text-center sticky right-0 bg-gray-100 dark:bg-gray-700 z-10">
              الإجراءات
            </TableHeadCell>
          </TableHead>
          <TableBody className="divide-y dark:divide-gray-700">
            {loading ? (
              [...Array(7)].map((_, index) => (
                <TableRow
                  key={index}
                  className="bg-white animate-pulse dark:bg-gray-800"
                >
                  <TableCell className="p-3 px-4">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                  </TableCell>
                  <TableCell className="p-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gray-300 dark:bg-gray-600 flex-shrink-0"></div>
                      <div className="w-full">
                        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="p-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gray-300 dark:bg-gray-600 flex-shrink-0"></div>
                      <div className="w-full">
                        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="p-3 px-4">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
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
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-8 mx-auto"></div>
                  </TableCell>
                </TableRow>
              ))
            ) : error ? (
              <TableRow className="bg-white dark:bg-gray-800">
                <TableCell
                  colSpan={8}
                  className="text-center py-12 text-red-600 dark:text-red-400"
                >
                  <HiOutlineExclamationCircle
                    size={32}
                    className="inline-block ml-2 mb-1"
                  />
                  حدث خطأ أثناء تحميل بيانات المواعيد.
                </TableCell>
              </TableRow>
            ) : apiResponse?.data?.length > 0 ? (
              apiResponse?.data?.map((appointment) => {
                const statusInfo = getStatusDisplay(appointment.status);
                const doctor = appointment.doctor; // افترض أن الطبيب متاح ككائن متداخل
                const patient = appointment.patient; // افترض أن المريض متاح ككائن متداخل
                return (
                  <TableRow
                    key={appointment._id} // استخدام _id للمفتاح
                    className="bg-white hover:cursor-pointer hover:bg-slate-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700/50 transition-colors duration-150 group"
                    onClick={() => handleViewDetails(appointment)}
                  >
                    <TableCell className="p-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300 text-center">
                      #
                      {appointment?.consultationId ||
                        appointment.sequentialId ||
                        appointment._id.slice(-6).toUpperCase()}{" "}
                      {/* عرض ID مميز */}
                    </TableCell>
                    <TableCell className="p-3 px-4 whitespace-nowrap">
                      {doctor ? (
                        <div className="flex items-center gap-2">
                          <img
                            className="w-8 h-8 rounded-full object-cover"
                            src={
                              doctor.profileImage
                                ? parseImgUrl(doctor.profileImage)
                                : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                    doctor.fullName.first
                                  )}+${encodeURIComponent(
                                    doctor.fullName.second
                                  )}&background=0284C7&color=fff&font-size=0.4`
                            }
                            alt="Doctor"
                          />
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                            {doctor.fullName.first} {doctor.fullName.second}
                          </span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500">غير محدد</span>
                      )}
                    </TableCell>
                    <TableCell className="p-3 px-4 whitespace-nowrap">
                      {patient ? (
                        <div className="flex items-center gap-2">
                          <img
                            className="w-8 h-8 rounded-full object-cover"
                            src={
                              patient.profileImage
                                ? parseImgUrl(patient.profileImage)
                                : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                    patient.fullName.first
                                  )}+${encodeURIComponent(
                                    patient.fullName.second
                                  )}&background=7C3AED&color=fff&font-size=0.4`
                            }
                            alt="Patient"
                          />
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                            {patient.fullName.first} {patient.fullName.second}
                          </span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500">غير محدد</span>
                      )}
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
                    <TableCell className="p-3 px-4 text-sm text-gray-500 dark:text-gray-400 text-center">
                      {appointment?.price} دج
                    </TableCell>
                    <TableCell className="p-3 px-4 text-center">
                      <Badge
                        color={statusInfo.color}
                        icon={statusInfo.icon}
                        theme={flowbit.badge}
                        className={`inline-flex items-center !px-2 !py-0.5 text-xs`}
                      >
                        {statusInfo.text}
                      </Badge>
                    </TableCell>
                    <TableCell
                      className="p-3 px-4 text-center sticky right-0 bg-white group-hover:bg-slate-50 dark:bg-gray-800 dark:group-hover:bg-gray-700/50 transition-colors duration-150 z-0 group-hover:z-10"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex justify-center">
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
                            onClick={() => handleViewDetails(appointment)}
                          >
                            عرض التفاصيل
                          </DropdownItem>
                          {/* يمكنك إضافة إجراءات أخرى مثل تعديل حالة الموعد */}
                          <DropdownItem
                            icon={HiTrash}
                            className="!text-red-600 hover:!bg-red-100 dark:!text-red-500 dark:hover:!text-white dark:hover:!bg-red-600"
                          >
                            حذف الموعد
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
                  colSpan={8} // تم تعديل colSpan ليناسب عدد الأعمدة
                  className="text-center py-16 text-gray-500 dark:text-gray-400"
                >
                  <HiOutlineClipboardList
                    size={48}
                    className="mx-auto text-gray-300 dark:text-gray-500 mb-4"
                  />
                  <p className="text-lg font-medium mb-1">
                    لا توجد مواعيد لعرضها
                  </p>
                  <p className="text-sm">
                    حاول تعديل الفلاتر أو قم بإضافة مواعيد جديدة.
                  </p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
