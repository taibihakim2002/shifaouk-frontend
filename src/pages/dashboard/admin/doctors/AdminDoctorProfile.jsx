import { FaCircleCheck, FaUserDoctor } from "react-icons/fa6";
import DashPageHeader from "../../../../components/dashboard/common/DashPageHeader";
import { Button, Label, Select, TextInput, Textarea } from "flowbite-react";
import flowbit from "../../../../config/flowbit";
import { FaSave, FaUser } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { MdEmail } from "react-icons/md";
import { Phone } from "lucide-react";
import { BiSolidFilePdf } from "react-icons/bi";
import useApiRequest from "../../../../hooks/useApiRequest";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import globalApi from "../../../../utils/globalApi";
import Skeleton from "../../../../components/common/Skeleton";
import parseImgUrl from "../../../../utils/parseImgUrl";
import { CgClose } from "react-icons/cg";
import formatDateTime from "../../../../utils/formatDateTime";
import useToastStore from "../../../../store/toastStore";
import Loading from "../../../../components/common/Loading";
import states from "../../../../data/states";
import specializations from "../../../../data/specializations";

export default function AdminDoctorProfile() {
  const { id } = useParams();
  const { showToast } = useToastStore();
  const [data, setData] = useState({
    name: "",
    prename: "",
    email: "",
    phone: "",
    state: "",
    city: "",
    gender: "",
    address: "",
    specialization: "",
    experienceYears: "",
    workplace: "",
    doctorBio: "",
  });

  const {
    data: doctorData,
    error: doctorError,
    loading: doctorLoading,
    request: doctorRequest,
  } = useApiRequest();

  const {
    data: updateData,
    error: updateError,
    loading: updateLoading,
    request: updateRequest,
  } = useApiRequest();
  useEffect(() => {
    doctorRequest(() => globalApi.getDoctorById(id));
  }, [id]);
  useEffect(() => {
    if (doctorData?.data) {
      const fetched = doctorData.data;
      setData({
        name: fetched?.fullName?.first || "",
        prename: fetched?.fullName?.second || "",
        email: fetched?.email || "",
        phone: fetched?.phone || "",
        state: fetched?.state || "",
        city: fetched?.city || "",
        gender: fetched?.gender || "",
        address: fetched?.address || "",
        specialization: fetched?.doctorProfile?.specialization || "",
        experienceYears: fetched?.doctorProfile?.experienceYears || "",
        workplace: fetched?.doctorProfile?.workplace || "",
        doctorBio: fetched?.doctorProfile?.doctorBio || "",
      });
    }
  }, [doctorData]);
  const handleChange = (e) => {
    const { id, value } = e.target;
    setData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async () => {
    const payload = {
      fullName: { first: data.name, second: data.prename },
      email: data.email,
      phone: data.phone,
      state: data.state,
      city: data.city,
      gender: data.gender,
      address: data.address,
      doctorProfile: {
        specialization: data.specialization,
        experienceYears: data.experienceYears,
        workplace: data.workplace,
        doctorBio: data.doctorBio,
      },
    };

    const {
      success,
      data: updateData,
      error: updateError,
    } = await updateRequest(() => globalApi.updateDoctor(id, payload));

    if (success) {
      console.log(updateData);
      showToast("success", "تم تحديث البيانات بنجاح");
    } else {
      showToast("error", "خطأ اثناء تحديث البيانات");
    }
  };

  if (doctorLoading) return <Loading />;

  return (
    <div>
      <DashPageHeader Icon={FaUserDoctor} title="تفاصيل الطبيب" />
      {!doctorError ? (
        <>
          <div className="p-5 border rounded-lg mb-10">
            <div className="mb-10 flex flex-col gap-5 lg:flex-row justify-between items-center rounded-lg">
              <div className="flex gap-5 items-center">
                {doctorLoading ? (
                  <Skeleton className="w-28 h-28 rounded-full" />
                ) : doctorData?.data?.profileImage ? (
                  <img
                    src={parseImgUrl(doctorData?.data?.profileImage)}
                    alt="doctor"
                    className="w-28 h-28 rounded-full object-cover"
                  />
                ) : (
                  ""
                )}

                <div className="flex flex-col gap-3">
                  <div className="flex gap-4 items-center">
                    {doctorLoading ? (
                      <Skeleton className="w-72 h-10" />
                    ) : doctorData?.data?.fullName ? (
                      <h3 className="text-xl text-gray-600 font-bold">
                        {doctorData?.data?.fullName?.first}{" "}
                        {doctorData?.data?.fullName?.second}
                      </h3>
                    ) : (
                      <h3>غير متوفر</h3>
                    )}

                    <p className="text-sm px-2 py-1 text-[#0D99FF] bg-[#0D99FF44] rounded-lg ">
                      طبيب
                    </p>
                  </div>
                  <div className="flex gap-4 items-center">
                    {doctorLoading ? (
                      <Skeleton className="w-32 h-10" />
                    ) : doctorData?.data?.doctorProfile.status ===
                      "approved" ? (
                      <div className="flex items-center gap-2 text-[#25A85C] bg-[#25A85C44] px-2 lg:px-4 py-2 text-[13px] lg:text-sm rounded-lg">
                        <span>
                          <FaCircleCheck size={18} className="" />
                        </span>
                        <span>حساب مفعل</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-[#ff2d2d] bg-[#ff2d2d44] px-2 lg:px-4 py-2 text-[13px] lg:text-sm rounded-lg">
                        <span>
                          <CgClose size={18} className="" />
                        </span>
                        <span>حساب غير مفعل</span>
                      </div>
                    )}

                    <div className="text-[12px] lg:text-sm text-gray-400">
                      <span className="font-bold text-gray-600">
                        تم التسجيل:
                      </span>
                      {doctorLoading ? (
                        <Skeleton className="w-72 h-10" />
                      ) : doctorData?.data?.createdAt ? (
                        <p>
                          {formatDateTime(doctorData?.data?.createdAt, "date")}
                        </p>
                      ) : (
                        <p>غير محدد</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <Button
                theme={flowbit.button}
                color="primary"
                className="flex gap-2"
                onClick={handleSubmit}
              >
                <span>
                  <FaSave />
                </span>
                <span> حفظ التغيرات</span>
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16 mb-5">
              <div>
                <h3 className="text-gray-600 mb-5">المعلومات العامة</h3>
                <div className="flex flex-col gap-1 mb-3">
                  <Label htmlFor="name" className="text-gray-400">
                    الاسم
                  </Label>
                  <TextInput
                    id="name"
                    icon={FiUser}
                    type="text"
                    value={data.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col gap-1 mb-3">
                  <Label htmlFor="name" className="text-gray-400">
                    اللقب
                  </Label>
                  <TextInput
                    id="prename"
                    icon={FaUser}
                    type="text"
                    value={data.prename}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col gap-1 mb-3">
                  <Label htmlFor="name" className="text-gray-400">
                    البريد الالكتروني
                  </Label>
                  <TextInput
                    id="email"
                    icon={MdEmail}
                    type="text"
                    value={data.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col gap-1 mb-3">
                  <Label htmlFor="name" className="text-gray-400">
                    رقم الهاتف
                  </Label>
                  <TextInput
                    id="phone"
                    icon={Phone}
                    type="text"
                    value={data.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col gap-1 mb-3">
                  <Label htmlFor="name" className="text-gray-400">
                    الجنس
                  </Label>
                  <select
                    id="gender"
                    className="border rounded-lg p-1 bg-gray-50 focus:outline-blue-400"
                    value={data.gender}
                    onChange={handleChange}
                  >
                    <option value="ذكر">ذكر</option>
                    <option value="انثى">انثى</option>
                  </select>
                </div>
              </div>
              <div>
                <h3 className="text-gray-600 mb-5">معلومات اضافية </h3>
                <div className="flex gap-2 items-center">
                  <div className="flex flex-1 flex-col gap-1 mb-3">
                    <Label htmlFor="state" className="text-gray-400">
                      الولاية
                    </Label>
                    <select
                      name="state"
                      id="state"
                      value={data.state}
                      onChange={handleChange}
                      className="p-1 border rounded-lg focus:outline-blue-400 bg-gray-50"
                    >
                      <option value="">اختر ولاية</option>
                      {states.map((ele, index) => (
                        <option key={index} value={ele.name}>
                          {ele.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col gap-1 mb-3">
                    <Label htmlFor="city" className="text-gray-400">
                      البلدية
                    </Label>
                    <input
                      className="p-2 border rounded-lg focus:outline-blue-400 bg-gray-50 text-sm"
                      id="city"
                      type="text"
                      value={data.city}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1 mb-3">
                  <Label htmlFor="address" className="text-gray-400">
                    العنوان
                  </Label>
                  <TextInput
                    id="address"
                    type="text"
                    value={data.address}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col gap-1 mb-3">
                  <Label htmlFor="name" className="text-gray-400">
                    التخصص
                  </Label>
                  <select
                    className="w-full border text-sm p-1 rounded-md bg-gray-50 text-gray-900 border-gray-300 "
                    id="specialization"
                    required
                    defaultValue={data.specialization}
                    onChange={handleChange}
                  >
                    {specializations.map((ele) => (
                      <option key={ele.value} value={ele.value}>
                        {ele.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-1 mb-3">
                  <Label htmlFor="name" className="text-gray-400">
                    سنوات الخبرة
                  </Label>
                  <TextInput
                    id="experienceYears"
                    type="text"
                    value={data.experienceYears}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col gap-1 mb-3">
                  <Label htmlFor="name" className="text-gray-400">
                    مكان العمل
                  </Label>
                  <TextInput
                    id="workplace"
                    type="text"
                    value={data.workplace}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <h3 className="text-gray-600 mb-5">نبذة عامة </h3>
                <div className="flex flex-col gap-1 mb-3">
                  <Label htmlFor="name" className="text-gray-400">
                    نبذة عامة عن الطبيب
                  </Label>
                  <Textarea
                    id="doctorBio"
                    type="text"
                    rows={12}
                    value={data.doctorBio}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="border rounded-lg p-5">
            <h3 className="text-gray-600 font-bold mb-5">وثائق التحقق</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              <div className="flex justify-between items-center p-2 border rounded-lg">
                <div className="flex gap-2 items-center">
                  <BiSolidFilePdf size={25} className="text-[#F50000]" />
                  <p className="text-sm text-gray-400"> شهادة البكالوريا.pdf</p>
                </div>
                <a
                  href={parseImgUrl(
                    doctorData?.data?.doctorProfile?.licenseDocuments[0]
                  )}
                  className="text-sm font-bold text-primaryColor"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  تحميل
                </a>
              </div>
              <div className="flex justify-between items-center p-2 border rounded-lg">
                <div className="flex gap-2 items-center">
                  <BiSolidFilePdf size={25} className="text-[#F50000]" />
                  <p className="text-sm text-gray-400">رخصة مزاولة .pdf</p>
                </div>
                <a
                  href={parseImgUrl(
                    doctorData?.data?.doctorProfile?.licenseDocuments[1]
                  )}
                  className="text-sm font-bold text-primaryColor"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  تحميل
                </a>
              </div>
              <div className="flex justify-between items-center p-2 border rounded-lg">
                <div className="flex gap-2 items-center">
                  <BiSolidFilePdf size={25} className="text-[#F50000]" />
                  <p className="text-sm text-gray-400">شهادة عمل.pdf</p>
                </div>
                <a
                  href={parseImgUrl(
                    doctorData?.data?.doctorProfile?.licenseDocuments[2]
                  )}
                  className="text-sm font-bold text-primaryColor"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  تحميل
                </a>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>حدث خطأ اثناء تحميل البيانات</p>
      )}
    </div>
  );
}
