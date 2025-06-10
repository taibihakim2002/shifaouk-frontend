import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Avatar,
  Badge,
  Card,
  Tooltip,
  Textarea, // For rejection reason modal
} from "flowbite-react";
import DashPageHeader from "../../../../components/dashboard/common/DashPageHeader";
import flowbit from "../../../../config/flowbit";
import useApiRequest from "../../../../hooks/useApiRequest";
import globalApi from "../../../../utils/globalApi";
import formatDateTime from "../../../../utils/formatDateTime";
import parseImgUrl from "../../../../utils/parseImgUrl";
import {
  HiOutlineUserCircle,
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlineInformationCircle,
  HiOutlineCheckCircle,
  HiOutlinePaperClip,
  HiOutlinePencilAlt,
  HiOutlineArrowLeft,
  HiOutlineCurrencyDollar,
  HiOutlineX,
  HiOutlineEye,
} from "react-icons/hi";
import { FaUserMd, FaNotesMedical, FaCheck, FaTimes } from "react-icons/fa";
import {
  Video,
  MessageSquare,
  AlertCircle,
  FileText,
  User,
} from "lucide-react";
import useToastStore from "../../../../store/toastStore";

// --- Mock Data based on the Consultation Schema ---
const mockRequestData = {
  _id: "consultation_xyz456",
  consultationId: "SHF-9B7E1",
  date: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
  type: "video",
  duration: 30,
  price: 3000,
  status: "pending",
  notes:
    "أعاني من صداع نصفي شديد ومستمر منذ 3 أيام، يتركز في الجانب الأيمن من الرأس. لم تفلح المسكنات العادية في تخفيفه. يزداد الألم مع الضوء الساطع والأصوات العالية.",
  medicalFiles: [
    { url: "#", public_id: "1", format: "pdf", name: "تقرير طبي سابق.pdf" },
    { url: "#", public_id: "2", format: "jpg", name: "صورة أشعة للرأس.jpg" },
  ],
  patient: {
    _id: "patient789",
    fullName: { first: "علي", second: "بن محمد" },
    profileImage: "/patient-avatars/avatar2.jpg", // Example path
    patientProfile: {
      birthDate: "1985-11-10T00:00:00Z",
      gender: "male",
      bloodType: "O+",
    },
  },
  doctor: {
    // The current logged-in doctor
    _id: "doctor123",
    fullName: { first: "صخري", second: "معاذ" },
  },
  createdAt: new Date(new Date().getTime() - 1 * 60 * 60 * 1000).toISOString(), // 1 hour ago
};
// --- End of Mock Data ---

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

