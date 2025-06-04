import React, { useEffect, useState } from "react";
import { HiMiniPlusCircle, HiUsers } from "react-icons/hi2";
import DashPageHeader from "../../../../components/dashboard/common/DashPageHeader";
import {
  Badge,
  Button,
  Dropdown,
  DropdownDivider,
  DropdownItem,
  Label,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  TextInput,
  // Select, // لن نستخدم مكون Select من Flowbite بناءً على طلبك لعناصر select الأصلية
} from "flowbite-react";
import flowbit from "../../../../config/flowbit"; // يستخدم للـ Button والـ TextInput
import {
  ArrowUpDown,
  LoaderIcon,
  Search,
  Users as UsersIcon,
  AlertCircle,
} from "lucide-react"; // UsersIcon لتجنب التعارض
import { GiHealthNormal } from "react-icons/gi";
import { FaFilter } from "react-icons/fa";
// import { BsCalendarDateFill } from "react-icons/bs"; // غير مستخدم
import useApiRequest from "../../../../hooks/useApiRequest";
import globalApi from "../../../../utils/globalApi";
import formatDateTime from "../../../../utils/formatDateTime";
import { Link, useNavigate } from "react-router-dom";
import {
  HiOutlineDotsVertical,
  HiOutlineEye,
  HiTrash,
  HiOutlineExclamationCircle,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineInformationCircle,
  HiOutlineClipboardList,
} from "react-icons/hi";
import specializations from "../../../../data/specializations"; // يفترض أن هذا الملف يُصدِّر مصفوفة
import parseImgUrl from "../../../../utils/parseImgUrl"; // لإضافة الصور الرمزية

const ratingLevels = [
  { value: "", label: "كل التقييمات" },
  { value: "5", label: "5 نجوم فقط" },
  { value: "4", label: "4 نجوم فأكثر" },
  { value: "3", label: "3 نجوم فأكثر" },
  { value: "2", label: "نجمتين فأكثر" },
  { value: "1", label: "نجمة فأكثر" },
];

const sortOptionsData = [
  { value: "", label: "الفرز الافتراضي" },
  { value: "rating_desc", label: "التقييم (الأعلى أولاً)" },
  { value: "rating_asc", label: "التقييم (الأقل أولاً)" },
  // تم إزالة فرز السعر مؤقتًا لأنه غير مطبق في منطق الفلترة الحالي للـ AdminDoctors
  // { value: "price_asc", label: "السعر (الأقل أولاً)" },
  // { value: "price_desc", label: "السعر (الأعلى أولاً)" },
  { value: "name_asc", label: "الاسم (أ-ي)" }, // القيمة يجب أن تكون "fullName.first,fullName.second" لفرز صحيح بالاسم الكامل
  { value: "name_desc", label: "الاسم (ي-أ)" }, // أو "-fullName.first,-fullName.second"
  { value: "experience_desc", label: "الخبرة (الأكثر أولاً)" },
  { value: "createdAt_desc", label: "الأحدث تسجيلاً" }, // مثال: فرز بتاريخ الإنشاء
  { value: "createdAt_asc", label: "الأقدم تسجيلاً" },
];

// إضافة خيار "كل التخصصات" إذا لم يكن موجودًا في الملف المستورد
const specializationsForFilter = [
  { value: "", label: "كل التخصصات" },
  ...(specializations || []), // تأكد أن specializations مصفوفة
];

