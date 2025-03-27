import React, { useEffect, useState } from 'react';
import { Package, FileText, Users, BarChart2, TrendingUp, ShoppingCart, Download } from 'lucide-react';
import AdminLayout from '../../components/layouts/AdminLayout';
import AdminHeader from '../../components/admin/AdminHeader';

const AdminDashboard: React.FC = () => {
  const stats = [
    {
      title: 'Produits',
      value: '24',
      change: '+4.75%',
      changeType: 'increase',
      icon: <Package className="w-8 h-8 text-black" />
    },
    {
      title: 'Commandes',
      value: '12',
      change: '+10.2%',
      changeType: 'increase',
      icon: <ShoppingCart className="w-8 h-8 text-black" />
    },
    {
      title: 'Clients',
      value: '18',
      change: '+2.3%',
      changeType: 'increase',
      icon: <Users className="w-8 h-8 text-black" />
    },
    {
      title: 'Revenus',
      value: '2,450€',
      change: '-3.2%',
      changeType: 'decrease',
      icon: <TrendingUp className="w-8 h-8 text-black" />
    }
  ];

  const recentOrders = [
    {
      id: '1',
      customer: 'Entreprise ABC',
      date: '12/05/2025',
      amount: '1,234€',
      status: 'En attente',
      statusColor: 'yellow'
    },
    {
      id: '2',
      customer: 'Société XYZ',
      date: '10/05/2025',
      amount: '2,345€',
      status: 'Confirmé',
      statusColor: 'green'
    },
    {
      id: '3',
      customer: 'Agence 123',
      date: '08/05/2025',
      amount: '3,456€',
      status: 'Livré',
      statusColor: 'blue'
    },
    {
      id: '4',
      customer: 'Client Particulier',
      date: '05/05/2025',
      amount: '567€',
      status: 'Annulé',
      statusColor: 'red'
    }
  ];

  const [error, setError] = useState<string | null>(null);

  const handleDownloadReport = () => {
    // Implementation of handleDownloadReport function
  };

  if (error) {
    return (
      <AdminLayout>
        <AdminHeader />
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <p className="text-red-600 dark:text-red-400">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 transition-colors"
            >
              Réessayer
            </button>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <AdminHeader />
      <div className="pt-24 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Tableau de bord</h1>
          <button
            onClick={handleDownloadReport}
            className="flex items-center px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 transition-colors"
            aria-label="Télécharger le rapport"
          >
            <Download className="w-4 h-4 mr-2" />
            Télécharger le rapport
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-gray-50 rounded-lg">{stat.icon}</div>
                <span className={`text-sm font-medium ${
                  stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold">{stat.value}</h3>
              <p className="text-sm text-gray-500 mt-1">{stat.title}</p>
            </div>
          ))}
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Commandes récentes</h2>
              <button className="text-sm text-black hover:text-gray-600">
                Voir toutes les commandes
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Montant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {order.customer}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{order.date}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {order.amount}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full bg-${order.statusColor}-100 text-${order.statusColor}-800`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;