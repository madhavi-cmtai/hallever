"use client";

import {
    createContext,
    useContext,
    useState,
    useEffect,
    type ReactNode,
} from "react";


export type Language = "en" | "hi";


interface LanguageContextType {
    language: Language;
    setLanguage: (language: Language) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
    undefined
);

const enTranslations: Record<string, string> = {
    // Header
    "header.home": "Home",
    "header.products": "Products",
    "header.careers": "Careers",
    "header.blogs": "Blogs",
    "header.services": "Services",
    "header.about": "About",
    "header.contact": "Contact",
    "header.language": "Language",
    "auth.login": "Login",
    "auth.register": "Register",
    "search.placeholder": "Search...",

    // Home
    "home.hero.h1": "Brighten Your World with",
    "home.hero.subheading": "Premium indoor and outdoor lighting solutions tailored for Indian homes",
    "button.shopNow": "Shop Now",
    "button.knowMore": "Know More..",
    "home.intro": "We provide the best products and services.",
    "home.learnMore": "Learn More",


    //Home About
    "about.title": "Crafting Beautiful Celebrations",
    "about.since": "Since",
    "about.para1": "Based in the vibrant heart of Rajasthan, Hallever was born out of a passion for decor and detail.From humble beginnings in local wedding setups to now offering pan - India services, we continue to deliver excellence, elegance, and emotion through light.",
    "about.para2": "Our journey began with a simple belief: every celebration deserves to be magical.What started as a small family business in Jaipur has grown into one of India's most trusted names in event lighting and decoration.We've had the privilege of illuminating love stories, milestone celebrations, and corporate events across the country.",
    "about.stats.events": "Events Decorated",
    "about.stats.designs": "Custom Lighting Designs",
    "about.stats.cities": "Cities Served",
    "about.stats.years": "Years of Excellence",
    "about.mission.title": "Our Mission",
    "about.mission.description": "To transform ordinary spaces into extraordinary experiences through the magic of light.We believe that every celebration is a story worth telling, and our lights are the words that bring those stories to life.",
    "about.vision.title": "Our Vision",
    "about.vision.description": "To become India's most trusted name in decorative lighting by blending creativity, technology, and customer satisfaction.We envision a world where every event sparkles with emotion and meaning.",
    "about.vision.highlight": "Innovation that lights up every occasion",
    "about.mission.highlight": "Where tradition meets technology in wedding decor",

    //Home product Section  
    "products.title": "Product Categories",


    //home Products categories
    "productCategories.indoor.name": "Indoor",
    "productCategories.indoor.summary": "Elegant indoor lighting & decor solutions",
    "productCategories.outdoor.name": "Outdoor",
    "productCategories.raw.name": "Raw Materials",
    "productCategories.raw.summary": "High-quality components and materials",
    "productCategories.tent.name": "Tent Decoration",
    "productCategories.tent.summary": "Decorative lighting & accessories for events",
    "productCategories.machinery.name": "Machinery",
    "productCategories.machinery.summary": "Production & manufacturing equipment",
    "products.description": "Explore our wide range of products.",
    "products.featured": "Our Products",

    //product section
    "products.categories.indoor.name": "Indoor",
    "products.categories.indoor.summary": "Elegant indoor lighting & decor solutions",
    "products.categories.outdoor.name": "Outdoor",
    "products.categories.outdoor.summary": "Weatherproof lighting for exterior spaces",
    "products.categories.raw.name": "Raw Materials",
    "products.categories.raw.summary": "High-quality components and materials",
    "products.categories.tent.name": "Tent Decoration",
    "products.categories.tent.summary": "Decorative lighting & accessories for events",
    "products.categories.machinery.name": "Machinery",
    "products.categories.machinery.summary": "Production & manufacturing equipment",
    "products.categories.solar.name": "Solar Lights",
    "products.categories.solar.summary": "Sustainable solar-powered lighting options",


    //home blogs section
    "blogs.heading1": "Latest",
    "blogs.heading2": "Insights",
    "blogs.subheading": "Stay updated with the latest trends and insights in event lighting and decoration",
    "button.readMore": "Read More..",
    "button.allBlogs": "More Blogs",

    //home testimonials
    "testimonials.heading.part1": "What Our",
    "testimonials.heading.part2": "Clients Say",
    "testimonials.subheading": "Don't just take our word for it. Here's what our satisfied clients have to say about their magical experiences with Hallever.",
    "testimonials.trust.rating": "4.9/5 Average Rating",
    "testimonials.trust.customers": "500+ Happy Customers",
    "testimonials.trust.guarantee": "100% Satisfaction Guarantee",

    //home contact
    "contact.heading": "Are you? Ready to",
    "contact.highlight": "Light Up your event ",
    "contact.subheading": "Get in touch with our team for a free consultation and let's create something magical together.",
    "contact.getInTouch": "Get In Touch",
    "contact.methods.phone.title": "Call Us",
    "contact.methods.phone.description": "Speak directly with our experts",
    "contact.methods.phone.value": "+91 1421358486",
    "contact.methods.phone.action": "Call Now",
    "contact.methods.whatsapp.title": "WhatsApp",
    "contact.methods.whatsapp.description": "Quick quotes and instant support",
    "contact.methods.whatsapp.value": "+91 98765 43210",
    "contact.methods.whatsapp.action": "Message Now",
    "contact.methods.email.title": "Email",
    "contact.methods.email.description": "Detailed consultation requests",
    "contact.methods.email.value": "vibbrantpower@gmail.com",
    "contact.methods.email.action": "Send Email",
    "contact.form.heading": "Request a Free Consultation",
    "contact.form.note": "Fill out the form below and we'll get back to you shortly.",
    "contact.form.name": "Name *",
    "contact.form.email": "Email *",
    "contact.form.phone": "Phone Number *",
    "contact.form.message": "Message *",
    "contact.form.placeholder": "Tell us about your event...",
    "button.send": "Send Request",
    // Careers
    "careers.title": "Careers",
    "careers.description": "Join our team and build your future with us.",

    // Blogs
    "blogs.title": "Blogs",
    "blogs.description": "Read our latest articles and updates.",



    // Contact
    "contact.title": "Contact Us",
    "contact.description": "Get in touch with us for any queries.",
    "contact.name": "Name",
    "contact.email": "Email",
    "contact.message": "Message",
    "contact.submit": "Submit",
};

