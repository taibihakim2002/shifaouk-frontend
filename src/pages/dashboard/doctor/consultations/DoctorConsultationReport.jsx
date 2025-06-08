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
  Spinner, // For loading states
} from "flowbite-react";
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
  HiOutlineClipboardCheck, // For completed status
  HiOutlineSparkles, // For lifestyle advice
  HiOutlineBeaker, // For lab tests
  HiOutlineRefresh, // For next appointment
} from "react-icons/hi";
import {
  FaFilePrescription,
  FaStethoscope,
  FaNotesMedical,
  FaHeartbeat, // For patient condition
} from "react-icons/fa";
import { MessageSquare, Video, AlertCircle } from "lucide-react";
import flowbit from "../../../../config/flowbit";
import formatDateTime from "../../../../utils/formatDateTime";
import parseImgUrl from "../../../../utils/parseImgUrl";
import DashPageHeader from "../../../../components/dashboard/common/DashPageHeader";

// --- Static Mock Data Reflecting the New Schema ---
const mockConsultationData = {
  _id: "consultation_abc123",
  consultationId: "SHF-8A4D2",
  date: "2024-06-15T14:30:00Z",
  type: "video",
  status: "completed",
  duration: 30,
  price: 2500,
  patientNotes:
    "بدأت أعاني من ألم حاد في الصدر عند التنفس بعمق، مع سعال جاف مستمر منذ يومين.",
  // --- New fields from the report schema ---
  summary:
    "زار المريض العيادة الافتراضية وهو يشكو من أعراض تنفسية حادة. تم إجراء فحص شامل ومناقشة تاريخه الطبي. لا توجد علامات خطر فورية، ولكن الحالة تتطلب علاجًا ومتابعة.",
  diagnosis: "التهاب الشعب الهوائية الحاد (Acute Bronchitis)",
  patientCondition: "مستقرة",
  medications: [
    {
      name: "Amoxicillin",
      dosage: "500mg - قرص واحد كل 8 ساعات",
      duration: "لمدة 7 أيام",
    },
    {
      name: "Ibuprofen",
      dosage: "400mg - قرص عند اللزوم",
      duration: "عند الحاجة (بحد أقصى 3 مرات يوميًا)",
    },
    {
      name: "Guaifenesin Syrup",
      dosage: "10ml - ملعقة واحدة كل 6 ساعات",
      duration: "حتى يهدأ السعال",
    },
  ],
  recommendedTests: [
    "فحص صورة دم كاملة (CBC) في حال عدم التحسن",
    "أشعة سينية على الصدر إذا استمر ضيق التنفس",
  ],
  lifestyleAdvice:
    "ينصح بالراحة التامة وشرب الكثير من السوائل الدافئة. تجنب مسببات تهيج الجهاز التنفسي مثل التدخين والغبار. استخدام مرطب الهواء في الغرفة قد يساعد في تخفيف السعال.",
  nextConsultationDate: "2024-06-22T14:30:00Z",
  attachments: [
    { name: "doctor_notes.pdf", url: "#" },
    { name: "lab_request.pdf", url: "#" },
  ],
  patientUploadedFiles: [
    { name: "x-ray_chest_scan.jpg", url: "#" },
    { name: "previous_medical_report.pdf", url: "#" },
  ],
  // --- End of new fields ---
  doctor: {
    _id: "doc1",
    fullName: { first: "صخري", second: "معاذ" },
    profileImage: "/doctor1.jpg",
    specialization: "أخصائي أمراض قلبية وصدرية",
  },
  patient: {
    _id: "patient123",
    fullName: { first: "أحمد", second: "علي" },
    profileImage: "/patient-avatars/avatar1.jpg",
  },
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

const DetailItem = ({ label, value }) => (
  <div className="flex justify-between items-center py-2">
    <p className="text-sm text-gray-500 dark:text-gray-400">{label}:</p>
    <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 text-left">
      {value}
    </p>
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

export default function DoctorConsultationReport() {
  const { id: consultationId } = useParams();
  const navigate = useNavigate();

  const [consultation, setConsultation] = useState(mockConsultationData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (loading)
    return (
      <div>
        <Spinner size="xl" />
      </div>
    );
  if (error || !consultation) {
    return (
      <div className="p-8 text-center text-red-500">
        <AlertCircle size={48} className="mx-auto mb-4" />
        <h3 className="text-xl font-semibold">خطأ في تحميل تفاصيل الاستشارة</h3>
        <p>{error || "لم يتم العثور على الاستشارة المطلوبة."}</p>
      </div>
    );
  }

  const { doctor, patient } = consultation;

  return (
    <div
      className="p-4 md:p-6 lg:p-8 bg-slate-50 dark:bg-gray-900 min-h-screen"
      dir="rtl"
    >
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 pb-4 border-b dark:border-gray-700">
        <DashPageHeader
          Icon={HiOutlineClipboardList}
          title={`تقرير الاستشارة #${consultation.consultationId}`}
          description={`تم إجراؤها بتاريخ ${formatDateTime(
            consultation.date,
            "arabic"
          )}`}
        />
        <div className="flex items-center gap-2">
          <Button
            color="light"
            onClick={() => navigate(-1)}
            theme={flowbit.button}
            className="dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700 flex-shrink-0"
          >
            <HiOutlineArrowLeft className="ml-2 h-5 w-5 transform scale-x-[-1]" />{" "}
            العودة
          </Button>
          <Button
            color="primary"
            onClick={() => window.print()}
            theme={flowbit.button}
            className="flex-shrink-0"
          >
            <HiOutlinePrinter className="ml-2 h-5 w-5" /> طباعة
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start">
        {/* --- Main Content --- */}
        <div className="lg:col-span-8 xl:col-span-9 w-full space-y-6">
          <InfoCard title="ملخص الطبيب" icon={HiOutlinePencilAlt}>
            <p>{consultation.summary}</p>
          </InfoCard>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InfoCard title="التشخيص النهائي" icon={FaStethoscope}>
              <p className="font-bold text-lg text-primaryColor-700 dark:text-primaryColor-300">
                {consultation.diagnosis}
              </p>
            </InfoCard>
            <InfoCard title="حالة المريض بعد الجلسة" icon={FaHeartbeat}>
              {getPatientConditionBadge(consultation.patientCondition)}
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
                  {consultation.medications.map((med, index) => (
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

          <InfoCard title="نصائح وتوصيات" icon={HiOutlineSparkles}>
            <p className="whitespace-pre-line">
              {consultation.lifestyleAdvice}
            </p>
          </InfoCard>

          {consultation.recommendedTests?.length > 0 && (
            <InfoCard title="فحوصات مقترحة" icon={HiOutlineBeaker}>
              <ul className="list-disc list-inside space-y-1.5">
                {consultation.recommendedTests.map((test, index) => (
                  <li key={index}>{test}</li>
                ))}
              </ul>
            </InfoCard>
          )}

          {consultation.nextConsultationDate && (
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
                    consultation.nextConsultationDate,
                    "arabicFullDate"
                  )}
                </strong>
                .
              </p>
            </InfoCard>
          )}
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
                  value={`#${consultation.consultationId}`}
                />
                <DetailItem
                  label="الحالة"
                  children={
                    <Badge color="teal" className="!text-xs">
                      مكتملة
                    </Badge>
                  }
                />
                <DetailItem
                  label="نوعها"
                  value={
                    consultation.type === "video" ? "مكالمة فيديو" : "محادثة"
                  }
                />
                <DetailItem
                  label="المدة"
                  value={`${consultation.duration} دقيقة`}
                />
                <DetailItem
                  label="التكلفة"
                  value={`${consultation.price.toLocaleString("ar-EG")} دج`}
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
                    to={`/dashboard/doctors/${doctor?._id}`}
                    className="text-sm font-semibold text-gray-700 dark:text-gray-200 hover:underline"
                  >
                    {doctor?.fullName.first} {doctor?.fullName.second}
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
                    {patient?.fullName.first} {patient?.fullName.second}
                  </Link>
                </div>
              </div>
            </Card>

            {consultation.attachments?.length > 0 && (
              <Card theme={flowbit.card} className="shadow-xl dark:bg-gray-800">
                <h3 className="text-md font-semibold text-gray-800 dark:text-white mb-3 border-b dark:border-gray-700 pb-2">
                  مرفقات الطبيب
                </h3>
                <div className="space-y-2">
                  {consultation.attachments.map((file, index) => (
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
