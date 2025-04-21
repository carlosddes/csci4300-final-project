import connectMongoDB from "../../../../lib/mongodb";
import User from "@/models/UserSchema"
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    await connectMongoDB();
    const users = await User.find();
    return NextResponse.json({users});
}

// You can find the POST request for user creation in the signup route