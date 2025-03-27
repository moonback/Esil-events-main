import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Package, FileText, Users, Grid, LayoutDashboard, Settings, Bell } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const location = useLocation();
  const { user } = useAuth();

  const menuItems = [
    {
      title: 'Tableau de bord',
      icon: <LayoutDashboard className="w-5 h-5" />,
      path: '/admin'
    },
    {
      title: 'Produits',
      icon: <Package className="w-5 h-5" />,
      path: '/admin/products'
    },
    {
      title: 'Catégories',
      icon: <Grid className="w-5 h-5" />,
      path: '/admin/categories'
    },
    // {
    //   title: 'Pages',
    //   icon: <FileText className="w-5 h-5" />,
    //   path: '/admin/pages'
    // },
    // {
    //   title: 'Clients',
    //   icon: <Users className="w-5 h-5" />,
    //   path: '/admin/customers'
    // }
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="h-16 flex items-center justify-center border-b border-gray-200 dark:border-gray-700">
            <Link to="/" className="text-xl font-bold text-gray-900 dark:text-white">
              ESIL Events
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`group flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-black text-white dark:bg-white dark:text-black'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  {item.icon}
                  <span className="ml-3">{item.title}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Info */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-black dark:bg-white flex items-center justify-center">
                <Bell className="w-4 h-4 text-white dark:text-black" />
              </div>
              <div className="ml-3">
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  {user?.email}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Administrateur
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="pl-64">
        <main className="min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout; 