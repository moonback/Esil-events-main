import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Info, FileText, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { getProductById } from '../services/productService';
import { Product } from '../types/Product';

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(undefined);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      try {
        const productData = await getProductById(id);
        setProduct(productData);
        if (productData?.colors && productData.colors.length > 0) {
          setSelectedColor(productData.colors[0]);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handlePrevImage = () => {
    if (!product) return;
    setCurrentImageIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    if (!product) return;
    setCurrentImageIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    addToCart({
      id: product.id,
      name: product.name,
      image: product.images[0],
      quantity,
      color: selectedColor
    });

    // Show confirmation message
    alert('Produit ajouté au devis !');
  };

  if (loading) {
    return (
      <div className="min-h-screen  flex items-center justify-center pt-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20">
        <h2 className="text-2xl font-bold mb-4">Produit non trouvé</h2>
        <Link to="/" className="btn-primary">Retour à l'accueil</Link>
      </div>
    );
  }

  return (
    <div className="pt-44 pb-16 px-4">
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
                  <Link to={`/products/${product.category}`} className="text-gray-700 hover:text-black">
                    {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                  </Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <span className="text-gray-500">{product.name}</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="relative">
              <img 
                src={product.images[currentImageIndex]} 
                alt={product.name} 
                className="w-full h-auto rounded-lg"
              />
              
              {product.images.length > 1 && (
                <>
                  <button 
                    onClick={handlePrevImage}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={handleNextImage}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>
            
            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-5 gap-2 mt-4">
                {product.images.map((image, index) => (
                  <img 
                    key={index}
                    src={image} 
                    alt={`${product.name} - vue ${index + 1}`}
                    className={`w-full h-20 object-cover rounded cursor-pointer ${currentImageIndex === index ? 'ring-2 ring-black' : ''}`}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-gray-600 mb-4">Réf: {product.reference}</p>
            
            <div className="flex items-center mb-6">
              <div className="mr-8">
                <p className="text-sm text-gray-500">Prix HT / jour</p>
                <p className="text-2xl font-bold">{product.priceHT.toFixed(2)} €</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Prix TTC / jour</p>
                <p className="text-2xl font-bold">{product.priceTTC.toFixed(2)} €</p>
              </div>
            </div>
            
            <p className="text-sm text-gray-500 mb-6">
              Tarif affiché pour une journée. Un tarif dégressif est appliqué pour toute journée supplémentaire. 
              Ce prix ne comprend pas la livraison, l'installation et le démontage du matériel.
            </p>
            
            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Quantité</label>
              <div className="flex items-center">
                <button 
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  className="p-2 border border-gray-300 rounded-l"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <input 
                  type="number" 
                  min="1" 
                  value={quantity} 
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="p-2 w-16 text-center border-t border-b border-gray-300"
                />
                <button 
                  onClick={() => setQuantity(prev => prev + 1)}
                  className="p-2 border border-gray-300 rounded-r"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            {/* Color Selector (if available) */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Couleur</label>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 border ${selectedColor === color ? 'border-black bg-gray-100' : 'border-gray-300'} rounded-md`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Add to Cart Button */}
            <button 
              onClick={handleAddToCart}
              className="w-full btn-primary mb-8"
            >
              Ajouter au devis
            </button>
            
            {/* Description */}
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Description</h2>
              <p>{product.description}</p>
            </div>
            
            {/* Technical Specifications */}
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Caractéristiques techniques</h2>
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <tbody>
                    {Object.entries(product.technicalSpecs).map(([key, value]) => (
                      <tr key={key} className="border-b last:border-b-0">
                        <td className="py-3 px-4 bg-gray-50 font-medium">{key}</td>
                        <td className="py-3 px-4">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Video (if available) */}
            {product.videoUrl && (
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">Vidéo de présentation</h2>
                <div className="aspect-w-16 aspect-h-9">
                  <iframe 
                    src={product.videoUrl} 
                    title="Product video"
                    className="w-full h-64 rounded-lg"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}
            
            {/* Technical Document (if available) */}
            {product.technicalDocUrl && (
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">Documentation technique</h2>
                <a 
                  href={product.technicalDocUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-black hover:underline"
                >
                  <FileText className="mr-2" />
                  Télécharger la documentation technique (PDF)
                </a>
              </div>
            )}
          </div>
        </div>
        
        {/* Related Products */}
        {product.relatedProducts && product.relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8">Produits associés</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Related products would be rendered here */}
              {/* This is a placeholder since we don't have actual related products data */}
              {[1, 2, 3, 4].map((index) => (
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
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;