import React, { useEffect, useState } from "react";
import {
  HiMiniPlusCircle,
  HiOutlineCalendarDays,
  HiOutlineCheckCircle,
  HiOutlineInformationCircle,
  HiUsers,
} from "react-icons/hi2";
import DashPageHeader from "../../../../components/dashboard/common/DashPageHeader";
import {
  Button,
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
  Datepicker, // تم التأكد من وجود Datepicker
  Badge,
  DropdownDivider, // تمت إضافة Badge لعرض الحالة
} from "flowbite-react";
import flowbit from "../../../../config/flowbit";
import {
  Search,
  ArrowUpDown,
  Users as UsersIcon,
  AlertCircle,
  UserPlus,
  SlidersHorizontal,
} from "lucide-react"; // تم استيراد الأيقونات المستخدمة
// import { GiHealthNormal } from "react-icons/gi"; // غير مستخدمة بشكل مباشر في الفلاتر هنا
import { FaFilter } from "react-icons/fa";
// import { BsCalendarDateFill } from "react-icons/bs"; // أيقونة Datepicker ستكون كافية
import useApiRequest from "../../../../hooks/useApiRequest";
import globalApi from "../../../../utils/globalApi";
import formatDateTime from "../../../../utils/formatDateTime";
import { Link, useNavigate } from "react-router-dom"; // Link مستخدمة في زر الإضافة
import {
  HiOutlineDotsVertical,
  HiOutlineEye,
  HiTrash,
  HiOutlineExclamationCircle,
  HiOutlineClipboardList, // أيقونة لعرض الاستشارات
  HiOutlineTag, // أيقونة للحالة
} from "react-icons/hi";
// import specializations from "../../../../data/specializations"; // هذا الملف خاص بالأطباء، ليس للمرضى

import parseImgUrl from "../../../../utils/parseImgUrl"; // لإضافة الصور الرمزية

// خيارات الفرز للمرضى
const sortOptionsData = [
  { value: "", label: "الفرز الافتراضي" },
  { value: "fullName.first,fullName.second", label: "الاسم (أ-ي)" }, // لفرز الاسم الأول ثم الثاني
  { value: "-fullName.first,-fullName.second", label: "الاسم (ي-أ)" },
  { value: "-createdAt", label: "الأحدث تسجيلاً" }, // تم تعديل القيمة لتناسب الخادم
  { value: "createdAt", label: "الأقدم تسجيلاً" }, // تم تعديل القيمة لتناسب الخادم
  // يمكن إضافة المزيد من خيارات الفرز إذا كانت الحقول متاحة (مثل عدد الاستشارات)
  // { value: "consultationsCount_desc", label: "عدد الاستشارات (الأكثر)" },
];

// AppointmentDetailsModal لم يتم تعريفه هنا، يفترض أنه مكون منفصل
// const AppointmentDetailsModal = ({ open, onClose, appointment }) => { ... };

