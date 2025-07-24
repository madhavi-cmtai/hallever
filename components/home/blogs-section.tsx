'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/language-context';

const BlogsPreview = () => {
    const pathname = usePathname();
    const isHome = pathname === '/';
    const { t } = useLanguage();

    const blogs = [
        {
            id: 1,
            title: "Latest Trends in Event Lighting Design",
            image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800",
            excerpt: "Discover the cutting-edge lighting techniques that are transforming modern events...",
            link: "/blogs/latest-trends"
        },
        {
            id: 2,
            title: "Sustainable Solar Solutions for Outdoor Events",
            image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800",
            excerpt: "Learn how solar-powered lighting is revolutionizing eco-friendly event planning...",
            link: "/blogs/solar-solutions"
        }
    ];

    return (
        <section id="blogs" className="py-20 bg-background">
            <div className="container mx-auto px-4">
                {/* Section Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                        {t("blogs.heading1")}{" "}
                        <span className="text-[var(--primary-red)]">{t("blogs.heading2")}</span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        {t("blogs.subheading")}
                    </p>
                </motion.div>

                {/* Blog Cards */}
                <div className="flex flex-col lg:flex-row gap-8 justify-center items-stretch">
                    {blogs.map((blog, index) => (
                        <motion.div
                            key={blog.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className="w-full lg:w-[60%] group rounded-2xl overflow-hidden shadow-card hover:shadow-hover transition-all duration-300"
                        >
                            <div className="relative h-[55vh]">
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                                    style={{ backgroundImage: `url(${blog.image})` }}
                                />
                            </div>

                            <div className="bg-black p-6">
                                <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                                    {blog.title}
                                </h3>
                                <p className="text-muted-foreground mb-4">
                                    {blog.excerpt}
                                </p>
                                <Button
                                    variant="outline"
                                    className="text-sm font-semibold px-6 py-2 border-border hover:bg-gray-300 hover:text-accent-foreground transition-all"
                                >
                                    {t("button.readMore")} →
                                </Button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Conditionally Rendered More Blogs Button */}
                {isHome && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="text-center mt-12"
                    >
                        <Button
                            size="lg"
                            className="bg-[var(--primary-red)] hover:bg-[var(--primary-red)]/90 text-primary-foreground px-8 py-4 text-lg font-semibold rounded-full shadow-hover transition-all duration-300 hover:scale-105"
                        >
                            {t("button.allBlogs")}
                        </Button>
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default BlogsPreview;
