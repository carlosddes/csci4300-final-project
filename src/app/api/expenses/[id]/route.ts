import connectMongoDB from "../../../../../lib/mongodb";
import Expense from "@/models/ExpenseSchema"
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

export async function PUT(request: NextRequest, { params }:RouteParams) {
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json({message: "Invalid ID format"}, {status: 400});
    }

    const {title: title, description: description, imageURL: imageURL, amount: amount, date: date, paymentMethod: paymentMethod, userID: userID} = await request.json();
    await connectMongoDB();
    const expense = await Expense.findByIdAndUpdate( id, {title, description, imageURL, amount, date, paymentMethod, userID} );

    if (!expense) {
        return NextResponse.json({message: "Expense not found"}, {status: 404});
    }

    return NextResponse.json({message: "Expense updated"}, {status: 200});
}

export async function DELETE(request: NextRequest, { params }:RouteParams) {
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json({message: "Invalid ID format"}, {status: 400});
    }

    await connectMongoDB();
    const expense = await Expense.findByIdAndDelete({ _id: id });

    if (!expense) {
        return NextResponse.json({message: "Expense not found"}, {status: 404});
    }

    return NextResponse.json({message: "Expense deleted"}, {status: 200});
}