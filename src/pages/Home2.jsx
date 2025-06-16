import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Dropdown,
  DropdownItem,
  Footer,
  FooterCopyright,
  FooterDivider,
  FooterLink,
  FooterLinkGroup,
  FooterTitle,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import {
  FaStethoscope,
  FaVideo,
  FaCalendarCheck,
  FaStar,
  FaShieldAlt,
  FaHeadset,
  FaUserMd,
  FaHeartbeat,
} from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { HiOutlineArrowLeft } from "react-icons/hi";
import Logo from "../components/common/Logo";

// يوصى بإضافة dir="rtl" و lang="ar" إلى وسم <html> في ملف index.html الرئيسي
// للحصول على دعم شامل لـ RTL. <html lang="ar" dir="rtl">

// مكون الشعار

const ArrowLeftIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
    />
  </svg>
);
const StarIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.007z"
      clipRule="evenodd"
    />
  </svg>
);
const ArrowRightIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
    />
  </svg>
);
// أيقونة علامة الصح (SVG)
const CheckCircleIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const HeartbeatIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
    />
  </svg>
);
const doctors = [
  {
    name: "د.علياء الهاشمي",
    specialty: "طب الأطفال",
    rating: 4.9,
    reviews: 124,
    image: "/doctor1.jpg", // استبدل بالمسار الصحيح للصور
  },
  {
    name: "د. يوسف النجار",
    specialty: "الأمراض الجلدية",
    rating: 4.8,
    reviews: 98,
    image: "/doctor2.jpg",
  },
  {
    name: "د. فاطمة الكعبي",
    specialty: "الطب النفسي",
    rating: 5.0,
    reviews: 215,
    image: "/doctor3.webp",
  },
  {
    name: "د. عمر المنصوري",
    specialty: "أمراض القلب",
    rating: 4.9,
    reviews: 180,
    image: "/doctor4.webp",
  },
];
// أيقونة قائمة الهامبرغر
const MenuIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
    />
  </svg>
);

// أيقونة إغلاق القائمة
const CloseIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);
const SearchIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
    />
  </svg>
);
const SearchDoctorIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const BookAppointmentIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18M9.75 12.75h.008v.008H9.75v-.008zM9.75 16.5h.008v.008H9.75v-.008zM14.25 12.75h.008v.008H14.25v-.008zM14.25 16.5h.008v.008H14.25v-.008z"
    />
  </svg>
);

const VideoConsultIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9A2.25 2.25 0 004.5 18.75z"
    />
  </svg>
);

