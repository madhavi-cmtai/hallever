"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useLanguage } from "@/context/language-context" // or next-intl

export default function HeroBlogs() {
    const { t } = useLanguage();

    return (
        <section className="relative h-[620px] flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('/images/blogs/hero.png')" }}
                >
                    <div className="absolute inset-0 bg-opacity-50" />
                </div>
                <div className="absolute inset-0 bg-opacity-50" />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center text-[#FDFDFB] px-4 max-w-4xl mx-auto">
                <motion.h1
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
                >
                    {t("blog.hero.heading.part1")}{" "}
                    <span className="text-[#E10600]">{t("blog.hero.heading.part2")}</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="text-xl md:text-2xl mb-8 text-[#D7EDEB]"
                >
                    {t("blog.hero.subheading")}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <Link href="/products">
                        <Button
                            size="lg"
                            className="bg-[#E10600] hover:bg-[#C10500] text-white px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105"
                        >
                            {t("blog.hero.buttons.explore")}
                        </Button>
                    </Link>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.5 }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
                <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
                    <motion.div
                        animate={{ y: [0, 12, 0] }}
                        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                        className="w-1 h-3 bg-white rounded-full mt-2"
                    />
                </div>
            </motion.div>
        </section>
    )
}