const hiTranslations: Record<string, string> = {
    // Header
    "header.home": "होम",
    "header.products": "उत्पाद",
    "header.careers": "करियर",
    "header.services": "सेवाएं",
    "header.blogs": "ब्लॉग्स",
    "header.about": "हमारे बारे में",
    "header.contact": "संपर्क करें",
    "header.language": "भाषा",
    "auth.login": "लॉग इन करें",
    "auth.register": "पंजीकरण करें",
    "search.placeholder": "खोजें...",

    // Home Hero Section
    "home.hero.h1": "आपके जीवन को रौशन करें",
    "home.hero.subheading": "भारतीय घरों के लिए इनडोर और आउटडोर लाइटिंग सॉल्यूशंस",
    "button.shopNow": "अभी खरीदें",
    "button.knowMore": "और जानें...",
    "home.intro": "हम सर्वोत्तम उत्पाद और सेवाएँ प्रदान करते हैं।",
    "home.learnMore": "और जानें",


    //Home About Section
    "about.title": "शानदार समारोह की रचना",
    "about.since": "से",
    "about.para1": "राजस्थान के दिल से शुरू हुआ हैलेवर, सजावट और खूबसूरती के शौक से बना। हमने स्थानीय शादियों से शुरुआत की और अब पूरे भारत में अपनी सेवाएं दे रहे हैं। हम रौशनी के ज़रिए सुंदरता और भावनाओं को खास तरीके से पेश करते हैं। हम प्रकाश के माध्यम से उत्कृष्टता, भव्यता और भावनाओं को निरंतर पहुँचाते आ रहे हैं।",
    "about.para2": "हमारी यात्रा एक सरल विश्वास से शुरू हुई: हर उत्सव जादुई, यादगार और भव्य होना चाहिए। जयपुर में एक छोटे पारिवारिक व्यवसाय के रूप में शुरू होकर, आज हम भारत में इवेंट लाइटिंग और सजावट के सबसे विश्वसनीय नामों में सम्मिलित हैं। हमें पूरे देश में प्रेम प्रसंगों, विशेष अवसरों एवं कॉर्पोरेट आयोजनों को प्रकाशमय करने का गौरव प्राप्त हुआ है।",
    "about.stats.events": "सजाए गए कार्यक्रम",
    "about.stats.designs": "कस्टम लाइटिंग डिज़ाइंस",
    "about.stats.cities": "सेवित शहर",
    "about.stats.years": "सफलता के वर्ष",
    "about.mission.title": "हमारा मिशन",
    "about.mission.description": "हमारा उद्देश्य है – साधारण स्थानों को रोशनी के जादू से असाधारण अनुभवों में बदलना। हमारा विश्वास है कि हर उत्सव एक कहानी है जो सुनाई जानी चाहिए, और हमारी रोशनी वे शब्द हैं जो उन कहानियों को जीवन देती हैं।",
    "about.mission.highlight": "शादी की सजावट में परंपरा और तकनीक का अद्भुत संगम",
    "about.vision.title": "हमारा दृष्टिकोण",
    "about.vision.description": "रचनात्मकता, तकनीक और ग्राहक संतुष्टि के समन्वय से सजावटी लाइटिंग में भारत का सबसे विश्वसनीय नाम बनना हमारा लक्ष्य है। हमारा सपना है एक ऐसा संसार, जहाँ हर आयोजन भावनाओं और अर्थ से जगमगा उठे।",
    "about.vision.highlight": "हर पल को रोशन करने वाली नई सोच",

    //Home product Section    
    "products.title": "उत्पाद श्रेणियाँ",

    //home product
    "products.categories.indoor.name": "इनडोर",
    "products.categories.indoor.summary": "आकर्षक इनडोर लाइटिंग और सजावट",
    "products.categories.outdoor.name": "आउटडोर",
    "products.categories.outdoor.summary": "बाहरी स्थानों के लिए वेदरप्रूफ लाइटिंग",
    "products.categories.raw.name": "कच्चा माल",
    "products.categories.raw.summary": "उच्च गुणवत्ता वाले घटक और सामग्री",
    "products.categories.tent.name": "टेंट डेकोरेशन",
    "products.categories.tent.summary": "इवेंट्स के लिए सजावटी लाइटिंग और एक्सेसरीज़",
    "products.categories.machinery.name": "मशीनरी",
    "products.categories.machinery.summary": "उत्पादन और निर्माण उपकरण",
    "products.categories.solar.name": "सोलर लाइट्स",
    "products.categories.solar.summary": "सस्टेनेबल सोलर ऊर्जा आधारित लाइटिंग",
    "products.featured": "हमारे उत्पाद",
    // Home Products Ctegories
    "productCategories.indoor.name": "इनडोर",
    "productCategories.indoor.summary": "आकर्षक इनडोर लाइटिंग और सजावट",
    "productCategories.outdoor.name": "आउटडोर",
    "productCategories.outdoor.summary": "बाहरी स्थानों के लिए वेदरप्रूफ लाइटिंग",
    "productCategories.raw.name": "कच्चा माल",
    "productCategories.raw.summary": "उच्च गुणवत्ता वाले घटक और सामग्री",
    "productCategories.tent.name": "टेंट डेकोरेशन",
    "productCategories.tent.summary": "इवेंट्स के लिए सजावटी लाइटिंग और एक्सेसरीज़",
    "productCategories.machinery.name": "मशीनरी",
    "productCategories.machinery.summary": "उत्पादन और निर्माण उपकरण",

    "products.description": "हमारे उत्पादों की विस्तृत श्रृंखला देखें।",

    //home blogs section
    "blogs.heading1": "नवीनतम",
    "blogs.heading2": "जानकारियाँ",
    "blogs.subheading": "ईवेंट लाइटिंग और सजावट के नवीनतम रुझानों और जानकारियों से अपडेट रहें |",
    "button.readMore": "और पढ़ें",
    "button.allBlogs": "सभी ब्लॉग",

    //home testimonial section
    "testimonials.heading.part1": "हमारे",
    "testimonials.heading.part2": "ग्राहकों की राय",
    "testimonials.subheading": "सिर्फ़ हमारी बातों पर विश्वास न करें। हमारे संतुष्ट ग्राहकों का अनुभव जानिए जिन्होंने Hallever के साथ अपने खास पलों को और खास बनाया।",
    "testimonials.trust.rating": "4.9/5 औसत रेटिंग",
    "testimonials.trust.customers": "500+ खुश ग्राहक",
    "testimonials.trust.guarantee": "100% संतुष्टि की गारंटी",

    //home contact
    "contact.heading": "क्या आप तैयार हैं?",
    "contact.highlight": "अपने इवेंट को रोशन करने के लिए|",
    "contact.subheading": "हमारी टीम से मुफ्त परामर्श के लिए संपर्क करें और चलिए मिलकर कुछ जादुई बनाते हैं।",
    "contact.getInTouch": "संपर्क करें |",
    "contact.methods.phone.title": "कॉल करें",
    "contact.methods.phone.description": "हमारे विशेषज्ञों से सीधे बात करें |",
    "contact.methods.phone.value": "+91 1421358486",
    "contact.methods.phone.action": "अभी कॉल करें",
    "contact.methods.whatsapp.title": "व्हाट्सएप",
    "contact.methods.whatsapp.description": "त्वरित कोट और तत्काल सहायता |",
    "contact.methods.whatsapp.value": "+91 98765 43210",
    "contact.methods.whatsapp.action": "संदेश भेजें",
    "contact.methods.email.title": "ईमेल",
    "contact.methods.email.description": "विस्तृत परामर्श अनुरोध भेजें |",
    "contact.methods.email.value": "vibbrantpower@gmail.com",
    "contact.methods.email.action": "ईमेल भेजें",
    "contact.form.heading":"मुफ्त परामर्श के लिए अनुरोध करें",
    "contact.form.note":"नीचे फॉर्म भरें और हम जल्द ही आपसे संपर्क करेंगे।",
    "contact.form.name":"नाम *",
    "contact.form.email":"ईमेल पता *",
    "contact.form.phone":"फोन नंबर *",
    "contact.form.message":"संदेश *",
    "contact.form.placeholder": "अपने इवेंट के बारे में बताएं...",
    "button.send":"अनुरोध भेजें",
    // Careers
    "careers.title": "करियर",
    "careers.description": "हमारी टीम में शामिल हों और हमारे साथ अपना भविष्य बनाएं।",

    // Blogs
    "blogs.title": "ब्लॉग्स",
    "blogs.description": "हमारे नवीनतम लेख और अपडेट पढ़ें।",



    // Contact
    "contact.title": "संपर्क करें",
    "contact.description": "किसी भी प्रश्न के लिए हमसे संपर्क करें।",
    "contact.name": "नाम",
    "contact.email": "ईमेल",
    "contact.message": "संदेश",
    "contact.submit": "जमा करें",
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguageState] = useState<Language>("en");

    useEffect(() => {
        const savedLanguage = localStorage.getItem("language") as Language;
        if (savedLanguage) {
            setLanguageState(savedLanguage);
        }
    }, []);

    const setLanguage = (newLanguage: Language) => {
        setLanguageState(newLanguage);
        localStorage.setItem("language", newLanguage);
    };

    const t = (key: string): string => {
        const translations = language === "en" ? enTranslations : hiTranslations;
        return translations[key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
};
