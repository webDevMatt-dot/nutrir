"use client";

import { useEffect } from "react";
import { viewItem } from "../lib/analytics";

export default function ViewItemTracker({ product }: { product: any }) {
    useEffect(() => {
        if (product) {
            const items = [{
                item_id: product.id,
                item_name: product.title,
                price: parseFloat(product.variants[0]?.price?.amount || 0),
                quantity: 1,
            }];
            viewItem(product, items);
        }
    }, [product]);

    return null;
}
