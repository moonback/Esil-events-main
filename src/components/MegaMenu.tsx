import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllCategories, type Category } from '../services/categoryService';

const MegaMenu: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories();
        setCategories(data);
      } catch (err) {
        setError('Erreur lors du chargement des catégories');
        console.error('Error fetching categories:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (isLoading) {
    return (
      <div className="bg-white shadow-xl animate-fadeIn p-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="space-y-2">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-4 bg-gray-100 rounded w-1/2"></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white shadow-xl animate-fadeIn p-6">
        <div className="max-w-7xl mx-auto text-center text-red-600">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-xl animate-fadeIn">
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <div key={category.id} className="bg-white p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              <h3 className="text-lg font-bold mb-4">{category.name}</h3>
              <ul className="space-y-4">
                {category.subcategories?.map((subCategory) => (
                  <li key={subCategory.id} className="space-y-2">
                    <Link
                      to={`/products/${category.slug}/${subCategory.slug}`}
                      className="text-gray-800 hover:text-black font-medium transition-colors duration-200"
                    >
                      {subCategory.name}
                    </Link>
                    {subCategory.subsubcategories && subCategory.subsubcategories.length > 0 && (
                      <ul className="pl-4 space-y-1">
                        {subCategory.subsubcategories.map((subSubCategory) => (
                          <li key={subSubCategory.id}>
                            <Link
                              to={`/products/${category.slug}/${subCategory.slug}/${subSubCategory.slug}`}
                              className="text-gray-600 hover:text-black text-sm transition-colors duration-200"
                            >
                              {subSubCategory.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
              {/* <img
                src={`/images/${category.slug}-category.jpg`}
                alt={category.name}
                className="mt-4 rounded-lg w-full h-32 object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/images/placeholder-category.jpg';
                }}
              /> */}
            </div>
          ))}
        </div>
      </div>
      <div className="bg-gray-50 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <p className="text-sm text-gray-600">
            {categories.length > 0 
              ? `${categories.reduce((acc, cat) => {
                  const subCatCount = cat.subcategories?.length || 0;
                  const subSubCatCount = cat.subcategories?.reduce((acc2, subCat) => 
                    acc2 + (subCat.subsubcategories?.length || 0), 0) || 0;
                  return acc + subCatCount + subSubCatCount;
                }, 0)} catégories disponibles`
              : 'Chargement des produits...'}
          </p>
          <Link to="/products" className="text-black font-medium hover:text-gray-600 transition-colors duration-200">
            Voir tous les produits →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MegaMenu; 