export default function DoctorConsultationRequestDetails() {
  const { id: consultationId } = useParams();
  const navigate = useNavigate();

  const { showToast } = useToastStore();
  // For real implementation, you would fetch data here
  const [consultation, setConsultation] = useState();

  const {
    data: consultationData,
    error: consultationError,
    loading: consultationLoading,
    request: consultationRequest,
  } = useApiRequest();
  const {
    data: actionData,
    error: actionError,
    loading: actionLoading,
    request: actionRequest,
  } = useApiRequest();

  useEffect(() => {
    consultationRequest(() => globalApi.getConsultationById(consultationId));
  }, []);
  useEffect(() => {
    setConsultation(consultationData?.data);
  }, [consultationData]);

  const handleAccept = async () => {
    const { success, data, error } = await actionRequest(() =>
      globalApi.setApproveConsultation(consultationId)
    );
    if (success) {
      showToast("success", "تم قبول الاستشارة بنجاح");
    } else {
      showToast("error", error);
    }
  };

  const handleReject = async () => {
    const { success, data, error } = await actionRequest(() =>
      globalApi.setRejectConsultation(consultationId)
    );
    if (success) {
      showToast("success", "تم رفض الاستشارة بنجاح");
    } else {
      showToast("error", error);
    }
  };

  if (consultationLoading) return <div>جاري التحميل</div>;
  if (consultationError) return <div>خطا</div>;

  const age = consultation?.patient?.birthDate
    ? Math.floor(
        (new Date() - new Date(consultation?.patient?.birthDate)) / 31557600000
      )
    : null;

  return (
    <div className="p-4 md:p-6 lg:p-8 dark:bg-gray-900 min-h-screen" dir="rtl">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 pb-4 border-b dark:border-gray-700">
        <DashPageHeader
          Icon={FaNotesMedical}
          title={`مراجعة طلب الاستشارة #${consultation?.consultationId}`}
          description={`مُرسل من ${consultation?.patient?.fullName?.first} ${
            consultation?.patient?.fullName?.second
          } بتاريخ ${formatDateTime(consultation?.createdAt, "arabic")}`}
        />
        <Button
          color="light"
          onClick={() => navigate(-1)}
          theme={flowbit.button}
          className="dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700 flex-shrink-0"
        >
          <HiOutlineArrowLeft className="ml-2 h-5 w-5 transform scale-x-[-1]" />{" "}
          العودة
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start">
        {/* --- Main Content --- */}
        <div className="lg:col-span-8 xl:col-span-9 w-full space-y-6">
          {/* Main Action Card */}
          {(() => {
            switch (consultation?.status) {
              case "pending":
                return (
                  <Card
                    theme={flowbit.card}
                    className="shadow-xl dark:bg-gray-800 border border-yellow-400"
                  >
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4">
                      <h3 className="text-lg font-semibold text-yellow-700 dark:text-yellow-300">
                        هل ترغب في قبول هذه الاستشارة؟
                      </h3>
                      <div className="flex items-center gap-3 w-full sm:w-auto">
                        <Button
                          onClick={handleReject}
                          color="red"
                          outline
                          theme={flowbit.button}
                          className="w-full sm:w-auto !px-5 !py-2"
                        >
                          <HiOutlineX size={20} className="ml-2" />
                          رفض الطلب
                        </Button>
                        <Button
                          onClick={handleAccept}
                          color="green"
                          theme={flowbit.button}
                          className="w-full sm:w-auto !px-5 !py-2"
                        >
                          <HiOutlineCheckCircle size={20} className="ml-2" />
                          قبول وتأكيد الموعد
                        </Button>
                      </div>
                    </div>
                  </Card>
                );

              case "confirmed":
                return (
                  <Card
                    theme={flowbit.card}
                    className="shadow-md border-l-4 border-green-500 bg-green-50 dark:bg-green-900/30"
                  >
                    <div className="p-4 text-green-700 dark:text-green-300 font-semibold text-center">
                      ✅ تم تأكيد هذه الاستشارة بنجاح
                    </div>
                  </Card>
                );

              case "cancelled":
                return (
                  <Card
                    theme={flowbit.card}
                    className="shadow-md border-l-4 border-red-500 bg-red-50 dark:bg-red-900/30"
                  >
                    <div className="p-4 text-red-700 dark:text-red-300 font-semibold text-center">
                      ❌ تم إلغاء هذه الاستشارة
                    </div>
                  </Card>
                );

              case "completed":
                return (
                  <Card
                    theme={flowbit.card}
                    className="shadow-md border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/30"
                  >
                    <div className="p-4 flex flex-col sm:flex-row justify-between items-center gap-3">
                      <span className="text-blue-700 dark:text-blue-200 font-semibold">
                        🏁 تم إكمال الاستشارة
                      </span>
                      <Button
                        // onClick={handleViewReport}
                        color="blue"
                        theme={flowbit.button}
                        className="!px-5 !py-2"
                      >
                        <HiOutlineDocumentReport className="ml-2" size={20} />
                        عرض تقرير الاستشارة
                      </Button>
                    </div>
                  </Card>
                );

              case "expired":
                return (
                  <Card
                    theme={flowbit.card}
                    className="shadow-md border-l-4 border-gray-500 bg-gray-100 dark:bg-gray-800/40"
                  >
                    <div className="p-4 text-gray-700 dark:text-gray-300 font-semibold text-center">
                      🕓 انتهت صلاحية هذه الاستشارة
                    </div>
                  </Card>
                );

              default:
                return null;
            }
          })()}

          {/* Patient's Notes */}
          <InfoCard title="شكوى المريض وملاحظاته" icon={HiOutlinePencilAlt}>
            <p className="text-base leading-relaxed whitespace-pre-line">
              {consultation?.notes}
            </p>
          </InfoCard>

          {/* Attached Medical Files */}
          {consultation?.medicalFiles &&
            consultation?.medicalFiles.length > 0 && (
              <InfoCard
                title="الملفات الطبية المرفقة من المريض"
                icon={HiOutlinePaperClip}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {consultation?.medicalFiles.map((file, index) => (
                    <a
                      key={index}
                      href={parseImgUrl(file.url)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between p-3 bg-slate-100 dark:bg-gray-700 hover:bg-slate-200 dark:hover:bg-gray-600/70 rounded-lg border dark:border-gray-200 dark:border-gray-600 transition-all duration-200 shadow-sm"
                    >
                      <div className="flex items-center gap-2 overflow-hidden">
                        <FileText className="w-5 h-5 text-primaryColor-600 dark:text-primaryColor-400 flex-shrink-0" />
                        <span
                          className="text-sm text-gray-700 dark:text-gray-200 truncate group-hover:underline"
                          title={file.name}
                        >
                          {file.name}
                        </span>
                      </div>
                      <HiOutlineEye
                        size={18}
                        className="text-gray-500 group-hover:text-primaryColor-600"
                      />
                    </a>
                  ))}
                </div>
              </InfoCard>
            )}
        </div>

        {/* --- Sidebar with Details --- */}
        <div className="lg:col-span-4 xl:col-span-3 w-full">
          <div className="sticky top-24 space-y-6">
            <Card theme={flowbit.card} className="shadow-xl dark:bg-gray-800">
              <h3 className="text-md font-semibold text-gray-800 dark:text-white mb-3 border-b dark:border-gray-700 pb-2">
                تفاصيل الموعد المطلوب
              </h3>
              <div className="space-y-2">
                <DetailItem
                  label="التاريخ"
                  value={formatDateTime(consultation?.date, "arabic")}
                />
                <DetailItem
                  label="الوقت"
                  value={formatDateTime(consultation?.date, "time")}
                />
                <DetailItem label="نوع الاستشارة" value={"اونلاين"} />
                <DetailItem
                  label="المدة"
                  value={`${consultation?.duration} دقيقة`}
                />
                <DetailItem
                  label="التكلفة"
                  value={`${consultation?.price} دج`}
                />
                <DetailItem
                  label="الحالة الحالية"
                  children={
                    <Badge color="warning" icon={HiOutlineClock}>
                      قيد المراجعة
                    </Badge>
                  }
                />
              </div>
            </Card>

            <Card theme={flowbit.card} className="shadow-xl dark:bg-gray-800">
              <h3 className="text-md font-semibold text-gray-800 dark:text-white mb-3 border-b dark:border-gray-700 pb-2">
                معلومات المريض
              </h3>
              <div className="flex items-center gap-3 py-2">
                <Avatar
                  img={parseImgUrl(consultation?.patient?.profileImage)}
                  rounded
                  bordered
                  size="lg"
                  color="indigo"
                />
                <div>
                  <p className="text-sm font-bold text-gray-700 dark:text-gray-200">
                    {consultation?.patient?.fullName?.first}{" "}
                    {consultation?.patient?.fullName?.second}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {age ? `${age} سنة` : ""} -{" "}
                    {consultation?.patient?.patientProfile?.gender === "male"
                      ? "ذكر"
                      : "أنثى"}
                  </p>
                </div>
              </div>
              <Button
                as={Link}
                to={`/dashboard/patients/${consultation?.patient?._id}`}
                size="xs"
                color="light"
                theme={flowbit.button}
                className="w-full mt-2 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
              >
                <HiOutlineUserCircle className="ml-2" />
                عرض الملف الطبي
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
