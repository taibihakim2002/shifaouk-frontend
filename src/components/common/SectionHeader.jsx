import React from "react"; // من الجيد دائمًا استيراد React

// نفترض أن primaryColor معرفة في إعدادات Tailwind CSS
// مثال: primaryColor: '#4F46E5'

export default function SectionHeader({ sectionTitle, icon }) {
  const IconComponent = icon; // إعادة تسمية لتجنب الخلط مع JSX

  return (
    <div className="text-center mb-12 md:mb-16">
      {" "}
      {/* حاوية رئيسية مع توسيط للنص وهامش سفلي أكبر */}
      {IconComponent && ( // عرض الأيقونة فقط في حال تم تمريرها
        <div className="flex justify-center items-center mb-4 md:mb-5">
          {/* خلفية دائرية أو مربعة بحواف دائرية للأيقونة لمزيد من التميز */}
          <div className="p-3 bg-primaryColor/10 dark:bg-primaryColor/20 rounded-full">
            <IconComponent
              className="text-primaryColor"
              size={32} // حجم مناسب للأيقونة داخل الدائرة
              strokeWidth={1.75} // سمك خط أنحف قليلاً لأيقونات Lucide
            />
          </div>
        </div>
      )}
      <h2 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight leading-tight">
        {sectionTitle}
      </h2>
      {/* خط زخرفي صغير أسفل العنوان لمسة عصرية */}
      <div className="mt-4 h-[3px] w-20 md:w-28 bg-primaryColor rounded-full mx-auto"></div>
    </div>
  );
}
