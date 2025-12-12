"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { getCustomer, loginCustomer, createCustomer } from "../lib/shopify";

interface AuthContextType {
    customer: any;
    login: (e: string, p: string) => Promise<string | null>;
    register: (e: string, p: string) => Promise<string | null>;
    logout: () => void;
    isProfileOpen: boolean;
    toggleProfile: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [customer, setCustomer] = useState<any>(null);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    // Check for saved token on load
    useEffect(() => {
        async function loadUser() {
            const token = localStorage.getItem("shopify_customer_token");
            if (token) {
                const data = await getCustomer(token);
                if (data) setCustomer(data);
            }
        }
        loadUser();
    }, []);

    async function login(email: string, pass: string) {
        const res = await loginCustomer(email, pass);
        if (res?.customerAccessToken?.accessToken) {
            const token = res.customerAccessToken.accessToken;
            localStorage.setItem("shopify_customer_token", token);
            const user = await getCustomer(token);
            setCustomer(user);
            return null; // Success
        }
        return res?.userErrors?.[0]?.message || "Login failed";
    }

    async function register(email: string, pass: string) {
        const res = await createCustomer(email, pass, "New User");
        if (res?.customer?.id) {
            return await login(email, pass); // Auto-login after signup
        }
        return res?.userErrors?.[0]?.message || "Signup failed (Server Validation)";
    }

    function logout() {
        localStorage.removeItem("shopify_customer_token");
        setCustomer(null);
    }

    return (
        <AuthContext.Provider value={{ customer, login, register, logout, isProfileOpen, toggleProfile: () => setIsProfileOpen(!isProfileOpen) }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
