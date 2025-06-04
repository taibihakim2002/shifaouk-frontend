import {
  FaGraduationCap,
  FaRegEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaVenusMars,
  FaFilePdf,
  FaQuestionCircle, // بدلاً من BiSolidFilePdf لـ react-icons/fa
} from "react-icons/fa";
import DashPageHeader from "../../../../components/dashboard/common/DashPageHeader";
import {
  Button,
  Label,
  Progress,
  Spinner,
  Textarea,
  Modal,
  ModalHeader,
  ModalBody,
} from "flowbite-react"; // إضافة Modal
import flowbit from "../../../../config/flowbit";
import { MdWork, MdOutlinePolicy } from "react-icons/md"; // MdOutlinePolicy للتراخيص
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  CalendarClock,
  Brain,
  FileText,
  MessageSquareText,
  CheckCircle,
  XCircle,
} from "lucide-react"; // أيقونات Lucide لتحسين المظهر

import useApiRequest from "../../../../hooks/useApiRequest";
import { useEffect, useState } from "react";
import globalApi from "../../../../utils/globalApi";
import { Link, useNavigate, useParams } from "react-router-dom";
import Skeleton from "../../../../components/common/Skeleton";
import parseImgUrl from "../../../../utils/parseImgUrl";
import useToastStore from "../../../../store/toastStore";
import { motion } from "framer-motion";
import { FaUserDoctor } from "react-icons/fa6";

// مكون لعرض تفصيلة واحدة بشكل أنيق
const InfoDetailItem = ({
  icon: Icon,
  label,
  value,
  valueClassName = "text-slate-700 dark:text-slate-200",
  isLink = false,
  href = "#",
}) => (
  <div className="flex items-start gap-3 py-2">
    {Icon && (
      <Icon
        size={18}
        className="text-primary dark:text-primary-400 mt-1 shrink-0"
      />
    )}
    <div className="flex-1">
      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-0.5">
        {label}
      </p>
      {isLink && value !== "-" ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`text-sm sm:text-base font-medium text-primary dark:text-primary-300 hover:underline break-all ${valueClassName}`}
        >
          {value}
        </a>
      ) : (
        <p
          className={`text-sm sm:text-base font-medium break-words ${valueClassName}`}
        >
          {value || "-"}
        </p>
      )}
    </div>
  </div>
);

// مكون حاوية البطاقة المنسقة
const InfoCardContainer = ({
  title,
  icon: TitleIcon,
  children,
  className = "",
  titleSize = "text-lg sm:text-xl",
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.1 }}
    transition={{ duration: 0.4 }}
    className={`bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow p-5 sm:p-6 ${className}`}
  >
    {title && (
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5 border-b border-slate-200 dark:border-slate-700 pb-3 sm:pb-4">
        {TitleIcon && (
          <TitleIcon size={22} className="text-primary dark:text-primary-400" />
        )}
        <h3
          className={`${titleSize} font-semibold text-slate-800 dark:text-white`}
        >
          {title}
        </h3>
      </div>
    )}
    {children}
  </motion.div>
);

