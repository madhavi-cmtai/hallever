// app/api/routes/team/[id].ts
import { NextRequest, NextResponse } from "next/server";
import TeamService from "@/app/api/services/teamServices";
import consoleManager from "../../../utils/consoleManager";

// Get team member by ID
export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    try {
        const member = await TeamService.getTeamMemberById(id);

        if (!member) {
            return NextResponse.json({
                statusCode: 404,
                errorCode: "NOT_FOUND",
                errorMessage: "Team member not found",
            }, { status: 404 });
        }

        consoleManager.log("Team member fetched:", member);
        return NextResponse.json({
            statusCode: 200,
            message: "Team member fetched successfully",
            data: member,
            errorCode: "NO",
            errorMessage: "",
        }, { status: 200 });

    } catch (error: unknown) {
        const message = typeof error === "object" && error && "message" in error
            ? (error as { message?: string }).message
            : String(error);
        consoleManager.error("Error in GET /api/team/[id]:", error);
        return NextResponse.json({
            statusCode: 500,
            errorCode: "INTERNAL_ERROR",
            errorMessage: message || "Internal Server Error",
        }, { status: 500 });
    }
}

// Update team member
export async function PUT(_req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    try {
        const body = await _req.json();
        const updatedMember = await TeamService.updateTeamMember(id, body);

        if (!updatedMember) {
            return NextResponse.json({
                statusCode: 404,
                errorCode: "NOT_FOUND",
                errorMessage: "Team member not found",
            }, { status: 404 });
        }

        consoleManager.log("Team member updated:", updatedMember);
        return NextResponse.json({
            statusCode: 200,
            message: "Team member updated successfully",
            data: updatedMember,
            errorCode: "NO",
            errorMessage: "",
        }, { status: 200 });

    } catch (error: unknown) {
        const message = typeof error === "object" && error && "message" in error
            ? (error as { message?: string }).message
            : String(error);
        consoleManager.error("Error in PUT /api/team/[id]:", error);
        return NextResponse.json({
            statusCode: 500,
            errorCode: "INTERNAL_ERROR",
            errorMessage: message || "Internal Server Error",
        }, { status: 500 });
    }
}

// Delete team member
export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    try {
        const isDeleted = await TeamService.deleteTeamMember(id);

        if (!isDeleted.success) {
            return NextResponse.json({
                statusCode: 404,
                errorCode: "NOT_FOUND",
                errorMessage: "Team member not found",
            }, { status: 404 });
        }

        consoleManager.log("Team member deleted:", id);
        return NextResponse.json({
            statusCode: 200,
            message: "Team member deleted successfully",
            data: null,
            errorCode: "NO",
            errorMessage: "",
        }, { status: 200 });

    } catch (error: unknown) {
        const message = typeof error === "object" && error && "message" in error
            ? (error as { message?: string }).message
            : String(error);
        consoleManager.error("Error in DELETE /api/team/[id]:", error);
        return NextResponse.json({
            statusCode: 500,
            errorCode: "INTERNAL_ERROR",
            errorMessage: message || "Internal Server Error",
        }, { status: 500 });
    }
}
