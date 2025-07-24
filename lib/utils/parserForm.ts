// lib/utils/formParser.ts
import formidable, { Fields, Files } from "formidable";
import { IncomingMessage } from "http";
import { NextRequest } from "next/server";

// 🔧 Parses multipart/form-data using formidable
export async function parseFormData(req: NextRequest): Promise<{ fields: Fields; files: Files }> {
    const form = formidable({ multiples: true, keepExtensions: true });
    const incomingReq = req as unknown as IncomingMessage;

    return new Promise((resolve, reject) => {
        form.parse(incomingReq, (err, fields, files) => {
            if (err) return reject(err);
            resolve({ fields, files });
        });
    });
}

// 🔧 Normalize string | string[] to string
export function normalizeField(field?: string | string[]): string {
    return Array.isArray(field) ? field[0] : field || "";
}
