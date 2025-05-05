import { GrArticle } from "react-icons/gr";
import SectionHeader from "../common/SectionHeader";

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
      <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {blogs.map((ele, index) => (
          <div
            className="flex flex-col gap-3 group  p-5 rounded-xl bg-white"
            key={index}
          >
            <img
              className="w-full h-64 rounded-xl object-cover group-hover:brightness-75 transition"
              src={ele.blogImage}
              alt={ele.title}
            />
            <h3 className="text-lg font-bold text-secondaryColor">
              {ele.title}
            </h3>
            <div className="flex gap-2 items-center">
              <img
                className="w-5 h-5 object-cover rounded-full"
                src={ele.doctorImage}
                alt={ele.doctor}
              />
              <p className="text-primary-500 text-sm">{ele.doctor} د، </p>
            </div>
            <p className="py-1 px-3 bg-[#E2EAF6] w-fit text-[#143566] text-sm rounded-md font-bold">
              {ele.tag}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
