"use client";

import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ProductItem } from "@/lib/redux/slice/productSlice";
import { Trash2 } from "lucide-react";

interface ProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (
        data: ProductItem,
        newImages: File[],
        deletedImages: string[]
    ) => Promise<void>;
    product?: ProductItem;
}

const categoryOptions = [
    "Indoor",
    "Outdoor",
    "Tent Decoration",
    "Raw Materials",
    "Machinery",
    "Solar Lights",
    "Others",
];

const ProductModal: React.FC<ProductModalProps> = ({
    isOpen,
    onClose,
    onSave,
    product,
}) => {
    const [formData, setFormData] = useState({
        name: "",
        summary: "",
        wattage: "",
        price: "",
        link: "",
        category: "",
        specifications: {
            dimensions: "",
            voltage: "",
            efficiency: "",
            warranty: "",
        },
    });

    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [deletedImages, setDeletedImages] = useState<string[]>([]);
    const [error, setError] = useState("");

    useEffect(() => {
        if (isOpen) {
            if (product) {
                setFormData({
                    name: product.name,
                    summary: product.summary,
                    wattage: product.wattage || "",
                    price: product.price?.toString() || "",
                    link: product.link || "",
                    category: product.category || "",
                    specifications: {
                        dimensions: product.specifications?.dimensions || "",
                        voltage: product.specifications?.voltage || "",
                        efficiency: product.specifications?.efficiency || "",
                        warranty: product.specifications?.warranty || "",
                    },
                });
                setImagePreviews(product.images || []);
            } else {
                setFormData({
                    name: "",
                    summary: "",
                    wattage: "",
                    price: "",
                    link: "",
                    category: "",
                    specifications: {
                        dimensions: "",
                        voltage: "",
                        efficiency: "",
                        warranty: "",
                    },
                });
                setImagePreviews([]);
            }

            setSelectedImages([]);
            setDeletedImages([]);
        }
    }, [isOpen, product]);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        setSelectedImages((prev) => [...prev, ...files]);

        const previews = files.map((file) => URL.createObjectURL(file));
        setImagePreviews((prev) => [...prev, ...previews]);
    };

    const handleRemoveImage = (index: number) => {
        const imgToRemove = imagePreviews[index];

        if (product && product.images.includes(imgToRemove)) {
            setDeletedImages((prev) => [...prev, imgToRemove]);
        }

        setImagePreviews((prev) => prev.filter((_, i) => i !== index));

        const isNewImage = !product || !product.images.includes(imgToRemove);
        if (isNewImage) {
            const updatedSelected = selectedImages.filter(
                (_, i) => imagePreviews.indexOf(imgToRemove) !== i
            );
            setSelectedImages(updatedSelected);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError("");

        if (
            !formData.name ||
            !formData.summary ||
            !formData.wattage ||
            !formData.price ||
            !formData.category
        ) {
            setError("Please fill in all required fields.");
            return;
        }

        try {
            await onSave(
                {
                    name: formData.name.trim(),
                    summary: formData.summary.trim(),
                    wattage: formData.wattage.trim(),
                    price: Number(formData.price),
                    link: formData.link.trim(),
                    category: formData.category as ProductItem["category"],
                    images: imagePreviews,
                    specifications: formData.specifications,
                },
                selectedImages,
                deletedImages
            );

            onClose();
        } catch (error) {
            console.error("Save error:", error);
            setError("Failed to save product. Please try again.");
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl overflow-y-auto max-h-[95vh]">
                <DialogHeader>
                    <DialogTitle>{product ? "Edit Product" : "Add Product"}</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name */}
                    <div className="space-y-2">
                        <Label htmlFor="name">Name *</Label>
                        <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) =>
                                setFormData((prev) => ({ ...prev, name: e.target.value }))
                            }
                            required
                        />
                    </div>

                    {/* Summary */}
                    <div className="space-y-2">
                        <Label htmlFor="summary">Summary *</Label>
                        <Input
                            id="summary"
                            value={formData.summary}
                            onChange={(e) =>
                                setFormData((prev) => ({ ...prev, summary: e.target.value }))
                            }
                            required
                        />
                    </div>

                    {/* Wattage */}
                    <div className="space-y-2">
                        <Label htmlFor="wattage">Wattage *</Label>
                        <Input
                            id="wattage"
                            value={formData.wattage}
                            onChange={(e) =>
                                setFormData((prev) => ({ ...prev, wattage: e.target.value }))
                            }
                            placeholder="e.g., 100W, Medium"
                            required
                        />
                    </div>

                    {/* Price */}
                    <div className="space-y-2">
                        <Label htmlFor="price">Price *</Label>
                        <Input
                            id="price"
                            type="number"
                            value={formData.price}
                            onChange={(e) =>
                                setFormData((prev) => ({ ...prev, price: e.target.value }))
                            }
                            placeholder="e.g., 199.99"
                            required
                        />
                    </div>

                    {/* Link */}
                    <div className="space-y-2">
                        <Label htmlFor="link">Product Link</Label>
                        <Input
                            id="link"
                            type="url"
                            placeholder="https://example.com/product"
                            value={formData.link}
                            onChange={(e) =>
                                setFormData((prev) => ({ ...prev, link: e.target.value }))
                            }
                        />
                    </div>

                    {/* Category */}
                    <div className="space-y-2">
                        <Label htmlFor="category">Category *</Label>
                        <select
                            id="category"
                            value={formData.category}
                            onChange={(e) =>
                                setFormData((prev) => ({ ...prev, category: e.target.value }))
                            }
                            className="w-full border px-3 py-2 rounded-md"
                            required
                        >
                            <option value="">Select Category</option>
                            {categoryOptions.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Specifications */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {Object.entries(formData.specifications).map(([key, value]) => (
                            <div key={key} className="space-y-2">
                                <Label htmlFor={key}>
                                    {key.charAt(0).toUpperCase() + key.slice(1)}
                                </Label>
                                <Input
                                    id={key}
                                    value={value}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            specifications: {
                                                ...prev.specifications,
                                                [key]: e.target.value,
                                            },
                                        }))
                                    }
                                    placeholder={`Enter ${key}`}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Image Upload */}
                    <div className="space-y-2">
                        <Label htmlFor="images">Product Images</Label>
                        <Input
                            type="file"
                            id="images"
                            accept="image/*"
                            multiple
                            onChange={handleImageChange}
                        />
                        {imagePreviews.length > 0 && (
                            <div className="grid grid-cols-3 gap-4 mt-4">
                                {imagePreviews.map((img, index) => (
                                    <div key={index} className="relative group border rounded">
                                        <Image
                                            src={img}
                                            alt={`Preview ${index + 1}`}
                                            width={120}
                                            height={120}
                                            className="rounded object-cover aspect-square"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveImage(index)}
                                            className="absolute top-1 right-1 bg-white rounded-full p-1 hover:bg-red-100 transition"
                                        >
                                            <Trash2 className="w-4 h-4 text-red-500" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Error Message */}
                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    {/* Save Button */}
                    <div className="flex justify-end">
                        <Button type="submit" className="w-full sm:w-auto">
                            {product ? "Update Product" : "Add Product"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default ProductModal;
