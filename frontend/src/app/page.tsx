'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import LotteryChecker from '@/components/LotteryChecker';
import ComingSoon from '@/components/ComingSoon';

export default function Home() {
  const [isSystemReady, setIsSystemReady] = useState(false);

  useEffect(() => {
    const checkDateTime = () => {
      // กำหนดโซนเวลาไทย
      const now = new Date().toLocaleString("en-US", { timeZone: "Asia/Bangkok" });
      const currentDate = new Date(now);

      // กำหนดวันที่และเวลาที่ต้องการให้แสดง (16 กุมภาพันธ์ 2568 เวลา 20:00 น.)
      const targetDate = new Date("2025-02-16T14:00:00+02:00"); // เวลาไทย (GMT+7)

      if (currentDate >= targetDate) {
        setIsSystemReady(true);
      }
    };

    // ตรวจสอบทุกวินาที
    const interval = setInterval(checkDateTime, 1000);

    // เรียกฟังก์ชันตอนโหลดหน้า
    checkDateTime();

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-md">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Image
                src="/Assets/image/cross2.png"
                alt="โลโก้สภากาชาดไทย"
                width={80}
                height={80}
                className="object-contain"
              />
              <div className="text-right">
                <h3 className="text-lg font-bold text-red-600">
                  สลากกาชาดประจำปี 2568
                </h3>
                <hr className="border-red-300 my-1" />
                <p className="text-sm text-gray-600">
                  สภากาชาดไทย THAI RED CROSS SOCIETY
                </p>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {!isSystemReady ? (
          <ComingSoon />
        ) : (
          <LotteryChecker />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 COMPUTER SCIENCE RMUTL NAN</p>
        </div>
      </footer>
    </div>
  );
}