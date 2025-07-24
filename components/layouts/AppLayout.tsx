"use client";

import { usePathname } from "next/navigation";
import Header from "../(website)/header";
import Footer from "../(website)/footer";
import FloatingChat from "../(website)/floatingButton";
import React from "react";
import { LanguageProvider } from "@/context/language-context"; // ✅ Import the provider
import { Provider } from 'react-redux';
import { store } from "@/lib/redux/store";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const isDashboard = pathname.startsWith("/admin") || pathname.startsWith("/dashboard");
    const noHeaderFooterRoutes = ["/login", "/signup"];
    const shouldHideHeaderFooter = isDashboard || noHeaderFooterRoutes.includes(pathname);

    return (
        <Provider store={store}>
        <LanguageProvider> {/* ✅ Wrap everything in the provider */}
            {!shouldHideHeaderFooter && <Header />}
            <FloatingChat />
            <main className="flex-1">{children}</main>
            {!shouldHideHeaderFooter && <Footer />}
        </LanguageProvider>
        </Provider>
    );
}
