
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  BookOpen, 
  ShoppingCart, 
  Users, 
  CreditCard, 
  LogOut,
  X
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const roleName = user?.role?.name.toLowerCase();

  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, href: '#/', roles: ['admin', 'author', 'customer'] },
    { label: 'Inventory', icon: BookOpen, href: '#/books', roles: ['admin', 'author', 'customer'] },
    { label: 'Orders', icon: ShoppingCart, href: '#/orders', roles: ['admin', 'author', 'customer'] },
    { label: 'Authors', icon: Users, href: '#/authors', roles: ['admin'] },
    { label: 'Payments', icon: CreditCard, href: '#/payment-methods', roles: ['admin'] },
  ];

  const filteredItems = navItems.filter(item => roleName && item.roles.includes(roleName));

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside className={`fixed inset-y-0 left-0 w-64 bg-primary text-white transform transition-transform duration-300 ease-in-out z-30 lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="p-6 flex items-center justify-between border-b border-white/10">
            <h1 className="text-2xl font-bold tracking-tight">Book store</h1>
            <button onClick={onClose} className="lg:hidden">
              <X size={24} />
            </button>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {filteredItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-secondary transition-colors"
                onClick={() => window.innerWidth < 1024 && onClose()}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.label}</span>
              </a>
            ))}
          </nav>

          <div className="p-4 border-t border-white/10">
            <div className="flex items-center space-x-3 px-4 py-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-accent text-primary flex items-center justify-center font-bold">
                {user?.name.charAt(0)}
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-semibold truncate">{user?.name}</p>
                <p className="text-xs text-white/60 capitalize">{roleName}</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="flex items-center space-x-3 w-full px-4 py-3 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
            >
              <LogOut size={20} />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
