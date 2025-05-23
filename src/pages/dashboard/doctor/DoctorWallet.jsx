import {
  ArrowDownIcon,
  ArrowLeftRightIcon,
  ArrowUpIcon,
  GiftIcon,
  Wallet,
} from "lucide-react";
import React from "react";
import DashPageHeader from "../../../components/dashboard/common/DashPageHeader";
import { HiCurrencyDollar } from "react-icons/hi";
import flowbit from "../../../config/flowbit";
import {
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
  return (
    <div>
      <DashPageHeader
        Icon={Wallet}
        title="المحفظة"
        description="قم بادارة محفظتك "
      />

      <div className="rounded-lg bg-[url('/imgs/website/dash-next.png')] bg-cover p-5 px-10 lg:w-2/3 lg:mx-auto mb-8">
        <div className="flex items-center justify-between gap-2 text-white mb-5">
          <h3 className="text-xl font-bold">رصيدك الحالي</h3>
          <HiCurrencyDollar size={33} />
        </div>
        <div className="flex flex-col gap-3 md:flex-row items-center md:justify-between">
          <div className="text-white text-center md:text-start">
            <h3 className="font-bold mb-3">
              <span className="text-xl">25.000</span>{" "}
              <span className="text-md">دينار طبي</span>
            </h3>
            <p className="font-light text-sm text-gray-200">
              يعادل 25.000 دينار جزائري
            </p>
          </div>
          <Button theme={flowbit.button} color="green" className="w-32">
            شحن
          </Button>
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
      <div className="border rounded-lg p-5">
        <h3 className="text-lg font-bold mb-10">نشاط المعاملات</h3>
        <div className="overflow-x-auto mb-3">
          <Table className="text-right">
            <TableHead className="bg-gray-100">
              <TableHeadCell>نوع المعاملة</TableHeadCell>
              <TableHeadCell>تفاصيل</TableHeadCell>
              <TableHeadCell>المبلغ</TableHeadCell>
              <TableHeadCell>التاريخ</TableHeadCell>
              <TableHeadCell>الحالة</TableHeadCell>
            </TableHead>
            <TableBody>
              {transactions.map((tx, index) => (
                <TableRow key={index} className="bg-white">
                  <TableCell className="flex items-center gap-2">
                    {getIcon(tx.type)}
                    {getLabel(tx.type)}
                  </TableCell>
                  <TableCell>{tx.details}</TableCell>
                  <TableCell
                    className={
                      tx.amount < 0 ? "text-red-600" : "text-green-600"
                    }
                  >
                    {tx.amount > 0 ? `+${tx.amount}` : tx.amount}
                  </TableCell>
                  <TableCell>{tx.date}</TableCell>
                  <TableCell>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                      {tx.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
