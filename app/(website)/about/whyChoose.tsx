/* eslint-disable react/no-unescaped-entities */
import { Target, Sparkles, Users, Clock, MessageCircle } from "lucide-react";

const features = [
    {
        icon: Target,
        title: "Custom Concepts",
        description: "From traditional Rajasthani heritage styles to modern luxury setups — your vision, brought to life."
    },
    {
        icon: Sparkles,
        title: "Premium Lights & Decor",
        description: "We only use tested, durable, and energy-efficient lighting solutions."
    },
    {
        icon: Users,
        title: "Experienced Setup Crew",
        description: "Our team brings years of on-ground experience for seamless execution."
    },
    {
        icon: Clock,
        title: "Timely Delivery & Setup",
        description: "We value your time. Count on us for punctual, professional service."
    },
    {
        icon: MessageCircle,
        title: "Personalized Consultation",
        description: "Tell us your theme, we'll make it magical."
    }
];

const WhyChooseSection = () => {
    return (
        <section className="py-20 bg-secondary">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 ">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-6">
                        Why Hallever is the{" "}
                        <span className="text-transparent bg-clip-text bg-[var(--primary-red)]">
                            Light of Your Event
                        </span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        We don't just provide lighting – we create magical experiences that transform your special moments into unforgettable memories.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {features.map((feature, index) => (
                        <div
                            key={feature.title}
                            className={`group p-8 bg-card rounded-2xl card-glow transition-all duration-500 fade-in-up delay-${index + 1}`}
                        >

                            {/* Icon */}
                            <div className="mb-6">
                                <div className="w-16 h-16 bg-[var(--primary-red)] box-shadow  rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 glow-primary">
                                    <feature.icon className="w-8 h-8 text-white " />
                                </div>
                            </div>

                            {/* Content */}
                            <h3 className="font-heading text-2xl font-semibold text-foreground  mb-4 group-hover:text-[var(--primary-red)] transition-colors duration-300">
                                {feature.title}
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {feature.description}
                            </p>

                            {/* Decorative element */}
                            <div className="mt-6 w-12 h-1 bg-[var(--primary-gold)] rounded-full opacity-60 group-hover:opacity-100 group-hover:w-16 transition-all duration-300"></div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-16">
                    <div className="inline-flex items-center gap-2 text-[var(--primary-red)] font-semibold">
                        <Sparkles className="w-5 h-5" />
                        <span>Lighting up love, one event at a time.</span>
                        <Sparkles className="w-5 h-5" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseSection;