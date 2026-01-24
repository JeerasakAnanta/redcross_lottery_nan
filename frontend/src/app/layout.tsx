import type { Metadata } from "next";
import { Noto_Sans_Thai } from "next/font/google";
import "./globals.css";
import "./landing.css";

const notoSansThai = Noto_Sans_Thai({
  subsets: ["thai", "latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-noto-sans-thai",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ตรวจผลรางวัลด้วย OCR - สภากาชาดไทย",
  description: "ระบบตรวจผลรางวัลสลากกาชาดด้วย OCR และตรวจสอบหมายเลขสลาก",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <head>
        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet' />
      </head>
      <body
        className={`${notoSansThai.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
