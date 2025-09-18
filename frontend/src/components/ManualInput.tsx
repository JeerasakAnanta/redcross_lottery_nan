'use client';

import { useState } from 'react';

interface ManualInputProps {
  onResult: (number: string, isWinner: boolean) => void;
}

export default function ManualInput({ onResult }: ManualInputProps) {
  const [lotteryNumber, setLotteryNumber] = useState('');
  const [isChecking, setIsChecking] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lotteryNumber.trim()) return;

    setIsChecking(true);

    try {
      const response = await fetch('/api/check-lottery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ lotteryNumber: lotteryNumber.trim() }),
      });

      if (response.ok) {
        const data = await response.json();
        onResult(lotteryNumber.trim(), data.isWinner);
      } else {
        console.error('Error checking lottery');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">
        กรอกเลขสลาก
      </h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="max-w-md mx-auto">
          <label htmlFor="lottery-number" className="block text-sm font-medium text-gray-700 mb-2">
            เลขสลากของคุณ
          </label>
          <input
            type="text"
            id="lottery-number"
            value={lotteryNumber}
            onChange={(e) => setLotteryNumber(e.target.value)}
            placeholder="กรอกเลขสลากของคุณ"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-center text-lg"
            required
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            disabled={isChecking || !lotteryNumber.trim()}
            className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {isChecking ? 'กำลังตรวจสอบ...' : 'ตรวจสอบ'}
          </button>
        </div>
      </form>

      {/* Instructions */}
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
        <h4 className="font-medium text-blue-800 mb-2">วิธีการใช้:</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• กรอกเลขสลากของคุณในช่องด้านบน</li>
          <li>• กดปุ่ม &quot;ตรวจสอบ&quot; เพื่อดูผลรางวัล</li>
          <li>• ระบบจะแสดงผลทันที</li>
        </ul>
      </div>
    </div>
  );
}