export default function AdminDoctors() {
  const navigate = useNavigate();
  const { data: apiResponse, loading, error, request } = useApiRequest(); // تم تغيير اسم data إلى apiResponse

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState("");
  const [selectedRating, setSelectedRating] = useState("");
  const [sortBy, setSortBy] = useState("");

  // useEffect الأول لجلب جميع الأطباء عند تحميل الصفحة لأول مرة
  useEffect(() => {
    request(() => globalApi.getAllApprovedDoctors());
  }, []);

  useEffect(() => {
    const fetchDoctors = () => {
      // تم إزالة async لأن request تتعامل مع الـ Promise
      const params = new URLSearchParams();

      if (searchQuery) params.append("search", searchQuery);
      if (selectedSpecialization)
        params.append("specialization", selectedSpecialization); // الخادم يتوقع هذا المفتاح
      if (selectedRating) params.append("minRating", selectedRating); // الخادم يتوقع هذا المفتاح
      if (sortBy) params.append("sort", sortBy);

      const queryString = params.toString();
      request(() => globalApi.getAllApprovedDoctors(queryString));
    };

    // لتجنب الاستدعاء المباشر عند التحميل إذا كان useEffect الأول يقوم بذلك بالفعل،
    // يمكن إضافة شرط هنا. ولكن سأتركه كما هو بناءً على طلبك.
    fetchDoctors();
  }, [searchQuery, selectedSpecialization, selectedRating, sortBy]);

  const doctorsList = apiResponse?.data?.users || apiResponse?.data?.data || [];

  const getStatusDisplayInfo = (status) => {
    switch (status) {
      case "approved":
        return {
          text: "مفعل",
          colorClasses:
            "bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100",
          icon: HiOutlineCheckCircle,
        };
      case "pending":
        return {
          text: "قيد المراجعة",
          colorClasses:
            "bg-yellow-100 text-yellow-700 dark:bg-yellow-600 dark:text-yellow-100",
          icon: HiOutlineClock,
        };
      case "rejected":
        return {
          text: "مرفوض",
          colorClasses:
            "bg-red-100 text-red-700 dark:bg-red-700 dark:text-red-100",
          icon: HiOutlineExclamationCircle,
        };
      case "suspended":
        return {
          text: "معلّق",
          colorClasses:
            "bg-purple-100 text-purple-700 dark:bg-purple-600 dark:text-purple-100",
          icon: HiOutlineExclamationCircle,
        };
      default:
        return {
          text: status || "غير معروف",
          colorClasses:
            "bg-gray-100 text-gray-700 dark:bg-gray-600 dark:text-gray-100",
          icon: HiOutlineInformationCircle,
        };
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 dark:bg-gray-900 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 pb-4 border-b dark:border-gray-700">
        <DashPageHeader
          Icon={HiUsers}
          title="قائمة الأطباء"
          description="إدارة وعرض بيانات الأطباء المسجلين في منصة شفاؤك."
        />
        <div className="flex items-center gap-3 self-start sm:self-center flex-shrink-0">
          <Button
            as={Link}
            to="/dashboard/doctors/new"
            theme={flowbit.button}
            color="primary"
            className="flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-shadow px-4 py-2"
          >
            <HiMiniPlusCircle size={20} />{" "}
            {/* أيقونة HiMiniPlusCircle كما كانت */}
            <span>إضافة طبيب</span>
          </Button>
          <Button
            theme={flowbit.button}
            color="yellow"
            className="flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-shadow px-4 py-2"
            outline
            onClick={() => navigate("/dashboard/doctors/requests")}
          >
            <LoaderIcon size={18} />
            <span>طلبات الانضمام</span>
          </Button>
        </div>
      </div>

      {/* Filter/Control Panel */}
      <div className="mb-8 p-4 sm:p-6 bg-white rounded-xl shadow-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-5 items-end">
          <div>
            <Label
              htmlFor="search-doctors-input"
              className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              بحث شامل
            </Label>
            <TextInput
              theme={flowbit.input} // يفترض أن هذا الثيم معرف
              color="primary"
              id="search-doctors-input"
              type="text"
              icon={Search} // أيقونة على اليسار (ستظهر يمين في RTL)
              placeholder="اسم، بريد، تخصص..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-sm" // حجم خط أصغر قليلاً
            />
          </div>
          <div>
            <Label
              htmlFor="specialization-select"
              className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              التخصص الطبي
            </Label>
            <select
              id="specialization-select"
              className="w-full p-1.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              value={selectedSpecialization}
              onChange={(e) => setSelectedSpecialization(e.target.value)}
            >
              {specializationsForFilter.map((spec) => (
                <option key={spec.value} value={spec.value}>
                  {spec.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label
              htmlFor="rating-select"
              className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              <span className="inline-flex items-center">
                <GiHealthNormal className="ml-1" />
                التقييم الأدنى
              </span>
            </Label>
            <select
              id="rating-select"
              className="w-full p-1.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              value={selectedRating}
              onChange={(e) => setSelectedRating(e.target.value)}
            >
              {ratingLevels.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label
              htmlFor="sort-select"
              className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              <span className="inline-flex items-center">
                <ArrowUpDown size={16} className="ml-1" />
                ترتيب حسب
              </span>
            </Label>
            <select
              id="sort-select"
              className="w-full p-1.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
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
            <TableHeadCell className="p-3 px-4">الطبيب</TableHeadCell>
            <TableHeadCell className="p-3 px-4">رقم الهاتف</TableHeadCell>
            <TableHeadCell className="p-3 px-4">التخصص</TableHeadCell>
            <TableHeadCell className="p-3 px-4 text-center">
              عدد المرضى
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
                  <TableCell className="p-3 px-4">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
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
                  حدث خطأ أثناء تحميل البيانات. يرجى المحاولة مرة أخرى.
                </TableCell>
              </TableRow>
            ) : doctorsList.length > 0 ? (
              doctorsList.map((doctor) => {
                const statusInfo = getStatusDisplayInfo(
                  doctor.doctorProfile?.status
                );
                return (
                  <TableRow
                    key={doctor._id}
                    className="bg-white hover:bg-slate-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700/50 transition-colors duration-150 group"
                  >
                    <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white p-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          className="w-10 h-10 rounded-full object-cover shadow-sm border border-gray-200 dark:border-gray-600 flex-shrink-0"
                          src={
                            doctor.profileImage
                              ? parseImgUrl(doctor.profileImage)
                              : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                  doctor.fullName.first
                                )}+${encodeURIComponent(
                                  doctor.fullName.second
                                )}&background=0D8ABC&color=fff&font-size=0.4&format=svg`
                          }
                          alt={`${doctor.fullName.first} ${doctor.fullName.second}`}
                        />
                        <div className="overflow-hidden">
                          <Link
                            to={`/dashboard/doctors/${doctor._id}`}
                            className="text-sm font-semibold text-primaryColor-600 hover:text-primaryColor-800 hover:underline dark:text-primaryColor-400 dark:hover:text-primaryColor-300 truncate block"
                          >
                            {doctor.fullName.first} {doctor.fullName.second}
                          </Link>
                          <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                            {doctor.email}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="p-3 px-4 text-sm text-gray-500 dark:text-gray-400">
                      {doctor.phone}
                    </TableCell>
                    <TableCell className="p-3 px-4 text-sm text-gray-500 dark:text-gray-400">
                      {doctor.doctorProfile?.specialization || "غير محدد"}
                    </TableCell>
                    <TableCell className="p-3 px-4 text-sm text-gray-500 dark:text-gray-400 text-center">
                      {doctor.patientsCount || "N/A"}
                    </TableCell>
                    <TableCell className="p-3 px-4 text-sm text-gray-500 dark:text-gray-400">
                      {formatDateTime(doctor.createdAt, "arabic")}
                    </TableCell>
                    <TableCell className="p-3 px-4 text-center">
                      <Badge
                        color={statusInfo.colorClasses
                          .split(" ")[0]
                          .replace("bg-", "")
                          .replace("-100", "")}
                        icon={statusInfo.icon}
                        theme={flowbit.badge}
                        className={`inline-flex items-center !px-2 !py-0.5 text-xs ${statusInfo.colorClasses}`} // استخدام ! لفرض التنسيق
                      >
                        {statusInfo.text}
                      </Badge>
                    </TableCell>
                    <TableCell
                      className="p-3 px-4 text-center sticky right-0 bg-white group-hover:bg-slate-50 dark:bg-gray-800 dark:group-hover:bg-gray-700/50 transition-colors duration-150 z-0 group-hover:z-10"
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
                            navigate(`/dashboard/doctors/${doctor._id}`)
                          }
                        >
                          عرض وتعديل
                        </DropdownItem>
                        <DropdownItem
                          icon={HiOutlineClipboardList}
                          onClick={() =>
                            navigate(
                              `/dashboard/appointments?doctorId=${doctor._id}`
                            )
                          }
                        >
                          {" "}
                          عرض المواعيد
                        </DropdownItem>
                        <DropdownDivider />
                        <DropdownItem
                          icon={HiTrash}
                          className="!text-red-600 hover:!bg-red-50 dark:!text-red-500 dark:hover:!text-white dark:hover:!bg-red-600"
                        >
                          حذف (مؤقتًا)
                        </DropdownItem>
                      </Dropdown>
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
                    لا توجد بيانات أطباء لعرضها
                  </p>
                  <p className="text-sm">
                    حاول تعديل الفلاتر أو إضافة أطباء جدد.
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
