type CartItem = {
    item_id: string;
    item_name: string;
    price: number;
    quantity: number;
};

// Base function to check if gtag is available and send data
const sendEvent = (eventName: string, data: any) => {
    // Ensure the Google Analytics script has loaded
    if (typeof window !== 'undefined' && (window as any).gtag) {
        // console.log(`GA4 Event: ${eventName}`, data); // Uncomment for debugging
        (window as any).gtag('event', eventName, {
            ...data,
            currency: 'ZAR', // Assuming your store primarily uses ZAR
        });
    }
};

// --- E-COMMERCE SPECIFIC EVENTS ---

// 1. Tracks when a user views a single product page
export const viewItem = (product: any, items: CartItem[]) => {
    sendEvent('view_item', {
        items: items,
        value: product.variants[0]?.price?.amount || 0,
        currency: 'ZAR',
    });
};

// 2. Tracks when an item is added to the cart
export const addToCartEvent = (product: any, quantity: number = 1) => {
    const item = {
        item_id: product.id,
        item_name: product.title,
        price: parseFloat(product.variants[0]?.price?.amount || 0),
        quantity: quantity,
    };

    sendEvent('add_to_cart', {
        items: [item],
        value: item.price * quantity,
    });
};

// 3. Tracks when the user initiates checkout
export const beginCheckoutEvent = (cart: any) => {
    // Handle both structure types (Shopify Storefront API cart structure implies 'lines.edges')
    // But the updated CartContext might use a different structure if it comes from checkout API.
    // Based on CartDrawer.tsx: cart.lineItems (array) or cart.lines.edges
    // Inspecting CartDrawer.tsx: it uses `cart.lineItems.map`.

    let items: CartItem[] = [];

    if (cart.lineItems) {
        items = cart.lineItems.map((item: any) => ({
            item_id: item.id,
            item_name: item.title,
            price: parseFloat(item.variant?.price?.amount || 0),
            quantity: item.quantity,
        }));
    } else if (cart.lines?.edges) {
        items = cart.lines.edges.map((edge: any) => ({
            item_id: edge.node.id,
            item_name: edge.node.merchandise.product.title,
            price: parseFloat(edge.node.merchandise.price.amount),
            quantity: edge.node.quantity,
        }));
    }

    sendEvent('begin_checkout', {
        items: items,
        value: parseFloat(cart?.totalPrice?.amount || cart?.cost?.totalAmount?.amount || 0),
    });
};
