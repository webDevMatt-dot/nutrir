"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useAuth } from "../context/AuthContext";
import { updateCustomerAddress, createCustomerAddress, getCustomer } from "../lib/shopify";

// Utility to format address from Shopify data
const formatAddress = (address: any) => {
    if (!address) return "No default address set.";
    return `${address.address1}, ${address.city}, ${address.province || ''}, ${address.country}, ${address.zip}`;
};


// Address Form Component
function AddressForm({ address, accessToken, onSave }: any) {
    const [formData, setFormData] = useState({
        firstName: address?.firstName || "",
        lastName: address?.lastName || "",
        address1: address?.address1 || "",
        city: address?.city || "",
        province: address?.province || "",
        zip: address?.zip || "",
        country: address?.country || "",
        phone: address?.phone || "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        // Remove empty strings if address is optional (like address2)
        const cleanData = Object.fromEntries(
            Object.entries(formData).filter(([_, v]) => v !== null && v !== "")
        );

        let res;
        if (address?.id) {
            // Update existing address
            res = await updateCustomerAddress(accessToken, address.id, cleanData);
            if (res?.userErrors?.length) {
                setError(res.userErrors[0].message);
            } else if (res?.customerAddress) {
                onSave(res.customerAddress);
            }
        } else {
            // Create a new address (and it automatically becomes the default if it's the first one)
            res = await createCustomerAddress(accessToken, cleanData);
            if (res?.userErrors?.length) {
                setError(res.userErrors[0].message);
            } else if (res?.customerAddress) {
                // Note: We need to re-fetch the entire customer object to ensure defaultAddress is updated.
                const updatedCustomer = await getCustomer(accessToken);
                onSave(updatedCustomer);
            }
        }

        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">{error}</div>
            )}
            <div className="grid grid-cols-2 gap-4">
                <input
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="bg-white border border-gray-200 p-3 rounded-xl focus:border-[#D4AF37] text-[#1A2621]"
                />
                <input
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="bg-white border border-gray-200 p-3 rounded-xl focus:border-[#D4AF37] text-[#1A2621]"
                />
            </div>
            <input
                name="address1"
                placeholder="Address Line 1"
                value={formData.address1}
                onChange={handleChange}
                required
                className="w-full bg-white border border-gray-200 p-3 rounded-xl focus:border-[#D4AF37] text-[#1A2621]"
            />
            <div className="grid grid-cols-2 gap-4">
                <input
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="bg-white border border-gray-200 p-3 rounded-xl focus:border-[#D4AF37] text-[#1A2621]"
                />
                <input
                    name="zip"
                    placeholder="Postal Code"
                    value={formData.zip}
                    onChange={handleChange}
                    required
                    className="bg-white border border-gray-200 p-3 rounded-xl focus:border-[#D4AF37] text-[#1A2621]"
                />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <input
                    name="province"
                    placeholder="State/Province (e.g. Gauteng)"
                    value={formData.province}
                    onChange={handleChange}
                    className="bg-white border border-gray-200 p-3 rounded-xl focus:border-[#D4AF37] text-[#1A2621]"
                />
                <input
                    name="country"
                    placeholder="Country (e.g. South Africa)"
                    value={formData.country}
                    onChange={handleChange}
                    required
                    className="bg-white border border-gray-200 p-3 rounded-xl focus:border-[#D4AF37] text-[#1A2621]"
                />
            </div>
            <input
                name="phone"
                placeholder="Phone (Optional)"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-white border border-gray-200 p-3 rounded-xl focus:border-[#D4AF37] text-[#1A2621]"
            />
            <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#1A2621] text-white font-bold py-3 rounded-full hover:bg-[#D4AF37] hover:text-black transition disabled:opacity-50"
            >
                {loading ? "Saving..." : "Save Address"}
            </button>
        </form>
    );
}

