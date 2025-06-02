import {
  Button,
  Rating,
  RatingStar,
  TabItem,
  Tabs,
  Textarea,
} from "flowbite-react";
import { Timer } from "lucide-react";
import flowbit from "../config/flowbit";
import { BiSave } from "react-icons/bi";
import {
  HiAdjustments,
  HiClipboardList,
  HiUserCircle,
  HiOutlineMail,
  HiOutlineInformationCircle,
  HiCurrencyDollar,
} from "react-icons/hi"; // Added HiOutlineInformationCircle
import { MdDashboard } from "react-icons/md";
import BlogCard from "../components/common/BlogCard";
import { FaUserDoctor } from "react-icons/fa6";
import { GrSchedule } from "react-icons/gr";
import useApiRequest from "../hooks/useApiRequest";
import { useEffect } from "react";
import globalApi from "../utils/globalApi";
import parseImgUrl from "../utils/parseImgUrl";
import Skeleton from "../components/common/Skeleton";
import { Link, useParams } from "react-router-dom";

// Static reviews and blogs arrays remain the same...
const reviews = [
  {
    name: "محمد بوهالي",
    image: "/doctor1.jpg",
    rating: 4,
    date: "26 أفريل 2025",
    time: "19:25",
    comment:
      "طبيب متمكن وخلوق، تعامل راقٍ وتشخيص دقيق. شعرت باهتمامه الحقيقي بحالتي. العيادة نظيفة والتنظيم ممتاز. أشكركم على الخدمة الرائعة.",
  },
  {
    name: "ليلى حمودي",
    image: "/doctor2.jpg",
    rating: 5,
    date: "15 مارس 2025",
    time: "10:10",
    comment:
      "تجربتي كانت ممتازة، الطبيبة أنصتت لي جيدًا وقدمت لي نصائح مهمة. أجواء العيادة مريحة جدًا.",
  },
  {
    name: "يوسف بن عمر",
    image: "/doctor3.webp",
    rating: 3,
    date: "02 فيفري 2025",
    time: "14:30",
    comment: "الخدمة جيدة عمومًا لكن وقت الانتظار كان طويلًا بعض الشيء.",
  },
  {
    name: "نسرين زروقي",
    image: "/doctor4.webp",
    rating: 5,
    date: "20 جانفي 2025",
    time: "09:45",
    comment: "أفضل دكتورة زرتها، دقيقة في تشخيصها ومتفهمة جدًا. أوصي بها بشدة.",
  },
  {
    name: "علي عيادي",
    image: "/doctor5.jpg",
    rating: 4,
    date: "12 ديسمبر 2024",
    time: "17:00",
    comment: "العلاج كان فعّال والدكتور محترف. فقط أتمنى تحسين نظام الحجز.",
  },
  {
    name: "سميرة قادري",
    image: "/doctor-hero.png",
    rating: 2,
    date: "03 نوفمبر 2024",
    time: "12:20",
    comment:
      "لم تكن التجربة كما توقعت. شعرت بعدم اهتمام بالتفاصيل، لكن المكان نظيف.",
  },
];

// Helper for day mapping
const dayMap = {
  sun: "الأحد",
  mon: "الاثنين",
  tue: "الثلاثاء",
  wed: "الأربعاء",
  thu: "الخميس",
  fri: "الجمعة",
  sat: "السبت",
};

