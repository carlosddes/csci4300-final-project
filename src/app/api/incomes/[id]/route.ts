import connectMongoDB from "../../../../../lib/mongodb";
import Income from "@/models/IncomeSchema"
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
    const income = await Income.findOne({ _id: id });

    if (!income) {
        return NextResponse.json({message: "Income not found"}, {status: 404});
    }

    return NextResponse.json({income: income}, {status: 200});
}

export async function PUT(request: NextRequest, { params }:RouteParams) {
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json({message: "Invalid ID format"}, {status: 400});
    }

    const {title: title, description: description, imageURL: imageURL, amount: amount, date: date, paymentMethod: paymentMethod, userID: userID} = await request.json();
    await connectMongoDB();
    const income = await Income.findByIdAndUpdate( id, {title, description, imageURL, amount, date, paymentMethod, userID} );

    if (!income) {
        return NextResponse.json({message: "Income not found"}, {status: 404});
    }

    return NextResponse.json({message: "Income updated"}, {status: 200});
}

export async function DELETE(request: NextRequest, { params }:RouteParams) {
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json({message: "Invalid ID format"}, {status: 400});
    }

    await connectMongoDB();
    const income = await Income.findByIdAndDelete({ _id: id });

    if (!income) {
        return NextResponse.json({message: "Income not found"}, {status: 404});
    }

    return NextResponse.json({message: "Income deleted"}, {status: 200});
}