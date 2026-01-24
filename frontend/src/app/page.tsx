'use client';

import { useState, useEffect } from 'react';
// Images are in public/assets/image/
// In Next.js, references to /assets/... work if they are in public/assets

export default function LandingPage() {
  const [isTimeReached, setIsTimeReached] = useState(false);
  const [activeTab, setActiveTab] = useState<'upload' | 'input'>('upload');
  const [isUploading, setIsUploading] = useState(false);
  const [modal, setModal] = useState<{ type: 'sorry' | 'reward', message: string, result?: string } | null>(null);
  const [lotteryNumber, setLotteryNumber] = useState('');

  useEffect(() => {
    const checkDateTime = () => {
      const now = new Date();
      // Target: 16 Feb 2025 at 20:00 Thai time
      const targetDate = new Date("2025-02-16T20:00:00+07:00");

      if (now >= targetDate) {
        setIsTimeReached(true);
      } else {
        // Force show for now as per previous logic
        setIsTimeReached(true);
      }
    };

    checkDateTime();
    const interval = setInterval(checkDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("https://comsci.app/upload", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();

      if (result.result && result.result.includes("คุณถูกรางวัล")) {
        setModal({ type: 'reward', message: `ยินดีด้วย! ${result.result}`, result: result.result });
      } else {
        setModal({ type: 'sorry', message: `เสียใจด้วย! ${result.result}`, result: result.result });
      }
    } catch (error) {
      console.error("OCR API Error:", error);
      setModal({ type: 'sorry', message: "เกิดข้อผิดพลาดในการประมวลผล" });
    } finally {
      setIsUploading(false);
      // Reset file input
      event.target.value = '';
    }
  };

  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lotteryNumber || isNaN(Number(lotteryNumber)) || lotteryNumber.length !== 6) {
      alert("กรุณากรอกเลขสลากให้ถูกต้อง (6 หลัก)");
      return;
    }

    setIsUploading(true);
    try {
      const response = await fetch("https://comsci.app/check_reward", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lottery_no: lotteryNumber }),
      });
      const result = await response.json();

      if (result.result && result.result.includes("คุณถูกรางวัล")) {
        setModal({ type: 'reward', message: `ยินดีด้วย! ${result.result}`, result: result.result });
      } else {
        setModal({ type: 'sorry', message: `เสียใจด้วย! ${result.result}`, result: result.result });
      }
    } catch (error) {
      console.error("Error:", error);
      setModal({ type: 'sorry', message: "เกิดข้อผิดพลาดในการตรวจสอบ" });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="landing-root">
      <div className="container-box">
        <header>
          <nav className="header">
            <div className="container">
              {/* Standard img tag works for public folder assets in Next.js */}
              <img src="/assets/image/cross2.png" alt="โลโก้สภากาชาดไทย" />
              <div className="container-right">
                <h3 className="head-text">สลากกาชาดประจำปี {new Date().getFullYear()}</h3>
                <hr />
                <p>สภากาชาดไทย THAI RED CROSS SOCIETY</p>
              </div>
            </div>
          </nav>
        </header>

        {!isTimeReached && (
          <div id="boxShow">
            <div>
              <h1>ระบบ จะพร้อมเปิด ให้ใช้งานภายใน</h1>
              <h1>วันที่ 16 กุมภาพันธ์ 2568 เวลา 20:00 น.</h1>
            </div>
          </div>
        )}

        <main id="specialContent" className={!isTimeReached ? 'hidden' : ''}>
          <div className="container">
            <div className="btn-select">
              <button
                className={`btn btn-primary ${activeTab === 'upload' ? 'active' : ''}`}
                onClick={() => setActiveTab('upload')}
              >
                อัปโหลดภาพสลาก
              </button>
              <button
                className={`btn btn-secondary ${activeTab === 'input' ? 'active' : ''}`}
                onClick={() => setActiveTab('input')}
              >
                กรอกเลขสลาก
              </button>
            </div>
            <p>*บริการตรวจรางวัลสลากกาชาดนี้เป็นเพียงการอำนวยความสะดวกเท่านั้น ไม่สามารถรับรองความเป็นเจ้าของสลากได้</p>

            {activeTab === 'upload' && (
              <div className="upload_lottery">
                <h3>ตรวจผลรางวัลด้วยการอัปโหลดภาพ</h3>
                <form id="upload-form">
                  <input
                    type="file"
                    id="file-input"
                    accept="image/*"
                    required
                    onChange={handleFileUpload}
                    disabled={isUploading}
                  />
                  <label htmlFor="file-input" style={isUploading ? { cursor: 'not-allowed', opacity: 0.7 } : {}}>
                    <i className='bx bxs-camera-plus'></i>
                    {isUploading ? "โปรดรอสักครู่..." : "อัปโหลดภาพสลาก"}
                  </label>
                  <h3 id="ocr-result"></h3>
                </form>
              </div>
            )}

            {activeTab === 'input' && (
              <div className="input_text">
                <h3>กรอกเลขสลาก</h3>
                <form id="manual-input" onSubmit={handleManualSubmit}>
                  <input
                    type="text"
                    id="lottery-number"
                    placeholder="กรอกเลขสลากของคุณ"
                    required
                    value={lotteryNumber}
                    onChange={(e) => setLotteryNumber(e.target.value)}
                    maxLength={6}
                  />
                  <button type="submit" className="btn btn-primary" disabled={isUploading}>
                    {isUploading ? "โปรดรอสักครู่..." : "ตรวจสอบ"}
                  </button>
                </form>
              </div>
            )}
          </div>
        </main>

        <footer>
          <div className="container">
            <p>© 2025 COMPUTER SCIENCE RMUTL NAN</p>
          </div>
        </footer>
      </div>

      {/* Modals */}
      {modal && (
        <div className="modal flex" id="modal-result">
          <div className="modal-content">
            <span className="close" onClick={() => setModal(null)}>&times;</span>
            <div className="head-modal">
              <img src={modal.type === 'reward' ? "/assets/image/reward.png" : "/assets/image/sorry.png"} alt={modal.type} />
            </div>
            <h3 id="manual-result">{modal.message}</h3>
            <p>วันที่ 16 กุมภาพันธ์ 2568</p>
            {modal.type === 'reward' ? (
              <h2>🤩🫢งานนี้ต้องฉลองงงง!!</h2>
            ) : (
              <h2>เสียดายคุณไม่ถูกรางวัล </h2>
            )}
            <p>ขอบคุณที่ร่วมเป็นส่วนหนึ่งในการร่วมทำบุญ</p>
          </div>
        </div>
      )}
    </div>
  );
}
