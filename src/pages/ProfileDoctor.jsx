import React, { useEffect, useState } from "react";
import {
  Button,
  Rating,
  RatingStar,
  TabItem,
  Tabs,
  Textarea,
  Avatar,
  Spinner,
  Tooltip,
  Card,
  Badge, // Added for reviews
} from "flowbite-react";
import {
  Timer,
  Heart,
  Mail,
  Briefcase,
  GraduationCap,
  DollarSign,
  Info,
  MessageCircle,
  BookOpen,
  Edit3,
  ThumbsUp,
  CalendarDays,
  Star,
  Bookmark,
  Share2,
} from "lucide-react";
import flowbit from "../config/flowbit"; // Make sure path is correct
import { HiUserCircle, HiClipboardList } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import useApiRequest from "../hooks/useApiRequest";
import globalApi from "../utils/globalApi";
import parseImgUrl from "../utils/parseImgUrl";
import Skeleton from "../components/common/Skeleton";
import { Link, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import useToastStore from "../store/toastStore";

// --- Mock Data (for demonstration in Canvas) ---
const mockReviews = [
  {
    name: "محمد بوهالي",
    image: "/doctor1.jpg",
    rating: 4,
    date: "26 أبريل 2025",
    comment:
      "طبيب متمكن وخلوق، تعامل راقٍ وتشخيص دقيق. شعرت باهتمامه الحقيقي بحالتي. العيادة نظيفة والتنظيم ممتاز. أشكركم على الخدمة الرائعة.",
  },
  {
    name: "ليلى حمودي",
    image: "/doctor2.jpg",
    rating: 5,
    date: "15 مارس 2025",
    comment:
      "تجربتي كانت ممتازة، الطبيبة أنصتت لي جيدًا وقدمت لي نصائح مهمة. أجواء العيادة مريحة جدًا.",
  },
  {
    name: "يوسف بن عمر",
    image: "/doctor3.webp",
    rating: 3,
    date: "02 فبراير 2025",
    comment: "الخدمة جيدة عمومًا لكن وقت الانتظار كان طويلًا بعض الشيء.",
  },
];

const mockArticles = [
  {
    title: "كيف تحمي قلبك بعد سن الأربعين؟ نصائح ذهبية",
    image: "/imgs/blogs/heart.jpg",
    tag: "أمراض القلب",
    readTime: "5 دقائق",
  },
  {
    title: "القولون العصبي: الأسباب، الأعراض، والعلاج الطبيعي",
    image: "/imgs/blogs/irritable.jpg",
    tag: "أمراض الجهاز الهضمي",
    readTime: "7 دقائق",
  },
  {
    title: "علامات نقص فيتامين د التي لا يجب تجاهلها",
    image: "/imgs/blogs/vitamin.webp",
    tag: "تغذية",
    readTime: "4 دقائق",
  },
];
// --- End Mock Data ---

// --- Helper Components ---
const dayMap = {
  sun: "الأحد",
  mon: "الاثنين",
  tue: "الثلاثاء",
  wed: "الأربعاء",
  thu: "الخميس",
  fri: "الجمعة",
  sat: "السبت",
};

const FormatAvailability = ({ availability }) => {
  if (!availability || availability.length === 0) {
    return (
      <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
        <CalendarDays size={20} className="text-primaryColor" />
        <span>أوقات العمل غير محددة حاليًا.</span>
      </div>
    );
  }
  const groupedByDay = availability.reduce((acc, slot) => {
    acc[slot.day] = acc[slot.day] || [];
    acc[slot.day].push(`${slot.from} - ${slot.to}`);
    return acc;
  }, {});
  const dayOrder = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  return (
    <div className="space-y-2">
      {dayOrder.map(
        (dayKey) =>
          groupedByDay[dayKey] && (
            <div key={dayKey} className="flex items-start text-sm md:text-base">
              <span className="font-semibold text-primaryColor dark:text-primaryColor-400 w-20 sm:w-24 shrink-0">
                {dayMap[dayKey] || dayKey}:
              </span>
              <span className="text-slate-700 dark:text-slate-300">
                {groupedByDay[dayKey].join(" | ")}
              </span>
            </div>
          )
      )}
    </div>
  );
};

const RenderStars = ({ rating, size = "md" }) => {
  const totalStars = 5;
  const fullStars = Math.round(parseFloat(rating) || 0);
  return (
    <Rating size={size}>
      {[...Array(totalStars)].map((_, i) => (
        <RatingStar
          key={i}
          filled={i < fullStars}
          className={
            i < fullStars
              ? "!text-amber-400"
              : "!text-slate-300 dark:!text-slate-600"
          }
        />
      ))}
    </Rating>
  );
};

const InfoDetailItem = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-3 md:gap-4">
    <Icon
      size={24}
      className="text-primaryColor dark:text-primaryColor-400 mt-1 shrink-0"
    />
    <div>
      <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
      <p className="font-semibold text-md md:text-lg text-slate-700 dark:text-slate-200">
        {value}
      </p>
    </div>
  </div>
);

