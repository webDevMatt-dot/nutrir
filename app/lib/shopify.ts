import Client from 'shopify-buy';

// --- CONFIGURATION (RESTORED TO SECURE MODE) ---
const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!;
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!;

// 1. CLIENT FOR CART (shopify-buy)
export const client = Client.buildClient({
  domain: domain,
  storefrontAccessToken: storefrontAccessToken,
  apiVersion: '2024-01',
});

// 2. FETCH FOR PRODUCTS (Server-side)
async function shopifyFetch(query: string, variables = {}) {
  const endpoint = `https://${domain}/api/2024-01/graphql.json`;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
      },
      body: JSON.stringify({ query, variables }),
      cache: 'no-store', // Force fresh data
    });

    if (!response.ok) {
      console.error("Shopify API Error:", response.statusText);
      return { data: null };
    }

    return response.json();
  } catch (e) {
    console.error("Fetch failed:", e);
    return { data: null };
  }
}

// 3. FRAGMENTS & HELPERS
const productFragment = `
  id
  title
  handle
  description
  descriptionHtml
  productType
  tags
  images(first: 5) {
    edges {
      node {
        url
        altText
      }
    }
  }
  variants(first: 20) {
    edges {
      node {
        id
        title
        price {
          amount
          currencyCode
        }
      }
    }
  }
`;

const formatProduct = (p: any) => {
  const node = p.node || p;
  if (!node) return null;
  return {
    ...node,
    id: node.id,
    images: node.images?.edges?.map((img: any) => ({ src: img.node.url, alt: img.node.altText })) || [],
    variants: node.variants?.edges?.map((v: any) => v.node) || [],
    tags: node.tags || []
  };
};

// --- EXPORTS ---

export async function getProduct(handle: string) {
  const query = `query getProduct($handle: String!) { product(handle: $handle) { ${productFragment} } }`;
  const { data } = await shopifyFetch(query, { handle });
  return data?.product ? formatProduct(data.product) : null;
}

export async function getCollection(handle: string) {
  if (handle === 'all-products') return getAllProducts();

  const query = `
    query getCollection($handle: String!) {
      collection(handle: $handle) {
        title
        description
        products(first: 100) {
          edges {
            node { ${productFragment} }
          }
        }
      }
    }
  `;
  const { data } = await shopifyFetch(query, { handle });
  if (!data?.collection) return null;
  return { ...data.collection, products: data.collection.products.edges.map(formatProduct) };
}

export async function getAllProducts() {
  const query = `
    query getAllProducts {
      products(first: 100) {
        edges {
          node { ${productFragment} }
        }
      }
    }
  `;
  const { data } = await shopifyFetch(query);
  return {
    title: "All Products",
    description: "Our complete collection.",
    products: data?.products?.edges.map(formatProduct) || []
  };
}

export async function searchProducts(searchTerm: string) {
  const query = `
    query searchProducts($searchTerm: String!) {
      products(first: 10, query: $searchTerm) {
        edges {
          node { ${productFragment} }
        }
      }
    }
  `;
  const { data } = await shopifyFetch(query, { searchTerm });
  return data?.products?.edges.map(formatProduct) || [];
}

// --- AUTHENTICATION ---

export async function createCustomer(email: string, password: string, firstName: string = "Guest") {
  const query = `
    mutation customerCreate($input: CustomerCreateInput!) {
      customerCreate(input: $input) {
        customer { id }
        userErrors { field message }
      }
    }
  `;
  const { data } = await shopifyFetch(query, { input: { email, password, firstName } });
  return data?.customerCreate;
}

export async function loginCustomer(email: string, password: string) {
  const query = `
    mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
      customerAccessTokenCreate(input: $input) {
        customerAccessToken { accessToken expiresAt }
        userErrors { field message }
      }
    }
  `;
  const { data } = await shopifyFetch(query, { input: { email, password } });
  return data?.customerAccessTokenCreate;
}

export async function getCustomer(accessToken: string) {
  const query = `
    query getCustomer($customerAccessToken: String!) {
      customer(customerAccessToken: $customerAccessToken) {
        id
        firstName
        lastName
        email
        defaultAddress {
          id
          firstName
          lastName
          address1
          address2
          city
          province
          zip
          country
          phone
        }
        orders(first: 5) {
          edges {
            node {
              id
              orderNumber
              totalPrice { amount currencyCode }
              processedAt
              financialStatus
            }
          }
        }
      }
    }
  `;
  const { data } = await shopifyFetch(query, { customerAccessToken: accessToken });
  return data?.customer;
}

// --- ADDRESS MANAGEMENT ---

export async function updateCustomerAddress(accessToken: string, addressId: string, address: any) {
  const query = `
    mutation customerAddressUpdate($customerAccessToken: String!, $id: ID!, $address: MailingAddressInput!) {
      customerAddressUpdate(customerAccessToken: $customerAccessToken, id: $id, address: $address) {
        customerAddress {
          id
          firstName
          lastName
          address1
          city
          province
          zip
          country
        }
        userErrors {
          field
          message
        }
      }
    }
  `;
  const { data } = await shopifyFetch(query, {
    customerAccessToken: accessToken,
    id: addressId,
    address: address
  });
  return data?.customerAddressUpdate;
}

export async function createCustomerAddress(accessToken: string, address: any) {
  const query = `
    mutation customerAddressCreate($customerAccessToken: String!, $address: MailingAddressInput!) {
      customerAddressCreate(customerAccessToken: $customerAccessToken, address: $address) {
        customerAddress {
          id
          firstName
          lastName
          address1
          city
          province
          zip
          country
        }
        userErrors {
          field
          message
        }
      }
    }
  `;
  const { data } = await shopifyFetch(query, {
    customerAccessToken: accessToken,
    address: address
  });
  return data?.customerAddressCreate;
}

// --- NEW FUNCTION TO ASSOCIATE CUSTOMER USING PURE GRAPHQL ---
export async function associateCustomerWithCheckout(checkoutId: string, customerAccessToken: string) {
  const endpoint = `https://${domain}/api/2024-01/graphql.json`;
  const query = `
    mutation checkoutCustomerAssociateV2($checkoutId: ID!, $customerAccessToken: String!) {
        checkoutCustomerAssociateV2(checkoutId: $checkoutId, customerAccessToken: $customerAccessToken) {
            checkout { id }
            userErrors { field message }
        }
    }`;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
      },
      body: JSON.stringify({ query, variables: { checkoutId, customerAccessToken } }),
      // Must use 'no-store' here since it's a mutation
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error("Shopify Association API Error:", response.statusText);
      return { userErrors: [{ message: "Network error during association." }] };
    }

    const result = await response.json();
    return result?.data?.checkoutCustomerAssociateV2;

  } catch (e) {
    console.error("Association Fetch failed:", e);
    return { userErrors: [{ message: "Association failed: " + e }] };
  }
}