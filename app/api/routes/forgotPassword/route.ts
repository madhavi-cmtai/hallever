import { NextRequest, NextResponse } from "next/server";
import ForgotPasswordService from "@/app/api/services/forgotPassword";
import consoleManager from "@/app/api/utils/consoleManager";

// GET all forgot password
export async function GET() {
    try {
        const forgotPassword = await ForgotPasswordService.getAllForgotPassword();
        return NextResponse.json({ success: true, data: forgotPassword }, { status: 200 });
    } catch (error) {
        consoleManager.error("Error in GET /api/forgotPassword:", error as Error);
        return NextResponse.json({ success: false, message: "Failed to fetch forgot password" } as const, { status: 500 });
    }
}

// POST new forgot password
export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        const body = await req.json();
        const { name, email, phone, status } = body;

        if (!name || !email || !phone) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        const newForgotPassword = await ForgotPasswordService.addForgotPassword({ name, email, phone, status });

        return NextResponse.json({ success: true, data: newForgotPassword }, { status: 201 });
    } catch (error) {
        consoleManager.error("Error in POST /api/forgotPassword:", error);
        return NextResponse.json({ success: false, message: "Failed to create forgot password" }, { status: 500 });
    }
}
