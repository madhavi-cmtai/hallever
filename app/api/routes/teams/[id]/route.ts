import { NextResponse } from "next/server";
import { UploadImage } from "@/app/api/controller/imageController";
import { TeamMember } from "@/lib/redux/slice/teamSlice";
import TeamService from "@/app/api/services/teamServices";
import consoleManager from "@/app/api/utils/consoleManager";

// ----------------- PUT: Update Team Member -----------------
export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const formData = await req.formData();

        const name = formData.get("name") as string | null;
        const role = formData.get("position") as string | null; // 👈 using "role" since your model has role
        const bio = formData.get("bio") as string | null;

        // ✅ Handle image (optional update)
        const imageFile = formData.get("image") as File | null;
        let imageUrl: string | undefined;
        if (imageFile instanceof File) {
            imageUrl = await UploadImage(imageFile);
        }

        const updatedFields: Partial<Omit<TeamMember, "id" | "createdOn" | "updatedOn">> = {};
        if (name) updatedFields.name = name;
        if (role) updatedFields.position = role;
        if (bio) updatedFields.bio = bio;
        if (imageUrl) updatedFields.image = imageUrl;

        const updatedTeamMember = await TeamService.updateTeamMember(id, updatedFields);

        return NextResponse.json({
            statusCode: 200,
            message: "Team member updated successfully",
            data: updatedTeamMember,
        }, { status: 200 });

    } catch (error) {
        consoleManager.error("PUT /api/routes/teams/[id]:", error);
        return NextResponse.json({
            statusCode: 500,
            errorCode: "INTERNAL_ERROR",
            errorMessage: error instanceof Error ? error.message : "Unknown error",
        }, { status: 500 });
    }
}

// ----------------- DELETE: Remove Team Member -----------------
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;

        await TeamService.deleteTeamMember(id);

        return NextResponse.json({
            statusCode: 200,
            message: "Team member deleted successfully",
        }, { status: 200 });

    } catch (error) {
        consoleManager.error("DELETE /api/routes/teams/[id]:", error);
        return NextResponse.json({
            statusCode: 500,
            errorCode: "INTERNAL_ERROR",
            errorMessage: error instanceof Error ? error.message : "Unknown error",
        }, { status: 500 });
    }
}
