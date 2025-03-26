export interface Category {
  id: string;
  name: string;
  slug: string;
  order_index: number;
  created_at?: string;
  updated_at?: string;
  subcategories?: Subcategory[];
}

export interface Subcategory {
  id: string;
  category_id: string;
  name: string;
  slug: string;
  order_index: number;
  created_at?: string;
  updated_at?: string;
  subsubcategories?: SubSubcategory[];
}

export interface SubSubcategory {
  id: string;
  subcategory_id: string;
  name: string;
  slug: string;
  order_index: number;
  created_at?: string;
  updated_at?: string;
}

// Fetch all categories with their subcategories using a single query
export const getAllCategories = async (): Promise<Category[]> => {
  try {
    const response = await fetch('http://localhost:3006/api/categories');
    if (!response.ok) throw new Error(`Network response not ok: ${response.status}`);
    const responseData = await response.json();
    const result = responseData.categories ?? responseData;
    
    if (!Array.isArray(result)) {
      console.error('Structure de réponse inattendue:', {
        url: response.url,
        status: response.status,
        expected: 'array',
        received: result,
        fullResponse: responseData
      });
      throw new Error('Format de données invalide - un tableau de catégories est requis');
    }
    
    if (result.length === 0) {
      console.warn('Aucune catégorie trouvée dans la réponse du serveur');
    }
    
    // Process API response into hierarchical structure
    // const categoriesMap = new Map<string, Category>();

    const categoriesMap = new Map<string, Category>();

    result.forEach((row: { category_id: string; category_name: any; category_slug: any; category_order: any; category_created: any; category_updated: any; sub_id: string; sub_name: any; sub_slug: any; sub_order: any; sub_created: any; sub_updated: any; subsub_id: any; subsub_name: any; subsub_slug: any; subsub_order: any; subsub_created: any; subsub_updated: any; }) => {
      if (!categoriesMap.has(row.category_id)) {
        categoriesMap.set(row.category_id, {
          id: row.category_id,
          name: row.category_name,
          slug: row.category_slug,
          order_index: row.category_order,
          created_at: row.category_created,
          updated_at: row.category_updated,
          subcategories: []
        });
      }

      const category = categoriesMap.get(row.category_id)!;

      if (row.sub_id) {
        let subcategory = category.subcategories?.find(sub => sub.id === row.sub_id);
        if (!subcategory) {
          subcategory = {
            id: row.sub_id,
            category_id: row.category_id,
            name: row.sub_name,
            slug: row.sub_slug,
            order_index: row.sub_order,
            created_at: row.sub_created,
            updated_at: row.sub_updated,
            subsubcategories: []
          };
          category.subcategories?.push(subcategory);
        }

        if (row.subsub_id) {
          const subsubcategory = {
            id: row.subsub_id,
            subcategory_id: row.sub_id,
            name: row.subsub_name,
            slug: row.subsub_slug,
            order_index: row.subsub_order,
            created_at: row.subsub_created,
            updated_at: row.subsub_updated
          };
          subcategory.subsubcategories?.push(subsubcategory);
        }
      }
    });

    return Array.from(categoriesMap.values());
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw new Error('Failed to fetch categories');
  }
};

// Create a new category
export const createCategory = async (category: Omit<Category, 'id' | 'created_at' | 'updated_at'>): Promise<Category> => {
  try {
    const response = await fetch('/api/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(category)
    });
    if (!response.ok) throw new Error('Failed to create category');
    const now = new Date().toISOString();
    const result = await response.json();
    return result as Category;
  } catch (error) {
    console.error('Error creating category:', error);
    throw new Error('Failed to create category');
  }
};

