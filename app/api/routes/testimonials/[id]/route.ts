// /app/api/routes/testimonials/[id]/route.ts
import { NextResponse } from "next/server";
import TestimonialService from "@/app/api/services/testimonialServices";

// ✅ GET → Fetch testimonial by ID
export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const testimonial = await TestimonialService.getTestimonialById(params.id);

        if (!testimonial) {
            return NextResponse.json(
                { status: "error", message: "Testimonial not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { status: "success", data: testimonial },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching testimonial:", error);
        return NextResponse.json(
            { status: "error", message: error.message },
            { status: 500 }
        );
    }
}

// ✅ PUT → Update testimonial by ID
export async function PUT(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const body = await req.json();
        const updatedTestimonial = await TestimonialService.updateTestimonial(
            params.id,
            body
        );

        return NextResponse.json(
            { status: "success", data: updatedTestimonial },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error updating testimonial:", error);
        return NextResponse.json(
            { status: "error", message: error.message },
            { status: 500 }
        );
    }
}

// ✅ DELETE → Delete testimonial by ID
export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const result = await TestimonialService.deleteTestimonial(params.id);

        return NextResponse.json(
            { status: "success", data: result },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error deleting testimonial:", error);
        return NextResponse.json(
            { status: "error", message: error.message },
            { status: 500 }
        );
    }
}
