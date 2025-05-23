import { GrArticle } from "react-icons/gr";
import SectionHeader from "../common/SectionHeader";
import BlogCard from "../common/BlogCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css/pagination";

const blogs = [
  {
    title: "3 أضرار لتناول القهوة يوميًا يجب التفطن لها قبل فوات الأوان",
    doctor: "معاوية أحمد",
    doctorImage: "/doctor1.jpg",
    blogImage: "/imgs/blogs/caffe.jpg",
    tag: "نمط حياة",
  },
  {
    title: "الجلطة الدماغية: كيف تكتشف الأعراض المبكرة وتنقذ حياة؟",
    doctor: "د. سعاد حمدي",
    doctorImage: "/doctor2.jpg",
    blogImage: "/imgs/blogs/stock.webp",
    tag: "حالات طارئة",
  },
  {
    title: "القولون العصبي: الأسباب، الأعراض، والعلاج الطبيعي",
    doctor: "د. سامي نصر",
    doctorImage: "/doctor3.jpg",
    blogImage: "/imgs/blogs/irritable.jpg",
    tag: "أمراض الجهاز الهضمي",
  },
  {
    title: "نقص فيتامين د: علامات لا يجب تجاهلها",
    doctor: "د. فاطمة الزهراء",
    doctorImage: "/doctor4.jpg",
    blogImage: "/imgs/blogs/vitamin.webp",
    tag: "تغذية",
  },
  {
    title: "أسباب تساقط الشعر عند الرجال والنساء وطرق العلاج",
    doctor: "د. عصام العلي",
    doctorImage: "/doctor5.jpg",
    blogImage: "/imgs/blogs/hair.jpg",
    tag: "جلدية",
  },
  {
    title: "كيف تحمي قلبك بعد سن الأربعين؟ نصائح ذهبية",
    doctor: "د. منال عرفة",
    doctorImage: "/doctor6.jpg",
    blogImage: "/imgs/blogs/heart.jpg",
    tag: "أمراض القلب",
  },
];

export default function Blogs() {
  return (
    <div className="py-16 bg-primary-50">
      <SectionHeader sectionTitle="اخر المقالات" icon={GrArticle} />
      <div className="container">
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          spaceBetween={20}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          pagination={{ clickable: true }}
          className="mb-5 blogs-swiper "
        >
          {blogs.map((ele, index) => (
            <SwiperSlide key={index}>
              <BlogCard ele={ele} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
