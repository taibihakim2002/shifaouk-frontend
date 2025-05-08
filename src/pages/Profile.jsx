import {
  Button,
  Rating,
  RatingAdvanced,
  RatingStar,
  TabItem,
  Tabs,
  Textarea,
} from "flowbite-react";
import { Camera, Save } from "lucide-react";
import flowbit from "../config/flowbit";
import { BiSave } from "react-icons/bi";
import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import BlogCard from "../components/common/BlogCard";

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

export default function Profile() {
  return (
    <div>
      <div className="container">
        <div className="w-full h-64 relative">
          <img
            src="/imgs/blogs/stock.webp"
            className="object-cover w-full h-full rounded-xl"
          />
          <div className="w-28 h-10 absolute top-3 start-5 bg-gray-300 flex gap-5 items-center px-2">
            <span className="font-bold">4.5⭐</span>
            <span className="font-bold">350م</span>
          </div>
          <div className="absolute w-52 h-52 start-1/2 translate-x-1/2 bottom-0 lg:start-10 lg:translate-x-0 translate-y-1/2">
            <img
              src="/doctor1.jpg"
              alt="doctoer"
              className="w-full h-full rounded-full object-cover mb-5"
            />
            <span className="absolute top-40 end-5 text-secondaryColor p-2 bg-gray-300 rounded-full">
              <Camera size={15} />
            </span>
          </div>
        </div>
        <div className="lg:ps-72 w-full mt-28 lg:mt-7 flex flex-col items-center lg:items-start lg:flex-row justify-between gap-5">
          <h2 className="text-xl font-bold">صخري معاذ</h2>
          <div className="flex gap-5 ">
            <Button theme={flowbit.button} color="primary" className="w-44">
              حجز استشارة
            </Button>
            <Button theme={flowbit.button} color="noColor" className="p-1">
              <BiSave className="text-gray-500" size={25} />
            </Button>
          </div>
        </div>
        <div className="mt-14">
          <Tabs
            aria-label="Tabs with underline"
            variant="underline"
            theme={flowbit.tab}
          >
            <TabItem active title="معلومات عامة" icon={HiUserCircle}>
              <h3 className="text-xl font-bold text-primaryColor mb-5 text-center">
                معلومات عامة
              </h3>
            </TabItem>
            <TabItem title="مقالات طبية" icon={MdDashboard}>
              <h3 className="text-xl font-bold text-primaryColor text-center mb-5">
                مقالات طبية
              </h3>
              <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {blogs.map((ele, index) => (
                  <BlogCard ele={ele} key={index} />
                ))}
              </div>
            </TabItem>
            <TabItem title="التقييمات" icon={HiAdjustments}>
              <h3 className="text-xl font-bold text-primaryColor text-center mb-5">
                التقييمات
              </h3>
              <div>
                <div className="text-center text-[35px] font-bold text-secondaryColor mb-5">
                  <span>4.9</span> <span className="font-light"> | </span>{" "}
                  <span>390 مقيم</span>
                </div>
                <div className="flex justify-center mb-5">
                  <Rating className="mb-2" size="lg">
                    <RatingStar />
                    <RatingStar />
                    <RatingStar />
                    <RatingStar />
                    <RatingStar filled={false} />
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
                              alt=""
                            />
                            <div className="flex flex-col gap-2">
                              <p className="text-lg font-bold text-secondaryColor">
                                {ele.name}
                              </p>
                              <Rating className="mb-2" size="sm">
                                <RatingStar />
                                <RatingStar />
                                <RatingStar />
                                <RatingStar />
                                <RatingStar filled={false} />
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
            <TabItem title="نبذة عامة" icon={HiClipboardList}>
              <h3 className="text-xl font-bold text-primaryColor text-center mb-5">
                نبذة عامة
              </h3>
              <p className="leading-8 indent-8">
                أخصائي أمراض القلب يتمتع بخبرة تزيد عن 15 عامًا في تشخيص وعلاج
                أمراض القلب والأوعية الدموية. حاصل على شهادة الطب من جامعة
                الجزائر، وتلقى تدريبات متقدمة في فرنسا. يشتهر الدكتور سامي
                بتعامله الإنساني، وتشخيصه الدقيق، ومتابعته المستمرة لحالة
                المرضى. أخصائي أمراض القلب يتمتع بخبرة تزيد عن 15 عامًا في تشخيص
                وعلاج أمراض القلب والأوعية الدموية. حاصل على شهادة الطب من جامعة
                الجزائر، وتلقى تدريبات متقدمة في فرنسا. يشتهر الدكتور سامي
                بتعامله الإنساني، وتشخيصه الدقيق، ومتابعته المستمرة لحالة
                المرضى. أخصائي أمراض القلب يتمتع بخبرة تزيد عن 15 عامًا في تشخيص
                وعلاج أمراض القلب والأوعية الدموية. حاصل على شهادة الطب من جامعة
                الجزائر، وتلقى تدريبات متقدمة في فرنسا. يشتهر الدكتور سامي
                بتعامله الإنساني، وتشخيصه الدقيق، ومتابعته المستمرة لحالة
                المرضى.
              </p>
            </TabItem>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
