import { MdReviews } from "react-icons/md";
import SectionHeader from "../common/SectionHeader";
import { Button } from "flowbite-react";
import flowbit from "../../config/flowbit";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

const reviews = [
  {
    rating: 4,
    review:
      "الخدمة جيدة جدًا وسهلة الاستخدام، تمكنت من التواصل مع طبيب مختص في دقائق فقط دون الحاجة إلى التنقل. الدعم الفني كان متعاونًا جدًا أيضًا.",
    name: "أمينة عبد القادر",
    from: "تلمسان - الجزائر",
    bgColor: "#E1F0FF",
  },
  {
    rating: 4,
    review:
      "الخدمة جيدة جدًا وسهلة الاستخدام، تمكنت من التواصل مع طبيب مختص في دقائق فقط دون الحاجة إلى التنقل. الدعم الفني كان متعاونًا جدًا أيضًا.",
    name: "أمينة عبد القادر",
    from: "تلمسان - الجزائر",
    bgColor: "#E1F0FF",
  },
  {
    rating: 5,
    review:
      "أنا من الأشخاص الذين يترددون في استخدام الخدمات الإلكترونية، لكن هذا الموقع غير رأيي تمامًا. حجزت موعدًا وتمت الاستشارة بكل احترافية وراحة.",
    name: "هشام بوزيد",
    from: "باتنة - الجزائر",
    bgColor: "#DFFFE0",
  },
  {
    rating: 5,
    review:
      "فكرة رائعة جدًا وتم تنفيذها بشكل ممتاز. واجهة الموقع أنيقة وسهلة التصفح، وتمكنت من إيجاد الطبيب المناسب بسرعة. خدمة تستحق الإشادة والتقدير.",
    name: "ليلى مسعود",
    from: "وهران - الجزائر",
    bgColor: "#F0E7FF",
  },
  {
    rating: 4,
    review:
      "استفدت كثيرًا من الاستشارات الطبية عبر الموقع، خاصة مع ضيق الوقت وصعوبة الذهاب للعيادات. أتمنى فقط إضافة مزيد من التخصصات في المستقبل.",
    name: "كمال رفيق",
    from: "سطيف - الجزائر",
    bgColor: "#FFF3DA",
  },
];

const StarRating = ({ rating }) => (
  <div>
    {Array.from({ length: rating }, (_, i) => (
      <span className="text-md" key={i}>
        ⭐
      </span>
    ))}
  </div>
);

export default function Reviews() {
  return (
    <div className="py-16 bg-white">
      <SectionHeader sectionTitle="اراء عملائنا" icon={MdReviews} />

      <div className="container">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          autoplay={{
            delay: 3000, // التبديل كل 3 ثواني
            disableOnInteraction: false, // لا تتوقف بعد التفاعل
          }}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={20}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          className="mb-10 custom-review-swiper"
        >
          {reviews.map((ele, index) => (
            <SwiperSlide key={index}>
              <div
                className="text-dark text-sm p-4 flex flex-col justify-between rounded-lg min-h-64 h-full"
                style={{ backgroundColor: ele.bgColor }}
              >
                <div className="flex flex-col gap-3">
                  <StarRating rating={ele.rating} />
                  <p>{ele.review}</p>
                </div>
                <div className="mb-3 mt-4">
                  <p className="font-bold">{ele.name}</p>
                  <p className="text-gray-400">من {ele.from}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="flex justify-center">
          <Button theme={flowbit.button} color="primary" pill size="md">
            عرض المزيد
          </Button>
        </div>
      </div>
    </div>
  );
}
