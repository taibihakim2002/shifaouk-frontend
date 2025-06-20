// src/pages/Doctors.jsx

import {
  Button,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  Pagination,
} from "flowbite-react";
import DoctorCard from "../components/common/DoctorCard";
import {
  Search,
  X,
  ListFilter,
  ArrowUpDown,
  RotateCcw,
  Star,
  Filter,
  Frown,
  XCircle,
} from "lucide-react";
import useApiRequest from "../hooks/useApiRequest";
import { useEffect, useState } from "react";
import globalApi from "../utils/globalApi";
import Skeleton from "../components/common/Skeleton";
import specializations from "../data/specializations";

// --- DATA & Debounce Hook (Unchanged) ---
const wilayasData = [
  { value: "", label: "كل الولايات" },
  { value: "الجزائر", label: "الجزائر" },
  { value: "الجلفة", label: "الجلفة" },
  { value: "البليدة", label: "البليدة" },
  { value: "وهران", label: "وهران" },
  { value: "قسنطينة", label: "قسنطينة" },
];
const priceRanges = [
  { value: "", label: "كل الأسعار" },
  { value: "0-1999", label: "أقل من 2000 دج" },
  { value: "2000-3999", label: "2000 - 3999 دج" },
  { value: "4000-5999", label: "4000 - 5999 دج" },
  { value: "6000-Infinity", label: "أكثر من 6000 دج" },
];
const sortOptionsData = [
  { value: "", label: "فرز حسب" },
  { value: "rating_desc", label: "الأعلى تقييماً" },
  { value: "price_asc", label: "الأقل سعراً" },
  { value: "price_desc", label: "الأعلى سعراً" },
  { value: "experience_desc", label: "الأكثر خبرة" },
];
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}
// --- END Unchanged Data ---

