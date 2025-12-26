
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, Loader2, Book, ArrowRight, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    await login({ email, password });
    toast.success('Welcome back to Book Store');
    window.location.hash = '#/';
  } catch (err) {
    toast.error('Login failed');
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div className="min-h-screen flex bg-white font-sans selection:bg-primary/10 selection:text-primary">
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center grayscale"></div>
          <div className="absolute inset-0 bg-primary mix-blend-multiply"></div>
        </div>
        
        <div className="relative z-10 max-w-md px-12 text-white">
          <div className="mb-8 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
            <Book className="text-accent" size={32} />
          </div>
          <h1 className="text-5xl font-bold mb-6 leading-tight">Manage your library with precision.</h1>
          <p className="text-lg text-white/80 mb-10">
            The ultimate inventory system for modern authors and administrators. Streamlined, secure, and professional.
          </p>
          
          <ul className="space-y-4">
            {['Real-time stock tracking', 'Automated order processing', 'Role-based permissions'].map((item, i) => (
              <li key={i} className="flex items-center space-x-3 text-white/90">
                <CheckCircle2 size={20} className="text-accent shrink-0" />
                <span className="font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 sm:p-12 md:p-20 bg-gray-50/30">
        <div className="max-w-md w-full">
          <div className="lg:hidden flex items-center space-x-3 mb-12">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg">
              <Book className="text-accent" size={24} />
            </div>
            <span className="text-2xl font-bold text-primary tracking-tight">BiblioTrack</span>
          </div>

          <div className="mb-10">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">Welcome Back</h2>
            <p className="text-gray-500 text-lg">Sign in to manage your collection.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700 ml-1">Email</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none group-focus-within:text-primary transition-colors text-gray-400">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-11 pr-4 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-gray-900 placeholder:text-gray-400"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center px-1">
                <label className="text-sm font-semibold text-gray-700">Password</label>
                <a href="#" className="text-sm font-semibold text-primary hover:text-secondary transition-colors">Forgot?</a>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none group-focus-within:text-primary transition-colors text-gray-400">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-11 pr-4 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-gray-900 placeholder:text-gray-400"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2 px-1">
              <input 
                type="checkbox" 
                id="remember" 
                className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary" 
              />
              <label htmlFor="remember" className="text-sm text-gray-600 font-medium cursor-pointer">Remember me for 30 days</label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-lg hover:bg-secondary active:scale-[0.98] transition-all flex items-center justify-center shadow-xl shadow-primary/20 disabled:opacity-70 disabled:active:scale-100"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={24} />
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight size={20} className="ml-2" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
