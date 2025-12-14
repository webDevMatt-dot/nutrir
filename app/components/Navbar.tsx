"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext"; // Import
import SearchDrawer from "./SearchDrawer";
import ProfileDrawer from "./ProfileDrawer";      // Import

export default function Navbar() {
    const { toggleCart, cart } = useCart();
    const { toggleProfile } = useAuth(); // <--- Get the toggle function
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const totalQuantity = cart?.lineItems?.reduce(
        (total: number, item: any) => total + item.quantity,
        0
    ) || 0;

    return (
        <>
            <nav className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-6 sm:px-8">
                    <div className="flex justify-between items-center h-20">

                        {/* LEFT: LOGO */}
                        <div className="flex items-center">
                            <button
                                onClick={() => setIsMobileMenuOpen(true)}
                                className="md:hidden p-2 -ml-2 text-[#1A2621] hover:text-[#D4AF37] mr-4"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                </svg>
                            </button>
                            <Link
                                href="/"
                                className="text-2xl md:text-3xl font-serif tracking-[0.2em] font-medium hover:opacity-80 transition bg-gradient-to-r from-[#1A2621] via-[#4A5D23] to-[#998B5E] bg-clip-text text-transparent"
                            >
                                N U T R I R
                            </Link>
                        </div>

                        {/* CENTER: LINKS */}
                        <div className="hidden md:flex items-center space-x-12">
                            <Link href="/collections/all-products" className="text-[#1A2621] text-sm font-medium hover:text-[#D4AF37] transition">
                                Shop
                            </Link>
                            <Link href="/our-story" className="text-[#1A2621] text-sm font-medium hover:text-[#D4AF37] transition">
                                Our Story
                            </Link>
                            <Link href="/policies" className="text-[#1A2621] text-sm font-medium hover:text-[#D4AF37] transition">
                                Policies
                            </Link>
                            <Link href="/faq" className="text-[#1A2621] text-sm font-medium hover:text-[#D4AF37] transition">
                                FAQ
                            </Link>
                            <Link href="/contact" className="text-[#1A2621] text-sm font-medium hover:text-[#D4AF37] transition">
                                Contact
                            </Link>
                        </div>

                        {/* RIGHT: ICONS */}
                        <div className="flex items-center gap-5">

                            {/* SEARCH TRIGGER BUTTON */}
                            <button
                                onClick={() => setIsSearchOpen(true)}
                                className="text-[#1A2621] hover:text-[#D4AF37] transition"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                </svg>
                            </button>

                            {/* CART TRIGGER */}
                            <button
                                onClick={toggleCart}
                                className="relative text-[#1A2621] hover:text-[#D4AF37] transition"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                </svg>
                                {totalQuantity > 0 && (
                                    <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-[#D4AF37] rounded-full">
                                        {totalQuantity}
                                    </span>
                                )}
                            </button>

                            <button onClick={toggleProfile} className="text-[#1A2621] hover:text-[#D4AF37] transition">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* RENDER THE SEARCH DRAWER HERE */}
            <SearchDrawer
                isOpen={isSearchOpen}
                onClose={() => setIsSearchOpen(false)}
            />

            <ProfileDrawer />

            {/* Mobile Menu (Same as before) */}
            <div
                className={`fixed inset-0 z-50 bg-black/50 transition-opacity duration-300 md:hidden ${isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
                onClick={() => setIsMobileMenuOpen(false)}
            >
                <div
                    className={`absolute top-0 left-0 w-4/5 max-w-xs h-full bg-white shadow-xl transform transition-transform duration-300 ease-in-out p-6 flex flex-col ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
                        }`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex justify-between items-center mb-10">
                        <span className="text-xl font-serif text-[#1A2621] tracking-widest">N U T R I R</span>
                        <button onClick={() => setIsMobileMenuOpen(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-400 hover:text-black">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className="flex flex-col space-y-6">
                        <Link href="/" className="text-lg font-medium text-[#1A2621]" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
                        <Link href="/collections/all-products" className="text-lg font-medium text-[#1A2621]" onClick={() => setIsMobileMenuOpen(false)}>Shop</Link>
                        <Link href="/our-story" className="text-lg font-medium text-[#1A2621]" onClick={() => setIsMobileMenuOpen(false)}>Our Story</Link>
                        <Link href="/policies" className="text-lg font-medium text-[#1A2621]" onClick={() => setIsMobileMenuOpen(false)}>Policies</Link>
                        <Link href="/faq" className="text-lg font-medium text-[#1A2621]" onClick={() => setIsMobileMenuOpen(false)}>FAQ</Link>
                        <Link href="/contact" className="text-lg font-medium text-[#1A2621]" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
                    </div>
                </div>
            </div>
        </>
    );
}
