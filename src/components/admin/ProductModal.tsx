import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Product, ProductFormData } from '../../types/Product';
import { Category, SubCategory } from '../../services/categoryService';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (product: ProductFormData) => void;
  product?: Product | null;
}

const ProductModal: React.FC<ProductModalProps> = ({ isOpen, onClose, onSubmit, product }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<SubCategory | null>(null);

  const [formData, setFormData] = useState<ProductFormData>({
    slug: '',
    name: '',
    reference: '',
    category_id: '',
    subcategory_id: '',
    subsubcategory_id: 'null',
    description: '',
    price_ht: 0,
    price_ttc: 0,
    images: [],
    colors: [],
    related_products: [],
    technical_specs: {},
    technical_doc_url: '',
    video_url: '',
    stock: 0,
    is_available: true,
    created_at: new Date(),
    updated_at: new Date()
  });

  useEffect(() => {
    if (product) {
      setFormData({
        ...product,
        id: product.id
      });
      
      // Initialiser les catégories sélectionnées
      const category = categories.find(c => c.id === product.category_id);
      setSelectedCategory(category || null);
      
      const subCategory = category?.subCategories?.find(s => s.id === product.subcategory_id);
      setSelectedSubcategory(subCategory || null);
    } else {
      // Reset form when creating a new product
      setFormData({
        slug: '',
        name: '',
        reference: '',
        category_id: '',
        subcategory_id: '',
        subsubcategory_id: 'null',
        description: '',
        price_ht: 0,
        price_ttc: 0,
        images: [],
        colors: [],
        related_products: [],
        technical_specs: {},
        technical_doc_url: '',
        video_url: '',
        stock: 0,
        is_available: true,
        created_at: new Date(),
        updated_at: new Date()
      });
    }
  }, [product, isOpen]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { getAllCategories } = await import('../../services/categoryService');
        const data = await getAllCategories();
        setCategories(data);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };

    if (isOpen) fetchCategories();
  }, [isOpen]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = categories.find(c => c.id === e.target.value);
    setSelectedCategory(category || null);
    setSelectedSubcategory(null);
    setFormData(prev => ({
      ...prev,
      category_id: e.target.value,
      subcategory_id: '',
      subsubcategory_id: ''
    }));
  };

  const handleSubcategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const subcategory = selectedCategory?.subCategories?.find(s => s.id === e.target.value);
    setSelectedSubcategory(subcategory || null);
    setFormData(prev => ({
      ...prev,
      subcategory_id: e.target.value,
      subsubcategory_id: ''
    }));
  };

  const handleSubsubcategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      subsubcategory_id: e.target.value
    }));
  };
  const handlePrefill = () => {
    if (!categories.length) {
      setValidationError('Veuillez d\'abord créer des catégories');
      return;
    }
    
    const firstCategory = categories?.[0];
    const firstSubCategory = firstCategory?.subCategories?.[0];
  
    setFormData({
      ...formData,
      name: 'Produit de test',
      reference: 'TEST-123',
      category_id: firstCategory?.id || '',
      subcategory_id: firstSubCategory?.id || '',
      subsubcategory_id: 'null',
      description: 'Description de test pour le produit',
      price_ht: 100,
      price_ttc: 120,
      images: ['https://picsum.photos/200'],
      colors: ['rouge', 'bleu'],
      related_products: [],
      technical_specs: { poids: '1kg', dimensions: '10x20x30' },
      technical_doc_url: 'https://example.com/doc.pdf',
      video_url: 'https://example.com/video.mp4',
      stock: 10,
      is_available: true,
      created_at: new Date(),
      updated_at: new Date()
    });
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) : value
    }));
  };

  const [validationError, setValidationError] = useState<string | null>(null);

  // Add this new validation function
  const validateForm = () => {
    if (!formData.name.trim()) return 'Le nom est obligatoire';
    if (!formData.reference.trim()) return 'La référence est obligatoire';
    if (!formData.category_id) return 'La catégorie est obligatoire';
    if (!formData.subcategory_id) return 'La sous-catégorie est obligatoire';
    if (formData.price_ht <= 0) return 'Le prix HT doit être supérieur à 0';
    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const error = validateForm();
    if (error) {
      setValidationError(error);
      return;
    }
    setValidationError(null);
    if (!formData.name || !formData.reference || !formData.category_id || !formData.price_ht || !formData.stock) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {product ? 'Modifier le produit' : 'Ajouter un produit'}
            </h2>
            <button
              onClick={onClose}
              className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors duration-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {validationError && (
              <div className="text-red-500 text-sm mb-4">{validationError}</div>
            )}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Nom
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Référence
                </label>
                <input
                  type="text"
                  name="reference"
                  value={formData.reference}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Catégorie
                </label>
                <select
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleCategoryChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="">Sélectionner une catégorie</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Sous-catégorie
                </label>
                <select
                  name="subcategory_id"
                  value={formData.subcategory_id}
                  onChange={handleSubcategoryChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  disabled={!selectedCategory}
                >
                  <option value="">Sélectionner une sous-catégorie</option>
                  {selectedCategory?.subCategories?.map(subCategory => (
                    <option key={subCategory.id} value={subCategory.id}>
                      {subCategory.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Sous-sous-catégorie
                </label>
                <select
                  name="subsubcategory_id"
                  value={formData.subsubcategory_id}
                  onChange={handleSubsubcategoryChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  disabled={!selectedSubcategory}
                >
                  <option value="">Sélectionner une sous-sous-catégorie</option>
                  {selectedSubcategory?.subSubCategories?.map(subSubCategory => (
                    <option key={subSubCategory.id} value={subSubCategory.id}>
                      {subSubCategory.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Prix HT
                </label>
                <input
                  type="number"
                  name="price_ht"
                  value={formData.price_ht}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Prix TTC
                </label>
                <input
                  type="number"
                  name="price_ttc"
                  value={formData.price_ttc}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Stock
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  required
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div className="flex items-center">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="is_available"
                    checked={formData.is_available}
                    onChange={(e) => setFormData(prev => ({ ...prev, is_available: e.target.checked }))}
                    className="w-4 h-4 text-black focus:ring-black border-gray-300 rounded"
                  />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Disponible
                  </span>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Images (URLs séparées par des virgules)
                </label>
                <input
                  type="text"
                  name="images"
                  value={formData.images.join(',')}
                  onChange={(e) => setFormData(prev => ({ ...prev, images: e.target.value.split(',').map(url => url.trim()) }))}
                  placeholder="http://image1.jpg, http://image2.jpg"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Couleurs (séparées par des virgules)
                </label>
                <input
                  type="text"
                  name="colors"
                  value={formData.colors?.join(',') || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, colors: e.target.value.split(',').map(color => color.trim()) }))}
                  placeholder="rouge, bleu, vert"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Produits associés (IDs séparés par des virgules)
                </label>
                <input
                  type="text"
                  name="related_products"
                  value={formData.related_products?.join(',') || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, related_products: e.target.value.split(',').map(id => id.trim()) }))}
                  placeholder="prod1, prod2, prod3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Spécifications techniques (JSON)
                </label>
                <textarea
                  name="technical_specs"
                  value={JSON.stringify(formData.technical_specs, null, 2)}
                  onChange={(e) => {
                    try {
                      const specs = JSON.parse(e.target.value);
                      setFormData(prev => ({ ...prev, technical_specs: specs }));
                    } catch (err) {
                      // Garder l'ancienne valeur en cas d'erreur de parsing
                    }
                  }}
                  placeholder='{"poids": "1kg", "dimensions": "10x20x30"}'
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  URL du document technique
                </label>
                <input
                  type="url"
                  name="technical_doc_url"
                  value={formData.technical_doc_url || ''}
                  onChange={handleChange}
                  placeholder="https://example.com/doc.pdf"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  URL de la vidéo
                </label>
                <input
                  type="url"
                  name="video_url"
                  value={formData.video_url || ''}
                  onChange={handleChange}
                  placeholder="https://youtube.com/watch?v=..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-end space-x-3">
              <button
                  type="button"
                  onClick={handlePrefill}
                  className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  Pré-remplir
                </button>       
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-black dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-black dark:bg-white dark:text-black dark:hover:bg-gray-200"
                >
                  {product ? 'Mettre à jour' : 'Ajouter'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};


export default ProductModal;
