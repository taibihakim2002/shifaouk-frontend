import { IoMdSettings } from "react-icons/io";
import DashPageHeader from "../../../components/dashboard/common/DashPageHeader";
import { Button, Label, TabItem, Tabs, TextInput } from "flowbite-react";
import { HiMail, HiUserCircle } from "react-icons/hi";
import flowbit from "../../../config/flowbit";
import { IoSettings } from "react-icons/io5";
import { AiOutlineSafety } from "react-icons/ai";
import { Phone } from "lucide-react";
import { MdDelete, MdDeleteForever, MdEmail } from "react-icons/md";
import { BsCamera } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { TiWarning } from "react-icons/ti";

export default function AdminSettings() {
  return (
    <div>
      <DashPageHeader Icon={IoMdSettings} title="الاعدادات" />

      <Tabs
        aria-label="Default tabs"
        variant="pills"
        theme={flowbit.adminSettingsTabs}
      >
        <TabItem active title="الاعدادات العامة" icon={IoSettings}>
          <div className="mt-10 p-5 border rounded-xl bg-white">
            <h2 className="text-lg font-bold text-gray-600 mb-10">
              الاعدادت العامة
            </h2>

            <div className="">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="name">اسم المنصة</Label>
                  <TextInput id="name" type="text" value="شفائك" required />
                </div>
                <div className="flex flex-col gap-2" dir="rtl">
                  <Label htmlFor="states">اللغة الافتراضية </Label>
                  <select
                    className="border p-1 rounded-md bg-gray-50 text-gray-900 border-gray-300 "
                    id="states"
                    required
                    defaultValue=""
                  >
                    <option value="">اللغة العربية </option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="email">البريد الرسمي للمنصة </Label>
                  <TextInput
                    id="email"
                    type="email"
                    rightIcon={MdEmail}
                    placeholder="ahmed@example.com"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="phone">رقم هاتف الدعم</Label>
                  <TextInput
                    id="phone"
                    type="number"
                    rightIcon={Phone}
                    placeholder="0655408680"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-center gap-10">
                <Button theme={flowbit.button} color="green">
                  حفظ
                </Button>
              </div>
            </div>
          </div>
        </TabItem>
        <TabItem active title="الحساب الشخصي" icon={HiUserCircle}>
          <div className="mt-10 p-5 border rounded-xl bg-white">
            <h2 className="text-lg font-bold text-gray-600 mb-10">
              الحساب الشخصي
            </h2>

            <div className="mb-8">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-5 mb-5">
                <div className="flex flex-col items-center gap-2">
                  <img
                    src="/doctor1.jpg"
                    alt="doctor image"
                    className="w-28 h-28 rounded-full object-cover"
                  />
                  <div>
                    <Button
                      theme={flowbit.button}
                      color="primary"
                      className="flex gap-2 mb-3"
                    >
                      <span>
                        <BsCamera size={18} className="text-white" />
                      </span>
                      <span>تغيير الصورة</span>
                    </Button>
                    <Button
                      theme={flowbit.button}
                      color="light"
                      className="flex gap-2 m-auto"
                    >
                      <span>
                        <MdDelete size={18} className="text-gray-600" />
                      </span>
                      <span>إزالة</span>
                    </Button>
                  </div>
                </div>
                <div className="md:col-span-4 grid grid-cols-1  md:grid-cols-2 gap-5">
                  <div className="flex flex-col  gap-2">
                    <Label htmlFor="name">الاسم</Label>
                    <TextInput
                      id="name"
                      type="text"
                      rightIcon={FaUser}
                      value="عبد الحكيم"
                      placeholder="أدخل إسمك هنا..."
                      required
                    />
                  </div>
                  <div className="flex flex-col  gap-2">
                    <Label htmlFor="name">اللقب</Label>
                    <TextInput
                      id="name"
                      type="text"
                      value="طيبي"
                      rightIcon={FaUser}
                      placeholder="أدخل لقبك هنا..."
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2 ">
                    <Label htmlFor="email">البريد الالكتروني</Label>
                    <TextInput
                      id="email"
                      type="email"
                      rightIcon={HiMail}
                      placeholder="ahmed@example.com"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2 ">
                    <Label htmlFor="phone">رقم الهاتف</Label>
                    <TextInput
                      id="phone"
                      type="number"
                      rightIcon={Phone}
                      placeholder="06********"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2" dir="rtl">
                    <Label htmlFor="password">كلمة المرور القديمة</Label>
                    <TextInput
                      id="password"
                      type="password"
                      placeholder="*************"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2" dir="rtl">
                    <Label htmlFor="password">كلمة المرور الجديدة</Label>
                    <TextInput
                      id="password"
                      type="password"
                      placeholder="*************"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-center gap-10">
                <Button theme={flowbit.button} color="green">
                  حفظ
                </Button>
              </div>
            </div>
            <div className="p-5 border rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1 rounded-full bg-[#ffc2c2]">
                  <TiWarning className="text-[#F50000]" size={22} />
                </div>
                <h3 className="text-gray-600 font-bold ">
                  منطقة الاجراءات الحساسة
                </h3>
              </div>

              <p className="text-[#F50000] text-sm p-2 bg-[#ffd4d4] rounded-lg mb-5">
                تحذير: الإجراءات التالية قد تؤدي إلى فقدان البيانات أو تعطيل
                الوصول إلى حسابك.
              </p>
              <div className="flex items-center justify-between">
                <Button
                  theme={flowbit.button}
                  color="light"
                  className="flex gap-2"
                >
                  <span>
                    <FiLogOut size={18} />
                  </span>
                  <span>تسجيل الخروج </span>
                </Button>
                <Button
                  theme={flowbit.button}
                  color="red"
                  className="flex gap-2"
                >
                  <span>
                    <MdDeleteForever size={18} />
                  </span>
                  <span>إزالة الحساب</span>
                </Button>
              </div>
            </div>
          </div>
        </TabItem>
        <TabItem active title="اعدادات الامان" icon={AiOutlineSafety}>
          <h3 className="text-center text-lg text-gray-600">
            هذا القسم غير متوفر حاليا ...
          </h3>
        </TabItem>
      </Tabs>
    </div>
  );
}
