// import { useInView } from "framer-motion";
// import { useRef } from "react";
// import CountUp from "react-countup";

// const stats = [
//   { title: "استشارة يومية", value: "+320" },
//   { title: "مريض مسجل", value: "+1000" },
//   { title: "طبيب خبير", value: "+412" },
//   { title: "عيادة مسجلة", value: "+91" },
// ];

// export default function Stats() {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, amount: 0.5 });

//   return (
//     <div ref={ref} className="bg-secondaryColor py-10">
//       <div className="container grid grid-cols-2  lg:grid-cols-4 gap-10">
//         {stats.map((ele) => (
//           <div className="flex flex-col gap-3 items-center justify-center">
//             <h3 className="text-white font-bold text-[40px]">
//               {isInView ? <CountUp end={ele.value} duration={2} /> : 0}+
//             </h3>
//             <p className="text-gray-300  text-md">{ele.title}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import { useInView, motion } from "framer-motion";
import { useRef } from "react";
import CountUp from "react-countup";
// يمكنك استيراد أيقونات من مكتبة مثل react-icons
import {
  FaUserMd,
  FaUsers,
  FaClinicMedical,
  FaCalendarCheck,
} from "react-icons/fa";

const statsData = [
  {
    title: "استشارة يومية",
    value: "320",
    icon: (
      <FaCalendarCheck className="text-4xl lg:text-5xl text-primaryColor" />
    ),
  },
  {
    title: "مريض مسجل",
    value: "1000",
    icon: <FaUsers className="text-4xl lg:text-5xl text-primaryColor" />,
  },
  {
    title: "طبيب خبير",
    value: "412",
    icon: <FaUserMd className="text-4xl lg:text-5xl text-primaryColor" />,
  },
  {
    title: "عيادة مسجلة",
    value: "91",
    icon: (
      <FaClinicMedical className="text-4xl lg:text-5xl text-primaryColor" />
    ),
  },
];

export default function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 }); // تحسين amount قليلاً

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // تأثير متتالي لظهور العناصر
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring", // تأثير ناعم أكثر
        stiffness: 100,
      },
    },
  };

  return (
    <div ref={ref} className=" dark:bg-gray-800 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {statsData.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center text-center transform hover:-translate-y-2"
              variants={itemVariants}
            >
              <div className="mb-4">{stat.icon}</div>
              <h3 className="text-gray-900 dark:text-white font-extrabold text-4xl md:text-5xl mb-2">
                {/* التأكد من أن القيمة رقمية لـ CountUp */}
                {isInView ? (
                  <CountUp
                    end={parseInt(stat.value)}
                    duration={2.5}
                    separator=","
                  />
                ) : (
                  "0"
                )}
                <span className="text-primaryColor">+</span>
              </h3>
              <p className="text-gray-500 dark:text-gray-300 text-base md:text-lg font-medium">
                {stat.title}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
