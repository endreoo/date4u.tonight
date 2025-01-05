import React from 'react';
import { Heart, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Header() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Heart className="w-8 h-8 text-red-500" />
            <span className="text-xl font-bold text-gray-900">Date4U.today</span>
          </Link>
          
          <nav className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link
                  to="/profiles"
                  className="text-gray-700 hover:text-red-500 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Browse
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-gray-700 hover:text-red-500 px-3 py-2 rounded-md text-sm font-medium"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-red-500 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-600"
                >
                  Join Now
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}