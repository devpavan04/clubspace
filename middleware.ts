import { NextRequest, NextResponse } from 'next/server';

export default function middleware(req: NextRequest) {
  console.log('Running middleware...');
  return NextResponse.next();
}
