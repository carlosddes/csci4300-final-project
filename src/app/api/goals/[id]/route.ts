import connectMongoDB from "../../../../../lib/mongodb";
import Goal from "@models/goalsSchema"
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
    const goal = await Goal.findOne({ _id: id });

    if (!goal) {
        return NextResponse.json({message: "Goal not found"}, {status: 404});
    }

    return NextResponse.json({goal: goal}, {status: 200});
}

// Missing PUT

export async function DELETE(request: NextRequest, { params }:RouteParams) {
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json({message: "Invalid ID format"}, {status: 400});
    }

    await connectMongoDB();
    const goal = await Goal.findOne({ _id: id });

    if (!goal) {
        return NextResponse.json({message: "Goal not found"}, {status: 404});
    }

    return NextResponse.json({message: "Goal deleted"}, {status: 200});
}