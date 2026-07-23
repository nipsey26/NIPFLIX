import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    message: "NIPFLIX Admin API is working",
  });
}