import connectMongoDB from "../../../../lib/mongodb";
import Income from "@/models/IncomeSchema"
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const {title, description, imageURL, amount, date, paymentMethod, userID} = await request.json();
    await connectMongoDB();
    await Income.create({title, description, imageURL, amount, date, paymentMethod, userID});
    return NextResponse.json({messsage: "Income added succesfully"}, {status: 201});
}

export async function GET(request: NextRequest) {
    await connectMongoDB();
    const incomes = await Income.find();
    return NextResponse.json({incomes});
}