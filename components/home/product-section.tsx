"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import ProductModal from "@/app/(website)/products/productModal";
import { fetchProducts, selectProducts, selectIsLoading, ProductItem } from "@/lib/redux/slice/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/lib/redux/store";
import { useLanguage } from "@/context/language-context";
import { Loader2 } from "lucide-react";

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
    const dispatch = useDispatch<AppDispatch>();
    const { t } = useLanguage();

    const products = useSelector(selectProducts);
    const isLoading = useSelector(selectIsLoading);

    const [selectedImageIndices, setSelectedImageIndices] = useState<Record<string, number>>({});
    const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const openModal = (product: ProductItem) => {
        setSelectedProduct(product);
    };

    const handleImageSelect = (productId: string | number, index: number) => {
        setSelectedImageIndices((prev) => ({
            ...prev,
            [String(productId)]: index,
        }));
    };

    const filteredProducts = selectedCategory
        ? products.filter((product) =>
            product.category?.toLowerCase().includes(selectedCategory.toLowerCase())
        )
        : products;

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                {/* Section Heading */}
                <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
                    {t("products.titleFirst")}{" "}
                    <span className="text-[var(--primary-red)]">{t("products.titleSecond")}</span>
                </h2>

                {/* Category List */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 mb-20">
                    {categories.map((key) => (
                        <div
                            key={key}
                            onClick={() => setSelectedCategory((prev) => (prev === key ? null : key))}
                            className={`text-center group cursor-pointer transform hover:scale-105 transition-all duration-300 ${selectedCategory === key ? "scale-105" : ""
                                }`}
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

                {/* Product Listing Title */}
                <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
                    {selectedCategory ? t("products.titleFirst") : t("products.titleFirst")}{" "}
                    <span className="text-[var(--primary-red)]">
                        {selectedCategory ? `${t("products.categories." + selectedCategory + ".name")} ${t("products.titleSecond")}` : t("products.titleSecond")}
                    </span>
                </h2>

                {/* Products */}
                {isLoading ? (
                    <div className="text-center text-gray-500 py-12">
                        <Loader2 className="w-10 h-10 animate-spin mx-auto" />
                    </div>
                ) : (
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredProducts.map((product) => {
                            const currentImageIndex = selectedImageIndices[product.id] || 0;
                            return (
                                <div
                                    key={product.id}
                                    className="border border-gray-200 rounded-xl shadow-md transition-all hover:shadow-xl bg-white"
                                >
                                    <div className="relative w-full h-52 mb-4 overflow-hidden rounded-md">
                                        <Image
                                            src={product.images[currentImageIndex] || "/placeholder.svg"}
                                            alt={product.name}
                                            fill
                                            className="object-cover w-full h-full transition-transform duration-300"
                                        />
                                        {product.images.length > 1 && (
                                            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
                                                {product.images.map((_, imgIndex) => (
                                                    <button
                                                        key={imgIndex}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleImageSelect(product.id, imgIndex);
                                                        }}
                                                        className={`w-2 h-2 rounded-full border border-white ${currentImageIndex === imgIndex
                                                                ? "bg-[var(--primary-red)]"
                                                                : "bg-gray-300"
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-4">
                                        <h3 className="text-xl font-semibold text-gray-800 mb-1">
                                            {product.name}
                                        </h3>
                                        <p className="text-sm text-gray-600 mb-2">₹{product.price}</p>

                                        <ul className="text-xs text-gray-500 space-y-1 mb-4">
                                            <li>
                                                <strong>Wattage:</strong> {product.wattage}
                                            </li>
                                            <li>
                                                <strong>Dimension:</strong>{" "}
                                                {product.specifications?.dimensions}
                                            </li>
                                            <li>
                                                <strong>Efficiency:</strong>{" "}
                                                {product.specifications?.efficiency}
                                            </li>
                                        </ul>

                                        <div className="flex justify-between gap-2">
                                            <a
                                                href={`https://wa.me/919468909306?text=I'm interested in "${product.name}"`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-[50%] text-center bg-[var(--primary-red)] text-white px-4 py-2 text-sm rounded hover:bg-red-700 transition"
                                            >
                                                {t("button.shopNow")}
                                            </a>
                                            <button
                                                onClick={() => openModal(product)}
                                                className="w-[50%] border border-[var(--primary-red)] text-[var(--primary-red)] px-4 py-2 text-sm rounded hover:bg-[var(--primary-red)] hover:text-white transition"
                                            >
                                                {t("button.knowMore")}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Product Modal */}
            {selectedProduct && (
                <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
            )}
        </section>
    );
}
