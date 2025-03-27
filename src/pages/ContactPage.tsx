import React, { useState } from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

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

const ContactPage: React.FC = () => {
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
    
    // Show success message
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen pt-48 pb-16 px-4">
      <div className="container-custom mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Nous contacter</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            {formSubmitted ? (
              <div className="text-center py-12">
                <h2 className="text-2xl font-bold mb-4">Message envoyé avec succès !</h2>
                <p className="mb-6">
                  Merci de nous avoir contacté. Notre équipe vous répondra dans les plus brefs délais.
                </p>
                <button 
                  onClick={() => {
                    setFormSubmitted(false);
                    setFormData({
                      firstName: '',
                      lastName: '',
                      company: '',
                      phone: '',
                      email: '',
                      eventDate: '',
                      eventDuration: '',
                      description: '',
                    });
                  }}
                  className="btn-primary"
                >
                  Envoyer un nouveau message
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-6">Parlons de votre projet</h2>
                
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
                    <div className="md:col-span-2">
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
                  
                  <button 
                    type="submit"
                    className="w-full btn-primary"
                  >
                    Envoyer
                  </button>
                </form>
              </>
            )}
          </div>

          {/* Contact Info */}
          <div>
            <div className="bg-black text-white p-8 rounded-lg shadow-md mb-8">
              <h2 className="text-2xl font-bold mb-6">Nos coordonnées</h2>
              
              <ul className="space-y-6">
                <li className="flex items-start">
                  <MapPin className="w-6 h-6 mr-3 mt-1" />
                  <div>
                    <h3 className="font-bold mb-1">Adresse</h3>
                    <p>ESIL Events</p>
                    <p>123 Rue de l'Événementiel</p>
                    <p>78711 Mantes-la-Ville</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Phone className="w-6 h-6 mr-3 mt-1" />
                  <div>
                    <h3 className="font-bold mb-1">Téléphone</h3>
                    <p>01 XX XX XX XX</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Mail className="w-6 h-6 mr-3 mt-1" />
                  <div>
                    <h3 className="font-bold mb-1">Email</h3>
                    <p>contact@esil-events.fr</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-6">Horaires d'ouverture</h2>
              
              <ul className="space-y-3">
                <li className="flex justify-between">
                  <span>Lundi - Vendredi</span>
                  <span className="font-medium">9h00 - 18h00</span>
                </li>
                <li className="flex justify-between">
                  <span>Samedi</span>
                  <span className="font-medium">10h00 - 16h00</span>
                </li>
                <li className="flex justify-between">
                  <span>Dimanche</span>
                  <span className="font-medium">Fermé</span>
                </li>
              </ul>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-gray-600">
                  Notre équipe est disponible 24h/24 et 7j/7 pour les interventions techniques sur les événements en cours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;