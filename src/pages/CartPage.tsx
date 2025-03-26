import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface FormData {
  firstName: string;
  lastName: string;
  company: string;
  phone: string;
  email: string;
  eventDate: string;
  eventDuration: string;
  description: string;
}

const CartPage: React.FC = () => {
  const { items, removeFromCart, updateQuantity, clearCart } = useCart();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    company: '',
    phone: '',
    email: '',
    eventDate: '',
    eventDuration: '',
    description: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically send the data to your backend
    console.log('Form data:', formData);
    console.log('Cart items:', items);
    
    // Show success message and clear cart
    setFormSubmitted(true);
    clearCart();
  };

  if (formSubmitted) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-4">
        <div className="container-custom mx-auto max-w-3xl">
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <h2 className="text-2xl font-bold mb-4">Demande envoyée avec succès !</h2>
            <p className="mb-6">
              Merci pour votre demande de devis. Notre équipe va l'étudier et vous contactera dans les plus brefs délais.
            </p>
            <Link to="/" className="btn-primary">
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-44 pb-16 px-4">
      <div className="container-custom mx-auto">
        <h1 className="text-3xl font-bold mb-8">Votre devis</h1>

        {items.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <h2 className="text-xl font-medium mb-4">Votre panier est vide</h2>
            <p className="mb-6">Vous n'avez pas encore ajouté de produits à votre devis.</p>
            <Link to="/" className="btn-primary">
              Découvrir nos produits
            </Link>
          </div>
        ) : !showForm ? (
          <>
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-4 px-6 text-left">Produit</th>
                    <th className="py-4 px-6 text-center">Quantité</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id} className="border-t">
                      <td className="py-4 px-6">
                        <div className="flex items-center">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded mr-4"
                          />
                          <div>
                            <h3 className="font-medium">{item.name}</h3>
                            {item.color && <p className="text-sm text-gray-500">Couleur: {item.color}</p>}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-center">
                          <button 
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="p-1 border border-gray-300 rounded-l"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-4 py-1 border-t border-b border-gray-300">
                            {item.quantity}
                          </span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 border border-gray-300 rounded-r"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between items-center mb-8">
              <Link to="/" className="flex items-center text-black hover:underline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Continuer mes achats
              </Link>
              <button 
                onClick={() => setShowForm(true)}
                className="btn-primary"
              >
                Demander un devis
              </button>
            </div>
          </>
        ) : (
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Finaliser votre demande de devis</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    Prénom *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Nom *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                    Raison sociale *
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Téléphone *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Date de l'événement *
                  </label>
                  <input
                    type="date"
                    id="eventDate"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label htmlFor="eventDuration" className="block text-sm font-medium text-gray-700 mb-1">
                    Durée de l'événement *
                  </label>
                  <input
                    type="text"
                    id="eventDuration"
                    name="eventDuration"
                    value={formData.eventDuration}
                    onChange={handleInputChange}
                    required
                    placeholder="Ex: 1 jour, 2 jours, etc."
                    className="w-full p-3 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description de votre projet (1000 caractères max) *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  maxLength={1000}
                  rows={5}
                  className="w-full p-3 border border-gray-300 rounded-md"
                ></textarea>
                <p className="text-sm text-gray-500 mt-1">
                  {formData.description.length}/1000 caractères
                </p>
              </div>
              
              <div className="flex justify-between items-center">
                <button 
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex items-center text-black hover:underline"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Retour au panier
                </button>
                <button 
                  type="submit"
                  className="btn-primary"
                >
                  Envoyer ma demande
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;