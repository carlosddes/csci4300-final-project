import connectMongoDB from "../../../../../lib/mongodb";
import Income from "@models/incomeSchema"
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

// Missing PUT

export async function DELETE(request: NextRequest, { params }:RouteParams) {
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json({message: "Invalid ID format"}, {status: 400});
    }

    await connectMongoDB();
    const income = await Income.findOne({ _id: id });

    if (!income) {
        return NextResponse.json({message: "Income not found"}, {status: 404});
    }

    return NextResponse.json({message: "Income deleted"}, {status: 200});
}