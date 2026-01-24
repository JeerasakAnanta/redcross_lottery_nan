'use client';

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from 'next/link';
import { TrashIcon, PlusIcon, TrophyIcon } from '@heroicons/react/24/outline';

const NODE_ENDPOINT_SHOW = process.env.NEXT_PUBLIC_NODE_ENDPOINT_SHOW;
const NODE_ENDPOINT_DELETE = process.env.NEXT_PUBLIC_NODE_ENDPOINT_DELETE;

interface LotteryItem {
  id: number;
  lottery_number: number;
  reward_number: number;
}

const Showlottery: React.FC = () => {
  const [lotteryData, setLotteryData] = useState<LotteryItem[]>([]);
  const [sortField, setSortField] = useState<keyof LotteryItem | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get(`${NODE_ENDPOINT_SHOW}`)
      .then(({ data }) => setLotteryData(data))
      .catch((error) => console.error("Error fetching data", error));
  };

  const handleSort = (field: keyof LotteryItem) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);

    const sortedData = [...lotteryData].sort((a, b) => {
      return order === "asc"
        ? (a[field] > b[field] ? 1 : -1)
        : (a[field] < b[field] ? 1 : -1);
    });
    setLotteryData(sortedData);
  };

  const confirmDelete = async (id: number) => {
    if (window.confirm("คุณต้องการลบข้อมูลนี้ใช่หรือไม่?")) {
      try {
        await axios.delete(`${NODE_ENDPOINT_DELETE}/${id}`);
        setLotteryData((prev) => prev.filter((item) => item.id !== id));
      } catch (error) {
        console.error("Error deleting:", error);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-white shadow-sm ring-1 ring-slate-900/5 sm:rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between">
        <div className="flex items-center space-x-4 mb-4 sm:mb-0">
          <div className="bg-red-100 p-3 rounded-full">
            <TrophyIcon className="h-8 w-8 text-red-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Admin Dashboard</h2>
            <p className="text-sm text-slate-500">จัดการข้อมูลผลรางวัลสลากกาชาด</p>
          </div>
        </div>
        <Link
          href="/admin/insert"
          className="inline-flex items-center justify-center rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 transition-colors"
        >
          <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
          เพิ่มหมายเลขรางวัล
        </Link>
      </div>

      {/* Data Table */}
      <div className="bg-white shadow-sm ring-1 ring-slate-900/5 sm:rounded-xl overflow-hidden">
        <div className="px-4 py-5 sm:px-6 border-b border-slate-200">
          <h3 className="text-base font-semibold leading-6 text-slate-900">รายการรางวัลล่าสุด</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-300">
            <thead className="bg-slate-50">
              <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-slate-900 sm:pl-6 cursor-pointer hover:bg-slate-100" onClick={() => handleSort("lottery_number")}>
                  หมายเลขสลาก {sortField === "lottery_number" && (sortOrder === "asc" ? "↑" : "↓")}
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900 cursor-pointer hover:bg-slate-100" onClick={() => handleSort("reward_number")}>
                  ประเภทรางวัล {sortField === "reward_number" && (sortOrder === "asc" ? "↑" : "↓")}
                </th>
                <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-slate-900">
                  การจัดการ
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {lotteryData.length > 0 ? (
                lotteryData.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-slate-900 sm:pl-6">
                      {item.lottery_number}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-600">
                      <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${item.reward_number === 1 ? 'bg-yellow-50 text-yellow-800 ring-yellow-600/20' : 'bg-slate-50 text-slate-700 ring-slate-600/20'}`}>
                        {item.reward_number === 7 ? "เลขท้าย 3 ตัว" : `รางวัลที่ ${item.reward_number}`}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-right pr-6">
                      <button
                        onClick={() => confirmDelete(item.id)}
                        className="text-slate-400 hover:text-red-600 transition-colors"
                        title="ลบข้อมูล"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="px-4 py-10 text-center text-sm text-slate-500">
                    <div className="flex flex-col items-center justify-center">
                      <TrophyIcon className="h-10 w-10 text-slate-300 mb-2" />
                      <p>ยังไม่มีข้อมูลรางวัล</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Showlottery;
