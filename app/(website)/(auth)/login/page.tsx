/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/config/firebase"; 


const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setAlert(null);
        setLoading(true);

        try {
            // 1. Firebase login
            await signInWithEmailAndPassword(auth, email, password);

            // 2. Call backend for login
            const res = await fetch("/api/routes/auth", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const result = await res.json();
            if (!res.ok || result.errorCode !== "NO") {
                throw new Error(result.errorMessage || "Login failed.");
            }

            // 3. Fetch user profile
            const profileRes = await fetch(`/api/routes/auth?email=${encodeURIComponent(email)}`);
            const profileData = await profileRes.json();

            if (!profileRes.ok || !profileData.data) {
                throw new Error("User profile not found.");
            }

            const user = profileData.data;

            // 4. Store user in localStorage & cookie
            localStorage.setItem("user", JSON.stringify(user));
            document.cookie = `user=${encodeURIComponent(JSON.stringify(user))}; path=/`;

            // 5. Redirect based on role
            if (user.role === "admin") {
                setAlert({ type: "success", message: "Logged in successfully! Redirecting to admin dashboard..." });
                setTimeout(() => router.replace("/dashboard"), 1000);
            } else {
                setAlert({ type: "success", message: "Logged in successfully! Redirecting to your profile..." });
                setTimeout(() => router.replace("/users"), 1000);
            }
        } catch (error) {
            console.error(error);
            setAlert({ type: "error", message: error.message || "Login failed. Please try again." });
        }

        setLoading(false);
        setTimeout(() => setAlert(null), 3000);
    };

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
