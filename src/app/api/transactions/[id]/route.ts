import connectMongoDB from "../../../../../lib/mongodb";
import User from "@/models/UserSchema"
import Expense from "@/models/ExpenseSchema";
import Income from "@/models/IncomeSchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import mongoose from "mongoose";

interface RouteParams {
    params: { id: string };
}

export async function GET(request: NextRequest, { params }:RouteParams) {
    await connectMongoDB();
    const { id } = await params;
    const incomes = await Income.find({ userID: id});
    const expenses = await Expense.find({ userID: id});

    return NextResponse.json({Incomes: incomes, Expenses: expenses});
}