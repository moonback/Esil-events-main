import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import ContactPage from './pages/ContactPage';
import DeliveryPage from './pages/DeliveryPage';
import AdminDashboard from './pages/admin/Dashboard';
import AdminPages from './pages/admin/Pages';
import AdminCustomers from './pages/admin/Customers';
import AdminCategories from './pages/admin/Categories';
import NotFoundPage from './pages/NotFoundPage';
import ProfilePage from './pages/ProfilePage';
import OrdersPage from './pages/OrdersPage';
import AboutPage from './pages/AboutPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './hooks/useAuth';
import AdminRoute from './components/AdminRoute';
import LoginForm from './components/LoginForm';
import RegisterPage from './pages/RegisterPage';
import CategoriesPage from './pages/CategoriesPage';
import ShopPage from './pages/ShopPage';
import AdminProducts from './pages/admin/Products';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <CartProvider>
          <Routes>
          {/* Routes publiques avec Layout principal */}
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/shop/:categorySlug" element={<ShopPage />} />
            <Route path="/shop/:categorySlug/:subCategorySlug" element={<ShopPage />} />
            <Route path="/shop/:categorySlug/:subCategorySlug/:subSubCategorySlug" element={<ShopPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/delivery" element={<DeliveryPage />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
          </Route>

          {/* Routes utilisateur avec Layout principal */}
          <Route element={<Layout />}>
            <Route path="/profile" element={<AdminRoute><ProfilePage /></AdminRoute>} />
            <Route path="/orders" element={<AdminRoute><OrdersPage /></AdminRoute>} />
          </Route>

          {/* Routes admin sans Layout principal */}
          <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="/admin/categories" element={<AdminRoute><AdminCategories /></AdminRoute>} />
          <Route path="/admin/pages" element={<AdminRoute><AdminPages /></AdminRoute>} />
          <Route path="/admin/customers" element={<AdminRoute><AdminCustomers /></AdminRoute>} />
          <Route path="/admin/products" element={<AdminRoute><AdminProducts /></AdminRoute>} />

          {/* Page 404 */}
          <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </CartProvider></BrowserRouter>
      </AuthProvider>
    
  );
};

export default App;