export default function Doctors() {
  const { data: apiResponse, loading, error, request } = useApiRequest();
  const [doctorsList, setDoctorsList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const doctorsPerPage = 9;

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState("");
  const [selectedWilaya, setSelectedWilaya] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedRating, setSelectedRating] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  // --- API & Data Handling Logic (Unchanged) ---
  useEffect(() => {
    const fetchFilteredDoctors = () => {
      const params = {
        page: currentPage,
        limit: doctorsPerPage,
        search: debouncedSearchQuery,
        specialization: selectedSpecialization,
        state: selectedWilaya,
        priceRange: selectedPrice,
        minRating: selectedRating,
        gender: selectedGender,
        sort: sortBy,
      };
      const activeParams = Object.fromEntries(
        Object.entries(params).filter(([, v]) => v)
      );
      const queryString = new URLSearchParams(activeParams).toString();
      request(() => globalApi.getAllApprovedDoctors(queryString));
    };
    fetchFilteredDoctors();
  }, [
    debouncedSearchQuery,
    selectedSpecialization,
    selectedWilaya,
    selectedPrice,
    selectedRating,
    selectedGender,
    sortBy,
    currentPage,
  ]);

  useEffect(() => {
    if (apiResponse?.data) {
      setDoctorsList(apiResponse.data.users || apiResponse.data.data || []);
      setTotalPages(apiResponse.data.totalPages || 1);
      if (
        currentPage > (apiResponse.data.totalPages || 1) &&
        (apiResponse.data.totalPages || 1) > 0
      ) {
        setCurrentPage(apiResponse.data.totalPages);
      }
    }
  }, [apiResponse, loading, currentPage]);

  // --- Filter Controls & Page Logic ---
  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedSpecialization("");
    setSelectedWilaya("");
    setSelectedPrice("");
    setSelectedRating("");
    setSelectedGender("");
    setSortBy("");
    setCurrentPage(1);
    setIsFilterModalOpen(false); // Close modal on clear
  };

  const activeFilterCount = [
    selectedSpecialization,
    selectedWilaya,
    selectedPrice,
    selectedRating,
    selectedGender,
  ].filter(Boolean).length;

  const onPageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // --- ⭐ NEW: Interactive Components ---
  const RatingFilter = ({ selected, onChange }) => (
    <div className="flex items-center justify-end gap-1" dir="ltr">
      {[...Array(5)].map((_, index) => {
        const ratingValue = 5 - index;
        return (
          <button
            key={ratingValue}
            type="button"
            onClick={() =>
              onChange(selected === ratingValue ? "" : ratingValue)
            }
            className="focus:outline-none"
          >
            <Star
              size={22}
              className={`transition-all duration-200 ${
                ratingValue <= selected
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300 hover:text-yellow-300"
              }`}
            />
          </button>
        );
      })}
    </div>
  );

  const GenderFilter = ({ selected, onChange }) => (
    <div className="flex items-center gap-2">
      {[
        { value: "", label: "الكل" },
        { value: "male", label: "ذكر" },
        { value: "female", label: "أنثى" },
      ].map(({ value, label }) => (
        <button
          key={value}
          type="button"
          onClick={() => onChange(value)}
          className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-200 ${
            selected === value
              ? "bg-primaryColor text-white shadow"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );

  const renderFilters = (isModal = false) => (
    <div
      className={`p-1 ${
        isModal
          ? ""
          : "bg-white rounded-xl border border-gray-200/80 sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto"
      }`}
    >
      <div className="flex justify-between items-center p-5 border-b border-gray-100">
        <h3 className="text-md font-bold text-gray-800 flex items-center gap-2">
          <ListFilter size={18} className="text-primaryColor" />
          فلاتر البحث
        </h3>
        {activeFilterCount > 0 && (
          <button
            onClick={handleClearFilters}
            className="text-xs font-semibold text-red-600 hover:text-red-700 transition-colors flex items-center gap-1"
          >
            <RotateCcw size={14} />
            مسح ({activeFilterCount})
          </button>
        )}
      </div>
      <div className="space-y-6 p-5">
        {/* Specialization, Wilaya, Price (Dropdowns) */}
        {[
          {
            id: "spec",
            label: "التخصص",
            value: selectedSpecialization,
            onChange: setSelectedSpecialization,
            options: specializations,
          },
          {
            id: "wilaya",
            label: "الولاية",
            value: selectedWilaya,
            onChange: setSelectedWilaya,
            options: wilayasData,
          },
          {
            id: "price",
            label: "السعر",
            value: selectedPrice,
            onChange: setSelectedPrice,
            options: priceRanges,
          },
        ].map((filter) => (
          <div key={filter.id}>
            <Label
              htmlFor={filter.id}
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              {filter.label}
            </Label>
            <select
              id={filter.id}
              className="w-full bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primaryColor focus:border-primaryColor block p-2.5 transition"
              value={filter.value}
              onChange={(e) => {
                filter.onChange(e.target.value);
                setCurrentPage(1);
              }}
            >
              {filter.options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        ))}

        {/* Rating */}
        <div>
          <Label className="mb-2 block text-sm font-medium text-gray-700">
            التقييم (أو أعلى)
          </Label>
          <RatingFilter
            selected={selectedRating}
            onChange={(val) => {
              setSelectedRating(val);
              setCurrentPage(1);
            }}
          />
        </div>

        {/* Gender */}
        <div>
          <Label className="mb-3 block text-sm font-medium text-gray-700">
            الجنس
          </Label>
          <GenderFilter
            selected={selectedGender}
            onChange={(val) => {
              setSelectedGender(val);
              setCurrentPage(1);
            }}
          />
        </div>

        {isModal && (
          <Button
            onClick={() => setIsFilterModalOpen(false)}
            className="w-full !bg-primaryColor hover:!bg-cyan-700"
          >
            عرض النتائج
          </Button>
        )}
      </div>
    </div>
  );

  // --- ⭐ REDESIGNED JSX Structure ---
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-cyan-50 to-blue-100 border-b border-gray-200">
        <div className="container pt-16 pb-20 mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-800 mb-4">
            ابحث عن طبيبك المثالي
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            اعثر بكل سهولة على أفضل الأطباء الخبراء لتلبية احتياجاتك الصحية.
          </p>
          <div className="mt-8 max-w-2xl mx-auto relative">
            <Search
              className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
              size={22}
            />
            <input
              type="text"
              className="w-full py-4 ps-14 pe-6 border-gray-300 rounded-full text-md shadow-sm focus:ring-2 focus:ring-cyan-400 focus:border-primaryColor transition"
              placeholder="ابحث بالاسم، التخصص، أو المستشفى..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>
      </div>

      <div className="container py-12 mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Filters Sidebar (Desktop) */}
          <aside className="hidden lg:block lg:w-1/3 xl:w-1/4 flex-shrink-0">
            {renderFilters()}
          </aside>

          {/* Main Content */}
          <main className="w-full lg:flex-grow">
            {/* Controls: Filter Button & Sort */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Button
                color="light"
                className="flex lg:hidden items-center justify-center gap-2 w-full sm:w-auto border-gray-300 shadow-sm"
                onClick={() => setIsFilterModalOpen(true)}
              >
                <Filter size={18} />
                <span>
                  فلاتر البحث{" "}
                  {activeFilterCount > 0 && `(${activeFilterCount})`}
                </span>
              </Button>
              <div className="relative w-full sm:w-56 sm:ms-auto">
                <ArrowUpDown
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <select
                  id="sortOptions-doctors"
                  className="w-full bg-white border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-primaryColor focus:border-primaryColor block p-2.5 ps-9 appearance-none shadow-sm"
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  {sortOptionsData.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Content Display */}
            {loading && doctorsList.length === 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(doctorsPerPage)].map((_, i) => (
                  <Skeleton key={i} className="w-full h-[420px] rounded-xl" />
                ))}
              </div>
            ) : !loading && error ? (
              <div className="text-center py-16 px-6 bg-white rounded-2xl min-h-[400px] flex flex-col justify-center items-center">
                <div className="bg-red-100 p-4 rounded-full mb-5">
                  <XCircle size={40} className="text-red-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  حدث خطأ
                </h3>
                <p className="text-gray-500">
                  فشل في تحميل بيانات الأطباء. يرجى المحاولة مرة أخرى.
                </p>
              </div>
            ) : !loading && doctorsList.length === 0 ? (
              <div className="text-center py-16 px-6 bg-white rounded-xl min-h-[400px] flex flex-col justify-center items-center">
                <div className="bg-cyan-50 p-4 rounded-full mb-5">
                  <Frown size={40} className="text-primaryColor" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  لا يوجد نتائج مطابقة
                </h3>
                <p className="text-gray-500 mb-6 max-w-sm mx-auto">
                  حاول تعديل الفلاتر أو توسيع نطاق البحث للعثور على الطبيب
                  المناسب لك.
                </p>
                <Button
                  onClick={handleClearFilters}
                  color="light"
                  outline
                  className="group"
                >
                  <RotateCcw
                    size={16}
                    className="mr-2 group-hover:rotate-[-90deg] transition-transform"
                  />
                  مسح جميع الفلاتر
                </Button>
              </div>
            ) : (
              <>
                <p className="mb-4 text-gray-600">
                  عدد الاطباء{" "}
                  <span className="font-bold text-cyan-700">
                    {doctorsList.length}
                  </span>{" "}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {doctorsList.map((ele) => (
                    <DoctorCard ele={ele} key={ele._id || ele.id} />
                  ))}
                </div>
                {totalPages > 1 && (
                  <div className="flex justify-center mt-12">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={onPageChange}
                      showIcons
                      theme={{
                        pages: {
                          base: "xs:mt-0 mt-2 inline-flex items-center -space-x-px",
                          previous: {
                            base: "h-10 px-3 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700",
                          },
                          next: {
                            base: "h-10 px-3 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700",
                          },
                          selector: {
                            base: "w-10 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700",
                            active:
                              "bg-primaryColor text-white hover:bg-cyan-700 border-primaryColor",
                          },
                        },
                      }}
                    />
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>

      {/* Filter Modal (Mobile) */}
      <Modal
        show={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        popup
        position="center"
      >
        <ModalHeader className="px-5 pt-4 pb-2 border-b items-center">
          <span className="text-lg font-semibold text-gray-800">
            تصفية النتائج
          </span>
          {/* The close button is part of the header */}
        </ModalHeader>
        <ModalBody className="p-0">{renderFilters(true)}</ModalBody>
      </Modal>
    </div>
  );
}