export default function JoiningRequestDetails() {
  // تم تغيير اسم المكون
  const { requestId } = useParams();
  const { showToast } = useToastStore();
  const navigate = useNavigate();

  const { request, data: doctorDataResponse, loading, error } = useApiRequest(); // doctorDataResponse لتجنب الخلط
  const {
    request: approveRequestAPI,
    loading: approveLoading,
    error: approveError,
  } = useApiRequest();
  const {
    request: rejectRequestAPI,
    loading: rejectLoading,
    error: rejectError,
  } = useApiRequest();

  // لا حاجة لـ setDoctor، يمكن استخدام doctorDataResponse.data مباشرة
  const doctor = doctorDataResponse?.data;

  const [rejectionReason, setRejectionReason] = useState(""); // تم تغيير اسم المتغير
  const [showRejectModal, setShowRejectModal] = useState(false);

  useEffect(() => {
    if (requestId) {
      request(() => globalApi.getDoctorByRequestId(requestId));
    }
  }, [requestId]); // إضافة request

  const handleApprove = async () => {
    const { success, error: apiError } = await approveRequestAPI(() =>
      globalApi.setApproveDoctor(doctor?._id)
    );
    if (success) {
      showToast("success", "تم قبول الطبيب بنجاح");
      navigate("/dashboard/doctors/requests");
    } else {
      showToast("error", apiError || "حدث خطأ أثناء قبول الطبيب");
    }
  };

  const handleReject = async () => {
    if (!rejectionReason.trim()) {
      showToast("error", "يرجى إدخال سبب الرفض.");
      return;
    }
    const { success, error: apiError } = await rejectRequestAPI(
      () => globalApi.setRejectDoctor(doctor?._id, { reason: rejectionReason }) // إرسال كائن
    );
    if (success) {
      showToast("success", "تم رفض الطبيب بنجاح");
      setShowRejectModal(false);
      setRejectionReason("");
      navigate("/dashboard/doctors/requests");
    } else {
      showToast("error", apiError || "حدث خطأ أثناء رفض الطبيب");
    }
  };

  if (loading && !doctor) {
    return (
      <div className="p-4 sm:p-6 md:p-8 bg-slate-50 dark:bg-gray-900 min-h-screen">
        <Skeleton className="h-10 w-3/4 sm:w-1/2 mb-6 md:mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          <div className="lg:col-span-2 space-y-6">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-48 rounded-xl" />
            ))}
          </div>
          <div className="lg:col-span-1 space-y-6">
            {[...Array(2)].map((_, i) => (
              <Skeleton key={i} className="h-64 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 sm:p-6 md:p-8 bg-slate-50 dark:bg-gray-900 min-h-screen flex flex-col items-center justify-center text-center">
        <XCircle size={56} className="text-red-500 mb-4" />
        <h2 className="text-xl md:text-2xl font-semibold text-red-600 dark:text-red-400 mb-2">
          خطأ في تحميل البيانات
        </h2>
        <p className="text-slate-600 dark:text-slate-300 mb-6">
          لم نتمكن من تحميل تفاصيل طلب الانضمام. يرجى المحاولة مرة أخرى.
        </p>
        <Button
          color="primary"
          theme={flowbit.button?.primary}
          onClick={() =>
            request(() => globalApi.getDoctorByRequestId(requestId))
          }
        >
          إعادة المحاولة
        </Button>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="p-4 sm:p-6 md:p-8 bg-slate-50 dark:bg-gray-900 min-h-screen flex flex-col items-center justify-center text-center">
        <FaQuestionCircle
          size={56}
          className="text-slate-400 dark:text-slate-500 mb-4"
        />
        <h2 className="text-xl md:text-2xl font-semibold text-slate-700 dark:text-slate-200 mb-2">
          طلب الانضمام غير موجود
        </h2>
        <p className="text-slate-600 dark:text-slate-300 mb-6">
          قد يكون المعرف غير صحيح أو أن الطلب قد تمت معالجته مسبقًا.
        </p>
        <Link to="/dashboard/doctors/requests">
          <Button color="primary" theme={flowbit.button}>
            العودة إلى قائمة الطلبات
          </Button>
        </Link>
      </div>
    );
  }

  const doctorName = `د. ${doctor.fullName?.first || ""} ${
    doctor.fullName?.second || ""
  }`.trim();
  const doctorProfileImage = parseImgUrl(doctor.profileImage);

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-slate-100 dark:bg-gray-950 min-h-screen">
      <DashPageHeader
        Icon={FaUserDoctor}
        title={`مراجعة طلب انضمام: ${doctorName}`}
        description="يرجى مراجعة جميع معلومات وبيانات الطبيب المتقدم لاتخاذ القرار المناسب."
      />

      <div className="mt-6 md:mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 items-start">
        {/* العمود الرئيسي للمعلومات التفصيلية */}
        <div className="lg:col-span-2 space-y-6 md:space-y-8">
          <InfoCardContainer title="المعلومات الشخصية" icon={User}>
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 mb-4">
              <img
                src={
                  doctorProfileImage ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    doctorName
                  )}&background=048CFF&color=fff&bold=true`
                }
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-white dark:border-slate-700 shadow-md"
                alt={doctorName}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    doctorName
                  )}&background=048CFF&color=fff&bold=true`;
                }}
              />
              <div className="text-center sm:text-start">
                <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800 dark:text-white">
                  {doctorName}
                </h4>
                <p className="text-sm sm:text-md text-primary dark:text-primary-400">
                  {doctor.doctorProfile?.specialization || "التخصص غير محدد"}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
              <InfoDetailItem
                icon={Mail}
                label="البريد الإلكتروني"
                value={doctor.email}
                valueClassName="break-all"
              />
              <InfoDetailItem
                icon={Phone}
                label="رقم الهاتف"
                value={doctor.phone}
              />
              <InfoDetailItem
                icon={MapPin}
                label="العنوان"
                value={
                  `${doctor.address || ""}, ${doctor.city || ""}, ${
                    doctor.state || ""
                  }`.replace(/^,|, $/g, "") || "-"
                }
              />
              <InfoDetailItem
                icon={FaVenusMars}
                label="الجنس"
                value={
                  doctor.gender === "male"
                    ? "ذكر"
                    : doctor.gender === "female"
                    ? "أنثى"
                    : "-"
                }
              />
            </div>
          </InfoCardContainer>

          <InfoCardContainer title="الخبرة المهنية والتعليم" icon={Briefcase}>
            <InfoDetailItem
              icon={CalendarClock}
              label="سنوات الخبرة"
              value={
                doctor.doctorProfile?.experienceYears
                  ? `${doctor.doctorProfile.experienceYears} سنوات`
                  : "-"
              }
            />
            <InfoDetailItem
              icon={MdWork}
              label="مكان العمل الحالي/السابق"
              value={doctor.doctorProfile?.workplace}
            />
            <InfoDetailItem
              icon={FaGraduationCap}
              label="المؤهل العلمي"
              value={doctor.doctorProfile?.degree || "-"}
            />
            {/* يمكنك إضافة المزيد من حقول الخبرة والتعليم هنا */}
          </InfoCardContainer>

          <InfoCardContainer title="النبذة التعريفية" icon={MessageSquareText}>
            {doctor.doctorProfile?.doctorBio ? (
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                {doctor.doctorProfile.doctorBio}
              </p>
            ) : (
              <p className="text-slate-500 dark:text-slate-400 text-center py-4">
                لا توجد نبذة تعريفية مقدمة.
              </p>
            )}
          </InfoCardContainer>

          <InfoCardContainer title="وثائق التحقق والمرفقات" icon={FileText}>
            {loading ? (
              [...Array(2)].map((_, i) => (
                <Skeleton key={i} className="h-12 w-full mb-2" />
              ))
            ) : doctor.doctorProfile?.licenseDocuments &&
              doctor.doctorProfile.licenseDocuments.length > 0 ? (
              <ul className="space-y-3">
                {doctor.doctorProfile.licenseDocuments.map((docUrl, i) => (
                  <li
                    key={i}
                    className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg border border-slate-200 dark:border-slate-600"
                  >
                    <div className="flex items-center gap-2.5 overflow-hidden">
                      <FaFilePdf
                        size={22}
                        className="text-red-500 dark:text-red-400 shrink-0"
                      />
                      <span
                        className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 truncate"
                        title={docUrl.split("/").pop()}
                      >
                        {docUrl.split("/").pop() || `مستند ${i + 1}`}
                      </span>
                    </div>
                    <a
                      href={parseImgUrl(docUrl)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs sm:text-sm font-medium text-primary dark:text-primary-300 hover:underline whitespace-nowrap"
                    >
                      عرض/تحميل
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-slate-500 dark:text-slate-400 text-center py-4">
                لم يتم إرفاق أي وثائق تحقق.
              </p>
            )}
          </InfoCardContainer>
        </div>

        {/* العمود الجانبي للتحليلات والإجراءات */}
        <div className="lg:col-span-1 space-y-6 md:space-y-8">
          <InfoCardContainer
            title="تحليل أولي (بواسطة النظام)"
            icon={Brain}
            titleSize="text-md sm:text-lg"
          >
            {/* قيم أشرطة التقدم هي مثال، يجب أن تأتي من API أو تحليل فعلي */}
            {[
              {
                label: "اكتمال الملف الشخصي",
                percent: doctor.profileCompleteness || 75,
                color: "success",
              },
              {
                label: "تطابق التخصص مع المؤهل",
                percent: doctor.specialtyMatch || 90,
                color: "info",
              },
              {
                label: "تقييم الوثائق المرفقة",
                percent: doctor.documentVerificationScore || 60,
                color: "warning",
              },
            ].map((item, i) => (
              <div key={i} className="mb-3 last:mb-0">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300">
                    {item.label}
                  </span>
                  <span
                    className={`text-xs sm:text-sm font-semibold text-${
                      item.color === "success"
                        ? "green"
                        : item.color === "info"
                        ? "blue"
                        : "amber"
                    }-500`}
                  >
                    {item.percent}%
                  </span>
                </div>
                <Progress
                  progress={item.percent}
                  color={item.color}
                  size="sm"
                  theme={flowbit.progress}
                />
              </div>
            ))}
            <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700">
              <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
                ملاحظات النظام الأولية:
              </h4>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                {doctor.aiNotes ||
                  "جميع المستندات تبدو مكتملة. التخصص يتوافق مع المؤهلات. ينصح بمراجعة الوثائق يدويًا للتحقق النهائي."}
              </p>
            </div>
          </InfoCardContainer>

          <InfoCardContainer
            title="القرار النهائي والتوصيات"
            icon={MessageSquareText}
            titleSize="text-md sm:text-lg"
          >
            <div>
              <Label
                htmlFor="reviewNotes"
                value="ملاحظات المراجع (اختياري للقبول، إلزامي للرفض)"
                className="mb-1.5 block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300"
              />
              <Textarea
                id="reviewNotes"
                theme={flowbit.textarea}
                placeholder="أضف ملاحظاتك أو سبب الرفض هنا..."
                rows={4}
                value={rejectionReason} // استخدام rejectionReason هنا
                onChange={(e) => setRejectionReason(e.target.value)}
                className="!text-sm sm:!text-base mb-4"
              />
              <div className="flex flex-col sm:flex-row gap-3 justify-end">
                <Button
                  color="green"
                  theme={flowbit.button} // استخدام success color
                  onClick={handleApprove}
                  isProcessing={approveLoading}
                  disabled={
                    approveLoading ||
                    rejectLoading ||
                    doctor.doctorProfile?.status === "approved"
                  }
                  className="w-full sm:w-auto !font-semibold group"
                >
                  <CheckCircle
                    size={18}
                    className="ml-2 group-hover:scale-110"
                  />{" "}
                  قبول الطلب
                </Button>
                <Button
                  color="red"
                  theme={flowbit.button} // استخدام failure color
                  onClick={() => setShowRejectModal(true)}
                  disabled={
                    approveLoading ||
                    rejectLoading ||
                    doctor.doctorProfile?.status === "rejected"
                  }
                  className="w-full sm:w-auto !font-semibold group"
                >
                  <XCircle size={18} className="ml-2 group-hover:rotate-6" />{" "}
                  رفض الطلب
                </Button>
              </div>
              {(approveError || rejectError) && (
                <p className="mt-3 text-sm text-red-600 dark:text-red-400 text-center">
                  {approveError || rejectError || "حدث خطأ أثناء معالجة الطلب."}
                </p>
              )}
              {doctor.doctorProfile?.status !== "pending" && (
                <p
                  className="mt-4 text-sm text-center font-medium 
                  ${doctor.doctorProfile?.status === 'approved' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}"
                >
                  هذا الطلب تمت معالجته بالفعل (الحالة:{" "}
                  {doctor.doctorProfile?.status === "approved"
                    ? "مقبول"
                    : "مرفوض"}
                  ).
                </p>
              )}
            </div>
          </InfoCardContainer>
        </div>
      </div>

      {/* نافذة تأكيد الرفض */}
      <Modal
        show={showRejectModal}
        onClose={() => setShowRejectModal(false)}
        size="md"
        popup
        theme={flowbit.modal}
      >
        <ModalHeader className="!border-b-0 !p-3 sm:!p-4 justify-end">
          {/* يمكن وضع زر إغلاق هنا إذا أردت */}
        </ModalHeader>
        <ModalBody className="p-4 sm:p-6 pt-0">
          <div className="text-center">
            <XCircle className="mx-auto mb-3 h-12 w-12 text-red-500 dark:text-red-400" />
            <h3 className="mb-2 text-lg sm:text-xl font-semibold text-slate-800 dark:text-white">
              تأكيد رفض طلب الانضمام
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              سبب الرفض الذي أدخلته سيتم تسجيله. هل أنت متأكد من المتابعة؟
            </p>
            {/* عرض سبب الرفض للمراجعة */}
            {rejectionReason && (
              <div className="mb-4 p-3 bg-slate-50 dark:bg-slate-700 rounded-md text-start">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  السبب المدخل:
                </p>
                <p className="text-sm text-slate-700 dark:text-slate-200 whitespace-pre-line">
                  {rejectionReason}
                </p>
              </div>
            )}
            <div className="flex justify-center gap-3">
              <Button
                color="red"
                theme={flowbit.button}
                onClick={handleReject}
                isProcessing={rejectLoading}
                disabled={rejectLoading || !rejectionReason.trim()}
                className="!font-semibold"
              >
                نعم، تأكيد الرفض
              </Button>
              <Button
                color="gray"
                theme={flowbit.button?.gray}
                onClick={() => setShowRejectModal(false)}
                disabled={rejectLoading}
                className="!font-semibold"
              >
                إلغاء
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}
