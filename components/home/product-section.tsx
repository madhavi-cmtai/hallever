"use client";

import React, { useState } from "react";
import Image from "next/image";
import ProductModal from "@/app/(website)/products/productModal";
import { ProductItem } from "@/lib/redux/slice/productSlice";
import { useLanguage } from "@/context/language-context";

const categories = ["indoor", "outdoor", "tent", "raw", "machinery", "solar"];

const categoryImages: Record<string, string> = {
    indoor: "/images/indoor.jpeg",
    outdoor: "/images/outdoor.jpeg",
    tent: "/images/tent.jpeg",
    raw: "/images/raw-materials.jpeg",
    machinery: "/images/machinery.png",
    solar: "/images/solar.jpeg",
};

export default function ProductSection() {
    const [hoveredProductIndex, setHoveredProductIndex] = useState<number | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
    const { t } = useLanguage();

    const products = [
        {
            id: 1,
            name: "LED Fairy Lights",
            images: ["/images/light1.jpg", "/images/light2.jpg"],
            price: 899,
            wattage: "5W",
            summary: "Beautiful string lights to enhance your indoor decor.",
            specifications: {
                dimensions: "10m",
                voltage: "220V",
                efficiency: "90%",
                warranty: "1 year",
            },
            link: "https://example.com/product1",
        },
        {
            id: 2,
            name: "Outdoor Flood Light",
            images: ["/images/outdoor1.jpg", "/images/outdoor2.jpg"],
            price: 1499,
            wattage: "50W",
            summary: "Strong lighting solution for outdoor areas.",
            specifications: {
                dimensions: "20cm x 10cm",
                voltage: "240V",
                efficiency: "95%",
                warranty: "2 years",
            },
            link: "https://example.com/product2",
        },
        {
            id: 3,
            name: "Solar Garden Light",
            images: ["/images/solar1.jpg", "/images/solar2.jpg"],
            price: 1199,
            wattage: "15W",
            summary: "Eco-friendly solar lights for your lawn or backyard.",
            specifications: {
                dimensions: "25cm x 8cm",
                voltage: "12V",
                efficiency: "88%",
                warranty: "2 years",
            },
            link: "https://example.com/product3",
        },
    ];

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                {/* Categories */}
                <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
                    {t("products.title").split(" ")[0]}{" "}
                    <span className="text-[var(--primary-red)]">
                        {t("products.title").split(" ")[1]}
                    </span>
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 mb-20">
                    {categories.map((key) => (
                        <div
                            key={key}
                            className="text-center group cursor-pointer transform hover:scale-105 transition-all duration-300"
                        >
                            <div className="relative w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 bg-[#a8e6ff]/10 group-hover:bg-[#a8e6ff]/20 transition-colors">
                                <Image
                                    src={categoryImages[key]}
                                    alt={t(`products.categories.${key}.name`)}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800">
                                {t(`products.categories.${key}.name`)}
                            </h3>
                            <p className="text-xs text-gray-500 mt-1">
                                {t(`products.categories.${key}.summary`)}
                            </p>
                        </div>
                    ))}

                </div>

                {/* Products */}
                <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
                    {t("products.featured").split(" ")[0]}{" "}
                    <span className="text-[var(--primary-red)]">
                        {t("products.featured").split(" ")[1]}
                    </span>
                </h2>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {products.map((product, index) => (
                        <div
                            key={index}
                            onMouseEnter={() => setHoveredProductIndex(index)}
                            onMouseLeave={() => setHoveredProductIndex(null)}
                            className="border border-gray-200 rounded-xl shadow-md p-4 transition-all hover:shadow-xl bg-white"
                        >
                            <div className="relative h-52 w-full mb-4 overflow-hidden rounded-md">
                                <Image
                                    src={
                                        hoveredProductIndex === index && product.images[1]
                                            ? product.images[1]
                                            : product.images[0]
                                    }
                                    alt={product.name}
                                    fill
                                    className="object-contain transition-transform duration-300"
                                />
                            </div>

                            <h3 className="text-xl font-semibold text-gray-800 mb-1">
                                {product.name}
                            </h3>
                            <p className="text-sm text-gray-600 mb-2">₹{product.price}</p>

                            <ul className="text-xs text-gray-500 space-y-1 mb-4">
                                <li><strong>Wattage:</strong> {product.wattage}</li>
                                <li><strong>Dimension:</strong> {product.specifications.dimensions}</li>
                                <li><strong>Efficiency:</strong> {product.specifications.efficiency}</li>
                            </ul>

                            <div className="flex justify-between gap-2">
                                <button className="w-[50%] bg-[var(--primary-red)] text-white px-4 py-2 text-sm rounded hover:bg-red-700 transition">
                                    {t("button.shopNow")}
                                </button>
                                <button
                                    onClick={() => setSelectedProduct(product)}
                                    className="w-[50%] border border-[var(--primary-red)] text-[var(--primary-red)] px-4 py-2 text-sm rounded hover:bg-[var(--primary-red)] hover:text-white transition"
                                >
                                    {t("button.knowMore")}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Product Modal */}
            {selectedProduct && (
                <ProductModal
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                />
            )}
        </section>
    );
}
