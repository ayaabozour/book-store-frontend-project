import React, { useState, useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Books } from './pages/Books';
import { Orders } from './pages/Orders';
import { Authors } from './pages/Authors';
import { PaymentMethods } from './pages/PaymentMethods';
import { Categories } from './pages/Categories';
import Layout from './components/Layout';
import { LoadingSpinner } from './components/ui/LoadingSpinner';

const App: React.FC = () => {
  const { user, loading } = useAuth();
  const [currentRoute, setCurrentRoute] = useState(window.location.hash || '#/');

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentRoute(window.location.hash || '#/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoadingSpinner />
      </div>
    );
  }

  if (!user) {
    if (currentRoute !== '#/login') window.location.hash = '#/login';
    return <Login />;
  }

  const renderRouteContent = () => {
    switch (currentRoute) {
      case '#/': return <Dashboard />;
      case '#/books': return <Books />;
      case '#/orders': return <Orders />;
      case '#/authors': return <Authors />;
      case '#/categories': return <Categories />;
      case '#/payment-methods': return <PaymentMethods />;
      case '#/login': return <Login />;
      default: return <div className="text-center py-10">Page not found</div>;
    }
  };

  return (
    <Layout>
      {renderRouteContent()}
    </Layout>
  );
};

export default App;
