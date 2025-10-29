const API_URL = import.meta.env.VITE_API_BASE_URL;

// Hent alle produkter
export const getProducts = async () => {
  const res = await fetch(`${API_URL}/api/products`);
  if (!res.ok) throw new Error("Kunne ikke hente produkter");
  return await res.json();
};

// Hent produkt via ID
export const getProductById = async (id) => {
  const res = await fetch(`${API_URL}/api/products/${id}`);
  if (!res.ok) throw new Error("Kunne ikke hente produktet");
  return res.json();
};

// Opret produkt
export const createProduct = async (product) => {
  const res = await fetch(`${API_URL}/api/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  if (!res.ok) throw new Error("Kunne ikke oprette produkt");
  return await res.json();
};

// Importér produkter
export const importProducts = async (products) => {
  const res = await fetch(`${API_URL}/api/products/import`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(products),
  });
  if (!res.ok) throw new Error("Kunne ikke importere produkter");
  return await res.json();
};

// Opdatér produkt
export const updateProduct = async (id, product) => {
  const res = await fetch(`${API_URL}/api/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  if (!res.ok) throw new Error("Kunne ikke opdatere produkt");
  return await res.json();
};

// Slet produkt
export const deleteProduct = async (id) => {
  const res = await fetch(`${API_URL}/api/products/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Kunne ikke slette produkt");
  return await res.json();
};
