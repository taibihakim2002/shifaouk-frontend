import { FaWallet } from "react-icons/fa";
import DashPageHeader from "../../../../components/dashboard/common/DashPageHeader";
import { IoWalletOutline } from "react-icons/io5";
import { GiSandsOfTime } from "react-icons/gi";
import { MdDone } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import InfoCard from "../../../../components/dashboard/common/InfoCard";
import {
  Badge,
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
} from "flowbite-react";
import flowbit from "../../../../config/flowbit";
import { ArrowUpDown, CalendarDays, Search, Tag } from "lucide-react";
import { GiHealthNormal } from "react-icons/gi";
import { FaFilter } from "react-icons/fa";
import { BsCalendarDateFill } from "react-icons/bs";
import useApiRequest from "../../../../hooks/useApiRequest";
import { useEffect, useState } from "react";
import globalApi from "../../../../utils/globalApi";
import Skeleton from "../../../../components/common/Skeleton";
import {
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineExclamationCircle,
  HiOutlineEye,
  HiOutlineInformationCircle,
  HiOutlineXCircle,
} from "react-icons/hi2";
import parseImgUrl from "../../../../utils/parseImgUrl";
import formatDateTime from "../../../../utils/formatDateTime";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const chargeRequestStatusOptions = [
  { value: "", label: "كل الحالات" },
  { value: "pending", label: "في الانتظار" },
  { value: "approved", label: "مقبول" },
  { value: "rejected", label: "مرفوض  " }, // حالة إضافية
];

const sortOptionsData = [
  { value: "", label: "الفرز الافتراضي" },
  { value: "amount", label: "المبلغ (اكبر -اصغر)" },
  { value: "-amount", label: "المبلغ (اصغر -اكبر)" },
  { value: "transferDate", label: "تاريخ الطلب (الأقدم أولاً)" }, // فرز بتاريخ الموعد
  { value: "-transferDate", label: "تاريخ الطلب (الأحدث أولاً)" },
];

const infoCards = [
  {
    title: "اجمالي الطلبات",
    icon: IoWalletOutline,
    color: "#9747FF",
    value: 120,
    percentage: 8,
    percentageText: "مقارنة بالشهر الماضي",
  },
  {
    title: "طلبات بانتظار المراجعة",
    icon: GiSandsOfTime,
    color: "#FFAE00",
    value: 15,
    percentage: 4,
    percentageText: "مقارنة بالشهر الماضي",
  },
  {
    title: "طلبات مقبولة",
    icon: MdDone,
    color: "#25A85C",
    value: 92,
    percentage: 4,
    percentageText: "مقارنة بالشهر الماضي",
  },
  {
    title: "طلبات مرفوضة",
    icon: IoMdClose,
    color: "#F50000",
    value: 14,
    percentage: -11,
    percentageText: "من اجمالي الطلبات",
  },
];
const rechargeRequests = [
  {
    id: 3521,
    customer: "محمد أحمد",
    email: "ahmed@shifauk.com",
    amount: "1500 دج",
    time: "اليوم 21:30",
    method: "RIB",
    status: "مكتملة",
  },
  {
    id: 3522,
    customer: "سارة ياسين",
    email: "sara@shifauk.com",
    amount: "2500 دج",
    time: "اليوم 18:45",
    method: "CCP",
    status: "مرفوضة",
  },
  {
    id: 3523,
    customer: "أمين بلال",
    email: "amin@shifauk.com",
    amount: "3000 دج",
    time: "أمس 13:00",
    method: "RIB",
    status: "قيد المراجعة",
  },
  {
    id: 3524,
    customer: "ليلى عماد",
    email: "leila@shifauk.com",
    amount: "1000 دج",
    time: "اليوم 10:15",
    method: "CCP",
    status: "مكتملة",
  },
  {
    id: 3525,
    customer: "يوسف سالم",
    email: "youssef@shifauk.com",
    amount: "5000 دج",
    time: "أمس 16:30",
    method: "RIB",
    status: "مرفوضة",
  },
  {
    id: 3526,
    customer: "هدى علوي",
    email: "houda@shifauk.com",
    amount: "2000 دج",
    time: "اليوم 12:00",
    method: "RIB",
    status: "قيد المراجعة",
  },
  {
    id: 3527,
    customer: "كريم عبد النور",
    email: "karim@shifauk.com",
    amount: "3500 دج",
    time: "أمس 20:00",
    method: "CCP",
    status: "مكتملة",
  },
  {
    id: 3528,
    customer: "إيناس علي",
    email: "inas@shifauk.com",
    amount: "1800 دج",
    time: "اليوم 08:45",
    method: "RIB",
    status: "مرفوضة",
  },
  {
    id: 3529,
    customer: "عبد الله سمير",
    email: "abdallah@shifauk.com",
    amount: "2200 دج",
    time: "أمس 09:00",
    method: "CCP",
    status: "قيد المراجعة",
  },
  {
    id: 3530,
    customer: "ريم بن صالح",
    email: "rim@shifauk.com",
    amount: "1200 دج",
    time: "اليوم 15:30",
    method: "RIB",
    status: "مكتملة",
  },
];

