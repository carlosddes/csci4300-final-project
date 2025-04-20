import connectMongoDB from "../../../../lib/mongodb";
import Expense from "@models/expenseSchema"
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import mongoose from "mongoose";

export async function GET(request: NextRequest) {
    await connectMongoDB();
    const expenses = await Expense.find();
    return NextResponse.json({expenses});
}