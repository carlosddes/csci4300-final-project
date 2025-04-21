import connectMongoDB from "../../../../lib/mongodb";
import Expense from "@/models/ExpenseSchema"
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const {title, description, imageURL, amount, date, paymentMethod, userID} = await request.json();
    await connectMongoDB();
    await Expense.create({title, description, imageURL, amount, date, paymentMethod, userID});
    return NextResponse.json({messsage: "Expense added succesfully"}, {status: 201});
}

export async function GET(request: NextRequest) {
    await connectMongoDB();
    const expenses = await Expense.find();
    return NextResponse.json({expenses});
}