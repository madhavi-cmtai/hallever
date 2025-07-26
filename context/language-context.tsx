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
    "products.titleFirst": "Our",
    "products.titleSecond": "Products",

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
    "contact.methods.email.value": "customercare@halleverindia.com",
    "contact.methods.email.action": "Send Email",
    "contact.form.heading": "Request a Free Consultation",
    "contact.form.note": "Fill out the form below and we'll get back to you shortly.",
    "contact.form.name": "Name *",
    "contact.form.email": "Email *",
    "contact.form.phone": "Phone Number *",
    "contact.form.message": "Message *",
    "contact.form.placeholder": "Tell us about your event...",
    "button.send": "Send Request",
    "contact.form.successMessage": "Thank you! Your message has been sent successfully. We will contact you shortly.",


    // Contact
    "contact.title": "Contact Us",
    "contact.description": "Get in touch with us for any queries.",
    "contact.name": "Name",
    "contact.email": "Email",
    "contact.message": "Message",
    "contact.submit": "Submit",

    //About Section of the website hero
    "about.hero.heading.part1": "Transforming Events,",
    "about.hero.heading.part2": "Lighting Up Moments",
    "about.hero.subheading": "Premium lighting solutions and event equipment across India",
    "button.exploreProducts": "Explore Products",
    "button.getQuote": "Get Quote",

    "why.heading.part1": "Why Hallever is the",
    "why.heading.part2": "Light of Your Event",
    "why.subheading": "We don't just provide lighting – we create magical experiences that transform your special moments into unforgettable memories.",
    "why.features.custom.title": "Custom Concepts",
    "why.features.custom.description": "From traditional Rajasthani heritage styles to modern luxury setups — your vision, brought to life.",
    "why.features.lights.title": "Premium Lights & Decor",
    "why.features.lights.description": "We only use tested, durable, and energy-efficient lighting solutions.",
    "why.features.team.title": "Experienced Setup Crew",
    "why.features.team.description": "Our team brings years of on-ground experience for seamless execution.",
    "why.features.delivery.title": "Timely Delivery & Setup",
    "why.features.delivery.description": "We value your time. Count on us for punctual, professional service.",
    "why.features.consultation.title": "Personalized Consultation",
    "why.features.consultation.description": "Tell us your theme, we'll make it magical.",
    "why.bottomCta": "Lighting up love, one event at a time.",

    //Tent section of About
    "tent.heading.part1": "Transform Your Venue into a",
    "tent.heading.part2": "Dreamland",
    "tent.description": "From royal Rajwadi tents to modern LED-lit lounges, our tent setups match your celebration style. We combine lighting, drapery, and florals to create picture-perfect spaces that dazzle your guests and cameras alike.",
    "tent.features.royal.title": "Royal Rajwadi Experience",
    "tent.features.royal.description": "Authentic Rajasthani royal tent setups with intricate details and majestic presence.",
    "tent.features.led.title": "LED Integration",
    "tent.features.led.description": "Seamless blend of traditional fabrics with modern LED lighting technology.",
    "tent.features.custom.title": "Custom Themes",
    "tent.features.custom.description": "Every setup is tailored to your vision, ensuring a unique and personal touch.",
    "tent.button.explore": "Explore Tent Themes",
    "tent.image.title": "Royal Wedding Setup",
    "tent.image.subtitle": "Complete venue transformation",
    "tent.themes.royal.name": "Royal Red Theme",
    "tent.themes.royal.description": "Traditional Rajasthani elegance with rich red draping and golden accents",
    "tent.themes.royal.features.0": "Majestic red fabrics",
    "tent.themes.royal.features.1": "Golden lighting accents",
    "tent.themes.royal.features.2": "Traditional motifs",
    "tent.themes.boho.name": "Boho Sunset",
    "tent.themes.boho.description": "Modern bohemian style with warm sunset colors and flowing fabrics",
    "tent.themes.boho.features.0": "Warm color palette",
    "tent.themes.boho.features.1": "Flowing drapes",
    "tent.themes.boho.features.2": "Ambient lighting",
    "tent.themes.garden.name": "Garden Romance",
    "tent.themes.garden.description": "Romantic outdoor setup with fairy lights and floral arrangements",
    "tent.themes.garden.features.0": "Fresh florals",
    "tent.themes.garden.features.1": "Fairy light canopies",
    "tent.themes.garden.features.2": "Natural elements",


    //Product website 
    "product.hero.heading.part1": "Illuminate Your",
    "product.hero.heading.part2": "Events with Style",
    "product.hero.subheading": "Premium lighting solutions and event equipment across India",
    "product.hero.buttons.explore": "Explore Products",
    "product.hero.buttons.quote": "Get Quote",

    //blogs section of the website
    "blog.hero.heading.part1": "Where Vision",
    "blog.hero.heading.part2": "Meets Vibe",
    "blog.hero.subheading": "Discover creative blogs that transform events into unforgettable moments.",
    "blog.hero.buttons.explore": "Explore Blogs",

    //career page of the website 
    "career.hero.heading.part1": "Build a Bright",
    "career.hero.heading.part2": "Future with Us",
    "career.hero.subheading": "Join a passionate team that's lighting up events across India with innovation and creativity",
    "career.hero.buttons.jobs": "Explore Jobs",
    "career.hero.buttons.contact": "Contact Us",

    //latest job
    "latest": "Latest",
    "jobs": "Jobs",
    "jobs.sectionSubtitle": "Explore exciting opportunities across departments and roles.",
    "jobs.loading": "Loading jobs...",
    "jobs.applyNow": "Apply Now",
    "jobs.department": "Department",
    "jobs.location": "Location",
    "jobs.type": "Job Type",
    "jobs.salary": "Salary Range",
    "jobs.education": "Education Required",
    "jobs.skills": "Skills Required",

    //footer section
    "footer.heading": "Hallever",
    "footer.description": "Transforming events, lighting up moments. Premium event management solutions with 3+ years of excellence in Rajasthan.",
    "footer.address": "Rajasthan, India",
    "footer.phone": "+91 9468909306",
    "footer.email": "info@hallever.com",
    "footer.quickLinks": "Quick Links",
    "footer.ourServices": "Our Services",
    "footer.followUs": "Follow Us",
    "footer.rights": "All rights reserved. | Designed with ❤️ for premium events",
    "footer.links.home": "Home",
    "footer.links.services": "Services",
    "footer.links.about": "About Us",
    "footer.links.careers": "Careers",
    "footer.links.contact": "Contact",
    "footer.services.tents": "Wedding Tents",
    "footer.services.catering": "Catering Products",
    "footer.services.curtains": "Wedding Curtains",
    "footer.services.fabrics": "Event Fabrics",
    "footer.services.light": "Stage & Wedding Lighting",
    "footer.officeAddress.head": "Head Office",
    "footer.officeAddress.headValue": "Near Petrol Pump, Bansur Road, Kotputli, Rajasthan 303108",
    "footer.officeAddress.agency1": "Agency (Sikar)",
    "footer.officeAddress.agency1Value": "New Janta Tent Light Agency, Sikar, Rajasthan - 9929159069",
    "footer.officeAddress.agency2": "Agency (Mahendragarh)",
    "footer.officeAddress.agency2Value": "Bhagwati Tent Light Agency, Mahendragarh, Haryana - 9813183694",


    //floating button
    "chat.greeting": "Hi there! 👋 Need help with lighting solutions?",
    "chat.header": "Chat with us",
    "chat.placeholder.name": "Your Name",
    "chat.placeholder.email": "Your Email",
    "chat.placeholder.phone": "Your Phone",
    "chat.placeholder.message": "Your Message",
    "chat.button.send": "Send Message",
    "chat.success.title": "Message Sent!",
    "chat.success.description": "Your message has been sent successfully. Our team will contact you soon.",
    "chat.messages.0": "Hi 👋",
    "chat.messages.1": "How can I help you?",
    "chat.messages.2": "Feel free to reach out!"

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


    //products 
    "products.titleFirst": "हमारे",
    "products.titleSecond": "उत्पाद",



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
    "contact.methods.email.value": "customercare@halleverindia.com",
    "contact.methods.email.action": "ईमेल भेजें",
    "contact.form.heading": "मुफ्त परामर्श के लिए अनुरोध करें",
    "contact.form.note": "नीचे फॉर्म भरें और हम जल्द ही आपसे संपर्क करेंगे।",
    "contact.form.name": "नाम *",
    "contact.form.email": "ईमेल पता *",
    "contact.form.phone": "फोन नंबर *",
    "contact.form.message": "संदेश *",
    "contact.form.placeholder": "अपने इवेंट के बारे में बताएं...",
    "button.send": "अनुरोध भेजें",
    "contact.form.successMessage": "धन्यवाद! आपका संदेश सफलतापूर्वक भेज दिया गया है। हम आपसे शीघ्र ही संपर्क करेंगे।",



    //About Section of the website hero
    "about.hero.heading.part1": "इवेंट्स को नया रूप दें,",
    "about.hero.heading.part2": "पलों को रोशन करें",
    "about.hero.subheading": "भारत भर में प्रीमियम लाइटिंग सॉल्यूशन्स और इवेंट उपकरण |",
    "button.exploreProducts": "उत्पाद देखें",
    "button.getQuote": "कोट प्राप्त करें",

    //About why choose section
    "why.heading.part1": "अपने इवेंट को रोशन करने के लिए,",
    "why.heading.part2": "Hallever को क्यों चुनें?",
    "why.subheading": "हम सिर्फ लाइट्स नहीं देते हम ऐसे जादुई अनुभव बनाते हैं जो आपके खास पलों को यादगार बना दें।",
    "why.features.custom.title": "कस्टम कॉन्सेप्ट्स",
    "why.features.custom.description": "राजस्थानी पारंपरिक शैलियों से लेकर आधुनिक लग्ज़री सेटअप तक — आपका सपना, हमारी रचना।",
    "why.features.lights.title": "प्रीमियम लाइट्स और डेकोर",
    "why.features.lights.description": "हम केवल परीक्षण किए गए, टिकाऊ और ऊर्जा-कुशल लाइट्स का उपयोग करते हैं।",
    "why.features.team.title": "अनुभवी सेटअप टीम",
    "why.features.team.description": "हमारी टीम के पास वर्षों का ग्राउंड अनुभव है, जो इवेंट को सहज बनाता है।",
    "why.features.delivery.title": "समय पर डिलीवरी और सेटअप",
    "why.features.delivery.description": "हम आपके समय का सम्मान करते हैं। भरोसा रखें, सेवा समय पर और प्रोफेशनल होगी।",
    "why.features.consultation.title": "व्यक्तिगत परामर्श",
    "why.features.consultation.description": "हमें थीम बताएं, और हम उसे जादू में बदल देंगे।",
    "why.bottomCta": "हर इवेंट में, प्यार को रौशन करना हमारा मकसद है।",

    // About tent Section
    "tent.heading.part1": "अपने स्थल को बदलें",
    "tent.heading.part2": "एक सपनों की दुनिया में",
    "tent.description": "रॉयल राजवाड़ी टेंट से लेकर आधुनिक एलईडी-लाइट लाउंज तक, हमारे टेंट सेटअप्स आपके उत्सव की शैली से मेल खाते हैं। हम लाइटिंग, ड्रेपर्री और फूलों को मिलाकर ऐसे सजावटी स्थान बनाते हैं जो आपके मेहमानों और कैमरों को चकाचौंध कर दें।",
    "tent.features.royal.title": "रॉयल राजवाड़ी अनुभव",
    "tent.features.royal.description": "जटिल डिज़ाइनों और शाही भव्यता वाले प्रामाणिक राजस्थानी राजवाड़ी टेंट सेटअप्स।",
    "tent.features.led.title": "एलईडी इंटीग्रेशन",
    "tent.features.led.description": "पारंपरिक कपड़ों और आधुनिक एलईडी लाइट तकनीक का सुंदर मेल।",
    "tent.features.custom.title": "कस्टम थीम्स",
    "tent.features.custom.description": "हर सेटअप को आपकी कल्पना के अनुसार तैयार किया जाता है, जिससे वह अनोखा और व्यक्तिगत बनता है।",
    "tent.button.explore": "टेंट थीम्स देखें",
    "tent.image.title": "रॉयल वेडिंग सेटअप",
    "tent.image.subtitle": "पूरी जगह का रूपांतरण",
    "tent.themes.royal.name": "रॉयल रेड थीम",
    "tent.themes.royal.description": "समृद्ध लाल पर्दों और सुनहरे एंबेलिशमेंट्स के साथ पारंपरिक राजस्थानी भव्यता।",
    "tent.themes.royal.features.0": "शाही लाल फैब्रिक",
    "tent.themes.royal.features.1": "गोल्डन लाइटिंग एक्सेंट्स",
    "tent.themes.royal.features.2": "पारंपरिक डिज़ाइन्स",
    "tent.themes.boho.name": "बोहो सनसेट",
    "tent.themes.boho.description": "गर्म रंगों और बहती हुई ड्रेपर्री के साथ आधुनिक बोहेमियन स्टाइल।",
    "tent.themes.boho.features.0": "वॉर्म कलर पैलेट",
    "tent.themes.boho.features.1": "फ्लोइंग ड्रेप्स",
    "tent.themes.boho.features.2": "एंबिएंट लाइटिंग",
    "tent.themes.garden.name": "गार्डन रोमांस",
    "tent.themes.garden.description": "परी-सी लाइट्स और फूलों की सजावट के साथ रोमांटिक आउटडोर सेटअप।",
    "tent.themes.garden.features.0": "ताज़े फूल",
    "tent.themes.garden.features.1": "फेयरी लाइट कैनोपीज़",
    "tent.themes.garden.features.2": "प्राकृतिक तत्व",

    //product section of the website
    "product.hero.heading.part1": "अपने इवेंट्स को",
    "product.hero.heading.part2": "स्टाइल के साथ रौशन करें",
    "product.hero.subheading": "पूरे भारत में प्रीमियम लाइटिंग सॉल्यूशंस और इवेंट इक्विपमेंट्स",
    "product.hero.buttons.explore": "उत्पाद देखें",
    "product.hero.buttons.quote": "कोट प्राप्त करें",


    // Contact
    "contact.title": "संपर्क करें",
    "contact.description": "किसी भी प्रश्न के लिए हमसे संपर्क करें।",
    "contact.name": "नाम",
    "contact.email": "ईमेल",
    "contact.message": "संदेश",
    "contact.submit": "जमा करें",

    //blogs section of the website
    "blog.hero.heading.part1": "जहां सोच वहाँ",
    "blog.hero.heading.part2": "बनाए माहौल",
    "blog.hero.subheading": "ऐसे क्रिएटिव ब्लॉग्स खोजें जो आपके इवेंट्स को अविस्मरणीय बना दें।",
    "blog.hero.buttons.explore": "ब्लॉग्स देखें",

    // career page of the website
    "career.hero.heading.part1": "बनाएं एक उज्जवल",
    "career.hero.heading.part2": "भविष्य हमारे साथ",
    "career.hero.subheading": "भारत भर में आयोजनों को रौशन करने वाली हमारी नवाचारी और रचनात्मक टीम से जुड़ें",
    "career.hero.buttons.jobs": "नौकरियाँ देखें",
    "career.hero.buttons.contact": "संपर्क करें",

    //latest jobs
    "latest": "नवीनतम",
    "jobs": "नौकरियां",
    "jobs.sectionSubtitle": "विभागों और भूमिकाओं में रोमांचक अवसरों का अन्वेषण करें।",
    "jobs.loading": "नौकरियां लोड हो रही हैं...",
    "jobs.applyNow": "अभी आवेदन करें",
    "jobs.department": "विभाग",
    "jobs.location": "स्थान",
    "jobs.type": "नौकरी का प्रकार",
    "jobs.salary": "वेतन सीमा",
    "jobs.education": "आवश्यक शिक्षा",
    "jobs.skills": "आवश्यक कौशल",

    //footer section
    "footer.heading": "हॅलेवर",
    "footer.description": "घटनाओं को बदलना, पलों को रोशन करना। राजस्थान में 3+ वर्षों की उत्कृष्टता के साथ प्रीमियम इवेंट मैनेजमेंट समाधान।",
    "footer.address": "राजस्थान, भारत",
    "footer.phone": "+91 9468909306",
    "footer.email": "info@hallever.com",
    "footer.quickLinks": "त्वरित लिंक",
    "footer.ourServices": "हमारी सेवाएं",
    "footer.followUs": "हमें फॉलो करें",
    "footer.rights": "सभी अधिकार सुरक्षित। | प्रीमियम इवेंट्स के लिए ❤️ के साथ डिज़ाइन किया गया",
    "footer.links.home": "मुखपृष्ठ",
    "footer.links.services": "सेवाएं",
    "footer.links.about": "हमारे बारे में",
    "footer.links.careers": "करियर",
    "footer.links.contact": "संपर्क करें",
    "footer.services.tents": "शादी के टेंट",
    "footer.services.furniture": "बैंक्वेट हॉल फर्नीचर",
    "footer.services.sofa": "शादी का सोफा",
    "footer.services.catering": "कैटरिंग उत्पाद",
    "footer.services.curtains": "शादी के परदे",
    "footer.services.fabrics": "इवेंट फैब्रिक्स",
    "footer.services.light": "स्टेज और शादी की लाइटिंग",
    "footer.officeAddress.head": "मुख्य कार्यालय",
    "footer.officeAddress.headValue": "पेट्रोल पंप के पास, बांसुर रोड, कोटपूतली, राजस्थान 303108",
    "footer.officeAddress.agency1": "एजेंसी (सीकर)",
    "footer.officeAddress.agency1Value": "न्यू जनता टेंट लाइट एजेंसी, सीकर, राजस्थान - 9929159069",
    "footer.officeAddress.agency2": "एजेंसी (महेंद्रगढ़)",
    "footer.officeAddress.agency2Value": "भगवती टेंट लाइट एजेंसी, महेंद्रगढ़, हरियाणा - 9813183694",

    //floating button
    "chat.greeting": "नमस्ते! 👋 क्या आपको लाइटिंग सॉल्यूशंस में मदद चाहिए?",
    "chat.header": "हमसे बात करें",
    "chat.placeholder.name": "आपका नाम",
    "chat.placeholder.email": "आपका ईमेल",
    "chat.placeholder.phone": "आपका फ़ोन नंबर",
    "chat.placeholder.message": "आपका संदेश",
    "chat.button.send": "संदेश भेजें",
    "chat.success.title": "संदेश भेजा गया!",
    "chat.success.description": "आपका संदेश सफलतापूर्वक भेजा गया है। हमारी टीम जल्द ही आपसे संपर्क करेगी।",
    "chat.messages.0": "नमस्ते 👋",
    "chat.messages.1": "मैं आपकी कैसे मदद कर सकती हूँ?",
    "chat.messages.2": "निःसंकोच संपर्क करें!"


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
