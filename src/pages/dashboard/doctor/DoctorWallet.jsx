import {
  ArrowDownIcon,
  ArrowLeftRightIcon,
  ArrowUpIcon,
  GiftIcon,
  Wallet,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import DashPageHeader from "../../../components/dashboard/common/DashPageHeader";
import { HiCurrencyDollar, HiOutlineClipboardList } from "react-icons/hi";
import flowbit from "../../../config/flowbit";
import {
  Badge,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import formatDateTime from "../../../utils/formatDateTime";
import useApiRequest from "../../../hooks/useApiRequest";
import globalApi from "../../../utils/globalApi";

const data = [
  { name: "يناير", received: 400, sent: 650 },
  { name: "فبراير", received: 820, sent: 50 },
  { name: "مارس", received: 980, sent: 150 },
  { name: "أبريل", received: 10, sent: 100 },
  { name: "ماي", received: 780, sent: 350 },
  { name: "جوان", received: 630, sent: 50 },
  { name: "جويلية", received: 490, sent: 420 },
  { name: "أوت", received: 310, sent: 20 },
  { name: "سبتمبر", received: 150, sent: 530 },
  { name: "أكتوبر", received: 120, sent: 590 },
  { name: "نوفمبر", received: 12, sent: 23 },
  { name: "ديسمبر", received: 30, sent: 200 },
];
const transactions = [
  {
    type: "charge",
    details: "إضافة رصيد",
    amount: 3500,
    date: "10 يونيو 2024 - 10:43 ص",
    status: "مكتمل",
  },
  {
    type: "payment",
    details: "استشارة طبية - د.حمودي معاذ",
    amount: -250,
    date: "10 يونيو 2024 - 10:43 ص",
    status: "مكتمل",
  },
  {
    type: "transfer",
    details: "إرسال إلى محمد حلاوي",
    amount: -3600,
    date: "10 يونيو 2024 - 10:43 ص",
    status: "مكتمل",
  },
  {
    type: "reward",
    details: "دعوة صديق",
    amount: 250,
    date: "10 يونيو 2024 - 10:43 ص",
    status: "مكتمل",
  },
  {
    type: "receive",
    details: "استلام من محمد حلاوي",
    amount: 3600,
    date: "10 يونيو 2024 - 10:43 ص",
    status: "مكتمل",
  },
];

function getIconForTransaction(type) {
  switch (type) {
    // Transactions representing money IN (e.g., green color)
    case "recharge":
    case "consultation_income":
    case "consultation_refund":
    case "refund":
      return <ArrowUpIcon className="h-5 w-5 flex-shrink-0 text-green-500" />;

    // Transactions representing money OUT (e.g., red color)
    case "payment":
    case "consultation":
      return <ArrowDownIcon className="h-5 w-5 flex-shrink-0 text-red-500" />;

    default:
      // A neutral icon for any other or unknown types
      return <CreditCardIcon className="h-5 w-5 flex-shrink-0 text-gray-400" />;
  }
}

function getLabelForTransaction(type) {
  switch (type) {
    case "recharge":
      return "شحن رصيد";
    case "payment":
      return "دفعة";
    case "consultation":
      return "دفع استشارة";
    case "consultation_income":
      return "عائد استشارة";
    case "consultation_refund":
      return "استرداد مبلغ استشارة";
    case "refund":
      return "استرداد مبلغ";
    default:
      return type || "غير محدد"; // Fallback for any unexpected type
  }
}

function getIcon(type) {
  switch (type) {
    case "charge":
    case "receive":
      return <ArrowUpIcon className="text-green-600 w-5 h-5" />;
    case "payment":
      return <ArrowDownIcon className="text-red-600 w-5 h-5" />;
    case "transfer":
      return <ArrowLeftRightIcon className="text-red-600 w-5 h-5" />;
    case "reward":
      return <GiftIcon className="text-blue-600 w-5 h-5" />;
    default:
      return null;
  }
}

function getLabel(type) {
  switch (type) {
    case "charge":
      return "شحن";
    case "payment":
      return "دفع";
    case "transfer":
      return "إرسال";
    case "reward":
      return "مكافأة";
    case "receive":
      return "استلام";
    default:
      return type;
  }
}

export default function DoctorWallet() {
  const [balance, setBalance] = useState();
  const [transactions, setTransactions] = useState();
  const {
    data: balanceData,
    loading: balanceLoading,
    error: balanceError,
    request: balanceRequest,
  } = useApiRequest();
  const {
    data: transactionsData,
    loading: transactionsLoading,
    error: transactionsError,
    request: transactionsRequest,
  } = useApiRequest();

  useEffect(() => {
    balanceRequest(() => globalApi.getMyBalance());
    transactionsRequest(() => globalApi.getMyTransactions());
  }, []);

  useEffect(() => {
    setBalance(balanceData?.data?.balance);
  }, [balanceData]);
  useEffect(() => {
    setTransactions(transactionsData?.data);
  }, [transactionsData]);

  return (
    <div>
      <DashPageHeader
        Icon={Wallet}
        title="المحفظة"
        description="قم بادارة محفظتك "
      />

      <div className="mb-10 max-w-2xl m-auto bg-gradient-to-br from-primary-600 to-primary-500 dark:from-primary-700 dark:to-primary-600 text-white rounded-xl shadow-2xl p-6 py-8 transform hover:scale-105 transition-transform duration-300">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">رصيدك الحالي</h3>
          <HiCurrencyDollar size={36} className="opacity-80" />
        </div>
        <div className="mb-6">
          <h3 className="font-extrabold text-[40px] tracking-tight mb-1">
            {balance} <span className="text-lg font-normal opacity-90">دج</span>
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-10">
        <div className="col-span-2 h-[500px] border rounded-lg p-2 lg:p-5">
          <h2 className="text-lg font-bold text-gray-600 mb-5">
            نشاط المعاملات
          </h2>

          <div className="flex justify-center gap-4 mb-4">
            <span className="bg-green-500 text-white px-4 py-1 rounded-md text-sm font-medium">
              المرسلة
            </span>
            <span className="bg-blue-500 text-white px-4 py-1 rounded-md text-sm font-medium">
              المستقبلة
            </span>
          </div>

          <div className="w-full h-full" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 60 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  angle={-45}
                  textAnchor="end"
                  height={70}
                  tick={{ fontSize: 12, fill: "#333" }}
                />
                <YAxis tick={{ fontSize: 12, fill: "#333" }} />
                <Tooltip />
                <Bar dataKey="received" fill="#64b5f6" name="المستقبلة" />
                <Bar dataKey="sent" fill="#81c784" name="المرسلة" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="border rounded-lg  p-5">
          <h3 className="text-lg font-bold text-gray-600">مكافئات المحفظة</h3>
          <div className="w-full h-full flex justify-center items-center">
            <p>لا توجد مكافئات حاليا</p>
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-xl shadow-lg p-4 sm:p-6">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
          سجل المعاملات الأخير
        </h3>
        <div className="overflow-x-auto">
          <Table
            hoverable
            className="min-w-[700px] text-right dark:divide-gray-700"
          >
            <TableHead className="bg-slate-100 dark:bg-gray-700 text-xs text-gray-600 dark:text-gray-300 uppercase">
              <TableHeadCell className="p-3 px-4 whitespace-nowrap">
                نوع المعاملة
              </TableHeadCell>
              <TableHeadCell className="p-3 px-4 whitespace-nowrap">
                التفاصيل
              </TableHeadCell>
              <TableHeadCell className="p-3 px-4 whitespace-nowrap text-center">
                المبلغ (دج)
              </TableHeadCell>
              <TableHeadCell className="p-3 px-4 whitespace-nowrap">
                التاريخ والوقت
              </TableHeadCell>
              <TableHeadCell className="p-3 px-4 whitespace-nowrap text-center">
                الحالة
              </TableHeadCell>
            </TableHead>
            <TableBody className="divide-y dark:divide-gray-700">
              {transactions?.length > 0 ? (
                transactions?.map((tx) => (
                  <TableRow
                    key={tx._id}
                    className="bg-white dark:bg-gray-800 hover:bg-slate-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <TableCell className="p-3 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-2.5">
                        {getIconForTransaction(tx.type)}
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                          {getLabelForTransaction(tx.type)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="p-3 px-4 text-sm text-gray-600 dark:text-gray-300 max-w-xs truncate">
                      {tx.note}
                    </TableCell>
                    <TableCell
                      className={`p-3 px-4 text-sm font-semibold text-center whitespace-nowrap ${
                        tx.amount < 0
                          ? "text-red-600 dark:text-red-400"
                          : "text-green-600 dark:text-green-400"
                      }`}
                    >
                      {tx.amount > 0 ? `+${tx.amount}` : tx.amount}
                    </TableCell>
                    <TableCell className="p-3 px-4 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                      {formatDateTime(tx.createdAt, "date")}
                    </TableCell>
                    <TableCell className="p-3 px-4 text-center">
                      <Badge
                        color={
                          tx.status === "confirmed"
                            ? "success"
                            : tx.status === "pending"
                            ? "warning"
                            : "failure"
                        }
                        theme={flowbit.badge}
                        className="w-fit"
                      >
                        {tx.status === "confirmed"
                          ? "مكتملة"
                          : tx.status === "pending"
                          ? "قيد المعالجة"
                          : "فشلت"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-10 text-gray-500 dark:text-gray-400"
                  >
                    <HiOutlineClipboardList
                      size={40}
                      className="mx-auto mb-2 text-gray-400 dark:text-gray-500"
                    />
                    لا توجد معاملات لعرضها حاليًا.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
