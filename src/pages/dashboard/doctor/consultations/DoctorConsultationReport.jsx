import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  Button,
  Avatar,
  Badge,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Tooltip,
  Spinner,
} from "flowbite-react";
import DashPageHeader from "../../../../components/dashboard/common/DashPageHeader"; // Adjust path
import flowbit from "../../../../config/flowbit"; // Adjust path
import useApiRequest from "../../../../hooks/useApiRequest"; // Your API hook
import globalApi from "../../../../utils/globalApi"; // Your API functions
import formatDateTime from "../../../../utils/formatDateTime";
import parseImgUrl from "../../../../utils/parseImgUrl";
import {
  HiOutlineClipboardList,
  HiOutlinePrinter,
  HiOutlineArrowLeft,
  HiOutlineUserCircle,
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlineInformationCircle,
  HiOutlineCheckCircle,
  HiOutlinePaperClip,
  HiOutlinePencilAlt,
  HiOutlineClipboardCheck,
  HiOutlineSparkles,
  HiOutlineBeaker,
  HiOutlineRefresh,
  HiOutlineExclamationCircle,
} from "react-icons/hi";
import {
  FaFilePrescription,
  FaStethoscope,
  FaNotesMedical,
  FaHeartbeat,
} from "react-icons/fa";
import { MessageSquare, Video, AlertCircle } from "lucide-react";

// --- Helper Components ---
const InfoCard = ({
  icon: Icon,
  title,
  children,
  iconBgColor = "bg-primary-100 dark:bg-primary-900/50",
  iconColor = "text-primaryColor dark:text-primaryColor-400",
}) => (
  <Card theme={flowbit.card} className="shadow-xl dark:bg-gray-800 w-full !p-0">
    <div className="p-5 flex items-center gap-4 border-b border-gray-200 dark:border-gray-700">
      <div
        className={`w-11 h-11 rounded-lg flex items-center justify-center ${iconBgColor}`}
      >
        <Icon size={24} className={iconColor} />
      </div>
      <h3 className="text-lg font-bold text-gray-800 dark:text-white">
        {title}
      </h3>
    </div>
    <div className="p-5 text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed space-y-2">
      {children}
    </div>
  </Card>
);

const DetailItem = ({ label, value, children }) => (
  <div className="flex justify-between items-center py-2">
    <p className="text-sm text-gray-500 dark:text-gray-400">{label}:</p>
    {children ? (
      <div>{children}</div>
    ) : (
      <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 text-left">
        {value || "غير محدد"}
      </p>
    )}
  </div>
);

const getPatientConditionBadge = (condition) => {
  let color = "gray";
  switch (condition) {
    case "جيدة":
    case "مستقرة":
      color = "success";
      break;
    case "متوسطة":
      color = "warning";
      break;
    case "سيئة":
    case "تدهورت":
      color = "failure";
      break;
    default:
      color = "gray";
  }
  return (
    <Badge color={color} size="sm" className="!font-medium">
      {condition}
    </Badge>
  );
};

// Skeleton component for the loading state
const ReportPageSkeleton = () => (
  <div className="animate-pulse mt-8">
    <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded-md w-1/2 mb-8"></div>
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start">
      {/* Main Content Skeleton */}
      <div className="lg:col-span-8 xl:col-span-9 w-full space-y-6">
        <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
          <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
        </div>
        <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
      </div>
      {/* Sidebar Skeleton */}
      <div className="lg:col-span-4 xl:col-span-3 w-full">
        <div className="sticky top-24 space-y-6">
          <div className="h-56 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
          <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
        </div>
      </div>
    </div>
  </div>
);

