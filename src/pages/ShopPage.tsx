import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAllCategories, type Category } from '../services/categoryService';
import type { Product } from '../types/Product';

const ShopPage: React.FC = () => {
  const { categorySlug, subCategorySlug, subSubCategorySlug } = useParams<{
    categorySlug?: string;
    subCategorySlug?: string;
    subSubCategorySlug?: string;
  }>();

  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData = await getAllCategories();
        setCategories(categoriesData);

        // TODO: Implement product fetching based on category/subcategory/subsubcategory
        // This will be implemented when the product service is ready
        setProducts([]);
      } catch (err) {
        setError('Erreur lors du chargement des données');
        console.error('Error fetching data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [categorySlug, subCategorySlug, subSubCategorySlug]);

  const getCurrentCategory = () => {
    if (!categorySlug) return null;
    return categories.find(cat => cat.slug === categorySlug);
  };

  const getCurrentSubCategory = () => {
    const category = getCurrentCategory();
    if (!category || !subCategorySlug) return null;
    return category.subCategories?.find(sub => sub.slug === subCategorySlug);
  };

  const getCurrentSubSubCategory = () => {
    const subCategory = getCurrentSubCategory();
    if (!subCategory || !subSubCategorySlug) return null;
    return subCategory.subSubCategories?.find(subsub => subsub.slug === subSubCategorySlug);
  };

  const getPageTitle = () => {
    const subSubCategory = getCurrentSubSubCategory();
    if (subSubCategory) return subSubCategory.name;

    const subCategory = getCurrentSubCategory();
    if (subCategory) return subCategory.name;

    const category = getCurrentCategory();
    if (category) return category.name;

    return 'Tous nos produits';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-4">
        <div className="container-custom mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 animate-pulse">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-4">
                <div className="aspect-square bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-100 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-4">
        <div className="container-custom mx-auto text-center text-red-600">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="container-custom mx-auto">
        <h1 className="text-3xl font-bold mb-8">{getPageTitle()}</h1>

        {/* Breadcrumb navigation */}
        <nav className="mb-8">
          <ol className="flex flex-wrap items-center space-x-2 text-gray-600">
            <li>
              <a href="/shop" className="hover:text-black">Boutique</a>
            </li>
            {getCurrentCategory() && (
              <>
                <li><span className="mx-2">/</span></li>
                <li>
                  <a href={`/shop/${categorySlug}`} className="hover:text-black">
                    {getCurrentCategory()?.name}
                  </a>
                </li>
              </>
            )}
            {getCurrentSubCategory() && (
              <>
                <li><span className="mx-2">/</span></li>
                <li>
                  <a href={`/shop/${categorySlug}/${subCategorySlug}`} className="hover:text-black">
                    {getCurrentSubCategory()?.name}
                  </a>
                </li>
              </>
            )}
            {getCurrentSubSubCategory() && (
              <>
                <li><span className="mx-2">/</span></li>
                <li className="text-black">{getCurrentSubSubCategory()?.name}</li>
              </>
            )}
          </ol>
        </nav>

        {/* Product grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-600">Aucun produit disponible dans cette catégorie pour le moment.</p>
            </div>
          ) : (
            products.map(product => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
                {product.images[0] && (
                  <div className="aspect-square">
                    <img 
                      src={product.images[0]} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-4">
                  <h3 className="font-medium mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{product.reference}</p>
                  <div className="flex justify-between items-center">
                    <span className="font-bold">{product.priceTTC.toFixed(2)} €</span>
                    <button className="btn-primary text-sm">
                      Voir le produit
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;