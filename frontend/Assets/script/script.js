// อ้างอิง Element
const btnUpload = document.getElementById('upload');
const btnInput = document.getElementById('input');
const uploadLottery = document.querySelector('.upload_lottery');
const inputText = document.querySelector('.input_text');
const fileInput = document.getElementById('file-input');
const ocrResult = document.getElementById('ocr-result');
const manualInputForm = document.getElementById('manual-input');
const uploadLabel = document.querySelector('label[for="file-input"]');
const manualSubmitButton = manualInputForm.querySelector('button');

// โมดัล
const modalSorry = document.getElementById('modal-sorry');
const modalReward = document.getElementById('modal-reward');
const closeModalSorry = modalSorry.querySelector('.close');
const closeModalReward = modalReward.querySelector('.close');
const modalResultSorry = modalSorry.querySelector('#manual-result');
const modalResultReward = modalReward.querySelector('#manual-result');

// ตั้งค่าค่าเริ่มต้นเมื่อโหลดหน้า
document.addEventListener('DOMContentLoaded', () => {
    uploadLottery.style.display = 'block';
    inputText.style.display = 'none';
    btnUpload.classList.add('active');
    btnInput.classList.remove('active');
});

// ฟังก์ชันแสดงโมดัลพร้อมข้อความ
function showModal(type, message) {
    if (type === 'sorry') {
        modalResultSorry.textContent = message;
        modalSorry.style.display = 'flex';
    } else if (type === 'reward') {
        modalResultReward.textContent = message;
        modalReward.style.display = 'flex';
    }
}

// ฟังก์ชันซ่อนโมดัล
function hideModal() {
    modalSorry.style.display = 'none';
    modalReward.style.display = 'none';
}

// เมื่อคลิกปุ่มปิดโมดัล
closeModalSorry.addEventListener('click', hideModal);
closeModalReward.addEventListener('click', hideModal);

// เมื่อคลิกพื้นที่นอกโมดัล
window.addEventListener('click', (event) => {
    if (event.target === modalSorry || event.target === modalReward) {
        hideModal();
    }
});

// เมื่อคลิกปุ่ม "อัปโหลดภาพสลาก"
btnUpload.addEventListener('click', () => {
    uploadLottery.style.display = 'block';
    inputText.style.display = 'none';
    btnUpload.classList.add('active');
    btnInput.classList.remove('active');
});

// เมื่อคลิกปุ่ม "กรอกเลขสลาก"
btnInput.addEventListener('click', () => {
    inputText.style.display = 'block';
    uploadLottery.style.display = 'none';
    btnInput.classList.add('active');
    btnUpload.classList.remove('active');
});

// ประมวลผลภาพทันทีเมื่ออัปโหลด
fileInput.addEventListener('change', async (event) => {
    const file = event.target.files[0];

    if (!file) {
        alert('กรุณาเลือกไฟล์');
        return;
    }

    const formData = new FormData();
    formData.append('image', file);

    // เปลี่ยนข้อความ Label เป็น "กำลังโหลด..."
    uploadLabel.textContent = 'โปรดรอสักครู่...';
    uploadLabel.style.cursor = 'not-allowed';

    try {
        const response = await fetch('https://comsci.app/upload', {
            method: 'POST',
            body: formData,
        });

        const result = await response.json();

        // แสดงโมดัลพร้อมผลลัพธ์
        if (result.result && result.result.includes('คุณถูกรางวัล')) {
            showModal('reward', `ยินดีด้วย! ${result.result}`);
        } else {
            showModal('sorry', `เสียใจด้วย! ${result.result}`);
        }
    } catch (error) {
        console.error('OCR API Error:', error);
        showModal('sorry', 'เกิดข้อผิดพลาดในการประมวลผล');
    } finally {
        // คืนค่า Label กลับ
        uploadLabel.textContent = 'อัปโหลดภาพสลาก';
        uploadLabel.style.cursor = 'pointer';
    }
});

// การตรวจสอบหมายเลขสลากที่กรอก
manualInputForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const lotteryNumber = document.getElementById('lottery-number').value.trim();

    if (!lotteryNumber || isNaN(lotteryNumber) || lotteryNumber.length !== 6) {
        alert('กรุณากรอกเลขสลากให้ถูกต้อง (6 หลัก)');
        return;
    }

    manualSubmitButton.textContent = 'โปรดรอสักครู่...';
    manualSubmitButton.disabled = true;

    try {
        const response = await fetch('https://comsci.app/check_reward', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ lottery_no: lotteryNumber }),
        });

        const result = await response.json();

        // แสดงโมดัลพร้อมผลลัพธ์
        if (result.result && result.result.includes('คุณถูกรางวัล')) {
            showModal('reward', `ยินดีด้วย! ${result.result}`);
        } else {
            showModal('sorry', `เสียใจด้วย! ${result.result}`);
        }
    } catch (error) {
        console.error('ข้อผิดพลาด:', error);
        showModal('sorry', 'เกิดข้อผิดพลาดในการตรวจสอบ');
    } finally {
        // คืนข้อความปุ่มกลับ
        manualSubmitButton.textContent = 'ตรวจสอบ';
        manualSubmitButton.disabled = false;
    }
});
