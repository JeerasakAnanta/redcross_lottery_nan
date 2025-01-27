import React, { useState, useEffect } from "react";
import axios from "axios";

interface LotteryData {
  id: number;
  lottery_number: number;
  reward_number: number;
}

const InsertLotteryForm: React.FC = () => {
  const [lotteryNumber, setLotteryNumber] = useState<string>("");
  const [rewardNumber, setRewardNumber] = useState<number>(1);
  const [lotteryData, setLotteryData] = useState<LotteryData[]>([]);
  const [sortField, setSortField] = useState<keyof LotteryData | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const rewardNumbers = [1, 2, 3, 4, 5, 6, 7]; // รางวัลทั้งหมด

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/lotteries")
      .then((response) => {
        setLotteryData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching lottery data:", error);
      });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const postData = {
      lottery_number: lotteryNumber,
      reward_number: rewardNumber,
    };
    axios
      .post("http://localhost:3000/api/lotterie", postData, {
        headers: { "Content-Type": "application/json" },
      })
      .then(() => {
        alert("เพิ่มหมายเลขสำเร็จ!");
        setLotteryNumber("");
        setRewardNumber(1);
        window.location.reload(); // Reload the page after successful addition
      })
      .catch((error) => {
        console.error("Error inserting lottery:", error);
      });
  };

  const confirmDelete = (id: number) => {
    if (window.confirm("‼️ คุณต้องการลบ จริงๆใช้ไหมครับ ‼️")) {
      axios
        .delete(`http://localhost:3000/api/lotterie/${id}`)
        .then(() => {
          setLotteryData((prev) => prev.filter((item) => item.id !== id));
          alert("ลบสำเร็จ!");
        })
        .catch((error) => {
          console.error("Error deleting item:", error);
        });
    }
  };

  const handleSort = (field: keyof LotteryData) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);

    const sortedData = [...lotteryData].sort((a, b) => {
      if (order === "asc") {
        return a[field] > b[field] ? 1 : -1;
      } else {
        return a[field] < b[field] ? 1 : -1;
      }
    });

    setLotteryData(sortedData);
  };

  return (
    <div className="container mx-auto p-6">
      {/* Title */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">📩 เพิ่มหมายเลข</h2>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-gray-100 p-6 rounded shadow"
      >
        {/* เลือกรางวัล */}
        <div className="mb-4">
          <label htmlFor="reward_number" className="block text-gray-700 mb-2">
            เลือกรางวัล:
          </label>
          <select
            id="reward_number"
            value={rewardNumber}
            onChange={(e) => setRewardNumber(Number(e.target.value))}
            className="w-full border px-3 py-2 rounded"
            required
          >
            {rewardNumbers.map((number) => (
              <option key={number} value={number}>
                {number === 7 ? "เลขท้าย 3" : `รางวัลที่ ${number}`}
              </option>
            ))}
          </select>
        </div>

        {/* หมายเลข */}
        <div className="mb-4">
          <label htmlFor="lottery_number" className="block text-gray-700 mb-2">
            หมายเลข (*6 digits):
          </label>
          <input
            type="text"
            id="lottery_number"
            value={lotteryNumber}
            onChange={(e) => setLotteryNumber(e.target.value)}
            pattern="\d{6}"
            title="Please enter 6 digits"
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            เพิ่มหมายเลข
          </button>
        </div>
      </form>

      {/* Table */}
      <div className="mt-10">
        <h4 className="text-xl font-bold text-center mb-4">ข้อมูล</h4>
        <table className="w-full border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th
                className="px-4 py-2 border cursor-pointer"
                onClick={() => handleSort("lottery_number")}
              >
                🔢 หมายเลข{" "}
                {sortField === "lottery_number" &&
                  (sortOrder === "asc" ? "🔼" : "🔽")}
              </th>
              <th
                className="px-4 py-2 border cursor-pointer"
                onClick={() => handleSort("reward_number")}
              >
                🏆 รางวัล{" "}
                {sortField === "reward_number" &&
                  (sortOrder === "asc" ? "🔼" : "🔽")}
              </th>
              <th className="px-4 py-2 border">❌ ลบ</th>
            </tr>
          </thead>
          <tbody>
            {lotteryData.map((item) => (
              <tr key={item.id} className="text-center">
                <td className="px-4 py-2 border">{item.lottery_number}</td>
                <td className="px-4 py-2 border">{item.reward_number}</td>
                <td className="px-4 py-2 border">
                  <button
                    onClick={() => confirmDelete(item.id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded"
                  >
                    ลบ
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InsertLotteryForm;