const getStatusDisplay = (statusKey) => {
  switch (statusKey?.toLowerCase()) {
    case "pending":
      return { text: "في الانتظار", color: "warning", icon: HiOutlineClock };
    case "approved":
      return { text: "مقبول", color: "success", icon: HiOutlineCheckCircle };
    case "rejected":
      return {
        text: "مرفوض",
        color: "failure",
        icon: HiOutlineExclamationCircle,
      };
    default:
      return {
        text: statusKey || "غير معروف",
        color: "gray",
        icon: HiOutlineInformationCircle,
      };
  }
};
export default function AdminWallet() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setDate] = useState(); // اسم الحالة كان 'date'
  const [selectedStatus, setStatus] = useState(""); // اسم الحالة كان 'status'
  const [sortBy, setSortBy] = useState("");

  const {
    loading: statesLoading,
    data: statesData,
    error: statesError,
    request: statesRequest,
  } = useApiRequest();
  const { loading, data, error, request } = useApiRequest();

  console.log(data);
  useEffect(() => {
    statesRequest(() => globalApi.getAdminWalletStates());
    request(() => globalApi.getAllChargeRequests());
  }, []);

  useEffect(() => {
    const fetchChargeRequest = async () => {
      const params = new URLSearchParams();
      if (searchQuery) params.append("search", searchQuery);
      if (sortBy) params.append("sort", sortBy);
      if (selectedDate) params.append("date", selectedDate.toISOString());
      if (selectedStatus) params.append("status", selectedStatus);
      const queryString = params.toString();

      request(() => globalApi.getAllChargeRequests(queryString));
    };
    fetchChargeRequest();
  }, [searchQuery, selectedDate, selectedStatus, sortBy]);

  return (
    <div>
      <DashPageHeader
        Icon={FaWallet}
        title="طلبات الشحن"
        description="مراجعة وإدارة طلبات شحن العملات الرقمية من المستخدمين
"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {statesLoading
          ? [0, 1, 2, 3].map((index) => (
              <Skeleton key={index} className="h-32" />
            ))
          : statesData &&
            [
              {
                title: "اجمالي الطلبات",
                icon: IoWalletOutline,
                color: "#9747FF",
                value: statesData?.data?.totalChargeRequests,
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
                value: statesData?.data?.approvedRequests,
                percentage: 4,
                percentageText: "مقارنة بالشهر الماضي",
              },
              {
                title: "طلبات مرفوضة",
                icon: IoMdClose,
                color: "#F50000",
                value: statesData?.data?.rejectedRequests,
                percentage: -11,
                percentageText: "من اجمالي الطلبات",
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
        {/* {infoCards.map((card, index) => (
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
        ))} */}
      </div>
      <div className="mb-8 p-4 sm:p-6 bg-white rounded-xl shadow-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-5 items-end">
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
              className="w-full text-sm"
              id="search-appointments-input"
              type="text"
              icon={Search}
              placeholder="اسم طبيب/مريض، رقم موعد..."
              value={searchQuery} // ربط القيمة
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div>
            <Label
              htmlFor="date-filter-appointments"
              className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              <span className="inline-flex items-center">
                <CalendarDays size={16} className="ml-1" />
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

          <div>
            <Label
              htmlFor="status-filter-appointments"
              className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              <span className="inline-flex items-center">
                <Tag size={16} className="ml-1" />
                حالة الموعد
              </span>
            </Label>
            <select
              id="status-filter-appointments"
              className="w-full p-1.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              value={selectedStatus}
              onChange={(e) => setStatus(e.target.value)}
            >
              {chargeRequestStatusOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label
              htmlFor="sort-appointments-select"
              className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              <span className="inline-flex items-center">
                <ArrowUpDown size={16} className="ml-1" />
                ترتيب حسب
              </span>
            </Label>
            <select
              className="w-full p-1.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              id="sort-appointments-select"
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
            <TableHeadCell className="p-3 px-4">رقم الطلب</TableHeadCell>
            <TableHeadCell className="p-3 px-4">العميل</TableHeadCell>
            <TableHeadCell className="p-3 px-4">رقم الوصل</TableHeadCell>
            <TableHeadCell className="p-3 px-4">تاريخ الارسال</TableHeadCell>
            <TableHeadCell className="p-3 px-4 text-center">
              المبلغ
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
              [...Array(5)].map((_, index) => (
                <TableRow
                  key={index}
                  className="bg-white animate-pulse dark:bg-gray-800"
                >
                  {[...Array(6)].map((__, i) => (
                    <TableCell key={i} className="p-3 px-4">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto"></div>
                    </TableCell>
                  ))}
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
                  حدث خطأ أثناء تحميل بيانات الطلبات.
                </TableCell>
              </TableRow>
            ) : data?.data?.length > 0 ? (
              data?.data?.map((order) => {
                const statusInfo = getStatusDisplay(order.status);
                return (
                  <TableRow
                    key={order._id}
                    className="bg-white hover:bg-slate-50 hover:cursor-pointer dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700/50 transition-colors duration-150 group"
                    onClick={() =>
                      navigate(`/dashboard/wallet/charge/${order._id}`)
                    }
                  >
                    <TableCell className="p-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300 text-center">
                      #{order.chargeRequestId}
                    </TableCell>

                    <TableCell className="p-3 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <img
                          className="w-8 h-8 rounded-full object-cover"
                          src={
                            order.customer?.profileImage
                              ? parseImgUrl(order.user.profileImage)
                              : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                  order.customer?.name || "عميل"
                                )}&background=1E40AF&color=fff`
                          }
                          alt="Customer"
                        />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                          {order.user?.name || "غير معروف"}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell className="p-3 px-4 text-sm text-gray-500 dark:text-gray-400">
                      {order?.transactionId || "غير محدد"}
                    </TableCell>

                    <TableCell className="p-3 px-4 text-sm text-gray-500 dark:text-gray-400">
                      {formatDateTime(order.transferDate, "both")}
                    </TableCell>

                    <TableCell className="p-3 px-4 text-sm text-gray-500 dark:text-gray-400 text-center">
                      {order.amount} دج
                    </TableCell>

                    <TableCell className="p-3 px-4 text-center">
                      <Badge
                        color={statusInfo.color}
                        icon={statusInfo.icon}
                        theme={flowbit.badge}
                        className="inline-flex items-center !px-2 !py-0.5 text-xs"
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
                          // onClick={() => handleViewDetails(order)}
                        >
                          عرض التفاصيل
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
                  className="text-center py-8 text-gray-500 dark:text-gray-400"
                >
                  لا توجد طلبات لعرضها حاليًا.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
