import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { lotteryNumber } = await request.json();

    if (!lotteryNumber) {
      return NextResponse.json(
        { error: 'Lottery number is required' },
        { status: 400 }
      );
    }

    // ส่งไปยัง backend API สำหรับตรวจสอบรางวัล
    const response = await fetch('http://backend_api:3001/api/check-lottery', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ lotteryNumber }),
    });

    if (!response.ok) {
      throw new Error('Lottery check failed');
    }

    const data = await response.json();
    
    return NextResponse.json({
      isWinner: data.isWinner || false,
      prize: data.prize || null,
      message: data.message || '',
    });
  } catch (error) {
    console.error('Lottery Check API Error:', error);
    return NextResponse.json(
      { error: 'Lottery check failed' },
      { status: 500 }
    );
  }
}
