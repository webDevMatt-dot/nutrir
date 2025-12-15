"use client";

import { useFormState } from "react-dom";
import { submitContactForm } from "./actions";
import Link from "next/link";

export default function ContactPage() {
    // initialState is null or { success: boolean, message: string }
    const [state, formAction] = useFormState(submitContactForm, null);

    return (
        <main className="min-h-screen bg-white pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* HERO TEXT */}
                <div className="text-center mb-20">
                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37] mb-3">
                        Get in Touch
                    </h3>
                    <h1 className="text-5xl md:text-6xl font-serif text-[#1A2621]">
                        We're Here to Help
                    </h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

                    {/* LEFT: Contact Info */}
                    <div className="space-y-12">
                        <div>
                            <h2 className="text-2xl font-serif text-[#1A2621] mb-6">Connect with Us</h2>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                Have a question about our products, ingredients, or your order?
                                Our team fits wellness into every day, and we'd love to help you do the same.
                            </p>
                        </div>

                        <div className="space-y-6">
                            {/* EMAIL */}
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-[#E8F4F1] flex items-center justify-center flex-shrink-0 text-[#2D3A31]">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-bold text-[#1A2621] mb-1">Email Us</p>
                                    <a href="mailto:admin@nutrirfoods.com" className="text-gray-600 hover:text-[#D4AF37] transition duration-300">
                                        admin@nutrirfoods.com
                                    </a>
                                </div>
                            </div>

                            {/* WHATSAPP */}
                            {/* <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-[#F9F9F7] flex items-center justify-center flex-shrink-0 text-[#2D3A31]">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M18.403 5.633A8.919 8.919 0 0012.053 3c-4.948 0-8.976 4.027-8.978 8.977 0 1.582.413 3.126 1.198 4.488L3 21.116l4.759-1.249a8.981 8.981 0 004.29 1.093h.004c4.947 0 8.975-4.027 8.977-8.977a8.926 8.926 0 00-2.627-6.35m-6.35 13.812h-.003a7.446 7.446 0 01-3.798-1.041l-.272-.162-2.824.741.753-2.753-.177-.282a7.448 7.448 0 01-1.141-3.971c.002-4.114 3.349-7.461 7.465-7.461a7.413 7.413 0 015.275 2.188 7.42 7.42 0 012.183 5.279c-.002 4.114-3.349 7.462-7.463 7.462m4.093-5.589c-.225-.113-1.327-.655-1.533-.73-.205-.075-.354-.112-.504.112-.15.224-.579.73-.71.88-.131.15-.262.169-.486.056-.224-.113-.953-.351-1.815-1.12-.673-.6-1.125-1.34-1.257-1.565-.132-.224-.014-.345.098-.458.101-.101.224-.263.336-.395.113-.131.15-.224.225-.374.075-.15.038-.281-.019-.393-.056-.113-.504-1.214-.69-1.663-.181-.435-.366-.376-.504-.383-.131-.007-.281-.007-.431-.007-.15 0-.394.056-.6.281-.206.225-.787.769-.787 1.876 0 1.107.805 2.176.917 2.326.112.15 1.586 2.421 3.842 3.395 1.62.698 1.953.56 2.668.524.715-.037 1.327-.543 1.514-1.067.187-.524.187-.973.131-1.067-.056-.094-.207-.169-.432-.281z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-bold text-[#1A2621] mb-1">WhatsApp Us</p>
                                    <a
                                        href="https://wa.me/263785838876"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-600 hover:text-[#D4AF37] transition duration-300"
                                    >
                                        +263 78 583 8876
                                    </a>
                                </div>
                            </div> */}

                            {/* SOCIAL / FACEBOOK */}
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-[#E8F4F1] flex items-center justify-center flex-shrink-0 text-[#2D3A31]">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-bold text-[#1A2621] mb-1">Follow Us</p>
                                    <a
                                        href="https://web.facebook.com/nutrirfoods"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-600 hover:text-[#D4AF37] transition duration-300"
                                    >
                                        Nutrir Foods on Facebook
                                    </a>
                                </div>
                            </div>

                            {/* FAQ */}
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-[#F9F9F7] flex items-center justify-center flex-shrink-0 text-[#2D3A31]">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-bold text-[#1A2621] mb-1">FAQ</p>
                                    <Link href="/faq" className="text-sm font-medium text-[#D4AF37] hover:text-[#1A2621] transition hover:underline">
                                        Visit FAQ Page &rarr;
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Image / Decorative */}
                        <div className="aspect-[4/3] rounded-2xl bg-[#E8F4F1] relative overflow-hidden hidden lg:block">
                            <div className="absolute inset-0 flex items-center justify-center text-[#2D3A31]/20">
                                <span className="font-serif text-8xl italic">Nutrir</span>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: Form */}
                    <div className="bg-[#F9F9F7] p-8 md:p-12 rounded-[2rem]">
                        <h2 className="text-2xl font-serif text-[#1A2621] mb-8">Send a Message</h2>

                        {state?.success ? (
                            <div className="bg-green-50 text-green-800 p-6 rounded-xl text-center animate-in fade-in zoom-in duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto mb-4 text-green-600">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                                <p>Thank you for reaching out. We'll get back to you shortly.</p>
                                <button
                                    onClick={() => window.location.reload()}
                                    className="mt-6 text-sm font-bold underline hover:text-green-600"
                                >
                                    Send another
                                </button>
                            </div>
                        ) : (
                            <form action={formAction} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-gray-500">Name</label>
                                        <input
                                            required
                                            type="text"
                                            id="name"
                                            name="name"
                                            className="w-full bg-white border border-transparent focus:border-[#D4AF37] rounded-xl px-4 py-3 outline-none transition duration-300 text-[#1A2621]"
                                            placeholder="Your Name"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-gray-500">Email</label>
                                        <input
                                            required
                                            type="email"
                                            id="email"
                                            name="email"
                                            className="w-full bg-white border border-transparent focus:border-[#D4AF37] rounded-xl px-4 py-3 outline-none transition duration-300 text-[#1A2621]"
                                            placeholder="hello@example.com"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="subject" className="text-xs font-bold uppercase tracking-wider text-gray-500">Subject</label>
                                    <div className="relative">
                                        <select
                                            id="subject"
                                            name="subject"
                                            className="w-full bg-white border border-transparent focus:border-[#D4AF37] rounded-xl px-4 py-3 outline-none transition duration-300 appearance-none text-[#1A2621]"
                                        >
                                            <option value="General Inquiry">General Inquiry</option>
                                            <option value="Order Status">Order Status</option>
                                            <option value="Product Question">Product Question</option>
                                            <option value="Wholesale">Wholesale</option>
                                            <option value="Other">Other</option>
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-gray-500">Message</label>
                                    <textarea
                                        required
                                        id="message"
                                        name="message"
                                        rows={5}
                                        className="w-full bg-white border border-transparent focus:border-[#D4AF37] rounded-xl px-4 py-3 outline-none transition duration-300 resize-none text-[#1A2621]"
                                        placeholder="How can we help you?"
                                    ></textarea>
                                </div>

                                <SubmitButton />
                            </form>
                        )}
                    </div>

                </div>
            </div>
        </main>
    );
}

// Separate component for pending state (useFormStatus)
import { useFormStatus } from "react-dom";

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className="w-full bg-[#1A2621] text-white font-bold py-4 rounded-xl hover:bg-[#D4AF37] hover:text-black transition duration-300 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
        >
            {pending ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
                "Send Message"
            )}
        </button>
    );
}
