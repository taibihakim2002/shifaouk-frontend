import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  Button,
  Label,
  TextInput,
  Textarea,
  Select,
  Avatar,
  Card,
  FileInput,
  Datepicker,
  Tooltip,
  Spinner,
} from "flowbite-react";
import DashPageHeader from "../../../../components/dashboard/common/DashPageHeader"; // Adjust path
import flowbit from "../../../../config/flowbit"; // Adjust path
import useApiRequest from "../../../../hooks/useApiRequest"; // For data fetching
import globalApi from "../../../../utils/globalApi"; // For API calls
import formatDateTime from "../../../../utils/formatDateTime"; // For dates
import parseImgUrl from "../../../../utils/parseImgUrl"; // For images
import useToastStore from "../../../../store/toastStore"; // For notifications
import {
  HiOutlineUserCircle,
  HiOutlineCalendar,
  HiOutlineSave,
  HiOutlinePencilAlt,
  HiOutlinePaperClip,
  HiOutlinePlus,
  HiOutlineTrash,
  HiOutlineArrowLeft,
  HiOutlineLightBulb, // For lifestyle advice
  HiOutlineRefresh, // For next appointment
} from "react-icons/hi";
import {
  FaFilePrescription,
  FaStethoscope,
  FaNotesMedical,
  FaHeartbeat,
} from "react-icons/fa";
import { AlertCircle, Dna, FilePlus2 } from "lucide-react";

// --- Static Data for Demonstration (can be removed when using API) ---
const mockConsultationData = {
  _id: "consultation_xyz456",
  consultationId: "SHF-8A4D2",
  date: "2024-06-15T14:30:00Z",
  type: "video",
  status: "confirmed",
  patient: {
    _id: "patient123",
    fullName: { first: "علي", second: "بن محمد" },
    profileImage: "/patient-avatars/avatar2.jpg",
    patientProfile: { gender: "male", birthDate: "1985-11-10T00:00:00Z" },
  },
};
// --- End of Mock Data ---

// --- Helper Components ---
const SectionCard = ({ title, icon: Icon, children }) => (
  <Card theme={flowbit.card} className="shadow-xl dark:bg-gray-800 w-full !p-0">
    <div className="p-5 flex items-center gap-4 border-b border-gray-200 dark:border-gray-700">
      <Icon
        size={24}
        className="text-primaryColor dark:text-primaryColor-400"
      />
      <h3 className="text-lg font-bold text-gray-800 dark:text-white">
        {title}
      </h3>
    </div>
    <div className="p-5 space-y-5">{children}</div>
  </Card>
);

const LabeledTextarea = ({
  id,
  label,
  rows,
  value,
  onChange,
  placeholder,
  required = false,
}) => (
  <div>
    <Label
      htmlFor={id}
      value={label}
      className="mb-1.5 block text-sm font-medium"
    />
    <Textarea
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      theme={flowbit.textarea}
      rows={rows}
      placeholder={placeholder}
      className="text-sm"
      required={required}
    />
  </div>
);

const EditProfileSkeleton = () => (
  <div className="animate-pulse mt-8 space-y-8">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start">
      <div className="lg:col-span-4 xl:col-span-3">
        <div className="h-64 bg-gray-300 dark:bg-gray-700 rounded-xl"></div>
      </div>
      <div className="lg:col-span-8 xl:col-span-9 space-y-6">
        <div className="h-80 bg-gray-300 dark:bg-gray-700 rounded-xl"></div>
        <div className="h-64 bg-gray-300 dark:bg-gray-700 rounded-xl"></div>
      </div>
    </div>
  </div>
);

