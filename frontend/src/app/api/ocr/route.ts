import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const image = formData.get('image') as File;

    if (!image) {
      return NextResponse.json(
        { error: 'No image provided' },
        { status: 400 }
      );
    }

    // สร้าง FormData สำหรับส่งไปยัง backend API
    const backendFormData = new FormData();
    backendFormData.append('image', image);

    // ส่งไปยัง backend API สำหรับ OCR
    const response = await fetch('http://backend_api:3001/api/ocr', {
      method: 'POST',
      body: backendFormData,
    });

    if (!response.ok) {
      throw new Error('OCR processing failed');
    }

    const data = await response.json();
    
    return NextResponse.json({
      lotteryNumber: data.lotteryNumber || 'ไม่สามารถอ่านเลขสลากได้',
      confidence: data.confidence || 0,
    });
  } catch (error) {
    console.error('OCR API Error:', error);
    return NextResponse.json(
      { error: 'OCR processing failed' },
      { status: 500 }
    );
  }
}