// Update a category
export const updateCategory = async (id: string, category: Partial<Category>): Promise<Category> => {
  try {
    const response = await fetch(`/api/categories/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(category)
    });
    if (!response.ok) throw new Error('Failed to update category');
    return await response.json();
  } catch (error) {
    console.error('Error updating category:', error);
    throw new Error('Failed to update category');
  }
};

// Delete a category and its subcategories
export const deleteCategory = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`/api/categories/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete category');
  } catch (error) {
    console.error('Error deleting category:', error);
    throw new Error('Failed to delete category and its dependencies');
  }
};

// Create a new subcategory
export const createSubcategory = async (subcategory: Omit<Subcategory, 'id' | 'created_at' | 'updated_at'>): Promise<Subcategory> => {
  try {
    const response = await fetch('/api/subcategories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(subcategory)
    });
    if (!response.ok) throw new Error('Failed to create subcategory');
    return await response.json();
  } catch (error) {
    console.error('Error creating subcategory:', error);
    throw new Error('Failed to create subcategory');
  }
};

// Update a subcategory
export const updateSubcategory = async (id: string, subcategory: Partial<Subcategory>): Promise<Subcategory> => {
  try {
    const response = await fetch(`/api/subcategories/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(subcategory)
    });
    if (!response.ok) throw new Error('Failed to update subcategory');
    return await response.json();
  } catch (error) {
    console.error('Error updating subcategory:', error);
    throw new Error('Failed to update subcategory');
  }
};

// Delete a subcategory and its subsubcategories
export const deleteSubcategory = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`/api/subcategories/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete subcategory');
  } catch (error) {
    console.error('Error deleting subcategory:', error);
    throw new Error('Failed to delete subcategory and its dependencies');
  }
};

// Reorder categories
export const reorderCategories = async (orderedIds: string[]): Promise<void> => {
  try {
    const response = await fetch('/api/categories/reorder', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderedIds })
    });
    if (!response.ok) throw new Error('Failed to reorder categories');
  } catch (error) {
    console.error('Error reordering categories:', error);
    throw new Error('Failed to reorder categories');
  }
};

// Reorder subcategories
export const reorderSubcategories = async (categoryId: string, orderedIds: string[]): Promise<void> => {
  try {
    const response = await fetch(`/api/subcategories/reorder`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ categoryId, orderedIds })
    });
    if (!response.ok) throw new Error('Failed to reorder subcategories');
  } catch (error) {
    console.error('Error reordering subcategories:', error);
    throw new Error('Failed to reorder subcategories');
  }
};

// Create a new subsubcategory
export const createSubSubcategory = async (subsubcategory: Omit<SubSubcategory, 'id' | 'created_at' | 'updated_at'>): Promise<SubSubcategory> => {
  try {
    const response = await fetch('/api/subsubcategories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(subsubcategory)
    });
    if (!response.ok) throw new Error('Failed to create subsubcategory');
    return await response.json();
  } catch (error) {
    console.error('Error creating subsubcategory:', error);
    throw new Error('Failed to create subsubcategory');
  }
};

// Update a subsubcategory
export const updateSubSubcategory = async (id: string, subsubcategory: Partial<SubSubcategory>): Promise<SubSubcategory> => {
  try {
    const response = await fetch(`/api/subsubcategories/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(subsubcategory)
    });
    if (!response.ok) throw new Error('Failed to update subsubcategory');
    return await response.json();
  } catch (error) {
    console.error('Error updating subsubcategory:', error);
    throw new Error('Failed to update subsubcategory');
  }
};

// Delete a subsubcategory
export const deleteSubSubcategory = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`/api/subsubcategories/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete subsubcategory');
  } catch (error) {
    console.error('Error deleting subsubcategory:', error);
    throw new Error('Failed to delete subsubcategory');
  }
};

// Reorder subsubcategories
export const reorderSubSubcategories = async (subcategoryId: string, orderedIds: string[]): Promise<void> => {
  try {
    const response = await fetch(`/api/subsubcategories/reorder`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subcategoryId, orderedIds })
    });
    if (!response.ok) throw new Error('Failed to reorder subsubcategories');
  } catch (error) {
    console.error('Error reordering subsubcategories:', error);
    throw new Error('Failed to reorder subsubcategories');
  }
};