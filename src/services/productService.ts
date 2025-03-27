import { Product, ProductFormData } from '../types/Product';

const API_URL = 'http://localhost:3007/api';

export const getAllProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${API_URL}/products`);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  const products = await response.json();
  return products.map((product: any) => ({
    ...product,
    createdAt: new Date(product.createdAt),
    updatedAt: new Date(product.updatedAt)
  }))
};

export const getProductById = async (id: string): Promise<Product | null> => {
  const response = await fetch(`${API_URL}/products/${id}`);
  if (!response.ok) {
    if (response.status === 404) return null;
    throw new Error('Failed to fetch product');
  }
  const product = await response.json();
  return {
    ...product,
    createdAt: new Date(product.createdAt),
    updatedAt: new Date(product.updatedAt)
  }
};

export const createProduct = async (productData: ProductFormData): Promise<Product> => {
  const response = await fetch(`${API_URL}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...productData,
      category_id: Number(productData.category_id),
      subcategory_id: Number(productData.subcategory_id),
      subsubcategory_id: productData.subsubcategory_id ? Number(productData.subsubcategory_id) : null
    })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to create product');
  }

  const product = await response.json();
  return {
    ...product,
    createdAt: new Date(product.createdAt),
    updatedAt: new Date(product.updatedAt)
  }
};

export const updateProduct = async (id: string, productData: ProductFormData): Promise<Product> => {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...productData,
      category_id: Number(productData.category_id),
      subcategory_id: Number(productData.subcategory_id),
      subsubcategory_id: productData.subsubcategory_id ? Number(productData.subsubcategory_id) : null
    })
  });

  if (!response.ok) {
    throw new Error('Failed to update product');
  }

  const product = await response.json();
  return {
    ...product,
    createdAt: new Date(product.createdAt),
    updatedAt: new Date(product.updatedAt)
  }
};

export const deleteProduct = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: 'DELETE'
  });

  if (!response.ok) {
    throw new Error('Failed to delete product');
  }
};