// app/about/page.tsx
import AboutSection from "@/components/home/about-section";
import AboutHero from "./aboutHero";
import WhyChooseSection from "./whyChoose";
import TentSection from "./tentSection";
import TestimonialsSection from "@/components/home/testimonial-section";
import ContactSection from "@/components/home/contactUs-section";

const AboutPage = () => {
    return (
        <main>
            
            <AboutHero />
            <AboutSection/>
            <WhyChooseSection/>
            <TentSection/>
            <TestimonialsSection/>
            <ContactSection/>
        </main>
    );
};

export default AboutPage;
