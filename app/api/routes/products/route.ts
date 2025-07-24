import { NextRequest, NextResponse } from "next/server";
import { parseFormData, normalizeField } from "@/lib/utils/parserForm"; 
import { UploadMultipleImages } from "@/lib/utils/imageController";
import ProductService from "@/app/api/services/productServices";
import consoleManager from "@/app/api/utils/consoleManager";


export async function POST(req: NextRequest) {
    try {
        const { fields, files } = await parseFormData(req);

        const name = normalizeField(fields.name);
        const summary = normalizeField(fields.summary);
        const wattage = normalizeField(fields.wattage);
        const price = normalizeField(fields.price);
        if (!name || !summary || !wattage || !price) {
            return NextResponse.json(
                {
                    statusCode: 400,
                    errorCode: "MISSING_FIELDS",
                    errorMessage: "name, summary, wattage, and price are required",
                },
                { status: 400 }
            );
        }


        const imageFiles = Array.isArray(files.images) ? files.images : files.images ? [files.images] : [];
        const uploadedImageUrls = imageFiles.length > 0 ? await UploadMultipleImages(imageFiles) : [];
        

        const product = {
            name,
            summary,
            wattage,
            price: parseFloat(price),
            images: uploadedImageUrls,
            link: normalizeField(fields.link),
            dimensions: normalizeField(fields.dimensions),
            voltage: normalizeField(fields.voltage),
            efficiency: normalizeField(fields.efficiency),
            warranty: normalizeField(fields.warranty),
            createdOn: new Date().toISOString(),
            updatedOn: new Date().toISOString(),
        };

        await ProductService.addProduct(product);
        const allProducts = await ProductService.getAllProducts();

        return NextResponse.json({
            statusCode: 200,
            message: "Product added successfully",
            data: allProducts,
            errorCode: "NO",
            errorMessage: "",
        });
    } catch (error) {
        consoleManager.error("PRODUCT_POST_ERROR", error);
        return NextResponse.json(
            { statusCode: 500, errorCode: "INTERNAL_ERROR", errorMessage: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}

// ✅ GET: Get all products
export async function GET() {
    try {
        const products = await ProductService.getAllProducts();
        return NextResponse.json({
            statusCode: 200,
            message: "Products fetched successfully",
            data: products,
            errorCode: "NO",
            errorMessage: "",
        });
    } catch (error) {
        consoleManager.error("PRODUCT_GET_ERROR", error);
        return NextResponse.json(
            { statusCode: 500, errorCode: "INTERNAL_ERROR", errorMessage: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}
