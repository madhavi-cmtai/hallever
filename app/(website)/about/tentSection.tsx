"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Crown, Heart, Sparkles } from "lucide-react";
import Image from "next/image";

const themes = [
    {
        name: "Royal Red Theme",
        description: "Traditional Rajasthani elegance with rich red draping and golden accents",
        features: ["Majestic red fabrics", "Golden lighting accents", "Traditional motifs"]
    },
    {
        name: "Boho Sunset",
        description: "Modern bohemian style with warm sunset colors and flowing fabrics",
        features: ["Warm color palette", "Flowing drapes", "Ambient lighting"]
    },
    {
        name: "Garden Romance",
        description: "Romantic outdoor setup with fairy lights and floral arrangements",
        features: ["Fairy light canopies", "Fresh florals", "Natural elements"]
    }
];

const TentSection = () => {
    return (
        <section className="py-20 bg-[#FFE8EE]">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Content Side */}
                    <div className="space-y-8">
                        {/* Section Header */}
                        <div>
                            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-6">
                                Transform Your Venue into a{" "}
                                <span className="text-transparent bg-clip-text bg-[var(--primary-red)]">
                                    Dreamland
                                </span>
                            </h2>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                From royal Rajwadi tents to modern LED-lit lounges, our tent setups match your celebration style.
                                We combine lighting, drapery, and florals to create picture-perfect spaces that dazzle your guests and cameras alike.
                            </p>
                        </div>

                        {/* Features */}
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-[var(--primary-red)] box-shadow rounded-full flex items-center justify-center flex-shrink-0 glow-primary">
                                    <Crown className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg text-card-foreground mb-2">Royal Rajwadi Experience</h3>
                                    <p className="text-muted-foreground">Authentic Rajasthani royal tent setups with intricate details and majestic presence.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-[var(--primary-gold)]  rounded-full flex items-center justify-center flex-shrink-0 glow-accent">
                                    <Sparkles className="w-6 h-6 text-accent-foreground " />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg text-card-foreground mb-2 ">LED Integration</h3>
                                    <p className="text-muted-foreground">Seamless blend of traditional fabrics with modern LED lighting technology.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-[var(--primary-red)] box-shadow rounded-full flex items-center justify-center flex-shrink-0 glow-primary">
                                    <Heart className="w-6 h-6 text-primary-foreground" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg text-card-foreground mb-2">Custom Themes</h3>
                                    <p className="text-muted-foreground">Every setup is tailored to your vision, ensuring a unique and personal touch.</p>
                                </div>
                            </div>
                        </div>

                        {/* CTA */}
                        <Button className="bg-[var(--primary-red)] hover:bg-[var(--primary-pink)] group mt-4">
                            Explore Tent Themes
                            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                        </Button>
                    </div>

                    {/* Image & Themes Side */}
                    <div className="space-y-8">
                        {/* Main Image */}
                        <div className="relative overflow-hidden rounded-2xl shadow-elegant">
                            <Image
                                src="/images/about/tent.jpeg"
                                alt="Luxury wedding tent setup"
                                width={1200}
                                height={600}
                                className="w-full h-80 object-cover hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                            <div className="absolute bottom-6 left-6 text-white">
                                <h3 className="font-heading text-2xl font-semibold mb-2">Royal Wedding Setup</h3>
                                <p className="text-white/80">Complete venue transformation</p>
                            </div>
                        </div>

                        {/* Theme Cards */}
                        <div className="grid grid-cols-1 gap-4">
                            {themes.map((theme, index) => (
                                <div
                                    key={theme.name}
                                    className={`p-6 bg-card rounded-xl border border-border hover-glow transition-all duration-300 cursor-pointer fade-in-up delay-${index + 1}`}
                                >
                                    <div className="flex justify-between items-start mb-3">
                                        <h4 className="font-heading text-lg font-semibold text-card-foreground">
                                            {theme.name}
                                        </h4>
                                        
                                    </div>
                                    <p className="text-muted-foreground text-sm mb-3">
                                        {theme.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {theme.features.map((feature) => (
                                            <span
                                                key={feature}
                                                className="text-xs bg-[#FFE8EE] text-secondary-foreground px-2 py-1 rounded-full"
                                            >
                                                {feature}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TentSection;
