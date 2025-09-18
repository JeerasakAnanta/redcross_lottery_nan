export default function ComingSoon() {
  return (
    <div className="text-center py-16">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          ระบบ จะพร้อมเปิด ให้ใช้งานภายใน
        </h1>
        <h1 className="text-3xl font-bold text-red-600 mb-8">
          วันที่ 16 กุมภาพันธ์ 2568 เวลา 20:00 น.
        </h1>
        <div className="animate-pulse">
          <div className="w-16 h-16 bg-red-100 rounded-full mx-auto mb-4 flex items-center justify-center">
            <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