// --- Main Component ---
export default function DoctorCreateReport() {
  const { id: consultationId } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToastStore();

  // API Hooks
  const {
    data: consultationData,
    loading: fetchLoading,
    error: fetchError,
    request: fetchConsultation,
  } = useApiRequest();
  const { loading: submitting, request: submitReportRequest } = useApiRequest();

  const consultation = consultationData?.data;

  // Form State
  const [reportData, setReportData] = useState({
    summary: "",
    diagnosis: "",
    patientCondition: "مستقرة",
    lifestyleAdvice: "",
    // nextConsultationDate: null,
    finalConsultationStatus: "completed",
  });
  const [medications, setMedications] = useState([
    { name: "", dosage: "", duration: "" },
  ]);
  const [recommendedTests, setRecommendedTests] = useState([""]);
  const [attachments, setAttachments] = useState([]);

  // Fetch consultation details on mount
  useEffect(() => {
    if (consultationId) {
      fetchConsultation(() => globalApi.getConsultationById(consultationId));
    }
  }, [consultationId]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setReportData((prev) => ({ ...prev, [id]: value }));
  };

  const handleMedicationChange = (index, e) => {
    const { name, value } = e.target;
    const updatedMeds = [...medications];
    updatedMeds[index][name] = value;
    setMedications(updatedMeds);
  };

  const addMedicationRow = () => {
    setMedications([...medications, { name: "", dosage: "", duration: "" }]);
  };

  const removeMedicationRow = (index) => {
    setMedications(medications.filter((_, i) => i !== index));
  };

  const handleRecommendedTestsChange = (e) => {
    // Treat textarea as a list separated by new lines
    setRecommendedTests(e.target.value.split("\n"));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // إزالة القيم الفارغة من الأدوية والفحوصات
    const finalMedications = medications.filter(
      (med) => med.name.trim() !== ""
    );
    const finalTests = recommendedTests.filter((test) => test.trim() !== "");

    // تجهيز البيانات
    const body = {
      summary: reportData.summary,
      diagnosis: reportData.diagnosis,
      patientCondition: reportData.patientCondition,
      lifestyleAdvice: reportData.lifestyleAdvice,
      finalConsultationStatus: reportData.finalConsultationStatus,
      medications: finalMedications,
      recommendedTests: finalTests,
    };

    // إذا تم اختيار موعد متابعة، أرسله
    if (reportData.nextConsultationDate) {
      body.nextConsultationDate = new Date(
        reportData.nextConsultationDate
      ).toISOString();
    }

    // إرسال الطلب
    const { success, data, error } = await submitReportRequest(() =>
      globalApi.doctorCreateConsultationReport(consultationId, body)
    );

    if (success) {
      showToast("success", "تم حفظ التقرير بنجاح!");
      navigate(`/dashboard/appointments/${consultationId}/report`);
    } else {
      showToast("error", error || "فشل حفظ التقرير. يرجى مراجعة البيانات.");
    }
  };

  if (fetchLoading) return <EditProfileSkeleton />;
  if (fetchError) {
    return (
      <div className="p-8 text-center" dir="rtl">
        <AlertCircle size={48} className="mx-auto mb-4 text-red-500" />
        <h3 className="text-xl font-semibold text-red-600">
          خطأ في تحميل البيانات
        </h3>
        <p className="text-gray-500">
          {fetchError || "لم يتم العثور على الاستشارة المطلوبة."}
        </p>
      </div>
    );
  }

  const { patient } = consultation;
  const age = patient.patientProfile?.birthDate
    ? Math.floor(
        (new Date() - new Date(patient.patientProfile.birthDate)) / 31557600000
      )
    : null;

  return (
    <div className="p-4 md:p-6 lg:p-8 dark:bg-gray-900 min-h-screen" dir="rtl">
      <DashPageHeader
        Icon={HiOutlinePencilAlt}
        title="كتابة تقرير الاستشارة"
        description={`للموعد رقم #${consultation.consultationId} مع المريض ${patient.fullName.first} ${patient.fullName.second}`}
      />
      <form onSubmit={handleSubmit} className="mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start">
          <div className="lg:col-span-5 xl:col-span-4 w-full">
            <div className="sticky top-24 space-y-6">
              <Card
                theme={flowbit.card}
                className="shadow-xl dark:bg-gray-800 !p-0"
              >
                <div className="flex flex-col items-center p-4 text-center">
                  <Avatar
                    img={parseImgUrl(patient.profileImage)}
                    rounded
                    size="lg"
                    bordered
                    color="indigo"
                  />
                  <h5 className="mt-3 mb-1 text-lg font-bold text-gray-900 dark:text-white">
                    {patient.fullName.first} {patient.fullName.second}
                  </h5>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {age ? `${age} سنة` : ""} -{" "}
                    {patient.patientProfile.gender === "male" ? "ذكر" : "أنثى"}
                  </p>
                  <Button
                    as={Link}
                    to={`/dashboard/patients/${patient._id}`}
                    target="_blank"
                    color="light"
                    size="xs"
                    theme={flowbit.button}
                    className="mt-3 !px-3 !py-1.5 dark:!bg-gray-700"
                  >
                    <HiOutlineUserCircle className="ml-1.5" /> عرض الملف الطبي
                    الكامل
                  </Button>
                </div>
              </Card>

              <Card theme={flowbit.card} className="shadow-xl dark:bg-gray-800">
                <h4 className="text-md font-semibold text-gray-800 dark:text-white mb-2">
                  إجراءات نهائية
                </h4>
                <div>
                  <Label
                    htmlFor="finalConsultationStatus"
                    value="تحديد الحالة النهائية للموعد"
                    className="mb-1.5 block text-sm font-medium"
                  />
                  <Select
                    id="finalConsultationStatus"
                    value={reportData.finalConsultationStatus}
                    onChange={handleChange}
                    theme={flowbit.select}
                    required
                  >
                    <option value="completed">مكتملة</option>
                    <option value="cancelled">ملغاة (لعدم حضور المريض)</option>
                  </Select>
                </div>
              </Card>

              <Button
                type="submit"
                color="primary"
                theme={flowbit.button}
                isProcessing={submitting}
                disabled={submitting}
                fullSized
                className="!py-3 !text-base !font-semibold shadow-lg hover:shadow-primary-400/50"
              >
                <HiOutlineSave className="ml-2 h-5 w-5" />
                {submitting ? "جاري الحفظ..." : "حفظ التقرير وإنهاء الاستشارة"}
              </Button>
            </div>
          </div>

          <div className="lg:col-span-7 xl:col-span-8 w-full space-y-6">
            <SectionCard title="ملخص وتشخيص الاستشارة" icon={FaStethoscope}>
              <div className="flex flex-col gap-1">
                <Label htmlFor="summary">ملخص قصير للحالة واللقاء</Label>
                <Textarea
                  id="summary"
                  value={reportData.summary}
                  onChange={handleChange}
                  rows={4}
                  placeholder="وصف موجز لشكوى المريض والانطباع العام..."
                />
              </div>
              <div className="flex flex-col gap-1">
                <Label htmlFor="diagnosis">نبذة عامة </Label>
                <Textarea
                  id="diagnosis"
                  value={reportData.diagnosis}
                  onChange={handleChange}
                  rows={2}
                  placeholder="مثال: التهاب الشعب الهوائية الحاد"
                  required
                />
              </div>
            </SectionCard>

            <SectionCard
              title="حالة المريض والوصفة الطبية"
              icon={FaFilePrescription}
            >
              <div>
                <Label
                  htmlFor="patientCondition"
                  value="حالة المريض بعد الجلسة"
                  className="mb-1.5 block text-sm font-medium"
                />
                <Select
                  id="patientCondition"
                  value={reportData.patientCondition}
                  onChange={handleChange}
                  theme={flowbit.select}
                  icon={FaHeartbeat}
                  required
                >
                  <option>مستقرة</option>
                  <option>جيدة</option>
                  <option>متوسطة</option>
                  <option>سيئة</option>
                  <option>تدهورت</option>
                </Select>
              </div>
              <div>
                <Label
                  value="الوصفة الطبية"
                  className="mb-2 block text-sm font-medium"
                />
                <div className="space-y-3">
                  {medications.map((med, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-1 sm:grid-cols-[1fr,1fr,1fr,auto] gap-2 items-end p-3 bg-slate-50 dark:bg-gray-700/50 rounded-lg border dark:border-gray-600/50"
                    >
                      <TextInput
                        name="name"
                        value={med.name}
                        onChange={(e) => handleMedicationChange(index, e)}
                        placeholder="اسم الدواء"
                        theme={flowbit.textInput}
                        sizing="sm"
                        required={med.dosage || med.duration ? true : false}
                      />
                      <TextInput
                        name="dosage"
                        value={med.dosage}
                        onChange={(e) => handleMedicationChange(index, e)}
                        placeholder="الجرعة"
                        theme={flowbit.textInput}
                        sizing="sm"
                      />
                      <TextInput
                        name="duration"
                        value={med.duration}
                        onChange={(e) => handleMedicationChange(index, e)}
                        placeholder="المدة"
                        theme={flowbit.textInput}
                        sizing="sm"
                      />
                      {medications.length > 1 && (
                        <Button
                          type="button"
                          size="xs"
                          color="light"
                          onClick={() => removeMedicationRow(index)}
                          className="!p-2.5"
                        >
                          <HiOutlineTrash className="h-4 w-4 text-red-500" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    size="xs"
                    color="light"
                    onClick={addMedicationRow}
                    theme={flowbit.button}
                    className="dark:!bg-gray-600"
                  >
                    <HiOutlinePlus size={16} className="ml-1.5" /> إضافة دواء
                    آخر
                  </Button>
                </div>
              </div>
            </SectionCard>

            <SectionCard
              title="توصيات وفحوصات ومتابعة"
              icon={HiOutlineLightBulb}
            >
              <div className="flex flex-col gap-1">
                <Label htmlFor="summary">نصائح وتوصيات عامة للمريض</Label>
                <Textarea
                  id="lifestyleAdvice"
                  label="نصائح وتوصيات عامة للمريض"
                  value={reportData.lifestyleAdvice}
                  onChange={handleChange}
                  rows={4}
                  placeholder="نصائح تتعلق بالراحة، التغذية، الرياضة..."
                />
              </div>
              <div className="flex flex-col gap-1">
                <Label htmlFor="summary">فحوصات مقترحة (كل فحص في سطر)</Label>
                <Textarea
                  id="recommendedTests"
                  label="فحوصات مقترحة (كل فحص في سطر)"
                  value={recommendedTests.join("\n")}
                  onChange={handleRecommendedTestsChange}
                  rows={3}
                  placeholder="تحليل دم، أشعة..."
                />
              </div>
              {/* <div>
                <Label
                  htmlFor="nextConsultationDate"
                  value="تحديد موعد متابعة (اختياري)"
                  className="mb-1.5 block text-sm font-medium"
                >
                <Datepicker
                  id="nextConsultationDate"
                  onSelectedDateChanged={(date) =>
                    setReportData({ ...reportData, nextConsultationDate: date })
                  }
                  language="ar"
                  theme={flowbit.datepicker}
                />
              </div> */}
            </SectionCard>

            {/* <SectionCard title="مرفقات التقرير" icon={HiOutlinePaperClip}>
              <Label
                htmlFor="attachments"
                value="إرفاق ملفات للتقرير (اختياري)"
                className="mb-1.5 block text-sm font-medium"
              />
              <FileInput
                id="attachments"
                multiple
                onChange={(e) => setAttachments(Array.from(e.target.files))}
                theme={flowbit.fileInput}
                helperText="يمكنك رفع تقارير أو صور أشعة... (الحد الأقصى 5MB لكل ملف)"
              />
              {attachments.length > 0 && (
                <p className="text-xs mt-1 text-green-600">
                  {attachments.length} ملفات مختارة للرفع.
                </p>
              )}
            </SectionCard> */}
          </div>
        </div>
      </form>
    </div>
  );
}
