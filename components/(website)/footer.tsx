'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';


const Footer = () => {
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { name: 'Home', href: '/' },
        { name: 'Services', href: '/services' },
        { name: 'About Us', href: '/about' },
        { name: 'Careers', href: '/careers' },
        { name: 'Contact', href: '/contact' },
    ];

    const services = [
        'Wedding Tents',
        'Banquet Hall Furniture',
        'Wedding Sofa',
        'Catering Products',
        'Wedding Curtains',
        'Event Fabrics',
    ];

    const socialLinks = [
        { icon: Facebook, href: '#', name: 'Facebook' },
        { icon: Twitter, href: '#', name: 'Twitter' },
        { icon: Instagram, href: '#', name: 'Instagram' },
        { icon: Linkedin, href: 'https://www.linkedin.com/in/hallever-india-4a23b2373', name: 'LinkedIn' },
        { icon: Youtube, href: 'https://www.youtube.com/@rajasthanled_official_rj32', name: 'Youtube' },
    ];

    return (
        <footer className="bg-[#f2f2f2] border-t border-border text-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Main Footer Content */}
                <div className="py-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-gray-200">

                        {/* Company Info */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="space-y-4"
                        >
                            <h2 className="text-2xl font-bold text-red-500">Hallever</h2>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                Transforming events, lighting up moments. Premium event management
                                solutions with 3+ years of excellence in Rajasthan.
                            </p>
                            <div className="space-y-2 text-sm">
                                <div className="flex items-center space-x-2 text-gray-600">
                                    <MapPin className="h-4 w-4 text-red-500" />
                                    <span>Rajasthan, India</span>
                                </div>
                                <div className="flex items-center space-x-2 text-gray-600">
                                    <Phone className="h-4 w-4 text-red-500" />
                                    <span>+91 9876543210</span>
                                </div>
                                <div className="flex items-center space-x-2 text-gray-600">
                                    <Mail className="h-4 w-4 text-red-500" />
                                    <span>info@hallever.com</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Quick Links */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="space-y-4"
                        >
                            <h3 className="text-lg font-semibold">Quick Links</h3>
                            <ul className="space-y-2">
                                {quickLinks.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className="text-gray-600 hover:text-red-500 transition-all text-sm"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Services */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="space-y-4"
                        >
                            <h3 className="text-lg font-semibold">Our Services</h3>
                            <ul className="space-y-2">
                                {services.map((service) => (
                                    <li key={service} className="text-sm text-gray-600">
                                        {service}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Newsletter */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="space-y-4"
                        >
                            <div className="pt-4">
                                <p className="text-sm font-medium mb-3">Follow Us</p>
                                <div className="flex space-x-3">
                                    {socialLinks.map((social) => (
                                        <motion.a
                                            key={social.name}
                                            href={social.href}
                                            whileHover={{ scale: 1.1 }}
                                            className="p-2 bg-white rounded-md hover:bg-red-500 hover:text-white transition-all"
                                            aria-label={social.name}
                                        >
                                            <social.icon className="h-4 w-4" />
                                        </motion.a>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Google Map */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="py-8 border-t border-border"
                >
                    <div className="rounded-lg overflow-hidden shadow-md">

                       

                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3532.3553427094566!2d76.21771987546735!3d27.706312876183084!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjfCsDQyJzIyLjciTiA3NsKwMTMnMTMuMSJF!5e0!3m2!1sen!2sin!4v1753356035489!5m2!1sen!2sin"
                            width="100%"
                            height="300"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Hallever Location"
                        />

                    </div>
                </motion.div>

                {/* Bottom */}
                <div className="py-6 border-t border-border text-center">
                    <p className="text-sm text-gray-600">
                        © {currentYear} Hallever. All rights reserved. | Designed with ❤️ for premium events
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
