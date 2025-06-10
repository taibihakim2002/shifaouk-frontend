import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Avatar,
  Badge,
  Card,
  Spinner,
} from "flowbite-react";
import { FaHistory, FaFileMedicalAlt } from "react-icons/fa";
import { GiMedicines } from "react-icons/gi";
import { LuHeartPulse } from "react-icons/lu";
import { MdBloodtype, MdDone } from "react-icons/md";
import flowbit from "../../../config/flowbit";
import DashPageHeader from "../../../components/dashboard/common/DashPageHeader";
import useApiRequest from "../../../hooks/useApiRequest";
import globalApi from "../../../utils/globalApi";
import useAuthStore from "../../../store/authStore";
import formatDateTime from "../../../utils/formatDateTime";
import parseImgUrl from "../../../utils/parseImgUrl";
import { Link } from "react-router-dom";
import {
  HiOutlineEye,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineXCircle,
  HiOutlineInformationCircle,
} from "react-icons/hi";
import {
  Video,
  MessageSquare,
  AlertCircle,
  FileText,
  ChevronRight,
  VideoIcon,
  MessageCircleIcon,
} from "lucide-react";
import AppointmentDetailsModal from "../../../components/dashboard/common/AppointmentDetailsModal";

// --- Helper Component for top info cards ---
const MedicalInfoCard = ({
  icon: Icon,
  title,
  data,
  color,
  emptyText = "لا توجد بيانات",
}) => (
  <div
    className={`bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-5 border-l-4 dark:border-gray-700 border-${color}-500`}
  >
    <div className="flex items-center gap-4 mb-3">
      <div
        className={`w-12 h-12 rounded-lg flex items-center justify-center bg-${color}-100 dark:bg-${color}-900/50`}
      >
        <Icon
          size={24}
          className={`text-${color}-600 dark:text-${color}-300`}
        />
      </div>
      <h3 className="text-gray-700 dark:text-gray-200 text-lg font-semibold">
        {title}
      </h3>
    </div>
    <div className="flex flex-wrap items-center gap-2 min-h-[40px]">
      {data && data.length > 0 ? (
        data.map((item, index) => (
          <span
            key={index}
            className={`py-1 px-2.5 bg-${color}-100 dark:bg-${color}-900/60 text-${color}-800 dark:text-${color}-200 rounded-md text-sm font-medium`}
          >
            {item}
          </span>
        ))
      ) : (
        <p className="text-sm text-gray-500 dark:text-gray-400 italic">
          {emptyText}
        </p>
      )}
    </div>
  </div>
);

// --- Helper for Status Badges ---
const getStatusDisplay = (status) => {
  switch (status) {
    case "completed":
      return { text: "مكتملة", color: "teal", icon: HiOutlineCheckCircle };
    case "confirmed":
      return { text: "مؤكدة", color: "success", icon: HiOutlineCheckCircle };
    case "pending":
      return { text: "قيد المراجعة", color: "warning", icon: HiOutlineClock };
    case "cancelled":
      return { text: "ملغاة", color: "failure", icon: HiOutlineXCircle };
    default:
      return { text: status, color: "gray", icon: HiOutlineInformationCircle };
  }
};

// --- Main Component ---
export default function PatientHistory() {
  const [appointmentsList, setAppointmentsList] = useState();
  const {
    data: appointmentsData,
    error: appointmentsError,
    loading: appointmentsLoading,
    request: appointmentsRequest,
  } = useApiRequest();
  const { user } = useAuthStore(); // Getting user data from the global store

  useEffect(() => {
    // Fetch user's appointment history
    appointmentsRequest(() => globalApi.getMyAppointments());
  }, []);
  useEffect(() => {
    // Fetch user's appointment history
    setAppointmentsList(appointmentsData?.data);
  }, [appointmentsData]);

  const patientProfile = user?.patientProfile || {};

  const [openModal, setOpenModal] = useState(false);
  const [selectedAppointmentForModal, setSelectedAppointmentForModal] =
    useState(null); // تم تعديل الاسم ليكون أوضح
  const handleViewDetails = (appointment) => {
    setSelectedAppointmentForModal(appointment);
    setOpenModal(true);
  };
  return (
    <div className="p-4 md:p-6 lg:p-8 dark:bg-gray-900 min-h-screen">
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
        Icon={FaHistory}
        title="سجلي الطبي الكامل"
        description="هنا يمكنك عرض وإدارة سجلك الطبي وتاريخ استشاراتك السابقة."
      />

      {/* Medical Info Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6 my-8">
        <div
          className={`bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-5 border-l-4 dark:border-gray-700 border-red-500`}
        >
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-red-100 dark:bg-red-900/50">
              <MdBloodtype
                size={28}
                className="text-red-600 dark:text-red-300"
              />
            </div>
            <h3 className="text-gray-700 dark:text-gray-200 text-lg font-semibold">
              فصيلة الدم
            </h3>
          </div>
          <div className="flex justify-start items-baseline min-h-[40px]">
            <p className="text-4xl font-extrabold text-red-600 dark:text-red-400">
              {patientProfile.bloodType || "N/A"}
            </p>
          </div>
        </div>

        <MedicalInfoCard
          title="الأمراض المزمنة"
          icon={LuHeartPulse}
          data={patientProfile.chronicDiseases}
          color="purple"
          emptyText="لا توجد أمراض مزمنة مسجلة."
        />
        <MedicalInfoCard
          title="الأدوية الحالية"
          icon={GiMedicines}
          data={patientProfile.currentMedications}
          color="green"
          emptyText="لا توجد أدوية حالية مسجلة."
        />
      </div>

      {/* Past Consultations Table Section */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-5 pb-3 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-3">
            <FaFileMedicalAlt
              size={22}
              className="text-primaryColor dark:text-primaryColor-400"
            />
            سجل الاستشارات الطبية السابقة
          </h2>
          <Link to="/doctors">
            <Button size="sm" color="primary" theme={flowbit.button} outline>
              حجز استشارة جديدة{" "}
              <ChevronRight size={16} className="mr-1 transform scale-x-[-1]" />
            </Button>
          </Link>
        </div>
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
              {appointmentsLoading ? (
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
              ) : appointmentsError ? (
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
              ) : appointmentsList?.length > 0 ? (
                // Data Rows
                appointmentsList.map((appointment) => {
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
