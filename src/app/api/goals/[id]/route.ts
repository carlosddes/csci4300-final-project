import connectMongoDB from "../../../../../lib/mongodb";
import Goal from "@/models/GoalsSchema"
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import mongoose from "mongoose";

interface RouteParams {
    params: { id: string };
}

export async function GET(request: NextRequest, { params }:RouteParams) {
    const { id } = await params;

    await connectMongoDB();
    const goal = await Goal.findOne({ userID: id });

    if (!goal) {
        return NextResponse.json({message: "Goal not found"}, {status: 404});
    }

    return NextResponse.json({goal}, {status: 200});
}

export async function PUT(request: NextRequest, { params }:RouteParams) {
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json({message: "Invalid ID format"}, {status: 400});
    }

    const { amount: amount, userID: userID} = await request.json();
    await connectMongoDB();
    const goal = await Goal.findByIdAndUpdate( id, {amount, userID} );

    if (!goal) {
        return NextResponse.json({message: "Goal not found"}, {status: 404});
    }

    return NextResponse.json({message: "Goal updated"}, {status: 200});
}

export async function DELETE(request: NextRequest, { params }:RouteParams) {
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json({message: "Invalid ID format"}, {status: 400});
    }

    await connectMongoDB();
    const goal = await Goal.findByIdAndDelete({ _id: id });

    if (!goal) {
        return NextResponse.json({message: "Goal not found"}, {status: 404});
    }

    return NextResponse.json({message: "Goal deleted"}, {status: 200});
}