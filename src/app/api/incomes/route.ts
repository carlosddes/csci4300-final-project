import connectMongoDB from "../../../../lib/mongodb";
import Income from "@models/incomeSchema"
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import mongoose from "mongoose";

// Missing POST

export async function GET(request: NextRequest) {
    await connectMongoDB();
    const incomes = await Income.find();
    return NextResponse.json({incomes});
}