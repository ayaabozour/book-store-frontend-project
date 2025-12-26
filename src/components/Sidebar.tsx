
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  BookOpen, 
  ShoppingCart, 
  Users, 
  CreditCard, 
  LogOut,
  X,
  Filter
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const [currentHash, setCurrentHash] = useState(window.location.hash || '#/');
  const roleName = user?.role?.name.toLowerCase();

  useEffect(() => {
    const handleHashChange = () => setCurrentHash(window.location.hash || '#/');
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, href: '#/', roles: ['admin', 'author', 'customer'] },
    { label: 'Inventory', icon: BookOpen, href: '#/books', roles: ['admin', 'author', 'customer'] },
    { label: 'Orders', icon: ShoppingCart, href: '#/orders', roles: [ 'author'] },
    { label: 'Authors', icon: Users, href: '#/authors', roles: ['admin'] },
    {label : 'Book categories', icon: Filter, href: '#/categories', roles:['admin']},
    { label: 'Payments', icon: CreditCard, href: '#/payment-methods', roles: ['admin'] },
  ];

  const filteredItems = navItems.filter(item => roleName && item.roles.includes(roleName));

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      <aside className={`fixed inset-y-0 left-0 w-64 bg-primary text-white transform transition-transform duration-300 ease-out z-50 lg:translate-x-0 border-r border-white/5 shadow-2xl ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="p-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center">
                <BookOpen size={24} className="text-primary" />
              </div>
              <h1 className="text-xl font-black tracking-tight uppercase">Readscape</h1>
            </div>
            <button onClick={onClose} className="lg:hidden p-2 hover:bg-white/10 rounded-xl">
              <X size={20} />
            </button>
          </div>

          <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
            <div className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] px-4 mb-4">Main Navigation</div>
            {filteredItems.map((item) => {
              const isActive = currentHash === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-3.5 rounded-2xl transition-all group ${
                    isActive 
                      ? 'bg-white/10 text-accent font-bold shadow-sm' 
                      : 'text-white/70 hover:bg-white/5 hover:text-white'
                  }`}
                  onClick={() => window.innerWidth < 1024 && onClose()}
                >
                  <item.icon size={20} className={`transition-colors ${isActive ? 'text-accent' : 'text-white/40 group-hover:text-white'}`} />
                  <span className="text-sm tracking-wide">{item.label}</span>
                </a>
              );
            })}
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
