"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { ProductItem } from "@/lib/redux/slice/productSlice"
import { useLanguage } from "@/context/language-context";

interface ProductModalProps {
    product: ProductItem
    onClose: () => void
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0)
    const { t } = useLanguage();

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex justify-between items-center p-6 border-b">
                        <h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>
                        <Button variant="ghost" size="sm" onClick={onClose}>
                            <X className="w-6 h-6" />
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
                        {/* Images Section */}
                        <div className="space-y-4">
                            <div className="aspect-square rounded-lg overflow-hidden">
                                <Image
                                    src={product.images[selectedImageIndex] || "/placeholder.svg"}
                                    alt={`${product.name} - Image ${selectedImageIndex + 1}`}
                                    width={500}
                                    height={500}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="grid grid-cols-4 gap-2">
                                {product.images.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImageIndex(index)}
                                        className={`aspect-square rounded-lg overflow-hidden border-2 transition-all duration-200 ${selectedImageIndex === index ? "border-[#E10600]" : "border-gray-200 hover:border-gray-300"
                                            }`}
                                    >
                                        <Image
                                            src={image || "/placeholder.svg"}
                                            alt={`${product.name} - Thumbnail ${index + 1}`}
                                            width={100}
                                            height={100}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Product Details Section */}
                        <div className="space-y-6">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                                <p className="text-gray-600 text-lg mb-4">{product.summary}</p>
                                <div className="flex items-center gap-4 mb-4">
                                    <span className="text-3xl font-bold text-[#E10600]">{product.price}</span>
                                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">{product.wattage}</span>
                                </div>
                            </div>

                            {/* Specifications */}
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Specifications</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-gray-50 p-3 rounded-lg">
                                        <span className="text-sm text-gray-500">Dimensions</span>
                                        <p className="font-semibold">{product.specifications.dimensions}</p>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded-lg">
                                        <span className="text-sm text-gray-500">Voltage</span>
                                        <p className="font-semibold">{product.specifications.voltage}</p>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded-lg">
                                        <span className="text-sm text-gray-500">Efficiency</span>
                                        <p className="font-semibold">{product.specifications.efficiency}</p>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded-lg">
                                        <span className="text-sm text-gray-500">Warranty</span>
                                        <p className="font-semibold">{product.specifications.warranty}</p>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded-lg">
                                        <span className="text-sm text-gray-500">Link</span>
                                        <p className="font-semibold">{product.link}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="space-y-3">
                                <a
                                    href={`https://wa.me/9468909306?text=${encodeURIComponent(
                                        `Hello, I'm interested in this product:\n\n*${product.name}*\n${product.summary}\nPrice: ${product.price}\nWattage: ${product.wattage}`
                                    )}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block"
                                >
                                    <Button
                                        className="w-full bg-[#E10600] hover:bg-[#C10500] text-white py-3 text-lg"
                                        size="lg"
                                    >
                                        {t("button.shopNow")}
                                    </Button>
                                </a>

                                
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}
