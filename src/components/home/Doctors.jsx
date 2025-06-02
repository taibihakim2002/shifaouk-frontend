import { Star, Stethoscope } from "lucide-react";
import SectionHeader from "../common/SectionHeader";
import { Button } from "flowbite-react";
import flowbit from "../../config/flowbit";
import { Link } from "react-router-dom";
import DoctorCard from "../common/DoctorCard";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css/pagination";
import useApiRequest from "../../hooks/useApiRequest";
import { useEffect } from "react";
import globalApi from "../../utils/globalApi";
import Skeleton from "../common/Skeleton";

// const doctors = [
//   {
//     name: "معاوية احمد",
//     description: "أخصائي امراض القلب",
//     image: "/doctor2.jpg",
//     link: "/profile",
//     rating: 4,
//   },
//   {
//     name: "طيبي عبد الحكيم",
//     description: "أخصائي امراض المعدة",
//     image: "/doctor1.jpg",
//     link: "/profile",
//     rating: 4,
//   },
//   {
//     name: " حلباوي محمد",
//     description: "أخصائي امراض الكبد",
//     image: "doctor4.webp",
//     link: "/profile",
//     rating: 5,
//   },
//   {
//     name: "محمدي اسامة",
//     description: "أخصائي امراض الرئة",
//     image: "doctor5.jpg",
//     link: "/profile",
//     rating: 3.5,
//   },
//   {
//     name: "محمدي اسامة",
//     description: "أخصائي امراض الرئة",
//     image: "doctor5.jpg",
//     link: "/profile",
//     rating: 3.5,
//   },
// ];

export default function Doctors() {
  const { data: doctors, loading, error, request } = useApiRequest();

  useEffect(() => {
    request(() => globalApi.getTopDoctors());
  }, []);

  return (
    <div className="py-16 bg-primary-50">
      <SectionHeader sectionTitle="اطبائنا المميزون" icon={Stethoscope} />

      <div className="container">
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          spaceBetween={20}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          pagination={{ clickable: true }}
          className="mb-5 "
        >
          {loading ? (
            [0, 0, 0, 0].map((ele, index) => (
              <SwiperSlide key={index}>
                <Skeleton className="w-56 h-56" />
              </SwiperSlide>
            ))
          ) : doctors ? (
            doctors?.data?.map((ele, index) => (
              <SwiperSlide key={index}>
                <DoctorCard ele={ele} />
              </SwiperSlide>
            ))
          ) : (
            <p>لا يوجد أطباء</p>
          )}
        </Swiper>

        <div className="flex justify-center">
          <Link to="/doctors">
            <Button theme={flowbit.button} color="primary" pill size="md">
              عرض المزيد
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
