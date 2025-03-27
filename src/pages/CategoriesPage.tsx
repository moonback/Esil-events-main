import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllCategories, type Category } from '../services/categoryService';

const CategoriesPage: React.FC = () => {
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
      <div className="min-h-screen pt-24 pb-16 px-4">
        <div className="container-custom mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="space-y-2">
                  {[...Array(4)].map((_, i) => (
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
        <h1 className="text-3xl font-bold mb-8">Nos Catégories</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div key={category.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
              <h2 className="text-xl font-bold mb-4">{category.name}</h2>
              
              <div className="space-y-4">
                {category.subCategories?.map((subCategory) => (
                  <div key={subCategory.id}>
                    <Link
                      to={`/shop/${category.slug}/${subCategory.slug}`}
                      className="text-gray-800 hover:text-black font-medium block mb-2 transition-colors duration-200"
                    >
                      {subCategory.name}
                    </Link>
                    
                    {subCategory.subSubCategories && subCategory.subSubCategories.length > 0 && (
                      <ul className="pl-4 space-y-1">
                        {subCategory.subSubCategories.map((subSubCategory) => (
                          <li key={subSubCategory.id}>
                            <Link
                              to={`/shop/${category.slug}/${subCategory.slug}/${subSubCategory.slug}`}
                              className="text-gray-600 hover:text-black text-sm block transition-colors duration-200"
                            >
                              {subSubCategory.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
              
              <Link
                to={`/shop/${category.slug}`}
                className="inline-block mt-4 text-black font-medium hover:text-gray-600 transition-colors duration-200"
              >
                Voir tous les produits →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;