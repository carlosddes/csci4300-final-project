import connectMongoDB from "../../../../../lib/mongodb";
import User from "@/models/UserSchema"
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
    const user = await User.findOne({ _id: id });

    if (!user) {
        return NextResponse.json({message: "User not found"}, {status: 404});
    }

    return NextResponse.json({user}, {status: 200});
}

export async function DELETE(request: NextRequest, { params }:RouteParams) {
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json({message: "Invalid ID format"}, {status: 400});
    }

    await connectMongoDB();
    const user = await User.findOne({ _id: id });

    if (!user) {
        return NextResponse.json({message: "User not found"}, {status: 404});
    }

    return NextResponse.json({message: "User deleted"}, {status: 200});
}