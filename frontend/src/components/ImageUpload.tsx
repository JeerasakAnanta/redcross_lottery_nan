'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';

interface ImageUploadProps {
  onResult: (number: string, isWinner: boolean) => void;
}

export default function ImageUpload({ onResult }: ImageUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [ocrResult, setOcrResult] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setOcrResult('');
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    setOcrResult('กำลังประมวลผล...');

    try {
      const formData = new FormData();
      formData.append('image', selectedFile);

      // ส่งไปยัง API สำหรับ OCR
      const response = await fetch('/api/ocr', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        const lotteryNumber = data.lotteryNumber || 'ไม่สามารถอ่านเลขสลากได้';
        setOcrResult(lotteryNumber);
        
        // ตรวจสอบผลรางวัล
        const checkResponse = await fetch('/api/check-lottery', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ lotteryNumber }),
        });

        if (checkResponse.ok) {
          const checkData = await checkResponse.json();
          onResult(lotteryNumber, checkData.isWinner);
        }
      } else {
        setOcrResult('เกิดข้อผิดพลาดในการประมวลผล');
      }
    } catch (error) {
      console.error('Error:', error);
      setOcrResult('เกิดข้อผิดพลาดในการประมวลผล');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setOcrResult('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">
        ตรวจผลรางวัลด้วยการอัปโหลดภาพ
      </h3>

      {/* File Upload Area */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-red-400 transition-colors">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          id="file-input"
        />
        <label
          htmlFor="file-input"
          className="cursor-pointer flex flex-col items-center space-y-4"
        >
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="text-lg font-medium text-gray-700">
            อัปโหลดภาพสลาก
          </span>
          <span className="text-sm text-gray-500">
            คลิกเพื่อเลือกไฟล์หรือลากไฟล์มาวางที่นี่
          </span>
        </label>
      </div>

      {/* Preview */}
      {previewUrl && (
        <div className="space-y-4">
          <div className="relative max-w-md mx-auto">
            <Image
              src={previewUrl}
              alt="ภาพสลากที่อัปโหลด"
              width={400}
              height={300}
              className="rounded-lg shadow-md object-contain"
            />
          </div>
          
          <div className="flex justify-center space-x-4">
            <button
              onClick={handleUpload}
              disabled={isProcessing}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isProcessing ? 'กำลังประมวลผล...' : 'ตรวจสอบรางวัล'}
            </button>
            <button
              onClick={handleReset}
              className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              เลือกใหม่
            </button>
          </div>
        </div>
      )}

      {/* OCR Result */}
      {ocrResult && (
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <h4 className="font-medium text-gray-700 mb-2">เลขสลากที่อ่านได้:</h4>
          <p className="text-xl font-bold text-red-600">{ocrResult}</p>
        </div>
      )}
    </div>
  );
}
