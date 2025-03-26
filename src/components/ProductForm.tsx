import React, { useState, useEffect } from 'react';
import { Product, ProductFormData, PRODUCT_CATEGORIES } from '../types/Product';

interface ProductFormProps {
  initialData?: Product;
  onSubmit: (data: ProductFormData) => Promise<void>;
  isLoading?: boolean;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

const ProductForm: React.FC<ProductFormProps> = ({ initialData, onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<ProductFormData>({
    name: initialData?.name || '',
    reference: initialData?.reference || '',
    category: initialData?.category || PRODUCT_CATEGORIES[0].slug,
    subCategory: initialData?.subCategory || PRODUCT_CATEGORIES[0].subCategories[0].slug,
    subSubCategory: initialData?.subSubCategory || PRODUCT_CATEGORIES[0].subCategories[0].subSubCategories[0].slug,
    description: initialData?.description || '',
    priceHT: initialData?.priceHT || 0,
    priceTTC: initialData?.priceTTC || 0,
    stock: initialData?.stock || 0,
    images: initialData?.images || [],
    colors: initialData?.colors || [],
    technicalSpecs: initialData?.technicalSpecs || {},
    technicalDocUrl: initialData?.technicalDocUrl || null,
    videoUrl: initialData?.videoUrl || null,
    isAvailable: initialData?.isAvailable ?? true
  });

  const [selectedCategory, setSelectedCategory] = useState(
    PRODUCT_CATEGORIES.find(cat => cat.slug === initialData?.category) || PRODUCT_CATEGORIES[0]
  );

  const [selectedSubCategory, setSelectedSubCategory] = useState(
    selectedCategory.subCategories.find(sub => sub.slug === initialData?.subCategory) || selectedCategory.subCategories[0]
  );

  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string>('');

  const [descriptionLength, setDescriptionLength] = useState(formData.description.length);
  const MAX_DESCRIPTION_LENGTH = 500;

  const [newSpecKey, setNewSpecKey] = useState('');
  const [newSpecValue, setNewSpecValue] = useState('');

  const [uploadErrors, setUploadErrors] = useState<string[]>([]);

  const [newColor, setNewColor] = useState('');

  // Calculer automatiquement le prix TTC (TVA 20%)
  useEffect(() => {
    const priceTTC = formData.priceHT * 1.2;
    setFormData(prev => ({ ...prev, priceTTC }));
  }, [formData.priceHT]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = PRODUCT_CATEGORIES.find(cat => cat.slug === e.target.value);
    if (category) {
      setSelectedCategory(category);
      setSelectedSubCategory(category.subCategories[0]);
      setFormData(prev => ({
        ...prev,
        category: category.slug,
        subCategory: category.subCategories[0].slug,
        subSubCategory: category.subCategories[0].subSubCategories[0].slug
      }));
    }
  };

  const handleSubCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const subCategory = selectedCategory.subCategories.find(sub => sub.slug === e.target.value);
    if (subCategory) {
      setSelectedSubCategory(subCategory);
      setFormData(prev => ({
        ...prev,
        subCategory: subCategory.slug,
        subSubCategory: subCategory.subSubCategories[0].slug
      }));
    }
  };

  const handleSubSubCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      subSubCategory: e.target.value
    }));
  };

  const validateFile = (file: File): string | null => {
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      return `${file.name} n'est pas un type d'image accepté. Utilisez JPG, PNG, WEBP ou GIF.`;
    }
    if (file.size > MAX_FILE_SIZE) {
      return `${file.name} est trop volumineux. La taille maximum est de 5MB.`;
    }
    return null;
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      setUploadErrors([]);

      const files = Array.from(e.target.files || []);
      const remainingSlots = 10 - formData.images.length;
      const filesToUpload = files.slice(0, remainingSlots);

      // Validate files
      const errors = filesToUpload.map(validateFile).filter((error): error is string => error !== null);
      if (errors.length > 0) {
        setUploadErrors(errors);
        return;
      }

      // Convert files to base64
      const uploadedUrls: string[] = [];
      for (const file of filesToUpload) {
        const reader = new FileReader();
        const base64Url = await new Promise<string>((resolve, reject) => {
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
        uploadedUrls.push(base64Url);
      }

      // Update form data
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...uploadedUrls]
      }));
    } catch (error) {
      console.error('Error processing images:', error);
      setUploadErrors(['Erreur lors du traitement des images']);
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove)
    }));
  };

  const handleAddTechnicalSpec = () => {
    if (!newSpecKey.trim() || !newSpecValue.trim()) return;
    
    setFormData(prev => ({
      ...prev,
      technicalSpecs: {
        ...prev.technicalSpecs,
        [newSpecKey.trim()]: newSpecValue.trim()
      }
    }));
    setNewSpecKey('');
    setNewSpecValue('');
  };

  const handleRemoveTechnicalSpec = (key: string) => {
    setFormData(prev => {
      const newSpecs = { ...prev.technicalSpecs };
      delete newSpecs[key];
      return { ...prev, technicalSpecs: newSpecs };
    });
  };

  const handleAddColor = () => {
    if (!newColor.trim()) return;
    if (!formData.colors || !formData.colors.includes(newColor.trim())) {
      setFormData(prev => ({
        ...prev,
        colors: [...(prev.colors || []), newColor.trim()]
      }));
    }
    setNewColor('');
  };

  const handleRemoveColor = (colorToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      colors: prev.colors?.filter(color => color !== colorToRemove) || []
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validation basique
    if (!formData.name || !formData.reference || !formData.category || !formData.subCategory) {
      setError('Veuillez remplir tous les champs obligatoires');
      return;
    }

    if (formData.description.length > MAX_DESCRIPTION_LENGTH) {
      setError(`La description ne doit pas dépasser ${MAX_DESCRIPTION_LENGTH} caractères`);
      return;
    }

    if (formData.description.length < 20) {
      setError('La description doit contenir au moins 20 caractères');
      return;
    }

    if (formData.priceHT < 0) {
      setError('Le prix HT ne peut pas être négatif');
      return;
    }

    if (formData.stock < 0) {
      setError('Le stock ne peut pas être négatif');
      return;
    }

    try {
      await onSubmit(formData);
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la sauvegarde du produit');
      console.error(err);
    }
  };

  const ImagePreview = ({ url, onRemove }: { url: string; onRemove: () => void }) => {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    return (
      <div className="relative group">
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200">
          {!error ? (
            <img
              src={url}
              alt="Product preview"
              className={`object-cover object-center w-full h-full transition-opacity duration-200 ${
                loading ? 'opacity-0' : 'opacity-100'
              }`}
              onLoad={() => setLoading(false)}
              onError={() => {
                setError(true);
                setLoading(false);
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          )}
          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button
              type="button"
              onClick={onRemove}
              className="text-white p-2 hover:text-red-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nom du produit</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Référence</label>
          <input
            type="text"
            name="reference"
            value={formData.reference}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Catégorie</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleCategoryChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
            >
              {PRODUCT_CATEGORIES.map(category => (
                <option key={category.id} value={category.slug}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Sous-catégorie</label>
            <select
              name="subCategory"
              value={formData.subCategory}
              onChange={handleSubCategoryChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
            >
              {selectedCategory.subCategories.map(subCat => (
                <option key={subCat.id} value={subCat.slug}>
                  {subCat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Sous-sous-catégorie</label>
            <select
              name="subSubCategory"
              value={formData.subSubCategory}
              onChange={handleSubSubCategoryChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
            >
              {selectedSubCategory.subSubCategories.map(subSubCat => (
                <option key={subSubCat.id} value={subSubCat.slug}>
                  {subSubCat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="block text-sm font-medium text-gray-700">Description du produit</label>
            <span className={`text-sm ${descriptionLength > MAX_DESCRIPTION_LENGTH ? 'text-red-600' : 'text-gray-500'}`}>
              {descriptionLength}/{MAX_DESCRIPTION_LENGTH} caractères
            </span>
          </div>
          <div className="relative">
            <textarea
              name="description"
              value={formData.description}
              onChange={(e) => {
                handleChange(e);
                setDescriptionLength(e.target.value.length);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Tab') {
                  e.preventDefault();
                  const start = e.currentTarget.selectionStart;
                  const end = e.currentTarget.selectionEnd;
                  const value = e.currentTarget.value;
                  e.currentTarget.value = value.substring(0, start) + '    ' + value.substring(end);
                  e.currentTarget.selectionStart = e.currentTarget.selectionEnd = start + 4;
                }
              }}
              required
              placeholder="Décrivez le produit en détail (caractéristiques, utilisation, etc.)"
              className={`mt-1 block w-full rounded-md shadow-sm 
                min-h-[150px] p-3 resize-y
                ${descriptionLength > MAX_DESCRIPTION_LENGTH 
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                  : 'border-gray-300 focus:border-black focus:ring-black'
                }
                placeholder:text-gray-400 placeholder:text-sm
              `}
            />
            {descriptionLength > MAX_DESCRIPTION_LENGTH && (
              <p className="mt-1 text-sm text-red-600">
                La description ne doit pas dépasser {MAX_DESCRIPTION_LENGTH} caractères
              </p>
            )}
            <div className="absolute bottom-3 right-3 text-gray-400 text-sm">
              Appuyez sur Tab pour indenter
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Conseil : Incluez les informations importantes comme les dimensions, matériaux, 
            conditions d'utilisation et autres détails pertinents.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Prix HT</label>
            <input
              type="number"
              name="priceHT"
              value={formData.priceHT}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Prix TTC</label>
            <input
              type="number"
              value={formData.priceTTC}
              disabled
              className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Stock</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            required
            min="0"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
          />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="block text-sm font-medium text-gray-700">Images du produit</label>
            <span className="text-sm text-gray-500">
              {formData.images.length} / 10 images
            </span>
          </div>
          
          <div className="flex items-center justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-black hover:text-gray-700"
                >
                  <span>Télécharger des images</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    multiple
                    accept={ACCEPTED_IMAGE_TYPES.join(',')}
                    onChange={handleImageUpload}
                    className="sr-only"
                    disabled={uploading || formData.images.length >= 10}
                  />
                </label>
                <p className="pl-1">ou glisser-déposer</p>
              </div>
              <p className="text-xs text-gray-500">
                PNG, JPG, WEBP ou GIF jusqu'à 5MB
              </p>
            </div>
          </div>

          {uploadErrors.length > 0 && (
            <div className="mt-2">
              {uploadErrors.map((error, index) => (
                <p key={index} className="text-sm text-red-600">
                  {error}
                </p>
              ))}
            </div>
          )}

          {uploading && (
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Téléchargement en cours...
              </p>
            </div>
          )}

          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {formData.images.map((url, index) => (
              <ImagePreview
                key={index}
                url={url}
                onRemove={() => handleRemoveImage(index)}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            name="isAvailable"
            checked={formData.isAvailable}
            onChange={e => setFormData(prev => ({ ...prev, isAvailable: e.target.checked }))}
            className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
          />
          <label className="ml-2 block text-sm text-gray-700">
            Produit disponible
          </label>
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">Couleurs disponibles</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={newColor}
              onChange={(e) => setNewColor(e.target.value)}
              placeholder="Ajouter une couleur"
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
            />
            <button
              type="button"
              onClick={handleAddColor}
              className="px-3 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
            >
              Ajouter
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {formData.colors?.map((color) => (
              <div
                key={color}
                className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-md"
              >
                <span>{color}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveColor(color)}
                  className="text-red-600 hover:text-red-800"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Section Technique */}
        <div className="border-t border-gray-200 pt-6 mt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Informations Techniques</h3>
          
          {/* Spécifications Techniques */}
          <div className="space-y-4 mb-6">
            <label className="block text-sm font-medium text-gray-700">Spécifications Techniques</label>
            
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                value={newSpecKey}
                onChange={(e) => setNewSpecKey(e.target.value)}
                placeholder="Caractéristique (ex: Dimensions)"
                className="rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newSpecValue}
                  onChange={(e) => setNewSpecValue(e.target.value)}
                  placeholder="Valeur (ex: 80x60x40 cm)"
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                />
                <button
                  type="button"
                  onClick={handleAddTechnicalSpec}
                  className="px-3 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
                >
                  Ajouter
                </button>
              </div>
            </div>

            {/* Liste des spécifications */}
            <div className="mt-3 space-y-2">
              {Object.entries(formData.technicalSpecs).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                  <div>
                    <span className="font-medium">{key}:</span>
                    <span className="ml-2">{value}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveTechnicalSpec(key)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Supprimer
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Documentation Technique */}
          <div className="space-y-2 mb-6">
            <label className="block text-sm font-medium text-gray-700">
              URL Documentation Technique (PDF)
            </label>
            <input
              type="url"
              name="technicalDocUrl"
              value={formData.technicalDocUrl || ''}
              onChange={handleChange}
              placeholder="https://example.com/docs/product-manual.pdf"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
            />
            <p className="text-sm text-gray-500">
              Lien vers la documentation technique du produit (manuel, fiche technique, etc.)
            </p>
          </div>

          {/* Vidéo */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              URL Vidéo de Présentation
            </label>
            <input
              type="url"
              name="videoUrl"
              value={formData.videoUrl || ''}
              onChange={handleChange}
              placeholder="https://youtube.com/watch?v=..."
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
            />
            <p className="text-sm text-gray-500">
              Lien vers une vidéo de démonstration ou de présentation du produit
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="submit"
          disabled={isLoading || uploading}
          className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Enregistrement...
            </span>
          ) : 'Enregistrer'}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;