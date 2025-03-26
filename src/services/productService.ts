import { Product, ProductFormData } from '../types/Product';
import { v4 as uuidv4 } from 'uuid';

import { getCurrentUser } from './authService';


// Fetch all products
export const getAllProducts = async () => {
  const response = await fetch('http://localhost:3006/api/products');
  return response.json();
};

// Fetch products by category
export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  try {
    const response = await fetch(`/api/products?category=${encodeURIComponent(category)}`);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Network response was not ok');
    }
    
    const contentType = response.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
      throw new Error('Invalid content type received');
    }

    const products = await response.json();
    
    if (!products || products.length === 0) {
      console.log('No products found in database for this category');
      return [];
    }

    // Convert snake_case to camelCase
    const formattedData = products.map((product: { id: any; name: any; reference: any; category: any; sub_category: any; sub_sub_category: any; description: any; price_ht: string; price_ttc: string; stock: any; is_available: number; created_at: string | number | Date; updated_at: string | number | Date; images: string; technical_specs: string; technical_doc_url: any; video_url: any; }) => ({
      id: product.id,
      name: product.name,
      reference: product.reference,
      category: product.category,
      subCategory: product.sub_category,
      subSubCategory: product.sub_sub_category,
      description: product.description,
      priceHT: parseFloat(product.price_ht),
      priceTTC: parseFloat(product.price_ttc),
      stock: product.stock,
      isAvailable: product.is_available === 1,
      createdAt: new Date(product.created_at),
      updatedAt: new Date(product.updated_at),
      images: JSON.parse(product.images),
      technicalSpecs: JSON.parse(product.technical_specs),
      technicalDocUrl: product.technical_doc_url,
      videoUrl: product.video_url
    }));

    return formattedData;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Fetch products by subcategory
export const getProductsBySubCategory = async (category: string, subCategory: string): Promise<Product[]> => {
  try {
    const response = await fetch(`http://localhost:3006/api/products?category=${encodeURIComponent(category)}&subCategory=${encodeURIComponent(subCategory)}`);
    if (!response.ok) throw new Error('Network response was not ok');
    const products = await response.json();
    
    if (!products || products.length === 0) {
      console.log('No products found in database for this subcategory');
      return [];
    }

    // Convert snake_case to camelCase
    const formattedData = products.map((product: { id: any; name: any; reference: any; category: any; sub_category: any; sub_sub_category: any; description: any; price_ht: string; price_ttc: string; stock: any; is_available: number; created_at: string | number | Date; updated_at: string | number | Date; images: string; technical_specs: string; technical_doc_url: any; video_url: any; }) => ({
      id: product.id,
      name: product.name,
      reference: product.reference,
      category: product.category,
      subCategory: product.sub_category,
      subSubCategory: product.sub_sub_category,
      description: product.description,
      priceHT: parseFloat(product.price_ht),
      priceTTC: parseFloat(product.price_ttc),
      stock: product.stock,
      isAvailable: product.is_available === 1,
      createdAt: new Date(product.created_at),
      updatedAt: new Date(product.updated_at),
      images: JSON.parse(product.images),
      technicalSpecs: JSON.parse(product.technical_specs),
      technicalDocUrl: product.technical_doc_url,
      videoUrl: product.video_url
    }));

    return formattedData;
  } catch (error) {
    console.error('Error fetching products by subcategory:', error);
    throw error;
  }
};

// Fetch a single product by ID
export const getProductById = async (id: string): Promise<Product | null> => {
  try {
    const response = await fetch(`http://localhost:3006/api/products/${encodeURIComponent(id)}`);
    if (!response.ok) return null;
    const product = await response.json();
    
    if (!product) {
      console.log('No product found in database');
      return null;
    }

    // Convert snake_case to camelCase
    const formattedData = {
      id: product.id,
      name: product.name,
      reference: product.reference,
      category: product.category,
      subCategory: product.sub_category,
      subSubCategory: product.sub_sub_category,
      description: product.description,
      priceHT: parseFloat(product.price_ht),
      priceTTC: parseFloat(product.price_ttc),
      stock: product.stock,
      isAvailable: product.is_available === 1,
      createdAt: new Date(product.created_at),
      updatedAt: new Date(product.updated_at),
      images: JSON.parse(product.images),
      technicalSpecs: JSON.parse(product.technical_specs),
      technicalDocUrl: product.technical_doc_url,
      videoUrl: product.video_url
    };

    return formattedData;
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    throw error;
  }
};

// Create a new product
export const createProduct = async (productData: ProductFormData) => {
  const response = await fetch('http://localhost:3006/api/products', {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify({
      ...productData,
      images: JSON.stringify(productData.images),
      technical_specs: JSON.stringify(productData.technicalSpecs)
    })
  });
  const responseText = await response.text();
if (!response.ok) {
  const errorData = responseText ? JSON.parse(responseText) : {};
  throw new Error(errorData.error || `Erreur HTTP ${response.status}`);
}
  return response.json();
};

// Update a product
export const updateProduct = async (token: string | undefined, id: string, productData: Partial<ProductFormData>): Promise<Product> => {
  try {
    const user = await getCurrentUser(token);
    if (!user || user.role !== 'admin') throw new Error('Unauthorized');

    // Prepare update data
    const updates: Record<string, any> = {
      name: productData.name,
      reference: productData.reference,
      category: productData.category,
      sub_category: productData.subCategory,
      sub_sub_category: productData.subSubCategory,
      description: productData.description,
      price_ht: productData.priceHT,
      price_ttc: productData.priceTTC,
      stock: productData.stock,
      is_available: productData.isAvailable ? 1 : 0,
      images: productData.images ? JSON.stringify(productData.images) : undefined,
      technical_specs: productData.technicalSpecs ? JSON.stringify(productData.technicalSpecs) : undefined,
      technical_doc_url: productData.technicalDocUrl,
      video_url: productData.videoUrl,
      updated_at: new Date().toISOString()
    };

    // Remove undefined values
    Object.keys(updates).forEach(key => 
      updates[key] === undefined && delete updates[key]
    );

    // Execute the update
    const response = await fetch(`http://localhost:3006/api/products/${id}`, {
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${token}` 
      },
      method: 'PUT',
      body: JSON.stringify(updates)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Failed to update product');
    }

    const result = await response.json();
    console.log('Product updated successfully');
    return result;
  } catch (error) {
    console.error('Error in updateProduct:', error);
    throw error;
  }
};

// Delete a product
export const deleteProduct = async (token: string | undefined, id: string): Promise<void> => {
  try {
    const user = await getCurrentUser(token);
    if (!user || user.role !== 'admin') throw new Error('Unauthorized');

    const response = await fetch(`http://localhost:3006/api/products/${id}`, {
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${token}` 
      },
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error('Failed to delete product');
    }

    console.log('Product deleted successfully');
  } catch (error) {
    console.error('Error in deleteProduct:', error);
    throw error;
  }
};