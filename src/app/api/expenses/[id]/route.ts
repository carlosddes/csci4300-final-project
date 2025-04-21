import connectMongoDB from "../../../../../lib/mongodb";
import Expense from "@models/expenseSchema"
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import mongoose from "mongoose";

interface RouteParams {
    params: { id: string };
}

export async function GET(request: NextRequest, { params }:RouteParams) {
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json({message: "Invalid ID format"}, {status: 400});
    }

    await connectMongoDB();
    const expense = await Expense.findOne({ _id: id });

    if (!expense) {
        return NextResponse.json({message: "Expense not found"}, {status: 404});
    }

    return NextResponse.json({expense: expense}, {status: 200});
}

// Missing PUT

export async function DELETE(request: NextRequest, { params }:RouteParams) {
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json({message: "Invalid ID format"}, {status: 400});
    }

    await connectMongoDB();
    const expense = await Expense.findOne({ _id: id });

    if (!expense) {
        return NextResponse.json({message: "Expense not found"}, {status: 404});
    }

    return NextResponse.json({message: "Expense deleted"}, {status: 200});
}