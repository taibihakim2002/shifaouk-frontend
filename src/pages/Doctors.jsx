import {
  Button,
  Label,
  Select,
  TextInput,
  Radio,
  Modal,
  // ModalHeader, // Not used directly, Modal.Header is used
  // ModalBody,   // Not used directly, Modal.Body is used
  Pagination, // Added for potential pagination
} from "flowbite-react";
import DoctorCard from "../components/common/DoctorCard";
import {
  Filter,
  Search,
  XCircle,
  ListFilter,
  ArrowUpDown,
  RotateCcw,
} from "lucide-react";
import flowbit from "../config/flowbit";
import useApiRequest from "../hooks/useApiRequest";
import { useEffect, useState } from "react";
import globalApi from "../utils/globalApi";
import Skeleton from "../components/common/Skeleton";
import specializations from "../data/specializations";

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
  { value: "0-199", label: "أقل من 200 دج" },
  { value: "200-399", label: "من 200 دج إلى 399 دج" },
  { value: "400-599", label: "من 400 دج إلى 599 دج" },
  { value: "600-800", label: "من 600 دج إلى 800 دج" },
  { value: "801-Infinity", label: "أكبر من 800 دج" },
];

const ratingLevels = [
  { value: "", label: "كل التقييمات" },
  { value: "5", label: "5 نجوم فقط" },
  { value: "4", label: "4 نجوم فأكثر" },
  { value: "3", label: "3 نجوم فأكثر" },
  { value: "2", label: "نجمتين فأكثر" },
  { value: "1", label: "نجمة فأكثر" },
];

