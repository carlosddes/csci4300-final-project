import connectMongoDB from "../../../../lib/mongodb";
import Goal from "@models/goalsSchema"
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import mongoose from "mongoose";

// Missing POST

export async function GET(request: NextRequest) {
    await connectMongoDB();
    const goals = await Goal.find();
    return NextResponse.json({goals});
}