const errorMessages = {
    // 🟢 Authentication Errors
    1000: "بيانات الدخول غير صحيحة",
    1001: "المستخدم غير موجود",
    1002: "كلمة المرور غير صحيحة",
    1003: "انتهت صلاحية الجلسة، يرجى تسجيل الدخول مجددًا",
    1004: "رمز المصادقة غير صالح",
    1005: "تم حظر الحساب، يرجى التواصل مع الدعم",

    // 🔒 Authorization Errors
    1100: "غير مصرح لك بالوصول إلى هذا المورد",
    1101: "صلاحياتك لا تسمح بالقيام بهذا الإجراء",

    // ✍️ Validation & Input Errors
    1200: "يرجى تعبئة جميع الحقول المطلوبة",
    1201: "البيانات المدخلة غير صحيحة",
    1202: "صيغة البيانات غير صحيحة",
    1203: "كلمة المرور ضعيفة جداً",
    1204: "البريد الإلكتروني مستخدم مسبقاً",
    1205: "رقم الهاتف مستخدم مسبقاً",
    1206: "خطأ اثناء التحقق، قيمة مكررة",
    1207: "المعرّف غير صالح",

    // 🧾 Resource Not Found
    1300: "المستخدم غير موجود",
    1301: "الطبيب غير موجود",
    1302: "الحجز غير موجود",
    1303: "الصفحة غير موجودة",

    // 🖥️ Server/Internal Errors
    1400: "حدث خطأ غير متوقع في الخادم",
    1401: "خطأ في الاتصال بقاعدة البيانات",
    1402: "خطأ في خدمة خارجية",
    1403: "فشل في رفع الملف، حاول مرة أخرى",         // ✅ جديد: رفع ملف

    // 📦 Business Logic Errors
    1500: "هذا الموعد محجوز مسبقاً",
    1501: "الوقت المختار غير متاح",
    1502: "فشل في عملية الدفع، حاول مجدداً",
    1503: "حسابك غير مفعل ",
    1504: "تمت مراجعة ملف هذا الطبيب مسبقا",
    1505: "التاريخ في الماضي!",
    1506: "الطبيب ليس متاح في هذا التوقيت",
    1507: "الموعد محجوز من طرف مريض آخر",
    1508: "المحفظة غير موجودة",
    1509: "الرصيد غير كافي لإجراء الحجز",
    1510: "حدث خطأ أثناء الحجز",

    // 📤 External Services
    1600: "فشل في إرسال الرسالة النصية",
    1601: "فشل في إرسال البريد الإلكتروني",

    // 📁 File Upload Errors (جديدة)
    1700: "حدث خطأ أثناء رفع الملف",                // UPLOAD_ERROR
    1701: "حجم الملف كبير جداً",                    // UPLOAD_FILE_TOO_LARGE
    1702: "تم إرسال حقل غير متوقع",                // UPLOAD_UNEXPECTED_FIELD
    1703: "نوع الملف غير مدعوم",                   // UPLOAD_UNSUPPORTED_TYPE

    // ❓ Default fallback
    1999: "حدث خطأ غير معروف، يرجى المحاولة لاحقاً"
};

export default errorMessages;
