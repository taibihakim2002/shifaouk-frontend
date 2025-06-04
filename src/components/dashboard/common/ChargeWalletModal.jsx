import { useState } from "react";
import flowbit from "../../../config/flowbit";
import {
  Button,
  Datepicker,
  FileInput,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  TextInput,
  Textarea,
} from "flowbite-react";
import {
  HiCheckCircle,
  HiOutlineCurrencyDollar,
  HiOutlineUser,
} from "react-icons/hi2";
import { HiOutlineClipboardList, HiX } from "react-icons/hi";
import useApiRequest from "../../../hooks/useApiRequest";
import globalApi from "../../../utils/globalApi";
import useToastStore from "../../../store/toastStore";

export default function ChargeWalletModal({ open, onClose }) {
  const { showToast } = useToastStore();

  const { request: chargeRequest } = useApiRequest();

  const [senderName, setSenderName] = useState("");
  const [amountSent, setAmountSent] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [transferDate, setTransferDate] = useState();
  const [receiptFile, setReceiptFile] = useState(null);
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!senderName.trim()) newErrors.senderName = "اسم المرسل مطلوب.";
    if (!amountSent || isNaN(amountSent) || parseFloat(amountSent) <= 0)
      newErrors.amountSent = "الرجاء إدخال مبلغ صحيح أكبر من صفر.";
    if (!transactionId.trim()) newErrors.transactionId = "رقم المعاملة مطلوب.";
    if (!transferDate) newErrors.transferDate = "تاريخ التحويل مطلوب.";
    if (!receiptFile) newErrors.receiptFile = "يرجى إرفاق وصل الدفع.";
    else if (receiptFile.size > 2 * 1024 * 1024)
      newErrors.receiptFile = "حجم الملف يجب أن يكون أقل من 2 ميجابايت.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("senderName", senderName);
    formData.append("amount", parseFloat(amountSent));
    formData.append("transactionId", transactionId);
    formData.append("transferDate", transferDate.toISOString());
    formData.append("receipt", receiptFile);
    formData.append("notes", notes);

    const { success, error } = await chargeRequest(() =>
      globalApi.createChargeRequest(formData)
    );

    setIsSubmitting(false);

    if (success) {
      // Reset form
      setSenderName("");
      setAmountSent("");
      setTransactionId("");
      setTransferDate(new Date());
      setReceiptFile(null);
      setNotes("");
      setErrors({});
      showToast("success", "تم ارسال طلب الشحن بنجاح");
      onClose();
    } else {
      showToast("error", error || "فشل إرسال الطلب");
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setReceiptFile(file);
      setErrors((prev) => ({ ...prev, receiptFile: undefined }));
    }
  };

  return (
    <Modal
      show={open}
      onClose={onClose}
      size="lg"
      popup
      theme={flowbit.modal}
      dir="rtl"
    >
      <ModalHeader className="border-b border-gray-200 dark:border-gray-700 !p-4">
        <span className="text-lg font-semibold text-gray-900 dark:text-white">
          طلب شحن رصيد المحفظة
        </span>
      </ModalHeader>
      <ModalBody className="custom-scrollbar max-h-[70vh] overflow-y-auto">
        <form
          className="space-y-5 p-2 sm:p-3"
          onSubmit={(e) => e.preventDefault()}
        >
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 text-center bg-blue-50 dark:bg-gray-700 p-3 rounded-md">
            يرجى ملء معلومات التحويل بدقة وإرفاق صورة واضحة لوصل الدفع. سيتم
            مراجعة طلبك من قبل الإدارة.
          </p>

          <div>
            <Label htmlFor="senderName" value="اسم المرسل الكامل" />
            <TextInput
              id="senderName"
              icon={HiOutlineUser}
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              placeholder="مثال: محمد أحمد علي"
              color={errors.senderName ? "failure" : "gray"}
              helperText={
                errors.senderName && (
                  <span className="text-red-600 text-xs">
                    {errors.senderName}
                  </span>
                )
              }
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="amountSent" value="المبلغ المُرسَل (دج)" />
              <TextInput
                id="amountSent"
                type="number"
                icon={HiOutlineCurrencyDollar}
                value={amountSent}
                onChange={(e) => setAmountSent(e.target.value)}
                placeholder="مثال: 2500"
                min="1"
                color={errors.amountSent ? "failure" : "gray"}
                helperText={
                  errors.amountSent && (
                    <span className="text-red-600 text-xs">
                      {errors.amountSent}
                    </span>
                  )
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="transferDate" value="تاريخ التحويل" />
              {/* <Datepicker
                language="en"
                value={transferDate}
                onChanged={(date) => setTransferDate(date)}
                theme={flowbit.customInlineDatePicker}
              /> */}
              <Datepicker
                language="ar"
                labelTodayButton="اليوم"
                labelClearButton="ازالة"
                value={transferDate}
                onChange={(e) => setTransferDate(e)}
                theme={flowbit.customInlineDatePicker}
              />
              {errors.transferDate && (
                <span className="text-red-600 text-xs mt-1 block">
                  {errors.transferDate}
                </span>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="transactionId" value="رقم المعاملة/الوصل/المرجع" />
            <TextInput
              id="transactionId"
              icon={HiOutlineClipboardList}
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              placeholder="أدخل رقم المعاملة الموجود على الوصل"
              color={errors.transactionId ? "failure" : "gray"}
              helperText={
                errors.transactionId && (
                  <span className="text-red-600 text-xs">
                    {errors.transactionId}
                  </span>
                )
              }
              required
            />
          </div>

          <div>
            <Label htmlFor="receiptFile" value="إرفاق وصل الدفع" />
            <FileInput
              id="receiptFile"
              onChange={handleFileChange}
              helperText="يرجى إرفاق صورة واضحة (JPG, PNG, PDF - الحد الأقصى 2MB)"
              color={errors.receiptFile ? "failure" : "gray"}
              className="[&_input]:text-sm"
            />
            {receiptFile && (
              <p className="text-xs text-green-600 mt-1">
                📎 {receiptFile.name} ({(receiptFile.size / 1024).toFixed(1)}{" "}
                KB)
              </p>
            )}
            {errors.receiptFile && (
              <span className="text-red-600 text-xs mt-1 block">
                {errors.receiptFile}
              </span>
            )}
          </div>

          <div>
            <Label htmlFor="notes" value="ملاحظات إضافية (اختياري)" />
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="أي تفاصيل إضافية تود ذكرها..."
              rows={3}
              className="text-sm"
            />
          </div>
        </form>
      </ModalBody>
      <ModalFooter className="flex justify-between items-center border-t border-gray-200 dark:border-gray-700 !p-4">
        <Button
          color="gray"
          onClick={onClose}
          theme={flowbit.button}
          className="focus:ring-gray-300 dark:focus:ring-gray-600"
        >
          <HiX className="ml-2 h-4 w-4" />
          إلغاء
        </Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          theme={flowbit.button}
          isProcessing={isSubmitting}
          disabled={isSubmitting}
          className="min-w-[150px]"
        >
          {isSubmitting ? "جاري الإرسال..." : "إرسال طلب الشحن"}
          {!isSubmitting && <HiCheckCircle className="mr-2 h-5 w-5" />}
        </Button>
      </ModalFooter>
    </Modal>
  );
}
