import HeroSection from "../components/home/hero-section";
import AboutSection from "../components/home/about-section";
import ProductSection from "../components/home/product-section";
import BlogsSection from "../components/home/blogs-section";
import ProductCategories from "../components/home/product-categories";
import ContactUs from "../components/home/contactUs-section";
import TestimonialsSection from "@/components/home/testimonial-section";


export default function Home() {
  return (
    <div>
     
      <HeroSection />
      <AboutSection />
      <ProductSection />
      <ProductCategories />
      <BlogsSection />
      <TestimonialsSection />
      <ContactUs />
    </div>
  );
}
