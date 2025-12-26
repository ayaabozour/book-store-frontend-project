import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { useAuth } from '../context/AuthContext';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-gray-50">
      {user && (
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col lg:ml-64">
        {user && (
          <header className="bg-primary text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                className="lg:hidden text-white text-2xl"
                onClick={() => setSidebarOpen(true)}
              >
                ☰
              </button>
              <span className="font-bold text-lg">Readscape Admin</span>
            </div>
          </header>
        )}
        
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