const sortOptionsData = [
  { value: "", label: "الفرز الافتراضي" },
  { value: "rating_desc", label: "التقييم (الأعلى أولاً)" },
  { value: "rating_asc", label: "التقييم (الأقل أولاً)" },
  { value: "price_asc", label: "السعر (الأقل أولاً)" },
  { value: "price_desc", label: "السعر (الأعلى أولاً)" },
  { value: "name_asc", label: "الاسم (أ-ي)" },
  { value: "name_desc", label: "الاسم (ي-أ)" },
  { value: "experience_desc", label: "الخبرة (الأكثر أولاً)" },
];

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}

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

  useEffect(() => {
    const fetchFilteredDoctors = () => {
      const paramsForQuery = {
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

      const activeParams = {};
      for (const key in paramsForQuery) {
        if (
          paramsForQuery[key] !== undefined &&
          paramsForQuery[key] !== null &&
          paramsForQuery[key] !== ""
        ) {
          activeParams[key] = paramsForQuery[key];
        }
      }
      const queryString = new URLSearchParams(activeParams).toString();

      console.log(queryString);
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
    doctorsPerPage,
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
      } else if (
        !apiResponse.data.users &&
        (apiResponse.data.totalPages || 1) === 0
      ) {
        setCurrentPage(1);
      }
    } else if (!loading && apiResponse !== undefined) {
      setDoctorsList([]);
      setTotalPages(1);
      setCurrentPage(1);
    }
  }, [apiResponse, loading]);

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedSpecialization("");
    setSelectedWilaya("");
    setSelectedPrice("");
    setSelectedRating("");
    setSelectedGender("");
    setSortBy("");
    setCurrentPage(1);
  };

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const renderFilters = (isModal = false) => (
    <div
      className={`p-1 ${
        isModal
          ? ""
          : "bg-white rounded-xl border sticky top-24 overflow-y-auto max-h-[calc(100vh-7rem)]"
      }`}
    >
      <div className="flex justify-between items-center mb-6 px-4 pt-4">
        <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <ListFilter size={22} className="text-primaryColor" />
          فلاتر البحث
        </h3>
        <Button
          onClick={handleClearFilters}
          size="xs"
          color="light"
          theme={flowbit.button}
          className="hover:text-red-700 text-red-500 border-red-300 hover:bg-red-50"
        >
          <RotateCcw size={14} className="mr-1" /> {/* Changed icon */}
          مسح الكل
        </Button>
      </div>
      <div className="space-y-5 p-4">
        <div>
          <Label
            htmlFor="specialization-filter"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            التخصص
          </Label>
          <select
            id="specialization-filter"
            className="p-1 rounded-lg border w-full text-sm focus:outline-blue-400"
            value={selectedSpecialization}
            onChange={(e) => {
              setSelectedSpecialization(e.target.value);
              setCurrentPage(1);
            }}
            theme={flowbit.select}
          >
            {specializations.map((spec) => (
              <option key={spec.value} value={spec.value}>
                {spec.label}
              </option>
            ))}
          </select>
        </div>
        {/* Wilaya */}
        <div>
          <Label
            htmlFor="wilaya-filter"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            الولاية
          </Label>
          <select
            id="wilaya-filter"
            className="p-1 rounded-lg border w-full text-sm focus:outline-blue-400"
            value={selectedWilaya}
            onChange={(e) => {
              setSelectedWilaya(e.target.value);
              setCurrentPage(1);
            }}
            theme={flowbit.select}
          >
            {wilayasData.map((wilaya) => (
              <option key={wilaya.value} value={wilaya.value}>
                {wilaya.label}
              </option>
            ))}
          </select>
        </div>
        {/* Price */}
        <div>
          <Label
            htmlFor="price-filter"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            السعر
          </Label>
          <select
            id="price-filter"
            className="p-1 rounded-lg border w-full text-sm focus:outline-blue-400"
            value={selectedPrice}
            onChange={(e) => {
              setSelectedPrice(e.target.value);
              setCurrentPage(1);
            }}
            theme={flowbit.select}
          >
            {priceRanges.map((range) => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </div>
        {/* Rating */}
        <div>
          <Label
            htmlFor="rating-filter"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            التقييم
          </Label>
          <select
            id="rating-filter"
            className="p-1 rounded-lg border w-full text-sm focus:outline-blue-400"
            value={selectedRating}
            onChange={(e) => {
              setSelectedRating(e.target.value);
              setCurrentPage(1);
            }}
            theme={flowbit.select}
          >
            {ratingLevels.map((level) => (
              <option key={level.value} value={level.value}>
                {level.label}
              </option>
            ))}
          </select>
        </div>
        {/* Gender */}
        <div>
          <Label className="mb-2 block text-sm font-medium text-gray-700">
            الجنس
          </Label>
          <fieldset className="flex flex-wrap gap-x-4 gap-y-2">
            <div className="flex items-center gap-2">
              <Radio
                id="gender-any-filter"
                name="gender-filter"
                value=""
                checked={selectedGender === ""}
                onChange={(e) => {
                  setSelectedGender(e.target.value);
                  setCurrentPage(1);
                }}
                theme={flowbit.radio}
              />
              <Label
                htmlFor="gender-any-filter"
                className="text-gray-600 text-sm"
              >
                الكل
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Radio
                id="gender-male-filter"
                name="gender-filter"
                value="male"
                checked={selectedGender === "male"}
                onChange={(e) => {
                  setSelectedGender(e.target.value);
                  setCurrentPage(1);
                }}
                theme={flowbit.radio}
              />
              <Label
                htmlFor="gender-male-filter"
                className="text-gray-600 text-sm"
              >
                ذكر
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Radio
                id="gender-female-filter"
                name="gender-filter"
                value="female"
                checked={selectedGender === "female"}
                onChange={(e) => {
                  setSelectedGender(e.target.value);
                  setCurrentPage(1);
                }}
                theme={flowbit.radio}
              />
              <Label
                htmlFor="gender-female-filter"
                className="text-gray-600 text-sm"
              >
                أنثى
              </Label>
            </div>
          </fieldset>
        </div>
        {isModal && (
          <Button
            color="primary"
            onClick={() => setIsFilterModalOpen(false)}
            className="w-full mt-6"
            theme={flowbit.button}
          >
            عرض النتائج
          </Button>
        )}
      </div>
    </div>
  );

  if (error && !loading) {
    return (
      <div className="container py-16 text-center text-red-600 text-lg">
        {" "}
        <XCircle className="inline-block mr-2" size={24} /> حدث خطأ أثناء تحميل
        بيانات الأطباء. الرجاء المحاولة مرة أخرى.
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="container py-10 mx-auto px-4">
        <div className="text-center lg:text-right mb-10">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
            ابحث عن طبيبك المثالي
          </h1>
          <p className="text-md lg:text-lg text-gray-600">
            اعثر على أفضل الأطباء الخبراء لتلبية احتياجاتك الصحية بكل سهولة.
          </p>
        </div>

        <div className="mb-8 p-4 bg-white rounded-xl shadow-lg flex flex-col md:flex-row items-center gap-3 md:gap-4 sticky top-4 z-20">
          <div className="md:flex-grow">
            <TextInput
              theme={flowbit.input}
              color="primary"
              className="w-full"
              id="search-doctors"
              type="text"
              icon={Search}
              placeholder="ابحث بالاسم، التخصص، أو المستشفى..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <div className="w-full md:w-auto md:min-w-[240px]">
            <select
              className="p-1 rounded-lg border w-full text-sm focus:outline-blue-400"
              id="sortOptions-doctors"
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                setCurrentPage(1);
              }}
              theme={flowbit.select}
              icon={ArrowUpDown}
            >
              {sortOptionsData.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <Button
            theme={flowbit.button}
            color="primary"
            className="flex lg:hidden items-center gap-2 w-full md:w-auto justify-center py-2.5"
            outline
            onClick={() => setIsFilterModalOpen(true)}
          >
            <Filter size={18} />
            <span>فلاتر البحث</span>
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="hidden lg:block lg:w-[300px] xl:w-[340px] flex-shrink-0">
            {" "}
            {/* Explicit wider width */}
            {renderFilters()}
          </aside>
          <main className="w-full lg:flex-grow">
            {loading && doctorsList.length === 0 ? ( // Show skeletons only if list is empty and loading
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {" "}
                {/* Adjusted grid for larger screens */}
                {[...Array(doctorsPerPage)].map((_, index) => (
                  <Skeleton
                    key={index}
                    className="w-full h-80 rounded-xl shadow-lg"
                  />
                ))}
              </div>
            ) : !loading && doctorsList.length === 0 ? (
              <div className="text-center py-16 px-6 bg-white rounded-xl shadow-xl h-full flex flex-col justify-center items-center">
                <ListFilter size={56} className="mx-auto text-gray-300 mb-5" />
                <h3 className="text-2xl font-semibold text-gray-700 mb-3">
                  لا يوجد أطباء تطابق بحثك
                </h3>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">
                  نأسف، لم نتمكن من العثور على أي أطباء يطابقون معايير الفلترة
                  والبحث الحالية. حاول تعديل الفلاتر أو توسيع نطاق البحث.
                </p>
                <Button
                  onClick={handleClearFilters}
                  color="primary"
                  outline
                  className="mt-6 group"
                  theme={flowbit.button}
                >
                  <RotateCcw
                    size={18}
                    className="mr-2 group-hover:rotate-[-90deg] transition-transform duration-300"
                  />
                  مسح جميع الفلاتر
                </Button>
              </div>
            ) : (
              <>
                <div className="mb-4 flex flex-col sm:flex-row justify-between items-center">
                  <p className="text-md text-gray-700">
                    عرض{" "}
                    <span className="font-bold text-primaryColor">
                      {doctorsList.length}
                    </span>{" "}
                    من الأطباء
                    {apiResponse?.data?.totalDocs
                      ? ` (من أصل ${apiResponse.data.totalDocs})`
                      : ""}
                    .
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-8">
                  {doctorsList.map((ele) => (
                    <DoctorCard ele={ele} key={ele._id || ele.id} />
                  ))}
                </div>
                {totalPages > 1 && (
                  <div className="flex justify-center mt-10">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={onPageChange}
                      theme={flowbit.pagination} // تأكد من أن لديك ثيم مخصص للترقيم
                      showIcons
                    />
                  </div>
                )}
              </>
            )}
            {/* Show loading indicator at bottom if loading more pages or initial but list not empty */}
            {loading && doctorsList.length > 0 && (
              <div className="text-center py-6">
                <Button color="light" disabled theme={flowbit.button}>
                  <svg
                    aria-hidden="true"
                    role="status"
                    className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0492C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="#1C64F2"
                    />
                  </svg>
                  جاري التحميل ...
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>

      <Modal
        show={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        popup
        position="right"
        theme={flowbit.modal}
      >
        <Modal.Header className="text-right px-4 pt-4 pb-2 border-b">
          {" "}
          {/* Added border-b */}
          <span className="font-semibold text-lg text-gray-700">
            تصفية النتائج
          </span>
        </Modal.Header>
        <Modal.Body className="p-0">
          {" "}
          {/* Changed to p-0 to let renderFilters handle padding */}
          {renderFilters(true)}
        </Modal.Body>
      </Modal>
    </div>
  );
}