export default function AdminPatients() {
  const navigate = useNavigate();
  const { data: apiResponse, loading, error, request } = useApiRequest(); // تم تغيير اسم data إلى apiResponse

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("");

  // useEffect الأولي لجلب جميع المرضى
  useEffect(() => {
    request(() => globalApi.getAllPatients("")); // إرسال سلسلة فارغة في البداية
  }, []);

  // useEffect لجلب المرضى المفلترين/المفرزين
  useEffect(() => {
    // هذا الشرط لمنع الاستدعاء المزدوج عند التحميل الأولي
    const hasActiveFiltersOrSort = searchQuery || sortBy;

    const fetchPatients = () => {
      const params = new URLSearchParams();

      if (searchQuery) params.append("search", searchQuery);
      if (sortBy) params.append("sort", sortBy);
      const queryString = params.toString();
      request(() => globalApi.getAllPatients(queryString));
    };
    fetchPatients();
  }, [searchQuery, sortBy]);

  const patientsList = apiResponse?.data || [];

  // دالة لعرض شارة الحالة
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

  return (
    <div className="p-4 md:p-6 lg:p-8 dark:bg-gray-900 min-h-screen">
      {/* {selectedPatientForModal && (
        <PatientDetailsModal // يجب إنشاء هذا المكون
          open={openModal}
          onClose={() => { setOpenModal(false); setSelectedPatientForModal(null);}}
          patient={selectedPatientForModal}
        />
      )} */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 pb-4 border-b dark:border-gray-700">
        <DashPageHeader
          Icon={HiUsers}
          title="قائمة المرضى"
          description="إدارة وعرض بيانات المرضى المسجلين في منصة شفاؤك."
        />
        <Button
          as={Link}
          to="/dashboard/patients/new" // افترض وجود مسار لإنشاء مريض جديد
          theme={flowbit.button}
          color="primary"
          className="flex items-center justify-center gap-2 mb-2 sm:mb-0 shadow-md hover:shadow-lg transition-shadow px-4 py-2"
        >
          <span>
            <HiMiniPlusCircle size={20} />
          </span>
          <span>إضافة مريض جديد</span>
        </Button>
      </div>

      {/* لوحة الفلاتر والبحث */}
      <div className="mb-8 p-5 sm:p-6 bg-white rounded-xl shadow-xl border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-center justify-between mb-5 pb-3 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2">
            <SlidersHorizontal
              size={20}
              className="text-primaryColor dark:text-primaryColor-400"
            />
            تصفية النتائج وترتيبها
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-5 items-end">
          {/* --- حقل البحث عن مريض --- */}
          <div>
            <Label
              htmlFor="search-patients-input"
              className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              البحث عن مريض
            </Label>
            <TextInput
              theme={flowbit.input}
              color="primary"
              id="search-patients-input"
              type="text"
              icon={Search}
              placeholder="ابحث بالاسم، البريد، الهاتف..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-sm"
            />
          </div>

          {/* --- فلتر الترتيب --- */}
          <div>
            <Label
              htmlFor="sort-patients-select"
              className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              <span className="inline-flex items-center">
                <ArrowUpDown size={16} className="ml-1.5 text-slate-500" />
                ترتيب حسب
              </span>
            </Label>
            <select
              id="sort-patients-select"
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
        <Table
          hoverable
          className="min-w-[1000px] text-right dark:divide-gray-700"
        >
          <TableHead className="bg-gray-100 dark:bg-gray-700 text-xs text-gray-600 dark:text-gray-300 uppercase">
            <TableHeadCell className="p-3 px-4">المريض</TableHeadCell>
            <TableHeadCell className="p-3 px-4">رقم الهاتف</TableHeadCell>
            <TableHeadCell className="p-3 px-4 text-center">
              الجنس
            </TableHeadCell>
            <TableHeadCell className="p-3 px-4 text-center">
              عدد الاستشارات
            </TableHeadCell>
            <TableHeadCell className="p-3 px-4">تاريخ التسجيل</TableHeadCell>
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
            ) : error ? (
              <TableRow className="bg-white dark:bg-gray-800">
                <TableCell
                  colSpan={7}
                  className="text-center py-12 text-red-600 dark:text-red-400"
                >
                  <HiOutlineExclamationCircle
                    size={32}
                    className="inline-block ml-2 mb-1"
                  />
                  حدث خطأ أثناء تحميل بيانات المرضى.
                </TableCell>
              </TableRow>
            ) : patientsList.length > 0 ? (
              patientsList.map((patient) => {
                const patientStatus = getPatientStatusBadge(patient.status); // افترض وجود patient.status
                return (
                  <TableRow
                    key={patient._id}
                    className="bg-white hover:cursor-pointer hover:bg-slate-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700/50 transition-colors duration-150 group"
                    onClick={() =>
                      navigate(`/dashboard/patients/${patient._id}`)
                    }
                  >
                    <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white p-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          className="w-10 h-10 rounded-full object-cover shadow-sm border border-gray-200 dark:border-gray-600 flex-shrink-0"
                          src={
                            patient.profileImage
                              ? parseImgUrl(patient.profileImage)
                              : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                  patient.fullName.first
                                )}+${encodeURIComponent(
                                  patient.fullName.second
                                )}&background=4F46E5&color=fff&font-size=0.4&format=svg` // لون مختلف للمرضى
                          }
                          alt={`${patient.fullName.first} ${patient.fullName.second}`}
                        />
                        <div className="overflow-hidden">
                          <span
                            className="text-sm font-semibold text-primaryColor-600 hover:text-primaryColor-800 hover:underline dark:text-primaryColor-400 dark:hover:text-primaryColor-300 cursor-pointer truncate block"
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
                    <TableCell className="p-3 px-4 text-sm text-gray-500 dark:text-gray-400">
                      {patient.phone}
                    </TableCell>
                    <TableCell className="p-3 px-4 text-sm text-gray-500 dark:text-gray-400 text-center">
                      {patient.patientProfile?.gender === "male"
                        ? "ذكر"
                        : patient.patientProfile?.gender === "female"
                        ? "أنثى"
                        : "غير محدد"}
                    </TableCell>
                    <TableCell className="p-3 px-4 text-sm text-gray-500 dark:text-gray-400 text-center">
                      {patient.consultationsCount || 0}{" "}
                      {/* مثال: عدد استشارات المريض */}
                    </TableCell>
                    <TableCell className="p-3 px-4 text-sm text-gray-500 dark:text-gray-400">
                      {formatDateTime(patient.createdAt, "arabic")}
                    </TableCell>
                    <TableCell className="p-3 px-4 text-center">
                      <Badge
                        color={patientStatus.color}
                        icon={patientStatus.icon}
                        theme={flowbit.badge}
                        className={`inline-flex items-center !px-2 !py-0.5 text-xs`}
                      >
                        {patientStatus.text}
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
                            onClick={() =>
                              navigate(`/dashboard/patients/${patient._id}`)
                            }
                          >
                            عرض الملف الشخصي
                          </DropdownItem>
                          <DropdownItem
                            icon={HiOutlineClipboardList} // مثال: عرض استشارات المريض
                            onClick={() =>
                              navigate(
                                `/dashboard/appointments?patientId=${patient._id}`
                              )
                            }
                          >
                            عرض الاستشارات
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
                  colSpan={7} // تم تعديل colSpan ليناسب عدد الأعمدة
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
  );
}