const ReviewCard = ({ review }) => (
  <Card theme={flowbit.card} className="shadow-md dark:bg-slate-800">
    <div className="flex items-start gap-4">
      <Avatar img={review.image} alt={review.name} rounded bordered size="lg" />
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-1.5">
          <h5 className="text-md md:text-lg font-semibold text-slate-800 dark:text-white">
            {review.name}
          </h5>
          <RenderStars rating={review.rating} size="sm" />
        </div>
        <p className="text-xs text-slate-400 dark:text-slate-500 mb-2">
          {review.date} - {review.time}
        </p>
        <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          {review.comment}
        </p>
      </div>
    </div>
  </Card>
);

const ArticleCard = ({ article }) => (
  <Link
    to="#"
    className="group block bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
  >
    <div className="overflow-hidden h-40">
      <img
        src={article.image}
        alt={article.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
    </div>
    <div className="p-4">
      <Badge color="cyan" size="xs" className="mb-2">
        {article.tag}
      </Badge>
      <h4 className="font-bold text-md text-gray-800 dark:text-white group-hover:text-primaryColor dark:group-hover:text-primaryColor-400 transition-colors">
        {article.title}
      </h4>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
        {article.readTime} قراءة
      </p>
    </div>
  </Link>
);

// --- Main Component ---
export default function ProfileDoctor() {
  const { data: doctorResponse, loading, error, request } = useApiRequest();
  // const { request: toggelRequest } = useApiRequest();

  const { id } = useParams();
  const doctor = doctorResponse?.data;

  const { showToast } = useToastStore();
  useEffect(() => {
    if (id) {
      request(() => globalApi.getDoctorById(id));
    }
  }, [id]);

  if (loading && !doctor) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Spinner size="xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center text-center p-4 text-red-600">
        <AlertCircle size={48} className="mb-4" />
        <h2 className="text-xl font-semibold">خطأ في تحميل البيانات</h2>
        <p>لم نتمكن من جلب بيانات الطبيب. يرجى المحاولة مرة أخرى.</p>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-center p-4">
        <h2 className="text-xl font-semibold">لم يتم العثور على الطبيب</h2>
      </div>
    );
  }

  const doctorName = `د. ${doctor.fullName.first || ""} ${
    doctor.fullName.second || ""
  }`.trim();
  const doctorSpecialty =
    doctor.doctorProfile?.specialization || "التخصص غير محدد";

  // const handleToggelFavorite = async (e) => {
  //   e.preventDefault();
  //   const {
  //     success: toggelSuccess,
  //     data,
  //     error,
  //   } = await toggelRequest(() => globalApi.toggleFavoriteDoctor(doctor._id));

  //   console.log(toggelSuccess);
  //   if (toggelSuccess) {
  //     showToast("success", "تمت اضافة الطبيب الى المفضلة");
  //   } else {
  //     showToast("error", "خطأ اثناء اضافة الطبيب للمفضلة");
  //   }
  // };
  return (
    <div className="bg-slate-50 dark:bg-gray-900 min-h-screen">
      {/* Profile Header Section */}
      <div className="bg-gradient-to-b from-blue-100 via-white to-slate-50 dark:from-primaryColor-900/10 dark:via-gray-900 dark:to-gray-900 pt-10 md:pt-16 pb-8 md:pb-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center sm:items-start gap-5 md:gap-8"
          >
            <Avatar
              img={parseImgUrl(doctor.profileImage)}
              alt={doctorName}
              rounded
              bordered
              color="primary"
              size="xl"
              className="!w-28 !h-28 sm:!w-32 sm:!h-32 md:!w-36 md:!h-36 lg:!w-40 lg:!h-40 flex-shrink-0 shadow-lg !ring-4 ring-white dark:!ring-slate-700"
            />
            <div className="text-center sm:text-right flex-grow">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-800 dark:text-white mb-1">
                {doctorName}
              </h1>
              <p className="text-md sm:text-lg md:text-xl text-primaryColor dark:text-primaryColor-400 font-medium mb-3">
                {doctorSpecialty}
              </p>
              {doctor.doctorProfile?.rating > 0 && (
                <div className="flex items-center justify-center sm:justify-start mb-4">
                  <RenderStars rating={doctor.doctorProfile.rating} size="sm" />
                  <span className="text-xs text-slate-500 dark:text-slate-400 mr-2">
                    ({doctor.doctorProfile.totalReviews || 0} تقييم)
                  </span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-3 mt-4 sm:mt-0 self-center sm:self-start">
              {/* <Button
                theme={flowbit.button}
                color="light"
                size="md"
                className="!p-2.5 !rounded-lg group"
              >
                <Tooltip content="مشاركة الملف الشخصي">
                  <Share2
                    size={20}
                    className="text-slate-500 dark:text-slate-400 group-hover:text-primaryColor transition-colors"
                  />
                </Tooltip>
              </Button>
              <Button
                theme={flowbit.button}
                color="light"
                size="md"
                className="!p-2.5 !rounded-lg group"
                onClick={handleToggelFavorite}
              >
                <Tooltip content="حفظ الطبيب">
                  <Bookmark
                    size={20}
                    className="text-slate-500 dark:text-slate-400 group-hover:text-amber-500 transition-colors"
                  />
                </Tooltip>
              </Button> */}
              <Link
                to={`/doctors/${doctor._id}/book`}
                className="w-full sm:w-auto"
              >
                <Button
                  theme={flowbit.button}
                  color="primary"
                  size="md"
                  className="w-full sm:w-auto !px-5 !font-semibold"
                >
                  <CalendarDays size={18} className="ml-2" /> حجز استشارة
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="container mx-auto px-4 py-8 md:py-10">
        <Tabs aria-label="Doctor profile tabs" theme={flowbit.tab}>
          <TabItem active title="معلومات عامة" icon={Info}>
            <AnimatePresence mode="wait">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10 p-1">
                  <div className="lg:col-span-1">
                    <img
                      src={
                        parseImgUrl(doctor.profileImage) ||
                        "/placeholder-doctor.jpg"
                      }
                      alt={`${doctorName} - صورة رئيسية`}
                      className="w-full h-auto max-h-[450px] object-cover rounded-2xl shadow-lg"
                    />
                  </div>
                  <div className="lg:col-span-2 space-y-5 md:space-y-6">
                    <InfoDetailItem
                      icon={Briefcase}
                      label="التخصص الدقيق"
                      value={doctorSpecialty}
                    />
                    <InfoDetailItem
                      icon={Mail}
                      label="البريد الإلكتروني للتواصل"
                      value={doctor.email}
                    />
                    <InfoDetailItem
                      icon={GraduationCap}
                      label="سنوات الخبرة"
                      value={
                        doctor.doctorProfile?.experienceYears
                          ? `${doctor.doctorProfile.experienceYears} سنة`
                          : "غير محدد"
                      }
                    />
                    <InfoDetailItem
                      icon={DollarSign}
                      label="سعر الكشفية"
                      value={
                        doctor.doctorProfile?.consultationPrice
                          ? `${doctor.doctorProfile.consultationPrice} دج`
                          : "غير محدد"
                      }
                    />
                    <div className="pt-2">
                      <h4 className="font-semibold text-slate-600 dark:text-slate-300 mb-2 flex items-center gap-2">
                        <CalendarDays size={20} className="text-primaryColor" />
                        أوقات العمل
                      </h4>
                      <FormatAvailability
                        availability={doctor.doctorProfile?.availability}
                      />
                    </div>
                    {doctor.doctorProfile?.bookingInstructions && (
                      <div className="pt-2">
                        <h4 className="font-semibold text-slate-600 dark:text-slate-300 mb-2 flex items-center gap-2">
                          <Info size={20} className="text-primaryColor" />
                          تعليمات الحجز
                        </h4>
                        <p className="text-md text-slate-700 dark:text-slate-200 whitespace-pre-line bg-slate-100 dark:bg-slate-800 p-3 rounded-lg border dark:border-slate-700">
                          {doctor.doctorProfile.bookingInstructions}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </TabItem>

          <TabItem title="نبذة تعريفية" icon={HiUserCircle}>
            <AnimatePresence mode="wait">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="max-w-4xl mx-auto"
              >
                <h3 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white mb-6 text-center">
                  عن د. {doctor.fullName.first}
                </h3>
                {doctor.doctorProfile?.doctorBio ? (
                  <p className="text-md md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed md:leading-loose whitespace-pre-line text-justify indent-8">
                    {doctor.doctorProfile.doctorBio}
                  </p>
                ) : (
                  <p className="text-center text-slate-500 dark:text-slate-400 py-8">
                    لا توجد نبذة تعريفية متاحة.
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          </TabItem>

          <TabItem title="التقييمات" icon={ThumbsUp}>
            <AnimatePresence mode="wait">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white mb-8 text-center">
                  تقييمات المرضى
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-4 text-center p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg">
                    <p className="text-5xl font-extrabold text-slate-800 dark:text-white">
                      {(doctor.doctorProfile?.rating || 0).toFixed(1)}
                    </p>
                    <div className="flex justify-center my-2">
                      <RenderStars
                        rating={doctor.doctorProfile?.rating || 0}
                        size="lg"
                      />
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      بناءً على {doctor.doctorProfile?.totalReviews || 0} تقييم
                    </p>
                  </div>
                  <div className="lg:col-span-8">
                    <div className="max-w-2xl mx-auto mb-10 p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg">
                      <h4 className="text-lg font-semibold text-slate-700 dark:text-white mb-3">
                        أضف تقييمك
                      </h4>
                      {/* Add rating stars component here */}
                      <Textarea
                        id="reviewComment"
                        placeholder="اكتب تعليقك هنا لمساعدة الآخرين..."
                        required
                        rows={4}
                        theme={flowbit.textarea}
                        className="!text-base mb-3"
                      />
                      <Button
                        theme={flowbit.button}
                        color="primary"
                        className="w-full sm:w-auto sm:float-left !font-semibold"
                      >
                        <Edit3 size={18} className="ml-2" /> إرسال التقييم
                      </Button>
                    </div>
                    <div className="space-y-6">
                      {mockReviews.length > 0 ? (
                        mockReviews.map((review, index) => (
                          <ReviewCard key={index} review={review} />
                        ))
                      ) : (
                        <p className="text-center text-slate-500 dark:text-slate-400 py-8">
                          كن أول من يضيف تقييمًا!
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </TabItem>

          <TabItem title="مقالات طبية" icon={BookOpen}>
            <AnimatePresence mode="wait">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white mb-8 text-center">
                  مقالات منشورة بواسطة {doctorName}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mockArticles.length > 0 ? (
                    mockArticles.map((article, index) => (
                      <ArticleCard key={index} article={article} />
                    ))
                  ) : (
                    <div className="md:col-span-2 lg:col-span-3 text-center py-12">
                      <BookOpen
                        size={48}
                        className="mx-auto text-slate-300 dark:text-slate-600 mb-3"
                      />
                      <p className="text-slate-500 dark:text-slate-400">
                        لا توجد مقالات منشورة حاليًا.
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </TabItem>
        </Tabs>
      </div>
    </div>
  );
}
