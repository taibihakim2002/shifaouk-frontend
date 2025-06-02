import { FaRegNoteSticky, FaUserDoctor } from "react-icons/fa6";
import DashPageHeader from "../../../../components/dashboard/common/DashPageHeader";
import { FaGraduationCap } from "react-icons/fa";
import { BiSolidFilePdf } from "react-icons/bi";
import { Button, Label, Progress, Spinner, Textarea } from "flowbite-react";
import flowbit from "../../../../config/flowbit";
import { MdWork } from "react-icons/md";
import { PiStarFourFill } from "react-icons/pi";
import useApiRequest from "../../../../hooks/useApiRequest";
import { useEffect, useState } from "react";
import globalApi from "../../../../utils/globalApi";
import { useNavigate, useParams } from "react-router-dom";
import Skeleton from "../../../../components/common/Skeleton";
import parseImgUrl from "../../../../utils/parseImgUrl";
import useToastStore from "../../../../store/toastStore";

export default function JoiningRequest() {
  const { requestId } = useParams();
  const { showToast } = useToastStore();
  const navigate = useNavigate();
  const { request, data, loading, error } = useApiRequest();
  const {
    request: approveRequest,
    data: approveData,
    loading: approveLoading,
    error: approveError,
  } = useApiRequest();
  const {
    request: rejectRequest,
    data: rejectData,
    loading: rejectLoading,
    error: rejectError,
  } = useApiRequest();
  const [doctor, setDoctor] = useState(null);
  const [rejectReasen, setRejectReasen] = useState("");
  useEffect(() => {
    if (requestId) {
      request(() => globalApi.getDoctorByRequestId(requestId));
    }
  }, [requestId]);

  useEffect(() => {
    if (data) {
      setDoctor(data?.data);
    }
  }, [data]);

  const handleReject = async () => {
    const reason = { reason: rejectReasen };

    const { success, error } = await rejectRequest(() =>
      globalApi.setRejectDoctor(doctor?._id, rejectReasen)
    );

    if (success) {
      showToast("success", "تم رفض الطبيب بنجاح");
      navigate("/dashboard/doctors/requests");
    } else {
      showToast("error", error);
    }
  };
  const handleApprove = async () => {
    const { success, error } = await approveRequest(() =>
      globalApi.setApproveDoctor(doctor?._id)
    );

    if (success) {
      showToast("success", "تم قبول الطبيب بنجاح");
      navigate("/dashboard/doctors/requests");
    } else {
      showToast("error", error);
    }
  };

  return (
    <div>
      <DashPageHeader
        Icon={FaUserDoctor}
        title="مراجعة طلب انضمام طبيب "
        description="بامكانك الاطلاع على كل معلومات الطلب ومراجعته"
      />

      {!error ? (
        <>
          <div className="columns-1 md:columns-2 gap-10 p-6 mb-10">
            <div className="break-inside-avoid mb-4 border bg-gray-50 rounded-lg p-5">
              <div className="flex justify-center items-center gap-6 mb-5">
                {loading ? (
                  <Skeleton className="w-14 h-14 rounded-full" />
                ) : (
                  <img
                    src={`${
                      (doctor?.profileImage &&
                        parseImgUrl(doctor?.profileImage)) ||
                      "doctor1.jpg"
                    }`}
                    className="w-14 h-14 rounded-full object-cover"
                    alt=""
                  />
                )}
                {loading ? (
                  <Skeleton className="h-6 w-40" />
                ) : (
                  <h3 className="text-lg font-bold text-gray-600">
                    د. {doctor?.fullName?.second} {doctor?.fullName?.first}
                  </h3>
                )}
              </div>
              <div className="text-gray-400 text-sm space-y-4">
                <p className="flex gap-5 items-center">
                  <span>البريد الإلكتروني:</span>
                  {loading ? (
                    <Skeleton className="h-4 w-48" />
                  ) : (
                    <span>{doctor?.email}</span>
                  )}
                </p>
                <p className="flex gap-5 items-center">
                  <span>رقم الهاتف:</span>
                  {loading ? (
                    <Skeleton className="h-4 w-36" />
                  ) : (
                    <span>{doctor?.phone}</span>
                  )}
                </p>
                <p className="flex gap-5 items-center">
                  <span>العنوان:</span>
                  {loading ? (
                    <Skeleton className="h-4 w-52" />
                  ) : (
                    <span>
                      {doctor?.address} {doctor?.city} {doctor?.state}
                    </span>
                  )}
                </p>
                <p className="flex gap-5 items-center">
                  <span>الجنس:</span>
                  {loading ? (
                    <Skeleton className="h-4 w-52" />
                  ) : (
                    <span>{doctor?.gender}</span>
                  )}
                </p>
              </div>
            </div>

            {/* الخبرة المهنية */}
            <div className="border break-inside-avoid mb-4 bg-gray-50 rounded-lg p-5">
              <div className="flex justify-center items-center gap-6 mb-5">
                <MdWork size={22} className="text-primaryColor" />
                <h3 className="text-lg font-bold text-gray-600">
                  الخبرة المهنية
                </h3>
              </div>
              <div className="text-gray-400 text-sm space-y-4">
                <p className="flex gap-5 items-center">
                  <span>سنوات الخبرة:</span>
                  {loading ? (
                    <Skeleton className="h-4 w-10" />
                  ) : (
                    <span>{doctor?.doctorProfile?.experienceYears} سنوات</span>
                  )}
                </p>
                <p className="flex gap-5 items-center">
                  <span>مكان العمل:</span>
                  {loading ? (
                    <Skeleton className="h-4 w-48" />
                  ) : (
                    <span>{doctor?.doctorProfile?.workplace}</span>
                  )}
                </p>
              </div>
            </div>

            {/* تحليل الذكاء الاصطناعي */}
            <div className="border break-inside-avoid mb-4 bg-gray-50 rounded-lg p-5">
              <div className="flex justify-center items-center gap-6 mb-5">
                <PiStarFourFill size={22} className="text-primaryColor" />
                <h3 className="text-lg font-bold text-gray-600">
                  تحليل الذكاء الاصطناعي
                </h3>
              </div>
              {[45, 88, 100, 66].map((percent, i) => (
                <div key={i} className="flex flex-col gap-1 mb-2">
                  <div className="flex justify-between items-center">
                    <p className="text-sm">المؤشر {i + 1}</p>
                    <p className="text-sm">{percent}%</p>
                  </div>
                  <Progress progress={percent} />
                </div>
              ))}
            </div>
            {/* وثائق التحقق */}
            <div className="border break-inside-avoid mb-4 bg-gray-50 rounded-lg p-5">
              <div className="flex justify-center items-center gap-6 mb-10">
                <FaGraduationCap size={33} className="text-primaryColor" />
                <h3 className="text-lg font-bold text-gray-600">
                  وثائق التحقق
                </h3>
              </div>
              <div className="flex flex-col gap-5">
                {loading
                  ? [...Array(3)].map((_, i) => (
                      <Skeleton key={i} className="h-16 w-full" />
                    ))
                  : doctor?.doctorProfile?.licenseDocuments?.map((doc, i) => (
                      <div
                        key={i}
                        className="flex justify-between items-center p-2 border rounded-lg"
                      >
                        <div className="flex gap-2 items-center">
                          <BiSolidFilePdf
                            size={25}
                            className="text-[#F50000]"
                          />
                          <p className="text-sm text-gray-400">
                            {doc.split("/").pop()}
                          </p>
                        </div>
                        <a
                          href={parseImgUrl(doc)}
                          className="text-sm font-bold text-primaryColor"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          تحميل
                        </a>
                      </div>
                    ))}
              </div>
            </div>

            {/* ملاحظات الذكاء الاصطناعي */}
            <div className="border break-inside-avoid mb-4 bg-gray-50 rounded-lg p-5">
              <div className="flex justify-center items-center gap-6 mb-8">
                <FaRegNoteSticky size={33} className="text-primaryColor" />
                <h3 className="text-lg font-bold text-gray-600">
                  ملاحظات الذكاء الاصطناعي
                </h3>
              </div>
              <p className="flex flex-col gap-5 p-2 text-gray-600 leading-10">
                جميع المستندات مكتملة وصحيحة. التخصص مطلوب في المنصة ويتوافق مع
                الخلفية التعليمية.
              </p>
            </div>
            <div className="flex flex-col gap-5">
              <div className="border break-inside-avoid bg-gray-50 dark:bg-gray-700/50 rounded-lg p-5">
                <div className="flex justify-center items-center gap-3 mb-4">
                  <FaUserDoctor
                    size={28}
                    className="text-primaryColor dark:text-sky-400"
                  />
                  <h3 className="text-md font-bold text-gray-700 dark:text-gray-200">
                    النبذة التعريفية للطبيب
                  </h3>
                </div>
                {loading ? (
                  <Skeleton className="w-full h-10" />
                ) : (
                  <p className="p-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line">
                    {doctor?.doctorProfile?.doctorBio || "لا توجد بيانات"}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="border rounded-lg p-5">
            <h3 className="text-md lg:text-lg font-bold text-gray-600 mb-5">
              التوصيات والقرار
            </h3>
            <Label htmlFor="pio" className="mb-2">
              ملاحظات المراجعة
            </Label>
            <Textarea
              className="mt-2 mb-5"
              id="pio"
              placeholder="اضف ملاحظاتك هنا..."
              rows={4}
              onChange={(e) => setRejectReasen(e.target.value)}
              required
            />
            <div className="flex gap-3 justify-end">
              <Button
                theme={flowbit.button}
                color="red"
                outline
                onClick={handleReject}
                disabled={rejectLoading}
              >
                {rejectLoading && (
                  <Spinner className="me-2" color="info" size="sm" />
                )}
                رفض الطلب
              </Button>
              <Button
                theme={flowbit.button}
                color="green"
                onClick={handleApprove}
                disabled={approveLoading}
              >
                {approveLoading && (
                  <Spinner className="me-2" color="info" size="sm" />
                )}
                قبول الطلب
              </Button>
              {/* <Button theme={flowbit.button} color="yellow">
                طلب توضيح
              </Button> */}
            </div>
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center h-96">
          خطأ في تحميل البيانات
        </div>
      )}
    </div>
  );
}
