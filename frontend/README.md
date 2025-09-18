# Frontend - Red Cross Lottery OCR System

ระบบตรวจผลรางวัลสลากกาชาดด้วยเทคโนโลยี OCR และการกรอกเลขสลากด้วยตนเอง

## เทคโนโลยีที่ใช้

- **Next.js 15** - React Framework
- **TypeScript** - Type Safety
- **Tailwind CSS** - Styling
- **React Hooks** - State Management

## ฟีเจอร์หลัก

### 1. ระบบ Coming Soon
- แสดงหน้าจอรอเปิดใช้งานจนถึงวันที่ 16 กุมภาพันธ์ 2568 เวลา 20:00 น.
- ใช้ JavaScript สำหรับตรวจสอบเวลาแบบ Real-time

### 2. การอัปโหลดภาพสลาก (OCR)
- อัปโหลดภาพสลากเพื่ออ่านเลขด้วย OCR
- แสดงตัวอย่างภาพที่อัปโหลด
- ประมวลผลและแสดงผลเลขสลากที่อ่านได้
- ตรวจสอบผลรางวัลอัตโนมัติ

### 3. การกรอกเลขสลากด้วยตนเอง
- กรอกเลขสลากด้วยตนเอง
- ตรวจสอบผลรางวัลทันที
- แสดงคำแนะนำการใช้งาน

### 4. ระบบแสดงผลรางวัล
- Modal แสดงผลสำหรับสลากถูกรางวัล
- Modal แสดงผลสำหรับสลากไม่ถูกรางวัล
- ออกแบบตาม UI/UX เดิม

## โครงสร้างโปรเจค

```
src/
├── app/
│   ├── api/
│   │   ├── ocr/route.ts          # API สำหรับ OCR
│   │   └── check-lottery/route.ts # API สำหรับตรวจสอบรางวัล
│   ├── layout.tsx                # Root Layout
│   ├── page.tsx                  # Home Page
│   └── globals.css               # Global Styles
├── components/
│   ├── ComingSoon.tsx            # หน้าจอ Coming Soon
│   ├── LotteryChecker.tsx        # หน้าจอหลักตรวจรางวัล
│   ├── ImageUpload.tsx           # Component อัปโหลดภาพ
│   ├── ManualInput.tsx           # Component กรอกเลขสลาก
│   └── ResultModal.tsx           # Modal แสดงผลรางวัล
└── public/
    └── Assets/                   # ไฟล์ Assets เดิม
```

## การติดตั้งและรัน

### Development Mode
```bash
cd frontend
npm install
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

### Docker
```bash
docker build -t frontend .
docker run -p 3000:3000 frontend
```

## การเชื่อมต่อกับ Backend

ระบบเชื่อมต่อกับ Backend API ผ่าน:
- `http://backend_api:3000/api/ocr` - สำหรับ OCR
- `http://backend_api:3000/api/check-lottery` - สำหรับตรวจสอบรางวัล

## การปรับแต่ง

### เปลี่ยนวันที่เปิดใช้งาน
แก้ไขในไฟล์ `src/app/page.tsx`:
```typescript
const targetDate = new Date("2025-02-16T14:00:00+02:00");
```

### เปลี่ยนสีธีม
แก้ไขในไฟล์ `tailwind.config.js` หรือใช้ CSS classes ของ Tailwind

## การ Deploy

ระบบพร้อมสำหรับการ Deploy ด้วย Docker Compose:
```bash
docker-compose up -d frontend
```

หรือ Deploy แยก:
```bash
docker build -t frontend .
docker run -d -p 3000:3000 --name frontend frontend
```