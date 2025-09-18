'use client';

import { useEffect } from 'react';
import Image from 'next/image';

interface ResultModalProps {
    type: 'win' | 'lose';
    lotteryNumber: string;
    onClose: () => void;
}

export default function ResultModal({ type, lotteryNumber, onClose }: ResultModalProps) {
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscape);
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [onClose]);

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={handleBackdropClick}
        >
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Modal Content */}
                <div className="text-center space-y-4">
                    {/* Image */}
                    <div className="flex justify-center">
                        <Image
                            src={`/Assets/image/${type === 'win' ? 'reward' : 'sorry'}.png`}
                            alt={type === 'win' ? 'รางวัล' : 'เสียดาย'}
                            width={120}
                            height={120}
                            className="object-contain"
                        />
                    </div>

                    {/* Lottery Number */}
                    <div className="bg-gray-50 rounded-lg p-3">
                        <h3 className="text-lg font-bold text-gray-800">{lotteryNumber}</h3>
                    </div>

                    {/* Date */}
                    <p className="text-gray-600">วันที่ 16 กุมภาพันธ์ 2568</p>

                    {/* Result Message */}
                    {type === 'win' ? (
                        <div className="space-y-2">
                            <h2 className="text-2xl font-bold text-green-600">
                                🤩🫢งานนี้ต้องฉลองงงง!!
                            </h2>
                            <p className="text-gray-600">ขอบคุณที่ร่วมเป็นส่วนหนึ่งในการร่วมทำบุญ</p>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            <h2 className="text-2xl font-bold text-red-600">
                                เสียดายคุณไม่ถูกรางวัล
                            </h2>
                            <p className="text-gray-600">ขอบคุณที่ร่วมเป็นส่วนหนึ่งในการร่วมทำบุญ</p>
                        </div>
                    )}

                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="w-full bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors mt-6"
                    >
                        ปิด
                    </button>
                </div>
            </div>
        </div>
    );
}
