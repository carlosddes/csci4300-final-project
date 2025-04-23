import connectMongoDB from "../../../../lib/mongodb";
import User from "@/models/UserSchema";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
    await connectMongoDB();
    const { name, email, password } = await request.json();

    const checkIfExists = await User.find({ email: email });

    if (checkIfExists.length > 0) {
        return NextResponse.json({message: "Email already in use"}, { status: 400 })
    } else {
        const hashedPassword = await bcrypt.hash(password, 5);
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        try {
            await User.create(newUser);
            return NextResponse.json({ message: "User created successfully" }, { status: 201 });
        } catch (error: any) {
            return NextResponse.json({ message: "Error creating user" }, { status: 400 });
        }
    }
}