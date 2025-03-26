import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Filter, ChevronDown } from 'lucide-react';
import { getProductsByCategory, getProductsBySubCategory } from '../services/productService';

interface Product {
  id: string;
  name: string;
  reference: string;
  category: string;
  subCategory?: string;
  priceHT: number;
  priceTTC: number;
  images: string[];
}

const ProductListPage: React.FC = () => {
  const { category, subcategory } = useParams<{ category: string; subcategory?: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortBy, setSortBy] = useState<string>('name-asc');

  useEffect(() => {
    const fetchProducts = async () => {
      if (!category) return;
      
      try {
        setLoading(true);
        setError(null);
        
        let productsData;
        if (subcategory) {
          productsData = await getProductsBySubCategory(category, subcategory);
        } else {
          productsData = await getProductsByCategory(category);
        }
        
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Une erreur est survenue lors du chargement des produits');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, subcategory]);

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  const handlePriceRangeChange = (index: number, value: number) => {
    const newRange = [...priceRange] as [number, number];
    newRange[index] = value;
    setPriceRange(newRange);
  };

  const getCategoryTitle = () => {
    if (!category) return '';
    
    switch (category) {
      case 'mobilier':
        return 'Mobilier & Déco';
      case 'jeux':
        return 'Jeux';
      case 'signaletique':
        return 'Signalétique';
      case 'technique':
        return 'Technique';
      default:
        return category.charAt(0).toUpperCase() + category.slice(1);
    }
  };

  const sortProducts = (products: Product[]) => {
    const sorted = [...products];
    
    switch (sortBy) {
      case 'name-asc':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc':
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      case 'price-asc':
        return sorted.sort((a, b) => a.priceHT - b.priceHT);
      case 'price-desc':
        return sorted.sort((a, b) => b.priceHT - a.priceHT);
      default:
        return sorted;
    }
  };

  const filterProducts = (products: Product[]) => {
    return products.filter(product => 
      product.priceHT >= priceRange[0] && product.priceHT <= priceRange[1]
    );
  };

  const displayedProducts = sortProducts(filterProducts(products));

  return (
    <div className="pt-24 pb-16 px-4">
      <div className="container-custom mx-auto">
        {/* Breadcrumb */}
        <div className="mb-8">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link to="/" className="text-gray-700 hover:text-black">Accueil</Link>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <Link to={`/products/${category}`} className="text-gray-700 hover:text-black">
                    {getCategoryTitle()}
                  </Link>
                </div>
              </li>
              {subcategory && (
                <li aria-current="page">
                  <div className="flex items-center">
                    <span className="mx-2 text-gray-400">/</span>
                    <span className="text-gray-500">
                      {subcategory.charAt(0).toUpperCase() + subcategory.slice(1)}
                    </span>
                  </div>
                </li>
              )}
            </ol>
          </nav>
        </div>

        <h1 className="text-3xl font-bold mb-8">
          {subcategory 
            ? `${subcategory.charAt(0).toUpperCase() + subcategory.slice(1)} - ${getCategoryTitle()}`
            : getCategoryTitle()
          }
        </h1>

        {/* Error message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Filters and Sorting */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <button 
              onClick={toggleFilter}
              className="flex items-center text-black mb-4 md:mb-0"
            >
              <Filter className="mr-2 w-5 h-5" />
              Filtres
              <ChevronDown className={`ml-1 w-4 h-4 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
            </button>
            
            <div className="w-full md:w-auto">
              <select 
                value={sortBy}
                onChange={handleSortChange}
                className="w-full md:w-auto p-2 border border-gray-300 rounded-md"
              >
                <option value="name-asc">Nom (A-Z)</option>
                <option value="name-desc">Nom (Z-A)</option>
                <option value="price-asc">Prix (croissant)</option>
                <option value="price-desc">Prix (décroissant)</option>
              </select>
            </div>
          </div>
          
          {/* Filter Panel */}
          {isFilterOpen && (
            <div className="bg-gray-50 p-4 rounded-md mb-4">
              <h3 className="font-medium mb-3">Fourchette de prix</h3>
              <div className="flex items-center mb-4">
                <input 
                  type="range" 
                  min="0" 
                  max="1000" 
                  value={priceRange[0]} 
                  onChange={(e) => handlePriceRangeChange(0, parseInt(e.target.value))}
                  className="w-full"
                />
                <span className="ml-2 min-w-[80px]">{priceRange[0]}€ - {priceRange[1]}€</span>
              </div>
              <div className="flex items-center">
                <input 
                  type="range" 
                  min="0" 
                  max="1000" 
                  value={priceRange[1]} 
                  onChange={(e) => handlePriceRangeChange(1, parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          )}
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
              <div key={index} className="product-card">
                <div className="h-48 bg-gray-200 animate-pulse"></div>
                <div className="p-4">
                  <div className="h-6 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2 mb-4"></div>
                  <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        ) : displayedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayedProducts.map((product) => (
              <Link 
                key={product.id} 
                to={`/product/${product.id}`}
                className="product-card"
              >
                <img 
                  src={product.images[0]} 
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold mb-1">{product.name}</h3>
                  <p className="text-sm text-gray-500 mb-3">Réf: {product.reference}</p>
                  <p className="font-bold">{product.priceHT.toFixed(2)}€ HT / jour</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-2">Aucun produit trouvé</h3>
            <p className="text-gray-500">Essayez de modifier vos filtres ou revenez plus tard.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductListPage;