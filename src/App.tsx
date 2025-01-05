import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import Header from './components/Header';
import Hero from './components/Hero';
import Register from './pages/Register';
import Login from './pages/Login';
import Profiles from './pages/Profiles';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-white">
          <Header />
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/profiles"
              element={
                <ProtectedRoute>
                  <Profiles />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
