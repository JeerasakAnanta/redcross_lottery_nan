import React, { useEffect, useState } from "react";
import axios from "axios";

const NODE_ENDPOINT_SHOW = import.meta.env.APP_NODE_ENDPOINT_SHOW;
const NODE_ENDPOINT_DELETE = import.meta.env.APP_NODE_ENDPOINT_DELETE;
const NODE_ENDPOINT_INSERT = import.meta.env.APP_NODE_ENDPOINT_INSERT;


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
    // Fetch data from the API
    axios
      .get(`${NODE_ENDPOINT_SHOW}`)
      .then((response) => {
        setLotteryData(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the lottery data!", error);
      });
  }, []);

  // Handle sorting
  const handleSort = (field: keyof LotteryItem) => {
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

  // Confirm deletion
  const confirmDelete = (id: number) => {
    if (window.confirm("คุณต้องการลบ จริงๆใช้ไหมครับ‼️")) {
      axios
        .delete(`${NODE_ENDPOINT_DELETE}/${id}`)
        .then(() => {
          setLotteryData((prev) => prev.filter((item) => item.id !== id));
          alert("ลบสำเร็จ!");
        })
        .catch((error) => {
          console.error("Error deleting item:", error);
        });
    }
  };

  return (
    <div className="p-6">
      {/* Welcome Message */}
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800">
          ยินดีต้อนรับ Admin ครับ
        </h3>
      </div>

      {/* Add Button */}
      <div className="text-center mb-6">
        <a
          href="/insert"
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded shadow"
        >
          เพิ่มหมายเลข
        </a>
      </div>

      {/* Display Data Table */}
      <div className="container mx-auto">
        <div className="text-center mb-4">
          <h4 className="text-xl font-semibold text-gray-700">ข้อมูล</h4>
        </div>
        <table className="table-auto rounded-lg w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th
                className="px-4 py-2 border cursor-pointer"
                onClick={() => handleSort("reward_number")}
              >
                🏆 รางวัลที่{" "}
                {sortField === "reward_number" &&
                  (sortOrder === "asc" ? "🔼" : "🔽")}
              </th>
              <th
                className="px-4 py-2 border cursor-pointer"
                onClick={() => handleSort("lottery_number")}
              >
                🔢 หมายเลข{" "}
                {sortField === "lottery_number" &&
                  (sortOrder === "asc" ? "🔼" : "🔽")}
              </th>
              <th className="px-4 py-2 border">❌ ลบ</th>
            </tr>
          </thead>
          <tbody>
            {lotteryData.map((item) => (
              <tr key={item.id} className="text-center">
                <td className="px-4 py-2 border">{item.reward_number}</td>
                <td className="px-4 py-2 border">{item.lottery_number}</td>
                <td className="px-4 py-2 border">
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded shadow"
                    onClick={() => confirmDelete(item.id)}
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

export default Showlottery;
