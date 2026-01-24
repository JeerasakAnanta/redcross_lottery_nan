'use client';

import React, { useState, useEffect } from "react";
import axios from "axios";
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

// Environment variables
const NODE_ENDPOINT_SHOW = process.env.NEXT_PUBLIC_NODE_ENDPOINT_SHOW;
const NODE_ENDPOINT_INSERT = process.env.NEXT_PUBLIC_NODE_ENDPOINT_INSERT;
const NODE_ENDPOINT_DELETE = process.env.NEXT_PUBLIC_NODE_ENDPOINT_DELETE;

interface LotteryData {
  id: number;
  lottery_number: number;
  reward_number: number;
}

const InsertLotteryForm: React.FC = () => {
  const [lotteryNumber, setLotteryNumber] = useState<string>("");
  const [rewardNumber, setRewardNumber] = useState<number>(1);
  const [lotteryData, setLotteryData] = useState<LotteryData[]>([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

  // Sorting state
  const [sortField, setSortField] = useState<keyof LotteryData | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const rewardNumbers = [1, 2, 3, 4, 5, 6, 7];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get(`${NODE_ENDPOINT_SHOW}`)
      .then((response) => {
        setLotteryData(response.data.length ? response.data : []);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (lotteryNumber.length !== 6) {
      showNotification("กรุณากรอกเลขสลากให้ครบ 6 หลัก", 'error');
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${NODE_ENDPOINT_INSERT}`, {
        lottery_number: Number(lotteryNumber),
        reward_number: rewardNumber,
      }, { headers: { "Content-Type": "application/json" } });

      showNotification("เพิ่มหมายเลขสำเร็จ!", 'success');
      setLotteryNumber("");
      setRewardNumber(1);
      fetchData();
    } catch (error) {
      console.error("Error inserting:", error);
      showNotification("เกิดข้อผิดพลาดในการบันทึกข้อมูล", 'error');
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = async (id: number) => {
    if (window.confirm("คุณต้องการลบข้อมูลนี้ใช่หรือไม่?")) {
      try {
        await axios.delete(`${NODE_ENDPOINT_DELETE}/${id}`);
        setLotteryData((prev) => prev.filter((item) => item.id !== id));
        showNotification("ลบข้อมูลสำเร็จ!", 'success');
      } catch (error) {
        console.error("Error deleting:", error);
        showNotification("เกิดข้อผิดพลาดในการลบข้อมูล", 'error');
      }
    }
  };

  const handleSort = (field: keyof LotteryData) => {
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

  return (
    <div className="space-y-8">
      {/* Notification Toast */}
      {notification && (
        <div className={`fixed top-4 right-4 px-4 py-2 rounded shadow-lg text-white z-50 transition-opacity ${notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
          {notification.message}
        </div>
      )}

      {/* Header */}
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-slate-900 sm:truncate sm:text-3xl sm:tracking-tight">
            จัดการข้อมูลสลาก (Lottery Management)
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Insert Form Card */}
        <div className="lg:col-span-1">
          <div className="bg-white shadow-sm ring-1 ring-slate-900/5 sm:rounded-xl md:col-span-2">
            <div className="px-4 py-6 sm:p-8">
              <h3 className="text-base font-semibold leading-6 text-slate-900 mb-4">เพิ่มหมายเลขรางวัล</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="reward_number" className="block text-sm font-medium leading-6 text-slate-900">
                    เลือกรางวัล
                  </label>
                  <div className="mt-2">
                    <select
                      id="reward_number"
                      value={rewardNumber}
                      onChange={(e) => setRewardNumber(Number(e.target.value))}
                      className="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                    >
                      {rewardNumbers.map((num) => (
                        <option key={num} value={num}>{num === 7 ? "เลขท้าย 3 ตัว" : `รางวัลที่ ${num}`}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="lottery_number" className="block text-sm font-medium leading-6 text-slate-900">
                    หมายเลขสลาก (6 หลัก)
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      id="lottery_number"
                      value={lotteryNumber}
                      onChange={(e) => setLotteryNumber(e.target.value)}
                      maxLength={6}
                      className="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                      placeholder="เช่น 123456"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Checking...' : (
                      <>
                        <PlusIcon className="h-5 w-5 mr-2" />
                        บันทึกข้อมูล
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Data Table Card */}
        <div className="lg:col-span-2">
          <div className="bg-white shadow-sm ring-1 ring-slate-900/5 sm:rounded-xl">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-base font-semibold leading-6 text-slate-900 mb-4">รายการรางวัลทั้งหมด</h3>
              <div className="mt-4 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                      <table className="min-w-full divide-y divide-slate-300">
                        <thead className="bg-slate-50">
                          <tr>
                            <th scope="col" className="py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-slate-900 sm:pl-6 cursor-pointer hover:bg-slate-100" onClick={() => handleSort("lottery_number")}>
                              หมายเลข {sortField === "lottery_number" && (sortOrder === "asc" ? "↑" : "↓")}
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-slate-900 cursor-pointer hover:bg-slate-100" onClick={() => handleSort("reward_number")}>
                              รางวัล {sortField === "reward_number" && (sortOrder === "asc" ? "↑" : "↓")}
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-slate-900">
                              จัดการ
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 bg-white">
                          {lotteryData.length > 0 ? (
                            lotteryData.map((item) => (
                              <tr key={item.id} className="hover:bg-slate-50">
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-slate-900 sm:pl-6 text-center">
                                  {item.lottery_number}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500 text-center">
                                  {item.reward_number === 7 ? "เลขท้าย 3 ตัว" : `รางวัลที่ ${item.reward_number}`}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-center">
                                  <button
                                    onClick={() => confirmDelete(item.id)}
                                    className="text-red-600 hover:text-red-900 inline-flex items-center"
                                  >
                                    <TrashIcon className="h-5 w-5" />
                                    <span className="sr-only">Delete</span>
                                  </button>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={3} className="px-4 py-8 text-center text-sm text-slate-500">
                                ยังไม่มีข้อมูลรางวัลในระบบ
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsertLotteryForm;
