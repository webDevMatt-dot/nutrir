"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useAuth } from "../context/AuthContext";

export default function ProfileDrawer() {
    const { isProfileOpen, toggleProfile, customer, login, register, logout } = useAuth();
    const [mode, setMode] = useState<"login" | "register">("login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted) {
            document.body.style.overflow = isProfileOpen ? "hidden" : "unset";
        }
    }, [isProfileOpen, mounted]);

    if (!mounted || !isProfileOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const err = mode === "login"
            ? await login(email, password)
            : await register(email, password);

        setLoading(false);
        if (err) setError(err);
    };



    const DrawerContent = (
        <div className="fixed inset-0 z-[100] flex justify-end">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={toggleProfile}></div>

            {/* Drawer */}
            <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col p-8 animate-in slide-in-from-right duration-300">

                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-serif text-[#1A2621]">
                        {customer ? `Welcome, ${customer.firstName || 'Back'}` : (mode === "login" ? "Login" : "Join Nutrir")}
                    </h2>
                    <button onClick={toggleProfile} className="text-gray-400 hover:text-black">CLOSE</button>
                </div>

                {/* LOGGED IN STATE */}
                {customer ? (
                    <div className="flex-1 overflow-y-auto">
                        <div className="bg-[#F9F9F7] p-6 rounded-xl mb-8">
                            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Account</p>
                            <p className="text-lg font-medium text-[#1A2621]">{customer.email}</p>
                        </div>

                        <h3 className="text-lg font-serif text-[#1A2621] mb-4">Order History</h3>
                        {customer.orders?.edges?.length > 0 ? (
                            <div className="space-y-4">
                                {customer.orders.edges.map(({ node }: any) => (
                                    <div key={node.id} className="border border-gray-100 p-4 rounded-xl flex justify-between items-center">
                                        <div>
                                            <p className="font-bold text-[#1A2621]">Order #{node.orderNumber}</p>
                                            <p className="text-xs text-gray-500">{new Date(node.processedAt).toLocaleDateString()}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-medium text-[#D4AF37]">{node.totalPrice.currencyCode} {node.totalPrice.amount}</p>
                                            <span className="text-[10px] bg-gray-100 px-2 py-1 rounded-full uppercase tracking-wider">{node.financialStatus}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 italic">No orders yet.</p>
                        )}

                        <button
                            onClick={logout}
                            className="mt-12 w-full py-4 border border-gray-200 text-gray-500 font-bold rounded-full hover:bg-black hover:text-white transition"
                        >
                            Sign Out
                        </button>
                    </div>
                ) : (
                    /* LOGGED OUT STATE (Forms) */
                    <div className="flex-1">
                        {error && (
                            <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 text-sm">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Email</label>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-[#F9F9F7] p-4 rounded-xl outline-none focus:ring-1 focus:ring-[#D4AF37] text-[#1A2621]"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Password</label>
                                <input
                                    type="password"
                                    // required 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-[#F9F9F7] p-4 rounded-xl outline-none focus:ring-1 focus:ring-[#D4AF37] text-[#1A2621]"
                                />
                            </div>

                            <button
                                disabled={loading}
                                className="w-full bg-[#1A2621] text-white font-bold py-4 rounded-full hover:bg-[#D4AF37] hover:text-black transition disabled:opacity-50"
                            >
                                {loading ? "Processing..." : (mode === "login" ? "Sign In" : "Create Account")}
                            </button>
                        </form>

                        <div className="mt-8 text-center">
                            <p className="text-gray-500 text-sm">
                                {mode === "login" ? "New to Nutrir? " : "Already have an account? "}
                                <button
                                    onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(""); }}
                                    className="text-[#1A2621] font-bold underline"
                                >
                                    {mode === "login" ? "Join Now" : "Sign In"}
                                </button>
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

    return createPortal(DrawerContent, document.body);
}
