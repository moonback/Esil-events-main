import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, ChevronDown, ChevronUp, Search, Filter } from 'lucide-react';
import AdminLayout from '../../components/layouts/AdminLayout';
import AdminHeader from '../../components/admin/AdminHeader';
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  createSubcategory,
  updateSubcategory,
  deleteSubcategory,
  createSubSubcategory,
  updateSubSubcategory,
  deleteSubSubcategory,
  Category,
  Subcategory,
  SubSubcategory
} from '../../services/categoryService';

const AdminCategories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [expandedSubcategories, setExpandedSubcategories] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');

  const loadCategories = async () => {
    try {
      setLoading(true);
      const data = await getAllCategories();
      setCategories(data);
    } catch (err) {
      setError('Erreur lors du chargement des catégories');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleAddCategory = async () => {
    const name = prompt('Nom de la catégorie:');
    if (!name) return;

    const slug = name.toLowerCase()
      .replace(/[éèêë]/g, 'e')
      .replace(/[àâä]/g, 'a')
      .replace(/[ùûü]/g, 'u')
      .replace(/[ôö]/g, 'o')
      .replace(/[îï]/g, 'i')
      .replace(/[ç]/g, 'c')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    try {
      await createCategory({
        name,
        slug,
        order_index: categories.length + 1
      });
      loadCategories();
    } catch (err) {
      setError('Erreur lors de la création de la catégorie');
      console.error(err);
    }
  };

  const handleEditCategory = async (category: Category) => {
    const name = prompt('Nouveau nom de la catégorie:', category.name);
    if (!name || name === category.name) return;

    const slug = name.toLowerCase()
      .replace(/[éèêë]/g, 'e')
      .replace(/[àâä]/g, 'a')
      .replace(/[ùûü]/g, 'u')
      .replace(/[ôö]/g, 'o')
      .replace(/[îï]/g, 'i')
      .replace(/[ç]/g, 'c')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    try {
      await updateCategory(category.id, { name, slug });
      loadCategories();
    } catch (err) {
      setError('Erreur lors de la modification de la catégorie');
      console.error(err);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette catégorie et toutes ses sous-catégories ?')) {
      return;
    }

    try {
      await deleteCategory(id);
      loadCategories();
    } catch (err) {
      setError('Erreur lors de la suppression de la catégorie');
      console.error(err);
    }
  };

  const handleAddSubcategory = async (categoryId: string) => {
    const name = prompt('Nom de la sous-catégorie:');
    if (!name) return;

    const slug = name.toLowerCase()
      .replace(/[éèêë]/g, 'e')
      .replace(/[àâä]/g, 'a')
      .replace(/[ùûü]/g, 'u')
      .replace(/[ôö]/g, 'o')
      .replace(/[îï]/g, 'i')
      .replace(/[ç]/g, 'c')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    try {
      await createSubcategory({
        category_id: categoryId,
        name,
        slug,
        order_index: (categories.find(c => c.id === categoryId)?.subcategories?.length || 0) + 1
      });
      loadCategories();
    } catch (err) {
      setError('Erreur lors de la création de la sous-catégorie');
      console.error(err);
    }
  };

  const handleEditSubcategory = async (subcategory: Subcategory) => {
    const name = prompt('Nouveau nom de la sous-catégorie:', subcategory.name);
    if (!name || name === subcategory.name) return;

    const slug = name.toLowerCase()
      .replace(/[éèêë]/g, 'e')
      .replace(/[àâä]/g, 'a')
      .replace(/[ùûü]/g, 'u')
      .replace(/[ôö]/g, 'o')
      .replace(/[îï]/g, 'i')
      .replace(/[ç]/g, 'c')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    try {
      await updateSubcategory(subcategory.id, { name, slug });
      loadCategories();
    } catch (err) {
      setError('Erreur lors de la modification de la sous-catégorie');
      console.error(err);
    }
  };

  const handleDeleteSubcategory = async (id: string) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette sous-catégorie ?')) {
      return;
    }

    try {
      await deleteSubcategory(id);
      loadCategories();
    } catch (err) {
      setError('Erreur lors de la suppression de la sous-catégorie');
      console.error(err);
    }
  };

  const handleAddSubSubcategory = async (subcategoryId: string) => {
    const name = prompt('Nom de la sous-sous-catégorie:');
    if (!name) return;

    const slug = name.toLowerCase()
      .replace(/[éèêë]/g, 'e')
      .replace(/[àâä]/g, 'a')
      .replace(/[ùûü]/g, 'u')
      .replace(/[ôö]/g, 'o')
      .replace(/[îï]/g, 'i')
      .replace(/[ç]/g, 'c')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    try {
      await createSubSubcategory({
        subcategory_id: subcategoryId,
        name,
        slug,
        order_index: (categories
  .find(c => c.id === subcategoryId)
  ?.subcategories
  ?.find(s => s.id === subcategoryId)
  ?.subsubcategories?.length || 0) + 1
      });
      loadCategories();
    } catch (err) {
      setError('Erreur lors de la création de la sous-sous-catégorie');
      console.error(err);
    }
  };

  const handleEditSubSubcategory = async (subsubcategory: SubSubcategory) => {
    const name = prompt('Nouveau nom de la sous-sous-catégorie:', subsubcategory.name);
    if (!name || name === subsubcategory.name) return;

    const slug = name.toLowerCase()
      .replace(/[éèêë]/g, 'e')
      .replace(/[àâä]/g, 'a')
      .replace(/[ùûü]/g, 'u')
      .replace(/[ôö]/g, 'o')
      .replace(/[îï]/g, 'i')
      .replace(/[ç]/g, 'c')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    try {
      await updateSubSubcategory(subsubcategory.id, { name, slug });
      loadCategories();
    } catch (err) {
      setError('Erreur lors de la modification de la sous-sous-catégorie');
      console.error(err);
    }
  };

  const handleDeleteSubSubcategory = async (id: string) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette sous-sous-catégorie ?')) {
      return;
    }

    try {
      await deleteSubSubcategory(id);
      loadCategories();
    } catch (err) {
      setError('Erreur lors de la suppression de la sous-sous-catégorie');
      console.error(err);
    }
  };

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => {
      const next = new Set(prev);
      if (next.has(categoryId)) {
        next.delete(categoryId);
      } else {
        next.add(categoryId);
      }
      return next;
    });
  };

  const toggleSubcategory = (subcategoryId: string) => {
    setExpandedSubcategories(prev => {
      const next = new Set(prev);
      if (next.has(subcategoryId)) {
        next.delete(subcategoryId);
      } else {
        next.add(subcategoryId);
      }
      return next;
    });
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.subcategories?.some(sub =>
      sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.subsubcategories?.some(subsub =>
        subsub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        subsub.slug.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <AdminLayout>
      <AdminHeader />
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Gestion des catégories</h1>
          <div className="flex gap-4">
           
          </div>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-md">
            {error}
          </div>
        )}

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Rechercher une catégorie..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
          </div>
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
            <Filter className="w-4 h-4 mr-2" />
            Filtres
          </button>
          <button
              onClick={handleAddCategory}
              className="flex items-center px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle catégorie
            </button>
        </div>

        {/* Categories List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="divide-y divide-gray-200">
            {filteredCategories.map((category) => (
              <div key={category.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => toggleCategory(category.id)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      {expandedCategories.has(category.id) ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                    <span className="font-medium">{category.name}</span>
                    <span className="text-sm text-gray-500">({category.slug})</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleAddSubcategory(category.id)}
                      className="p-1 hover:bg-gray-100 rounded"
                      title="Ajouter une sous-catégorie"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleEditCategory(category)}
                      className="p-1 hover:bg-gray-100 rounded"
                      title="Modifier la catégorie"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(category.id)}
                      className="p-1 hover:bg-gray-100 rounded text-red-600"
                      title="Supprimer la catégorie"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {expandedCategories.has(category.id) && category.subcategories && (
                  <div className="mt-4 ml-8 space-y-3">
                    {category.subcategories.map((subcategory) => (
                      <div key={subcategory.id} className="space-y-2">
                        <div className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                          <div className="flex items-center space-x-4">
                            <button
                              onClick={() => toggleSubcategory(subcategory.id)}
                              className="p-1 hover:bg-gray-100 rounded"
                            >
                              {expandedSubcategories.has(subcategory.id) ? (
                                <ChevronUp className="w-4 h-4" />
                              ) : (
                                <ChevronDown className="w-4 h-4" />
                              )}
                            </button>
                            <span>{subcategory.name}</span>
                            <span className="text-sm text-gray-500">({subcategory.slug})</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleAddSubSubcategory(subcategory.id)}
                              className="p-1 hover:bg-gray-100 rounded"
                              title="Ajouter une sous-sous-catégorie"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleEditSubcategory(subcategory)}
                              className="p-1 hover:bg-gray-100 rounded"
                              title="Modifier la sous-catégorie"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteSubcategory(subcategory.id)}
                              className="p-1 hover:bg-gray-100 rounded text-red-600"
                              title="Supprimer la sous-catégorie"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {expandedSubcategories.has(subcategory.id) && subcategory.subsubcategories && (
                          <div className="ml-8 space-y-2">
                            {subcategory.subsubcategories.map((subsubcategory) => (
                              <div
                                key={subsubcategory.id}
                                className="flex items-center justify-between p-2 bg-gray-100 rounded-md"
                              >
                                <div className="flex items-center space-x-4">
                                  <span>{subsubcategory.name}</span>
                                  <span className="text-sm text-gray-500">({subsubcategory.slug})</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <button
                                    onClick={() => handleEditSubSubcategory(subsubcategory)}
                                    className="p-1 hover:bg-gray-200 rounded"
                                    title="Modifier la sous-sous-catégorie"
                                  >
                                    <Edit className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteSubSubcategory(subsubcategory.id)}
                                    className="p-1 hover:bg-gray-200 rounded text-red-600"
                                    title="Supprimer la sous-sous-catégorie"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminCategories;