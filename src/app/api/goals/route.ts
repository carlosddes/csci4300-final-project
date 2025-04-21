import connectMongoDB from "../../../../lib/mongodb";
import Goal from "@/models/GoalsSchema"
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const {amount, userID} = await request.json();
    await connectMongoDB();
    await Goal.create({amount, userID});
    return NextResponse.json({messsage: "Goal added succesfully"}, {status: 201});
}

export async function GET(request: NextRequest) {
    await connectMongoDB();
    const goals = await Goal.find();
    return NextResponse.json({goals});
}