// Helper function to format availability
const FormatAvailability = ({ availability }) => {
  if (!availability || availability.length === 0) {
    return (
      <p className="font-bold text-lg text-gray-500 hover:text-darkColor">
        أوقات العمل غير معروفة
      </p>
    );
  }

  const groupedByDay = availability.reduce((acc, slot) => {
    acc[slot.day] = acc[slot.day] || [];
    acc[slot.day].push(`من ${slot.from} إلى ${slot.to}`); // Explicit "من - إلى"
    return acc;
  }, {});

  const dayOrder = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

  return (
    <div className="flex flex-col gap-1 text-gray-600">
      {dayOrder.map((dayKey) => {
        if (groupedByDay[dayKey] && groupedByDay[dayKey].length > 0) {
          return (
            <div
              key={dayKey}
              className="flex flex-col sm:flex-row sm:items-start"
            >
              <span className="font-semibold text-primaryColor w-full sm:w-16 mb-1 sm:mb-0 flex-shrink-0">
                {dayMap[dayKey] || dayKey}:
              </span>
              <span className="hover:text-darkColor flex-1 text-sm md:text-base">
                {groupedByDay[dayKey].join("  |  ")}
              </span>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default function ProfileDoctor() {
  const { data: doctor, loading, error, request } = useApiRequest();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      request(() => globalApi.getDoctorById(id));
    }
  }, []);

  const renderStars = (rating) => {
    const totalStars = 5;
    const fullStars = Math.round(rating);
    const stars = [];
    for (let i = 1; i <= totalStars; i++) {
      stars.push(<RatingStar key={i} filled={i <= fullStars} />);
    }
    return stars;
  };

  if (error) {
    return (
      <div className="container text-center py-10 text-red-500 h-[400px]">
        حدث خطأ أثناء تحميل بيانات الطبيب.
      </div>
    );
  }

  return (
    <div>
      <div className="container pb-16">
        <div className="w-full mt-7 flex flex-col items-center lg:items-start lg:flex-row justify-between gap-5">
          <div className="flex items-center gap-5">
            {loading ? (
              <Skeleton className="w-32 h-32 rounded-full" />
            ) : (
              doctor &&
              doctor.data && (
                <img
                  src={parseImgUrl(doctor.data.profileImage)}
                  alt="doctor profile"
                  className="w-32 h-32 rounded-full object-cover"
                />
              )
            )}
            <div>
              {loading ? (
                <>
                  <Skeleton className="w-48 h-7 mb-3" />
                  <Skeleton className="w-40 h-5" />
                </>
              ) : (
                doctor &&
                doctor.data && (
                  <>
                    <h2 className="text-xl font-bold mb-3 text-gray-600">
                      {`${doctor.data.fullName.first} ${doctor.data.fullName.second}`}
                    </h2>
                    <p className="text-gray-400">
                      {doctor.data.doctorProfile?.specialization ||
                        "التخصص غير محدد"}
                    </p>
                  </>
                )
              )}
            </div>
          </div>

          <div className="flex gap-5 ">
            <Link to={`/doctors/${doctor?.data?._id}/book`}>
              <Button theme={flowbit.button} color="primary" className="w-44">
                حجز استشارة
              </Button>
            </Link>

            <Button theme={flowbit.button} color="noColor" className="p-1">
              <BiSave className="text-gray-500" size={25} />
            </Button>
          </div>
        </div>
        <div className="mt-5">
          <Tabs
            aria-label="Tabs with underline"
            variant="underline"
            theme={flowbit.tab}
          >
            <TabItem active title="معلومات عامة" icon={HiUserCircle}>
              <h3 className="text-xl font-bold text-primaryColor mb-10 text-center">
                معلومات عامة
              </h3>
              <div className="md:flex gap-10">
                <div className="w-full h-72 md:w-72 md:h-96 mb-5 md:mb-0">
                  {loading ? (
                    <Skeleton className="object-cover w-full h-full rounded" />
                  ) : doctor && doctor.data ? (
                    <img
                      src={parseImgUrl(doctor.data.profileImage)}
                      alt="Doctor Main"
                      className="object-cover w-full h-full rounded"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded">
                      <p className="text-gray-500">لا توجد صورة</p>
                    </div>
                  )}
                </div>
                <div className="w-full md:w-auto p-5 flex flex-col gap-6 items-start">
                  {/* Doctor Name */}
                  <div className="flex gap-5 justify-start items-center w-full">
                    <FaUserDoctor
                      size={27}
                      className="text-primaryColor flex-shrink-0"
                    />
                    {loading ? (
                      <Skeleton className="w-48 h-6" />
                    ) : (
                      <p className="font-bold text-lg text-gray-500 hover:text-darkColor">
                        {doctor && doctor.data
                          ? `د. ${doctor.data.fullName.first} ${doctor.data.fullName.second}`
                          : "اسم الطبيب"}
                      </p>
                    )}
                  </div>
                  {/* Email */}
                  <div className="flex gap-5 justify-start items-center w-full">
                    <HiOutlineMail
                      size={27}
                      className="text-primaryColor flex-shrink-0"
                    />
                    {loading ? (
                      <Skeleton className="w-52 h-6" />
                    ) : (
                      <p className="font-bold text-lg text-gray-500 hover:text-darkColor break-all">
                        {doctor && doctor.data
                          ? doctor.data.email
                          : "البريد الإلكتروني غير متوفر"}
                      </p>
                    )}
                  </div>
                  {/* Specialization */}
                  <div className="flex gap-5 justify-start items-center w-full">
                    <FaUserDoctor
                      size={27}
                      className="text-primaryColor flex-shrink-0"
                    />{" "}
                    {/* Icon can be more specific */}
                    {loading ? (
                      <Skeleton className="w-40 h-6" />
                    ) : (
                      <p className="font-bold text-lg text-gray-500 hover:text-darkColor">
                        {doctor && doctor.data && doctor.data.doctorProfile
                          ? doctor.data.doctorProfile.specialization
                          : "التخصص"}
                      </p>
                    )}
                  </div>
                  {/* Experience */}
                  <div className="flex gap-5 justify-start items-center w-full">
                    <Timer
                      size={27}
                      className="text-primaryColor flex-shrink-0"
                    />
                    {loading ? (
                      <Skeleton className="w-60 h-6" />
                    ) : (
                      <p className="font-bold text-lg text-gray-500 hover:text-darkColor">
                        {doctor && doctor.data && doctor.data.doctorProfile
                          ? `+${
                              doctor.data.doctorProfile.experienceYears
                            } سنة خبرة في مجال ${
                              doctor.data.doctorProfile.specialization || "الطب"
                            }`
                          : "سنوات الخبرة"}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-5 justify-start items-center w-full">
                    <HiCurrencyDollar
                      size={27}
                      className="text-primaryColor flex-shrink-0"
                    />
                    {loading ? (
                      <Skeleton className="w-60 h-6" />
                    ) : (
                      <p className="font-bold text-lg text-gray-500 hover:text-darkColor">
                        {doctor &&
                        doctor.data &&
                        doctor.data.doctorProfile.consultationPrice
                          ? `${doctor.data.doctorProfile.consultationPrice} دج`
                          : "السعر غير محدد"}
                      </p>
                    )}
                  </div>
                  {/* Availability */}
                  <div className="flex gap-5 justify-start items-start w-full">
                    <GrSchedule
                      size={27}
                      className="text-primaryColor mt-1 flex-shrink-0"
                    />
                    <div className="w-full">
                      {loading ? (
                        <Skeleton className="w-full h-24" />
                      ) : doctor && doctor.data && doctor.data.doctorProfile ? (
                        <FormatAvailability
                          availability={doctor.data.doctorProfile.availability}
                        />
                      ) : (
                        <p className="font-bold text-lg text-gray-500 hover:text-darkColor">
                          أوقات العمل غير معروفة
                        </p>
                      )}
                    </div>
                  </div>
                  {/* Booking Instructions */}
                  {loading &&
                  (!doctor ||
                    !doctor.data ||
                    !doctor.data.doctorProfile ||
                    !doctor.data.doctorProfile.bookingInstructions) ? (
                    <div className="flex gap-5 justify-start items-start w-full">
                      <HiOutlineInformationCircle
                        size={27}
                        className="text-primaryColor mt-1 flex-shrink-0"
                      />
                      <Skeleton className="w-full h-12" />
                    </div>
                  ) : (
                    doctor &&
                    doctor.data &&
                    doctor.data.doctorProfile &&
                    doctor.data.doctorProfile.bookingInstructions && (
                      <div className="flex gap-5 justify-start items-start w-full">
                        <HiOutlineInformationCircle
                          size={27}
                          className="text-primaryColor mt-1 flex-shrink-0"
                        />
                        <div className="w-full">
                          <h4 className="font-semibold text-md text-primaryColor mb-1">
                            تعليمات الحجز:
                          </h4>
                          <p className="text-sm md:text-base text-gray-600 hover:text-darkColor whitespace-pre-line">
                            {doctor.data.doctorProfile.bookingInstructions}
                          </p>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </TabItem>
            {/* Medical Articles Tab remains the same */}
            <TabItem title="مقالات طبية" icon={MdDashboard}>
              <h3 className="text-xl font-bold text-primaryColor text-center mb-5">
                مقالات طبية
              </h3>
              <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-center">
                <p>هذا القسم غير متوفر حاليا</p>
              </div>
            </TabItem>
            {/* Ratings Tab remains the same */}
            <TabItem title="التقييمات" icon={HiAdjustments}>
              <h3 className="text-xl font-bold text-primaryColor text-center mb-5">
                التقييمات
              </h3>
              <div>
                <div className="text-center text-[35px] font-bold text-secondaryColor mb-5">
                  {loading ? (
                    <>
                      <Skeleton className="w-12 h-10 inline-block" />
                      <span className="font-light"> | </span>
                      <Skeleton className="w-24 h-10 inline-block" />
                    </>
                  ) : (
                    doctor &&
                    doctor.data &&
                    doctor.data.doctorProfile && (
                      <>
                        <span>
                          {(doctor.data.doctorProfile.rating || 0).toFixed(1)}
                        </span>
                        <span className="font-light"> | </span>
                        <span>
                          {doctor.data.doctorProfile.totalReviews || 0} مقيم
                        </span>
                      </>
                    )
                  )}
                </div>
                <div className="flex justify-center mb-5">
                  <Rating className="mb-2" size="lg">
                    {loading
                      ? [...Array(5)].map((_, i) => (
                          <Skeleton
                            key={i}
                            className="w-8 h-8 rounded-full mx-0.5"
                          />
                        ))
                      : doctor && doctor.data && doctor.data.doctorProfile
                      ? renderStars(doctor.data.doctorProfile.rating || 0)
                      : renderStars(0)}
                  </Rating>
                </div>
                <div className="mb-5">
                  <h3 className="text-lg font-bold text-primaryColor mb-5">
                    أضف تقييمك
                  </h3>
                  <Textarea
                    className="mb-3"
                    id="comment"
                    placeholder="أكتب تقييم للطبيب"
                    required
                    rows={4}
                  />
                  <Button
                    className="w-32 ms-auto"
                    theme={flowbit.button}
                    color="primary"
                    pill
                  >
                    إرسال
                  </Button>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primaryColor mb-5">
                    تقييم العملاء
                  </h3>
                  <div className="flex flex-col gap-5">
                    {reviews.map((ele, index) => (
                      <div
                        className="p-4 rounded-lg shadow-md border hover:bg-gray-100"
                        key={index}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-5">
                            <img
                              className="w-16 h-16 rounded-full object-cover"
                              src={ele.image}
                              alt={ele.name}
                            />
                            <div className="flex flex-col gap-2">
                              <p className="text-lg font-bold text-secondaryColor">
                                {ele.name}
                              </p>
                              <Rating className="mb-2" size="sm">
                                {renderStars(ele.rating)}
                              </Rating>
                            </div>
                          </div>
                          <div className="border shadow-lg text-sm px-3 py-1 rounded-lg text-gray-500">
                            <span>{ele.date}</span>
                            <span> | </span>
                            <span>{ele.time}</span>
                          </div>
                        </div>
                        <div className="ps-20">{ele.comment}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabItem>
            {/* Overview Tab remains the same */}
            <TabItem title="نبذة عامة" icon={HiClipboardList}>
              <h3 className="text-xl font-bold text-primaryColor text-center mb-5">
                نبذة عامة
              </h3>
              {loading ? (
                <>
                  <Skeleton className="w-full h-8 mb-2" />
                  <Skeleton className="w-full h-8 mb-2" />
                  <Skeleton className="w-3/4 h-8" />
                </>
              ) : (
                <p className="leading-8 indent-8">
                  {doctor && doctor.data && doctor.data.doctorProfile
                    ? doctor.data.doctorProfile.doctorBio
                    : "لا توجد نبذة متوفرة حاليًا."}
                </p>
              )}
            </TabItem>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