// --- Main Component ---
export default function DoctorConsultationReport() {
  const { id: reportId } = useParams();
  const navigate = useNavigate();

  const {
    data: reportApiResponse,
    loading,
    error,
    request: fetchReport,
  } = useApiRequest();
  const [reportData, setReportData] = useState(null);

  console.log(reportData);

  useEffect(() => {
    if (reportId) {
      fetchReport(() => globalApi.getConsultationReportById(reportId));
    }
  }, [reportId]);

  useEffect(() => {
    if (reportApiResponse?.data) {
      setReportData(reportApiResponse.data);
    }
  }, [reportApiResponse]);

  if (loading && !reportData) {
    return (
      <div
        className="p-4 md:p-6 lg:p-8 dark:bg-gray-900 min-h-screen"
        dir="rtl"
      >
        <ReportPageSkeleton />
      </div>
    );
  }

  if (error || !reportData) {
    return (
      <div
        className="p-4 md:p-6 lg:p-8 dark:bg-gray-900 min-h-screen flex flex-col items-center justify-center text-center"
        dir="rtl"
      >
        <AlertCircle size={56} className="mx-auto text-red-400 mb-5" />
        <h3 className="text-2xl font-semibold text-red-500 dark:text-red-400 mb-3">
          {error ? "خطأ في تحميل التقرير" : "التقرير غير موجود"}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {error || "لم نتمكن من العثور على تقرير الاستشارة المطلوب."}
        </p>
        <Button
          color="light"
          onClick={() => navigate(-1)}
          theme={flowbit.button}
          className="dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700"
        >
          <HiOutlineArrowLeft className="ml-2 h-5 w-5 transform scale-x-[-1]" />{" "}
          العودة للخلف
        </Button>
      </div>
    );
  }

  // Extract nested data for easier access
  const { consultation, doctor, patient } = reportData;

  return (
    <div
      className="p-4 md:p-6 lg:p-8 bg-slate-50 dark:bg-gray-900 min-h-screen"
      dir="rtl"
    >
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 pb-4 border-b dark:border-gray-700">
        <DashPageHeader
          Icon={HiOutlineClipboardList}
          title={`تقرير الاستشارة #${
            consultation?.consultationId ||
            reportData?._id.slice(-6).toUpperCase()
          }`}
          description={`خاصة بالمريض ${patient?.name}  بتاريخ ${formatDateTime(
            consultation?.date,
            "arabic-both"
          )}`}
        />
        <div className="flex items-center gap-2">
          <Button
            color="light"
            onClick={() => navigate(-1)}
            theme={flowbit.button}
            className="dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700"
          >
            <HiOutlineArrowLeft className="ml-2 h-5 w-5 transform scale-x-[-1]" />{" "}
            العودة
          </Button>
          <Button
            color="primary"
            onClick={() => window.print()}
            theme={flowbit.button}
          >
            <HiOutlinePrinter className="ml-2 h-5 w-5" /> طباعة
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start">
        {/* --- Main Content --- */}
        <div className="lg:col-span-8 xl:col-span-9 w-full space-y-6">
          <InfoCard title="ملخص الطبيب" icon={HiOutlinePencilAlt}>
            <p>{reportData?.summary}</p>
          </InfoCard>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InfoCard title="التشخيص النهائي" icon={FaStethoscope}>
              <p className="font-bold text-lg text-primaryColor-700 dark:text-primaryColor-300">
                {reportData?.diagnosis}
              </p>
            </InfoCard>
            <InfoCard title="حالة المريض بعد الجلسة" icon={FaHeartbeat}>
              {getPatientConditionBadge(reportData?.patientCondition)}
            </InfoCard>
          </div>

          <InfoCard title="الوصفة الطبية" icon={FaFilePrescription}>
            <div className="overflow-x-auto">
              <Table striped className="min-w-[500px]">
                <TableHead className="bg-slate-100 dark:bg-gray-700/50">
                  <TableHeadCell>الدواء</TableHeadCell>
                  <TableHeadCell>الجرعة</TableHeadCell>
                  <TableHeadCell>المدة</TableHeadCell>
                </TableHead>
                <TableBody className="divide-y dark:divide-gray-600">
                  {reportData?.medications?.map((med, index) => (
                    <TableRow key={index} className="bg-white dark:bg-gray-800">
                      <TableCell className="font-medium text-gray-900 dark:text-white">
                        {med.name}
                      </TableCell>
                      <TableCell>{med.dosage}</TableCell>
                      <TableCell>{med.duration}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </InfoCard>

          {reportData?.lifestyleAdvice && (
            <InfoCard title="نصائح وتوصيات" icon={HiOutlineSparkles}>
              <p className="whitespace-pre-line">
                {reportData?.lifestyleAdvice}
              </p>
            </InfoCard>
          )}

          {reportData?.recommendedTests?.length > 0 && (
            <InfoCard title="فحوصات مقترحة" icon={HiOutlineBeaker}>
              <ul className="list-disc list-inside space-y-1.5">
                {reportData?.recommendedTests?.map((test, index) => (
                  <li key={index}>{test}</li>
                ))}
              </ul>
            </InfoCard>
          )}

          {/* {reportData?.nextConsultationDate && (
            <InfoCard
              title="موعد المتابعة"
              icon={HiOutlineRefresh}
              iconBgColor="bg-green-100 dark:bg-green-900/50"
              iconColor="text-green-600 dark:text-green-400"
            >
              <p>
                يوصي الطبيب بموعد متابعة بتاريخ:{" "}
                <strong className="text-green-700 dark:text-green-300">
                  {formatDateTime(
                    reportData?.nextConsultationDate,
                    "arabicFullDate"
                  )}
                </strong>
                .
              </p>
            </InfoCard>
          )} */}
        </div>

        {/* --- Sidebar --- */}
        <div className="lg:col-span-4 xl:col-span-3 w-full">
          <div className="sticky top-24 space-y-6">
            <Card theme={flowbit.card} className="shadow-xl dark:bg-gray-800">
              <h3 className="text-md font-semibold text-gray-800 dark:text-white mb-3 border-b dark:border-gray-700 pb-2">
                ملخص الاستشارة
              </h3>
              <div className="space-y-2">
                <DetailItem
                  label="رقم الموعد"
                  value={`#${consultation?.consultationId}`}
                />
                <DetailItem
                  label="الحالة"
                  children={
                    <Badge color="teal" className="!text-xs">
                      مكتملة
                    </Badge>
                  }
                />
                <DetailItem label="نوعها" value={"عن بعد"} />
                <DetailItem
                  label="المدة"
                  value={`${consultation?.duration} دقيقة`}
                />
                <DetailItem
                  label="التكلفة"
                  value={`${consultation?.price?.toLocaleString("ar-EG")} دج`}
                />
              </div>
            </Card>

            <Card theme={flowbit.card} className="shadow-xl dark:bg-gray-800">
              <h3 className="text-md font-semibold text-gray-800 dark:text-white mb-3 border-b dark:border-gray-700 pb-2">
                المشاركون
              </h3>
              <div className="flex items-center gap-3 py-2">
                <Avatar
                  img={parseImgUrl(doctor?.profileImage)}
                  rounded
                  bordered
                  size="md"
                  color="light"
                />
                <div>
                  <p className="text-xs text-gray-500">الطبيب</p>
                  <Link
                    to={`/doctors/${doctor?._id}`}
                    target="_blank"
                    className="text-sm font-semibold text-gray-700 dark:text-gray-200 hover:underline"
                  >
                    {doctor?.name}
                  </Link>
                </div>
              </div>
              <div className="flex items-center gap-3 py-2 border-t dark:border-gray-700">
                <Avatar
                  img={parseImgUrl(patient?.profileImage)}
                  rounded
                  bordered
                  size="md"
                  color="light"
                />
                <div>
                  <p className="text-xs text-gray-500">المريض</p>
                  <Link
                    to={`/dashboard/patients/${patient?._id}`}
                    className="text-sm font-semibold text-gray-700 dark:text-gray-200 hover:underline"
                  >
                    {patient?.name}
                  </Link>
                </div>
              </div>
            </Card>

            {/* {reportData.attachments?.length > 0 && (
              <Card theme={flowbit.card} className="shadow-xl dark:bg-gray-800">
                <h3 className="text-md font-semibold text-gray-800 dark:text-white mb-3 border-b dark:border-gray-700 pb-2">
                  مرفقات الطبيب
                </h3>
                <div className="space-y-2">
                  {reportData?.attachments.map((file, index) => (
                    <a
                      key={index}
                      href={file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 p-2 bg-slate-50 dark:bg-gray-700 hover:bg-slate-100 dark:hover:bg-gray-600/70 rounded-lg border dark:border-gray-200 dark:border-gray-600 transition-colors"
                    >
                      <HiOutlinePaperClip className="w-5 h-5 text-primaryColor-600 dark:text-primaryColor-400 flex-shrink-0" />
                      <span
                        className="text-sm text-gray-700 dark:text-gray-200 truncate group-hover:underline"
                        title={file.name}
                      >
                        {file.name}
                      </span>
                    </a>
                  ))}
                </div>
              </Card>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
}
