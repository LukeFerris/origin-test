

// ["MainLayout", "Component"]    

import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import NavBar from "./NavBar_Component";
import LoginPage from "./LoginPage_Component";
import Footer from "./Footer_Component";
import HelloWorldMessage from "./HelloWorldMessage_Component";
import UserManagementPage from "./UserManagementPage_Component";

// This component provides structure and layout to the overall site
export default function MainLayout_Component() {
  // Get authentication state from Redux store
  const isAuthenticated = useSelector((state) => state.authenticationState.isAuthenticated);
  const userRole = useSelector((state) => state.authenticationState.userRole);

  // Protected route component
  const ProtectedRoute = ({ children, adminOnly = false }) => {
    if (!isAuthenticated || (adminOnly && userRole !== 'admin')) {
      // Redirect to login if not authenticated or not admin for admin routes
      return <Navigate to="/" replace />;
    }
    return children;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* NavBar rendered at the top of every page */}
      <NavBar />

      {/* Main content area */}
      <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
        <Routes>
          {/* Home page route */}
          <Route path="/" element={<LoginPage />} />
          
          {/* Protected main content route */}
          <Route 
            path="/main" 
            element={
              <ProtectedRoute>
                <HelloWorldMessage />
              </ProtectedRoute>
            } 
          />
          
          {/* Protected admin routes */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute adminOnly={true}>
                <UserManagementPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/users" 
            element={
              <ProtectedRoute adminOnly={true}>
                <UserManagementPage />
              </ProtectedRoute>
            } 
          />
          
          {/* Catch-all route */}
          <Route 
            path="*" 
            element={
              isAuthenticated ? <Navigate to="/main" replace /> : <Navigate to="/" replace />
            } 
          />
        </Routes>
      </main>

      {/* Footer rendered at the bottom of every page */}
      <Footer />
    </div>
  );
}