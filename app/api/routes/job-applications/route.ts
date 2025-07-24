import { NextRequest, NextResponse } from "next/server";
import { JobApplicationService } from "@/app/api/services/jobApplicationServices";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { jobId, name, email, phone, resumeUrl, coverLetter } = body;
        if (!jobId || !name || !email || !phone) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }
        const application = await JobApplicationService.addApplication({ jobId, name, email, phone, resumeUrl, coverLetter });
        return NextResponse.json(application, { status: 201 });
    } catch (error) {
        console.error("Error applying for job:", error);
        return NextResponse.json({ message: "Failed to apply for job", error }, { status: 500 });
    }
}

export async function GET() {
    try {
        const applications = await JobApplicationService.getAllApplications();
        return NextResponse.json(applications, { status: 200 });
    } catch (error) {
        console.error("Error fetching job applications:", error);
        return NextResponse.json({ message: "Failed to fetch job applications" }, { status: 500 });
    }
} 