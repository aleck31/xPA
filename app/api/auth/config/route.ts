import { NextResponse } from 'next/server';

export async function GET() {
  // Return only the configs required by the client
  return NextResponse.json({
    region: process.env.NEXT_PUBLIC_AWS_REGION,
  });
} 