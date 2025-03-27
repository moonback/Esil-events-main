const API_BASE_URL = 'http://localhost:3006';

export interface Category {
  id: string;
  name: string;
  slug: string;
  order_index: number;
  created_at?: string;
  updated_at?: string;
  subCategories: SubCategory[];
}

export interface SubCategory {
  id: string;
  category_id: string;
  name: string;
  slug: string;
  order_index: number;
  created_at?: string;
  updated_at?: string;
  subSubCategories?: SubSubCategory[];
}

export interface SubSubCategory {
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
    const response = await fetch(`${API_BASE_URL}/api/categories`);
    if (!response.ok) throw new Error(`Network response not ok: ${response.status}`);
    const data = await response.json();
    
    console.log('Raw server response:', data);
    
    const categories = data.categories || [];
    
    if (!categories.length) {
      console.warn('Aucune catégorie trouvée dans la réponse du serveur');
      return [];
    }

    // Nouvelle logique de transformation
    const transformedCategories = categories.reduce((acc: Category[], row: any) => {
      // Si c'est une nouvelle catégorie
      if (!acc.find(cat => cat.id === row.category_id)) {
        const category: Category = {
          id: row.category_id,
          name: row.category_name,
          slug: row.category_slug,
          order_index: row.category_order || 0,
          created_at: row.category_created,
          updated_at: row.category_updated,
          subCategories: []
        };
        acc.push(category);
      }

      // Trouver la catégorie parente
      const parentCategory = acc.find(cat => cat.id === row.category_id);
      if (!parentCategory) return acc;

      // Si on a une sous-catégorie et qu'elle n'existe pas encore
      if (row.sub_id) {
        // Initialiser subcategories s'il n'existe pas
        if (!parentCategory.subCategories) {
          parentCategory.subCategories = [];
        }

        if (!parentCategory.subCategories.find(sub => sub.id === row.sub_id)) {
          const subcategory: SubCategory = {
            id: row.sub_id,
            category_id: row.category_id,
            name: row.sub_name,
            slug: row.sub_slug,
            order_index: row.sub_order || 0,
            created_at: row.sub_created,
            updated_at: row.sub_updated,
            subSubCategories: []
          };
                    parentCategory.subCategories.push(subcategory);
        }
      }

      // Si on a une sous-sous-catégorie
      if (row.subsub_id) {
        const parentSubcategory = parentCategory.subCategories?.find(sub => sub.id === row.sub_id);
        if (parentSubcategory) {
          // Initialiser subsubcategories s'il n'existe pas
          if (!parentSubcategory.subSubCategories) {
            parentSubcategory.subSubCategories = [];
          }
          
          if (!parentSubcategory.subSubCategories.find(subsub => subsub.id === row.subsub_id)) {
            const subsubcategory: SubSubCategory = {
              id: row.subsub_id,
              subcategory_id: row.sub_id,
              name: row.subsub_name,
              slug: row.subsub_slug,
              order_index: row.subsub_order || 0,
              created_at: row.subsub_created,
              updated_at: row.subsub_updated
            };
            parentSubcategory.subSubCategories.push(subsubcategory);
          }
        }
      }

      return acc;
    }, []);

    console.log('Transformed categories:', transformedCategories);
    return transformedCategories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw new Error('Failed to fetch categories');
  }
};

// Create a new category
export const createCategory = async (category: Omit<Category, 'id' | 'created_at' | 'updated_at'>): Promise<Category> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/categories`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(category)
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create category');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating category:', error);
    throw error;
  }
};

// Update a category
export const updateCategory = async (id: string, category: Partial<Category>): Promise<Category> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/categories/${id}`, {
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
    const response = await fetch(`${API_BASE_URL}/api/categories/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete category');
  } catch (error) {
    console.error('Error deleting category:', error);
    throw new Error('Failed to delete category and its dependencies');
  }
};

// Create a new subcategory
export const createSubcategory = async (subcategory: Omit<SubCategory, 'id' | 'created_at' | 'updated_at'>): Promise<SubCategory> => {
  try {
    console.log('Creating subcategory:', subcategory);
    const response = await fetch(`${API_BASE_URL}/api/subcategories`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(subcategory)
    });
    if (!response.ok) throw new Error('Failed to create subcategory');
    const result = await response.json();
    console.log('Subcategory created successfully:', result);
    return result;
  } catch (error) {
    console.error('Error creating subcategory:', error);
    throw new Error('Failed to create subcategory');
  }
};

// Update a subcategory
export const updateSubcategory = async (id: string, subcategory: Partial<SubCategory>): Promise<SubCategory> => {
  try {
    console.log('Updating subcategory:', { id, updates: subcategory });
    const response = await fetch(`${API_BASE_URL}/api/subcategories/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(subcategory)
    });
    if (!response.ok) throw new Error('Failed to update subcategory');
    const result = await response.json();
    console.log('Subcategory updated successfully:', result);
    return result;
  } catch (error) {
    console.error('Error updating subcategory:', error);
    throw new Error('Failed to update subcategory');
  }
};

// Delete a subcategory and its subsubcategories
export const deleteSubcategory = async (id: string): Promise<void> => {
  try {
    console.log('Deleting subcategory:', id);
    const response = await fetch(`${API_BASE_URL}/api/subcategories/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete subcategory');
    console.log('Subcategory deleted successfully');
  } catch (error) {
    console.error('Error deleting subcategory:', error);
    throw new Error('Failed to delete subcategory and its dependencies');
  }
};

// Reorder categories
export const reorderCategories = async (orderedIds: string[]): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/categories/reorder`, {
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
    const response = await fetch(`${API_BASE_URL}/api/subcategories/reorder`, {
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
export const createSubSubcategory = async (subsubcategory: Omit<SubSubCategory, 'id' | 'created_at' | 'updated_at'>): Promise<SubSubCategory> => {
  try {
    console.log('Creating subsubcategory:', subsubcategory);
    const response = await fetch(`${API_BASE_URL}/api/subsubcategories`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(subsubcategory)
    });
    if (!response.ok) throw new Error('Failed to create subsubcategory');
    const result = await response.json();
    console.log('Subsubcategory created successfully:', result);
    return result;
  } catch (error) {
    console.error('Error creating subsubcategory:', error);
    throw new Error('Failed to create subsubcategory');
  }
};

// Update a subsubcategory
export const updateSubSubcategory = async (id: string, subsubcategory: Partial<SubSubCategory>): Promise<SubSubCategory> => {
  try {
    console.log('Updating subsubcategory:', { id, updates: subsubcategory });
    const response = await fetch(`${API_BASE_URL}/api/subsubcategories/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(subsubcategory)
    });
    if (!response.ok) throw new Error('Failed to update subsubcategory');
    const result = await response.json();
    console.log('Subsubcategory updated successfully:', result);
    return result;
  } catch (error) {
    console.error('Error updating subsubcategory:', error);
    throw new Error('Failed to update subsubcategory');
  }
};

// Delete a subsubcategory
export const deleteSubSubcategory = async (id: string): Promise<void> => {
  try {
    console.log('Deleting subsubcategory:', id);
    const response = await fetch(`${API_BASE_URL}/api/subsubcategories/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete subsubcategory');
    console.log('Subsubcategory deleted successfully');
  } catch (error) {
    console.error('Error deleting subsubcategory:', error);
    throw new Error('Failed to delete subsubcategory');
  }
};

// Reorder subsubcategories
export const reorderSubSubcategories = async (subcategoryId: string, orderedIds: string[]): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/subsubcategories/reorder`, {
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