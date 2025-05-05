import { MdReviews } from "react-icons/md";
import SectionHeader from "../common/SectionHeader";
import { Button } from "flowbite-react";
import flowbit from "../../config/flowbit";

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
const StarRating = ({ rating }) => {
  return (
    <div>
      {Array.from({ length: rating }, (_, i) => (
        <span className="text-md" key={i}>
          ⭐
        </span>
      ))}
    </div>
  );
};
export default function Reviews() {
  return (
    <div className="py-16">
      <SectionHeader sectionTitle="اراء عملائنا" icon={MdReviews} />
      <div className="container grid grid-col-1 md:grid-col-2 lg:grid-cols-4 gap-5 mb-10">
        {reviews.map((ele) => (
          <div
            className="text-dark text-sm p-4 flex flex-col justify-between rounded-lg min-h-64"
            style={{ backgroundColor: ele.bgColor }}
          >
            <div className="flex flex-col gap-3">
              <StarRating rating={ele.rating} />
              <p>{ele.review}</p>
            </div>
            <div className="mb-3">
              <p className="font-bold "> {ele.name}</p>
              <p className=" text-gray-400">من {ele.from}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <Button theme={flowbit.button} color="primary" pill size="md">
          عرض المزيد
        </Button>
      </div>
    </div>
  );
}
