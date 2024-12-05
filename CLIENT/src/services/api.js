// Product List

async function fetchProducts() {
  const response = await fetch("/api/v1/product/list");
  const data = await response.json();
  return data;
};

// Category List
  
async function fetchCategories() {
  const response = await fetch("/api/v1/category/list");
  const data = await response.json();
  return data;
};

// SkinType List

async function fetchSkinTypes() {
  const response = await fetch("/api/v1/skintype/list");
  const data = await response.json();
  return data;
};

// SkinConcern List

async function fetchSkinConcerns() {
  const response = await fetch("/api/v1/skinconcern/list");
  const data = await response.json();
  return data;
};


export { fetchProducts, fetchCategories, fetchSkinTypes, fetchSkinConcerns };
