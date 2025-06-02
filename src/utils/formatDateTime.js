function formatDateTime(value, type) {
    if (!value) return "";

    const dateObj = new Date(value);

    if (type === "date") {
        const day = String(dateObj.getDate()).padStart(2, "0");
        const month = String(dateObj.getMonth() + 1).padStart(2, "0");
        const year = dateObj.getFullYear();
        return `${day}-${month}-${year}`;
    }

    if (type === "time") {
        const hours = String(dateObj.getHours()).padStart(2, "0");
        const minutes = String(dateObj.getMinutes()).padStart(2, "0");
        return `${hours}:${minutes}`;
    }

    if (type === "both") {
        const day = String(dateObj.getDate()).padStart(2, "0");
        const month = String(dateObj.getMonth() + 1).padStart(2, "0");
        const year = dateObj.getFullYear();
        const hours = String(dateObj.getHours()).padStart(2, "0");
        const minutes = String(dateObj.getMinutes()).padStart(2, "0");
        return `${day}-${month}-${year} ${hours}:${minutes}`;
    }

    if (type === "arabic") {
        const days = [
            "الأحد", "الاثنين", "الثلاثاء", "الأربعاء",
            "الخميس", "الجمعة", "السبت"
        ];
        const months = [
            "جانفي", "فيفري", "مارس", "أفريل", "ماي", "جوان",
            "جويلية", "أوت", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
        ];

        const dayName = days[dateObj.getDay()];
        const dayNumber = dateObj.getDate();
        const monthName = months[dateObj.getMonth()];
        return `${dayName}، ${dayNumber} ${monthName}`;
    }

    return "";
}

export default formatDateTime;
