"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/config/firebase";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/redux/store";
import { addForgotPassword, ForgotPassword } from "@/lib/redux/slice/forgotPasswordSlice";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);
    const [loading, setLoading] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [forgotPasswordData, setForgotPasswordData] = useState({
        name: "",
        email: "",
        phone: "",
        status: "pending"
    });
    const [forgotPasswordLoading, setForgotPasswordLoading] = useState(false);
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (loading) return;

        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                const user = JSON.parse(storedUser);
                if (user && user.role) {
                    if (user.role.toLowerCase() == "admin") {
                        router.push("/dashboard");
                    } else {
                        router.push("/users");
                    }
                }
            } catch (error) {
                console.error("Failed to parse user from localStorage", error);
                localStorage.removeItem("user");
            }
        }
    }, [router, loading]); // loading को dependency array में जोड़ें

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setAlert(null);
        setLoading(true);

        try {
            const preLoginCartString = localStorage.getItem("cart");
            const preLoginCart = preLoginCartString ? JSON.parse(preLoginCartString) : [];

            await signInWithEmailAndPassword(auth, email, password);

            const res = await fetch("/api/routes/auth", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const result = await res.json();
            if (!res.ok || result.errorCode !== "NO") {
                throw new Error(result.errorMessage || "Login failed.");
            }

            const profileRes = await fetch(`/api/routes/auth?email=${encodeURIComponent(email)}`);
            const profileData = await profileRes.json();

            if (!profileData || !profileData.data) {
                throw new Error("User profile not found.");
            }

            const user = profileData.data;

            let cartWasUpdated = false;
            if (preLoginCart.length > 0) {
                user.cart = user.cart || [];
                const userCartProductIds = new Set(user.cart.map((item: any) => item.id));

                preLoginCart.forEach((product: any) => {
                    if (!userCartProductIds.has(product.id)) {
                        user.cart.push(product);
                        cartWasUpdated = true;
                    }
                });

                if (cartWasUpdated) {
                    await fetch(`/api/routes/auth`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email: user.email, updatedData: { cart: user.cart } }),
                    });
                }
            }

            localStorage.setItem("user", JSON.stringify(user));

            if (preLoginCart.length > 0) {
                localStorage.removeItem("cart");
            }

            // --- सबसे महत्वपूर्ण बदलाव यहाँ है ---
            // setTimeout को हटा दें और तुरंत रीडायरेक्ट करें।
            if (user.role && user.role.toLowerCase() === "admin") {
                setAlert({ type: "success", message: "Logged in successfully! Redirecting..." });
                router.replace("/dashboard");
            } else {
                setAlert({ type: "success", message: "Logged in successfully! Redirecting..." });
                router.replace("/users");
            }

        } catch (error: any) {
            console.error(error);
            setAlert({ type: "error", message: error.message || "Login failed. Please try again." });
            setLoading(false); // विफलता पर लोडिंग को false पर सेट करें
        }
        // सफलता पर setLoading को हटाने की आवश्यकता नहीं है क्योंकि पेज वैसे भी रीडायरेक्ट हो जाएगा।
    };

    const handleForgotPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setAlert(null);
        setForgotPasswordLoading(true);

        try {
            if (!forgotPasswordData.name || !forgotPasswordData.email || !forgotPasswordData.phone) {
                throw new Error("Please fill in all fields: Name, Email, and Phone");
            }
            dispatch(addForgotPassword(forgotPasswordData as ForgotPassword));
            await new Promise(resolve => setTimeout(resolve, 1000));
            setAlert({
                type: "success",
                message: "Password reset request submitted successfully! We'll contact you soon."
            });
            setForgotPasswordData({ name: "", email: "", phone: "", status: "pending" });
            setShowForgotPassword(false);
        } catch (error: any) {
            console.error(error);
            setAlert({ type: "error", message: error.message || "Failed to submit password reset request. Please try again." });
        }

        setForgotPasswordLoading(false);
        setTimeout(() => setAlert(null), 5000);
    };

    const resetForgotPasswordForm = () => {
        setForgotPasswordData({ name: "", email: "", phone: "", status: "pending" });
        setShowForgotPassword(false);
        setAlert(null);
    };

    if (showForgotPassword) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[rgba(0,0,0,0.4)] backdrop-blur-sm">
                <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md space-y-6">
                    <h2 className="text-2xl font-bold text-center text-[var(--primary-red)]">Forgot Password</h2>
                    <p className="text-center text-gray-500">Enter your details to request a password reset</p>
                    {alert && (
                        <div
                            className={`text-sm px-4 py-3 rounded-md ${alert.type === "success"
                                ? "bg-green-100 text-green-700 border border-green-300"
                                : "bg-red-100 text-red-700 border border-red-300"
                                }`}
                        >
                            {alert.message}
                        </div>
                    )}
                    <form onSubmit={handleForgotPassword} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                placeholder="Enter your name"
                                className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-[var(--primary-red)]"
                                value={forgotPasswordData.name}
                                onChange={(e) => setForgotPasswordData({ ...forgotPasswordData, name: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-[var(--primary-red)]"
                                value={forgotPasswordData.email}
                                onChange={(e) => setForgotPasswordData({ ...forgotPasswordData, email: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Phone</label>
                            <input
                                type="tel"
                                placeholder="Enter your phone number"
                                className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-[var(--primary-red)]"
                                value={forgotPasswordData.phone}
                                onChange={(e) => setForgotPasswordData({ ...forgotPasswordData, phone: e.target.value })}
                            />
                        </div>
                        <div className="flex gap-3 pt-2">
                            <button
                                type="submit"
                                disabled={forgotPasswordLoading}
                                className="flex-1 bg-[var(--primary-red)] text-white py-2 rounded-md hover:opacity-90 transition"
                            >
                                {forgotPasswordLoading ? "Submitting..." : "Submit Request"}
                            </button>
                            <button
                                type="button"
                                onClick={resetForgotPasswordForm}
                                className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-50 transition"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                    <div className="text-center">
                        <button
                            type="button"
                            onClick={() => setShowForgotPassword(false)}
                            className="text-sm text-[var(--primary-red)] hover:underline"
                        >
                            ← Back to Login
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[rgba(0,0,0,0.4)] backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md space-y-6">
                <h2 className="text-2xl font-bold text-center text-[var(--primary-red)]">Login</h2>
                <p className="text-center text-gray-500">Enter your credentials to access your account</p>
                {alert && (
                    <div
                        className={`text-sm px-4 py-3 rounded-md ${alert.type === "success"
                            ? "bg-green-100 text-green-700 border border-green-300"
                            : "bg-red-100 text-red-700 border border-red-300"
                            }`}
                    >
                        {alert.message}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-[var(--primary-red)]"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-[var(--primary-red)]"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="text-right">
                        <button
                            type="button"
                            onClick={() => setShowForgotPassword(true)}
                            className="text-sm text-[var(--primary-red)] hover:underline"
                        >
                            Forgot Password?
                        </button>
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[var(--primary-red)] text-white py-2 rounded-md hover:opacity-90 transition"
                    >
                        {loading ? "Signing in..." : "Sign In"}
                    </button>
                </form>
                <div className="flex items-center gap-4">
                    <div className="flex-grow h-px bg-gray-300" />
                    <span className="text-gray-400 text-sm">OR</span>
                    <div className="flex-grow h-px bg-gray-300" />
                </div>
                <button
                    type="button"
                    onClick={() => router.push("/signup")}
                    className="w-full border text-sm text-gray-700 py-2 rounded-md bg-white hover:bg-gray-100 transition"
                >
                    Don't have an account? <span className="font-semibold">Sign up</span>
                </button>
            </div>
        </div>
    );
};

export default LoginForm;