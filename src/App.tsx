import React from 'react';
import { useAuth } from './context/AuthContext';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Books } from './pages/Books';
import { Orders } from './pages/Orders';
import Layout from './components/Layout';
import { LoadingSpinner } from './components/ui/LoadingSpinner';

const App: React.FC = () => {
  const { user, loading } = useAuth();
  const [route, setRoute] = React.useState(window.location.hash || '#/');

  React.useEffect(() => {
    const onHashChange = () => setRoute(window.location.hash || '#/');
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  if (loading) return <LoadingSpinner />;

  if (!user && route !== '#/login') {
    window.location.hash = '#/login';
    return null;
  }

  const renderRoute = () => {
    switch (route) {
      case '#/': return <Dashboard />;
      case '#/books': return <Books />;
      case '#/orders': return <Orders />;
      case '#/login': return <Login />;
      default: return <Dashboard />;
    }
  };

  return <Layout>{renderRoute()}</Layout>;
};

export default App;
