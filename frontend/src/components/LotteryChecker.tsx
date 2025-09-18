'use client';

import { useState } from 'react';
import ImageUpload from './ImageUpload';
import ManualInput from './ManualInput';
import ResultModal from './ResultModal';

export default function LotteryChecker() {
  const [activeTab, setActiveTab] = useState<'upload' | 'input'>('upload');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'win' | 'lose'>('lose');
  const [lotteryNumber, setLotteryNumber] = useState('');

  const handleResult = (number: string, isWinner: boolean) => {
    setLotteryNumber(number);
    setModalType(isWinner ? 'win' : 'lose');
    setShowModal(true);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Tab Selection */}
      <div className="flex justify-center mb-8">
        <div className="bg-white rounded-lg shadow-md p-1 inline-flex">
          <button
            onClick={() => setActiveTab('upload')}
            className={`px-6 py-3 rounded-md font-medium transition-colors ${
              activeTab === 'upload'
                ? 'bg-red-600 text-white'
                : 'text-gray-600 hover:text-red-600'
            }`}
          >
            อัปโหลดภาพสลาก
          </button>
          <button
            onClick={() => setActiveTab('input')}
            className={`px-6 py-3 rounded-md font-medium transition-colors ${
              activeTab === 'input'
                ? 'bg-red-600 text-white'
                : 'text-gray-600 hover:text-red-600'
            }`}
          >
            กรอกเลขสลาก
          </button>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8 rounded">
        <p className="text-sm text-yellow-800">
          *บริการตรวจรางวัลสลากกาชาดนี้เป็นเพียงการอำนวยความสะดวกเท่านั้น ไม่สามารถรับรองความเป็นเจ้าของสลากได้
        </p>
      </div>

      {/* Content */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        {activeTab === 'upload' ? (
          <ImageUpload onResult={handleResult} />
        ) : (
          <ManualInput onResult={handleResult} />
        )}
      </div>

      {/* Result Modal */}
      {showModal && (
        <ResultModal
          type={modalType}
          lotteryNumber={lotteryNumber}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