const steps = [
  {
    number: "01",
    title: "ابحث عن طبيبك",
    description:
      "تصفح قائمة الأطباء، استخدم الفلاتر لاختيار التخصص والتقييم المناسب لك.",
    icon: <SearchDoctorIcon className="h-12 w-12 text-primaryColor mb-4" />,
  },
  {
    number: "02",
    title: "احجز موعدك",
    description:
      "اختر اليوم والوقت الذي يناسب جدولك بمرونة تامة وقم بتأكيد حجزك فورًا.",
    icon: <BookAppointmentIcon className="h-12 w-12 text-primaryColor mb-4" />,
  },
  {
    number: "03",
    title: "ابدأ الاستشارة",
    description:
      "تحدث مع طبيبك عبر مكالمة فيديو آمنة وعالية الجودة من أي مكان يناسبك.",
    icon: <VideoConsultIcon className="h-12 w-12 text-primaryColor mb-4" />,
  },
];
export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // تأثير لتتبع حالة التمرير وإظهار خلفية للرأس
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "الرئيسية", href: "#" },
    { name: "عن المنصة", href: "#" },
    { name: "الأطباء", href: "#" },
    { name: "المقالات", href: "#" },
  ];
  // بيانات آراء العملاء
  const testimonials = [
    {
      name: "سارة خالد",
      comment:
        "تجربة ممتازة! تمكنت من الحديث مع طبيب متخصص في دقائق معدودة وحصلت على استشارة وافية. أنصح بشدة.",
    },
    {
      name: "محمد عبدالله",
      comment:
        "المنصة سهلة الاستخدام والأطباء على مستوى عالٍ من الكفاءة. خدمة العملاء كانت سريعة ومتعاونة جدًا.",
    },
    {
      name: "فاطمة الزهراء",
      comment:
        "وفرت عليّ عناء الذهاب للعيادة. استشارة الفيديو كانت واضحة والطبيب كان صبورًا ومستمعًا جيدًا.",
    },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 font-cairo text-secondaryColor dark:text-gray-300">
      {/* 1. الشريط العلوي (Navbar) */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled || isMenuOpen
            ? "bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm shadow-lg"
            : "bg-transparent"
        }`}
      >
        <nav className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* الشعار */}
            <a href="#" aria-label="TebiCare Homepage">
              <Logo />
            </a>

            {/* روابط التنقل للشاشات الكبيرة */}
            <ul className="hidden lg:flex items-center space-x-8 rtl:space-x-reverse">
              {navLinks.map((link, index) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className={`relative text-secondaryColor dark:text-gray-200 font-medium pb-2 transition-colors duration-300 hover:text-primaryColor dark:hover:text-primaryColor
                                  ${index === 0 ? "text-primaryColor" : ""}
                                  after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primaryColor after:transition-transform after:duration-300 ${
                                    index === 0
                                      ? "after:scale-x-100"
                                      : "after:scale-x-0"
                                  } hover:after:scale-x-100`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>

            {/* أزرار الإجراءات */}
            <div className="hidden lg:flex items-center space-x-4 rtl:space-x-reverse">
              <a
                href="#"
                className="text-secondaryColor dark:text-gray-300 font-semibold hover:text-primaryColor transition-colors duration-300"
              >
                تسجيل الدخول
              </a>
              <a
                href="#"
                className="px-5 py-2.5 text-sm font-semibold text-white bg-primaryColor rounded-full shadow-md hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300/50 transition-all duration-300 transform hover:scale-105"
              >
                ابدأ الآن
              </a>
            </div>

            {/* زر قائمة الجوال */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle Menu"
                className="text-secondaryColor dark:text-gray-200"
              >
                {isMenuOpen ? (
                  <CloseIcon className="h-7 w-7" />
                ) : (
                  <MenuIcon className="h-7 w-7" />
                )}
              </button>
            </div>
          </div>
        </nav>

        {/* قائمة الجوال المنسدلة */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="border-t border-slate-200 dark:border-slate-700">
            <ul className="flex flex-col items-center px-4 pt-4 pb-6 space-y-5">
              {navLinks.map((link, index) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className={`w-full text-center text-secondaryColor dark:text-gray-300 font-medium ${
                      index === 0 ? "text-primaryColor" : ""
                    }`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
              <li className="w-full pt-4 border-t border-slate-200 dark:border-slate-700">
                <a
                  href="#"
                  className="w-full block text-center px-8 py-3 text-base font-semibold text-white bg-primaryColor rounded-full shadow-md"
                >
                  ابدأ الآن
                </a>
              </li>
            </ul>
          </div>
        </div>
      </header>

      <main>
        {/* 2. قسم Hero */}
        <section className="relative bg-slate-50 dark:bg-secondaryColor w-full overflow-hidden">
          {/* أشكال هندسية في الخلفية للتزيين */}
          <div className="absolute top-0 -left-40 w-96 h-96 bg-primaryColor/10 dark:bg-primaryColor/20 rounded-full opacity-50 blur-3xl -z-1"></div>
          <div className="absolute bottom-0 -right-40 w-96 h-96 bg-blue-200/20 dark:bg-blue-500/10 rounded-full opacity-50 blur-3xl -z-1"></div>

          <div className="container mx-auto px-4 py-16 md:py-24 grid lg:grid-cols-2 gap-16 items-center">
            {/* --- المحتوى النصي والتفاعلي (اليمين في RTL) --- */}
            <div className="z-10 text-center lg:text-right">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-secondaryColor dark:text-white mb-5 leading-tight">
                رعاية صحية تثق بها،
                <span className="text-primaryColor"> بمتناول يديك.</span>
              </h1>
              <p className="text-lg text-grayColor dark:text-gray-300 max-w-xl mx-auto lg:mx-0 mb-10">
                احصل على استشارات طبية فورية من أفضل الأطباء عبر مكالمات فيديو
                آمنة. صحتك هي أولويتنا.
              </p>

              {/* --- مكون البحث التفاعلي --- */}
              <div className="bg-white dark:bg-slate-800/50 p-6 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 max-w-xl mx-auto lg:mx-0">
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label htmlFor="doctor-search" className="sr-only">
                      ابحث عن طبيب أو تخصص
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 rtl:left-0 rtl:right-auto rtl:pl-3">
                        <SearchIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="search"
                        id="doctor-search"
                        className="block w-full p-4 pr-10 rtl:pl-10 rtl:pr-4 text-base text-gray-900 border border-gray-200 rounded-lg bg-gray-50 focus:ring-primaryColor focus:border-primaryColor dark:bg-slate-700 dark:border-slate-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primaryColor dark:focus:border-primaryColor"
                        placeholder="ابحث عن طبيب أو تخصص..."
                        required
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white bg-primaryColor hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-base px-6 py-4 dark:bg-primaryColor dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition-colors duration-300"
                  >
                    بحث
                  </button>
                </div>
              </div>
            </div>

            {/* --- الصورة (اليسار في RTL) --- */}
            <div className="flex justify-center items-center h-full">
              <div className="relative w-[320px] h-[320px] sm:w-[480px] sm:h-[480px] lg:w-[520px] lg:h-[520px] transition-transform duration-300 hover:scale-105">
                {/* تأثير الخلفية المتدرج */}
                <div className="absolute inset-0 bg-gradient-to-tr from-primaryColor/30 to-blue-200/10 rounded-full blur-2xl z-0"></div>
                <img
                  src="/doctor-hero.png"
                  alt="طبيبة تقدم استشارة عن بعد عبر منصة TebiCare"
                  className="relative z-10 w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 3. قسم "كيف تعمل المنصة؟" */}
        <section className="bg-slate-100 dark:bg-slate-900 py-20 sm:py-28">
          <div className="container mx-auto px-4">
            {/* عنوان القسم */}
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-extrabold text-secondaryColor dark:text-white mb-4">
                الرعاية الصحية في ٣ خطوات بسيطة
              </h2>
              <p className="text-lg text-grayColor dark:text-gray-400">
                لقد صممنا TebiCare لتكون تجربتك سهلة ومباشرة من البداية إلى
                النهاية.
              </p>
            </div>

            {/* شبكة الخطوات */}
            <div className="relative">
              {/* الخط المتقطع الذي يربط بين البطاقات (للشاشات الكبيرة فقط) */}
              <div
                aria-hidden="true"
                className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 mt-[-1rem]"
              >
                <div
                  className="w-full h-full rounded-full bg-repeat-x bg-center"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, rgb(203 213 225 / 0.7) 60%, transparent 0%)",
                    backgroundSize: "20px 2px",
                  }}
                ></div>
              </div>

              <div className="grid lg:grid-cols-3 gap-x-8 gap-y-12">
                {steps.map((step) => (
                  <div
                    key={step.number}
                    className="relative bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg text-center transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl z-10"
                  >
                    {/* رقم الخطوة كعنصر تصميمي */}
                    <div
                      aria-hidden="true"
                      className="absolute top-4 right-4 text-7xl font-black text-slate-100 dark:text-slate-700/50 select-none -z-10"
                    >
                      {step.number}
                    </div>

                    <div className="relative flex flex-col items-center">
                      {/* أيقونة الخطوة */}
                      <div className="flex items-center justify-center h-24 w-24 rounded-full bg-primaryColor/10 mb-6">
                        {step.icon}
                      </div>
                      <h3 className="text-xl font-bold text-secondaryColor dark:text-white mb-2">
                        {step.title}
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 4. قسم "مميزات المنصة" */}
        <section className="py-16 sm:py-24 bg-slate-50 dark:bg-slate-800">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-secondaryColor dark:text-white mb-3">
                مميزات منصة TebiCare
              </h2>
              <p className="text-grayColor max-w-2xl mx-auto">
                نقدم لك تجربة صحية متكاملة ومميزة.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <FaUserMd />,
                  title: "أطباء معتمدون",
                  desc: "نخبة من الأطباء والاستشاريين المرخصين في كافة التخصصات.",
                },
                {
                  icon: <FaShieldAlt />,
                  title: "خصوصية وأمان",
                  desc: "مكالمات مشفرة بالكامل لضمان سرية معلوماتك الصحية.",
                },
                {
                  icon: <FaHeadset />,
                  title: "دعم فني متكامل",
                  desc: "فريق دعم جاهز لمساعدتك على مدار الساعة باللغة العربية.",
                },
                {
                  icon: <FaStethoscope />,
                  title: "تخصصات متنوعة",
                  desc: "تغطية شاملة لمختلف التخصصات الطبية التي تحتاجها.",
                },
                {
                  icon: <FaCalendarCheck />,
                  title: "سهولة الحجز",
                  desc: "نظام حجوزات مرن يتيح لك اختيار الموعد المثالي لك.",
                },
                {
                  icon: <FaVideo />,
                  title: "جودة عالية",
                  desc: "اتصال فيديو وصوت عالي الجودة لتجربة استشارة واضحة.",
                },
              ].map((feature, index) => (
                <div key={index}>
                  <Card className="h-full text-center shadow-md hover:shadow-xl transition-shadow duration-300 dark:bg-slate-700">
                    <div className="flex flex-col items-center p-4">
                      <div className="text-primaryColor mb-4">
                        {React.cloneElement(feature.icon, {
                          className: "w-12 h-12",
                        })}
                      </div>
                      <h5 className="text-xl font-semibold tracking-tight text-secondaryColor dark:text-white">
                        {feature.title}
                      </h5>
                      <p className="font-normal text-grayColor dark:text-gray-400 mt-2">
                        {feature.desc}
                      </p>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. قسم "بحث عن طبيب" */}
        <section className="py-16 sm:py-24 bg-white dark:bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="bg-slate-100 dark:bg-slate-800 p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-center mb-6 text-secondaryColor dark:text-white">
                ابحث عن الطبيب المناسب
              </h3>
              <div className="grid md:grid-cols-4 gap-4 items-end">
                <div className="md:col-span-3 grid sm:grid-cols-3 gap-4">
                  <div>
                    <label
                      htmlFor="specialty"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      التخصص
                    </label>
                    <Dropdown
                      id="specialty"
                      label="اختر التخصص"
                      className="w-full"
                    >
                      <DropdownItem>باطنية</DropdownItem>
                      <DropdownItem>أطفال</DropdownItem>
                      <DropdownItem>جلدية</DropdownItem>
                      <DropdownItem>نفسية</DropdownItem>
                    </Dropdown>
                  </div>
                  <div>
                    <label
                      htmlFor="rating"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      التقييم
                    </label>
                    <Dropdown id="rating" label="أي تقييم" className="w-full">
                      <DropdownItem>★☆☆☆☆</DropdownItem>
                      <DropdownItem>★★☆☆☆</DropdownItem>
                      <DropdownItem>★★★☆☆</DropdownItem>
                      <DropdownItem>★★★★☆</DropdownItem>
                      <DropdownItem>★★★★★</DropdownItem>
                    </Dropdown>
                  </div>
                  <div>
                    <label
                      htmlFor="language"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      اللغة
                    </label>
                    <Dropdown
                      id="language"
                      label="اختر اللغة"
                      className="w-full"
                    >
                      <DropdownItem>العربية</DropdownItem>
                      <DropdownItem>English</DropdownItem>
                    </Dropdown>
                  </div>
                </div>
                <Button
                  size="lg"
                  className="w-full bg-primaryColor enabled:hover:bg-blue-800"
                >
                  <FiSearch className="me-2 h-5 w-5" />
                  بحث
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* 6. قسم "الأطباء المميزون" */}
        <section className="bg-white dark:bg-slate-900/70 py-20 sm:py-28">
          <div className="container mx-auto px-4">
            {/* عنوان القسم */}
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-extrabold text-secondaryColor dark:text-white mb-4">
                تعرّف على نخبة من أطبائنا
              </h2>
              <p className="text-lg text-grayColor dark:text-gray-400">
                اختر من بين أفضل الأطباء المعتمدين في مختلف التخصصات لتبدأ رحلتك
                نحو صحة أفضل.
              </p>
            </div>

            {/* شبكة الأطباء */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {doctors.map((doctor) => (
                <div
                  key={doctor.name}
                  className="group relative bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
                >
                  <div className="relative h-56">
                    <img
                      src={doctor.image}
                      alt={`صورة ${doctor.name}`}
                      className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-110"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://placehold.co/400x400/E2F0FF/048CFF?text=Doctor";
                      }}
                    />
                    <div className="absolute top-0 right-0 bg-primaryColor text-white text-xs font-bold px-3 py-1.5 rounded-bl-xl">
                      {doctor.specialty}
                    </div>
                  </div>

                  <div className="p-6 text-center">
                    <h3 className="text-xl font-bold text-secondaryColor dark:text-white mb-1">
                      {doctor.name}
                    </h3>
                    <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse text-sm text-gray-500 dark:text-gray-400 mb-5">
                      <StarIcon className="w-5 h-5 text-yellow-400" />
                      <span className="font-bold text-slate-700 dark:text-slate-200">
                        {doctor.rating}
                      </span>
                      <span>({doctor.reviews} تقييم)</span>
                    </div>

                    <button className="w-full px-6 py-3 font-semibold text-white bg-primaryColor rounded-lg shadow-md hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300/50 transition-all duration-300">
                      حجز موعد
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* زر لعرض جميع الأطباء */}
            <div className="text-center mt-16">
              <button className="group inline-flex items-center px-6 py-3 text-primaryColor dark:text-white font-semibold border-2 border-primaryColor dark:border-primaryColor rounded-lg hover:bg-primaryColor hover:text-white dark:hover:bg-primaryColor transition-all duration-300">
                <span>عرض جميع الأطباء</span>
                <ArrowRightIcon className="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
              </button>
            </div>
          </div>
        </section>

        {/* 7. قسم "آراء العملاء" (Testimonials) - تصميم ثابت */}
        <section className="py-16 sm:py-24 bg-secondaryColor text-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">
                ماذا يقول عملاؤنا؟
              </h2>
              <p className="text-slate-300 max-w-2xl mx-auto">
                آراء وتجارب حقيقية من مستخدمي منصة TebiCare.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card
                  key={index}
                  className="h-full bg-white/10 backdrop-blur-sm border-slate-500 text-white"
                >
                  <div className="p-4">
                    <p className="font-normal mb-4">"{testimonial.comment}"</p>
                    <div className="font-semibold">{testimonial.name}</div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* 8. قسم "أحدث المقالات" */}
        <section className="py-16 sm:py-24 bg-white dark:bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-secondaryColor dark:text-white mb-3">
                أحدث المقالات الصحية
              </h2>
              <p className="text-grayColor max-w-2xl mx-auto">
                ابق على اطلاع بأحدث المعلومات والنصائح الطبية.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "10 نصائح للحفاظ على صحة القلب",
                  date: "١٥ يونيو، ٢٠٢٥",
                },
                {
                  title: "كيفية التعامل مع حساسية الربيع",
                  date: "١٢ يونيو، ٢٠٢٥",
                },
                {
                  title: "أهمية فيتامين د لصحة العظام",
                  date: "١٠ يونيو، ٢٠٢٥",
                },
              ].map((article, index) => (
                <div key={index}>
                  <Card
                    className="h-full"
                    imgSrc={`https://placehold.co/600x400/048CFF/FFFFFF?text=Article+Image`}
                  >
                    <div className="p-2">
                      <p className="text-sm text-grayColor mb-2">
                        {article.date}
                      </p>
                      <h5 className="text-xl font-bold tracking-tight text-secondaryColor dark:text-white hover:text-primaryColor transition-colors">
                        <a href="#">{article.title}</a>
                      </h5>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 9. قسم "دعوة للانضمام" (Call-to-Action) */}
        <section className="py-16 sm:py-24 bg-slate-50 dark:bg-slate-800">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 items-center bg-primaryColor text-white rounded-lg p-10">
              <div>
                <h3 className="text-3xl font-bold mb-3">هل أنت طبيب؟</h3>
                <p className="mb-6 opacity-90">
                  انضم إلى شبكتنا من الأطباء المتميزين وساهم في تقديم رعاية صحية
                  أفضل لمجتمعنا.
                </p>
                <Button
                  size="lg"
                  href="#"
                  className="bg-white text-primaryColor enabled:hover:bg-slate-100"
                >
                  انضم كطبيب
                </Button>
              </div>
              <div>
                <h3 className="text-3xl font-bold mb-3">هل تبحث عن رعاية؟</h3>
                <p className="mb-6 opacity-90">
                  سجل الآن وابدأ رحلتك نحو صحة أفضل بكل سهولة وخصوصية.
                </p>
                <Button
                  size="lg"
                  href="#"
                  className="bg-white text-primaryColor enabled:hover:bg-slate-100"
                >
                  سجل كمريض
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 10. التذييل (Footer) */}
      <Footer
        container
        className="bg-secondaryColor rounded-none text-white dark:bg-black"
      >
        <div className="w-full container mx-auto p-4 py-8">
          <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
            <div className="mb-8 sm:mb-0">
              <Logo />
              <p className="mt-4 max-w-xs text-slate-300">
                منصة رائدة للرعاية الصحية عن بعد، تضع صحتكم أولويتنا.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
              <div>
                <FooterTitle title="عن المنصة" className="text-white" />
                <FooterLinkGroup col>
                  <FooterLink
                    href="#"
                    className="text-slate-300 hover:text-primaryColor"
                  >
                    فريقنا
                  </FooterLink>
                  <FooterLink
                    href="#"
                    className="text-slate-300 hover:text-primaryColor"
                  >
                    الوظائف
                  </FooterLink>
                </FooterLinkGroup>
              </div>
              <div>
                <FooterTitle title="روابط سريعة" className="text-white" />
                <FooterLinkGroup col>
                  <FooterLink
                    href="#"
                    className="text-slate-300 hover:text-primaryColor"
                  >
                    الأطباء
                  </FooterLink>
                  <FooterLink
                    href="#"
                    className="text-slate-300 hover:text-primaryColor"
                  >
                    المقالات
                  </FooterLink>
                </FooterLinkGroup>
              </div>
              <div>
                <FooterTitle title="قانوني" className="text-white" />
                <FooterLinkGroup col>
                  <FooterLink
                    href="#"
                    className="text-slate-300 hover:text-primaryColor"
                  >
                    سياسة الخصوصية
                  </FooterLink>
                  <FooterLink
                    href="#"
                    className="text-slate-300 hover:text-primaryColor"
                  >
                    الشروط والأحكام
                  </FooterLink>
                </FooterLinkGroup>
              </div>
            </div>
          </div>
          <FooterDivider />
          <div className="w-full sm:flex sm:items-center sm:justify-between">
            <FooterCopyright
              href="#"
              by="TebiCare™"
              year={2025}
              className="text-white"
            />
            <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center rtl:space-x-reverse">
              {/* أضف أيقونات وسائل التواصل الاجتماعي هنا */}
            </div>
          </div>
        </div>
      </Footer>
    </div>
  );
}