// Main Profile Drawer Component
export default function ProfileDrawer() {
    const { isProfileOpen, toggleProfile, customer, login, register, logout, refreshCustomer } = useAuth();
    const [mode, setMode] = useState<"login" | "register">("login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // State for Address Management
    const [showAddressEdit, setShowAddressEdit] = useState(false);
    const [addressSuccess, setAddressSuccess] = useState(false);

    // Scroll locking fix (Hydration Mismatch)
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);
    useEffect(() => {
        if (mounted) {
            document.body.style.overflow = isProfileOpen ? "hidden" : "unset";
        }
    }, [isProfileOpen, mounted]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        // Note: The firstName is passed as "New User" in AuthContext.tsx to satisfy Shopify validation
        const err = mode === "login"
            ? await login(email, password)
            : await register(email, password);

        setLoading(false);
        if (err) setError(err);
        if (!err) {
            toggleProfile(); // Close on successful login/signup
        }
    };

    const handleAddressSave = async (updatedData: any) => {
        // If successful, reset back to view mode and show success message
        if (updatedData.id) {
            setShowAddressEdit(false);
            setAddressSuccess(true);
            setTimeout(() => setAddressSuccess(false), 3000);

            // --- CRITICAL FIX: REFRESH GLOBAL STATE ---
            await refreshCustomer();
            // ------------------------------------------
        }
        toggleProfile(); // Close on success for now
    }

    // Only render the portal on the client
    if (!mounted || !isProfileOpen) return null;

    const DrawerContent = (
        <div className="fixed inset-0 z-[100] flex justify-end">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={toggleProfile}></div>

            {/* Drawer */}
            <div className="relative w-full max-w-lg bg-white h-full shadow-2xl flex flex-col p-8 animate-in slide-in-from-right duration-300">

                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-serif text-[#1A2621]">
                        {customer ? `Welcome, ${customer.firstName || 'User'}` : (mode === "login" ? "Login" : "Join Nutrir")}
                    </h2>
                    <button onClick={toggleProfile} className="text-gray-400 hover:text-black">CLOSE</button>
                </div>

                {/* LOGGED IN STATE */}
                {customer ? (
                    <div className="flex-1 overflow-y-auto">
                        {addressSuccess && (
                            <div className="bg-[#E8F4F1] text-[#1A2621] p-4 rounded-lg mb-6 text-sm font-medium">
                                Address successfully updated!
                            </div>
                        )}

                        <h3 className="text-xl font-serif text-[#1A2621] mb-4">Account Details</h3>
                        <div className="bg-[#F9F9F7] p-6 rounded-xl mb-8 border border-gray-100">
                            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Email</p>
                            <p className="text-lg font-medium text-[#1A2621] mb-4">{customer.email}</p>

                            {/* ADDRESS SECTION */}
                            <div className="flex justify-between items-center mb-2">
                                <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Shipping Address</p>
                                <button
                                    onClick={() => setShowAddressEdit(!showAddressEdit)}
                                    className="text-xs font-bold text-[#D4AF37] hover:text-[#1A2621] transition"
                                >
                                    {showAddressEdit ? "Cancel" : (customer.defaultAddress ? "Edit Address" : "Add Address")}
                                </button>
                            </div>

                            {showAddressEdit ? (
                                <div className='mt-4'>
                                    {/* Address Form Renders here */}
                                    <AddressForm
                                        address={customer.defaultAddress}
                                        accessToken={localStorage.getItem("shopify_customer_token")}
                                        onSave={handleAddressSave}
                                    />
                                </div>
                            ) : (
                                <p className="text-sm text-[#1A2621] leading-relaxed">
                                    {formatAddress(customer.defaultAddress)}
                                </p>
                            )}
                        </div>

                        {/* ORDER HISTORY */}
                        <h3 className="text-xl font-serif text-[#1A2621] mb-4">Order History</h3>
                        {customer.orders?.edges?.length > 0 ? (
                            <div className="space-y-4">
                                {customer.orders.edges.map(({ node }: any) => (
                                    <div key={node.id} className="border border-gray-100 p-4 rounded-xl flex justify-between items-center">
                                        <div>
                                            <p className="font-bold text-[#1A2621]">Order #{node.orderNumber}</p>
                                            <p className="text-xs text-gray-500">{new Date(node.processedAt).toLocaleDateString()}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-medium text-[#D4AF37]">{node.totalPrice.currencyCode} {parseFloat(node.totalPrice.amount).toFixed(2)}</p>
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
                                    required
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
