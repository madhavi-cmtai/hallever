"use client";

import Image from "next/image";
import { Star, Quote } from "lucide-react";
import { useLanguage } from "@/context/language-context"; // ✅ Import i18n context

const testimonials = [
    {
        id: 1,
        name: "Priya & Arjun",
        event: "Wedding Ceremony",
        location: "Jaipur, Rajasthan",
        rating: 5,
        text: "Our wedding looked like a fairytale! The lighting was absolutely magical and created the perfect ambiance for our special day. Thank you Hallever team for making our dreams come true.",
        image: "/images/testimonials/priya-arjun.jpg",
    },
    {
        id: 2,
        name: "Rajesh Kumar",
        event: "Anniversary Celebration",
        location: "Delhi",
        rating: 5,
        text: "Punctual, beautiful lights, great coordination. The team was professional and the setup exceeded our expectations. Highly recommended for any celebration!",
        image: "/images/testimonials/rajesh-kumar.jpg",
    },
    {
        id: 3,
        name: "Meera Sharma",
        event: "Corporate Event",
        location: "Mumbai",
        rating: 5,
        text: "The tent decor and lighting was beyond our imagination! They transformed our venue into something truly spectacular. Amazing attention to detail and creativity.",
        image: "/images/testimonials/meera-sharma.jpg",
    },
];

const TestimonialsSection = () => {
    const { t } = useLanguage();

    return (
        <section className="py-20 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16 mt-5 pt-4">
                    <h2 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-6 pt-3">
                        {t("testimonials.heading.part1")}{" "}
                        <span className="text-transparent bg-clip-text bg-[var(--primary-red)] pt-3">
                            {t("testimonials.heading.part2")}
                        </span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        {t("testimonials.subheading")}
                    </p>
                </div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={testimonial.id}
                            className={`bg-card p-8 rounded-2xl shadow-lg hover-glow transition-all duration-500 fade-in-up delay-${index + 1} relative`}
                        >
                            {/* Quote Icon */}
                            <div className="absolute -top-4 left-8">
                                <div className="w-8 h-8 bg-[var(--primary-red)] rounded-full flex items-center justify-center glow-primary">
                                    <Quote className="w-4 h-4 text-primary-foreground" />
                                </div>
                            </div>

                            {/* Rating */}
                            <div className="flex items-center mb-6 pt-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className="w-5 h-5 text-accent fill-current"
                                        style={{ color: "#FEDC01" }}
                                    />
                                ))}
                            </div>

                            {/* Testimonial Text */}
                            <p className="text-card-foreground text-lg leading-relaxed mb-8 italic">
                                {testimonial.text}
                            </p>

                            {/* Client Info */}
                            <div className="flex items-center gap-4">
                                <Image
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    width={56}
                                    height={56}
                                    className="rounded-full object-cover w-14 h-14"
                                />
                                <div>
                                    <h4 className="font-semibold text-card-foreground text-lg">
                                        {testimonial.name}
                                    </h4>
                                    <p className="text-muted-foreground text-sm">
                                        {testimonial.event}
                                    </p>
                                    <p className="text-[var(--primary-red)] text-sm font-medium">
                                        {testimonial.location}
                                    </p>
                                </div>
                            </div>

                            {/* Decorative Border */}
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-[var(--primary-gold)] rounded-b-2xl opacity-60"></div>
                        </div>
                    ))}
                </div>

                {/* Trust Badges */}
                <div className="text-center mt-16">
                    <div className="inline-flex items-center gap-8 text-muted-foreground flex-wrap justify-center">
                        <div className="flex items-center gap-2">
                            <Star
                                className="w-5 h-5 text-accent fill-current"
                                style={{ color: "#FEDC01" }}
                            />
                            <span className="font-semibold">{t("testimonials.trust.rating")}</span>
                        </div>
                        <div className="w-1 h-6 bg-border hidden sm:block"></div>
                        <div className="flex items-center gap-2">
                            <span className="font-semibold">{t("testimonials.trust.customers")}</span>
                        </div>
                        <div className="w-1 h-6 bg-border hidden sm:block"></div>
                        <div className="flex items-center gap-2">
                            <span className="font-semibold">{t("testimonials.trust.guarantee")}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
