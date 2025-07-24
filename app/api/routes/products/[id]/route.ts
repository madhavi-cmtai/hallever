import { NextRequest, NextResponse } from "next/server";
import { normalizeField, parseFormData } from "@/lib/utils/parserForm";
import { UploadMultipleImages, replaceImages } from "@/lib/utils/imageController";
import ProductService from "@/app/api/services/productServices";
import { ProductItem } from "@/lib/redux/slice/productSlice";

// GET product by ID
export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const product = await ProductService.getProductById(id);
        if (!product) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }
        return NextResponse.json(product, { status: 200 });
    } catch (error) {
        console.error("GET product error:", error);
        return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
    }
}

// UPDATE product by ID
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const { fields, files } = await parseFormData(req);
        const rawPrice = normalizeField(fields.price);

        const updatedFields: Partial<ProductItem> = {
            name: normalizeField(fields.name),
            summary: normalizeField(fields.description),
            price: rawPrice ? parseFloat(rawPrice) : undefined,
            category: normalizeField(fields.category),
            updatedOn: Date.now(),
        };

        // ✅ Optional fields - only add if they exist
        const optionalFields = ['wattage', 'link', 'dimensions', 'efficiency', 'voltage', 'warranty'];
        optionalFields.forEach((field) => {
            const value = normalizeField(fields[field]);
            if (value) {
                (updatedFields)[field] = value;
            }
        });

        // 🔁 Handle images
        const originalImagesRaw = fields.originalImages;
        let finalImages: string[] = Array.isArray(originalImagesRaw)
            ? originalImagesRaw
            : JSON.parse(originalImagesRaw || "[]");
        // Same for imagesToDelete
        const imagesToDeleteRaw = fields.imagesToDelete;
        const toDelete: string[] = Array.isArray(imagesToDeleteRaw)
            ? imagesToDeleteRaw
            : JSON.parse(imagesToDeleteRaw || "[]");

        finalImages = await replaceImages(finalImages, toDelete);

        const imageFiles = files?.images;
        if (imageFiles) {
            const newImageUrls = await UploadMultipleImages(Array.isArray(imageFiles) ? imageFiles : [imageFiles]);
            finalImages = [...finalImages, ...newImageUrls];
        }

        updatedFields.images = finalImages;

        await ProductService.updateProduct(id, updatedFields);
        return NextResponse.json({ message: "Product updated successfully" }, { status: 200 });
    } catch (error) {
        console.error("PUT product error:", error);
        return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
    }
}


// DELETE product by ID
export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const product = await ProductService.getProductById(id);
        if (!product) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }

        // Delete associated images
        await replaceImages(product.images || [], product.images || []);

        await ProductService.deleteProduct(id);
        return NextResponse.json({ message: "Product deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("DELETE product error:", error);
        return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
    }
}
